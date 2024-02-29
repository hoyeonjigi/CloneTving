import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { postData } from "@/utils/crud";

function SignUp() {
	//초기값 세팅
	const [userId, setUserId] = useState("");
	const [userPassword, setuserPassword] = useState("");
	const [userPasswordVerify, setUserPasswordVerify] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [adultStatus, setAdultStatus] = useState(false);
	const [agree01, setAgree01] = useState(false);
	const [agree02, setAgree02] = useState(false);
	const [agree03, setAgree03] = useState(false);
	const [privacyAgreement, setPrivacyAgreement] = useState(false);
	const [marketingAgreement, setMarketingAgreement] = useState(false);
	const [smsAgreement, setSmsAgreement] = useState(false);
	const [emailAgreement, setEmailAgreement] = useState(false);

	//오류 메세지
	const [idMessage, setIdMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState(
		"영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리"
	);

	//유효성 검사
	const [isId, setIsId] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isPasswordCheck, setIsPasswordCheck] = useState(false);
	const [isEmail, setIsEmail] = useState(false);
	const [isCheckedAll, setIsCheckedAll] = useState(false);
	//const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	//Rest api 연동 테스트
	//회원가입 성공 여부
	const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

	const url = "https://hoyeonjigi.site/user/register";
	const data = {
		userId,
		userPassword,
		userEmail,
		adultStatus,
		privacyAgreement,
		smsAgreement,
		emailAgreement,
	};
	const headers = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지

		try {
			const response = await postData(url, data, headers);
			setIsSignUpSuccess(true); // 로그인 성공 상태를 true로 변경
			console.log("성공");
		} catch (error) {
			console.error(`Error in sending POST request: ${error}`);

			// setUserId(""); // 아이디 상태 초기화
			// setuserPassword(""); // 비밀번호 상태 초기화
		}
	};

	useEffect(() => {
		if (!isSignUpSuccess) return; // 로그인이 성공하지 않았다면 아무 것도 하지 않음

		const refreshLogin = async () => {
			try {
				const response = await postData(url, data, headers);
				console.log("성공");
				// 여기서 응답 데이터를 처리
			} catch (error) {
				console.error(`Error in sending POST request: ${error}`);
			}
		};

		const intervalId = setInterval(refreshLogin, 30 * 60 * 1000); // 29분을 밀리초로 변환

		return () => {
			clearInterval(intervalId);
		};
	}, [isSignUpSuccess]); // 의존성 배열에 isLoginSuccess 추가

	const handleCheckboxAll = () => {
		let newValue = !isCheckedAll;
		setIsCheckedAll(newValue);
		setAdultStatus(newValue);
		setAgree01(newValue);
		setAgree02(newValue);
		setAgree03(newValue);
		setPrivacyAgreement(newValue);
		setMarketingAgreement(newValue);
		setSmsAgreement(newValue);
		setEmailAgreement(newValue);
	};

	//아이디 유효성 검사
	const onChangeId = (e) => {
		setUserId(e.target.value);
		const idRegExp = /^[a-zA-z0-9]{6,12}$/;
		if (!idRegExp.test(userId)) {
			setIsId(false);
		} else {
			setIsId(true);
		}
	};

	//비밀번호 유효성 검사
	const onChangePassword = (e) => {
		setuserPassword(e.target.value);
		const passwordRegExp =
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,15}$/;
		if (!passwordRegExp.test(userPassword)) {
			setIsPassword(false);
		} else {
			setIsPassword(true);
		}
	};

	//비밀번호 일치 확인
	const onChangePasswordVerify = (e) => {
		setUserPasswordVerify(e.target.value);
		if (userPassword != userPasswordVerify) {
			setIsPasswordCheck(false);
			setPasswordMessage("일치하지 않습니다. 다시 입력해주세요.");
		} else {
			setIsPasswordCheck(true);
			setPasswordMessage("영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리");
		}
	};

	//이메일 유효성 확인
	const onChangeEmail = (e) => {
		setUserEmail(e.target.value);
		const emailRegExp =
			/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
		if (!emailRegExp.test(userEmail)) {
			setIsEmail(false);
		} else {
			setIsEmail(true);
		}
	};

	// //조건 모두 만족
	// const handleSubmitButton = () => {
	// 	if (
	// 		isId &&
	// 		isPassword &&
	// 		isPasswordCheck &&
	// 		isEmail &&
	// 		adultState &&
	// 		agree01 &&
	// 		agree02 &&
	// 		agree03
	// 	) {
	// 		setIsButtonEnabled(true);
	// 		return true;
	// 	} else {
	// 		setIsButtonEnabled(false);
	// 		return false;
	// 	}
	// };

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
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-2 pt-10">
							<label htmlFor="signUpId" className="sr-only">
								아이디
							</label>
							<input
								type="text"
								id="signUpId"
								placeholder="아이디"
								value={userId}
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
								onChange={(e) => setUserId(e.target.value)}
								onKeyUp={onChangeId}
							/>
							<p
								className={`pb-6 text-[#6B6B6B] text-lg ${
									(isId && userId) || !userId
										? "text-[#6B6B6B]"
										: "text-[#FF153C]"
								}`}
							>
								영문 또는 영문, 숫자 조합 6-12자리
							</p>
							<label htmlFor="signUpPwd" className="sr-only">
								비밀번호
							</label>
							<input
								type="password"
								id="signUpPwd"
								placeholder="비밀번호"
								value={userPassword}
								className="bg-[#212121] p-7 mb-3 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
								onChange={(e) => setuserPassword(e.target.value)}
								onKeyUp={onChangePassword}
							/>
							<p
								className={`text-[#FF153C] text-lg mt-[-12px] mb-6 ${
									(isPassword && userPassword) || !userPassword
										? "hidden"
										: "visible"
								}`}
							>
								영문, 숫자, 특수문자 (~!@#$%^&*) 조합 8~15 자리 로 입력해주세요.
							</p>
							<label htmlFor="signUpPwdCheck" className="sr-only">
								비밀번호 확인
							</label>
							<input
								type="password"
								id="signUpPwdCheck"
								placeholder="비밀번호 확인"
								value={userPasswordVerify}
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
								onChange={(e) => setUserPasswordVerify(e.target.value)}
								onKeyUp={onChangePasswordVerify}
							/>
							<p
								className={`pb-1 text-[#6B6B6B] text-lg ${
									(isPasswordCheck && userPassword) || !userPassword
										? "text-[#6B6B6B]"
										: "text-[#FF153C]"
								}`}
							>
								{passwordMessage}
							</p>
							<span className="pb-5" />
							<label htmlFor="signUpEmail" className="sr-only">
								이메일 확인
							</label>
							<input
								type="email"
								id="signUpEmail"
								placeholder="이메일"
								value={userEmail}
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
								onChange={(e) => setUserEmail(e.target.value)}
								onKeyUp={onChangeEmail}
							/>
						</div>
						<div className="pt-5">
							<input
								type="checkbox"
								id="agreeAll"
								checked={isCheckedAll}
								onChange={handleCheckboxAll}
							/>
							<label
								htmlFor="agreeAll"
								className="text-[#A6A6A6] text-xl font-semibold pl-3 cursor-pointer"
							>
								모두 동의합니다.
							</label>
						</div>
						<div className="pt-5">
							<div className="pb-3">
								<input
									type="checkbox"
									id="isAdult"
									onChange={() => {
										setAdultStatus(!adultStatus);
									}}
								/>
								<label
									htmlFor="isAdult"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									만 14세 이상입니다.
								</label>
							</div>
							<div className="pb-3">
								<input
									type="checkbox"
									id="agree01"
									onChange={() => {
										setAgree01(!agree01);
									}}
								/>
								<label
									htmlFor="agree01"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[필수] 서비스 이용약관 동의
								</label>
							</div>
							<div className="pb-3">
								<input
									type="checkbox"
									id="agree02"
									onChange={() => {
										setAgree02(!agree02);
									}}
								/>
								<label
									htmlFor="agree02"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[필수] 개인정보 수집 및 서비스 활용 동의
								</label>
							</div>
							<div className="pb-3">
								<input
									type="checkbox"
									id="agree03"
									onChange={() => {
										setAgree03(!agree03);
									}}
								/>
								<label
									htmlFor="agree03"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[필수] 채널 홈페이지 개인정보 제 3자 제공동의
								</label>
							</div>
							<div className="pb-3">
								<input
									type="checkbox"
									id="agreePrivacy"
									onChange={() => {
										setPrivacyAgreement(!privacyAgreement);
									}}
								/>
								<label
									htmlFor="agreePrivacy"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 개인정보 제 3자 제공동의
								</label>
							</div>
							<div className="pb-3">
								<input
									type="checkbox"
									id="agreeMarketingAll"
									onChange={() => {
										setMarketingAgreement(!marketingAgreement);
									}}
								/>
								<label
									htmlFor="agreeMarketingAll"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 개인정보 수집 및 서비스 활용 동의
								</label>
							</div>
						</div>
						<div className="pl-9 pb-6">
							<div className="pb-3">
								<input
									type="checkbox"
									id="agreeSms"
									onChange={() => {
										setSmsAgreement(!smsAgreement);
									}}
								/>
								<label
									htmlFor="agreeSms"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 마케팅 정보 SMS 수신동의
								</label>
							</div>
							<div className="pb-3">
								<input
									type="checkbox"
									id="agreeEmail"
									onChange={() => {
										setEmailAgreement(!emailAgreement);
									}}
								/>
								<label
									htmlFor="agreeEmail"
									className="text-[#6B6B6B] text-xl font-semibold pl-3 cursor-pointer"
								>
									[선택] 마케팅 정보 이메일 수신동의
								</label>
							</div>
						</div>
						<button
							type="submit"
							className={`rounded text-[#898989] p-7 w-[732px] text-2xl font-extrabold text-center ${
								isId &&
								isPassword &&
								isPasswordCheck &&
								isEmail &&
								adultStatus &&
								agree01 &&
								agree02 &&
								agree03
									? "bg-[#FF153C] text-[#fff]"
									: "bg-[#404040]"
							}`}
							disabled={
								!(
									isId &&
									isPassword &&
									isPasswordCheck &&
									isEmail &&
									adultStatus &&
									agree01 &&
									agree02 &&
									agree03
								)
							}
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
