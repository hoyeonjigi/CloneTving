import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { motion } from "framer-motion";

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

import close from "@/assets/profiles/icon_x.svg";
import right from "@/assets/profiles/icon-right.svg";
import left from "@/assets/profiles/icon-left.svg";

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

  const [baseSlideIndex, setBaseSlideIndex] = useState(0);
  const [yumiSlideIndex, setYumiSlideIndex] = useState(0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-gray_01 rounded-lg flex flex-col w-[60%] h-[93%] items-center relative">
        <button onClick={closeModal} className="absolute right-1">
          <img src={close} alt="" className="w-16" />
        </button>

        <h3 className="text-white text-3xl mt-16 mb-10">이미지 선택</h3>

        <div className="mx-16 w-full">
          <div className="relative px-[4.5rem]">
            <h4 className="text-white text-1.5xl">기본 이미지</h4>
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              navigation={{
                nextEl: ".swiper-button-next-base",
                prevEl: ".swiper-button-prev-base",
              }}
              modules={[Navigation]}
              slidesPerGroup={1}
              onSlideChange={(swiper) => {
                if (swiper.isEnd) {
                  setBaseSlideIndex(baseProfiles.length - 1);
                } else {
                  setBaseSlideIndex(swiper.realIndex);
                }
              }}
            >
              {baseProfiles.map((profile, index) => (
                <SwiperSlide key={index}>
                  <motion.img
                    src={profile.src}
                    alt={profile.alt}
                    whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
                    transition={{
                      type: "tween",
                      stiffness: 300,
                      duration: 0.2,
                    }}
                    className="mt-4 rounded-sm"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`swiper-button-prev-base ${
                baseSlideIndex === 0 ? "opacity-30" : "opacity-100"
              }`}
            >
              <img
                src={left}
                alt=""
                className=" absolute top-[55%] left-3 transform -translate-y-1/2 w-[7%]"
              />
            </button>
            <button
              className={`swiper-button-next-base ${
                baseSlideIndex === baseProfiles.length - 1
                  ? "opacity-30"
                  : "opacity-100"
              }`}
            >
              <img
                src={right}
                alt=""
                className=" absolute top-[55%] right-3 transform -translate-y-1/2 w-[7%]"
              />
            </button>
          </div>

          <div className="relative mt-10 px-[4.5rem]">
            <h4 className="text-white text-1.5xl">유미의 세포들 이미지</h4>
            <Swiper
              spaceBetween={10}
              slidesPerView={5}
              navigation={{
                nextEl: ".swiper-button-next-yumi",
                prevEl: ".swiper-button-prev-yumi",
              }}
              modules={[Navigation]}
              slidesPerGroup={1}
              onSlideChange={(swiper) => {
                if (swiper.isEnd) {
                  setYumiSlideIndex(yumiProfiles.length - 1);
                } else {
                  setYumiSlideIndex(swiper.realIndex);
                }
              }}
            >
              {yumiProfiles.map((profile, index) => (
                <SwiperSlide key={index}>
                  <motion.img
                    src={profile.src}
                    alt={profile.alt}
                    whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
                    transition={{
                      type: "tween",
                      stiffness: 300,
                      duration: 0.2,
                    }}
                    className="mt-4 rounded-sm"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`swiper-button-prev-yumi ${
                yumiSlideIndex === 0 ? "opacity-30" : "opacity-100"
              }`}
            >
              <img
                src={left}
                alt=""
                className=" absolute top-[55%] left-3 transform -translate-y-1/2 w-[7%]"
              />
            </button>
            <button
              className={`swiper-button-next-yumi ${
                yumiSlideIndex === yumiProfiles.length - 1
                  ? "opacity-30"
                  : "opacity-100"
              }`}
            >
              <img
                src={right}
                alt=""
                className=" absolute top-[55%] right-3 transform -translate-y-1/2 w-[7%]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileModal;
