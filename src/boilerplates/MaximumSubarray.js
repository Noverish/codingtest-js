// https://en.wikipedia.org/wiki/Maximum_subarray_problem
// https://www.acmicpc.net/problem/10211

const { assert } = require('chai');

const inputs = [
  [2],
  [-1],
  [-2, 1, -2],
  [1, 2, 3, 4, 5],
  [-3, -4, -5, -2, -1, 0],
  [3, 2, -6, 4, 0],
  [100, -100, 50, -50, 1000],
  [-1000, -1000, -1000, -1000],
  [1, 2, -1, 15, 0, 5, 1000, -1000],
  [-2, -3, 4, -1, -2, 1, 5, -3],
  [-1, -2, -3],
  [1, 2, 3, 4, 5],
  [2, 1, -2, 3, -5]
];

const outputs = [
  [2, 0, 0],
  [-1, 0, 0],
  [1, 1, 1],
  [15, 0, 4],
  [0, 5, 5],
  [5, 0, 1],
  [1000, 0, 4],
  [-1000, 0, 0],
  [1022, 0, 6],
  [7, 2, 6],
  [-1, 0, 0],
  [15, 0, 4],
  [4, 0, 3],
]

function main(arr) {
  const LEN = arr.length;
  const cache = Array(LEN);
  cache[0] = arr[0];

  for (let i = 1; i < LEN; i++) {
    cache[i] = Math.max(0, cache[i - 1]) + arr[i];
  }

  let max = cache[0], maxEnd = 0;
  for (let i = 0; i < LEN; i++) {
    if (cache[i] > max) {
      max = cache[i];
      maxEnd = i;
    }
  }

  let curr = 0, maxStart;
  for (let i = maxEnd; i >= 0; i--) {
    curr += arr[i];
    if (curr === max) {
      maxStart = i;
      break;
    }
  }
  
  return [max, maxStart, maxEnd];
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})