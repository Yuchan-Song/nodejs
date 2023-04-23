// require 함수의 속성
console.log('require.js');

// module.exports가 파일의 최하단에 위치 할 필요는 없다.
module.exports = 'Find Me!'

// require도 파일의 최상단에 위치 할 필요는 없다.
require('./var');

// 한 번 require한 모듈은 require.cache에 저장되어 있다.
// { filepath : module 정보 }
// module 주요 정보
// 1. module의 id
// 2. module 에서 exports한 부분(exports)
// 3. module의 로딩 상태(loaded)
// 4. module의 자식 정보(children)
// console.log('require.cache > ', require.cache);
// 노드 실행시 첫 모듈의 정보를 담고 있다.
// console.log('require.main > ', require.main);
// node require.js로 실행시 true
// 이 파일에서 require한 var에서 아래의 코드를 실행시키면 false
// console.log('require.main === module ? > ', require.main === module);
// console.log('require.main.filename > ', require.main.filename);
