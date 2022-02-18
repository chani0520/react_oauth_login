import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import OAuthCallbackKakao from "./components/OAuthCallbackKakao";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="oauth/callback/kakao" element={<OAuthCallbackKakao />} />
    </Routes>
  );
}

export default App;
