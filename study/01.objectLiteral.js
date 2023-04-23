// ES2015(ES6)에서의 객체 리터럴의 변화
var sayNode = function() {
  console.log('Node');
};

var es = 'ES';
var oldObject = {
  sayJS: function() {
    console.log('JS');
  },
  sayNode: sayNode
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic


const newObject = {
  sayJS() {               // 객체의 메서드에 함수를 정의할 때 콜론(:), function 키워드를 생략할 수 있다.
    console.log('JS');
  },
  sayNode,                // 속성명과 변수명(함수명)같다면 한 번만 적어도 된다.
  [es + 6]: 'Fantastic'   // 객체 리터럴안에 속성명을 동적으로 생성 가능함.
}

newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic