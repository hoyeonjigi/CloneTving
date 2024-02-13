import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeaderMain from "@/components/HeaderMain";

import { getData, postData } from "@/utils/crud";
import useLogin from "@/store/login";

function Main() {
  const [data, setData] = useState(null);
  const [latestFilm, setLatestFilm] = useState([]);

  const { accessToken, reToken, grantType, setAccessToken, setReToken } =
    useLogin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl =
          "https://hoyeonjigi.site/api/release-date/classification=";
        const query = "영화";
        const encodedQuery = encodeURIComponent(query);
        const url = `${baseUrl}${encodedQuery}`;

        const type = grantType;
        const token = accessToken;

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `${type} ${token}`,
        };
        const result = await getData(url, headers);

        setData(result);

        const latestFilmData = result.map((item) => ({
          src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
          alt: item.contentTitle,
        }));
        setLatestFilm(latestFilmData);
      } catch (error) {
        const reUrl = `http://hoyeonjigi.site/user/refresh`;

        console.log(reUrl);

        console.log(grantType)
        console.log(accessToken)
        console.log(reToken)
        // const data = {
        //   `grantType: ${grantType}`
        //   accessToken,
        //   reToken,
        // };

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        };

        const response = await postData(reUrl, data, headers);

        console.log(response);
        // console.log(error);
        // if (error.response && error.response.data === 'Access token expired') {
        //   console.log('Access token expired, refreshing...');
        //   const newToken = await refreshAccessToken(reToken);
        //   if (newToken) {
        //     setAccessToken(newToken);
        //     // 토큰을 새로 받아온 후 다시 요청을 시도합니다.
        //     const result = await getData(url, headers);
        //     // 이전 코드는 생략했습니다.
        //   } else {
        //     console.error('Failed to refresh token');
        //   }
        // } else {
        //   console.error(error);
        // }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>TvingFront - Main</title>
      </Helmet>
      <HeaderMain />
      <div className="bg-black font-noto -z-30">
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
              {/* <SwiperSlide className="inline-flex z-50 flex-col items-start cursor-pointer">
                <img
                  src="https://image.tving.com/ntgs/contents/CTC/caip/CAIP1190/ko/20231213/0619/P001749248.jpg/dims/resize/F_webp,400"
                  alt="웰컴투 삼달리"
                  className="flex flex-col justify-center items-center flex-shrink-0 rounded-md transition-transform ease-in-out hover:translate-y-[-20px]"
                />
              </SwiperSlide> */}
              {latestFilm.map((film, index) => (
                <SwiperSlide
                  key={index}
                  className="inline-flex z-50 flex-col items-start cursor-pointer"
                >
                  <img
                    src={film.src}
                    alt={film.alt}
                    className="flex flex-col justify-center items-center flex-shrink-0 rounded-md transition-transform ease-in-out hover:translate-y-[-20px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    </>
  );
}

export default Main;
