import React from "react";
import { motion } from "framer-motion";
import { deleteData, getData } from "@/utils/crud";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import useContents from "@/store/useContent";
import useProfile from "@/store/useProfile";
import useReviews from "@/store/useReviews";
import { useEffect } from "react";
import checkError from "@/utils/checkError";

function DeleteReview({ isOpen, onClose }) {
	const { content } = useContents();
	const { myProfileId, myEvaluationId, setMyEvaluationId } = useProfile();
	const { reviewState, setReviewState } = useReviews();

	const isReview = async () => {
		try {
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				Authorization: `${type} ${token}`,
			};

			const isReviewUrl = `${
				import.meta.env.VITE_API_URL
			}/evaluation/retrieve/by-profile?contentId=${
				content.contentId
			}&profileId=${myProfileId}`;

			const getRes = await getData(isReviewUrl, headers);

			setMyEvaluationId(getRes.evaluationId);
		} catch (error) {
			console.log(error);
			console.log("에러출력");
			toast.error(`작성한 리뷰가 없습니다.`, {
				duration: 2000,
			});
		}
	};

	const handleDelete = async () => {
		try {
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				Authorization: `${type} ${token}`,
			};

			const url = `${
				import.meta.env.VITE_API_URL
			}/evaluation/delete?evaluationId=${myEvaluationId}`;

			const response = await deleteData(url, headers);

			window.scrollTo(0, 0);

			toast.success(`리뷰가 삭제되었습니다`, {
				duration: 2000,
			});

			setReviewState({ deleteReview: true, isReview: false });
		} catch (error) {
			console.log(error);
			console.log("에러출력");
		}
	};

	useEffect(() => {
		isReview();
	}, []);

	useEffect(() => {
		checkError();
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 ">
			<motion.div
				className="bg-gray_03 rounded flex flex-col w-[30%] h-1024:h-[60vh] h-1920:h-[32vh] h-1420:h-[43vh] items-center relative p-7"
				initial={{ y: "20vh" }} // 초기 위치는 화면 아래쪽
				animate={{ y: 0 }} // 애니메이션을 통해 y축 위치를 0으로 변경
				exit={{ y: "100vh" }} // 컴포넌트가 제거될 때 화면 아래로 슬라이드
				transition={{ duration: 0.4, ease: "easeInOut" }} // 애니메이션 지속 시간과 타이밍 함수 설정
			>
				{/* <button onClick={closeModal} className="absolute right-4 top-4">
          <img src={close} alt="" className="w-10" />
        </button> */}
				<div className="w-full flex flex-col justify-start items-start gap-1">
					<p className="text-xl font-extrabold">삭제하시겠습니까?</p>
					<p className="text-sm">작성한 내용을 영구적으로 삭제합니다.</p>
				</div>
				<div className="w-full flex gap-3 items-center justify-center mt-6">
					<button
						onClick={() => {
							onClose(); // 모달 닫기 함수 호출
							handleDelete(); // 삭제 처리 함수 호출
						}}
						className="w-[50%] py-2 bg-[#e02020] text-white font-semibold rounded-sm hover:bg-opacity-70"
					>
						삭제하기
					</button>
					<button
						onClick={onClose}
						className="w-[50%] py-2 text-white font-semibold rounded-sm border border-white hover:text-gray_08 hover:border-gray_08"
					>
						취소
					</button>
				</div>
			</motion.div>
		</div>
	);
}

export default DeleteReview;
