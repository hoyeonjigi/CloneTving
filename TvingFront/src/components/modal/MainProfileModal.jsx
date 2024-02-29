import profile from "@/assets/profiles/profile_s1.webp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LogoutButton from "./LogoutModal";

function MainProfileModal() {
  return (
    <motion.div
      className="absolute w-72 bg-[#212121] border border-[#4d4d4d] rounded-sm right-0 top-10 z-50"
      initial={{ y: -10, opacity: 0 }} // 처음에는 아래에 있고 투명하게
      animate={{ y: 0, opacity: 1 }} // 애니메이션 후에는 원래 위치에 불투명하게
      transition={{ duration: 0.2 }} // 0.2초 동안 애니메이션
    >
      <div className="flex flex-row p-5">
        <div>
          <img src={profile} alt="유저 프로필 이미지" className="w-12" />
        </div>
        <div className="text-[#a3a3a3] ml-4 font-medium">
          <p className="text-white text-lg">이재호</p>
          <button>
            <Link to="/user/profiles">
              <span className="hover:text-[#d9d9d9] text-sm">프로필 전환</span>
            </Link>
          </button>
        </div>
      </div>
      <hr className="border border-gray_03 mb-4" />
      <ul className="text-[#a3a3a3] font-medium text-lg mb-4">
        <Link to="/main">
          <li className="hover:text-white hover:bg-gray_03 px-6 py-1.5">MY</li>
        </Link>

        <Link to="/main">
          <li className="hover:text-white hover:bg-gray_03 px-6 py-1.5">
            <a href="/main">이용권</a>
          </li>
        </Link>
        <Link to="/main">
          <li className="hover:text-white hover:bg-gray_03 px-6 py-1.5">
            <a href="/main">쿠폰등록</a>
          </li>
        </Link>
        <Link to="/main">
          <li className="hover:text-white hover:bg-gray_03 px-6 py-1.5">
            <a href="/main">고객센터</a>
          </li>
        </Link>
        <Link to="/main">
          <li className="hover:text-white hover:bg-gray_03 px-6 py-1.5">
            {/* <a href="/main">로그아웃</a> */}
            <LogoutButton/>
          </li>
        </Link>
      </ul>
    </motion.div>
  );
}

export default MainProfileModal;
