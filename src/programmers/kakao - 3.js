const { assert } = require('chai');

const inputs = [
  [
    ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"],
    ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"]
  ]
];

const outputs = [
  [1, 1, 1, 1, 2, 4]
]

function encode({ language, work, career, food }) {
  let tmp = 0;

  switch (language) {
    case 'cpp': {
      tmp += 1 << 6;
      break;
    }
    case 'java': {
      tmp += 1 << 7;
      break;
    }
    case 'python': {
      tmp += 1 << 8;
      break;
    }
  }

  switch(work) {
    case 'backend': {
      tmp += 1 << 4;
      break;
    }
    case 'frontend': {
      tmp += 1 << 5;
      break;
    }
  }

  switch(career) {
    case 'junior': {
      tmp += 1 << 2;
      break;
    }
    case 'senior': {
      tmp += 1 << 3;
      break;
    }
  }

  switch(food) {
    case 'chicken': {
      tmp += 1;
      break;
    }
    case 'pizza': {
      tmp += 1 << 1;
      break;
    }
  }

  return tmp;
}

function binarySearch(entries, num, start, end) {
  const pivot = Math.floor(end - start/ 2);

  if (entries[pivot][0] > num) {
    return binarySearch(entries, num, pivot + 1, end);
  } else if (entries[pivot][0] < num) {
    return binarySearch(entries, num, start, pivot - 1);
  } else {
    return pivot;
  }
}

function main([info, query]) {
  const status = {}

  info.forEach((i) => {
    const [language, work, career, food, score] = i.split(' ');
    const encoded = encode({ language, work, career, food })

    if (status[score]) {
      status[score].push(encoded);
    } else {
      status[score] = [encoded];
    }
  })

  const entries = Object.entries(status);

  const tmp = query.map((q) => {
    const [language, work, career, food, score] = q.replace(/ and /g, ' ').split(' ');
    const encodedQuery = encode({ language, work, career, food });
    let result = 0;

    entries.forEach(([k, v]) => {
      if (parseInt(k) >= score) {
        v.forEach(vv => {
          if ((vv & encodedQuery) === encodedQuery) {
            result += 1;
          }
        })
      }
    })

    return result;
  });
  
  return tmp;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
