const { assert } = require('chai');

const inputs = [
  [12, 7, 11, 6, 2, 12],
  [1, 4, 10, 6, 9, 1, 8, 13],
  [10, 13, 10, 1, 2, 3, 4, 5, 6, 2],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3],
];

const outputs = [
  2, 1, -2, -2, 0,
]

function main(cards) {
  function possibleSums(cardsParam) {
    let result = [0];
    cardsParam.forEach((v) => {
      if (v !== undefined) {
        if (v !== 1) {
          result = result.map(v2 => v2 += Math.min(10, v));
        } else {
          let tmp1 = result.map(v2 => v2 += 1);
          let tmp2 = result.map(v2 => v2 += 11);
          result = [...tmp1, ...tmp2];
        }
      }
    });

    return result;
  }

  let i = 0;
  let playerMoney = 0;

  while (true) {
    const dealerCards = [];
    const playerCards = [];

    playerCards.push(cards[i++]);
    dealerCards.push(cards[i++]);
    playerCards.push(cards[i++]);
    dealerCards.push(cards[i++]);

    if (i > cards.length) {
      break;
    }

    const visibleDealerCard = dealerCards[1];

    while (true) {
      if (visibleDealerCard === 1 || visibleDealerCard >= 7) {
        if (possibleSums(playerCards).filter(v => v >= 17).length > 0) {
          break;
        }
        playerCards.push(cards[i++]);
        if (i > cards.length) {
          break;
        }
      } else if (4 <= visibleDealerCard && visibleDealerCard <= 6) {
        break;
      } else {
        if (possibleSums(playerCards).filter(v => v >= 12).length > 0) {
          break;
        }
        playerCards.push(cards[i++]);
        if (i > cards.length) {
          break;
        }
      }
    }

    if (i > cards.length) {
      break;
    }

    const tmp1 = possibleSums(playerCards);
    if (tmp1.filter(v => v > 21).length === tmp1.length) {
      playerMoney -= 2;
      // console.log(playerCards, possibleSums(playerCards));
      // console.log(dealerCards, possibleSums(dealerCards));
      // console.log('dealer win!');
      continue;
    } else if (tmp1.filter(v => v === 21).length > 0) {
      playerMoney += 3;
      // console.log(playerCards, possibleSums(playerCards));
      // console.log(dealerCards, possibleSums(dealerCards));
      // console.log('player blackjack!');
      continue;
    }

    while (true) {
      if (possibleSums(dealerCards).filter(v => v >= 17).length > 0) {
        break;
      }
      dealerCards.push(cards[i++]);
      if (i > cards.length) {
        break;
      }
    }

    if (i > cards.length) {
      break;
    }

    const tmp2 = possibleSums(dealerCards);
    if (tmp2.filter(v => v > 21).length === tmp2.length) {
      playerMoney += 2;
      // console.log(playerCards, possibleSums(playerCards));
      // console.log(dealerCards, possibleSums(dealerCards));
      // console.log('player win!');
      continue;
    } else if (tmp2.filter(v => v === 21).length > 0) {
      playerMoney -= 2;
      // console.log(playerCards, possibleSums(playerCards));
      // console.log(dealerCards, possibleSums(dealerCards));
      // console.log('dealer blackjack!');
      continue;
    }

    const playerMinDiff = possibleSums(playerCards).reduce((a, b) => Math.min(a, 21 - b), Infinity);
    const dealerMinDiff = possibleSums(dealerCards).reduce((a, b) => Math.min(a, 21 - b), Infinity);

    if (playerMinDiff > dealerMinDiff) {
      // console.log('dealer win!');
      playerMoney -= 2;
    } else if (playerMinDiff < dealerMinDiff) {
      // console.log('player win!');
      playerMoney += 2;
    } else {
      // console.log('game drawed');
    }

    // console.log(playerMinDiff, playerCards, possibleSums(playerCards));
    // console.log(dealerMinDiff, dealerCards, possibleSums(dealerCards));
  }

  // console.log('playerMoney', playerMoney);
  return playerMoney;
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.equal(main(input), outputs[i]);
    })
  })
})
