import Footer from "@/components/Footer";
import Header from "@/components/Header";
import profile1 from "@/assets/profiles/profile1.png";
import profile2 from "@/assets/profiles/profile2.png";
import profilePlus from "@/assets/profiles/icon-plus.png";
import profileEdit from "@/assets/profiles/icon-edit.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProfilesForEdit() {
const navigate = useNavigate();

	const handleProfileDetail = () => {
		navigate("/user/profileForEdit", {
			state: {
				profileName: "가져온 이름",
				userId: "test123",
				imageName: `@/assets/profiles/profile1.png`,
			},
		});
	};

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
            <li className="flex flex-col text-center gap-6 flex-grow relative">
              <motion.button
                className="w-full overflow-hidden relative"
                whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
                transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
              >
                <img
                  src={profile1}
                  alt="첫번째 프로필"
                  className="w-full h-auto"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <img
                  src={profileEdit}
                  alt="프로필 편집 아이콘"
                  className="absolute w-[25%] h-auto top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </motion.button>
              <p className="text-[#888888] text-xl font-medium">이재호</p>
            </li>
            <li className="flex flex-col text-center gap-6 flex-grow relative">
              <motion.button
                className="w-full overflow-hidden relative"
                whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
                transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
              >
                <img
                  src={profile2}
                  alt="두번째 프로필"
                  className="w-full h-auto"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <img
                  src={profileEdit}
                  alt="프로필 편집 아이콘"
                  className="absolute w-[25%] h-auto top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </motion.button>
              <p className="text-[#888888] text-xl font-medium">박세웅</p>
            </li>

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
            <li className="flex flex-col text-center gap-6 flex-grow relative">
<Link to="/user/profile">
              <motion.button
                className="bg-[#4e4e4e] w-full h-full p-[6.6rem] relative" // 버튼에 relative를 추가
                whileHover={{ y: -15 }}
                transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
              >
                <img
                  src={profilePlus}
                  alt="프로필 추가 아이콘"
                  className="absolute w-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // 이미지의 위치를 버튼 중앙으로 설정
                />
              </motion.button>
</Link>
              <p className="text-[#888888] text-xl font-medium">프로필 추가</p>
            </li>
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
