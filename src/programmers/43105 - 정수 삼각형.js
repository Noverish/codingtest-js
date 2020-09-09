const { assert } = require('chai');

const inputs = [
  [[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]]
];

const outputs = [
  30
]

function main(triangle) {
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        triangle[i][j] = triangle[i - 1][j] + triangle[i][j];
      } else if (j === i) {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i][j];
      } else {
        triangle[i][j] = Math.max(
          triangle[i - 1][j] + triangle[i][j],
          triangle[i - 1][j - 1] + triangle[i][j],
        )
      }
    }
  }

  return triangle[triangle.length - 1].reduce((prev, curr) => Math.max(prev, curr), 0);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
