const { assert } = require('chai');

const title = "42891 - 무지의 먹방 라이브";

const inputs = [
  [[3, 1, 2], 5],
  [[1, 2, 4, 4, 5, 4, 5], 12],
  [[1, 2, 4, 4, 5, 4, 5], 13],
  [[1, 2, 4, 4, 5, 4, 5], 14],
  [[1, 2, 4, 4, 5, 4, 5], 17],
  [[1, 2, 4, 4, 5, 4, 5], 18],
  [[1, 2, 4, 4, 5, 4, 5], 19],
  [[1, 2, 4, 4, 5, 4, 5], 24],
  [[1, 2, 4, 4, 5, 4, 5], 25],
  [[1, 2, 4, 4, 5, 4, 5], 26],
];

const outputs = [
  1,
  7, 3, 4, 7, 3, 4, 7, -1, -1
]

function main([food_times, k]) {
  const LENGTH = food_times.length;

  let sorted = [...food_times];
  sorted.sort((a, b) => a - b);

  let prev = 0, curr;
  let value = 0;
  let i;
  let tmp;

  for(i = 0; i < LENGTH;) {
    curr = sorted[i];

    tmp = (curr - prev) * (LENGTH - i);
    if (value + tmp > k) {
      break;
    }

    value += tmp;
    prev = curr;
    while(sorted[i] <= curr && i < LENGTH) {
      i++;
    }
  }

  if (i === LENGTH) {
    return -1;
  }

  let validIndex = -1;
  for(let j = 0; j < food_times.length; j++) {
    if(food_times[j] >= curr) {
      validIndex++;
    }

    if (validIndex === (k - value) % (LENGTH - i)) {
      return j + 1;
    }
  }
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
