const { assert } = require('chai');

const inputs = [
  ["Enter uid1234 Muzi", "Enter uid4567 Prodo","Leave uid1234","Enter uid1234 Prodo","Change uid4567 Ryan"]
];

const outputs = [
  ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]
]

function main(record) {
  const status = {};

  record.forEach((v) => {
    const words = v.split(' ');
    if (words[0] === 'Enter' || words[0] === 'Change') {
      status[words[1]] = words[2];
    }
  })

  return record.map((v) => {
    const words = v.split(' ');
    if (words[0] === 'Enter') {
      return `${status[words[1]]}님이 들어왔습니다.`;
    } else if (words[0] === 'Leave') {
      return `${status[words[1]]}님이 나갔습니다.`;
    }
    return undefined;
  }).filter(v => v !== undefined);
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
