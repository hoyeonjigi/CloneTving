import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

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

import check from "@/assets/signIn/check_white.svg";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import UserProfileModal from "@/components/modal/UserProfileModal";
import { postData } from "@/utils/crud";

function ProfileForCreate() {
	const profiles = [
		{ src: profile1, alt: "기본 프로필 1", selectedImageName: "default_01" },
		{ src: profile2, alt: "기본 프로필 2", selectedImageName: "default_02" },
		{ src: profile3, alt: "기본 프로필 3", selectedImageName: "default_03" },
		{ src: profile4, alt: "기본 프로필 4", selectedImageName: "default_04" },
		{ src: profile5, alt: "기본 프로필 5", selectedImageName: "default_05" },
		{ src: profile6, alt: "기본 프로필 6", selectedImageName: "default_06" },
		{ src: profile7, alt: "기본 프로필 7", selectedImageName: "default_07" },
		{ src: profile8, alt: "기본 프로필 8", selectedImageName: "default_08" },
		{ src: profile9, alt: "기본 프로필 9", selectedImageName: "default_09" },
		{ src: profile10, alt: "기본 프로필 10", selectedImageName: "default_10" },
	];

	const [profileName, setProfileName] = useState("");
	const [child, setChild] = useState(false);
	const randomIndex = Math.floor(Math.random() * profiles.length);
	const [currentProfile, setCurrentProfile] = useState(profiles[randomIndex]);
	const [imageName, setImageName] = useState(
		profiles[randomIndex].selectedImageName
	);
	const [isName, setIsName] = useState(false);
	//프로필 모달
	// 모달 창 상태를 관리하는 state
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 모달 창을 여는 함수
	const openModal = () => {
		setIsModalOpen(true);
	};

	// 모달 창을 닫는 함수
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// 사용자 이름 정규식
	const handleNameChange = (e) => {
		const inputName = e.target.value;
		setProfileName(inputName);

		const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

		if (!regex.test(inputName) && inputName.length > 0) {
			setProfileName(inputName.substring(0, inputName.length - 1));
		}
		console.log(`${regex.test(profileName)}`);
	};

	const navigate = useNavigate();

	const handleCancel = () => {
		navigate("/user/profiles");
	};

	const handleSubmit = async (e) => {
		e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지

		const url = "http://hoyeonjigi.site:8080/profile/register"; // 변경해야 함
		const type = Cookies.get("grantType");
		const token = Cookies.get("accessToken");
		const data = { profileName, imageName, child };
		const headers = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			Authorization: `${type} ${token}`,
		};

		try {
			const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
			if (regex.test(profileName)) {
				const createResult = await postData(url, data, headers);
				console.log(`성공 여부 : ${createResult}`);
				navigate("/user/profiles");
			} else {
				alert("2자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다.");
			}
		} catch (error) {
			console.error(`Error in sending POST request: ${error}`);
		}
	};

	useEffect(() => {
		console.log(`currentProfile : ${currentProfile.selectedImageName}`);
		setImageName(currentProfile.selectedImageName);
		console.log(`imageName : ${imageName}`);
	}, []);

	return (
		<div className="bg-black font-noto">
			<Helmet>
				<title>프로필 만들기</title>
			</Helmet>

			<Header />

			<div className="flex flex-col items-center justify-center">
				<h3 className="text-white text-4xl font-bold mt-24 mb-12">
					프로필 만들기
				</h3>

				<form onSubmit={handleSubmit} className="flex flex-col items-center">
					<motion.button
						className="w-[40%] overflow-hidden relative flex items-center justify-center"
						whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
						transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
						onClick={openModal}
						type="button"
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

					<UserProfileModal
						isOpen={isModalOpen}
						closeModal={closeModal}
					></UserProfileModal>

					<div className="w-full mt-12">
						<label htmlFor="name" className="sr-only">
							사용자 프로필 이름
						</label>
						<input
							type="text"
							id="name"
							className="bg-[#191919] w-full focus:border-red-700 text-white px-5 py-4 rounded-sm placeholder:text-[#4d4d4d] text-xl"
							placeholder="프로필 이름"
							defaultValue={profileName}
							onKeyUp={handleNameChange}
							minLength={2}
							maxLength={10}
						/>
						<p className="text-[#808080] text-sm font-medium mt-2 mb-8">
							* 2자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다.
						</p>
					</div>

					<hr className="border border-[#191919] mb-5 w-full" />

					<div className="flex flex-row justify-between w-full mb-5 items-center">
						<div className="text-[#B3B3B3] text-base">어린이인가요?</div>
						<button
							type="button"
							className="bg-[#6E6E6E] rounded-full w-9 h-5 relative"
						>
							<img
								src={check}
								className="absolute top-1/2 left-3 transform -translate-x-1/2 -translate-y-1/2"
							/>
						</button>
					</div>

					<hr className="border border-[#191919] mb-14 w-full" />

					<div className="flex flex-row gap-3 mb-56">
						<button className="px-[5.5rem] py-5 font-bold text-1.5xl bg-[#dedede] text-black  rounded hover:bg-white">
							확인
						</button>
						<button
							className="px-[5.5rem] py-5 font-normal text-1.5xl  text-btnText border border-btnBorder rounded hover:text-[#dedede] hover:border-[#888888]"
							onClick={handleCancel}
						>
							취소
						</button>
					</div>
				</form>
			</div>

			<Footer />
		</div>
	);
}

export default ProfileForCreate;
