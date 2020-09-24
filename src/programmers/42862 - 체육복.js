const { assert } = require('chai');

const inputs = [
  [5, [2, 4], [1, 3, 5]],
  [5, [2, 4], [3]],
  [3, [3], [1]],
  [5, [2, 3], [3, 4]]
];

const outputs = [
  5, 4, 2, 4
]

function main([n, lost, reserve]) {
  let ediots = Array(31).fill(0);
  let ediots_num = 0;

  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);

  let l = 0, r = 0;
  while (l < lost.length && r < reserve.length) {
    if (lost[l] < reserve[r]) {
      l++;
    } else if (lost[l] > reserve[r]) {
      r++;
    } else {
      ediots[lost[l]] = 1;
      ediots_num++;
      l++;
      r++;
    }
  }

  l = 0;
  r = 0;
  let result = 0;

  while (l < lost.length && r < reserve.length) {
    let ll = lost[l];
    let rr = reserve[r];

    if (ediots[ll] == 1) {
      l++;
      continue;
    }

    if (ediots[rr] == 1) {
      r++;
      continue;
    }

    let diff = rr - ll;
    if (-1 <= diff && diff <= 1) {
      result++;
      l++;
      r++;
    } else {
      if (ll < rr) {
        l++;
      } else {
        r++;
      }
    }
  }

  return n - lost.length + result + ediots_num;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
