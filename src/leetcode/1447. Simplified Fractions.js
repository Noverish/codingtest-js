const { assert } = require('chai');

const inputs = [1, 2, 3, 4];

const outputs = [
  [],
  ["1/2"],
  ["1/2", "1/3", "2/3"],
  ["1/2", "1/3", "1/4", "2/3", "3/4"],
]

function main(n) {
  if (n === 1) {
    return [];
  }

  const result = [];

  function gcd(x, y) {
    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  for (let denominator = 2; denominator <= n; denominator++) {
    for (let numerator = 1; numerator < denominator; numerator++) {
      if (numerator === 1 || gcd(denominator, numerator) === 1) {
        result.push(`${numerator}/${denominator}`);
      }
    }
  }

  return result.sort();
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
