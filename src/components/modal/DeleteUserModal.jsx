import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import close from "@/assets/profiles/icon_x.svg";
import ReconfirmModal from "./ReconfirmModal";

function DeleteUserModal({ isOpen, closeModal }) {
	// 재확인 모달 창 상태를 관리하는 state
	const [isReconfirmModalOpen, setIsReconfirmModalOpen] = useState(false);

	// 재확인 모달 창을 여는 함수
	const openReconfirmModal = () => {
		setIsReconfirmModalOpen(true);
	};

	// 재확인 모달 창을 닫는 함수
	const closeReconfirmModal = () => {
		setIsReconfirmModalOpen(false);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 ">
			<motion.div
				className="bg-gray_03 rounded flex flex-col w-[680px] h-1024:h-[34vh] h-1920:h-[20vh] h-1420:h-[30vh] items-center relative p-7"
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
					<div className="w-full flex justify-center items-center mt-8">
						<p className="text-white text-1.5xl font-extrabold">
							탈퇴 및 계정삭제를 원하시면, 아래 사항을 반드시 확인해주세요.
						</p>
					</div>
					<div className="w-full flex justify-center items-center mt-5">
						<p className="text-[#A3A3A3] text-lg font-noto px-4">
							회원 탈퇴 시 티빙 서비스를 이용하실 수 없으며 보유하신 이용권이나
							캐시, 쿠폰 등 유료 서비스가 종료됩니다. 회원 탈퇴 후 사용자의
							계정이 삭제되며, 관련 데이터도 완전 삭제됩니다.
						</p>
					</div>
				</div>
				<div className="w-full flex items-center justify-center gap-10 mt-8">
					<button
						onClick={openReconfirmModal}
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

			<div>
				<ReconfirmModal
					isOpen={isReconfirmModalOpen}
					closeModal={closeReconfirmModal}
				/>
			</div>
		</div>
	);
}

export default DeleteUserModal;
