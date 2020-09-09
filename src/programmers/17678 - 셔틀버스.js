const { assert } = require('chai');

const inputs = [
  [1, 1, 5, ['08:00', '08:01', '08:02', '08:03']],
  [2, 10, 2, ['09:10', '09:09', '08:00']],
  [2, 1, 2, ['09:00', '09:00', '09:00', '09:00']],
  [1, 1, 5, ['00:01', '00:01', '00:01', '00:01', '00:01']],
  [1, 1, 1, ['23:59']],
  [10, 60, 45, ['23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59', '23:59']],
];

const outputs = [
  '09:00',
  '09:09',
  '08:59',
  '00:00',
  '09:00',
  '18:00'
]

function numToStr(num) {
  return Math.floor(num / 60).toString().padStart(2, '0') + ':' + (num % 60).toString().padStart(2, '0');
}

function main([n, t, m, timetable]) {
  const BUS_START = 9 * 60;
  timetable.sort();
  const numTimeTable = timetable.map(v => {
    const [hour, min] = v.split(':');
    return parseInt(hour) * 60 + parseInt(min);
  })

  let status = {};

  for(let i = 0; i < n; i++) {
    const nowBusTime = BUS_START + (t * i);
    const waitingPeople = numTimeTable.filter(v => v <= nowBusTime);
    const ridingPeopleNum = Math.min(waitingPeople.length, m)
    const ridingPeople = numTimeTable.splice(0, ridingPeopleNum);
    status[nowBusTime] = ridingPeople;
    // console.log(i, nowBusTime, ridingPeopleNum, waitingPeople, numTimeTable);
  }

  // console.log(status);

  for(let i = n - 1; i >= 0; i--) {
    const nowBusTime = BUS_START + (t * i);
    const ridingPeople = status[nowBusTime];

    if (ridingPeople.length < m) {
      return numToStr(nowBusTime);
    } else {
      const latestPerson = ridingPeople[ridingPeople.length - 1];
      return numToStr(latestPerson - 1);
    }
  }
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})

/*

*/