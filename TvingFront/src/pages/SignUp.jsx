import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getData, postData } from "@/utils/crud";
import debounce from "lodash/debounce";

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
	const [query, setQuery] = useState(""); // 입력 값을 상태로 관리
	const [searchContent, setSearchContent] = useState([]);
	//오류 메세지
	const [idMessage, setIdMessage] = useState(
		"영문 또는 영문, 숫자 조합 6-12자리"
	);
	const [passwordMessage, setPasswordMessage] = useState(
		"영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15자리"
	);

	//유효성 검사
	const [isId, setIsId] = useState(false);
	const [isIdExist, setIsIdExist] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [isPasswordCheck, setIsPasswordCheck] = useState(false);
	const [isEmail, setIsEmail] = useState(false);
	const [isCheckedAll, setIsCheckedAll] = useState(false);
	//const [isButtonEnabled, setIsButtonEnabled] = useState(false);

	//Rest api 연동 테스트
	//회원가입 성공 여부
	const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

	const url = "http://hoyeonjigi.site:8080/user/register";
	const data = {
		userId,
		userPassword,
		userEmail,
		adultStatus,
		privacyAgreement,
		smsAgreement,
		emailAgreement,
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지

		try {
			const response = await postData(url, data, headers);
			setIsSignUpSuccess(true); // 로그인 성공 상태를 true로 변경
			console.log("회원가입 성공");
		} catch (error) {
			console.error(`Error in sending POST request: ${error}`);

			// setUserId(""); // 아이디 상태 초기화
			// setuserPassword(""); // 비밀번호 상태 초기화
		}
	};

	useEffect(() => {
		if (
			adultStatus &&
			agree01 &&
			agree02 &&
			agree03 &&
			privacyAgreement &&
			marketingAgreement &&
			smsAgreement &&
			emailAgreement
		) {
			setIsCheckedAll(true);
		} else {
			setIsCheckedAll(false);
		}
		if (smsAgreement && emailAgreement) {
			setMarketingAgreement(true);
		} else {
			setMarketingAgreement(false);
		}
	}, [
		adultStatus,
		agree01,
		agree02,
		agree03,
		privacyAgreement,
		marketingAgreement,
		smsAgreement,
		emailAgreement,
	]); //

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

	const handleCheckboxMarketing = () => {
		let newValue2 = !marketingAgreement;
		setMarketingAgreement(newValue2);
		setSmsAgreement(newValue2);
		setEmailAgreement(newValue2);
	};

	// const onChangeId = (e) => {
	// 	setUserId(e.target.value);
	// 	const idRegExp = /^[a-zA-z0-9]{6,12}$/;
	// 	if (!idRegExp.test(userId)) {
	// 		setIsId(false);
	// 	} else {
	// 		setIsId(true);
	// 	}
	// 	getIdExist(userId);
	// 	if (isIdExist) {
	// 		setIdMessage("이미 사용 중인 아이디입니다.");
	// 	} else {
	// 		setIdMessage("영문 또는 영문, 숫자 조합 6-12자리");
	// 	}
	// };

	//아이디 중복 확인
	// const getIdExist = async () => {
	// 	try {
	// 		const response = await getData(idExistUrl, headers);
	// 		setIsIdExist(response);
	// 		console.log("보낸 url : " + idExistUrl);
	// 		console.log({ isIdExist });
	// 	} catch (error) {
	// 		console.error(`Error in sending POST request: ${error}`);
	// 	}
	// };

	//디바운스
	const debouncedSearch = useRef(null);

	const handleDuplication = useCallback(
		debounce(async (query) => {
			// handleSearch 함수 구현
			try {
				// const baseUrl = "http://hoyeonjigi.site:8080/content/";
				// const encodedQuery = encodeURIComponent(query);
				// const url = `${baseUrl}${encodedQuery}`;
				const idExistUrl = `http://hoyeonjigi.site:8080/user/exist/${userId}`;
				const headers = {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				};

				// console.log(url);
				// const type = Cookies.get("grantType");
				// const token = Cookies.get("accessToken");
				// const headers = {
				// 	"Content-Type": "application/json",
				// 	"Access-Control-Allow-Origin": "*",
				// 	Authorization: `${type} ${token}`,
				// };
				const result = await getData(url, headers);

				console.log(result);
				// // result에 값이 있으면 그대로 저장하고, 없으면 빈 배열을 저장합니다.
				// const searchData =
				// 	result.length > 0
				// 		? result.map((item) => ({
				// 				src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
				// 				alt: item.contentTitle,
				// 		  }))
				// 		: [];

				// setSearchContent(searchData);
				// // console.log(searchContent);
			} catch (error) {
				console.error(`Error in sending get request: ${error}`);
				// refresh();
			}
		}, 500),
		[]
	);
	useEffect(() => {
		console.log(searchContent);
	}, [searchContent]);

	debouncedSearch.current = handleDuplication;

	const handleChange = (e) => {
		const value = e.target.value;
		setQuery(value);
		setSearchContent([]); // 검색 결과 초기화
		debouncedSearch.current(value);
	};

	useEffect(() => {
		return () => {
			debouncedSearch.current.cancel();
		};
	}, []);

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
								value={query}
								className="bg-[#212121] p-7 text-xl rounded text-white font-extralight w-[732px] focus:border-slate-100"
								onChange={handleChange}
								// onKeyUp={onChangeId}
							/>
							<p
								className={`pb-6 text-[#6B6B6B] text-lg ${
									((isId && userId) || !userId) && !isIdExist
										? "text-[#6B6B6B]"
										: "text-[#FF153C]"
								}`}
							>
								{idMessage}
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
								onClick={handleCheckboxAll}
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
									checked={adultStatus}
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
									checked={agree01}
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
									checked={agree02}
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
									checked={agree03}
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
									checked={privacyAgreement}
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
									checked={marketingAgreement}
									onClick={handleCheckboxMarketing}
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
									checked={smsAgreement}
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
									checked={emailAgreement}
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
