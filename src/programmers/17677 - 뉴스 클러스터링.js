const { assert } = require('chai');

const title = "17677 - 뉴스 클러스터링";

const inputs = [
  ['FRANCE', 'french'],
  ['handshake', 'shake hands'],
  ['aa1+aa2', 'AAAA12'],
  ['E=M*C^2', 'e=m*c^2'],
];

const outputs = [
  16384,
  65536,
  43690,
  65536
]

function extractFractions(str) {
  const result = [];

  for (let i = 0; i < str.length - 1; i++) {
    const fraction = str.substr(i, 2);
    if (fraction.match(/[a-z]{2}/)) {
      result.push(fraction);
    }
  }

  return result;
}

function main([str1, str2]) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  const elements1 = extractFractions(str1).sort();
  const elements2 = extractFractions(str2).sort();

  const union = [];
  let i = 0, j = 0;
  while (i < elements1.length || j < elements2.length) {
    const e1 = elements1[i];
    const e2 = elements2[j];

    if (e1 && e2) {
      if (e1 < e2) {
        union.push(e1);
        i++;
      } else if (e1 > e2) {
        union.push(e2);
        j++;
      } else {
        union.push(e1);
        i++;
        j++;
      }
    } else if (e1) {
      union.push(e1);
      i++;
    } else if (e2) {
      union.push(e2);
      j++;
    }
  }

  const intersection = [];
  i = 0, j = 0;
  while (i < elements1.length || j < elements2.length) {
    const e1 = elements1[i];
    const e2 = elements2[j];

    if (e1 && e2) {
      if (e1 < e2) {
        i++;
      } else if (e1 > e2) {
        j++;
      } else {
        intersection.push(e1);
        i++;
        j++;
      }
    } else if (e1) {
      i++;
    } else if (e2) {
      j++;
    }
  }

  // console.log(JSON.stringify(elements1));
  // console.log(JSON.stringify(elements2));
  // console.log(JSON.stringify(union));
  // console.log(JSON.stringify(intersection));
  if (union.length === 0) {
    return 65536;
  }
  return Math.floor(intersection.length / union.length * 65536);
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
