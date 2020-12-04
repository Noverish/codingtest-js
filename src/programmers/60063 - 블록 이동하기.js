const { assert } = require('chai');

const inputs = [
  [
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1],
    [1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 0]
  ]
];

const outputs = [
  7, 8, 15, 21
]

function main(board) {
  const L = board.length;
  const LEFT = 0, RIGHT = 1, TOP = 2, BOTTOM = 3, TOPLEFT = 4, TOPRIGHT = 5, BOTTOMLEFT = 6, BOTTOMRIGHT = 7;

  const board2 = Array.from({ length: L }, (_, i) =>
    Array.from({ length: L }, (_, j) => (board[i][j]) ? undefined : 0)
  )
  board2[0][0] = board2[0][1] = 1;

  function get(v, direction) {
    const [x, y] = v;
    switch (direction) {
      case undefined: return (board2[x] || [])[y];
      case LEFT: return (board2[x] || [])[y - 1];
      case RIGHT: return (board2[x] || [])[y + 1];
      case TOP: return (board2[x - 1] || [])[y];
      case BOTTOM: return (board2[x + 1] || [])[y];
      case TOPLEFT: return (board2[x - 1] || [])[y - 1];
      case TOPRIGHT: return (board2[x - 1] || [])[y + 1];
      case BOTTOMLEFT: return (board2[x + 1] || [])[y - 1];
      case BOTTOMRIGHT: return (board2[x + 1] || [])[y + 1];
      default: throw new Error('');
    }
  }

  function set(v, n, direction) {
    const [x, y] = v;
    switch (direction) {
      case undefined: return (x < L && y < L) && (board2[x][y] = n);
      case LEFT: return (x < L && y - 1 < L) && (board2[x][y - 1] = n);
      case RIGHT: return (x < L && y + 1 < L) && (board2[x][y + 1] = n);
      case TOP: return (x - 1 < L && y < L) && (board2[x - 1][y] = n);
      case BOTTOM: return (x + 1 < L && y < L) && (board2[x + 1][y] = n);
      case TOPLEFT: return (x - 1 < L && y - 1 < L) && (board2[x - 1][y - 1] = n);
      case TOPRIGHT: return (x - 1 < L && y + 1 < L) && (board2[x - 1][y + 1] = n);
      case BOTTOMLEFT: return (x + 1 < L && y - 1 < L) && (board2[x + 1][y - 1] = n);
      case BOTTOMRIGHT: return (x + 1 < L && y + 1 < L) && (board2[x + 1][y + 1] = n);
      default: throw new Error('');
    }
  }

  function of(v, direction) {
    const [x, y] = v;
    switch (direction) {
      case undefined: return [x, y];
      case LEFT: return [x, y - 1];
      case RIGHT: return [x, y + 1];
      case TOP: return [x - 1, y];
      case BOTTOM: return [x + 1, y];
      case TOPLEFT: return [x - 1, y - 1];
      case TOPRIGHT: return [x - 1, y + 1];
      case BOTTOMLEFT: return [x + 1, y - 1];
      case BOTTOMRIGHT: return [x + 1, y + 1];
      default: throw new Error('');
    }
  }

  function print() {
    console.log(board2.map(v =>
      v.map(v => (v === undefined) ? 'xx' : v.toString().padStart(2, '0')).join(' ')
    ).join('\n'));
  }

  const arr = [[[0, 0], [0, 1]]];

  while (arr.length > 0) {
    const [v1, v2] = arr.shift();
    const num = Math.max(get(v1), get(v2)) + 1;
    const isHori = v1[0] === v2[0];

    if (isHori) {
      if (get(v2, RIGHT) === 0) {
        set(v2, num);
        arr.push([of(v1, RIGHT), of(v2, RIGHT)]);
      }
      if (get(v1, LEFT) === 0) {
        set(v1, num);
        arr.push([of(v1, LEFT), of(v2, LEFT)]);
      }
      if (get(v1, TOP) === 0 && get(v2, TOP) !== undefined) {
        set(v1, num);
        arr.push([of(v1, TOP), of(v1)]);
      }
      if (get(v2, TOP) === 0 && get(v1, TOP) === undefined) {
        set(v2, num);
        arr.push([of(v2, TOP), of(v2)]);
      }
      if (get(v1, BOTTOM) === 0 && get(v2, BOTTOM) !== undefined) {
        set(v1, num);
        arr.push([of(v1), of(v1, BOTTOM)]);
      }
      if (get(v2, BOTTOM) === 0 && get(v1, BOTTOM) !== undefined) {
        set(v2, num);
        arr.push([of(v2), of(v2, BOTTOM)]);
      }
    } else {
      if (get(v1, TOP) === 0) {
        set(v1, num);
        arr.push([of(v1, TOP), of(v1)]);
      }
      if (get(v2, BOTTOM) === 0) {
        set(v2, num);
        arr.push([of(v2), of(v2, BOTTOM)]);
      }
      if (get(v1, LEFT) === 0 && get(v2, LEFT) !== undefined) {
        set(v1, num);
        arr.push([of(v1, LEFT), of(v1)]);
      }
      if (get(v2, LEFT) === 0 && get(v1, LEFT) !== undefined) {
        set(v2, num);
        arr.push([of(v2, LEFT), of(v2)]);
      }
      if (get(v1, RIGHT) === 0 && get(v2, RIGHT) !== undefined) {
        set(v1, num);
        arr.push([of(v1), of(v1, RIGHT)]);
      }
      if (get(v2, RIGHT) === 0 && get(v1, RIGHT) !== undefined) {
        set(v2, num);
        arr.push([of(v2), of(v2, RIGHT)]);
      }
    }

    // console.log(arr);
  }

  print();
  // console.log('board2[L - 2][L - 1]', board2[L - 2][L - 1]);
  // console.log('board2[L - 1][L - 2]', board2[L - 1][L - 2]);
  return Math.min(board2[L - 2][L - 1] || Infinity, board2[L - 1][L - 2] || Infinity) - 1;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
