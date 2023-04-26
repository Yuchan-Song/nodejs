const express = require('express');

const router = express.Router();

// 라우터에는 여러 미들웨어를 장착할 수 있음
router.get('/', (req, res, next) => {
  next('route');
}, (req, res, next) => {
  // 이전 미들웨어에서 next('route')를 사용했기 때문에 이 미들웨어는 실행되지 않음
  console.log('실행되지 않습니다.');
  next();
});

router.get('/', (req, res) => {
  console.log('실행됩니다.');
  res.send('Hello, Express');
});

module.exports = router;