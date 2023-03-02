const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post.schemas.js");
const Comments = require("../schemas/comments.schemas.js");

//댓글 작성
router.put('/comments/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const foundPost = await Posts.findOne({_id: postId});
    
        const { user, password, content } = await req.body;
        if (content) {
            foundPost.comments.push({user, password, content});

            await foundPost.save();
            res.status(200).json({success:true, "message": "댓글을 작성하였습니다."});
        } else {
            res.status(400).json({errorMessage: "댓글 내용을 입력해주세요."});
        }
    } catch (error) {
        res.status(404).json({errorMessage: error.message});
    }
});

//댓글 목록 조회, 시간순으로 가져오기
router.get('/comments/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const foundPost = await Posts.findOne({_id: postId});

        const commentList = foundPost.comments.map(comment => {
            const {user, content, _id, createdAt} = comment;
            return {user, content, _id, createdAt};
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            "data": commentList
        });
    } catch (error) {
      res.status(404).json({errorMessage: error.message})
    }
  });

//댓글 수정
router.patch('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { postId } = req.query;
        const foundPost = await Posts.findOne({_id: postId});

        if(!foundPost.comments) {
            return res.status(404).json({errorMessage: "아직 댓글이 없습니다."});
        } else {
            const { password, content } = await req.body;
            const foundComment = foundPost.comments.find(comment => comment._id.toString() === commentId);

            if (content) {
                if (foundComment.password === Number(password)) {
                    foundComment.content = content;
                    await foundPost.save();
                }
                res.status(200).json({success:true, "message": "댓글을 수정하였습니다."});
            } else {
                res.status(400).json({errorMessage: "댓글 내용을 입력해주세요."});
            };
        };     
    } catch (error) {
        res.status(404).json({errorMessage: error.message});
    }
});

//댓글 삭제
router.delete('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { postId } = req.query;
        const foundPost = await Posts.findOne({_id: postId});

        if(!foundPost.comments) {
            return res.status(404).json({errorMessage: "아직 댓글이 없습니다."});
        } else {
            const { password } = await req.body;
            const foundComment = foundPost.comments.find(comment => comment._id.toString() === commentId);

            if (foundComment.password === Number(password)) {
                foundPost.comments.pop(foundComment);
                await foundPost.save();
            }
            res.status(200).json({success:true, "message": "댓글을 삭제하였습니다."});
        
        };     
    } catch (error) {
        res.status(404).json({errorMessage: error.message});
    }
});

module.exports = router;