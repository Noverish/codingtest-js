const { assert } = require('chai');

const inputs = [
  'croakcroak',
  'crcoakroak',
  'croakcrook',
  'croakcroa',
];

const outputs = [
  1,
  2,
  -1,
  -1,
]

function main(croakOfFrogs) {
  const croak = 'croak';
  const status = [];
  let maxFrog = 0;

  for(let i = 0; i < croakOfFrogs.length; i++) {
    const char = croakOfFrogs.charAt(i);
    const charIndex = croak.indexOf(char);

    if (charIndex === 0) {
      status.push(1);
    } else {
      const index = status.indexOf(charIndex);
      if (index >= 0) {
        if (charIndex === 4) {
          status.splice(index, 1)
        } else {
          status.splice(index, 1, charIndex + 1)
        }
      } else {
        return -1;
      }
    }

    maxFrog = Math.max(maxFrog, status.length);
  }

  if (status.length > 0) {
    return -1;
  }

  return maxFrog;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
