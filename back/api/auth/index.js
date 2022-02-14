const express = require("express");
const kakao = require("./kakao");
const kakaoCallback = require("./kakaocallback");
const kakaoLogout = require("./kakaoLogout");

const auth = express.Router();

auth.get("/kakao", kakao);
auth.post("/oauth/callback/kakao", kakaoCallback);
auth.get("/kakao/logout", kakaoLogout);

module.exports = auth;
