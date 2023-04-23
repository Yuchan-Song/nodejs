// dynamin import > 조건부로 모듈을 로드
const a = true;

if (a) {
  require('../custom_modules/var');
}

// a가 참이므로 module을 콘솔에 출력해보면 children에 var.js가 추가된 것을 확인할 수 있다.
console.log('dynamin import module > ', module);