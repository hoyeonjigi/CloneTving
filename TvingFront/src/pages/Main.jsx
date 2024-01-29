import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeaderMain from "@/components/HeaderMain";

import { getData } from "@/utils/crud";

function Main() {
  const [data, setData] = useState(null);
  const [latestFilm, setLatestFilm] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const baseUrl =
        "https://hoyeonjigi.site/api/release-date/classification=";
      const query = "영화";
      const encodedQuery = encodeURIComponent(query);
      const url = `${baseUrl}${encodedQuery}`;

      console.log(url);

      const type = localStorage.getItem("grantType");
      const token = localStorage.getItem("accessToken");

      console.log(type);
      console.log(token);

      console.log(`${type} ${token}`);

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `${type} ${token}`,
      };
      const result = await getData(url, headers);

      console.log(result[0].contentImage);
      console.log(result[0].contentTitle);
      setData(result);

      const latestFilmData = result.map((item) => ({
        src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
        alt: item.contentTitle,
      }));
      setLatestFilm(latestFilmData);
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
