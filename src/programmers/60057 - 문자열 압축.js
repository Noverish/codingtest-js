const { assert } = require('chai');

const inputs = [
  'aabbaccc',
  'ababcdcdababcdcd',
  'abcabcdede',
  'abcabcabcabcdededededede',
  'xababcdcdababcdcd',
  'ab',
  'a'
];

const outputs = [
  7, 9, 8, 14, 17, 2, 1
]

function main(s) {
  let minLength = 'a'.repeat(1000);

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    const chunks = s.match(new RegExp(`\\w{1,${i}}`, 'g'));
    let status = '';

    let lastChunk = ''
    let lastChunkNum = 0;
    chunks.forEach((chunk) => {
      if (chunk === lastChunk) {
        lastChunkNum++;
      } else {
        status += ((lastChunkNum > 1) ? lastChunkNum : '') + lastChunk
        lastChunk = chunk;
        lastChunkNum = 1;
      }
    })
    status += ((lastChunkNum > 1) ? lastChunkNum : '') + lastChunk;

    if (minLength.length > status.length) {
      minLength = status;
    }
  }

  return (minLength.length === 1000) ? 1 : minLength.length;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
