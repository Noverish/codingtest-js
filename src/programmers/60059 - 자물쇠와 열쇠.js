const { assert } = require('chai');

const inputs = [
  [[[0, 0, 0], [1, 0, 0], [0, 1, 1]], [[1, 1, 1], [1, 1, 0], [1, 0, 1]]]
];

const outputs = [
  true,
]

function rotate(key) {
  return Array.from({ length: key.length }, (_, i) =>
    Array.from({ length: key.length }, (_, j) => key[key.length - j - 1][i])
  );
}

function printKey(key) {
  key.forEach(line => {
    console.log(line.join(' '));
  })
}

function main([key, lock]) {
  const KL = key.length;
  const LL = lock.length;

  const lock2 = Array.from({ length: LL }, (_, i) => parseInt(lock[i].join(''), 2));

  // rotate 0, 90, 180, 270 degree
  for(let x = 0; x < 4; x++) {
    
    for (let i = 1 - KL; i < LL; i++) {
      for (let j = 1 - KL; j < LL; j++) {
        const key2 = Array.from({ length: LL }, (_, a) =>
          parseInt(Array.from({ length: LL }, (_, b) =>
            (key[a - i] || [])[b - j] || 0
          ).join(''), 2)
        )

        let possible = true;
        for(let k = 0; k < LL; k++) {
          if ((lock2[k] ^ key2[k]) !== Math.pow(2, LL) - 1) {
            possible = false;
            break;
          }
        }

        if (possible) {
          // console.log(x, i, j);
          return true;
        }
      }
    }

    key = rotate(key);
  }

  return false;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
