import React from "react";
import { authentication } from "../service/firebase-config";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const GoogleBtn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(authentication, provider)
      .then((result) => {
        if (result) {
          localStorage.setItem("isGoogleLogin", true);
          localStorage.setItem("nickname", result.user.displayName);
          localStorage.setItem("email", result.user.email);
          localStorage.setItem("provider", "google");

          console.log("구글 로그인 성공!");
          // console.log("🥳 google signin result =>", result);
          // console.log("🥳 google providerId =>", result.user.providerId);
          // console.log("🥳 google email =>", result.user.email);
          // console.log("🥳 google displayName =>", result.user.displayName);
          // console.log("🥳 google accessToken =>", result.user.accessToken);
          // console.log("🥳 google refreshToken =>", result.user.refreshToken);
        }
      })
      .catch((err) => {
        console.log("🤬 error =>", err);
      });
  };

  return (
    <>
      {localStorage.getItem("isGoogleLogin") === "true" ? (
        <div>
          <button
            onClick={() => {
              localStorage.setItem("isGoogleLogin", false);
              localStorage.removeItem("email");
              localStorage.removeItem("nickname");
              localStorage.removeItem("provider");

              signOut(authentication);

              console.log("구글 로그아웃 완료!");
            }}
          >
            구글 로그아웃
          </button>
        </div>
      ) : (
        <div>
          <button onClick={signInWithGoogle}>구글 로그인</button>
        </div>
      )}
    </>
  );
};

export default GoogleBtn;
