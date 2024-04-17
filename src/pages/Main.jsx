import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeaderMain from "@/components/HeaderMain";
import left from "@/assets/navigation/icon_slide_left.svg";
import right from "@/assets/navigation/icon_slide_right.svg";

import { getData, patchData, postData } from "@/utils/crud";
import useLogin from "@/store/login";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
// import useContent from "@/store/useContent";

import { useLocation } from "react-router-dom";
import useContents from "@/store/useContent";
import useReviews from "@/store/useReviews";

function Main() {
  const location = useLocation();

  const [latestFilm, setLatestFilm] = useState([]);
  const [latestDrama, setLatestDrama] = useState([]);
  const [comedyDrama, setComedyDrama] = useState([]);
  const [romanceFilm, setRomanceFilm] = useState([]);
  const [popularContent, setPopularContent] = useState([]);

  //swiper navigation 버튼 제어 상태
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // const { setContent } = useContent();
  const { setContent } = useContents();
  const { reset, isReview, setIsReview } = useReviews();

  const { accessToken, reToken, grantType, setAccessToken, setReToken } =
    useLogin();

  const refresh = async () => {
    const reUrl = `https://hoyeonjigi.site/user/refresh`;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Token": `${Cookies.get("accessToken")}`,
      "Refresh-Token": `${Cookies.get("refreshToken")}`,
    };

    const body = {};

    const response = await postData(reUrl, body, headers);

    // console.log(response);
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

    localStorage.removeItem("isDataLoaded");
    // 페이지 새로고침이나 필요한 추가 로직을 여기에 구현할 수 있습니다.
    // window.location.reload(); // 예시로 페이지를 새로고침하는 코드를 추가했습니다.

    // if (response.success) {
    //
    // } else {
    //   console.log(response.message);
    // }
  };
  const testMe = async () => {
    const url = `https://hoyeonjigi.site/content/1001835/view/count`;
    const type = Cookies.get("grantType");
    const token = Cookies.get("accessToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `${type} ${token}`,
    };

    const body = {};
    const response = await patchData(url, body, headers);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isDataLoaded = localStorage.getItem("isDataLoaded");

        localStorage.removeItem("contents");
        useReviews.persist.clearStorage();
        localStorage.removeItem("reviews");
        // setIsReview(false);
        // reset();

        // 데이터가 이미 로드되었다면, 함수를 종료하여 추가 로드를 방지
        if (isDataLoaded) return;

        const type = Cookies.get("grantType");
        const token = Cookies.get("accessToken");

        const headers = {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `${type} ${token}`,
        };

        //최신 영화
        const movieQuery = "영화";
        const encodedQueryMovie = encodeURIComponent(movieQuery);
        const movieUrl = `https://hoyeonjigi.site/content/${encodedQueryMovie}/lastest20`;

        const resultMovie = await getData(movieUrl, headers);
        // console.log(resultMovie);

        const latestFilmData = resultMovie.map((item) => ({
          contentId: item.contentId,
          contentTitle: item.contentTitle,
          contentOverview: item.contentOverview,
          genreIds: item.genreIds,
          src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
          alt: item.contentTitle,
        }));

        localStorage.setItem("latestFilm", JSON.stringify(latestFilmData));
        setLatestFilm(latestFilmData);

        // console.log(latestFilmData);

        //최신 드라마
        const dramaQuery = "드라마";
        const encodedQueryDrama = encodeURIComponent(dramaQuery);
        const dramaUrl = `https://hoyeonjigi.site/content/${encodedQueryDrama}/lastest20`;

        const resultDrama = await getData(dramaUrl, headers);

        const latestDramaData = resultDrama.map((item) => ({
          contentId: item.contentId,
          contentTitle: item.contentTitle,
          contentOverview: item.contentOverview,
          genreIds: item.genreIds,

          src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
          alt: item.contentTitle,
        }));
        localStorage.setItem("latestDrama", JSON.stringify(latestDramaData));
        setLatestDrama(latestDramaData);

        //코미디 드라마

        const comedyQuery = "코미디";
        const encodedQueryComedy = encodeURIComponent(comedyQuery);
        const comedyUrl = `https://hoyeonjigi.site/content/${encodedQueryDrama}/${encodedQueryComedy}`;

        const resultComedy = await getData(comedyUrl, headers);

        const comedyDramaData = resultComedy.map((item) => ({
          contentId: item.contentId,
          contentTitle: item.contentTitle,
          contentOverview: item.contentOverview,
          genreIds: item.genreIds,
          src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
          alt: item.contentTitle,
        }));
        localStorage.setItem("comedyDrama", JSON.stringify(comedyDramaData));
        setComedyDrama(comedyDramaData);

        //로맨스 영화

        const romanceQuery = "로맨스";
        const encodedQueryRomance = encodeURIComponent(romanceQuery);
        const romanceUrl = `https://hoyeonjigi.site/content/${encodedQueryMovie}/${encodedQueryRomance}`;

        const resultRomance = await getData(romanceUrl, headers);

        const romanceFilmData = resultRomance.map((item) => ({
          contentId: item.contentId,
          contentTitle: item.contentTitle,
          contentOverview: item.contentOverview,
          genreIds: item.genreIds,
          src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
          alt: item.contentTitle,
        }));

        localStorage.setItem("romanceFilm", JSON.stringify(romanceFilmData));
        setRomanceFilm(romanceFilmData);

        //인기 컨텐츠

        const popularUrl = `https://hoyeonjigi.site/content/${encodedQueryMovie}/popular`;

        const resultPopular = await getData(popularUrl, headers);

        const popularData = resultPopular.map((item) => ({
          contentId: item.contentId,
          contentTitle: item.contentTitle,
          contentOverview: item.contentOverview,
          genreIds: item.genreIds,
          src: `https://image.tmdb.org/t/p/original/${item.contentImage}`,
          alt: item.contentTitle,
        }));

        localStorage.setItem("popularContent", JSON.stringify(popularData));
        setPopularContent(popularData);

        localStorage.setItem("isDataLoaded", "true");
      } catch (error) {
        console.log(error);
        console.log("에러출력");
        localStorage.removeItem("isDataLoaded");
        refresh();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedLatestFlim = localStorage.getItem("latestFilm");
    // console.log(storedContents);
    if (storedLatestFlim) {
      setLatestFilm(JSON.parse(storedLatestFlim));
    }
    const storedLatestDrama = localStorage.getItem("latestDrama");
    // console.log(storedGenres);
    if (storedLatestDrama) {
      setLatestDrama(JSON.parse(storedLatestDrama));
    }

    const storedComedyDrama = localStorage.getItem("comedyDrama");
    // console.log(storedReviews);
    if (storedComedyDrama) {
      setComedyDrama(JSON.parse(storedComedyDrama));
    }

    const storedRomanceFilm = localStorage.getItem("romanceFilm");
    // console.log(storedReviews);
    if (storedRomanceFilm) {
      setRomanceFilm(JSON.parse(storedRomanceFilm));
    }

    const storedPopularContent = localStorage.getItem("popularContent");
    // console.log(storedReviews);
    if (storedPopularContent) {
      setPopularContent(JSON.parse(storedPopularContent));
    }
  }, []);

  useEffect(() => {
    // 페이지 경로가 /home과 일치할 때만 isDataLoaded 삭제
    if (
      location.pathname === "/" ||
      location.pathname === "/signin" ||
      location.pathname === "/signup" ||
      location.pathname === "/FindID" ||
      location.pathname === "/FindPassword"
    ) {
      localStorage.removeItem("isDataLoaded");
    }
  }, [location]); // location 객체가 변경될 때마다 useEffect 훅이 실행됩니다.

  return (
    <>
      <Helmet>
        <title>TvingFront - Main</title>
      </Helmet>
      <HeaderMain />
      <div className="bg-black font-noto">
        <section>
          <div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1.1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생이 계속되도록 합니다.
                pauseOnMouseEnter: true, // 마우스 오버 시 자동 재생을 멈춥니다.
              }}
              loop={false}
              centeredSlides={true}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="banner-custom-swiper h-[50%]"
            >
              <SwiperSlide>
                <div className="absolute bottom-11 left-11">
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2024/02/22/1708571068_2.png/dims/resize/F_webp,1024"
                    alt="아이 러브 유 로고"
                    className="max-h-32 max-w-lg w-auto"
                  />
                  <div className="mt-5 font-normal leading-normal line-clamp-2">
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      채종협 주연,
                    </p>
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      화제의 일본 판타지 드라마
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2024/02/22/1708530936_1.jpg/dims/resize/F_webp,1920"
                    alt="아이 러브 유 바로가기 이미지"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="mr-10">
                <div className="absolute bottom-11 left-11">
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/10/26/1698311755_1.png/dims/resize/F_webp,1024"
                    alt="나는 솔로 로고"
                    className="max-h-36 max-w-lg w-auto"
                  />
                  <div className="mt-5 font-normal leading-normal line-clamp-2">
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      결혼을 원하는 솔로 남녀들의
                    </p>
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      극사실주의 데이팅 프로그램
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/10/30/1698659978_1.jpg/dims/resize/F_webp,1920"
                    alt="나는 솔로 바로가기 이미지"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="mr-10">
                <div className="absolute bottom-11 left-11">
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/11/09/1699525403_1.png/dims/resize/F_webp,1024"
                    alt="유퀴즈 로고"
                    className="max-h-36 max-w-lg w-auto"
                  />
                  <div className="mt-5 font-normal leading-normal line-clamp-2">
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      배우에서 화가로 돌아온 박신양과
                    </p>
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      강지영 앵커의 유퀴즈
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2023/11/08/1699402804_1.jpg/dims/resize/F_webp,1920"
                    alt="유퀴즈 바로가기 이미지"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="mr-10">
                <div className="absolute bottom-11 left-11">
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2024/02/21/1708480133_2.png/dims/resize/F_webp,1024"
                    alt="사채소년 로고"
                    className="max-h-36 max-w-lg w-auto"
                  />
                  <div className="mt-5 font-normal leading-normal line-clamp-2">
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      최신 영화 업데이트
                    </p>
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      학교 서열 최하위, 고교사채왕이 되다
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2024/02/21/1708480155_1.jpg/dims/resize/F_webp,1920"
                    alt="사채소년 바로가기 이미지"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="mr-10">
                <div className="absolute bottom-11 left-11">
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2024/02/14/1707897089_2.png/dims/resize/F_webp,1024"
                    alt="끝내주는 해결사 로고"
                    className="max-h-36 max-w-lg w-auto"
                  />
                  <div className="mt-5 font-normal leading-normal line-clamp-2">
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      이혼 해결사 이지아x변호사 강기영의
                    </p>
                    <p className="text-[#fff] w-[32rem] text-2xl font-medium">
                      원스톱 이혼 성사, 정의 구현 드라마
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="https://image.tving.com/ntgs/operation/banner/2024/02/14/1707897114_1.jpg/dims/resize/F_webp,1920"
                    alt="끝내주는 해결사 바로가기 이미지"
                    className="rounded-lg"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <section className="pt-5 mt-10">
          <h3 className="text-white text-2.5xl font-bold ml-16">최신 영화</h3>
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={7.1}
              slidesPerGroup={7}
              navigation
              pagination={{
                clickable: true,
              }}
              className="px-16 content-custom-swiper z-10"
            >
              {latestFilm.map((film, index) => (
                <SwiperSlide
                  key={index}
                  className="inline-flex z-50 flex-col items-start cursor-pointer"
                >
                  <Link
                    to={{
                      pathname: `/main/detail/${film.contentId}`, // 절대 경로를 사용합니다.
                    }}
                    onClick={() => {
                      setContent(film);
                      // testMe();/
                    }}
                  >
                    <motion.img
                      src={film.src}
                      alt={film.alt}
                      whileHover={{ y: -10 }} // 마우스 호버 시 y축으로 -10 이동
                      transition={{
                        type: "tween",
                        // stiffness: 300,
                        duration: 0.3,
                      }}
                      className="mt-4 rounded-md"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <button
              className={`custom-prev-button absolute left-0 top-0 h-full ${
                isBeginning ? "hidden" : ""
              }`}
              style={{
                backgroundImage: `radial-gradient(106.88% 50.3% at -6.88% 50%, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 53.21%, rgba(0, 0, 0, 0) 100%)`,
                cursor: "pointer",
              }}
            >
              <img
                src={left}
                alt="메인 컨텐츠 왼쪽으로 넘기기"
                className="w-16"
              />
            </button>
            <button
              className={`custom-next-button absolute right-0 top-0 h-full ${
                isEnd ? "hidden" : ""
              }`}
              style={{
                backgroundImage: `radial-gradient(106.25% 50% at 106.25% 50%, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 52.6%, rgba(0, 0, 0, 0) 100%)`,

                cursor: "pointer",
              }}
            >
              <img
                src={right}
                alt="메인 컨텐츠 오른쪽으로 넘기기"
                className="w-16"
              />
            </button> */}
          </div>
        </section>

        <section className="pt-5 relative mt-10">
          <div>
            <h3 className="text-white text-2.5xl font-bold ml-16">
              최신 드라마
            </h3>
            <Swiper
              modules={[Navigation]}
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
                {latestDrama.map((drama, index) => (
                  <SwiperSlide
                    key={index}
                    className="inline-flex z-50 flex-col items-start cursor-pointer"
                  >
                    <Link
                      to={{
                        pathname: `/main/detail/${drama.contentId}`, // 절대 경로를 사용합니다.
                      }}
                      onClick={() => {
                        setContent(drama);
                      }}
                    >
                      <motion.img
                        src={drama.src}
                        alt={drama.alt}
                        whileHover={{ y: -10 }} // 마우스 호버 시 y축으로 -10 이동
                        transition={{
                          type: "tween",
                          stiffness: 300,
                          duration: 0.3,
                        }}
                        className="mt-4 rounded-md"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </section>
            </Swiper>
          </div>
        </section>
        <section className="pt-5 relative mt-10">
          <div>
            <h3 className="text-white text-2.5xl font-bold ml-16">
              코미디 드라마
            </h3>
            <Swiper
              modules={[Navigation]}
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
                {comedyDrama.map((drama, index) => (
                  <SwiperSlide
                    key={index}
                    className="inline-flex z-50 flex-col items-start cursor-pointer"
                  >
                    <Link
                      to={{
                        pathname: `/main/detail/${drama.contentId}`, // 절대 경로를 사용합니다.
                      }}
                      onClick={() => {
                        setContent(drama);
                      }}
                    >
                      <motion.img
                        src={drama.src}
                        alt={drama.alt}
                        whileHover={{ y: -10 }} // 마우스 호버 시 y축으로 -10 이동
                        transition={{
                          type: "tween",
                          stiffness: 300,
                          duration: 0.3,
                        }}
                        className="mt-4 rounded-md"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </section>
            </Swiper>
          </div>
        </section>
        <section className="pt-5 relative mt-10">
          <div>
            <h3 className="text-white text-2.5xl font-bold ml-16">
              로맨스 영화
            </h3>
            <Swiper
              modules={[Navigation]}
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
                {romanceFilm.map((film, index) => (
                  <SwiperSlide
                    key={index}
                    className="inline-flex z-50 flex-col items-start cursor-pointer"
                  >
                    <Link
                      to={{
                        pathname: `/main/detail/${film.contentId}`, // 절대 경로를 사용합니다.
                      }}
                      onClick={() => {
                        setContent(film);
                      }}
                    >
                      <motion.img
                        src={film.src}
                        alt={film.alt}
                        whileHover={{ y: -10 }} // 마우스 호버 시 y축으로 -10 이동
                        transition={{
                          type: "tween",
                          stiffness: 300,
                          duration: 0.3,
                        }}
                        className="mt-4 rounded-md"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </section>
            </Swiper>
          </div>
        </section>
        <section className="pt-5 relative mt-10">
          <div>
            <h3 className="text-white text-2.5xl font-bold ml-16">
              인기 컨텐츠
            </h3>
            <Swiper
              modules={[Navigation]}
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
                {popularContent.map((film, index) => (
                  <SwiperSlide
                    key={index}
                    className="inline-flex z-50 flex-col items-start cursor-pointer"
                  >
                    <Link
                      to={{
                        pathname: `/main/detail/${film.contentId}`, // 절대 경로를 사용합니다.
                      }}
                      onClick={() => {
                        setContent(film);
                      }}
                    >
                      <motion.img
                        src={film.src}
                        alt={film.alt}
                        whileHover={{ y: -10 }} // 마우스 호버 시 y축으로 -10 이동
                        transition={{
                          type: "tween",
                          stiffness: 300,
                          duration: 0.3,
                        }}
                        className="mt-4 rounded-md"
                      />
                    </Link>

                    {/* <img
                      src={film.src}
                      alt={film.alt}
                      className="flex flex-col justify-center items-center flex-shrink-0 rounded-md transition-transform ease-in-out hover:translate-y-[-20px]"
                    /> */}
                  </SwiperSlide>
                ))}
              </section>
            </Swiper>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Main;
