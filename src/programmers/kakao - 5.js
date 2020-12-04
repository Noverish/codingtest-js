const { assert } = require('chai');

const inputs = [
  ["02:03:55", "00:14:15", ["01:20:15-01:45:14", "00:40:31-01:00:00", "00:25:50-00:48:29", "01:30:59-01:53:29", "01:37:44-02:02:30"]],
  ["99:59:59", "25:00:00", ["69:59:59-89:59:59", "01:00:00-21:00:00", "79:59:59-99:59:59", "11:00:00-31:00:00"]],
  ["50:00:00", "50:00:00", ["15:36:51-38:21:49", "10:14:18-15:36:51", "38:21:49-42:51:45"]]
];

const outputs = [
  "01:30:59",
  "01:00:00",
  "00:00:00",
]

function strToNum(str) {
  const [hour, min, sec] = str.split(':');
  return parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(sec);
}

function numToStr(num) {
  const sec = num % 60;
  num = Math.floor(num / 60);
  const min = num % 60;
  const hour = Math.floor(num / 60);
  return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

function main([play_time, adv_time, logs]) {
  const playTimeNum = strToNum(play_time);
  const advTimeNum = strToNum(adv_time);
  const maxAdvStartTimeNum = playTimeNum - advTimeNum;

  const status = [];

  logs.forEach((log) => {
    const [logStartStr, logEndStr] = log.split('-');
    const logStartNum = strToNum(logStartStr);
    const logEndNum = strToNum(logEndStr);

    status.push([logStartNum, 1]);
    status.push([logEndNum, 0]);
  })

  status.sort((a, b) => a[0] - b[0]);

  const status2 = [];
  let currNum = 0;
  status2.push([0, 0])
  status.forEach(([time, isStart]) => {
    currNum += (isStart) ? 1 : -1;
    status2.push([time, currNum]);
  })
  status2.push([playTimeNum, 0])

  // console.log(status2);

  const arr = [];
  for (let i = 0; i < status2.length; i++) {
    const prevNum = (status2[i - 1] || [])[1] || 0;
    const nowNum = status2[i][1]
    const nextNum = (status2[i + 1] || [])[1] || 0;

    if (nowNum > prevNum && nowNum > nextNum) {
      arr.push(i);
    }
  }
  // console.log(arr);

  function calcTime(i) {
    let [currTime, currNum] = status2[i];
    const advEndTime = currTime + advTimeNum;
    let result = 0;
    for (let j = i + 1; j < status2.length; j++) {
      const [nextTime, nextNum] = status2[j];
      const closestTime = Math.min(nextTime, advEndTime);

      // console.log(JSON.stringify({ currTime, currNum, nextTime, nextNum, advEndTime, closestTime }));
      // console.log((closestTime - currTime) * currNum)
      result += (closestTime - currTime) * currNum;

      if (nextTime > advEndTime) {
        break;
      }

      currTime = nextTime;
      currNum = nextNum;
    }
    return result;
  }

  let bestDuration = 0;
  let bestTime = -1;

  arr.forEach((index) => {
    const peakStart = status2[index];
    const peakEnd = status2[index + 1];
    const advBeforePeakStart = Math.max(peakStart[0] - advTimeNum, 0);

    for(let i = 0; i < status2.length; i++) {
      let [currTime, currNum] = status2[i];
      if (currTime < advBeforePeakStart) {
        continue;
      }
      if (peakEnd > currTime) {
        break;
      }
      
      const result = calcTime(i);

      if (bestDuration < result) {
        bestTime = status2[i][0];
        bestDuration = result;
      }
    }
  })


  // const index = status2.findIndex(v => v[0] > maxAdvStartTimeNum);
  // status2.splice(index, 0, [maxAdvStartTimeNum, (status2[index - 1] || [])[1] || 0])



  // console.log(status2);


  // // console.log(list);

  return numToStr(bestTime);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
