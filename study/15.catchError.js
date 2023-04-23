// 에러가 발생하면 setInterval이 멈추지만, 에러를 try catch로 잡아주었기 때문에 setInterval이 멈추지 않고 계속 실행된다.
// setInterval(() => {
//   console.log('시작');
//   try {
//     throw new Error('서버를 고장내주마!');
//   } catch (err) {
//     console.error(err);
//   }
// }, 1000);

const fs = require('fs');

// setInterval(() => {
//   // fs.unlink : 파일을 지우는 메서드
//   fs.unlink('./abcdefg.js', (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });
// }, 1000);

// const fs2 = require('fs').promises

// setInterval(() => {
//   fs2.unlink('./abcdefg.js').catch(console.error);
// }, 1000);

// 예측이 불가능한 에러 처리하기
// process 객체에 uncaughtException 이벤트 리스너를 달아주면 된다.
// 이 이벤트 리스너를 달면 예기치 못한 에러가 발생했을 때 이벤트 리스너가 실행되고 프로세스가 유지된다.
// 하지만, 복구 작업이 불가능하기 때문에 에러를 기록하는 정도로 사용하고 process.exit()로 프로세스를 종료하는 것이 좋다.
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다.');
}, 2000);