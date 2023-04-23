// worker_threads : 노드에서 멀티 스레드를 지원하는 모듈
const { Worker, isMainThread, threadId, parentPort } = require('worker_threads')

// isMainThread : 현재 실행하는 스레드가 메인 스레드인지 확인
if (isMainThread) {
  // 워커 스레드(Worker)에서 실행될 모듈의 경로를 지정
  const worker = new Worker(__filename);
  // worker.on 사용시 워커 스레드에서 parentPort.close()를 호출해서 종료해야 함
  // 메시지를 한 번만 받고 싶은 경우 worker.once 사용
  // 워커 스레드로 메시지 전송할 이벤트 리스너
  worker.on('message', (msg) => console.log('from worker', msg));
  // 워커 스레드가 종료되었을 때 실행될 이벤트 리스너
  worker.on('exit', () => console.log('worker exit'));
  // 워커 스레드에 메시지 전송
  worker.postMessage('ping');
} else {
  // 부모 스레드로부터 메시지를 받ㅇ았을 때 실행될 이벤트 리스너
  parentPort.on('message', (msg) => {
    console.log('from parent', msg);
    parentPort.postMessage('pong');
    parentPort.close();
  });
}