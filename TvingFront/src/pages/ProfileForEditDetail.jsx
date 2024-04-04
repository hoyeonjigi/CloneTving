import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { deleteData } from "@/utils/crud";

import profile1 from "@/assets/profiles/profile1.png";
import profile2 from "@/assets/profiles/profile2.png";
import profile3 from "@/assets/profiles/profile3.png";
import profile4 from "@/assets/profiles/profile4.png";
import profile5 from "@/assets/profiles/profile5.png";
import profile6 from "@/assets/profiles/profile6.png";
import profile7 from "@/assets/profiles/profile7.png";
import profile8 from "@/assets/profiles/profile8.png";
import profile9 from "@/assets/profiles/profile9.png";
import profile10 from "@/assets/profiles/profile10.png";
import profileEdit from "@/assets/profiles/icon-edit.svg";

import { motion } from "framer-motion";

function ProfileForEditDetail() {
	const profiles = [
		{ src: profile1, alt: "기본 프로필 1" },
		{ src: profile2, alt: "기본 프로필 2" },
		{ src: profile3, alt: "기본 프로필 3" },
		{ src: profile4, alt: "기본 프로필 4" },
		{ src: profile5, alt: "기본 프로필 5" },
		{ src: profile6, alt: "기본 프로필 6" },
		{ src: profile7, alt: "기본 프로필 7" },
		{ src: profile8, alt: "기본 프로필 8" },
		{ src: profile9, alt: "기본 프로필 9" },
		{ src: profile10, alt: "기본 프로필 10" },
	];

	const location = useLocation();
	const userInfo = { ...location.state };

	const [name, setName] = useState(userInfo.profileName);
	const [currentProfile, setCurrentProfile] = useState([
		{ src: userInfo.imageUrl, alt: "기본 프로필" },
	]);

	const handleNameChange = (e) => {
		const inputName = e.target.value;
		setName(inputName);

		const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

		if (!regex.test(inputName) && inputName.length > 0) {
			setName(inputName.substring(0, inputName.length - 1));
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const testUrl = `http://hoyeonjigi.site:8080/profile/${name}`;
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: `${type} ${token}`,
			};
			const result = await deleteData(testUrl);
			console.log(result);
		} catch (error) {
			console.log(error);
			console.log("에러출력");
		}
	};

	useEffect(() => {
		console.log(currentProfile);
		// const randomIndex = Math.floor(Math.random() * profiles.length);
		// setCurrentProfile(profiles[randomIndex]);
		// setCurrentProfile()
	}, []);

	return (
		<div className="bg-black font-noto">
			<Helmet>
				<title>프로필 편집</title>
			</Helmet>

			<Header />

			<div className="flex flex-col items-center justify-center">
				<h3 className="text-white text-4xl font-bold mt-24 mb-12">
					프로필 편집
				</h3>

				<form className="flex flex-col items-center">
					<motion.button
						className="w-[40%] overflow-hidden relative flex items-center justify-center"
						whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
						transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
					>
						<img
							src={currentProfile.src}
							alt={currentProfile.alt}
							className="w-full h-auto "
						/>
						<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
						<img
							src={profileEdit}
							alt="프로필 편집 아이콘"
							className="absolute w-[25%] h-auto top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						/>
					</motion.button>

					<div className="w-full mt-12">
						<label htmlFor="name" className="sr-only">
							사용자 프로필 이름
						</label>
						<input
							type="text"
							id="name"
							className="bg-[#191919] w-full focus:border-red-700 text-white px-5 py-4 rounded-sm placeholder:text-[#4d4d4d] text-xl"
							placeholder="프로필 이름"
							defaultValue={name}
							onChange={handleNameChange}
							minLength={2}
							maxLength={10}
						/>
						<p className="text-[#808080] text-sm font-medium mt-2 mb-8">
							* 2자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다.
						</p>
					</div>

					<hr className="border border-[#191919] mb-14 w-full" />

					<div className="flex flex-row gap-3 mb-56">
						<button className="px-[4rem] py-5 font-bold text-1.5xl bg-[#dedede] text-black  rounded hover:bg-white">
							확인
						</button>
						<Link to="/profilesForEdit">
							<button className="px-[4rem] py-5 font-normal text-1.5xl  text-btnText border border-btnBorder rounded hover:text-[#dedede] hover:border-[#888888]">
								취소
							</button>
						</Link>
						<button
							className="px-[2rem] py-5 font-normal text-1.5xl  text-btnText border border-btnBorder rounded hover:text-[#dedede] hover:border-[#888888]"
							onClick={handleDelete}
						>
							프로필 삭제
						</button>
					</div>
				</form>
			</div>

			<Footer />
		</div>
	);
}

export default ProfileForEditDetail;
