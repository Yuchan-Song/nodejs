const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, User');
});

// 같은 주소의 라우터를 http요청 메서드에 따라 다르게 처리할 수 있음
//  > get, post, put, patch, delete, options, head, all
router.route('/test')
  .get((req, res) => {
    res.send('Hello, User-Test, GET');
  })
  .post((req, res) => {
    res.send('Hello, User-Test, POST');
  });

// 라우터 매개변수 패턴 : 라우터 주소에는 정규표현식을 사용할 수 있음
// 일반 라우터보다 뒤에 위치해야 함
//  > :id가 와일드카드 형식으로 인식되기 때문에 다른 라우터들이 먼저 실행되지 않고 이 라우터가 실행됨
router.get('/:id', (req, res) => {
  // 라우터 안에서 매개변수에 접근할 때는 req.params.(매개변수명) 형식으로 접근
  console.log(req.params);
  // 라우터 안에서 주소의 qurey 부분에 접근할 때는 req.query.(쿼리명) 형식으로 접근
  console.log(req.query);
  res.send('Hello, User');
});

// 위의 라우터에서 와일드 카드 형식의 매개변수를 사용했기 때문에 이 라우터는 실행되지 않음
router.get('/like', (req, res) => {
  res.send('Hello, User-Like');
});

module.exports = router;