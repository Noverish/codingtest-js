const { assert } = require('chai');

const inputs = [
  
];

const outputs = [
  
]

function main(params) {
  
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
