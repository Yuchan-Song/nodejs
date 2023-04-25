const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

// .env 파일에 있는 내용을 process.env로 설정
dotenv.config();
const app = express();
// 서버가 실행퇼 포트를 할당하는 부분
// > process.env.ROOT에 값이 있으면 그걸 사용하고 없으면 3000번 포트를 사용)
app.set('port', process.env.PORT || 3000);

/**
 * 미들웨어
 *  > 요청과 응답의 중간에 위치하여 미들웨어라고 부름
 * 미들웨어가 실행되는 경우
 *  > app.use(미들웨어) > 모든 요청에서 미들웨어 실행
 *  > app.use('/abc', 미들웨어) > abc로 시작하는 요청에서 미들웨어 실행
 *  > app.post('/abc', 미들웨어) > abc로 시작하는 POST 요청에서 미들웨어 실행
 */

/**
 * morgan 미들웨어는 요청과 응답에 대한 정보를 콘솔에 기록
 *  > dev(개발환경), combined(운영환경), common, short, tiny 등의 옵션이 존재
 *  > 미들웨어안에 미들웨어를 넣음으로써 조건에 따라 다른 미들웨어를 적용할 수 있음
*/
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
});

/**
 * static
 *  > 정적인 파일들을 제공하는 라우터 역할을 하는 미들웨어
 *  > 기본적으로 제공되는 public 폴더를 사용
 *  > app.use('요청 경로', express.static('실제 경로'))
 *  > 실제 경로에 있는 파일들을 요청 경로에서 사용할 수 있음
 *  > 실제 경로에 있는 파일들을 직접 보여줄 수도 있고, 다른 미들웨어를 통과시킬 수도 있음
 */
app.use('/', express.static(path.join(__dirname, 'public')));

/**
 * body-parser : 일부 기능이 express에 내장되어 있어 따로 설치할 필요는 없으나 경우에 따라 설치해야 함 ( npm i body-parser )
 *  > 요청의 본문을 해석해 req.body 객체로 만들어주는 미들웨어
 *  > express.json() : json 데이터, express.urlencoded() : form 데이터, express.text() : 텍스트 데이터, express.raw() : 버퍼 데이터
 *  > 보통 폼 데이터나 AJAX 요청의 데이터를 처리
 *  > 두 미들웨어는 내부적으로 req.on('data')와 req.on('end') 이벤트를 사용
 *  > 따라서 이 미들웨어들을 사용하면 req.on('data')와 req.on('end') 이벤트를 직접 사용하지 않아도 됨
 *  > 단, 파일 업로드는 해당 미들웨어로 처리할 수 없음
 *  > 파일 업로드는 multer 모듈을 사용
 */
app.use(express.json());
// urlencoded 메서드의 extended 옵션은 객체 안에 객체를 파싱할 수 있게 함
// true면 qs, false면 querystring 모듈을 사용하여 쿼리스트링을 해석
app.use(express.urlencoded({ extended: false }));

/**
 * cookie-parser : 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만들어주는 미들웨어
 *  > 서명된 쿠키가 있는 경우, 제공한 비밀키(process.env.COOKIE_SECRET)를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 검증
 *  > 서명된 쿠키란 쿠키에 대한 이름 앞에 's:'가 붙어 있는 쿠키를 의미
 *  > 서명된 쿠키는 클라이언트에서 수정했을 때 에러가 발생하므로 클라이언트에서 쿠키로 위험한 행동을 하는 것을 방지할 수 있음
 *  > cookie-parser의 signed 옵션을 true로 설정하면 쿠키 뒤에 서명이 붙음
 *  > 서명된 쿠키는 req.cookies 대신 req.signedCookies 객체에 들어 있음
 */
// express-session의 비밀키를 dotenv를 통해 설정
app.use(cookieParser(process.env.COOKIE_SECRET));

/**
 * express-session : 세션 관리용 미들웨어 ( 1.5버전 이전은 cookie-parser 보다 뒤에 위치해야 했으나 1.5버전 이후는 상관 없음 )
 *  > 사용자별로 req.session 객체 안에 유지
 */
