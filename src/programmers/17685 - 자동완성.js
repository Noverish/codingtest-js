const { assert } = require('chai');

const inputs = [
  ['go', 'gone', 'guild'],
  ['abc', 'def', 'ghi', 'jklm'],
  ['word', 'war', 'warrior', 'world'],
];

const outputs = [
  7, 4, 15
]

class TreeNode {
  constructor(level, char) {
    this.level = level;
    this.char = char;
    this.children = [];
    this.num = 0;
  }
}

function print(node) {
  console.log({
    level: node.level,
    char: node.char,
    num: node.num,
    children: node.children.map(v => v.char),
  });
  node.children.forEach(v => print(v));
}

function main(words) {
  const root = new TreeNode(0, '');

  words.forEach((word) => {
    let nowNode = root;
    for (let i = 0; i < word.length; i++) {
      const nowChar = word.charAt(i);
      nowNode.num++;

      const child = nowNode.children.filter(v => v.char === nowChar);
      if (child.length > 0) {
        nowNode = child[0];
      } else {
        const newNode = new TreeNode(i + 1, nowChar);
        nowNode.children.push(newNode);
        nowNode = newNode;
      }
    }
    nowNode.num++;
  })

  // print(root);

  const tmp = words.map((word) => {
    let nowNode = root;
    for(let i = 0; i < word.length; i++) {
      const nowChar = word.charAt(i);
      const child = nowNode.children.find(v => v.char === nowChar);

      if (child.num === 1) {
        return i + 1;
      }
      nowNode = child;
    }
    return word.length;
  })
  
  // console.log(tmp);

  return tmp.reduce((a, b) => a + b, 0);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
