const { assert } = require('chai');

const title = "17684 - 압축";

const inputs = [
  'KAKAO',
  'TOBEORNOTTOBEORTOBEORNOT',
  'ABABABABABABABAB',
];

const outputs = [
  [11, 1, 27, 15],
  [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34],
  [1, 2, 27, 29, 28, 31, 30],
]

function main(msg) {
  const dict = Array.from({ length: 27 }, (_, i) => String.fromCharCode('A'.charCodeAt() + i - 1));
  const result = [];

  let now = msg.charAt(0);
  let nowIndex;
  for(let i = 1; i <= msg.length; i++) {
    nowIndex = dict.indexOf(now);

    if (nowIndex >= 0) {
      now += msg.charAt(i);
    } else {
      const previous = now.slice(0, now.length - 1);
      const previousIndex = dict.indexOf(previous);

      dict.push(now);
      result.push(previousIndex);

      now = now.slice(now.length - 1);
      i--;
    }
  }
  result.push(nowIndex);

  return result;
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
