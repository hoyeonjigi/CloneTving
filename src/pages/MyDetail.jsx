import Footer from "@/components/Footer";
import HeaderMain from "@/components/HeaderMain";
import useProfile from "@/store/useProfile";
import React from "react";

import pen from "@/assets/pen.svg";
import setting from "@/assets/setting.svg";
import { Link } from "react-router-dom";

function MyDetail() {
  const { myProfileName, myProfileUrl, setMyChange } = useProfile();

  const handleMyChange = () => {
    setMyChange(true);
  };
  return (
    <div>
      <HeaderMain />
      <div className="flex items-start gap-10 bg-gray_01 px-14 py-16">
        <div className="flex-[0.1]">
          <img
            src={myProfileUrl}
            alt="유저 프로필 이미지"
            className="w-[140px] rounded"
          />
        </div>
        <div className="flex-[0.7] flex items-center gap-2">
          <span className="text-white text-3xl font-bold">{myProfileName}</span>
          <Link to="/user/profileForEdit">
            <img
              src={pen}
              alt="프로필 이름 수정"
              className="brightness-75 hover:brightness-100 cursor-pointer"
              onClick={handleMyChange}
            />
          </Link>
          <Link to="/user/profiles">
            <button className="border border-gray_04 text-gray_07 text-sm px-2.5 py-1.5 rounded-sm hover:text-white hover:border-gray_05">
              프로필 전환
            </button>
          </Link>
        </div>
        <div className="flex-[0.2] flex items-center group cursor-pointer">
          <img
            src={setting}
            alt="회원정보 삭제"
            className="brightness-75 group-hover:brightness-100"
          />
          <span className="text-white">회원정보 삭제</span>
        </div>
      </div>
      <div></div>
      <Footer />
    </div>
  );
}

export default MyDetail;
