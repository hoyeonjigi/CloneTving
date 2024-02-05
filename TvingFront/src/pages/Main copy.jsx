import React from "react";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeaderMain from "@/components/HeaderMain";

function Main() {
  return (
    <>
      <Helmet>
        <title>TvingFront - Main</title>
      </Helmet>
      <HeaderMain />
      <div className="bg-black font-noto -z-30">
        <section>
          <div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={15}
              slidesPerView={1.1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={false}
              centeredSlides={true}
              className="banner-custom-swiper"
            >
              <SwiperSlide>
                <div className="absolute bottom-11 left-11">
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/12/02/1701476976_2.png/dims/resize/F_webp,1024"
                    alt="undefined logo"
                    className="max-h-36 max-w-lg w-auto"
                  />
                  <div className="mt-5 font-normal leading-normal line-clamp-2">
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      지창욱 x 신혜선 로코 장인의
                    </p>
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      청정 짝꿍 로맨스
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/12/04/1701665874_1.jpg/dims/resize/F_webp,1920"
                    alt="웰컴투 삼달리"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="absolute bottom-11 left-11">
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/12/29/1703831601_2.png/dims/resize/F_webp,1024"
                    alt="undefined logo"
                    className="max-h-36 max-w-lg w-auto"
                  />
                  <div className="mt-5 font-normal leading-normal line-clamp-2">
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      박민영x나인우x이이경의
                    </p>
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      본격 운명 개척 드라마
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/12/29/1703831627_1.jpg/dims/resize/F_webp,1920"
                    alt="내 남편과 결혼해줘"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/10/30/1698659337_1.jpg/dims/resize/F_webp,1920"
                    alt="최강야구"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2024/01/05/1704446306_1.jpg/dims/resize/F_webp,1920"
                    alt="최강야구"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <section className="pt-5 relative">
          <div>
            <h3 className="text-white text-2xl font-bold ml-20 mb-2 lg:text-2xl leading-normal h-10 z-0">
              최신 영화
            </h3>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={5.1}
              slidesPerGroup={6}
              navigation
              pagination={{
                clickable: true,
              }}
              className="px-16 content-custom-swiper z-10"
            >
              <SwiperSlide className="inline-flex z-50 flex-col items-start cursor-pointer">
                <img
                  src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                  alt="웰컴투 삼달리"
                  className="flex flex-col justify-center items-center flex-shrink-0 rounded-md transition-transform ease-in-out hover:translate-y-[-20px]"
                />
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP0900/ko/20231204/0755/P001749878.jpg/dims/resize/F_webp,400"
                    alt="환승연애"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP0900/ko/20231220/0800/P001751031.jpg/dims/resize/F_webp,400"
                    alt="미스트롯3"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP0900/ko/20231228/0220/P001751353.jpg/dims/resize/F_webp,400"
                    alt="나나투어"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caim/CAIM1140/ko/20231218/0733/M000375033.jpg/dims/resize/F_webp,400"
                    alt="외계인1부4k"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="inline-flex flex-col items-start">
                  <img
                    src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                    alt="웰컴투 삼달리"
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        <section className=" pb-5 relative">
          <h3 className="text-white text-2xl font-bold ml-20 mb-2 lg:text-2xl leading-normal h-10">
            인기 컨텐츠
          </h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={8.3}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide className="ml-20">
              <div className="flex">
                <div className="items-end self-end z-[3]">
                  <h3 className="mr-[0.3rem] text-white text-8xl font-bold rotate-[6.3deg]">
                    1
                  </h3>
                </div>
                <img
                  src="https://image.tving.com/ntgs/contents/CTC/caim/CAIM2100/ko/20230131/M000371639.jpg/dims/resize/F_webp,400"
                  alt="탑건 : 매버릭 포스터"
                  className="top-0 left-0 w-[100%] h-[100%]"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </section>
      </div>
    </>
  );
}

export default Main;
