// https://leetcode.com/problems/largest-rectangle-in-histogram/
// https://www.geeksforgeeks.org/largest-rectangle-under-histogram/?ref=lbp

const { assert } = require('chai');

const inputs = [
  [6, 2, 5, 4, 5, 1, 6],
  [2, 1, 5, 6, 2, 3],
];

const outputs = [
  12,
  10
]

function main(heights) {
  let LEN = heights.length;
  let maxArea = -1, top = -1, left, currentArea;
  const heightStack = Array(LEN);
  const indexStack = Array(LEN);

  for (let i = 0; i <= LEN; i++) {
    while (top >= 0 && (i === LEN || heightStack[top] > heights[i])) {
      if (top > 0) {
        left = indexStack[top-1];
      } else {
        left = -1;
      }
      currentArea = (i - left - 1) * heightStack[top];
      top--;
      maxArea = Math.max(maxArea, currentArea);
    }
    if (i < LEN) { 
      top++;
      heightStack[top] = heights[i];
      indexStack[top] = i;
    }
  }

  return maxArea;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
