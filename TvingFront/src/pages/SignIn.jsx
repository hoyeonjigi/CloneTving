import React from "react";
import { Helmet } from "react-helmet-async";
import checkIcon from "@/assets/signIn/check-icon.svg";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function SignIn() {
	return (
		<>
			<Helmet>
				<title>TvingFront - SingIn</title>
			</Helmet>
			<Header />
			{/* main */}
			<div className="bg-black font-noto">
				<div className="flex flex-col items-center pt-[60px] pb-[100px]">
					<h3 className="text-white text-center font-extrabold text-4xl pb-[60px]">
						TVING ID 로그인
					</h3>
					<form>
						<div className="flex flex-col gap-3 items-center">
							<label htmlFor="loginId" className="sr-only">
								아이디
							</label>
							<input
								type="text"
								id="loginId"
								placeholder="아이디"
								required
								className="bg-[#212121] p-7 text-xl rounded text-[#ABABAB] font-extralight w-[732px] focus:border-slate-100"
							/>
							<label htmlFor="loginPwd" className="sr-only">
								비밀번호
							</label>
							<input
								type="password"
								id="loginPwd"
								placeholder="비밀번호"
								required
								className="bg-[#212121] p-7 text-xl rounded font-extralight text-[#ABABAB] w-[732px]"
							/>
						</div>
						<div className="flex flex-row pt-3 pb-7">
							{/* image onclick 이미지 boolean에 따라 보이는 이미지 다르게 */}
							<img src={checkIcon} />
							<input type="checkbox" id="rememberMe" />
							<label
								htmlFor="rememberMe"
								className="cursor-pointer text-[#626262] text-xl font-extrabold pl-3"
							>
								자동로그인
							</label>
						</div>
						<button
							type="submit"
							className="bg-brand rounded text-white p-7 w-[732px] text-xl font-semibold text-center hover:bg-red-700"
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
