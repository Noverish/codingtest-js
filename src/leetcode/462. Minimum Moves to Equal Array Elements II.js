const { assert } = require('chai');

const title = "462. Minimum Moves to Equal Array Elements II";

const inputs = [
  [1, 2, 3],
  [1, 0, 0, 8, 6],
];

const outputs = [
  2,
  14,
];

function main(nums) {
  nums.sort((a, b) => a - b);
  const length = nums.length;
  const target = nums[Math.floor(length / 2)];
  return nums.reduce((v1, v2) => v1 + Math.abs(v2 - target), 0);
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
