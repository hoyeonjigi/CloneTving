import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import content6 from "@/assets/onBoarding/contents/contents6.webp";
import content7 from "@/assets/onBoarding/contents/contents7.webp";
import content8 from "@/assets/onBoarding/contents/contents8.webp";
import content9 from "@/assets/onBoarding/contents/contents9.webp";
import content10 from "@/assets/onBoarding/contents/contents10.webp";
// import "@/style/SlideBottom.css";

function SlideBottom() {
  const groupBottom = [
    {
      title: "운수 오진 날",
      id: "day",
      img: content6,
    },
    {
      title: "싱 어게인3",
      id: "singAgain",
      img: content7,
    },
    {
      title: "스트릿 댄스 걸스 파이터 2",
      id: "dance",
      img: content8,
    },
    {
      title: "어쩌다 사장 3",
      id: "boss",
      img: content9,
    },
    {
      title: "낮에 뜨는 달",
      id: "moon",
      img: content10,
    },
  ];

  const groupBottomTwice = Array(2)
    .fill(groupBottom)
    .flat()
    .map((item, index) => ({ ...item, id: item.id + "_2_" + index }));

  return (
    <>
      <Swiper
        className="mb-3"
        slidesPerView={5}
        spaceBetween={"1%"}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
        }}
        loop={true}
        modules={[Autoplay]}
        speed={9000}
        freeMode={true}
        preventInteractionOnTransition={true}
      >
        {groupBottomTwice &&
          groupBottomTwice.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.img} alt={item.title} className="rounded" />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default SlideBottom;
