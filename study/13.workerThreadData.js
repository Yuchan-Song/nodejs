const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  const threads = new Set();
  // workerData : 워커 스레드에게 전달할 데이터
  threads.add(new Worker(__filename, {
    workerData: { start: 1 },
  }));
  threads.add(new Worker(__filename, {
    workerData: { start: 2 },
  }));

  for(let worker of threads) {
    worker.on('message', (msg) => console.log(`from worker \n\t id > ${worker.threadId}\n\t message > ${msg}`));
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log('job done');
      }
    });
  }

} else {
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}