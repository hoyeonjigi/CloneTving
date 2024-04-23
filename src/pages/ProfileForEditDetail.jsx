import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { patchData, deleteData } from "@/utils/crud";
import useEdit from "@/store/useEdit";
import useLogin from "@/store/login";
import useCreate from "@/store/useCreate";
import UserProfileModal from "@/components/modal/UserProfileModal";
import profileEdit from "@/assets/profiles/icon-edit.svg";
import { useNavigate } from "react-router-dom";
import checkIcon from "@/assets/profiles/icon-circle.svg";

import { motion } from "framer-motion";

function ProfileForEditDetail() {
	const {
		profileName,
		imageName,
		userProfileUrl,
		child,
		setProfileName,
		setImageName,
		setUserProfileUrl,
		setChild,
	} = useEdit();

	const { selectedImageName, selectedImageUrl, isImageSelected } = useCreate();

	const { userId } = useLogin();
	const [updateProfileName, setUpdateProfileName] = useState(profileName);
	const [currentProfile, setCurrentProfile] = useState({
		src: userProfileUrl,
		alt: "사용자 프로필 이미지",
	});

	//모달 창 관리 state
	const [isModalOpen, setIsModalOpen] = useState(false);
	// 모달 창을 여는 함수
	const openModal = () => {
		setIsModalOpen(true);
	};

	// 모달 창을 닫는 함수
	const closeModal = () => {
		setIsModalOpen(false);
	};
	//페이지 이동 함수
	const navigate = useNavigate();

	const handleNameChange = (e) => {
		const inputName = e.target.value;
		setUpdateProfileName(inputName);

		const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

		if (!regex.test(inputName) && inputName.length > 0) {
			setUpdateProfileName(inputName.substring(0, inputName.length - 1));
		}
	};

	//어린이 여부 확인
	const handleChild = () => {
		setChild(!child);
	};

	const handleChange = async (e) => {
		e.preventDefault();
		try {
			const url = `https://hoyeonjigi.site/profile`;
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");
			//기존 이름과 변경한 이름이 동일한 경우
			let data = {};
			if (updateProfileName == profileName) {
				data = {
					profileName,
					userId,
					imageName,
					child,
				};
			} else {
				data = {
					profileName,
					updateProfileName,
					userId,
					imageName,
					child,
				};
			}
			const headers = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: `${type} ${token}`,
			};

			const result = await patchData(url, data, headers);
			// console.log(`프로필 수정 완료`);
			navigate("/user/profiles");
		} catch (error) {
			console.log(error);
			console.log("에러출력");
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const testUrl = `https://hoyeonjigi.site/profile/${profileName}`;
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: `${type} ${token}`,
			};

			const result = await deleteData(testUrl, headers);
			// console.log(result);
			navigate("/user/profiles");
		} catch (error) {
			console.log(error);
			console.log("에러출력");
		}
	};

	useEffect(() => {
		// const randomIndex = Math.floor(Math.random() * profiles.length);
		// setCurrentProfile(profiles[randomIndex]);
		// setCurrentProfile()

		if (isImageSelected) {
			setCurrentProfile({
				src: selectedImageUrl,
				alt: "대체 이미지",
				selectedImageName: selectedImageName,
			});
			setImageName(selectedImageName);
		}
	}, [selectedImageName, selectedImageUrl]);

	return (
		<div className="bg-black font-noto">
			<Helmet>
				<title>프로필 편집</title>
			</Helmet>

			<Header />

			<div className="flex flex-col items-center justify-center md-h lg-h">
				<h3 className="text-white text-4xl font-bold mt-24 mb-12">
					프로필 편집
				</h3>

				<form className="flex flex-col items-center">
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
							defaultValue={updateProfileName}
							onChange={handleNameChange}
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
							className={`${
								child ? "bg-[#008FE7]" : "bg-[#6E6E6E]"
							} rounded-full w-10 h-6 relative`}
							onClick={handleChild}
						>
							<img
								src={checkIcon}
								className={`absolute w-[18px] top-1/2 ${
									child ? "left-7" : "left-3"
								} transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out`}
							/>
						</button>
					</div>

					<hr className="border border-[#191919] mb-14 w-full" />

					<div className="flex flex-row gap-3 mb-56">
						<button
							className="px-[4rem] py-5 font-bold text-1.5xl bg-[#dedede] text-black  rounded hover:bg-white"
							onClick={handleChange}
						>
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
