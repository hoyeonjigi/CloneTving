import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import unCheck from "@/assets/signIn/check-icon.svg";
import check from "@/assets/signIn/check_white.svg";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { postData } from "@/utils/crud";

function SignIn() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isChecked, setIsChecked] = useState(false);

  const [userId, setUserId] = useState(""); // username 상태 변수 추가
  const [userPassword, setuserPassword] = useState(""); // password 상태 변수 추가
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // 로그인 성공 여부를 추적하는 상태 변수 추가

  // 체크박스 클릭 이벤트 핸들러
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지

    const url = "https://hoyeonjigi.site/user/login"; // 변경해야 함
    const data = { userId, userPassword };
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await postData(url, data, headers);
      localStorage.setItem("grantType", response.grantType);
      localStorage.setItem("accessToken", response.accessToken);
      setIsLoginSuccess(true); // 로그인 성공 상태를 true로 변경
      navigate("/user/profiles");
    } catch (error) {
      console.error(`Error in sending POST request: ${error}`);

      alert(
        `일치하는 회원정보가 없습니다.\n아이디, 비밀번호를 다시 확인해주세요`
      );
      setUserId(""); // 아이디 상태 초기화
      setuserPassword(""); // 비밀번호 상태 초기화
    }
  };

  useEffect(() => {
    if (!isLoginSuccess) return; // 로그인이 성공하지 않았다면 아무 것도 하지 않음

    const refreshLogin = async () => {
      try {
        const response = await postData(url, data, headers);
        localStorage.setItem("grantType", response.grantType);
        localStorage.setItem("accessToken", response.accessToken);

        // 여기서 응답 데이터를 처리
      } catch (error) {
        console.error(`Error in sending POST request: ${error}`);
      }
    };

    const intervalId = setInterval(refreshLogin, 29 * 60 * 1000); // 29분을 밀리초로 변환

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoginSuccess]); // 의존성 배열에 isLoginSuccess 추가

  return (
    <>
      <Helmet>
        <title>TvingFront - SingIn</title>
      </Helmet>
      <Header />
      {/* main */}
      <div className="bg-black font-noto">
        <div className="flex flex-col items-center pt-[60px] pb-[100px]">
          <h3 className="text-white text-center font-extrabold text-3.5xl mb-12">
            TVING ID 로그인
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 items-center">
              <label htmlFor="loginId" className="sr-only">
                아이디
              </label>
              <input
                type="text"
                id="loginId"
                placeholder="아이디"
                required
                className="bg-[#212121] px-5 py-5 text-2xl  rounded text-white  placeholder:text-xl placeholder:text-gray_05 w-[580px]"
                value={userId} // 상태 변수를 value 속성에 연결
                onChange={(e) => setUserId(e.target.value)} // 사용자 입력을 상태 변수에 저장
              />
              <label htmlFor="loginPwd" className="sr-only">
                비밀번호
              </label>
              <input
                type="password"
                id="loginPwd"
                placeholder="비밀번호"
                required
                className="bg-[#212121] px-5 py-5 text-2xl  rounded text-white  placeholder:text-xl placeholder:text-gray_05 w-[580px]"
                value={userPassword} // 상태 변수를 value 속성에 연결
                onChange={(e) => setuserPassword(e.target.value)} // 사용자 입력을 상태 변수에 저장
              />
            </div>
            <div className="flex flex-row items-center pt-3 pb-7">
              {/* image onclick 이미지 boolean에 따라 보이는 이미지 다르게 */}
              <button
                type="button"
                className={`bg-${
                  isChecked ? "brand" : "gray_04"
                } rounded-full w-6 h-6 relative`}
                onClick={handleCheckboxClick}
              >
                <img
                  src={isChecked ? check : unCheck}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </button>
              <input type="checkbox" id="rememberMe" hidden />
              <label
                htmlFor="rememberMe"
                // className="cursor-pointer text-[#626262] text-lg font-bold ml-2"
                className={`cursor-pointer text-${
                  isChecked ? "white" : "[#626262]"
                } text-lg font-bold ml-2`}
                onClick={handleCheckboxClick}
              >
                자동로그인
              </label>
            </div>
            <button
              type="submit"
              className="bg-brand rounded text-white px-7 py-5 w-[580px] text-xl font-semibold text-center hover:bg-red-700"
            >
              로그인하기
            </button>
          </form>
          <div className="p-8 text-xl flex-row  text-[#A6A6A6] font-medium">
            <Link to="/FindID" className="m-9 hover:text-gray-300 ">
              아이디 찾기
            </Link>
            <Link to="/FindPassword" className="m-6 hover:text-gray-300 ">
              비밀번호 찾기
            </Link>
          </div>
          <div className="text-[#6E6E6E] text-xl font-medium">
            아직 계정이 없으신가요?
            <Link
              to="/SignUp"
              className="ml-10 text-[#A3A3A3] hover:text-gray-300 "
            >
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignIn;
