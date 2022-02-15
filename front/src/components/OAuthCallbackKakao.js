import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthCallbackKakao = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const url = `http://localhost:4000/api/oauth/callback/kakao?code=${query.code}`;

  axios({
    url: url,
    method: "post",
    withCredentials: true,
  })
    .then((res) => {
      // console.log("🔸 [client] res.data (OAuthCallbackKakao.js) =>", res.data);
      localStorage.setItem("nickname", res.data.userNickname);

      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    // 이부분은 react-spinner를 활용해 로딩화면으로 구현!
    <div style={{ textAlign: "center" }}>
      <div>
        <b>🍟 OAuth Kakao Callback page 🍟</b>
      </div>
      <p>
        로그인 화면에서 '카카오로 로그인'버튼을 클릭시 카카오 서버에 접근하여,
        아래의 인가코드를 받아온다.
      </p>
      <hr />
      <div>
        🍟 <b>인가코드</b> : {query.code} 🍟
      </div>
      <hr />
    </div>
  );
};

export default OAuthCallbackKakao;
