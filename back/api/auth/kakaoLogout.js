const express = require("express");
const axios = require("axios");
const passport = require("passport");

const router = express.Router();

router.get("/kakao/logout", async (req, res) => {
  console.log("🔸 [server] req.cookies (kakaoLogout.js) =>", req.cookies);
  console.log("🔸 [server] req.session (kakaoLogout.js) =>", req.session);

  try {
    const kakao_access_token = req.cookies.kakao_access_token;
    console.log(
      "🔸 [server] req.cookies.kakao_access_token (kakaoLogout.js) =>",
      kakao_access_token
    );
    let logout = await axios({
      method: "post",
      url: "https://kapi.kakao.com/v1/user/unlink",
      headers: {
        Authorization: `Bearer ${kakao_access_token}`,
      },
    });
  } catch (err) {
    console.error(err);
    res.json(err);
  }

  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
