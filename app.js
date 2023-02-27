const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require('./routes/goods');
const cartsRouter = require('./routes/carts');
const connect = require("./schemas");
connect();

app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

//------
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("기본 URI에 Post 메소드 정상 실행됨")
})
app.get("/", (req, res) => {
    console.log(req.query);
    const obj = {
      "key01" : "value01",
      "key02" : "value02",
    };
    res.json(obj);
})
app.get("/:id", (req, res) => {
  console.log(req.params);
  res.send(':id URI에 정상적으로 반환되었습니다');
})
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });






