import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import close from "@/assets/profiles/icon_x.svg";

function ReconfirmModal({ isOpen, closeModal }) {
	if (!isOpen) {
		return null;
	}

	const handleDelete = async () => {
		//테스트
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 ">
			<motion.div
				className="bg-gray_03 rounded flex flex-col w-[680px] h-1024:h-[28vh] h-1920:h-[18vh] h-1420:h-[12vh] items-center relative p-7"
				initial={{ y: "20vh" }} // 초기 위치는 화면 아래쪽
				animate={{ y: 0 }} // 애니메이션을 통해 y축 위치를 0으로 변경
				exit={{ y: "100vh" }} // 컴포넌트가 제거될 때 화면 아래로 슬라이드
				transition={{ duration: 0.4, ease: "easeInOut" }} // 애니메이션 지속 시간과 타이밍 함수 설정
			>
				<button onClick={closeModal} className="absolute right-4 top-4">
					<img src={close} alt="" className="w-10" />
				</button>

				<h3 className="text-white w-full text-xl font-extrabold">
					회원정보 삭제
				</h3>
				<div className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-8 px-4">
						<p className="text-white text-1.5xl font-extrabold">
							정말로 회원 탈퇴를 진행하시겠습니까? 탈퇴 후에는 서비스를 이용하실
							수 없으며, 보유한 데이터가 삭제됩니다.
						</p>
					</div>
				</div>
				<div className="w-full flex items-center justify-center gap-10 mt-8">
					<button
						onClick={handleDelete}
						className="w-full py-4 ml-8  bg-[#FF153C] text-white text-lg font-semibold rounded-sm"
					>
						삭제하기
					</button>
					<button
						onClick={closeModal}
						className="w-full py-4 mr-8 bg-[#A3A3A3] text-white text-lg font-semibold rounded-sm"
					>
						취소
					</button>
				</div>
			</motion.div>
		</div>
	);
}

export default ReconfirmModal;
