const { assert } = require('chai');

const inputs = [
  [2, 2],
  [2, 3],
];

const outputs = [
  ["00", "10", "01", "11"],
  ["00", "10", "20", "01", "11", "21", "02", "12", "22"]
]

function karyString(n, k, arr, callback) {
  if (n < 1) {
    callback(arr.join(''));
  } else {
    for (let j = 0; j < k; j++) {
      arr[n - 1] = j;
      karyString(n - 1, k, arr, callback);
    }
  }
}

function main([n, k]) {
  const arr = Array(n);
  const result = [];

  karyString(n, k, arr, (v) => result.push(v));
  
  return result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})