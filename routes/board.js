const express = require('express');
// XSS(Cross Site Scripting) 방지 모듈
const sanitizeHtml = require('sanitize-html');
// CSRF(Cross Site Request Forgery) 방지 모듈
//  > CSRF 공격 : 사용자가 자신의 의지와는 무관하게 공격자가 의도한 행동을 하도록 유도하는 공격
//  > CSRF 공격을 막기 위해 CSRF 토큰을 사용함 : 서버에서 생성한 토큰을 브라우저에서 전달받은 토큰과 비교하여 일치하지 않으면 요청을 거부함
//  > CSRF 토큰은 사용자의 세션에 임의의 문자열을 저장하고, 이를 통해 사용자가 요청한 것인지 검증함
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.get('/', (req, res) => {
  const html = "<script>location.href = 'https://naver.com'</script>";
  console.log(html);
  // sanitizeHtml() : 허용하지 않는 태그나 스크립트를 제거하는 제거하는 모듈 ( XSS 방지 )
  console.log(sanitizeHtml(html));
  // req 객체
  // req.app : app 객체를 가리킴
  // req.body : body 객체를 가리킴 ( body-parser 미들웨어가 만드는 객체 )
  // req.cookies : cookie-parser 미들웨어가 만드는 객체
  // req.signedCookie : 서명된 쿠키 객체
  // req.ip : 요청의 ip 주소를 반환
  // req.params : 라우터의 매개변수에 대한 정보를 담는 객체
  // req.query : 쿼리스트링에 대한 정보를 담는 객체
  // req.get(헤더명) : 헤더의 값을 가져옴

  // res 객체
  // res.app : app 객체를 가리킴
  // res.cookie(키, 값, 옵션) : 쿠키를 설정
  // res.clearCookie(키, 값, 옵션) : 쿠키를 제거
  // res.end() : 데이터 없이 응답을 보냄
  // res.json(JSON) : JSON 형식의 응답을 보냄
  // res.locals : res.render 메서드가 렌더링할 데이터를 저장하는 객체
  // res.redirect(주소) : 리다이렉트할 주소와 함께 응답을 보냄
  // res.render(뷰, 데이터) : 다음 절에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용
  // res.send(데이터) : 데이터와 함께 응답을 보냄
  // res.sendFile(경로) : 경로에 위치한 파일을 응답함
  // res.set(헤더명, 헤더값) : 응답의 헤더를 설정
  // res.status(코드) : 응답 시의 HTTP 상태 코드를 지정
  // req나 res객체는 체이닝 메소드를 지원하기 때문에
  // res.stsus(404).send('Not Found')와 같은 형식으로 사용 가능
  res.send('Hello, Board');
});

router.route('/csrf')
  .get(csrfProtection, (req, res) => {
    console.log(req.csrfToken());
    // app.js 에서 app.set('view engine', 'ejs'); 로 설정했기 때문에 ejs 확장자 생략 가능
    // res.render() 메서드의 두 번째 인수로 변수를 넣으면 템플릿 엔진이 변수를 처리함
    // res.render() 메서드의 첫 번째 인수는 템플릿의 이름
    // 템플릿 엔진을 사용하지 않는다면 res.send() 메서드를 사용해야 함
    res.render('csrf', { csrfToken: req.csrfToken() });
  })
  .post(csrfProtection, (req, res) => {
    // csrf 토큰 검증이 성공하면 ok를 응답함
    res.send("ok");
  });

module.exports = router;