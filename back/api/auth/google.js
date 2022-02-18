const express = require("express");
const router = express.Router();

router.post("/google", (req, res) => {
  console.log("[server] google login called!");

  // users collection에 데이터 집어넣기
  // console.log(req.body.email);
  // console.log(req);
  // console.log(req.query);
  console.log(req.body);
  console.log(req.data);
  console.log(req.email);
  console.log(
    "🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟🍟"
  );

  res.json({
    message: "😀 [server] google login called!",
  });
});

module.exports = router;
