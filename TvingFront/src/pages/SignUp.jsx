import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function SignUp() {
	return (
		<>
			<Helmet>
				<title>TvingFront - SingUp</title>
			</Helmet>
			<Header />
			{/* main */}
			<div className="bg-black font-noto">
				<div className="flex flex-col items-center pt-[60px] pb-[100px]">
					<h3 className="text-white font-bold text-4xl">티빙 회원가입</h3>
					<p className="  pt-5 text-xl text-[#ABABAB]">
						아이디와 이메일로 간편하게 티빙을 시작하세요!
					</p>
					<form>
						<div className="flex flex-col gap-2 pt-10">
							<label htmlFor="signUpID" className="sr-only">
								아이디
							</label>
							<input
								type="text"
								id="signUpID"
								placeholder="아이디"
								required
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
							/>
							<p className="pb-6 text-[#6B6B6B] text-lg">
								영문 또는 영문, 숫자 조합 6-12자리
							</p>
							<label htmlFor="signupPwd" className="sr-only">
								비밀번호
							</label>
							<input
								type="password"
								id="signupPwd"
								placeholder="비밀번호"
								required
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
							/>
							<p className="pb-6 text-[#6B6B6B] text-lg">
								영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리
							</p>
							<label htmlFor="signupPwdCheck" className="sr-only">
								비밀번호 확인
							</label>
							<input
								type="password"
								id="signupPwdCheck"
								placeholder="비밀번호 확인"
								required
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
							/>
							<span className="pb-5" />
							<label htmlFor="signupEmail" className="sr-only">
								이메일 확인
							</label>
							<input
								type="email"
								id="signupEmail"
								placeholder="이메일"
								required
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
							/>
						</div>
						<div className="pt-5">
							<input type="checkbox" id="agreeAll" />
							<label
								htmlFor="agreeAll"
								className="text-[#A6A6A6] text-xl font-semibold pl-3 cursor-pointer"
							>
								모두 동의합니다.
							</label>
						</div>
						<div className="pt-5">
							<div className="pb-3">
								<input type="checkbox" id="agree01" />
								<label
									htmlFor="agree01"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									만 14세 이상입니다.
								</label>
							</div>
							<div className="pb-3">
								<input type="checkbox" id="agree02" />
								<label
									htmlFor="agree02"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[필수] 서비스 이용약관 동의
								</label>
							</div>
							<div className="pb-3">
								<input type="checkbox" id="agree03" />
								<label
									htmlFor="agree03"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[필수] 개인정보 수집 및 서비스 활용 동의
								</label>
							</div>
							<div className="pb-3">
								<input type="checkbox" id="agree04" />
								<label
									htmlFor="agree04"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[필수] 채널 홈페이지 개인정보 제 3자 제공동의
								</label>
							</div>
							<div className="pb-3">
								<input type="checkbox" id="agree05" />
								<label
									htmlFor="agree05"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 개인정보 제 3자 제공동의
								</label>
							</div>
							<div className="pb-3">
								<input type="checkbox" id="agree06" />
								<label
									htmlFor="agree06"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 개인정보 수집 및 서비스 활용 동의
								</label>
							</div>
						</div>
						<div className="pl-9 pb-6">
							<div className="pb-3">
								<input type="checkbox" id="agree07" />
								<label
									htmlFor="agree07"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 마케팅 정보 SMS 수신동의
								</label>
							</div>
							<div className="pb-3">
								<input type="checkbox" id="agree08" />
								<label
									htmlFor="agree08"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 마케팅 정보 이메일 수신동의
								</label>
							</div>
						</div>
						<button
							type="submit"
							className="bg-[#404040] rounded text-[#898989] p-7 w-[732px] text-2xl font-extrabold text-center"
						>
							가입하기
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default SignUp;
