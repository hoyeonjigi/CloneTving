import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/virtual";

import content1 from "@/assets/onBoarding/contents/contents1.webp";
import content2 from "@/assets/onBoarding/contents/contents2.webp";
import content3 from "@/assets/onBoarding/contents/contents3.webp";
import content4 from "@/assets/onBoarding/contents/contents4.webp";
import content5 from "@/assets/onBoarding/contents/contents5.webp";

function SlideTop() {
  const slides = [
    { image: content1, alt: "alt1" },
    { image: content2, alt: "alt2" },
    { image: content3, alt: "alt3" },
    { image: content4, alt: "alt4" },
    { image: content5, alt: "alt5" },
  ];

  return (
    <Swiper
      modules={[Virtual]}
      slidesPerView={5}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      virtual
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide} virtualIndex={index}>
          <img src={slide.image} alt={slide.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SlideTop;
