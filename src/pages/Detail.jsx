import Footer from "@/components/Footer";
import HeaderMain from "@/components/HeaderMain";
import { useState } from "react";
import ReviewModal from "@/components/modal/ReviewModal";
// import useContent from "@/store/useContent";
import { useEffect, useRef } from "react";
import { getData, postData } from "@/utils/crud";
import Cookies from "js-cookie";
// import useReview from "@/store/useReviews";
import useContents from "@/store/useContent";
import useReviews from "@/store/useReviews";
import Star from "@/components/Star";

function Detail() {
  const { content, genre, setGenre } = useContents();
  const {
    review,
    numberOfReviews,
    averageRating,
    page,
    setReview,
    setNumberOfReviews,
    setAverageRating,
    setPage,

    isReview,
    setIsReview,
  } = useReviews();

  // const { page, setPage, review, setReview,numberOfReviews,setNumberOfReviews } = useReviews((state) => ({
  //   page: state.page,
  //   setPage: state.setPage,
  //   review: state.review,
  //   setReview: state.setReview,
  // }));

  // 이제 page, setPage, review, setReview를 컴포넌트 내에서 사용할 수 있습니다.

  // 모달 창 상태를 관리하는 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 창을 여는 함수
  const openModal = () => {
    -setIsModalOpen(true);
  };

  // 모달 창을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const refresh = async () => {
    const reUrl = `http://hoyeonjigi.site:8080/user/refresh`;

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
          const url = `http://hoyeonjigi.site:8080/genre/${genreId}`;
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
  }, []); // 이 효과는 컴포넌트가 마운트될 때만 실행됩니다.

  // useEffect(() => {
  //   const reviewData = async () => {
  //     try {
  //       // 로컬 스토리지에 리뷰 데이터가 없는 경우, API 호출을 통해 데이터를 가져옵니다.
  //       const type = Cookies.get("grantType");
  //       const token = Cookies.get("accessToken");

  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: `${type} ${token}`,
  //       };

  //       console.log(page);
  //       // const url = `http://hoyeonjigi.site:8080/evaluation/${content.contentId}`;
  //       const url = `http://hoyeonjigi.site:8080/evaluation/${content.contentId}?page=${page}`;

  //       const response = await getData(url, headers);

  //       // console.log(response.evaluationCount)
  //       // console.log(response.evaluationList)

  //       setAverageRating(response.avg);
  //       setNumberOfReviews(response.evaluationCount);
  //       setReview(response.evaluationList);

  //       // setIsReview(false);

  //       // setIsDataLoaded(true); // 데이터 저장 후 로딩 상태를 true로 설정
  //     } catch (error) {
  //       console.log(error);
  //       console.log("리뷰에러");
  //       // refresh();
  //     }
  //   };

  //   // 페이지가 초기값(0) 이상일 때만 데이터 요청
  //   reviewData();
  // }, [page]); // 의존성 배열이 비어있기 때문에 컴포넌트가 마운트될 때만 이 효과가 실행됩니다.

  // const [page, setPage] = useState(0);

  // const [test, setTest] = useState([]);

  const reviewData = async () => {
    try {
      // 로컬 스토리지에 리뷰 데이터가 없는 경우, API 호출을 통해 데이터를 가져옵니다.
      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      };

      console.log(page);
      // const url = `http://hoyeonjigi.site:8080/evaluation/${content.contentId}`;
      const url = `https://hoyeonjigi.site/evaluation/${content.contentId}?page=${page}`;

      const response = await getData(url, headers);

      if (response.evaluationList.length === 0) {
        return;
      } else {
        if (page === 0) {
          // console.log("페이지0");
          setReview(response.evaluationList);
          setAverageRating(response.avg);
          setNumberOfReviews(response.evaluationCount);
          // 페이지 번호를 업데이트하여 다음 요청에 올바른 skip 값을 사용합니다.
          setPage(page + 1);
        } else {
          // 불러온 데이터를 현재 상품 목록에 추가합니다.
          // 이전 상품 목록(prevProducts)에 새로운 데이터(data.products)를 연결합니다.
          setReview([...review, ...response.evaluationList]);

          // console.log(review);
          setAverageRating(response.avg);
          setNumberOfReviews(response.evaluationCount);
          // 페이지 번호를 업데이트하여 다음 요청에 올바른 skip 값을 사용합니다.
          setPage(page + 1);
        }
      }
    } catch (error) {
      console.log(error);
      console.log("리뷰에러");
      // refresh();
    }
  };

  useEffect(() => {
    if (page === 0) {
      window.scrollTo(0, 0);
    }

    reviewData(); // 컴포넌트가 마운트될 때 첫 번째 페이지 데이터 로드
  }, []); // 의존성 배열을 비워 컴포넌트가 마운트될 때만 실행

  // 컴포넌트 내부에서
  const observer = useRef();

  useEffect(() => {
    const observerElement = document.getElementById("observer");

    const options = {
      root: null, // 뷰포트를 root로 사용
      rootMargin: "0px", // root의 마진
      threshold: 1.0, // 타겟이 100% 보여질 때 콜백 실행
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 타겟 요소가 뷰포트에 들어왔을 때
          reviewData(); // 추가 데이터를 로드하는 함수 호출
        }
      });
    };

    observer.current = new IntersectionObserver(observerCallback, options);
    if (observerElement) observer.current.observe(observerElement);

    return () => {
      // 컴포넌트가 언마운트될 때 observer를 정리
      if (observer.current) observer.current.disconnect();
    };
  }, [page]); // 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  return (
    <div className="bg-black">
      <HeaderMain />

      {/* 컨텐츠영역 */}
      {/* flex justify-between font-noto px-16 pb-12 pt-10 */}
      <div className="flex justify-between font-noto px-16 pb-12 pt-10">
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
        <div className="flex-[0.3] relative">
          <img
            src={content.src}
            alt={content.alt}
            className=" h-full absolute right-[4rem]"
          />
        </div>
      </div>

      <hr className="border-0 h-[1px] bg-gray_04 mx-12" />

      {/* 평점 영역 */}
      <div className="bg-black flex gap-4">
        <div className="flex-grow-[0.2] ml-16 mt-10">
          <div className="flex items-center">
            <div className="text-5xl text-white font-extrabold mr-4">
              {averageRating}
            </div>
            <div className="flex flex-col">
              <p className="text-white">{numberOfReviews} 평점</p>
            </div>
          </div>
          <button onClick={openModal}>리뷰달기</button>
          <ReviewModal
            isOpen={isModalOpen}
            closeModal={closeModal}
          ></ReviewModal>
        </div>
        {/* <div className="flex flex-col mb-24">
          <ul>
            <h3 className="text-white font-semibold mt-11">최신순</h3>

            {review.length > 0 &&
              review.map((item, index) => (
                <li className="mt-11" key={index}>
                  <Star starRating={item.starRating}></Star>
                  <p className="text-white mt-2 font-medium">{item.review}</p>
                  <span className="mt-2 text-gray_07 text-sm">
                    {item.profileName} • {item.ratingDate}{" "}
                  </span>
                </li>
              ))}
          </ul>
        </div> */}
        <div className="flex flex-col mb-24">
          <ul>
            <h3 className="text-white font-semibold mt-11">최신순</h3>
            {review.length > 0 &&
              review.map((item, index) => (
                <li className="mt-11" key={index}>
                  <Star starRating={item.starRating}></Star>
                  <p className="text-white mt-2 font-medium">{item.review}</p>
                  <span className="mt-2 text-gray_07 text-sm">
                    {item.profileName} • {item.ratingDate}{" "}
                  </span>
                </li>
              ))}
            <div />
          </ul>
          {/* IntersectionObserver에 의해 관찰될 요소 */}
          <div id="observer"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
