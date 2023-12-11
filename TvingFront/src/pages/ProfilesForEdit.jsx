import Footer from "@/components/Footer";
import Header from "@/components/Header";
import profile1 from "@/assets/profiles/profile1.png";
import profile2 from "@/assets/profiles/profile2.png";
import profilePlus from "@/assets/profiles/icon-plus.png";
import profileEdit from "@/assets/profiles/icon-edit.svg";
import { Link } from "react-router-dom";

function ProfilesForEdit() {
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
              <button className="w-full overflow-hidden relative">
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
              </button>
              <p className="text-[#888888] text-xl font-medium">이재호</p>
            </li>
            <li className="flex flex-col text-center gap-6 flex-grow relative">
              <button className="w-full overflow-hidden relative">
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
        <div className="mt-16 mb-24">
          <Link to="/profiles">
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
