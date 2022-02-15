const passport = require("passport");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
  /**
   * @function serializeUser
   * @description 로그인시 실행되며, req.session(세션)객체에 어떤 데이터를 저장할지 정하는 method
   * 매개변수로 user(사용자정보)를 받고나서, done함수 두 번째 인수로 user의 이메일과 accessToken을 넘김
   */
  passport.serializeUser((user, done) => {
    console.log("🟨 시리얼라이즈 유저 :", user);
    // console.log("email :", user.user.email);
    // console.log("accessToken :", user.accessToken);
    // console.log("refreshToken :", user.refreshToken);
    done(null, {
      email: user.user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  });

  /**
   * @function deserializeUser
   * @description serializeUser가 로그인시 실행된다면, deserializeUser는 매 요청시마다 실행되는 method
   * passport.session 미들웨어가 이 메서드를 호출
   * serializeUser의 done의 두 번째 인수로 넣었던 데이터가 deserializeUser의 매개변수가 된다. ( 이 경우는 email과 accessToken )
   * 세션에 넣어둔 이메일을 받아서 데이터베이스에서 사용자 정보를 조회하고, 조회한 정보를 req.tokenUser에 저장하기 때문에
   * 앞으로 req.tokenUser를 통해 로그인한 사용자 정보를 가져올수 있음
   */
  passport.deserializeUser((user, done) => {
    console.log("🟨 디시리얼라이즈 유저 :", user);
    User.findOne({ email: user.email })
      .then((result) => {
        console.log("🟨 디시리얼라이즈에서 찍히는 유저 :", user);

        const tokenUser = {
          user: result,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
        console.log("🟨 디시리얼라이즈 tokenUser :", tokenUser);
        done(null, tokenUser);
      })
      .catch((err) => done(err));
  });

  kakao();
};
