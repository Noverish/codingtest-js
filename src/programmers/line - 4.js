const { assert } = require('chai');

const inputs = [
  [[0, 1, 0, 1], [0, 1, 0, 0], [0, 0, 0, 0], [1, 0, 1, 0]],
  [[0, 1, 0, 0, 0, 0], [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 0], [0, 1, 1, 1, 1, 0], [0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 1, 0]],
  [[0, 1, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0]],
  [[0, 0, 0, 0, 0, 0], [1, 1, 1, 0, 1, 1], [0, 0, 0, 0, 0, 0], [1, 0, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0], [1, 1, 0, 1, 1, 0]]
];

const outputs = [
  10, 32, 24, 22
]

function printDirection(direction){
  switch(direction) {
    case 0: return 'LEFT';
    case 1: return 'RIGHT';
    case 2: return 'TOP';
    case 3: return 'BOTTOM';
  }
}

function main(maze) {
  const L = maze.length;
  const LEFT = 0, RIGHT = 1, TOP = 2, BOTTOM = 3;
  const maze2 = Array.from({ length: L + 2 }, (_, i) => 
    Array.from({ length: L + 2}, (_, j) => {
      if (i === 0 || j === 0 || i === L + 1 || j === L + 1) {
        return 1;
      } else {
        return maze[i - 1][j - 1]
      }
    })
  )

  // maze2.forEach(row => console.log(row.join(' ')));
  
  let direction = maze2[1][2] ? RIGHT : TOP;
  let x = 1, y = 1;
  let moves = 0;

  // console.log(x - 1, y - 1, printDirection(direction));
  while(x !== L || y !== L) {
    switch(direction) {
      case LEFT: {
        if (maze2[x - 1][y]) {
          direction = TOP;
        } else if (maze2[x - 1][y - 1]) {
          x--
          moves++;
        } else {
          direction = BOTTOM;
          x--
          y--
          moves += 2;
        }
        break;
      }
      case RIGHT: {
        if (maze2[x + 1][y]) {
          direction = BOTTOM;
        } else if (maze2[x + 1][y + 1]) {
          x++;
          moves++;
        } else {
          direction = TOP;
          x++;
          y++;
          moves += 2;
        }
        break;
      }
      case TOP: {
        if (maze2[x][y + 1]) {
          direction = RIGHT;
        } else if (maze2[x - 1][y + 1]) {
          y++
          moves++;
        } else {
          direction = LEFT;
          x--
          y++
          moves += 2;
        }
        break;
      }
      case BOTTOM: {
        if (maze2[x][y - 1]) {
          direction = LEFT;
        } else if (maze2[x + 1][y - 1]) {
          y--;
          moves++;
        } else {
          direction = RIGHT;
          x++;
          y--;
          moves += 2;
        }
        break;
      }
    }

    // console.log(x - 1, y - 1, printDirection(direction));
  }

  return moves;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
