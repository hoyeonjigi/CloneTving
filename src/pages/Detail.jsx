import Footer from "@/components/Footer";
import HeaderMain from "@/components/HeaderMain";
import { useState } from "react";
import ReviewModal from "@/components/modal/ReviewModal";
// import useContent from "@/store/useContent";
import { useEffect, useRef, React } from "react";
import { getData, postData } from "@/utils/crud";
import Cookies from "js-cookie";
// import useReview from "@/store/useReviews";
import useContents from "@/store/useContent";
import useReviews from "@/store/useReviews";
import Star from "@/components/Star";
import ChangeReview from "@/components/modal/ChangeReview";
import Spinner from "@/components/Spinner";
import StarRating from "@/components/StarRating";
import { useNavigate } from "react-router-dom";
import useDetail from "@/store/useDetail";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { useQueryClient } from "@tanstack/react-query";

function Detail() {
  const queryClient = useQueryClient();
  const { content, genre, setGenre } = useContents();
  const { isLoading, isSearch, setIsLoading, setIsSearch } = useDetail();
  const {
    review,
    numberOfReviews,
    averageRating,
    page,
    setReview,
    setNumberOfReviews,
    setAverageRating,
    setPage,

    endPage,
    setEndPage,
    isReview,
    setIsReview,

    deleteReview,
    setDeleteReview,
    reset,
  } = useReviews();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  // const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleDotClick = (e) => {
    e.stopPropagation();

    if (isChangeModalOpen) {
      setIsChangeModalOpen(false);
    } else {
      setIsChangeModalOpen(true); // 모달이 닫혀 있을 경우, 열기 실행
    }
  };
  // 모달 창을 여는 함수
  const openModal = () => {
    -setIsModalOpen(true);
  };

  // 모달 창을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 모달 창을 닫는 함수
  const closeChangeModal = () => {
    setIsChangeModalOpen(false);
  };

  const refresh = async () => {
    try {
      const reUrl = `https://hoyeonjigi.site/user/refresh`;

      const userId = Cookies.get("userId");
      const isAutoLogin = Cookies.get("autoLogin");

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Token": `${Cookies.get("accessToken")}`,
        "Refresh-Token": `${Cookies.get("refreshToken")}`,
      };

      const body = {};

      const response = await postData(reUrl, body, headers);

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
      //자동 로그인 시 만료 시간 재설정
      if (isAutoLogin) {
        Cookies.set("autoLogin", true, {
          secure: true,
          sameSite: "strict",
          expires: 7,
        });
        Cookies.set("accessToken", response.accessToken, {
          secure: true,
          sameSite: "strict",
          expires: 7,
        });
        Cookies.set("refreshToken", response.refreshToken, {
          secure: true,
          sameSite: "strict",
          expires: 7,
        });
        Cookies.set("grantType", response.grantType, {
          secure: true,
          sameSite: "strict",
          expires: 7,
        });
        Cookies.set("userId", userId, {
          secure: true,
          sameSite: "strict",
          expires: 7,
        });
      }
    } catch (error) {
      //refreshToken 만료 시 onBoarding으로 이동
      navigate("/");
    }
  };

  useEffect(() => {
    const contentData = async () => {
      try {
        const type = Cookies.get("grantType");
        const token = Cookies.get("accessToken");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `${type} ${token}`,
        };

        const str = content.genreIds;
        const genreIds = str.split(",");

        // 각 genreId에 대한 URL을 생성하고, 각 URL에 대해 getData 함수를 호출하는 프로미스 배열을 생성합니다.
        const promises = genreIds.map((genreId) => {
          const url = `https://hoyeonjigi.site/genre/${genreId}`;
          return getData(url, headers); // getData 함수가 각 URL에 대해 요청을 수행하고, 프로미스를 반환한다고 가정합니다.
        });

        // Promise.all을 사용하여 모든 프로미스가 완료되길 기다립니다.
        const results = await Promise.all(promises);
        setGenre(results);
      } catch (error) {
        console.log(error);
        console.log("장르에러");
        refresh();
      }
    };

    contentData();
  }, [isSearch]); // 이 효과는 컴포넌트가 마운트될 때만 실행됩니다.

  //--------------------------------------------------------------------

  const fetchReviews = async ({ pageParam }) => {
    if (endPage === true) {
      return;
    }
    try {
      // API로부터 리뷰 데이터를 페이지별로 가져오는 함수
      console.log(pageParam);
      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      };

      // API URL 구성, pageParam을 사용하여 현재 페이지 지정
      const url = `https://hoyeonjigi.site/evaluation/${content.contentId}?page=${pageParam}`;

      const data = await getData(url, headers);

      console.log("통신됨");

      return data; // JSON 형태로 파싱된 응답 데이터 반환
    } catch (error) {
      // 에러 발생 시 콘솔에 에러 메시지 출력
      console.error("fetchReviews 에러:", error);
      setEndPage(true);

      // 에러가 발생했을 때 처리할 로직을 여기에 추가할 수 있습니다.
      // 예를 들어, 사용자에게 에러 메시지를 표시하거나 다른 조치를 취할 수 있습니다.
      // 여기서는 단순히 null을 반환하도록 설정하겠습니다.
      // return null;
    }
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["test"],
    queryFn: fetchReviews,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // const nextPage = lastPage.length ? 1 : undefined;
      // return nextPage;
      // if (endPage === true) {
      //   // 예시로, 응답 데이터에 lastPage라는 필드가 마지막 페이지임을 나타낸다고 가정
      //   return undefined; // 마지막 페이지이므로 다음 페이지는 없음
      // }

      return allPages.length;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    // console.log(error);
    if (endPage === true) {
      return;
    } else if (endPage === false && inView) {
      // setReview([...review, ...data.evaluationList]);
      // setAverageRating(data.avg);
      // setNumberOfReviews(data.evaluationCount);
      console.log("Fire");
      fetchNextPage();
      // console.log(hasNextPage);
    }
  }, [inView, fetchNextPage, endPage]);

  console.log(status);
  console.log(error);

  const [isFirst, setIsfirst] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    queryClient.removeQueries(["test"], { exact: true });
    setEndPage(false);
    reset();

    data?.pages.map((reviews) => {
      setAverageRating(reviews["avg"]);
      setNumberOfReviews(reviews["evaluationCount"]);
      setReview(reviews["evaluationList"]);
    });
    console.log(data);
    console.log(review);

    console.log("Tlqjf")
    setIsfirst(false);
    // fetchNextPage();
  }, [isFirst]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행할 로직 (여기서는 비워둠)

    return () => {
      // 컴포넌트가 언마운트될 때 실행할 로직
      queryClient.removeQueries(["test"], { exact: true });
      // 또는
      // queryClient.invalidateQueries(['test'], { exact: true });
    };
  }, [queryClient]);

  return (
    <div className="bg-black">
      <HeaderMain />

      {/* 컨텐츠영역 */}
      {/* flex justify-between font-noto px-16 pb-12 pt-10 */}
      <div className="flex justify-between font-noto px-16 pb-12 pt-10 h-1420:h-[55vh] h-1920:h-[60vh]">
        <div className="flex-[0.55] ml-3">
          <h2 className="text-white font-medium text-5xl mb-6">
            {content.contentTitle}
          </h2>
          <div className="mb-7">
            <ul className="flex gap-1">
              {genre.map((item, index) => (
                <li
                  key={index}
                  className="text-gray_06 inline-block border border-gray_05 rounded font-semibold px-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row items-center gap-8 mb-7">
            <button className="flex items-center bg-white px-16 py-6 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="16"
                viewBox="0 0 13 16"
              >
                <path
                  data-name="\uB2E4\uAC01형 4"
                  d="M12.17 7.489a.6.6 0 010 1.022L.915 15.437a.6.6 0 01-.914-.511V1.074A.6.6 0 01.915.563z"
                  opacity="0.874"
                ></path>
              </svg>
              <span className="ml-3 text-xl font-extrabold text-black">
                1화 시청하기
              </span>
            </button>
            <div className="text-white flex gap-8">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <path d="M0 0h32v32H0z" fill="transparent"></path>
                  <g data-name="패\uC2A4 4347" fill="none">
                    <path d="M16 31.5l-2.175-1.979C6.1 22.523 1 17.907 1 12.242A8.165 8.165 0 019.25 4 8.984 8.984 0 0116 7.133 8.984 8.984 0 0122.75 4 8.165 8.165 0 0131 12.242c0 5.665-5.1 10.281-12.822 17.293z"></path>
                    <path
                      d="M16.004 29.34l1.15-1.037c3.73-3.386 6.951-6.31 9.107-8.95 2.17-2.658 3.138-4.851 3.138-7.11v-.016a6.604 6.604 0 00-1.924-4.707 6.522 6.522 0 00-4.713-1.92 7.382 7.382 0 00-5.548 2.575L16 9.589l-1.214-1.414A7.384 7.384 0 009.233 5.6a6.522 6.522 0 00-4.708 1.92A6.604 6.604 0 002.6 12.227v.015c0 2.264.972 4.461 3.151 7.124 2.164 2.644 5.397 5.572 9.141 8.963l.01.008 1.102 1.004M16 31.499l-2.175-1.978C6.099 22.523 1 17.907 1 12.242A8.165 8.165 0 019.25 4 8.984 8.984 0 0116 7.133 8.984 8.984 0 0122.75 4 8.165 8.165 0 0131 12.242c0 5.665-5.1 10.281-12.823 17.294L16 31.499z"
                      fill="#fff"
                    ></path>
                  </g>
                </svg>
                <span>찜</span>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className="fill-white"
                >
                  <path fill="rgba(20,20,20,0)" d="M0 0h32v32H0z"></path>
                  <path
                    d="M30 31.3H2a.8.8 0 01-.8-.8v-13a.8.8 0 01.8-.8.8.8 0 01.8.8v12.2h26.4V17.5a.8.8 0 01.8-.8.8.8 0 01.8.8v13a.8.8 0 01-.8.8zm-13.963-10a.8.8 0 01-.8-.8V3.414l-6.43 6.43a.8.8 0 01-1.131 0 .8.8 0 01-.234-.566.8.8 0 01.234-.566L15.454.934A.8.8 0 0116.019.7h.023a.8.8 0 01.3.06.8.8 0 01.247.161l.01.01 7.773 7.778a.8.8 0 01.234.565.8.8 0 01-.234.566.8.8 0 01-1.131 0l-6.409-6.412V20.5a.8.8 0 01-.794.8z"
                    opacity="0.995"
                  ></path>
                </svg>
                <span>공유</span>
              </button>
            </div>
          </div>

          <p className="text-gray_07 font-semibold w-[70%] text-lg">
            {content.contentOverview}
          </p>
        </div>
        <div className="flex-[0.3] flex justify-center">
          <img
            src={content.src}
            alt={content.alt}
            className="h-[60vh] h-1420:h-[45vh] h-1920:h-[45vh] "
          />
        </div>
      </div>

      <hr className="border-0 h-[1px] bg-gray_04 mx-12" />

      {/* 평점 영역 */}
      <div className="bg-black flex gap-4 mb-10">
        <div className="flex-grow-[0.2] ml-16 mt-10 relative">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex items-center">
              <div className="text-6xl text-white font-extrabold mr-4 flex items-center">
                {averageRating}
              </div>
              <div className="flex flex-col gap-2">
                <StarRating rating={averageRating} />
                <p className="text-white">{numberOfReviews}개 평점</p>
              </div>
            </div>
          )}

          <div className="flex items-start justify-between mt-8">
            <button
              onClick={openModal}
              className="border border-gray_05 hover:border-white text-white px-10 py-2 font-bold rounded-full"
            >
              리뷰 작성
            </button>

            <button
              className="text-white text-3xl font-bold modal-trigger mr-10"
              onClick={handleDotClick}
            >
              ⋮
            </button>
          </div>
          <ChangeReview
            isOpen={isChangeModalOpen}
            onClose={closeChangeModal}
          ></ChangeReview>
          <ReviewModal
            isOpen={isModalOpen}
            closeModal={closeModal}
          ></ReviewModal>
        </div>

        <div className="flex flex-grow-[0.8] flex-col mb-24">
          <ul>
            <h3 className="text-white font-semibold mt-11">최신순</h3>

            {isLoading ? (
              <Spinner />
            ) : review.length > 0 ? (
              review.map((item, index) => (
                <li className="mt-11" key={index}>
                  <Star starRating={item.starRating}></Star>
                  <p className="text-white mt-2 font-medium">{item.review}</p>
                  <span className="mt-2 text-gray_07 text-sm">
                    {item.profileName} • {item.ratingDate}{" "}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray_08 text-3xl mt-6 font-medium">
                등록된 리뷰가 없습니다.
              </p>
            )}
          </ul>
          {/* IntersectionObserver에 의해 관찰될 요소 */}
          <div id="observer"></div>
        </div>
      </div>
      <div ref={ref}>zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</div>
      <Footer />
    </div>
  );
}

export default Detail;
