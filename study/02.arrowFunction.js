// 화살표 함수의 추가
// > 화살표 함수는 항상 익명이다.
var rs1 = {
  name : 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends: function() {
    var that = this; // this(rs1객체를 가리킴)를 that에 저장
    this.friends.forEach(function(friend) {
      // console.log(this); // this는 전역객체를 가리킴
      // function으로 정의된 함수는 자신이 선언된 위치에서 this를 결정한다.
      // 따라서 rs1객체의 friends에 접근하기 위해서는 that에 저장해둔 this를 사용해야 한다.
      console.log(that.name, friend);
    });
  }
}
console.log(rs1);
rs1.logFriends();

const rs2 = {
  name : 'zero',
  friends: ['nero', 'hero', 'xero'],
  logFriends() {
    this.friends.forEach(friend => {
      // console.log(this)
      // 화살표 함수애서는 상위 스코프의 this를 그대로 사용 가능하다.
      console.log(this.name, friend);
    });
  }
}
rs2.logFriends();