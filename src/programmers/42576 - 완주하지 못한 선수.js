const { assert } = require('chai');

const inputs = [
  [['leo', 'kiki', 'eden'], ['eden', 'kiki']],
  [['marina', 'josipa', 'nikola', 'vinko', 'filipa'], ['josipa', 'filipa', 'marina', 'nikola']],
  [['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav']]
];

const outputs = [
  "leo",
  "vinko",
  "mislav"
]

function main([participant, completion]) {
  const status = {};
  participant.forEach((v) => {
    if (status[v]) {
      status[v] += 1;
    } else {
      status[v] = 1;
    }
  });

  completion.forEach((v) => {
    status[v] -= 1;
  })

  return Object.entries(status)
    .filter(([key, value]) => value !== 0)[0][0];
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
