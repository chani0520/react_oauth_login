require("dotenv").config();
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("🍟 << kakao account info ( kakaoStrategy.js ) >> 🍟");
        console.log("🍟 kakao email :", profile._json.kakao_account.email);
        console.log("🍟 kakao displayName :", profile.displayName);
        console.log("🍟 kakao accessToken :", accessToken);
        console.log("🍟 kakao refreshToken :", refreshToken);

        const { email, age_range, gender } = profile._json.kakao_account;

        try {
          const existUser = await User.findOne({
            email: email,
          });
          if (existUser) {
            console.log("🟨 MongoDB 유저 정보 검색 완료");

            const tokenUser = {
              user: existUser,
              accessToken: accessToken || "",
              refreshToken: refreshToken || "",
            };

            done(null, tokenUser);
          } else {
            console.log("🟥 MongoDB 유저 정보 등록 완료");

            const newUser = await User.create({
              email: profile._json && email,
              nickname: profile.displayName,
              gender: gender,
              age: age_range,
              provider: profile.provider,
            });

            const tokenUser = {
              user: newUser,
              accessToken: accessToken || "",
              refreshToken: refreshToken || "",
            };

            done(null, tokenUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
