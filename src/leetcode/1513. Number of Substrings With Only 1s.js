const { assert } = require('chai');

const inputs = [
  "0110111",
  "101",
  "111111",
  "000",
  "1111110110111",
  "1111110110111001111111111",
];

const outputs = [
  9, 2, 21, 0, 30, 85
]

function main(s) {
  const MODULO = 1e9 + 7;
  let result = 0;
  let now = 0;

  for(let i = 0; i < s.length; i++) {
    if (s[i] == '1') {
      now++;
      continue;
    }

    if (now != 0) {
      result += now * (now + 1) / 2;
      now = 0;
    }
  }

  if (now != 0) {
    result += now * (now + 1) / 2;
  }

  return result % MODULO;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
