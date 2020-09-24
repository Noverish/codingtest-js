const { assert } = require('chai');

const inputs = [
  ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"],
  ["AA", "AB", "AC", "AA", "AC"],
  ["XYZ", "XYZ", "XYZ"],
  ["ZZZ", "YYY", "NNNN", "YYY", "BBB"],
  ["d", "a", "b", "c", "d"]
];

const outputs = [
  [3, 7],
  [1, 3],
  [1, 1],
  [1, 5],
  [1, 4],
]

function main(gems) {
  const LEN = gems.length;

  const set = new Set();
  for (const gem of gems) {
    set.add(gem);
  }
  const max = set.size;

  const map = new Map();
  let answer = [0, LEN - 1];
  map.set(gems[0], 1);
  let l = 0, r = 0;
  while (l <= LEN && r <= LEN) {
    if (map.size < max) {
      if (r === LEN - 1) {
        break;
      }

      const right = gems[++r];
      if (map.has(right)) {
        map.set(right, map.get(right) + 1);
      } else {
        map.set(right, 1);
      }
    } else if (map.size === max) {
      if (answer[1] - answer[0] > r - l) {
        answer = [l, r];
      }

      if (l == r) {
        break;
      }

      const left = gems[l];
      if (map.get(left) === 1) {
        map.delete(left);
      } else {
        map.set(left, map.get(left) - 1);
      }
      l++;
    }
  }

  return [answer[0] + 1, answer[1] + 1];
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
