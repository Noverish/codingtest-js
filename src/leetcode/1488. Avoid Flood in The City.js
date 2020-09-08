const { assert } = require('chai');

const title = "1488. Avoid Flood in The City";

const inputs = [
  [1, 2, 3, 4],
  [1, 2, 0, 0, 2, 1],
  [1, 2, 0, 1, 2],
  [69, 0, 0, 0, 69],
  [10, 20, 20],
  [0, 1, 1],
  [1, 1, 0, 0],
  [1, 0, 2, 0, 2, 1],
];

const outputs = [
  [-1, -1, -1, -1],
  [-1, -1, 2, 1, -1, -1],
  [],
  [-1, 69, 1, 1, -1],
  [],
  [],
  [],
  [-1, 1, -1, 2, -1, -1],
]

function main(rains) {
  const result = Array.from(
    { length: rains.length },
    (_, i) => (rains[i] > 0) ? -1 : undefined
  );

  const prevDays = {};

  function firstNoRainDayFunc(prevDay, nowDay) {
    for(let i = prevDay; i < nowDay; i++) {
      if (result[i] === undefined) {
        return i;
      } else {
        continue;
      }
    }
    return undefined;
  }

  for (let nowDay = 0; nowDay < rains.length; nowDay += 1) {
    const rainedLake = rains[nowDay];
    if (rainedLake === 0) {
      continue;
    }

    const prevDay = (prevDays[rainedLake] === undefined) ? -1 : prevDays[rainedLake];
    prevDays[rainedLake] = nowDay;
    if (prevDay < 0) {
      continue;
    }

    const firstNoRainDay = firstNoRainDayFunc(prevDay, nowDay);
    if (firstNoRainDay === undefined) {
      return [];
    }

    result[firstNoRainDay] = rainedLake;
  }

  return result.map(v => (v === undefined) ? 1 : v);

  // rains.forEach((rainedLake, i) => {
  //   const firstNoRainDay = result.indexOf(undefined);
  //   const lastRainedDay = rains.slice(0, i).lastIndexOf(rainedLake);


  //   if (lastRAi)


  //   if (rainedLake > 0 && firstNoRainDay >= 0 && firstNoRainDay < i) {
  //     result[firstNoRainDay] = rainedLake
  //   }
  // });

  // status = {};
  // for(let i = 0; i < rains.length; i += 1) {
  //   const rainedLake = rains[i];
  //   const driedLake = result[i];
  //   // console.log(i, rainedLake, driedLake, status);

  //   if (rainedLake > 0) {
  //     if (status[rainedLake]) {
  //       return [];
  //     } else {
  //       status[rainedLake] = 1;
  //     }
  //   } else if (driedLake >= 0) {
  //     status[driedLake] = 0;
  //   }
  // }

  // console.log(-1, result, status);
  // for (let i = 0; i < rains.length; i += 1) {
  //   const rainedLake = rains[i]

  //   if (rainedLake === 0) {
  //     continue;
  //   }

  //   if (status[rainedLake]) {
  //     const firstNoRainDay = result.indexOf(undefined);
  //     if (firstNoRainDay > i || firstNoRainDay < 0) {
  //       return [];
  //     } else {
  //       result[firstNoRainDay] = rainedLake;
  //     }
  //   } else {
  //     status[rainedLake] = 1;
  //   }

  //   console.log(i, result, status);
  // }

  // return result.map(v => (v === undefined) ? 1 : v);
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
