const { assert } = require('chai');

const inputs = [
  [2, 4, 2, 1],
  [16, 16, 2, 1],
  [16, 16, 2, 2],
];

const outputs = [
  "0111",
  "02468ACE11111111",
  "13579BDF01234567",
]

function main([n, t, m, p]) {
  let str = '';
  
  for(let i = 0; str.length < m * t; i++) {
    str += i.toString(n);
  }
  
  return str.split('').filter((v, i) => i % m === p - 1).join('').slice(0, t).toUpperCase();
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
