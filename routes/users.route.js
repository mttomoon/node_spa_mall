//전체회원 조회
router.get("/user", async (req, res) => {
    try {
      const users = await User.find({}); 

      res.json({
        "result": users
      });
    } catch (error) {
      res.status(404).json({errorMessage: "회원 목록 조회 실패"});
    }
  });

  //한 회원의 user ID를 주었을 때 회원 상세조회
  router.get("/user/:userId", async (req, res) => {
  
    try {
      const { userId } = req.params;
      const foundUser = await User.findOne({_id: userId});
  
      res.json({
        "result": foundUser
      });
    } catch (error) {
      res.status(404).json({errorMessage: "회원 상세 조회 실패"})
    }
  });