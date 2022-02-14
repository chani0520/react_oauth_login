const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get(
  "/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  })
);

module.exports = router;
