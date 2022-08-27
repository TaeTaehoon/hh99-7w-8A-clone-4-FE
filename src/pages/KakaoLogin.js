import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";

const Kakaologin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];

  const IP = `http://3.39.240.159/user/kakao/callback?code=${KAKAO_CODE}`;

  async function kakaoLogin() {
    try {
      const response = await axios.get(IP);
      console.log(response);
      const accessToken = response.headers.authorization;
      const refreshtoken = response.headers[`refresh-token`];
      localStorage.setItem("isLogin", true);
      const encodeBody = accessToken.split(".")[1];
      const decodeBody = Buffer.from(encodeBody, "base64").toString("utf8");
      const jsonBody = JSON.parse(decodeBody);
      localStorage.setItem("userId", jsonBody.jti);
      localStorage.setItem("userProfileImg", response.data.profilePic);
      localStorage.setItem("userInfo", response.data.introduce);
      localStorage.setItem("userName", jsonBody.sub);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshtoken", refreshtoken);
      setTimeout(() => {
        window.location.reload();
      }, 50);
      navigate("/main");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    kakaoLogin();
  }, []);

  return <div></div>;
};

export default Kakaologin;
