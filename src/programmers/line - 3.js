const { assert } = require('chai');

const inputs = [
  73425, 10007, 9, 1234
];

const outputs = [
  [4, 3], [4, 8], [0, 9], [3, 1]
]

function main(n) {
  function asdf(level, n) {
    if (0 <= n && n < 10) {
      return [level, n];
    }
  
    const str = n.toString();
    const len = str.length;
  
    let min = Infinity;
    for (let i = 1; i < len; i++) {
      if ((i === len - 1) || (str.charAt(i) !== '0')) {
        const num1 = parseInt(str.slice(0, i));
        const num2 = parseInt(str.slice(i));
  
        if (min > num1 + num2) {
          min = num1 + num2;
        }
      }
    }
  
    return asdf(level + 1, min);
  }

  return asdf(0, n);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
