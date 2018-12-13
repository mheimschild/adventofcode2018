const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('day13.input'),
});

const MAP = [];
const CART_CHARS = ['v', '^', '<', '>'];
const CART_ROADS = {
  v: '|', '^': '|', '<': '-', '>': '-',
};
const CARTS = [];
const getNextCoordinate = (cart, x, y) => {
  switch (cart) {
    case '>':
      return { x: x + 1, y };
    case '<':
      return { x: x - 1, y };
    case '^':
      return { x, y: y - 1 };
    case 'v':
      return { x, y: y + 1 };
    default:
      return { x, y };
  }
};

const rotate = (cart) => {
  const { moves, c } = cart;
  const nextMove = moves.shift();
  moves.push(nextMove);

  const R = {
    v: {
      l: '>',
      r: '<',
      s: 'v',
    },
    '^': {
      l: '<',
      r: '>',
      s: '^',
    },
    '<': {
      l: 'v',
      r: '^',
      s: '<',
    },
    '>': {
      l: '^',
      r: 'v',
      s: '>',
    },
  };

  return R[c][nextMove];
};

const getNextCart = (cart, field) => {
  const TRANSITIONS = {
    '>': {
      '\\': 'v',
      '/': '^',
    },
    '<': {
      '/': 'v',
      '\\': '^',
    },
    '^': {
      '/': '>',
      '\\': '<',
    },
    v: {
      '/': '<',
      '\\': '>',
    },
  };

  const { c } = cart;

  const next = TRANSITIONS[c][field] || c;
  cart.c = next;
  if (field === '+') {
    cart.c = rotate(cart);
  }
  return cart.c;
};

const visit = (visitor) => {
  for (let i = 0; i < MAP.length; i += 1) {
    for (let j = 0; j < MAP[i].length; j += 1) {
      visitor(j, i, MAP[i][j]);
    }
  }
};

const print = () => {
  for (let y = 0; y < MAP.length; y += 1) {
    for (let x = 0; x < MAP[y].length; x += 1) {
      const cart = CARTS.find(c => c.x === x && c.y === y && !c.removed);
      if (cart) {
        process.stdout.write(cart.c);
      } else {
        process.stdout.write(MAP[y][x]);
      }
    }
    process.stdout.write('\n');
  }
};

const isCollision = () => {
  const COLLISIONS = [];
  for (let i = 0; i < CARTS.length; i += 1) {
    for (let j = i + 1; j < CARTS.length; j += 1) {
      if (CARTS[i].removed || CARTS[j].removed) {
        continue;
      }
      if (CARTS[i].x === CARTS[j].x && CARTS[i].y === CARTS[j].y) {
        COLLISIONS.push(CARTS[i]);
        COLLISIONS.push(CARTS[j]);
      }
    }
  }

  COLLISIONS.forEach((c) => {
    c.removed = true;
  });

  return COLLISIONS.length > 0;
};

rl
  .on('line', (line) => {
    MAP.push(line.split(''));
  })
  .on('close', async () => {
    visit((x, y, item) => {
      if (CART_CHARS.indexOf(item) > -1) {
        CARTS.push({
          x, y, c: item, moves: ['l', 's', 'r'],
        });
        MAP[y][x] = CART_ROADS[item];
      }
    });

    print();
    const crashed = false;
    while (!crashed) {
      const nonRemoved = CARTS.filter(c => !c.removed).length;
      if (nonRemoved === 1) {
        return console.log(CARTS);
      }
      CARTS.sort((a, b) => {
        if (a.y < b.y) {
          return -1;
        }
        if (a.y > b.y) {
          return 1;
        }
        if (a.x < b.x) {
          return -1;
        }
        if (a.x > b.x) {
          return 1;
        }
        return 0;
      });
      for (let i = 0; i < CARTS.length; i += 1) {
        const cart = CARTS[i];
        if (cart.removed) {
          continue;
        }
        const { x: nextX, y: nextY } = getNextCoordinate(cart.c, cart.x, cart.y);
        const nextCart = getNextCart(cart, MAP[nextY][nextX]);
        cart.x = nextX;
        cart.y = nextY;
        cart.c = nextCart;

        isCollision();
      }
      // print();
    }
  });
