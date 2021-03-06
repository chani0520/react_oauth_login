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
      // console.log("๐ธ [client] res.data (OAuthCallbackKakao.js) =>", res.data);
      localStorage.setItem("nickname", res.data.userNickname);

      navigate("/");
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    // ์ด๋ถ๋ถ์ react-spinner๋ฅผ ํ์ฉํด ๋ก๋ฉํ๋ฉด์ผ๋ก ๊ตฌํ!
    <div style={{ textAlign: "center" }}>
      <div>
        <b>๐ OAuth Kakao Callback page ๐</b>
      </div>
      <p>
        ๋ก๊ทธ์ธ ํ๋ฉด์์ '์นด์นด์ค๋ก ๋ก๊ทธ์ธ'๋ฒํผ์ ํด๋ฆญ์ ์นด์นด์ค ์๋ฒ์ ์ ๊ทผํ์ฌ,
        ์๋์ ์ธ๊ฐ์ฝ๋๋ฅผ ๋ฐ์์จ๋ค.
      </p>
      <hr />
      <div>
        ๐ <b>์ธ๊ฐ์ฝ๋</b> : {query.code} ๐
      </div>
      <hr />
    </div>
  );
};

export default OAuthCallbackKakao;
