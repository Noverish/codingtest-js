const { assert } = require('chai');

const inputs = [
  ['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG'],
  ['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat'],
];

const outputs = [
  ['img1.png', 'IMG01.GIF', 'img02.png', 'img2.JPG', 'img10.png', 'img12.png'],
  ['A-10 Thunderbolt II', 'B-50 Superfortress', 'F-5 Freedom Fighter', 'F-14 Tomcat'],
]

function main(files) {
  files.sort((a, b) => {
    const headA = a.match(/[^0-9]+/g)[0].toLowerCase();
    const numA = a.replace(headA, '').match(/\d+/g)[0];
    const headB = b.match(/[^0-9]+/g)[0].toLowerCase();
    const numB = b.replace(headB, '').match(/\d+/g)[0];

    const numAA = parseInt(numA);
    const numBB = parseInt(numB);

    if (headA !== headB) {
      return headA.localeCompare(headB);
    } else if (numAA !== numBB) {
      return numAA - numBB;
    }
    return 0;
  })

  return files;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
