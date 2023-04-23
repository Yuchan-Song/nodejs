// import, export default 구문은 module, require 처럼 함수나 객체를 불러오는 것이 아니라 문법이다.
// 따라서 import, export default 구문을 사용하기 위해서는 해당 파일을 ECMAScript 모듈(확장자: .mjs)로 만들어야 한다.
// 만약 파일 확장자를 .mjs로 만들지 않고 import, export default 구문을 사용하면 오류가 발생한다.
// 확장자를 .js로 만들고 ES6 모듈 문법을 사용하려면 package.json에서 type을 module로 설정해야 한다.
import { odd, even } from '../custom_modules/var.mjs';
import checkNum from '../custom_modules/func.mjs';

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkNum(10));
console.log(checkStringOddOrEven('hello'));