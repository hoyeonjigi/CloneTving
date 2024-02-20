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
import Cookies from "js-cookie";

function Main() {
  const [data, setData] = useState(null);
  const [latestFilm, setLatestFilm] = useState([]);

  const { accessToken, reToken, grantType, setAccessToken, setReToken } =
    useLogin();

  const refresh = async () => {
    const reUrl = `http://hoyeonjigi.site/user/refresh`;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Token": `${Cookies.get("accessToken")}`,
      "Refresh-Token": `${Cookies.get("refreshToken")}`,
    };

    const body = {};

    const response = await postData(reUrl, body, headers);

    if (response.success) {
      Cookies.set("accessToken", response.accessToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", response.refreshToken, {
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("grantType", response.grantType, {
        secure: true,
        sameSite: "strict",
      });
    } else {
      console.log(response.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = Cookies.get("grantType");
        const token = Cookies.get("accessToken");

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `${type} ${token}`,
        };

        //최신 영화
        const recentUrl =
          "https://hoyeonjigi.site/api/release-date/classification=";
        const movieQuery = "영화";
        const encodedQuery = encodeURIComponent(movieQuery);
        const movieUrl = `${recentUrl}${encodedQuery}`;

        const result = await getData(movieUrl, headers);

        setData(result);

        const latestFilmData = result.map((item) => ({
          src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
          alt: item.contentTitle,
        }));
        setLatestFilm(latestFilmData);

        //최신 드라마

        //로맨스 드라마

        //스릴러 영화

        //인기 컨텐츠
      } catch (error) {
        refresh();
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
              slidesPerView={7.1}
              slidesPerGroup={7}
              navigation
              pagination={{
                clickable: true,
              }}
              className="px-16 content-custom-swiper z-10"
            >
              <section>
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
              </section>
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
              slidesPerView={7.1}
              slidesPerGroup={7}
              navigation
              pagination={{
                clickable: true,
              }}
              className="px-16 content-custom-swiper z-10"
            >
              <section>
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
              </section>
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
              slidesPerView={7.1}
              slidesPerGroup={7}
              navigation
              pagination={{
                clickable: true,
              }}
              className="px-16 content-custom-swiper z-10"
            >
              <section>
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
              </section>
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
              slidesPerView={7.1}
              slidesPerGroup={7}
              navigation
              pagination={{
                clickable: true,
              }}
              className="px-16 content-custom-swiper z-10"
            >
              <section>
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
              </section>
            </Swiper>
          </div>
        </section>
      </div>
    </>
  );
}

export default Main;
