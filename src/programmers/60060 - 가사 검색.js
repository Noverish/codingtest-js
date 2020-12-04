const { assert } = require('chai');

const inputs = [
  [["frodo", "front", "frost", "frozen", "frame", "kakao"], ["fro??", "????o", "fr???", "fro???", "pro?", "?????", "???"]]
];

const outputs = [
  [3, 2, 4, 1, 0, 5, 0]
]

class Node {
  constructor(char) {
    // this.char = char;
    this.children = {};
    this.status = {};
  }

  add(char, restLen) {
    let child = this.children[char];
    if (!child) {
      child = new Node(char);
      this.children[char] = child;
    }

    if (!this.status[restLen]) {
      this.status[restLen] = 0;
    }

    this.status[restLen] += 1;
    return child;
  }

  print(level) {
    const padding = '  '.repeat(level);
    const char = this.char;
    const children = '[' + Object.values(this.children).map(v => v.char).join(',') + ']';
    const status = JSON.stringify(this.status);

    console.log(`${padding}${char} ${children} ${status}`);
    Object.values(this.children).forEach((child) => {
      child.print(level + 1);
    })
  }
}

function main([words, queries]) {
  const rootPrefix = new Node('0');
  const rootSuffix = new Node('0');

  words.forEach((word) => {
    const LEN = word.length;

    let nowNode = rootPrefix;
    for (let i = 0; i < LEN; i++) {
      const char = word.charAt(i);
      const child = nowNode.add(char, LEN - i);
      nowNode = child;
    }

    nowNode = rootSuffix;
    for (let i = LEN - 1; i >= 0; i--) {
      const char = word.charAt(i);
      const child = nowNode.add(char, i + 1);
      nowNode = child;
    }
  });

  // rootFirst.print(0);
  // rootLast.print(0);

  const result = queries.map((query) => {
    const LEN = query.length;
    const isSuffix = (query.charAt(0) === '?');

    if (isSuffix) {
      let nowNode = rootSuffix;

      for (let i = LEN - 1; i >= 0; i--) {
        const char = query.charAt(i);

        if (!nowNode) {
          return 0;
        }

        if (char !== '?') {
          nowNode = nowNode.children[char];
        } else {
          return nowNode.status[i + 1] || 0;
        }
      }
    } else {
      let nowNode = rootPrefix;

      for (let i = 0; i < LEN; i++) {
        const char = query.charAt(i);

        if (!nowNode) {
          return 0;
        }

        if (char !== '?') {
          nowNode = nowNode.children[char];
        } else {
          return nowNode.status[LEN - i] || 0;
        }
      }
    }
  })

  return result;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
