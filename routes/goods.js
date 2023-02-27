const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Goods = require("../schemas/goods.js");
const Cart = require("../schemas/cart.js");

//goods 생성하기(아마도 어드민?)
router.post("/goods/", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  res.json({ goods: createdGoods });
});

//굿즈를 카트에 담기
router.post("/goods/:goodsId/cart", async(req, res) => {
  const {goodsId} = req.params;
  const {quantity} = req.body;
  
  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length) {
    return res.status(400).json({success:false, errorMessage: "이미 장바구니에 해당 상품 존재"});
  }
  await Cart.create({goodsId, quantity});
  res.json({result: "success"});
});

//카트에 담긴 굿즈 수량 변경
router.put("/goods/:goodsId/cart", async(req, res) =>{
  const {goodsId} = req.params;
  const {quantity} = req.body;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length) {
    await Cart.updateOne(
      {goodsId : goodsId},
      {$set: {quantity :quantity}}
      );
  }
  res.status(200).json({success:true});
});

//카트에 담긴 굿즈 삭제
router.delete("/goods/:goodsId/cart", async(req, res) =>{
  const {goodsId} = req.params;

  const existsCarts = await Cart.find({goodsId});
  if(existsCarts.length) {
    await Cart.deleteOne({goodsId});
  }
  res.json({success:true});
});

//'/goods'에 접속하면 json주기
router.get("/goods", (req, res) => {
    res.status(200).json({"goods": goods});
});

//'/goods/:goodsId' goodsId에 param값 받아오기
router.get("/goods/:goodsId", (req,res) => {
    const { goodsId } = req.params;
    console.log(goodsId);

    // let result = null;
    // for (const good of goods) {
    //     if (Number(goodsId) === good.goodsId) {
    //         result = good;
    //     }
    // }

    const [result] = goods.filter((good) => Number(goodsId) === good.goodsId);
    res.status(200).json({"detail": result});
});


module.exports = router;
