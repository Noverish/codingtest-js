const { assert } = require('chai');

const inputs = [
  '1S2D*3T',
  '1D2S#10S',
  '1D2S0T',
  '1S*2T*3S',
  '1D#2S*3S',
  '1T2D3D#',
  '1D2S3T*',
];

const outputs = [
  37, 9, 3, 23, 5, -4, 59
]

function main(dartResult) {
  const darts = dartResult.match(/\d+(S|D|T)(\*|#)?/g);
  const result = darts.map((dart) => {
    const scoreStr = dart.match(/\d+/g)[0];
    const bonusStr = dart.match(/(S|D|T)/g)[0];
    const optionArr = dart.match(/(\*|#)/g) || [];
    const option = (optionArr.length !== 0) ? optionArr[0] : null;

    const score = parseInt(scoreStr);
    let bonus = 0;
    if(bonusStr === 'S') {
      bonus = 1;
    } else if(bonusStr === 'D') {
      bonus = 2;
    } else {
      bonus = 3;
    }

    return { score, bonus, option };
  })

  const result2 = result.map((v, i) => {
    // console.log(v);
    let num = Math.pow(v.score, v.bonus);

    if (v.option === '*') {
      num *= 2;
    }

    if (i < 2 && result[i + 1].option === '*') {
      num *= 2;
    }

    if (v.option === '#') {
      num *= -1;
    }

    return num;
  })

  return result2.reduce((a, b) => a + b, 0);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
