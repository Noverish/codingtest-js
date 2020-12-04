const { assert } = require('chai');

const inputs = [
  "...!@BaT#*..y.abcdefghijklm",
  "z-+.^.",
	"123_.def"
];

const outputs = [
  "bat.y.abcdefghi",
  "z--",
  "123_.def"
]

function main(new_id) {
  let a = new_id.toLowerCase()
  let b = a.replace(/[^a-z0-9-_.]/g, '')
  let c = b.replace(/\.{2,}/g, '.')
  let d = c.replace(/^\./g, '');
  let e = d.replace(/\.$/g, '');
  // console.log(e);

  if (e.length === 0) {
    e = 'a';
  }

  let f = e.slice(0, 15).replace(/\.$/g, '');

  if (f.length <= 2) {
    // console.log(f.charAt(f.length));
    f = f.padEnd(3, f.charAt(f.length - 1))
  }

  return f;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
