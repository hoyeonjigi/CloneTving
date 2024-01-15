import Footer from "@/components/Footer";
import Header from "@/components/Header";
import tving from "@/assets/companyIcon/tving-icon.svg";
import apple from "@/assets/companyIcon/apple-icon.svg";
import cj from "@/assets/companyIcon/cj-icon.png";
import face from "@/assets/companyIcon/face-icon.svg";
import kakao from "@/assets/companyIcon/kakao-icon.svg";
import naver from "@/assets/companyIcon/naver-icon.svg";
import twitter from "@/assets/companyIcon/twitter-icon.svg";
import { Link } from "react-router-dom";

function UserTving() {
	return (
		<div className="bg-black flex flex-col">
			<Header />
			<div className="flex flex-col text-center mb-12">
				<h3 className="font-bold text-4xl text-white leading-normal">
					반가워요! <br />
					계정을 선택해주세요.
				</h3>
			</div>
			<div className="flex flex-col items-center gap-3">
				<button className="relative border border-[#4e4e4e] text-[#a3a3a3] w-[37%] py-4 text-lg rounded-sm hover:text-[#dedede] hover:border-[#888888]">
					<img
						src={tving}
						alt="티빙 아이콘"
						className="absolute top-[30%] left-[3%] w-[4.5%]"
					/>
					TVING ID 시작하기
				</button>
				<button className="relative border border-[#4e4e4e] text-[#a3a3a3] w-[37%] py-4 text-lg rounded-sm hover:text-[#dedede] hover:border-[#888888]">
					<img
						src={naver}
						alt="네이버 아이콘"
						className="absolute top-[30%] left-[3%] w-[4.5%]"
					/>
					네이버로 시작하기
				</button>

				<button className="relative border border-[#4e4e4e] text-[#a3a3a3] w-[37%] py-4 text-lg rounded-sm hover:text-[#dedede] hover:border-[#888888]">
					<img
						src={kakao}
						alt="카카오 아이콘"
						className="absolute top-[30%] left-[3%] w-[4.5%]"
					/>
					카카오로 시작하기
				</button>

				<button className="relative border border-[#4e4e4e] text-[#a3a3a3] w-[37%] py-4 text-lg rounded-sm hover:text-[#dedede] hover:border-[#888888]">
					<img
						src={face}
						alt="페이스북 아이콘"
						className="absolute top-[30%] left-[3%] w-[4.5%]"
					/>
					페이스북으로 시작하기
				</button>

				<button className="relative border border-[#4e4e4e] text-[#a3a3a3] w-[37%] py-4 text-lg rounded-sm hover:text-[#dedede] hover:border-[#888888]">
					<img
						src={twitter}
						alt="트위터 아이콘"
						className="absolute top-[30%] left-[3%] w-[4.5%]"
					/>
					트위터로 시작하기
				</button>

				<button className="relative border border-[#4e4e4e] text-[#a3a3a3] w-[37%] py-4 text-lg rounded-sm hover:text-[#dedede] hover:border-[#888888]">
					<img
						src={apple}
						alt="애플 아이콘"
						className="absolute top-[30%] left-[3%] w-[4.5%]"
					/>
					Apple로 계속하기
				</button>

				<button className="relative border border-[#4e4e4e] text-[#a3a3a3] w-[37%] py-4 text-lg rounded-sm hover:text-[#dedede] hover:border-[#888888]">
					<img
						src={cj}
						alt="씨제이 원 아이콘"
						className="absolute top-[30%] left-[3%] w-[4.5%]"
					/>
					CJ ONE으로 시작하기
				</button>
			</div>

			<div className="flex flex-row items-center justify-center mt-10 mb-36">
				<span className="text-[#6e6e6e] mr-3">아이디를 잊으셨나요?</span>
				<a href="" className="text-[#A3A3A3] hover:text-[#dedede]">
					아이디 찾기
				</a>
			</div>
			<Footer />
		</div>
	);
}

export default UserTving;
