const { assert } = require('chai');

const inputs = [
  [[0, 3], [1, 9], [2, 6]]
];

const outputs = [
  9
]

function main(jobs) {
  const length = jobs.length;

  jobs.sort((a, b) => {
    const tmp = a[0] - b[0];
    if (tmp === 0) {
      return a[1] - b[1];
    }
    return tmp;
  });

  let nowTime = jobs[0][0];
  let result = 0;
  
  while(true) {
    const arrived = jobs.filter(v => v[0] <= nowTime);

    if (arrived.length === 0) {
      nowTime = jobs[0][0];
      continue;
    }

    arrived.sort((a, b) => a[1] - b[1]);
    const selected = arrived[0];
    
    jobs.splice(jobs.indexOf(selected), 1);

    nowTime += selected[1];
    result += nowTime - selected[0];

    if (jobs.length === 0) {
      break;
    }
  }

  return Math.floor(result / length);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
