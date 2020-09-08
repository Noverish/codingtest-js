const input = require('fs').readFileSync('/dev/stdin').toString().split(' ');

console.log('node');

const num = parseInt(input);

switch (Math.floor(num / 10)) {
  case 10:
  case 9: {
    console.log('A');
    break;
  }
  case 8: {
    console.log('B');
    break;
  }
  case 7: {
    console.log('C');
    break;
  }
  case 6: {
    console.log('D');
    break;
  }
  default: {
    console.log('F');
  }
}
