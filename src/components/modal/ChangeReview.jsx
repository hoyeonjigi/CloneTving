// import React, { useState, useRef, useEffect } from "react";
// import DeleteReview from "./DeleteReview";

// function ChangeReview({ isOpen, onClose }) {
//   const modalRef = useRef();

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//   const handleDeleteClick = () => {
//     setIsDeleteModalOpen(true);
//   };

//   // 삭제 확인 모달을 닫는 함수
//   const closeDeleteModal = () => {
//     setIsDeleteModalOpen(false);
//     onClose(); // ChangeReview 모달도 닫기
//   };

//   useEffect(() => {
//     // 모달 외부 클릭 시 모달을 닫는 함수
//     const handleClickOutside = (event) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(event.target) &&
//         !event.target.closest(".modal-trigger")
//       ) {
//         onClose(); // 모달 닫기
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [onClose]);

//   if (!isOpen) return null;

//   return (
//     <div
//       ref={modalRef}
//       className="flex flex-col mt-3 bg-gray_03 text-white w-[60%] items-center rounded absolute right-10"
//     >
//       <button className="py-3 w-full text-gray_08 hover:text-white">
//         리뷰 수정
//       </button>
//       <button
//         onClick={handleDeleteClick}
//         className="py-3 w-full text-gray_08 hover:text-white"
//       >
//         리뷰 삭제
//       </button>

//       {isDeleteModalOpen && (
//         <DeleteReview isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
//       )}
//     </div>
//   );
// }

// export default ChangeReview;

import React, { useState, useRef, useEffect } from "react";
import DeleteReview from "./DeleteReview";
import ModifyReviewModal from "./ModifyReviewModal"; // 리뷰 수정 모달 컴포넌트
import Cookies from "js-cookie";
import useContents from "@/store/useContent";
import useProfile from "@/store/useProfile";
import { getData } from "@/utils/crud";
import { toast } from "react-hot-toast";

function ChangeReview({ isOpen, onClose }) {
	const modalRef = useRef();
	const { content } = useContents();
	const { myProfileId, myEvaluationId, setMyEvaluationId } = useProfile();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isModifyModalOpen, setIsModifyModalOpen] = useState(false); // 수정 모달 상태

	const [isExistReview, setIsExistReview] = useState(false);

	// 삭제 모달 열기 핸들러
	const handleDeleteClick = () => {
		if (!isExistReview) {
			toast.error("작성한 리뷰가 없습니다.", { duration: 2000 });
			setIsDeleteModalOpen(false);
			onClose();
			return;
		}
		setIsDeleteModalOpen(true);
	};

	// 수정 모달 열기 핸들러
	const handleModifyClick = () => {
		if (!isExistReview) {
			toast.error("작성한 리뷰가 없습니다.", { duration: 2000 });
			setIsModifyModalOpen(false);
			onClose();
			return;
		}
		setIsModifyModalOpen(true);
	};

	// 삭제 모달 및 ChangeReview 모달 닫기 핸들러
	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		onClose();
	};

	// 수정 모달 및 ChangeReview 모달 닫기 핸들러
	const closeModifyModal = () => {
		setIsModifyModalOpen(false);
		onClose();
	};

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
			setIsExistReview(true);
		} catch (error) {
			console.log(error);
			console.log("에러출력");
			setIsExistReview(false);
		}
	};

	useEffect(() => {
		isReview();
	}, []);

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
		<div
			ref={modalRef}
			className="flex flex-col mt-3 bg-gray_03 text-white w-[60%] items-center rounded absolute right-10"
		>
			<button
				onClick={handleModifyClick}
				className="py-3 w-full text-gray_08 hover:text-white"
			>
				리뷰 수정
			</button>
			<button
				onClick={handleDeleteClick}
				className="py-3 w-full text-gray_08 hover:text-white"
			>
				리뷰 삭제
			</button>

			{isModifyModalOpen && (
				<ModifyReviewModal
					isOpen={isModifyModalOpen}
					onClose={closeModifyModal}
				/>
			)}

			{isDeleteModalOpen && (
				<DeleteReview isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
			)}
		</div>
	);
}

export default ChangeReview;
