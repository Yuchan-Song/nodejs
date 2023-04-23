// process : 현재 실행중인 노드 프로세스에 대한 정보를 담고 있는 객체
// console.log(process);

// process.env : 시스템의 환경변수를 담고 있는 객체
// console.log(process.env);

// process.nextTick(콜백) : 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하도록 만든다.
setImmediate(() => {
  console.log('immediate');
});
process.nextTick(() => {
  console.log('nextTick');
});
setTimeout(() => {
  console.log('timeout');
}, 0);
Promise.resolve().then(() => console.log('promise'));
// 위의 코드를 실행하면 아래의 결과가 나온다.
// nextTick
// promise
// timeout
// immediate
// nextTick이 제일 먼저 출력되는 이유는 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백 함수를 우선으로 처리하도록 만들었기 때문이다.
// 그 다음에는 promise가 출력되는데, Promise도 nextTick처럼 이벤트 루프가 다른 콜백 함수들보다 우선시한다.
// 그 다음에는 timeout이 출력되는데, setTimeout은 타이머에 따라 콜백 함수를 호출하기 때문에 다른 콜백 함수들보다 늦게 출력된다.
// 그 다음에는 immediate가 출력되는데, setImmediate는 콜백 함수를 즉시 호출하는 것이 아니라 다른 콜백 함수들이 실행된 이후에 호출되기 때문이다.