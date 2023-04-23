const express = require('express');
const app = express();

const server = app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// html rendering을 하기 위한 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
  res.render('index.html');
});