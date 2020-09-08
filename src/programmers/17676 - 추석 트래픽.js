const { assert } = require('chai');

const title = "17676 - 추석 트래픽";

const inputs = [
  [
    "2016-09-15 01:00:04.001 2.0s",
    "2016-09-15 01:00:07.000 2s"
  ],
  [
    '2016-09-15 20:59:57.421 0.351s',
    '2016-09-15 20:59:58.233 1.181s',
    '2016-09-15 20:59:58.299 0.8s',
    '2016-09-15 20:59:58.688 1.041s',
    '2016-09-15 20:59:59.591 1.412s',
    '2016-09-15 21:00:00.464 1.466s',
    '2016-09-15 21:00:00.741 1.581s',
    '2016-09-15 21:00:00.748 2.31s',
    '2016-09-15 21:00:00.966 0.381s',
    '2016-09-15 21:00:02.066 2.62s'
  ],
];

const outputs = [
  1,
  7,
]

function main(lines) {
  const tmp = []

  lines.map(line => {
    const secondSpaceIndex = line.indexOf(' ', line.indexOf(' ') + 1);
    const endStr = line.substr(0, secondSpaceIndex);
    const duration = parseFloat(line.substr(secondSpaceIndex, line.length - 1));
    const endMillis = new Date(endStr).getTime();
    const startMillis = endMillis - duration * 1000 + 1;
    // console.log(startMillis, endMillis);
    tmp.push({ millis: startMillis - 500, isStart: true });
    tmp.push({ millis: endMillis + 500, isStart: false });
  });

  tmp.sort((a, b) => {
    if (a.millis !== b.millis) {
      return a.millis - b.millis
    }
    
    if (a.isStart && !b.isStart) {
      return 1;
    } else if (!a.isStart && b.isStart) {
      return -1;
    } else {
      return 0;
    }
  });

  let max = 0;
  let now = 0;
  tmp.forEach(v => {
    if (v.isStart) {
      now++;
    } else {
      now--;
    }
    max = Math.max(max, now);
  });
  return max;
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
