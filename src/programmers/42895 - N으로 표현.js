const { assert } = require('chai');

const title = "42895 - N으로 표현";

const inputs = [
  [5, 12],
  [2, 11]
];

const outputs = [
  4,
  3
]

function main([N, number]) {
  const arr = {};
  arr[N] = 1;
  if (number === N) {
    return 1;
  }

  for (let i = 2; i < 9; i++) {
    const newNums = [];

    for (let j1 = 1; j1 <= Math.floor(i / 2); j1++) {
      const j2 = i - j1;

      const j1Arr = Object.entries(arr).filter(([key, value]) => value === j1);
      const j2Arr = Object.entries(arr).filter(([key, value]) => value === j2);

      for (let x = 0; x < j1Arr.length; x++) {
        for (let y = 0; y < j2Arr.length; y++) {
          const v1 = parseInt(j1Arr[x][0]);
          const v2 = parseInt(j2Arr[y][0]);

          newNums.push(v1 * v2);
          newNums.push(v1 + v2);
          newNums.push(v1 - v2);
          newNums.push(v2 - v1);
          newNums.push((v1 > v2) ? Math.floor(v1 / v2) : Math.floor(v2 / v1));

          if (`${v1}${v2}` === `${N}`.repeat(i)) {
            newNums.push(parseInt(`${v1}${v2}`));
          }
        }
      }
    }

    for (let j = 0; j < newNums.length; j++) {
      const newNum = newNums[j];
      if (newNum === number) {
        return i;
      }
      arr[newNum] = Math.min(i, arr[newNum] || Infinity);
    }
  }

  return -1;
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
