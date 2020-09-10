const { assert } = require('chai');

const inputs = [
  '(()())()',
  ')(',
  '()))((()',
];

const outputs = [
  '(()())()',
  '()',
  '()(())()',
]

function isRight(str) {
  let level = 0;
  for(let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      level++;
    } else {
      level--;
    }

    if (level < 0) {
      return false;
    }
  }
  if (level === 0) {
    return true;
  } else {
    return false;
  }
}

function main(str) {
  if (str === '') {
    return '';
  }

  let open = 0, close = 0, i = 0;
  for (; i < str.length; i++) {
    if (str[i] === '(') {
      open++;
    } else {
      close++;
    }

    if (open === close) {
      break;
    }
  }

  const u = str.slice(0, i + 1);
  const v = str.slice(i + 1);

  if (isRight(u)) {
    return u + main(v);
  }

  const uu = u.slice(1, u.length - 1);
  const uuu = uu.split('').map(v => v === ')' ? '(' : ')').join('');
  return '(' + main(v) + ')' + uuu;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
