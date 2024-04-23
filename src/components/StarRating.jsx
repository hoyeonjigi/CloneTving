import React from 'react';

import star from "@/assets/main/star.svg";
import halfStar from "@/assets/main/halfStar.svg";
import fillStar from "@/assets/main/fillStar.svg";

// 별 이미지 컴포넌트
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // 전체 별 개수
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7; // 반 별이 있는지 없는지
  const halfStarIndex = hasHalfStar ? fullStars : null; // 반 별의 위치
  const totalStars = 5; // 전체 별의 최대 개수

  // 별 이미지 렌더링
  const renderStars = () => {
    let stars = [];
    // 전체 별
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`full-${i}`} src={fillStar} alt="채운 별" />);
    }
    // 반 별
    if (hasHalfStar) {
      stars.push(<img key={`half-${halfStarIndex}`} src={halfStar} alt="반만 채운 별" />);
    } else if (rating % 1 > 0.7) { // 0.8 이상에서 반올림으로 전체 별 추가
      stars.push(<img key={`full-${fullStars}`} src={fillStar} alt="채운 별" />);
    }
    // 남은 별
    const emptyStars = totalStars - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<img key={`empty-${i}`} src={star} alt="빈 별" />);
    }

    return stars;
  };

  return (
    <div className='flex gap-1'>
      {renderStars()}
    </div>
  );
};

export default StarRating;
