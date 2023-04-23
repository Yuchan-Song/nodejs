// CommonJs 방식으로 모듈을 가져올 때 확장자는 생략 가능하다. (불러오는 모듈이 index.js라면 index.js도 생략 가능)
// var에서 선언한 객체를 가져온다.
const { odd, even } = require('./var');

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;