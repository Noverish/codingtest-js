const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');
const people = input[1].split(' ').map(v => parseInt(v));

people.sort((a, b) => a - b);

console.log(people.reduce((prev, curr, i, arr) => {
  return prev + arr.slice(0, i + 1).reduce((a, b) => a + b, 0);
}, 0))