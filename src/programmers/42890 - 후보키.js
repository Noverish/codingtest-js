const { assert } = require('chai');

const inputs = [
  [["100", "ryan", "music", "2"], ["200", "apeach", "math", "2"], ["300", "tube", "computer", "3"], ["400", "con", "computer", "4"], ["500", "muzi", "music", "3"], ["600", "apeach", "music", "2"]]
];

const outputs = [
  2
]

function arrCompare(arr1, arr2) {
  if (arr1.length == arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function main(relation) {
  const colnum = relation[0].length;
  const bitStrArr = Array.from({ length: Math.pow(2, colnum) - 1 }, (_, i) => {
    return (i + 1).toString(2).padStart(colnum, '0')
  }).sort((a, b) => {
    const oneNumA = a.match(/1/g).length;
    const oneNumB = b.match(/1/g).length;

    if (oneNumA !== oneNumB) {
      return oneNumA - oneNumB;
    } else {
      return b.localeCompare(a);
    }
  })

  const result = [];

  for (let x = 0; x < bitStrArr.length; x++) {
    const bitStr = bitStrArr[x];
    const partialRelation = [];

    if (result.find(v => (v & parseInt(bitStr, 2)) === v)) {
      continue;
    }

    let sameExist = false;
    for (let i = 0; i < relation.length; i++) {
      const row = [];
      for (let j = 0; j < colnum; j++) {
        if (bitStr.charAt(j) === '1') {
          row.push(relation[i][j]);
        }
      }

      if (partialRelation.find(v => arrCompare(v, row))) {
        sameExist = true;
        break;
      }
      partialRelation.push(row);
    }

    if (!sameExist) {
      result.push(parseInt(bitStr, 2));
    }

    // console.log(bitStr, sameExist);
  }

  return result.length;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
