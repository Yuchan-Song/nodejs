// console.log('cjsIndex module start > ', module)
// console.log('cjsIndex require start > ', require);
// var, func 모듈 불러오기
const { odd, even } = require('../custom_modules/var');
// 위의 코드를 아래와 같이 사용할 수도 있다.
// const obj = require('./custom_modules/var');
// const odd = obj.odd;
// const even = obj.even;
const checkNumber = require('../custom_modules/func');

// 문자열의 길이가 홀수인지 짝수인지 확인하는 함수
function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkNumber(134));
console.log(checkStringOddOrEven('hello'));

// console.log('cjsIndex module end > ', module)
// console.log('cjsIndex require end > ', require)