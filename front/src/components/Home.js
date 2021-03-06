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
      {/* ππ KAKAO LOGIN ππ */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2em" }}>πΈπΈ Kakao Login πΈπΈ</div>
        {isLogin ? (
          <div>
            <button onClick={clickLogout}>μΉ΄μΉ΄μ€ λ‘κ·Έμμ</button>
          </div>
        ) : (
          <KakaoBtn />
        )}
        <div>
          <b>πΈ nickname</b> : {nickname}
        </div>
        <div>
          <b>πΈ email</b> : {localStorage.getItem("email")}
        </div>
      </div>

      <hr style={{ margin: "30px" }} />

      {/* ππ GOOGLE LOGIN ππ */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2em" }}>πΉπΉ Google Login πΉπΉ</div>
        <GoogleBtn />
        <div>
          <b>πΉ nickname</b> : {nickname}
        </div>
        <div>
          <b>πΉ email</b> : {localStorage.getItem("email")}
        </div>
      </div>
    </>
  );
};

export default Home;
