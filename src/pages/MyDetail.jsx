import Footer from "@/components/Footer";
import HeaderMain from "@/components/HeaderMain";
import useProfile from "@/store/useProfile";
import React from "react";

import pen from "@/assets/pen.svg";
import setting from "@/assets/setting.svg";

function MyDetail() {
  const { profileName, userProfileUrl } = useProfile();
  return (
    <div>
      <HeaderMain />
      <div className="flex items-start gap-10 bg-gray_01 px-14 py-16">
        <div className="flex-[0.1]">
          <img
            src={userProfileUrl}
            alt="유저 프로필 이미지"
            className="w-[140px] rounded"
          />
        </div>
        <div className="flex-[0.7] flex items-center gap-2">
          <span className="text-white text-3xl font-bold">{profileName}</span>
          <img src={pen} alt="프로필 이름 수정" className="brightness-75 hover:brightness-100 cursor-pointer"/>
          <button className="border border-gray_04 text-gray_07 text-sm px-2.5 py-1.5 rounded-sm hover:text-white hover:border-gray_05">프로필 전환</button>
        </div>
        <div className="flex-[0.2] flex items-center group cursor-pointer"> 
          <img src={setting} alt="회원정보 삭제" className="brightness-75 group-hover:brightness-100"/>
          <span className="text-white">회원정보 삭제</span>
        </div>
      </div>
      <div>

      </div>
      <Footer />
    </div>
  );
}

export default MyDetail;
