const { assert } = require('chai');

const inputs = [
  ['ABCDEFG', ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF']],
  ['CC#BCC#BCC#BCC#B', ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B']],
  ['ABC', ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF']],
];

const outputs = [
  'HELLO',
  'FOO',
  'WORLD',
]

function timeStrToNum(time) {
  const splitted = time.split(':');
  return parseInt(splitted[0]) * 60 + parseInt(splitted[1]);
}

function main([m, musicinfos]) {
  const result = {};

  musicinfos.forEach((musicinfo) => {
    const splitted = musicinfo.split(',');

    const startStr = splitted[0];
    const endStr = splitted[1];
    const name = splitted[2];
    const song = splitted[3].match(/[A-G]#?/g).map(v => v.padEnd(2, ' '));

    const start = timeStrToNum(startStr);
    const end = timeStrToNum(endStr);
    const totalSong = Array.from({ length: end - start + 1 }, (_, i) => {
      return song[i % song.length];
    })

    const newMusic = m.match(/[A-G]#?/g).map(v => v.padEnd(2, ' ')).join('');
    const newTotalSong = totalSong.join('');
  
    if (newTotalSong.indexOf(newMusic) >= 0) {
      result[name] = end - start;
    }
  })

  const tmp = Object.entries(result);

  if (tmp.length === 0) {
    return "`(None)`";
  }

  tmp.sort((a, b) => b[1] - a[1])
  return tmp[0][0];
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
