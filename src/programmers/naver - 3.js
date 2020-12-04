const { assert } = require('chai');

const inputs = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  11,
];

const outputs = [
  0, 0, 1, 1, 2, 5, 7, 12, 19, 99
]

function check(cache, n) {
  if (n < 0) {
    return 0;
  }
  
  if (cache[n] !== -1) {
    return cache[n];
  }

  const sum = (
    check(cache, n - 2) + 
    check(cache, n - 3) + 
    check(cache, n - 4) + 
    3 * check(cache, n - 5) + 
    3 * check(cache, n - 6) + 
    check(cache, n - 7)
  );

  cache[n] = sum;

  return sum;
}

function main(k) {
  const cache = Array(k + 1).fill(-1);

  cache[0] = 0;
  cache[1] = 0;
  cache[2] = 1;
  cache[3] = 1;
  cache[4] = 2;
  cache[5] = 5;
  cache[6] = 7;
  cache[7] = 12;

  check(cache, k);

  let i = k;
  while(i >= 6) {
    cache[k] -= cache[i - 6];
    i -= 6;
  }

  return cache[k];
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
