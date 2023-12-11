import Footer from "@/components/Footer";
import Header from "@/components/Header";
import profile1 from "@/assets/profiles/profile1.png";
import profile2 from "@/assets/profiles/profile2.png";
import profilePlus from "@/assets/profiles/icon-plus.png";
import { Link } from "react-router-dom";

function Profile() {
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
              <button className="w-full">
                <img
                  src={profile1}
                  alt="첫번째 프로필"
                  className="w-full h-auto"
                />
              </button>
              <p className="text-[#888888] text-xl font-medium">이재호</p>
            </li>
            <li className="flex flex-col text-center gap-6 flex-grow">
              <button className="w-full">
                <img
                  src={profile2}
                  alt="두번째 프로필"
                  className="w-full h-auto"
                />
              </button>
              <p className="text-[#888888] text-xl font-medium">박세웅</p>
            </li>

            <li className="flex flex-col text-center gap-6 flex-grow relative">
              <button className="bg-[#4e4e4e] w-full h-full p-[6.6rem]">
                <img
                  src={profilePlus}
                  alt="프로필 추가 아이콘"
                  className="absolute w-[35%] h-auto top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </button>
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
