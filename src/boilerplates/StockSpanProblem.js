// https://www.geeksforgeeks.org/the-stock-span-problem/

const { assert } = require('chai');

const inputs = [
  [10, 4, 5, 90, 120, 80],
  [6, 3, 4, 5, 2],
];

const outputs = [
  [1, 1, 2, 4, 5, 1],
  [1, 1, 2, 3, 1],
]

function main(price) {
  const stack = [0];
  const result = [1];

  for (let i = 1; i < price.length; i++){
    while (stack.length && price[stack[stack.length - 1]] <= price[i])  {
      stack.pop();
    }

    result[i] = (!stack.length) ? (i + 1) : (i - stack[stack.length - 1]); 
  
    stack.push(i); 
  }

  return result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
