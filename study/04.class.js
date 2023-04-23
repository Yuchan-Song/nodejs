// 클래스 생성과 상속
// Human 생성자 함수
var Human = function(type) {
  this.type = type || 'human';
};

Human.isHuman = function(human) {
  return human instanceof Human;
}

Human.prototype.breath = function() {
  console.log('호흡을 합니다.')
}

// Zero 생성자 함수
var Zero = function(type, firstName, LastName) {
  // apply를 사용하여 부모의 생성자를 호출
  Human.apply(this, arguments);
  this.firstName = firstName;
  this.LastName = LastName;
}

Zero.prototype = Object.create(Human.prototype);

Zero.prototype.constructor = Zero;
Zero.prototype.sayName = function() {
  console.log(`${this.firstName} ${this.LastName}`);
}

var oldZero = new Zero('human', 'Zero', 'Cho');
console.log(Human.isHuman(oldZero));
oldZero.breath();
oldZero.sayName();

// ES6의 클래스 : java의 클래스와 유사하게 작성 > but, 동작은 프로토 타입 기반으로 동작한다.
class EHuman {
  constructor(type = 'human') {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breath() {
    console.log('호흡을 합니다.');
  }
}

class EZero extends EHuman {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
}

const newZero = new EZero('human', 'Zero', 'Cho');
newZero.breath();
newZero.sayName();