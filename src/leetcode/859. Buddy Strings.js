const { assert } = require('chai');

const inputs = [
  ['ab', 'ba'],
  ['ab', 'ab'],
  ['aa', 'aa'],
  ['aaaaaaabc', 'aaaaaaacb'],
  ['', 'aa'],
  ['abab', 'abab'],
  ['abcdef', 'fbcdea'],
  ['abac', 'abad'],
];

const outputs = [
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  false,
]

function main([A, B]) {
  if (A.length !== B.length) {
    return false;
  }

  if (A === B) {
    const arr = new Array(26).fill(0);
    for(let i = 0; i < A.length; i++) {
      const index = A.charCodeAt(i) - 97;
      if (arr[index] === 1) {
        return true;
      }
      arr[index]++;
    }
    return false;
  } else {
    let first, second;
    for(let i = 0; i < A.length; i++) {
      if (A.charAt(i) !== B.charAt(i)) {
        if (first === undefined) {
          first = i;
        } else if (second === undefined) {
          second = i;
        } else {
          return false;
        }
      }
    }

    if (first !== undefined && second !== undefined) {
      return (A.charAt(first) === B.charAt(second)) && (A.charAt(second) === B.charAt(first))
    } else {
      return false;
    }
  }
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
