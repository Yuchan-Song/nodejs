// 구조분해할당
var cm = {
  status : {
    name : 'node',
    count : 5
  },
  getCandy: function() {
    // this는 cm객체를 가리킨다.
    console.log(this);
    this.status.count--;
    return this.status.count;
  }
};
cm.getCandy();
console.log(cm.status.count);

var cm2 = {
  status : {
    name : 'node',
    count : 5
  },
  getCandy() {
    // 구조분해할당을 하는 경우 this가 참조하는 대상이 달라진다.
    // this는 전역객체를 가리킨다.
    console.log(this);
    // 전역객체에서 status count를 찾으려고 하기 때문에 에러가 발생한다.
    this.status.count--;
    return this.status.count;
  }
};

const { getCandy, status: { count } } = cm2;
console.log(count);


// 배열의 구조분해할당
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];

console.log(node, obj, bool);

const [node2, obj2, ,bool2] = array;

console.log(node2, obj2, bool2);
