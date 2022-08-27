import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __userRegister } from "../../redux/modules/userSlice";

const Registerform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  const [check, setCheck] = useState({
    email: true,
    password: true,
    passwordCheck: true,
    nickname: true,
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //각 input값에 필요한 요소 check
    const checkEmail = (e) => {
      const reg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      return reg.test(e);
    };
    const checkPW =
      input.password === input.passwordCheck && input.password.length >= 6;
    const checkNick = input.nickname.length >= 2;

    if (!checkEmail(input.email)) {
      console.log("111");
      return setCheck({ ...check, email: false });
    }
    if (!checkPW) {
      console.log("222");
      return setCheck({
        ...check,
        email: true,
        password: false,
        passwordCheck: false,
      });
    }
    if (!checkNick) {
      console.log("333");
      return setCheck({
        ...check,
        email: true,
        password: true,
        passwordCheck: true,
        nickname: false,
      });
    } else {
      setCheck({
        ...check,
        email: true,
        password: true,
        passwordCheck: true,
        nickname: true,
      });
    }
    console.log("하나", check, "둘", setCheck);

    setInput({
      email: input.email, //input.email이란 key값의 value
      nickname: input.nickname,
      password: input.password,
      passwordCheck: input.passwordCheck,
    });

    //회원가입 버튼을 누르면 서버로 보내기
    dispatch(
      __userRegister({
        email: input.email,
        nickname: input.nickname,
        password: input.password,
        passwordCheck: input.passwordCheck,
      })
    );
  };

  const onChanegeHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value }); //[]이건 그냥 이렇게 적는거야

    // console.log("3333",input);
  };
  // console.log("4444",input);//이거 비동기!!!함수 끝에서 콘솔에 찍히고 3333은 함수 내부라 아직 안찍힘

  const backToLogin = () => {
    navigate("/");
  };

  //email형식/비번 조건 맞는 지 확인해야 함.
  //회원가입 성공 시 alret 띄우고 로그인 페이지로 이동해야함.
  //회원가입 실패 시 (500에러) alret 띄워야함.
  return (
    <RegisterLayout>
      <div>
        <h1>회원가입</h1>
        <form onSubmit={onSubmitHandler}>
          {" "}
          {/**form => seo 용으로 form이 필요할수도...?! */}
          <div>
            <input
              placeholder="  Email"
              type="text"
              id="email" //직접접근하기위한 id
              name="email" //axios통신용
              value={input.email}
              onChange={onChanegeHandler}
            ></input>
            <StValidateMsg isValid={check.email}>
              이메일 형식만 가능합니다
            </StValidateMsg>
            <input
              placeholder="  PASSWORD"
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={onChanegeHandler}
            ></input>
            <StValidateMsg isValid={check.password}>
              6~12자 영문,숫자,특수문자 1자 이상 포함해야 합니다
            </StValidateMsg>
            <input
              placeholder="  Re-PASSWORD"
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              value={input.passwordCheck}
              onChange={onChanegeHandler}
            ></input>
            <StValidateMsg isValid={check.passwordCheck}>
              동일한 비밀번호를 입력하세요
            </StValidateMsg>
            <input
              placeholder="  NICKNAME"
              type="text"
              id="nickname"
              name="nickname"
              value={input.nickname}
              onChange={onChanegeHandler}
            ></input>
            <StValidateMsg isValid={check.nickname}>
              2자 이상, 영문,숫자,한글 가능합니다
            </StValidateMsg>
          </div>
          <button>회원가입</button>
        </form>
        <button onClick={backToLogin}>로그인 화면으로</button>
      </div>
    </RegisterLayout>
  );
};

//useForm 쓰지말고 해보기...

export default Registerform;

const RegisterLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
  }

  > div > h1 {
    font-size: large;
    color: gray;
  }

  > div > form > div {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
  }

  > div > form > div > input {
    font-size: large;
    width: 350px;
    height: 50px;
    display: block;
    border: none;
    margin-top: 10px;
    margin-bottom: 5px;
    border-radius: 1px;
    box-shadow: 0px 0px 3px #acadb1;
  }

  > div > form > button {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    font-size: large;
    color: #acadb1;
    width: 354px;
    height: 50px;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    box-shadow: -0.5px -0.5px 4px #acadb1;
    &:hover {
      color: gray;
      box-shadow: 0px 0px 4px #646464;
    }
  }
  > div > button {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    font-size: large;
    color: #acadb1;
    width: 354px;
    height: 50px;
    border: none;
    margin-top: 10px;
    cursor: pointer;
    box-shadow: -0.5px -0.5px 4px #acadb1;
    &:hover {
      color: gray;
      box-shadow: 0px 0px 4px #646464;
    }
  }
`;

const StValidateMsg = styled.span`
  padding: 5px 0 5px 5px;
  font-size: 1.2rem;
  ${(props) => {
    switch (props.isValid) {
      case true: {
        return css`
          color: var(--black-color);
          font-size: medium;
        `;
      }
      case false: {
        return css`
          color: var(--red-color);
          font-size: medium;
        `;
      }
    }
  }}
`;
