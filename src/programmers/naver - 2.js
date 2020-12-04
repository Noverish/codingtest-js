const { assert } = require('chai');

const inputs = [
  [9, [[0,2],[2,1],[2,4],[3,5],[5,4],[5,7],[7,6],[6,8]]],
  [9, [[0,1],[2,3],[1,2],[3,4],[4,5],[6,7],[7,8],[5,6]]],
];

const outputs = [
  [2, 5],
  [1, 7],
]

function main([n, edges]) {
  const childNums = Array(n).fill(0);
  const parents = Array(n).fill(-1);
  
  for(let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    const ap = parents[a];
    const bp = parents[b];

    if (ap === -1 && bp === -1) {
      parents[b] = a;
    } else if (ap !== -1 && bp === -1) {
      parents[b] = a;
    } else if (ap === -1 && bp !== -1) {
      parents[a] = b;
    } else {
      let c = a;
      let d = b;
      while(d !== -1) {
        let originParentOfD = parents[d];
        parents[d] = c;
        c = d;
        d = originParentOfD;
      }
    }
  }

  for(let i = 0; i < n; i++) {
    let tmp = i;
    while(tmp !== -1) {
      childNums[tmp] += 1;
      tmp = parents[tmp];
    }
  }
  
  let answer = [];
  for(let i = 0; i < n; i++) {
    let childNum = childNums[i];

    if (childNum === n / 3) {
      answer.push([i, parents[i]]);
    } else if (childNum === 2 * n / 3) {
      answer.push([i, parents[i]]);
    }
  }

  let answer2 = [];
  for(let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];
    
    for(let j = 0; j < answer.length; j++) {
      const [c, d] = answer[j];

      if (a === c && b === d) {
        answer2.push(i);
      } else if (a === d && b === c) {
        answer2.push(i);
      }
    }
  }
  
  answer2.sort((a, b) => a - b);

  return answer2;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
