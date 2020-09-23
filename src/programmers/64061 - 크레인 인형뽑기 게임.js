const { assert } = require('chai');

const inputs = [
  [[[0, 0, 0, 0, 0], [0, 0, 1, 0, 3], [0, 2, 5, 0, 1], [4, 2, 4, 4, 2], [3, 5, 1, 3, 1]], [1, 5, 3, 5, 1, 2, 1, 4]]
];

const outputs = [
  4
]

function main([board, moves]) {
  const HEIGHT = board.length;
  const WIDTH = board[0].length;

  const pointers = Array(WIDTH);
  const stack = [];
  let result = 0;

  for(let j = 0; j < WIDTH; j++) {
    for(let i = 0; i < HEIGHT; i++) {
      if (board[i][j] != 0) {
        pointers[j] = i;
        break;
      }
    }
  }

  for(let move2 of moves) {
    let move = move2 - 1;

    if (pointers[move] >= HEIGHT) {
      continue;
    }

    let doll = board[pointers[move]][move];
    
    if (stack.length > 0 && stack[stack.length - 1] === doll) {
      stack.pop();
      result++;
    } else {
      stack.push(doll);
    }

    pointers[move]++;
  }

  return result * 2;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
