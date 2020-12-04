
const { assert } = require('chai');

const inputs = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 4, 0, 0, 0],
    [0, 0, 0, 2, 3, 0, 0, 5, 5, 5],
    [1, 2, 2, 2, 3, 3, 0, 0, 0, 5],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  ],
  [
    [10, 0, 0, 0],
    [10, 10, 10, 100],
    [1, 100, 100, 100],
    [1, 1, 1, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 6],
    [1, 0, 0, 2, 3, 4, 0, 0, 5],
    [1, 2, 2, 2, 3, 4, 4, 4, 5],
    [1, 1, 0, 3, 3, 0, 0, 5, 5],
  ],
];

const outputs = [
  2, 3, 3
]

function printBoard(board) {
  board.forEach(v => console.log(`'${v.join(' ')}'`));
}

function main(board) {
  let board2 = Array.from({ length: board.length }, (_, i) =>
    Array.from({ length: board.length }, (_, j) => board[j][i])
  )
  // printBoard(board2);

  let result = 0;
  while (true) {
    let success = 0;
    const leftmostNums = board2.map(v => v.find(v2 => v2 !== 0) || 0);
    // console.log(leftmostNums.join(' '));

    for (let i = 0; i < leftmostNums.length; i++) {
      const num1 = leftmostNums[i];
      const num2 = leftmostNums[i + 1];
      const num3 = leftmostNums[i + 2];

      if (num1 !== 0 && num1 === num2 && num2 === num3) {
        const a = board2[i].indexOf(num1);
        const b = board2[i + 1].indexOf(num2);
        const c = board2[i + 2].indexOf(num3);
        // console.log(num1, a, b, c);

        const min = Math.min(a, b, c);
        const arr1 = [a, b, c].sort((a, b) => a - b);
        const arr2 = [min, min + 1, min + 1];
        if (JSON.stringify(arr1) === JSON.stringify(arr2)) {
          board2 = board2.map(v => v.map(v2 => (v2 === num1) ? 0 : v2));
          success++;
          i += 2;
        }
      } else if (num1 !== 0 && num1 === num2) {
        const a = board2[i].indexOf(num1);
        const b = board2[i + 1].indexOf(num2);
        // console.log(num1, a, b);

        if (Math.abs(a - b) === 2) {
          board2 = board2.map(v => v.map(v2 => (v2 === num1) ? 0 : v2));
          success++;
          i += 1;
        }
      }
    }

    // printBoard(board2);
    result += success;
    if (success === 0) {
      break;
    }
  }

  return result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
