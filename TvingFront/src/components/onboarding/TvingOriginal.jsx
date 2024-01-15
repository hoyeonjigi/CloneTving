import React, { useState, useEffect } from "react";
import original1 from "@/assets/onBoarding/original/original1.webp";
import original2 from "@/assets/onBoarding/original/original2.webp";
import original3 from "@/assets/onBoarding/original/original3.webp";
import original4 from "@/assets/onBoarding/original/original4.webp";

function TvingOriginal() {
  const [displayedImages, setDisplayedImages] = useState([]);

  const images = [
    { image: original1, alt: "운수 오진 날" },
    { image: original2, alt: "소년소녀 연애하다" },
    { image: original3, alt: "브로 앤 마블" },
    { image: original4, alt: "방과 후 전쟁활동" },
  ];

  useEffect(() => {
    shuffleImages();
  }, []);

  const shuffleImages = () => {
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    setDisplayedImages(shuffledImages.slice(0, 3));
  };

  return (
    <div className="flex justify-center items-center relative mb-52">
      {displayedImages.map((image, index) => (
        <img
          key={index}
          className={`mx-2 ${
            index === 1
              ? "transform scale-100 opacity-100 w-[45%] h-[37%] z-20"
              : "transform scale-90 opacity-50 w-[38%]"
          } ${index === 0 ? "absolute left-[8%] top-10 z-10" : index === 2 ? "absolute right-[8%] top-10 z-10" : ""}`}
          src={image.image}
          alt={image.alt}
          
        />
      ))}
    </div>
  );
}

export default TvingOriginal;
