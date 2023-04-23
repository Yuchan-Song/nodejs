// CommonJS 모듈 ( 확장자가 js 또는 cjs )
// module.exports 또는 exports 객체에 속성을 추가하여 모듈을 만든다.
// 사용하는 곳에서는 require() 함수를 사용하여 모듈을 불러온다.
const odd = 'CJS 홀수';
const even = 'CJS 짝수';

// 선언한 변수를 객체에 담아 모듈로 만든다.
module.exports = {
  odd
  , even
}

// console.log('var.js > require.main === module ? > ', require.main === module);
// 처음 실행한 모듈의 이름을 알고 싶을 경우 아래와 같이 사용한다.
// console.log('require.main.filename > ', require.main.filename);