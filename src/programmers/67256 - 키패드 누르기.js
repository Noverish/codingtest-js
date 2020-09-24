const { assert } = require('chai');

const inputs = [
  [[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"],
  [[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], "right"],
];

const outputs = [
  "LRLLLRLLRRL",
  "LRLLRRLLLRR",
  "LLRLLRLLRL",
]

function dist(n, m) {
  if (n === 0) {
    n = 11;
  }
  if (m === 0) {
    m = 11;
  }
  n--;
  m--;
  let m1 = Math.floor(m / 3);
  let m2 = m % 3;
  if (n === 1 || n === 4 || n === 7 || n === 10) {
    let n1 = Math.floor(n / 3);
    let n2 = n % 3;
    return Math.abs(n1 - m1) + ((n2 !== m2) ? 1 : 0);
  } else {
    throw new Error("asdf");
  }
}

function main([numbers, hand]) {
  let leftHand = 10, rightHand = 12;
  let isRight = hand === "right";
  let result = ""

  for(let n of numbers) {
    let useLeft = false;

    if (n > 0 && n % 3 === 1) {
      useLeft = true;
    } else if (n > 0 && n % 3 === 0) {
      useLeft = false;
    } else {
      let leftHandDist = dist(n, leftHand);
      let rightHandDist = dist(n, rightHand);

      if (leftHandDist < rightHandDist) {
        useLeft = true;
      } else if (leftHandDist > rightHandDist) {
        useLeft = false;
      } else {
        if (isRight) {
          useLeft = false;
        } else {
          useLeft = true;
        }
      }
    }

    result += useLeft ? "L" : "R";
    if (useLeft) {
      leftHand = n;
    } else {
      rightHand = n;
    }
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
