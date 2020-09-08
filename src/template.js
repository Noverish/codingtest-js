const { assert } = require('chai');

const title = "title";

const inputs = [
  
];

const outputs = [
  
]

function main(params) {
  
}

describe(title, () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
