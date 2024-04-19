import Footer from "@/components/Footer";
import Header from "@/components/Header";
import profilePlus from "@/assets/profiles/icon-plus.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getData } from "@/utils/crud";
import { useEffect, useState } from "react";
import useCreate from "@/store/useCreate";
import useLogin from "@/store/login";
import useProfile from "@/store/useProfile";
import useProfileList from "@/store/useProfileList";

function Profile() {
	const { userProfiles, setUserProfiles } = useProfileList();
	const {
		profileData,
		profileImages,
		baseProfileImages,
		yumiProfileImages,
		isImageSelected,
		setProfileData,
		setProfileImages,
		setBaseProfileImages,
		setYumiProfileImages,
		setIsImageSelected,
	} = useCreate();
	const { userId } = useLogin();
	const {
		profileName,
		userProfileUrl,
		child,
		setProfileName,
		setUserProfileUrl,
		setChild,
	} = useProfile();

	// 사용자 정보 가져오기
	const getUserData = async () => {
		try {
			const testUrl = `https://hoyeonjigi.site/profile/${userId}`;
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: `${type} ${token}`,
			};

			const result = await getData(testUrl, headers);
			setUserProfiles(
				result.map((item) => ({
					userProfileName: item.profileName,
					userProfileImageUrl: `https://hoyeonjigi.s3.ap-northeast-2.amazonaws.com${item.profileImageUrl}`,
					alt: `테스트 이미지`,
					child: item.child,
				}))
			);
			console.log(result);
		} catch (error) {
			console.log(error);
			console.log("에러출력");
		}
	};

	//프로필 이미지 정보 가져오기
	const getProfileInfo = async () => {
		try {
			const profileUrl = "https://hoyeonjigi.site/profileimages";
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");
			const headers = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: `${type} ${token}`,
			};

			const result = await getData(profileUrl, headers);
			// localStorage.setItem("imageInfo", JSON.stringify(result));
			// // 서버에 저장된 프로필 이미지 정보 가져옴
			// setProfileData(result);

			// // 프로필 이미지 카테고리별 정렬
			// setProfileImages(
			// 	profileData.map((item) => ({
			// 		profileImageId: item.profileImageId,
			// 		profileImageName: item.profileImageName,
			// 		image_url: `https://hoyeonjigi.s3.ap-northeast-2.amazonaws.com${item.image_url}`,
			// 		category: item.category,
			// 		alt: `프로필 이미지`,
			// 	}))
			// );

			const updateProfileImages = result.map((item) => ({
				profileImageId: item.profileImageId,
				profileImageName: item.profileImageName,
				image_url: `https://hoyeonjigi.s3.ap-northeast-2.amazonaws.com${item.image_url}`,
				category: item.category,
				alt: `프로필 이미지`,
			}));

			setBaseProfileImages(
				updateProfileImages.filter((item) => item.profileImageId <= 10)
			);
			setYumiProfileImages(
				updateProfileImages.filter((item) => item.profileImageId > 10)
			);

			// console.log(result);
		} catch (error) {
			console.error(`Error in sending POST request: ${error}`);
		}
	};

	// 프로필 이미지 카테고리별 정렬

	const navigate = useNavigate(); // useNavigate hook을 통해 navigate 함수를 가져옴

	const handleProfileAdd = () => {
		navigate("/user/profile"); // 프로필 추가 버튼을 눌렀을 때 '/profilesForEdit'로 이동
	};

	const handleSelectProfile = (name, url, isChild) => {
		setProfileName(name);
		setUserProfileUrl(url);
		setChild(isChild);
	};

	useEffect(() => {
		localStorage.removeItem("myProfile");
		localStorage.removeItem("editProfile");
		getProfileInfo();
		setIsImageSelected(false);
		getUserData();
		console.log("test");
	}, []);

	return (
		<div className="bg-black">
			<Header />
			<div className="flex flex-col items-center my-32">
				{/* 프로필 텍스트 */}
				<div className="flex flex-col gap-6 text-center ">
					<h3 className="text-white text-4xl font-bold">프로필 선택</h3>
					<p className="text-2xl text-[#a3a3a3] font-medium">
						시청할 프로필을 선택해주세요.
					</p>
				</div>
				{/* 프로필 아이콘 */}
				<div className="mt-12 flex items-center justify-center">
					<ul className="flex flex-row justify-center items-center gap-10 w-[70%]">
						{userProfiles.map((user, index) => (
							<li
								key={user.userProfileName}
								className="flex flex-col text-center gap-6 flex-grow"
							>
								<Link to="/main">
									<motion.button
										className="w-full"
										whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
										transition={{
											type: "tween",
											stiffness: 300,
											duration: 0.2,
										}} // transition 설정
										onClick={() =>
											handleSelectProfile(
												user.userProfileName,
												user.userProfileImageUrl,
												user.child
											)
										}
									>
										<img
											src={user.userProfileImageUrl}
											alt="프로필 이미지"
											className="w-full h-auto"
										/>
									</motion.button>
								</Link>
								<p className="text-[#888888] text-xl font-medium">
									{user.userProfileName}
								</p>
							</li>
						))}

						{/* <li className="flex flex-col text-center gap-6 flex-grow">
							<motion.button
								className="w-full"
								whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
								transition={{ type: "tween", stiffness: 300, duration: 0.2 }} // transition 설정
							>
								<img
									src={profile1}
									alt="첫번째 프로필"
									className="w-full h-auto"
								/>
							</motion.button>
							<p className="text-[#888888] text-xl font-medium">이재호</p>
						</li>

						<li className="flex flex-col text-center gap-6 flex-grow">
							<motion.button
								className="w-full"
								whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
								transition={{ type: "tween", stiffness: 300, duration: 0.2 }} // transition 설정
							>
								<img
									src={profile2}
									alt="두번째 프로필"
									className="w-full h-auto"
								/>
							</motion.button>

							<p className="text-[#888888] text-xl font-medium">박세웅</p>
						</li> */}
						{userProfiles.length < 4 && (
							<li className="flex flex-col text-center gap-6 flex-grow relative">
								<motion.button
									className="bg-[#4e4e4e] w-full h-full p-[6.6rem] relative" // 버튼에 relative를 추가
									whileHover={{ y: -15 }}
									transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
									onClick={handleProfileAdd}
								>
									<img
										src={profilePlus}
										alt="프로필 추가 아이콘"
										className="absolute w-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // 이미지의 위치를 버튼 중앙으로 설정
									/>
								</motion.button>
								<p className="text-[#888888] text-xl font-medium">
									프로필 추가
								</p>
							</li>
						)}
					</ul>
				</div>
				<div className="mt-20 mb-24">
					<Link to="/profilesForEdit">
						<button
							type="button"
							className="px-[4.3rem] py-5 font-medium text-xl text-[#A3A3A3] border border-[#4e4e4e] rounded hover:text-[#dedede] hover:border-[#888888]"
						>
							프로필 편집
						</button>
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Profile;
