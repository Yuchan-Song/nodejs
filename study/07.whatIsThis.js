// 노드에서의 this의 의미
// 1.최상위 스코프에서의 this는 module.exports(또는 exports)를 가리킨다.
console.log(this);
console.log(this === module.exports);
console.log(this === exports);

// 2. 함수 스코프에서의 this는 global 객체를 가리킨다.
function whatIsThis() {
  console.log(this);
  console.log('function', this === exports, this === global);
}
whatIsThis();