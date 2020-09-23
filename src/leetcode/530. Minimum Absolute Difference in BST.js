const { assert } = require('chai');

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

const n2 = new TreeNode(2);
const n3 = new TreeNode(3, n2, null);
const n1 = new TreeNode(1, null, n3);

const inputs = [
  n1
];

const outputs = [
  1
]

function inorder(node, nums) {
  if (node.left) {
    inorder(node.left, nums);
  }
  nums.push(node.val);
  if (node.right) {
    inorder(node.right, nums);
  }
}

function main(root) {
  const nums = [];

  inorder(root, nums);

  let minimum = Infinity;
  for(let i = 0; i < nums.length - 1; i++) {
    let tmp = nums[i+1] - nums[i];
    if (minimum > tmp) {
      minimum = tmp;
    }
  }

  return minimum;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
