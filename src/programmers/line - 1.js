const { assert } = require('chai');

const inputs = [
  [[1, 2], [2, 1], [3, 3], [4, 5], [5, 6], [7, 8]],
  [[1, 2], [3, 4], [5, 6]],
  [[1, 2], [2, 3], [3, 1]]
];

const outputs = [
  2, 3, 0
]

function main(boxes) {
  let remainingBoxNum = boxes.length;
  const result = {};
  boxes.forEach(([v1, v2]) => {
    if (result[v1]) {
      remainingBoxNum -= 1;
      delete result[v1];
    } else {
      result[v1] = 1;
    }
    if (result[v2]) {
      remainingBoxNum -= 1;
      delete result[v2];
    } else {
      result[v2] = 1;
    }
  })

  // console.log(remainingBoxNum, result);

  return remainingBoxNum;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
