const { assert } = require('chai');

const inputs = [
  [[5, 3], [11, 5], [13, 3], [3, 5], [6, 1], [1, 3], [8, 6], [7, 2], [2, 2]]
];

const outputs = [
  [[7, 4, 6, 9, 1, 8, 5, 2, 3], [9, 6, 5, 8, 1, 4, 3, 2, 7]]
]

class Node {
  constructor(coord) {
    this.coord = coord;
    this.left = null;
    this.right = null;
  }

  add(node) {
    if (node.coord[0] > this.coord[0]) {
      if (this.right) {
        this.right.add(node);
      } else {
        this.right = node;
      }
    } else {
      if (this.left) {
        this.left.add(node);
      } else {
        this.left = node;
      }
    }
  }

  preorderPrint() {
    let left = [];
    let right = [];
    if(this.left) {
      left = this.left.preorderPrint();
    }
    if(this.right) {
      right = this.right.preorderPrint();
    }

    return [this.coord[2], ...left, ...right];
  }

  postorderPrint() {
    let left = [];
    let right = [];
    if(this.left) {
      left = this.left.postorderPrint();
    }
    if(this.right) {
      right = this.right.postorderPrint();
    }

    return [...left, ...right, this.coord[2]];
  }
}

function main(nodeinfo) {
  const asdf = nodeinfo.map((v, i) => ([...v, i + 1]));
  asdf.sort((a, b) => b[1] - a[1]);

  const root = new Node(asdf[0]);
  for(let i = 1; i < asdf.length; i++) {
    root.add(new Node(asdf[i]));
  }

  return [root.preorderPrint(), root.postorderPrint()];
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
