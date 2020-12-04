const { assert } = require('chai');

const inputs = [
  ["CBD", ["BACDE", "CBADF", "AECB", "BDA"]]
];

const outputs = [
  2
]

function main([skill, skill_trees]) {
  const cache = Array(26).fill(0);
  for(let i = 0; i < skill.length; i++) {
    cache[skill.charCodeAt(i) - 65] = i + 1;
  }

  let result = 0;
  for (let i = 0; i < skill_trees.length; i++) {
    const skill_tree = skill_trees[i];

    let a = 0;
    let b = 0;

    while(b < skill_tree.length) {
      const bb = skill_tree[b];
      const order = cache[bb.charCodeAt(0) - 65];

      if (order) {
        if (order - a === 1) {
          a = order;
        } else {
          result++;
          break;
        }
      }

      b++;
    }
  }

  return skill_trees.length - result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
