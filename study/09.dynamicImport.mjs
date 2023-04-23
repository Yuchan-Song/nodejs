// dynamin import > 조건부로 모듈을 로드
const a = true;

if(a) {
  // ECMAScript에서 조건에 따라 import를 사용하려면 import() 함수를 사용해야 한다.
  // 아래과 같이 사용 할 경우 syntax error가 발생한다.
  // import '../custom_modules/var.mjs';

  // 아래와 같이 import 함수를 사용해 모듈을 불러와야 한다.
  // import 함수는 Promise 객체를 반환하기 때문에 await나 then을 사용해야 한다.( CommonJS 모듈에서는 사용X )
  // export default로 선언한 경우 import시 default라는 이름으로 불러온다.
  const obj = await import("../custom_modules/var.mjs");
  console.log(obj);

  const func = await import("../custom_modules/func.mjs");
  console.log(func);
}
