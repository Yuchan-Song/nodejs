// global 객체
// 브라우저 환경에서는 window 객체가 전역 객체이지만
// Node.js 환경에서는 global 객체가 전역 객체이다.
// 전역 객체이기 때문에 파일 간에 데이터를 공유할 수 있다.
console.log(global);
console.log(globalThis);
console.log(globalThis === global);
