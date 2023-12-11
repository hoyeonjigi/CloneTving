import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import content1 from "@/assets/onBoarding/contents/contents1.webp";
import content2 from "@/assets/onBoarding/contents/contents2.webp";
import content3 from "@/assets/onBoarding/contents/contents3.webp";
import content4 from "@/assets/onBoarding/contents/contents4.webp";
import content5 from "@/assets/onBoarding/contents/contents5.webp";

function SlideTop() {
  const groupTop = [
    {
      title: "유퀴즈 온 더 블럭",
      id: "uquiz",
      img: content1,
    },
    {
      title: "힘센여자 강남순",
      id: "strongWoman",
      img: content2,
    },
    {
      title: "콩심은데 콩나고 팥심은데 팥난다",
      id: "bean",
      img: content3,
    },
    {
      title: "반짝이는 워터멜론",
      id: "waterMelon",
      img: content4,
    },
    {
      title: "무인도의 디바",
      id: "diva",
      img: content5,
    },
  ];

  const groupTopTwice = Array(2)
    .fill(groupTop)
    .flat()
    .map((item, index) => ({ ...item, id: item.id + "_1_" + index }));

  return (
    <>
      <Swiper
        className="mb-3 smooth-swiper"
        slidesPerView={4.5}
        spaceBetween={"1%"}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
        }}
        loop={true}
        speed={7000}
        freeMode={true}
        modules={[Autoplay]}
        preventInteractionOnTransition={true}
      >
        {groupTopTwice &&
          groupTopTwice.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.img} alt={item.title} className="rounded" />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default SlideTop;

