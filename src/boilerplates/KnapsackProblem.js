// https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/

const { assert } = require('chai');

const inputs = [
  [10, [5, 4, 5, 3], [10, 40, 30, 50]],
];

const outputs = [
  90,
]

function knapsack() {

}

function main([capacity, weights, values]) {
  const LEN = values.length;

  const cache = Array.from({ length: LEN + 1 }, () =>
    Array(capacity + 1).fill(0)
  )

  for (let i = 0; i <= LEN; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i == 0 || w == 0)
        cache[i][w] = 0;
      else if (weights[i - 1] <= w)
        cache[i][w] = Math.max(
          values[i - 1] + cache[i - 1][w - weights[i - 1]],
          cache[i - 1][w]
        );
      else
        cache[i][w] = cache[i - 1][w];
    }
  }

  return cache[LEN][capacity];
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
