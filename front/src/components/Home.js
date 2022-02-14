import React, { useEffect, useState } from "react";
import Login from "./Login";
import axios from "axios";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    if (localStorage.getItem("nickname") !== null) {
      setNickname(localStorage.getItem("nickname"));
      setIsLogin(true);
    }
  }, []);

  const clickLogout = async () => {
    await axios
      .get("http://localhost:4000/api/kakao/logout", {
        withCredentials: true,
      })
      .then(() => {
        console.log("🔸 [client] Home.js => 로그아웃 성공!");
        localStorage.removeItem("nickname");
        setNickname("");
        setIsLogin(false);
      });
  };

  return (
    <>
      <div style={{ fontSize: "2em" }}>🔸🔸 KakaoLogin Test 🔸🔸</div>
      <div>nickname : {nickname}</div>
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
