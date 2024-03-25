import Footer from "@/components/Footer";
import HeaderMain from "@/components/HeaderMain";
import { useState } from "react";
import { motion } from "framer-motion";
import ReviewModal from "@/components/modal/ReviewModal";
// import star from "@/assets/main/star.svg";

function Detail() {
  const [rating, setRating] = useState(0); // 초기 별점 상태 설정
  const [hover, setHover] = useState(0); // 마우스 호버 상태 설정

  // 모달 창 상태를 관리하는 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 창을 여는 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 창을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 별점을 설정하는 함수
  const handleSetRating = (newRating) => {
    setRating(newRating);
  };
  return (
    <>
      <HeaderMain />
      <div className="font-noto bg-slate-400 px-12 border-b-gray_05">
        <h2>눈물의 여왕</h2>
        <div></div>

        <div className="flex flex-row items-center gap-6">
          <motion.button className="flex items-center bg-white px-16 py-6 rounded">
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
            <span className="ml-3 font-bold">1화 시청하기</span>
          </motion.button>

          <div className="text-white flex gap-6">
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
                class="fill-white"
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
        <div>
          <dl>
            <dt>크리에이터</dt>
            <dd>장영우,김희원,박지은</dd>
          </dl>
          <dl>
            <dt>출연</dt>
            <dd>
              김수현,김지원,박성훈,곽동연,이주빈,김갑수,이미숙,정진영,나영희,김정난
            </dd>
          </dl>
        </div>
        <p>줄거리</p>
      </div>
      <div className="bg-slate-500">
        <div className="flex items-center">
          <div className="text-5xl text-white font-extrabold mr-4">4.4</div>
          <div className="flex flex-col">
            <p className="text-white">444,444 조회수</p>
          </div>
        </div>

        <button onClick={openModal}>리뷰달기</button>
        <ReviewModal isOpen={isModalOpen} closeModal={closeModal}></ReviewModal>
      </div>
      <Footer />
    </>
  );
}

export default Detail;
