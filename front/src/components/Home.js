import React, { useEffect, useState } from "react";
import KakaoBtn from "./KakaoBtn";
import axios from "axios";
import GoogleBtn from "./GoogleBtn";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");

  const [googleNickname, setGoogleNickname] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("nickname") !== null) {
      setNickname(localStorage.getItem("nickname"));

      setIsLogin(true);
    }
  }, []);

  const clickLogout = () => {
    let provider = localStorage.getItem("provider");
    if (provider === "kakao") {
      axios({
        method: "get",
        url: "http://localhost:4000/api/kakao/logout",
        withCredentials: true,
      }).then((res) => {
        localStorage.removeItem("nickname");

        setNickname("");

        setIsLogin(false);
      });
    }
  };

  return (
    <>
      {/* 🎃🎃 KAKAO LOGIN 🎃🎃 */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2em" }}>🔸🔸 Kakao Login 🔸🔸</div>
        {isLogin ? (
          <div>
            <button onClick={clickLogout}>카카오 로그아웃</button>
          </div>
        ) : (
          <KakaoBtn />
        )}
        <div>
          <b>🔸 nickname</b> : {nickname}
        </div>
        <div>
          <b>🔸 email</b> : {localStorage.getItem("email")}
        </div>
      </div>

      <hr style={{ margin: "30px" }} />

      {/* 🎃🎃 GOOGLE LOGIN 🎃🎃 */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2em" }}>🔹🔹 Google Login 🔹🔹</div>
        <GoogleBtn />
        <div>
          <b>🔹 nickname</b> : {nickname}
        </div>
        <div>
          <b>🔹 email</b> : {localStorage.getItem("email")}
        </div>
      </div>
    </>
  );
};

export default Home;
