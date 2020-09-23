const { assert } = require('chai');

const inputs = [
  [[1, 12, -5, -6, 50, 3], 4],
  [[5], 1],
  [[0, 4, 0, 3, 2], 1],
];

const outputs = [
  12.75,
  5,
  4,
]

function main([nums, k]) {
  let now_sum = 0;

  for(let i = 0; i < k; i++) {
    now_sum += nums[i];
  }

  let maximum = now_sum;

  for(let i = k; i < nums.length; i++) {
    now_sum += nums[i] - nums[i - k];
    maximum = Math.max(maximum, now_sum);
  }

  return maximum / k;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
