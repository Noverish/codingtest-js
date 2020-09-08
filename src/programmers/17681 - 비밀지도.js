const { assert } = require('chai');

const title = "17681 - 비밀지도";

const inputs = [
  [5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]],
  [6, [46, 33, 33 ,22, 31, 50], [27 ,56, 19, 14, 14, 10]],
];

const outputs = [
  ["#####","# # #", "### #", "#  ##", "#####"],
  ["######", "###  #", "##  ##", " #### ", " #####", "### # "],
]

function numToStr(n) {
  let str = "";
  while(n !== 0) {
    if (n % 2 === 1) {
      str = "#" + str;
    } else {
      str = " " + str;
    }
    n = Math.floor(n / 2);
  }
  return str;
}

function main([n, arr1, arr2]) {
  const newArr1 = Array.from({ length: n }, (_, i) => arr1[i] | arr2[i]);
  const newArr2 = newArr1.map((v) => numToStr(v).padStart(n, ' '));
  return newArr2;
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
