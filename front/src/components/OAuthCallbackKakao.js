import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OAuthCallbackKakao = () => {
  const navigate = useNavigate();

  let code = new URL(window.location.href).searchParams.get("code");
  const url = `http://localhost:4000/api/oauth/callback/kakao?code=${code}`;

  axios({
    url: url,
    method: "post",
    withCredentials: true,
  })
    .then((res) => {
      console.log("🔸 [client] res.data (OAuthCallbackKakao.js) =>", res.data);

      localStorage.setItem("nickname", res.data.userNickname);

      navigate("/");
    })
    .catch((err) => {
      console.log("===> ", err);
    });

  return (
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
        🍟 <b>인가코드</b> : {code} 🍟
      </div>
      <hr />
    </div>
  );
};

export default OAuthCallbackKakao;
