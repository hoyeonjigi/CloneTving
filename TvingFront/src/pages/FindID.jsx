import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function FindID() {
	return (
		<>
			<Helmet>
				<title>TvingFront - FindID</title>
			</Helmet>
			<Header />
			<div className="bg-black font-noto">
				<div className="flex flex-col items-center pt-[60px] pb-[100px]">
					<h3 className="text-white text-center font-extrabold text-4xl pb-[60px]">
						아이디 찾기
					</h3>
					<form>
						<div className="flex flex-col gap-3">
							<h3 className="text-[#DEDEDE] text-2xl">이메일로 찾기</h3>
							<h3 className="text-[#888888] text-xl pb-8">
								가입 시 등록한 이메일을 입력해주세요.
							</h3>
							<label htmlFor="myEmail" className="sr-only">
								이메일
							</label>
							<input
								type="email"
								id="myEmail"
								placeholder="이메일"
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
					<div className="flex flex-row h-[156px] justify-center items-center gap-5">
						<div className="bg-[#2B2B2B] w-[100%] h-[1px]"></div>
						<h3 className="transform-none">또는</h3>
						<div className="bg-[#212121] w-[100%] h-[1px]"></div>
					</div>
					<div className="flex flex-col gap-3">
						<h3 className="text-[#DEDEDE] text-2xl">본인인증으로 찾기</h3>
						<h3 className="text-[#888888] text-xl ">
							이미 본인인증이 완료된 계정에 한하여 아이디 찾기가 가능합니다.
						</h3>
						<button className="bg-[#DEDEDE] rounded text-black p-7 mt-5 w-[732px] text-xl font-bold text-center hover:bg-white">
							본인인증하기
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default FindID;
