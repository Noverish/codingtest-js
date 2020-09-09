const { assert } = require('chai');

const inputs = [
  [5, [2, 1, 2, 6, 2, 4, 3, 3]],
  [4, [4, 4, 4, 4, 4]],
];

const outputs = [
  [3, 4, 2, 1, 5],
  [4, 1, 2, 3],
]

function main([N, stages]) {
  const status = Array.from({ length: N + 1 }, (_, i) => {
    return stages.filter(v => v >= i + 1).length;
  });

  const status2 = Array.from({ length: N }, (_, i) => {
    return { stage: i + 1, ratio: status[i + 1] / status[i] };
  })

  status2.sort((a, b) => a.ratio - b.ratio);

  return status2.map(v => v.stage);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
