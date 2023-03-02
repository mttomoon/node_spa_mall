const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post.schemas.js");

//게시글 작성
router.post('/posts', async (req, res) => {
    const { user, password, title, content } = await req.body;
    const createdPost = await Posts.create({user, password, title, content});

    if (user) {
        return res.json({"message": "게시글을 생성하였습니다."});
     } else {
        return res.status(404).json({errorMessage: "데이터 형식이 올바르지 않습니다."});
      };
});

//게시글 전체 목록 조회, 시간기준 내림차순
router.get("/posts", async (req, res) => {
    try {
      const posts = await Posts.find({},{_id: 1, title: 1, user:1, createdAt:1}).sort({createdAt: 'desc'}); 

      res.json({
        "data": posts
      });
    } catch (error) {
      res.status(404).json({errorMessage: error.message})
    }
  });

//게시글 상세 조회(파라미터값으로 찾기)
router.get("/posts/:postId", async (req, res) => {
  
  try {
    const { postId } = req.params;
    const posts = await Posts.find({_id: postId},{_id: 1, user:1, title: 1, content:1, createdAt:1});

    res.json({
      "data": posts
    });
  } catch (error) {
    res.status(404).json({errorMessage: error.message})
  }
});

//게시글 수정
router.put("/posts/:postId", async(req, res) =>{
  try {
    const {postId} = req.params;
    const {password, user, title, content} = req.body;

    //find는 배열로 들어오고, findOne은 객체 하나로 들어옴~!!!!!
    const foundPost = await Posts.findOne({_id: postId});

    if((foundPost.password == Number(password)) && (foundPost.user == user)) {
      await Posts.updateOne(
        {_id: postId},
        {$set: {title :title, content: content}}
      );
      res.status(200).json({success:true, "message": "게시글을 수정하였습니다."});
    } else {
      res.status(404).json({errorMessage: "게시글 조회에 실패하였습니다."});
    }
  } catch (error) {
    res.status(404).json({errorMessage: error.message});
  }
});

//게시글 삭제
router.delete("/posts/:postId", async(req, res) =>{
  try {
    const {postId} = req.params;
    const {password} = req.body;

    const foundPost = await Posts.findOne({_id: postId});

    if(foundPost.password === Number(password)) {
      await Posts.deleteOne({_id: postId});
      res.status(200).json({success:true, "message": "게시글을 삭제하였습니다."});
    } else {
      res.status(404).json({errorMessage: "게시글 조회에 실패하였습니다."});
    }
  } catch (error) {
    res.status(404).json({errorMessage: "데이터 형식이 올바르지 않습니다."});
  }
});

//_id.toString(); 하면 안에 있는 값 내용만 문자열로 반환이 된다.
//findone으로 (user, pw, _id)이 값이 정확하게 같은 걸 찾도록
//delete는 퀴즈 답안 참고
//comments는 스키마를 내보내지 않고, 포스트 스키마로 가져와서 스키마 안에 넣어줘야함. comments: Comments 이런식으로 그러면 해당 포스트 안에 코멘트가 들어가게 됨, 배열로 쌓임


module.exports = router;