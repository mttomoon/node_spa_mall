const express = require('express');
const app = express();
const port = 3000;

const postsRouter = require('./routes/posts.route.js');
const commentsRouter = require('./routes/comments.route.js');
const connect = require("./schemas");
connect();

app.use(express.json()); //req 객체 안에 있는 body를 사용하기 위해서는 이 코드로 미들웨어 등록해야지만 사용 가능
app.use("/api", [postsRouter, commentsRouter]);

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
