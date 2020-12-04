const { assert } = require('chai');

const inputs = [
  [6, 4, 6, 2, [[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]],
  [7, 3, 4, 1, [[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]],
  [6, 4, 5, 6, [[2, 6, 6], [6, 3, 7], [4, 6, 7], [6, 5, 11], [2, 5, 12], [5, 3, 20], [2, 4, 8], [4, 3, 9]]],
  [3, 1, 2, 3, [[1, 2, 2], [1, 3, 5], [2, 3, 2]]]
];

const outputs = [
  82, 14, 18, 4
]

function asdf(start, nodes) {
  const startNode = nodes[start];
  startNode.cost = 0;

  const queue = [start];
  while (queue.length > 0) {
    const nowNodeNum = queue.shift();
    const nowNode = nodes[nowNodeNum];
    const neighbors = nowNode.neighbors;

    Object.entries(neighbors).forEach(([num, cost]) => {
      const neighborNode = nodes[num];
      if (neighborNode.cost > nowNode.cost + cost) {
        neighborNode.cost = nowNode.cost + cost;
      }

      if (!neighborNode.visited) {
        queue.push(num);
      }
    });

    nowNode.visited = true;
  }
}

class Node {
  constructor(num) {
    this.num = num;
    this.neighbors = {};
    this.cost = Infinity;
    this.visited = false;
  }

  add(node, fare) {
    this.neighbors[node.num] = fare;
  }
}

function main([n, s, a, b, fares]) {
  const nodesS = Array.from({ length: n + 1 }, (_, i) => new Node(i));
  const nodesA = Array.from({ length: n + 1 }, (_, i) => new Node(i));
  const nodesB = Array.from({ length: n + 1 }, (_, i) => new Node(i));

  [nodesA, nodesB, nodesS].forEach((nodes) => {
    fares.forEach(([a, b, fare]) => {
      const nodeA = nodes[a];
      const nodeB = nodes[b];
      nodeA.add(nodeB, fare);
      nodeB.add(nodeA, fare);
    })
  })

  asdf(s, nodesS);
  asdf(a, nodesA);
  asdf(b, nodesB);

  let result = Infinity;
  for (let i = 1; i <= n; i++) {
    const tmp = nodesS[i].cost + nodesA[i].cost + nodesB[i].cost;
    if (result > tmp) {
      result = tmp;
    }
  }

  return result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
