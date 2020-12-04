const { assert } = require('chai');

const inputs = [
  [["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]],
  [["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5]],
  [["XYZ", "XWY", "WXA"], [2, 3, 4]]
];

const outputs = [
  ["AC", "ACDE", "BCFG", "CDE"],
  ["ACD", "AD", "ADE", "CD", "XYZ"],
  ["WX", "XY"],
]

function getCombinations(a, n, s = [], t = []) {
  return a.reduce((p, c, i, a) => {
    n > 1 ? getCombinations(a.slice(i + 1), n - 1, p, (t.push(c), t))
    : p.push((t.push(c), t).slice(0));
    t.pop();
    return p
  }, s)
}

function main([orders, course]) {
  const appearChars = []
  orders.forEach(v => {
    v.split('').forEach((ch) => {
      const j = ch.charCodeAt(0) - 65;
      if (!appearChars.includes(j)) {
        appearChars.push(j);
      }
    })
  })
  appearChars.sort((a, b) => a - b);

  const status = Array.from({ length: 26 }, () =>
    Array.from({ length: orders.length }, () => 0)
  )
  orders.forEach((order, i) => {
    order.split('').forEach((ch) => {
      const j = ch.charCodeAt(0) - 65;
      status[j][i] = 1;
    })
  })
  // status.forEach(v => console.log(v.join(' ')));

  const status2 = status.map(v => {
    return parseInt(v.join(''), 2);
  })
  // status2.forEach(v => console.log(v));

  const result = [];

  course.forEach((courseNum) => {
    const combinations = getCombinations(appearChars, courseNum);

    const list = combinations.reduce((prev, combi) => {
      // console.log(combi);
      const tmp = combi.map(v => status2[v]);
      const tmp2 = tmp.reduce((prev, curr) => prev & curr, tmp[0]);
      // console.log(tmp);
      // console.log(tmp2);
      const tmp3 = tmp2.toString(2).replace(/0/g, '').length;
      // console.log(tmp3);

      if (tmp3 >= 2) {
        prev.push([combi, tmp3]);
      }

      return prev;
    }, [])

    const max = list.reduce((prev, curr) => {
      return Math.max(prev, curr[1])
    }, 0)

    // console.log(max);

    const maxs = list.filter(v => v[1] === max && v[1] >= 2);

    // console.log(maxs);

    const maxs2 = maxs.map(([l]) => {
      return l.map(v2 => String.fromCharCode(v2 + 65)).join('')
    });

    maxs2.forEach(vv => result.push(vv));
  })

  // console.log(result);

  return result.sort((a, b) => a.localeCompare(b))





  // const combinations = {}

  // for (let i = 0; i < Math.pow(2, 10); i++) {
  //   const str = binary(i, orders.length);
  //   const oneNum = str.replace(/0/g, '').length;

  //   if (course.includes(oneNum)) {
  //     if (combinations[oneNum]) {
  //       combinations[oneNum].push(str);
  //     } else {
  //       combinations[oneNum] = [str];
  //     }
  //   }
  // }

  // combinations[2].forEach((combination) => {
  //   const indexs = [];

  //   combination.split('').forEach((v, i) => {
  //     if (v === '1') {
  //       indexs.push(i);
  //     }
  //   })

  //   console.log(indexs);
  // })

  // console.log(combinations);

  // const order2 = orders.map((order) => {
  //   let a = 0;
  //   for (let i = 0; i < order.length; i++) {
  //     const j = order.charCodeAt(i) - 65;
  //     a += Math.pow(2, j)
  //   }
  //   return a;
  // })

  // status.forEach((line) => {
  //   console.log(line.join(' '));
  // })

  // function combination(string) {

  // }

  // function binary(num) {
  //   let arr = [];
  //   while (num !== 0) {
  //     arr.unshift(num % 2);
  //     num = Math.floor(num / 2);
  //   }
  //   return arr.join('');
  // }


  // // order2.forEach(v => binary(v));

  // console.log(order2.map(v => binary(v)));
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
