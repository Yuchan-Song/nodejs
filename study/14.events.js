const EventEmmiter = require('events');

const myEvent = new EventEmmiter();

myEvent.on('event1', () => {
  console.log('event1');
});
myEvent.on('event2', () => {
  console.log('event2');
});
// once : 한번만 실행
myEvent.once('event3', () => {
  console.log('event3');
});

myEvent.emit('event1');
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
  console.log('event4');
});
myEvent.emit('event4');
// removeAllListeners : 이벤트 리스너를 삭제
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

// listenerCount : 현재 리스너가 몇개 등록되어 있는지 확인
console.log(myEvent.listenerCount('event1')); // 1
