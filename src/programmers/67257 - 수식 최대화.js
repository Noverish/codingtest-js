const { assert } = require('chai');

const inputs = [
  "100-200*300-500+20",
  "50*6-3*2",
];

const outputs = [
  60420,
  300
]

function operate(n1, op, n2) {
  switch (op) {
    case '-': return n1 - n2;
    case '+': return n1 + n2;
    case '*': return n1 * n2;
  }
}

function process(list, operator) {
  let newList = [list[0]];

  for (let i = 1; i < list.length; i += 2) {
    const op = list[i];
    const n2 = list[i + 1];

    if (op === operator) {
      const n1 = newList.pop();
      newList.push(operate(n1, op, n2))
    } else {
      newList.push(op);
      newList.push(n2);
    }
  }

  return newList;
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function permutation(arr, start, end, callback) {
  if (start === end) {
    callback(arr);
  } else {
    for (let i = start; i <= end; i++) {
      swap(arr, start, i);
      permutation(arr, start + 1, end, callback);
      swap(arr, start, i);
    }
  }
}

function main(expression) {
  const tmp = expression.match(/(\d+|\*|\+|-)/g);
  const list = tmp.map((v, i) => (i % 2 === 0) ? parseInt(v) : v);

  let max = 0;
  permutation(['-', '*', '+'], 0, 2, (arr) => {
    const newList1 = process(list, arr[0]);
    const newList2 = process(newList1, arr[1]);
    const newList3 = process(newList2, arr[2]);
    max = Math.max(max, Math.abs(newList3[0]));
  })

  return max;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
