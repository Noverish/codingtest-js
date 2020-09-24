const { assert } = require('chai');

const inputs = [
  [5, [[1, 0, 0, 1], [1, 1, 1, 1], [2, 1, 0, 1], [2, 2, 1, 1], [5, 0, 0, 1], [5, 1, 0, 1], [4, 2, 1, 1], [3, 2, 1, 1]]],
  [5, [[0, 0, 0, 1], [2, 0, 0, 1], [4, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [2, 0, 0, 0], [1, 1, 1, 0], [2, 2, 0, 1]]]
];

const outputs = [
  [[1, 0, 0], [1, 1, 1], [2, 1, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 0, 0], [5, 1, 0]],
  [[0, 0, 0], [0, 1, 1], [1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 0, 0]],
]

function main([n, build_frame]) {
  const BUILD = 1, DELETE = 0, POLE = 0, BO = 1;
  const poleStatus = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => 0));
  const boStatus = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => 0));

  const getPole = (x, y) => (poleStatus[x] || [])[y];
  const getBo = (x, y) => (boStatus[x] || [])[y];
  const checkPole = (x, y) => getPole(x, y - 1) || getBo(x - 1, y) || getBo(x, y) || y === 0;
  const checkBo = (x, y) => {


    return (getBo(x - 1, y) && getBo(x + 1, y)) || getPole(x, y - 1) || getPole(x + 1, y - 1)
  };

  function check(work) {
    const [x, y] = work;

    if (work[2] === POLE && work[3] === BUILD) {
      if (checkPole(x, y)) {
        doo(work);
      }
    } else if (work[2] === POLE && work[3] === DELETE) {
      doo(work);

      const leftBo = getBo(x - 1, y + 1);
      const topPole = getPole(x, y + 1);
      const rightBo = getBo(x, y + 1);

      const result = (!leftBo || checkBo(x - 1, y + 1))
        && (!topPole || checkPole(x, y + 1))
        && (!rightBo || checkBo(x, y + 1));

      if (!result) {
        work[3] = BUILD;
        doo(work);
      }
    } else if (work[2] === BO && work[3] === BUILD) {
      if (checkBo(x, y)) {
        doo(work);
      }
    } else if (work[2] === BO && work[3] === DELETE) {
      doo(work);

      const leftBo = getBo(x - 1, y);
      const rightBo = getBo(x + 1, y);
      const leftPole = getPole(x, y);
      const rightPole = getPole(x + 1, y);

      const result = (!leftBo || checkBo(x - 1, y))
        && (!rightBo || checkBo(x + 1, y))
        && (!leftPole || checkPole(x, y))
        && (!rightPole || checkPole(x + 1, y));

      if (!result) {
        work[3] = BUILD;
        doo(work);
      }
    }
  }

  function doo(work) {
    const [x, y] = work;
    // console.log(x, y);

    if (work[2] === POLE && work[3] === BUILD) {
      poleStatus[x][y] = 1;
    } else if (work[2] === POLE && work[3] === DELETE) {
      poleStatus[x][y] = 0;
    } else if (work[2] === BO && work[3] === BUILD) {
      boStatus[x][y] = 1;
    } else if (work[2] === BO && work[3] === DELETE) {
      boStatus[x][y] = 0;
    }
  }

  function print(status) {
    console.log(status.map(v => v.join(' ')).join('\n'));
  }

  build_frame.forEach((work) => {
    const result = check(work);
    // console.log(result, work);
    if (result) {
      doo(work);
    }
  });

  const result = [];
  boStatus.forEach((v1, i) => {
    v1.forEach((v2, j) => {
      if (v2) {
        result.push([i, j, 1]);
      }
    })
  })
  poleStatus.forEach((v1, i) => {
    v1.forEach((v2, j) => {
      if (v2) {
        result.push([i, j, 0]);
      }
    })
  })

  result.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else if (a[1] !== b[1]) {
      return a[1] - b[1];
    } else {
      return a[2] - b[2];
    }
  })

  return result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
