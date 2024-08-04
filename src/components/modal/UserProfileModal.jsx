import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getData } from "@/utils/crud";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import "swiper/css";
import "swiper/css/navigation";
import useCreate from "@/store/useCreate";

// import required modules
import { Navigation } from "swiper/modules";

import close from "@/assets/profiles/icon_x.svg";
import right from "@/assets/profiles/icon-right.svg";
import left from "@/assets/profiles/icon-left.svg";

function UserProfileModal({ isOpen, closeModal }) {
  // const [profileImages, setProfileImages] = useState([]);
  // const [baseProfileImages, setBaseProfileImages] = useState([]);
  // const [yumiProfileImages, setYumiProfileImages] = useState([]);
  const {
    selectedImageId,
    baseProfileImages,
    yumiProfileImages,

    setSelectedImageName,
    setSelectedImageUrl,
    setIsImageSelected,
    setSelectedImageId,
  } = useCreate();

  const [baseSlideIndex, setBaseSlideIndex] = useState(0);
  const [yumiSlideIndex, setYumiSlideIndex] = useState(0);

  // // 프로필 이미지 카테고리별 정렬
  // const getProfileImage = () => {
  // 	setProfileImages(
  // 		profileData.map((item) => ({
  // 			profileImageId: item.profileImageId,
  // 			profileImageName: item.profileImageName,
  // 			image_url: `https://hoyeonjigi.s3.ap-northeast-2.amazonaws.com${item.image_url}`,
  // 			category: item.category,
  // 			alt: `프로필 이미지`,
  // 		}))
  // 	);

  // 	setBaseProfileImages(
  // 		profileImages.filter((item) => item.profileImageId <= 10)
  // 	);
  // 	setYumiProfileImages(
  // 		profileImages.filter((item) => item.profileImageId > 10)
  // 	);
  // };

  // 이미지 클릭 시
  const handleImageClick = (
    clickedImageName,
    clickedImageUrl,
    clickedImageId
  ) => {
    setSelectedImageName(clickedImageName);
    setSelectedImageUrl(clickedImageUrl);
    setSelectedImageId(clickedImageId);
    setIsImageSelected(true);
    closeModal();
  };

  // useEffect(() => {
  // 	getProfileImage();
  // }, []);

  if (!isOpen) {
    return null;
  }

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
                  setBaseSlideIndex(baseProfileImages.length - 1);
                } else {
                  setBaseSlideIndex(swiper.realIndex);
                }
              }}
            >
              {baseProfileImages.map((profile, index) => (
                <SwiperSlide key={index}>
                  <motion.img
                    src={profile.image_url}
                    alt={profile.alt}
                    whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
                    transition={{
                      type: "tween",
                      stiffness: 300,
                      duration: 0.2,
                    }}
                    className="mt-4 rounded-sm"
                    onClick={() =>
                      handleImageClick(
                        profile.profileImageName,
                        profile.image_url,
                        profile.profileImageId
                      )
                    }
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
                baseSlideIndex === baseProfileImages.length - 1
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
                  setYumiSlideIndex(yumiProfileImages.length - 1);
                } else {
                  setYumiSlideIndex(swiper.realIndex);
                }
              }}
            >
              {yumiProfileImages.map((profile, index) => (
                <SwiperSlide key={index}>
                  <motion.img
                    src={profile.image_url}
                    alt={profile.alt}
                    whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
                    transition={{
                      type: "tween",
                      stiffness: 300,
                      duration: 0.2,
                    }}
                    className="mt-4 rounded-sm"
                    onClick={() =>
                      handleImageClick(
                        profile.profileImageName,
                        profile.image_url,
                        profile.profileImageId
                      )
                    }
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
                yumiSlideIndex === yumiProfileImages.length - 1
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
