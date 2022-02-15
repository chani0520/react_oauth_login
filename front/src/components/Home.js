import React, { useEffect, useState } from "react";
import Login from "./Login";
import axios from "axios";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [kakaoAccessToken, setKakaoAccessToken] = useState("");
  const [kakaoRefreshToken, setKakaoRefreshToken] = useState("");

  useEffect(() => {
    const kakao_access_token = getCookie("kakao_access_token");
    const kakao_refresh_token = getCookie("kakao_refresh_token");

    if (localStorage.getItem("nickname") !== null) {
      setNickname(localStorage.getItem("nickname"));

      setIsLogin(true);

      setKakaoAccessToken(kakao_access_token);
      setKakaoRefreshToken(kakao_refresh_token);
    }
  }, []);

  const getCookie = (name) => {
    let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  };

  const clickLogout = () => {
    axios({
      method: "get",
      url: "http://localhost:4000/api/kakao/logout",
      withCredentials: true,
    }).then((res) => {
      localStorage.removeItem("nickname");

      setNickname("");

      setIsLogin(false);

      setKakaoAccessToken("");
      setKakaoRefreshToken("");
    });
  };

  return (
    <>
      <div style={{ fontSize: "2em" }}>🔸🔸 KakaoLogin Test 🔸🔸</div>
      <div>🔸 nickname : {nickname}</div>
      <div>🔸 access_token from kakao : {kakaoAccessToken}</div>
      <div>🔸 refresh_token from kakao : {kakaoRefreshToken}</div>
      <hr />
      {isLogin ? (
        <div>
          <button onClick={clickLogout}>카카오 로그아웃</button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
