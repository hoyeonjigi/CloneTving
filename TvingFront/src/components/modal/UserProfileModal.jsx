import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation } from "swiper/modules";


import profile1 from "@/assets/profiles/profile1.png";
import profile2 from "@/assets/profiles/profile2.png";
import profile3 from "@/assets/profiles/profile3.png";
import profile4 from "@/assets/profiles/profile4.png";
import profile5 from "@/assets/profiles/profile5.png";
import profile6 from "@/assets/profiles/profile6.png";
import profile7 from "@/assets/profiles/profile7.png";
import profile8 from "@/assets/profiles/profile8.png";
import profile9 from "@/assets/profiles/profile9.png";
import profile10 from "@/assets/profiles/profile10.png";

import yumi1 from "@/assets/profiles/yumi/yumi_1.png";
import yumi2 from "@/assets/profiles/yumi/yumi_2.png";
import yumi3 from "@/assets/profiles/yumi/yumi_3.png";
import yumi4 from "@/assets/profiles/yumi/yumi_4.png";
import yumi5 from "@/assets/profiles/yumi/yumi_5.png";
import yumi6 from "@/assets/profiles/yumi/yumi_6.png";
import yumi7 from "@/assets/profiles/yumi/yumi_7.png";
import yumi8 from "@/assets/profiles/yumi/yumi_8.png";
import yumi9 from "@/assets/profiles/yumi/yumi_9.png";
import SwiperEX from "./SwiperEX";

function UserProfileModal({ isOpen, closeModal }) {
  if (!isOpen) {
    return null;
  }

  const baseProfiles = [
    { src: profile1, alt: "기본 프로필 1" },
    { src: profile2, alt: "기본 프로필 2" },
    { src: profile3, alt: "기본 프로필 3" },
    { src: profile4, alt: "기본 프로필 4" },
    { src: profile5, alt: "기본 프로필 5" },
    { src: profile6, alt: "기본 프로필 6" },
    { src: profile7, alt: "기본 프로필 7" },
    { src: profile8, alt: "기본 프로필 8" },
    { src: profile9, alt: "기본 프로필 9" },
    { src: profile10, alt: "기본 프로필 10" },
  ];

  const yumiProfiles = [
    { src: yumi1, alt: "유미의 세포들 프로필 1" },
    { src: yumi2, alt: "유미의 세포들 프로필 2" },
    { src: yumi3, alt: "유미의 세포들 프로필 3" },
    { src: yumi4, alt: "유미의 세포들 프로필 4" },
    { src: yumi5, alt: "유미의 세포들 프로필 5" },
    { src: yumi6, alt: "유미의 세포들 프로필 6" },
    { src: yumi7, alt: "유미의 세포들 프로필 7" },
    { src: yumi8, alt: "유미의 세포들 프로필 8" },
    { src: yumi9, alt: "유미의 세포들 프로필 9" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-gray_01 rounded-lg flex flex-col w-[60%] h-[90%] items-center">
        <span className="float-right cursor-pointer" onClick={closeModal}>
          &times;
        </span>


        <SwiperEX/>
        <h3 className="text-white text-3xl">이미지 선택</h3>
        <div>
          <div>
            <h4 className="text-white">기본 이미지</h4>
            <ul className="flex flex-row">
              <li>
                <img src={baseProfiles[0].src} alt={baseProfiles[0].alt} />
              </li>
              <li>
                <img src={baseProfiles[1].src} alt={baseProfiles[1].alt} />
              </li>
              <li>
                <img src={baseProfiles[2].src} alt={baseProfiles[2].alt} />
              </li>
              <li>
                <img src={baseProfiles[3].src} alt={baseProfiles[3].alt} />
              </li>
              <li>
                <img src={baseProfiles[4].src} alt={baseProfiles[4].alt} />
              </li>
              <li>
                <img src={baseProfiles[5].src} alt={baseProfiles[5].alt} />
              </li>
              <li>
                <img src={baseProfiles[6].src} alt={baseProfiles[6].alt} />
              </li>
              <li>
                <img src={baseProfiles[7].src} alt={baseProfiles[7].alt} />
              </li>
              <li>
                <img src={baseProfiles[8].src} alt={baseProfiles[8].alt} />
              </li>
              <li>
                <img src={baseProfiles[9].src} alt={baseProfiles[9].alt} />
              </li>
            </ul>
          </div>
          <div>
            <ul className="flex flex-row">
              <li>
                <img src={yumiProfiles[0].src} alt={yumiProfiles[0].alt} />
              </li>
              <li>
                <img src={yumiProfiles[1].src} alt={yumiProfiles[1].alt} />
              </li>
              <li>
                <img src={yumiProfiles[2].src} alt={yumiProfiles[2].alt} />
              </li>
              <li>
                <img src={yumiProfiles[3].src} alt={yumiProfiles[3].alt} />
              </li>
              <li>
                <img src={yumiProfiles[4].src} alt={yumiProfiles[4].alt} />
              </li>
              <li>
                <img src={yumiProfiles[5].src} alt={yumiProfiles[5].alt} />
              </li>
              <li>
                <img src={yumiProfiles[6].src} alt={yumiProfiles[6].alt} />
              </li>
              <li>
                <img src={yumiProfiles[7].src} alt={yumiProfiles[7].alt} />
              </li>
              <li>
                <img src={yumiProfiles[8].src} alt={yumiProfiles[8].alt} />
              </li>
            </ul>


            
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;
