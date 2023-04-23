// 프로미스
// 1. 프로미스의 정의
const condition = true;
// 성공시 콜백함수 resolve, 실패시 콜백함수 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});

promise
  .then((message) => {
    // console.log(message); // 성공(resolve)한 경우 실행
  }).catch((error) => {
    // console.error(error); // 실패(reject)한 경우 실행
  }).finally(() => {
    // console.log('무조건');  // 성공, 실패와 상관없이 무조건 실행
});

promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      // resolve(message);
    });
  })
  .then((message2) => {
    // message2는 처음의 then에서 resolve된 message를 받아온다.
    // console.log(message2);
    return new Promise((resolve, reject) => {
      // resolve(message2);
    });
  })
  .then((message3) => {
    // message3은 두번째의 then에서 resolve된 message2를 받아온다.
    // console.log(message3);
  })
  .catch((error) => {
    console.error(error);
  });

function findAndSaveUser(Users) {
  Users.findOne({}, (err, user) => {    // 첫번째 콜백
    if(err) {
      return console.error(err);
    }
    user.name = 'zero';
    user.save((err) => {                // 두번째 콜백
      if(err) {
        return console.err(err);
      }
      Users.findOne({ gender: 'm' }, (err, user) => { // 세번째 콜백
        // 생략
      });
    });
  });
}

function findAndSaveUser2(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'zero';
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: 'm'});
    })
    .then((user) => {
      // 생략
    })
    .catch(err => {
      console.error(err);
    });
}

const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
const promise3 = Promise.reject('실패3');

// Promise.all을 사용하는 경우 모두 성공해야 성공으로 간주한다.
// 하나라도 실패하면 catch로 이동하는데 어느 것이 실패했는지 알 수 없다.
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Promise.allSettled 사용하는 경우 모두 성공해야 성공으로 간주한다.
// 어느 것이 실패했는지 알 수 있다.
Promise.allSettled([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

// Promise.reject는 catch구문을 붙여야 에러가 발생하지 않는다.
const promise4 = Promise.reject('실패4').catch((error) => {
  console.error(error);
});