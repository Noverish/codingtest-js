const { assert } = require('chai');

const inputs = [
  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  [[0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 1, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0]],
  [[0, 0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1], [0, 0, 1, 0, 0, 0, 1, 0], [0, 1, 0, 0, 0, 1, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0]],
  [[0, 0, 1, 0], [0, 0, 0, 0], [0, 1, 0, 1], [1, 0, 0, 0]],
  [[0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0], [0, 0, 1, 0, 0, 0], [1, 0, 0, 1, 0, 1], [0, 1, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0]],
];

const outputs = [
  900,
  3800,
  3800,
  2100,
  3200,
]

function printCache(cache) {
  const tmp = Array.from({ length: cache.length }, () => 
    Array.from({ length: cache.length }, () => '')
  );

  for(let i = 1; i < cache.length - 1; i++) {
    for (let j = 1; j < cache.length - 1; j++) {
      const a = cache[i][j][0];
      const b = cache[i][j][1];

      tmp[i - 1][j - 1] += (a === Infinity ? 'Infi' : a.toString()).padStart(4);
      tmp[i - 1][j - 1] += (b === Infinity ? 'Infi' : b.toString()).padStart(4);
    }
  }

  tmp.forEach(v => console.log(v.join(' ')));
}

function main(board) {
  const VERTI = 0, HORI = 1, LEN = board.length;
  const LINE = 100, CORNER = 600;
  const newBoard = Array.from({ length: LEN + 2 }, (_, i) =>
    Array.from({ length: LEN + 2 }, (_, j) => {
      if (i === 0 || i === LEN + 1 || j === 0 || j === LEN + 1) {
        return 1;
      } else {
        return board[i - 1][j - 1];
      }
    })
  )
  const cache = Array.from({ length: LEN + 2 }, () => 
    Array.from({ length: LEN + 2 }, () => [Infinity, Infinity])
  );
  cache[1][1] = [0, 0];

  const queue = [[1, 1]];
  while(queue.length) {
    const [x, y] = queue.shift();

    // bottom
    if (!newBoard[x + 1][y]) {
      const newCost1 = cache[x][y][VERTI] + LINE;
      const newCost2 = cache[x][y][HORI] + CORNER;
      const min = Math.min(newCost1, newCost2);
      if (cache[x + 1][y][VERTI] > min) {
        cache[x + 1][y][VERTI] = min;
        queue.push([x + 1, y]);
      }
    }
    //right
    if (!newBoard[x][y + 1]) {
      const newCost1 = cache[x][y][VERTI] + CORNER;
      const newCost2 = cache[x][y][HORI] + LINE;
      const min = Math.min(newCost1, newCost2);
      if (cache[x][y + 1][HORI] > min) {
        cache[x][y + 1][HORI] = min;
        queue.push([x, y + 1]);
      }
    }
    // top
    if (!newBoard[x - 1][y]) {
      const newCost1 = cache[x][y][VERTI] + LINE;
      const newCost2 = cache[x][y][HORI] + CORNER;
      const min = Math.min(newCost1, newCost2);
      if (cache[x - 1][y][VERTI] > min) {
        cache[x - 1][y][VERTI] = min;
        queue.push([x - 1, y]);
      }

    }
    // left
    if (!newBoard[x][y - 1]) {
      const newCost1 = cache[x][y][VERTI] + CORNER;
      const newCost2 = cache[x][y][HORI] + LINE;
      const min = Math.min(newCost1, newCost2);
      if (cache[x][y - 1][HORI] > min) {
        cache[x][y - 1][HORI] = min;
        queue.push([x, y - 1]);
      }

    }

    // console.log([x, y]);
    // console.log(queue);
    // printCache(cache);
  }

  return Math.min(cache[LEN][LEN][VERTI], cache[LEN][LEN][HORI]);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
