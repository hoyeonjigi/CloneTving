import Footer from "@/components/Footer";
import Header from "@/components/Header";
import profilePlus from "@/assets/profiles/icon-plus.png";
import profileEdit from "@/assets/profiles/icon-edit.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "@/utils/crud";
import useLogin from "@/store/login";
import useEdit from "@/store/useEdit";
import useCreate from "@/store/useCreate";

function ProfilesForEdit() {
	const [userProfiles, setUserProfiles] = useState([]);
	const { userId } = useLogin();
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

	const { isImageSelected, setIsImageSelected } = useCreate();

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
					userProfileImageName: item.profileImageName,
					alt: `대체 이미지`,
					child: item.child,
				}))
			);
			console.log(result);
		} catch (error) {
			console.log(error);
			console.log("에러출력");
		}
	};

	const navigate = useNavigate();

	const handleProfileDetail = (
		profileName,
		userProfileUrl,
		userProfileImageName,
		isChild
	) => {
		setProfileName(profileName);
		setImageName(userProfileImageName);
		setUserProfileUrl(userProfileUrl);
		setChild(isChild);
		navigate("/user/profileForEdit");
	};

	useEffect(() => {
		localStorage.removeItem("editProfile");
		getUserData();
		setIsImageSelected(false);
	}, []);

	return (
		<div className="bg-black font-noto">
			<Header />
			<div className="flex flex-col items-center my-32">
				{/* 프로필 텍스트 */}
				<div className="flex flex-col gap-6 text-center ">
					<h3 className="text-white text-4xl font-bold">프로필 편집</h3>
					<p className="text-2xl text-[#a3a3a3] font-medium">
						편집할 프로필을 선택해주세요
					</p>
				</div>
				{/* 프로필 아이콘 */}
				<div className="mt-12 flex items-center justify-center">
					<ul className="flex flex-row justify-center items-center gap-10 w-[70%]">
						{userProfiles.map((user, index) => (
							<li
								key={user.profileName}
								className="flex flex-col text-center gap-6 flex-grow relative"
							>
								<motion.button
									className="w-full overflow-hidden relative"
									whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
									transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
								>
									<div
										onClick={() =>
											handleProfileDetail(
												user.userProfileName,
												user.userProfileImageUrl,
												user.userProfileImageName,
												user.child
											)
										}
									>
										<img
											src={user.userProfileImageUrl}
											alt="프로필 이미지"
											className="w-full h-auto"
										/>
										<div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
										<img
											src={profileEdit}
											alt="프로필 편집 아이콘"
											className="absolute w-[25%] h-auto top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
										/>
									</div>
								</motion.button>
								<p className="text-[#888888] text-xl font-medium">
									{user.userProfileName}
								</p>
							</li>
						))}

						{/* <li className="flex flex-col text-center gap-6 flex-grow relative">
              <button className="bg-[#4e4e4e] w-full h-full p-[6.6rem]">
                <img
                  src={profilePlus}
                  alt="프로필 추가 아이콘"
                  className="absolute w-[35%] h-auto top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </button>
              <p className="text-[#888888] text-xl font-medium">프로필 추가</p>
            </li> */}
						{userProfiles.length < 4 && (
							<li className="flex flex-col text-center gap-6 flex-grow relative">
								<Link to="/user/profile">
									<motion.button
										className="bg-[#4e4e4e] w-full h-full p-[6.6rem] relative" // 버튼에 relative를 추가
										whileHover={{ y: -15 }}
										transition={{
											type: "tween",
											stiffness: 300,
											duration: 0.2,
										}}
									>
										<img
											src={profilePlus}
											alt="프로필 추가 아이콘"
											className="absolute w-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // 이미지의 위치를 버튼 중앙으로 설정
										/>
									</motion.button>
								</Link>
								<p className="text-[#888888] text-xl font-medium">
									프로필 추가
								</p>
							</li>
						)}
					</ul>
				</div>
				<div className="mt-16 mb-24">
					<Link to="/user/profiles">
						<button
							type="button"
							className="px-[6.2rem] py-6 font-bold text-1.5xl bg-[#dedede] text-black  rounded hover:bg-white"
						>
							완료
						</button>
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default ProfilesForEdit;
