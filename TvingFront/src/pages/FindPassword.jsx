import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function FindPassword() {
	return (
		<>
			<Helmet>
				<title>TvingFront - FindPassword</title>
			</Helmet>
			<Header />
			<div className="bg-black font-noto">
				<div className="flex flex-col items-center pt-[60px] pb-[100px]">
					<h3 className="text-white text-center font-extrabold text-4xl pb-[60px]">
						비밀번호 찾기
					</h3>

					<form>
						<div className="flex flex-col gap-3">
							<h3 className="text-[#888888] text-xl w-[732px]">
								아이디 확인 후 등록된 이메일 주소로 비밀번호 재설정을 위한 인증
								메일이 발송됩니다. 이메일을 확인하여 12시간 이내에 비밀번호
								재설정을 완료해주세요.
							</h3>
							<label htmlFor="myId" className="sr-only">
								아이디
							</label>
							<input
								type="email"
								id="myId"
								placeholder="아이디"
								required
								className="bg-[#212121] p-7 text-xl rounded text-[#ABABAB] font-extralight w-[732px] focus:border-slate-100 cursor-pointer"
							/>
							<button
								type="submit"
								className="bg-[#4e4e4e] rounded text-[#888888] p-7 mt-5 w-[732px] text-xl font-semibold text-center"
							>
								확인
							</button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default FindPassword;
