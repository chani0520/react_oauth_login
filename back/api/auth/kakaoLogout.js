const express = require("express");
const router = express.Router();

router.get("/kakao/logout", (req, res) => {
  // console.log("🔸 [server] req.cookies (kakaoLogout.js) =>", req.cookies);
  // console.log("🔸 [server] req.session (kakaoLogout.js) =>", req.session);

  req.logout();
  // console.log("🟥 req.session.destory 수행 전 => ", req.session);
  req.session.destroy();
  // console.log("🟥 req.session.destory 수행 후 => ", req.session);

  res
    .clearCookie("access_token")
    .clearCookie("kakao_access_token")
    .clearCookie("kakao_refresh_token")
    .json({
      message: "카카오 로그아웃 성공!",
    });
});

module.exports = router;
