const { assert } = require('chai');

const title = "17680 - 캐시";

const inputs = [
  [3, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']],
  [3, ['Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul', 'Jeju', 'Pangyo', 'Seoul']],
  [2, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'SanFrancisco', 'Seoul', 'Rome', 'Paris', 'Jeju', 'NewYork', 'Rome']],
  [5, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA', 'SanFrancisco', 'Seoul', 'Rome', 'Paris', 'Jeju', 'NewYork', 'Rome']],
  [2, ['Jeju', 'Pangyo', 'NewYork', 'newyork']],
  [0, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA']],
  [2, ['Jeju', 'seoul', 'seoul', 'seoul']]
];

const outputs = [
  50, 21, 60, 52, 16, 25, 12
]

function main([cacheSize, cities]) {
  const cache = [];
  const result = cities.map((v) => {
    const city = v.toLowerCase();
    const index = cache.indexOf(city);

    cache.push(city);

    if (index >= 0) {
      cache.splice(index, 1);
      return 1;
    } else {
      if (cache.length > cacheSize) {
        cache.shift();
      }
      return 5;
    }
  })

  return result.reduce((a, b) => a + b, 0);
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
