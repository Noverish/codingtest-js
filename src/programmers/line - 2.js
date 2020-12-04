const { assert } = require('chai');

const inputs = [
  [[1, 2, 3, 4, 5, 6], [6, 2, 5, 1, 4, 3]],
  [[11, 2, 9, 13, 24], [9, 2, 13, 24, 11]]
];

const outputs = [
  [6, 5, 1, 2, 4, 3],
  [24, 13, 9, 2, 11]
]

function main([ball, order]) {
  const remains = [];
  const result = [];

  order.forEach((o) => {
    // console.log(o, ball);
    if (ball[0] === o) {
      result.push(o);
      ball.shift();
    } else if (ball[ball.length - 1] === o) {
      result.push(o);
      ball.pop();
    } else {
      remains.push(o);
    }

    while(true) {
      let successThisTime = false;

      remains.forEach((r) => {
        // console.log(' ', r, ball);
        if (ball[0] === r) {
          result.push(r);
          ball.shift();
          remains.splice(remains.indexOf(r), 1);
          successThisTime = true;
        } else if (ball[ball.length - 1] === r) {
          result.push(r);
          ball.pop();
          remains.splice(remains.indexOf(r), 1);
          successThisTime = true;
        }
      })

      if (!successThisTime) {
        break;
      }
    }
  })

  return result;

  // console.log(result);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
