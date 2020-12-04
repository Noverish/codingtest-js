const { assert } = require('chai');

const inputs = [
  [6, [5, 4, 7, 2, 0, 6], [4, 6, 4, 9, 2, 3]],
  [7, [6, 2, 1, 0, 2, 4, 3], [3, 6, 6, 2, 3, 7, 6]],
];

const outputs = [
  "275.00",
  "100.00",
]

function main([n, p, c]) {
  let stocks = 0;
  let money = 0;
  let asdf = 100;
  let i;

  for(i = 0; i < n; i++) {
    let pp = p[i];
    let cc = c[i];

    stocks += pp;

    if (stocks >= cc) {
      stocks -= cc;
      money += asdf * cc;
      asdf = 100;
    } else {
      if (asdf === 25) {
        i++;
        break;
      }
      asdf /= 2;
    }
  }

  return (money / i).toFixed(2);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
