const { assert } = require('chai');

const inputs = [
  [1, 22]
];

const outputs = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
]

function main([left, right]) {
  const result = [];
  for(let num = left; num <= right; num++) {
    let num2 = num;
    let possible = 1;
    while(num2) {
      const remainder = num2 % 10;
      if (num % remainder !== 0) {
        possible = 0;
        break;
      }
      num2 = (num2 - remainder) / 10;
    }

    if (possible) {
      result.push(num);
    }
  }

  return result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
