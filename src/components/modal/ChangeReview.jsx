import React, { useState, useRef, useEffect } from "react";


function ChangeReview({ isOpen, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    // 모달 외부 클릭 시 모달을 닫는 함수
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(".modal-trigger")
      ) {
        onClose(); // 모달 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="flex flex-col mt-3 bg-gray_03 text-white w-[60%] items-center rounded absolute right-10">
      <button className="py-3 text-gray_08 hover:text-white">리뷰 수정</button>
      {/* <button className="py-3 text-gray_08 hover:text-white">리뷰 삭제</button> */}
     
    </div>
  );
}

export default ChangeReview;
