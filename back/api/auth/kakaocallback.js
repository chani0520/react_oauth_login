const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/user");

router.post(
  "/oauth/callback/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    const user = req.user.user;
    const accessToken = req.user.accessToken;
    const refreshToken = req.user.refreshToken;

    const token = User.generateToken();

    // console.log("🎃 kakaocallback.js req.user ==>", user);
    // console.log("🎃 kakaocallback.js 카카오가 준 accessToken ==>", accessToken);
    // console.log(
    //   "🎃 kakaocallback.js 카카오가 준 refreshToken ==>",
    //   refreshToken
    // );
    // console.log("🎃 kakaocallback.js pickpick용 token ==>", token);

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.cookie("kakao_access_token", accessToken);

    return res.status(200).json({
      isUser: true,
      isMatch: true,
      loginSuccess: true,
      message: "로그인 성공!",
      userId: user._id,
      userNickname: user.nickname,
      accessToken: token,
      kakao_access_token: accessToken,
    });
  }
);

module.exports = router;
