const { assert } = require('chai');

const inputs = [
  [4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']],
  [6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']],
];

const outputs = [
  14, 15
]

function main([m, n, board]) {
  const newBoard = Array.from({ length: n }, (_, col) => 
    Array.from({ length: m }, (_, row) => board[row].charAt(col)).join('')
  )

  let result = 0;

  while (true) {
    const status = Array.from({ length: n }, () => Array.from({ length: m }, () => 0));

    for (let row = 1; row < n; row++) {
      for (let col = 1; col < m; col++) {
        const here = newBoard[row].charAt(col);
        const topLeft = newBoard[row - 1].charAt(col - 1);
        const left = newBoard[row].charAt(col - 1);
        const top = newBoard[row - 1].charAt(col);
        if (here !== ' ' && here === topLeft && topLeft === left && left === top) {
          status[row][col] = 1;
          status[row - 1][col] = 1;
          status[row][col - 1] = 1;
          status[row - 1][col - 1] = 1;
        }
      }
    }

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < m; col++) {
        if (status[row][col] === 1) {
          const rowStr = newBoard[row];
          newBoard[row] = rowStr.slice(0, col) + ' ' + rowStr.slice(col + 1);
        }
      }

      newBoard[row] = newBoard[row].replace(/ +/g, '').padStart(m, ' ');
    }

    const num = status.reduce((sum1, subArr) => {
      return sum1 + subArr.reduce((sum2, num) => sum2 + num, 0);
    }, 0);

    result += num;
    if (num === 0) {
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
