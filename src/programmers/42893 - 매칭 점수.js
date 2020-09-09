const { assert } = require('chai');

const inputs = [
  ['blind', ["<html lang=\"ko\" xml:lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta property=\"og:url\" content=\"https://a.com\"/>\n</head>  \n<body>\nBlind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. \n<a href=\"https://b.com\"> Link to b </a>\n</body>\n</html>", "<html lang=\"ko\" xml:lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta property=\"og:url\" content=\"https://b.com\"/>\n</head>  \n<body>\nSuspendisse potenti. Vivamus venenatis tellus non turpis bibendum, \n<a href=\"https://a.com\"> Link to a </a>\nblind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.\n<a href=\"https://c.com\"> Link to c </a>\n</body>\n</html>", "<html lang=\"ko\" xml:lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta property=\"og:url\" content=\"https://c.com\"/>\n</head>  \n<body>\nUt condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind\n<a href=\"https://a.com\"> Link to a </a>\n</body>\n</html>"]],
  ['Muzi', ["<html lang=\"ko\" xml:lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta property=\"og:url\" content=\"https://careers.kakao.com/interview/list\"/>\n</head>  \n<body>\n<a href=\"https://programmers.co.kr/learn/courses/4673\"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>", "<html lang=\"ko\" xml:lang=\"ko\" xmlns=\"http://www.w3.org/1999/xhtml\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta property=\"og:url\" content=\"https://www.kakaocorp.com\"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href=\"https://hashcode.co.kr/tos\"></a>\n\n\t^\n</body>\n</html>"]]
];

const outputs = [
  0, 1
]

function main([word, pages]) {
  const status = {};

  pages.forEach((page, i) => {
    const urlRegex = /<meta property="og:url" content="(\S+)"\/>/g;
    const url = page.match(urlRegex)[0].replace(urlRegex, "$1");

    const linksRegex = /<a href="(\S+)">/g;
    const links = (page.match(linksRegex) || []).map(v => v.replace(linksRegex, "$1"));

    const content = page.replace(/[^a-zA-Z]+/g, ' ');
    const wordRegex = new RegExp(`\\b${word}\\b`, 'ig');
    const words = content.match(wordRegex) || [];

    status[url] = {
      i,
      links,
      basicPoint: words.length,
      externalLinkNum: links.length,
      linkPoint: 0,
    }
  });

  Object.values(status).forEach((value) => {
    value.links.forEach((link) => {
      if (status[link]) {
        status[link].linkPoint += (value.basicPoint / value.externalLinkNum);
      }
    });
  });

  const result = Object.values(status).sort((v1, v2) => {
    const matchingPoint1 = v1.basicPoint + v1.linkPoint;
    const matchingPoint2 = v2.basicPoint + v2.linkPoint;

    if (matchingPoint1 !== matchingPoint2) {
      return matchingPoint2 - matchingPoint1;
    } else {
      return v1.i - v2.i;
    }
  })

  return result[0].i;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
