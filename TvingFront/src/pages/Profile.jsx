import Footer from "@/components/Footer";
import Header from "@/components/Header";
import profile1 from "@/assets/profiles/profile1.png";
import profile2 from "@/assets/profiles/profile2.png";
import profilePlus from "@/assets/profiles/icon-plus.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate(); // useNavigate hook을 통해 navigate 함수를 가져옴

  const handleProfileAdd = () => {
    navigate("/user/profile"); // 프로필 추가 버튼을 눌렀을 때 '/profilesForEdit'로 이동
  };
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
            <li className="flex flex-col text-center gap-6 flex-grow">
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
            </li>

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
              <p className="text-[#888888] text-xl font-medium">프로필 추가</p>
            </li>
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
