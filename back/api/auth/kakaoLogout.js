const express = require("express");
const router = express.Router();

router.get("/kakao/logout", (req, res) => {
  // console.log("πΈ [server] req.cookies (kakaoLogout.js) =>", req.cookies);
  // console.log("πΈ [server] req.session (kakaoLogout.js) =>", req.session);

  req.logout();
  // console.log("π₯ req.session.destory μν μ  => ", req.session);
  req.session.destroy();
  // console.log("π₯ req.session.destory μν ν => ", req.session);

  res
    .clearCookie("access_token")
    .clearCookie("kakao_access_token")
    .clearCookie("kakao_refresh_token")
    .json({
      message: "μΉ΄μΉ΄μ€ λ‘κ·Έμμ μ±κ³΅!",
    });
});

module.exports = router;
