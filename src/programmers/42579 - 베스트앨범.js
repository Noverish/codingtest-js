const { assert } = require('chai');

const inputs = [
  [["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]],
];

const outputs = [
  [4, 1, 3, 0]
]

function main([genres, plays]) {
  const map = {}
  const answer = [];

  for(let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];

    if(!map[genre]) {
      map[genre] = { total: 0, songs: []}
    }
    
    map[genre].songs.push({ i, play });
    map[genre].total += play;
  }

  const map2 = []
  Object.entries(map).forEach(([key, value]) => {
    value.songs.sort((a, b) => b.play - a.play);
    map2.push({ genre: key, ...value });
  })

  map2.sort((a, b) => b.total - a.total);

  map2.forEach((genre) => {
    const a = genre.songs[0];
    const b = genre.songs[1];

    answer.push(a.i);
    if (b) {
      answer.push(b.i);
    }
  });

  return answer;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