app.use(session({
  resave: false,            // 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 여부 설정
  saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 여부 설정
  secret: process.env.COOKIE_SECRET,
  cookie: {
    // 쿠키 설정
    httpOnly: false,         // 클라이언트에서 쿠키를 확인하지 못하도록 설정
    secure: false,
    signed: true
  },
  name: 'session-cookie',   // 세션 쿠키 이름 설정(기본은 connect.sid)
}));


app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  // next : 다음 미들웨어로 넘어가는 함수
  // > next를 호출하지 않으면 다음 미들웨어가 실행되지 않음
  // > morgan, cookie-parser, express-session 등의 미들웨어는 모두 내부적으로 next를 호출하고 있어 next를 호출하지 않아도 다음 미들웨어로 넘어갈 수 있음
  // > next를 호출하지 않는 미들웨어는 res.send, res.sendFile 등의 메서드로 응답을 보내야 함
  // > next() : 다음 미들웨어로 넘어감
  // > next('route') : 다음 라우터로 넘어감
  // > next(error) : 에러처리 미들웨어로 넘어감
  next();
});

// app.get(주소, 라우터)는 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분
// app.get, app.post, app.patch, app.put, app.delete 등의 메서드가 존재
// req는 요청에 관한 정보가 들어있는 객체, res는 응답에 관한 정보가 들어있는 객체
app.get('/', (req, res, next) => {
  // res.locals 객체를 통해 미들웨어간에 변수를 데이터를 공유할 수 있음
  // 새로운 요청이 오면 res.locals 객체가 초기화되므로 주의
  // 데이터를 공유하는 방법에는 app.set으로도 가능하지만
  // app.set은 전역적으로 데이터를 공유하기 때문에 하나의 요청에서만 데이터를 공유할 때는 res.locals를 사용하는 것이 좋음
  res.locals.data = '미들웨어 데이터!';
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  // name 쿠키 생성
  // res.cookie('name', 'yuchan', {
  //   expires: new Date(Date.now() + 900000),
  //   httpOnly: true,
  //   secure: true,
  //   signed: true    // 서명된 쿠키 사용 여부
  // });
  // name 쿠키 삭제 ( 삭제시 expires나 maxAge를 0으로 설정 )
  // res.clearCookie('name', 'yuchan', {
  //   expires : 0,
  //   httpOnly: true,
  //   secure: true,
  //   signed: true
  // });
  // 문자열을 리턴할 때는 send
  // res.send('Hello, Express');
  // html로 응답하고 싶으면 send 대신 sendFile 메서드를 사용
  res.sendFile(path.join(__dirname, '/views/index.html'));
  // throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
  console.log(res.locals.data);
});

const multer = require('multer'); // multer 모듈을 통해 파일 업로드 기능을 구현
const fs = require('fs');         // fs 모듈을 통해 파일 시스템에 접근

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // done(에러, 결과값) : 첫 번째 인수는 에러 발생 시 사용, 두 번째 인수는 실제 경로를 입력
      // 실제 경로가 없는 경우 에러가 발생하므로 미리 폴더를 생성해야 함(fs사용)
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      // done(에러, 결과값) : 첫 번째 인수는 에러 발생 시 사용, 두 번째 인수는 실제 파일 이름을 입력
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 파일 사이즈 제한
});

// 업로드 페이지
app.get('/multipart', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/multipart.html'));
});

// multer 미들웨어 사용
//  > upload.single('(input name)') : 하나의 이미지를 업로드할 때 사용, req.file 객체를 생성
//  > upload.array('image', 10) : 이미지를 10개까지 업로드할 때 사용, req.files 객체를 생성
//  > upload.fields([{ name: 'image1' }, { name: 'image2' }]) : 서로 다른 이미지를 여러 개 업로드할 때 사용, req.files 객체를 생성
//  > upload.none() : 파일을 업로드하지 않고 multipart 형식으로 업로드할 때 사용
app.post('/upload', upload.array('images'), (req, res) => {
  console.log(req.files);   // 이미지 정보
  console.log(req.body);    // 나머지 필드 정보
  res.send('ok');
});

// 에러 처리 미들웨어(매개변수가 반드시 4개여야 함)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});