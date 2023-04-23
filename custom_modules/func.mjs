// ECMAScript Module
// ESM에서는 구조분해할당을 사용할 수 없다.
// 따라서 아래와 같이 사용시 오류가 발생한다.
// import { odd, even } from './var.mjs';
import { odd, even } from './var.mjs';

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

export default checkOddOrEven;