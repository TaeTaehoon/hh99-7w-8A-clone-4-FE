import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useRef } from "react";
// import './reset.css';
import Loginpage from "./pages/LoginPage";
import Registerpage from "./pages/RegisterPage";
import "./App.css";
import MainPage from "./pages/MainPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import Kakaologin from "./pages/KakaoLogin";

const App = () => {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chatRoom/:roomId" element={<ChatRoomPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/kakaoLogin" element={<Kakaologin />} />
        <Route path="/signUp" element={<Registerpage />} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/kakaoLogin" element={<Kakaologin />} />
        <Route path="/signUp" element={<Registerpage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/chatRoom/:roomId" element={<ChatRoomPage />} />
      </Routes>
    </>
  );
};

export default App;
