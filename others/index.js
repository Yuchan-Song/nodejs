// import { AbstractNode } from "./AbstractNode.js";
import { AbstractNode } from './internal.js'

// 순환참조
// 1. index.js 를 실행하면 모듈 로더를 통해 AbstarctNode.js를 불러온다. (모듈 로더에 의해 모듈 캐시에 저장된다.)
// 2. AbstarctNode에서 첫번째 줄에 있는 Leaf.js를 불러온다.
// 3. Leaf에서 첫번째 줄에 있는 AbstractNode.js를 불러온다. (이 때는 index.js에서 불러온 AbstractNode.js가 아닌, 모듈 캐시에 저장된 AbstractNode.js를 불러온다.)
// 4. 모듈 캐시에 저장된 AbstractNode.js는 아직 정의가 되지 않은 상태이기 때문에, Leaf.js에서 AbstractNode를 extends 할 수 없다.

AbstractNode.from({
  today: {
    needCoffee: true,
    writeBlog: true
  },
  tomorrow: {
    holiday: 'hopefullay!',
    zenMode: {
      forever: true
    }
  }
})