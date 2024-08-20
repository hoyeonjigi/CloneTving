import { useState, useEffect } from "react";

import { motion } from "framer-motion";

import close from "@/assets/profiles/icon_x.svg";
// import useContent from "@/store/useContent";
import useContents from "@/store/useContent";

import Cookies from "js-cookie";
import { postData, getData, patchData } from "@/utils/crud";
import { toast } from "react-hot-toast";

import useReviews from "@/store/useReviews";
import useProfile from "@/store/useProfile";

function ModifyReviewModal({ isOpen, onClose }) {
	const [rating, setRating] = useState(0); // 초기 별점 상태 설정

	const [hover, setHover] = useState(0); // 마우스 호버 상태 설정

	const [review, setReview] = useState(""); // 리뷰 텍스트 상태 설정

	const [eid, setEid] = useState(0);

	const { content } = useContents();

	const { setReviewState } = useReviews();

	const { profileId } = useProfile();

	// 별점을 설정하는 함수
	const handleSetRating = (newRating) => {
		setRating(newRating);
	};

	const handleReviewChange = (e) => {
		setReview(e.target.value);
	};

	// 별점에 따른 텍스트 설명
	const ratingTexts = {
		1: "1.0 나쁨",
		2: "2.0 별로",
		3: "3.0 보통",
		4: "4.0 좋음",
		5: "5.0 최고",
	};

	const handleModify = async () => {
		try {
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				Authorization: `${type} ${token}`,
			};

			// 현재 시간을 0000년 00월 00일 형식으로 변환
			// const currentDate = new Date()
			//   .toLocaleDateString("ko-KR", {
			//     year: "numeric",
			//     month: "2-digit",
			//     day: "2-digit",
			//   })
			//   .replace(/\. /g, "-")
			//   .replace(/\./g, "");

			const data = {
				evaluationId: eid,
				rating: rating,
				review: review,
				// ratingDate: currentDate,
			};

			const url = `${import.meta.env.VITE_API_URL}/evaluation/edit`;

			const response = await patchData(url, data, headers);

			// setIsReview(true);
			setReviewState({ isModify: true });

			setReview("");

			setRating(0);
			window.scrollTo(0, 0);

			toast.success(`리뷰가 수정되었습니다`, {
				duration: 2000,
			});
		} catch (error) {
			console.log(error);
			console.log("에러출력");
			toast.error(`리뷰를 수정하지 못했습니다.`, {
				duration: 2000,
			});
		}
	};

	useEffect(() => {
		const reviewStatus = async () => {
			try {
				const type = Cookies.get("grantType");
				const token = Cookies.get("accessToken");

				const headers = {
					"Content-Type": "application/json",
					Authorization: `${type} ${token}`,
				};

				const checkUrl = `${
					import.meta.env.VITE_API_URL
				}/evaluation/retrieve/by-profile?contentId=${
					content.contentId
				}&profileId=${profileId}`;

				const response = await getData(checkUrl, headers);

				setEid(response["evaluationId"]);

				console.log(response);
			} catch (error) {
				console.log(error);
				console.log("에러출력");
			}
		};

		reviewStatus();
	}, []);

	if (!isOpen) {
		return null;
	}

	return (
		<form
			className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90 "
			onSubmit={(e) => {
				e.preventDefault();
				handleModify();
				onClose();
			}}
		>
			<motion.div
				className="bg-gray_03 rounded flex flex-col w-[680px] h-1024:h-[60vh] h-1920:h-[32vh] h-1420:h-[43vh] items-center relative p-7"
				initial={{ y: "20vh" }} // 초기 위치는 화면 아래쪽
				animate={{ y: 0 }} // 애니메이션을 통해 y축 위치를 0으로 변경
				exit={{ y: "100vh" }} // 컴포넌트가 제거될 때 화면 아래로 슬라이드
				transition={{ duration: 0.4, ease: "easeInOut" }} // 애니메이션 지속 시간과 타이밍 함수 설정
			>
				<button onClick={onClose} className="absolute right-4 top-4">
					<img src={close} alt="" className="w-10" />
				</button>

				<h3 className="text-white w-full text-xl font-extrabold">리뷰 수정</h3>
				<p className="text-white w-full text-sm mt-2">{content.contentTitle}</p>
				<div className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center mt-4">
						<p className="text-white text-3.5xl font-extrabold">
							{/* {" "} */}
							{hover || rating
								? ratingTexts[hover || rating]
								: "별점을 선택해주세요"}
						</p>
					</div>
					<div className="flex mt-5">
						{[1, 2, 3, 4, 5].map((starIndex) => (
							<svg
								key={starIndex}
								onMouseEnter={() => setHover(starIndex)} // 마우스가 올라간 별 인덱스 설정
								onMouseLeave={() => setHover(0)} // 마우스가 떠나면 호버 상태 초기화
								onClick={() => handleSetRating(starIndex)}
								xmlns="http://www.w3.org/2000/svg"
								width="64"
								height="64"
								viewBox="0 0 32 32"
								className="cursor-pointer"
								// fill={starIndex <= (hover || rating) ? "blue" : "none"} // 호버 상태 또는 별점에 따라 색상 변경
								fill="none"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M21.9591 9.2598C21.8668 8.9763 21.6301 8.76371 21.3384 8.70226L15.6279 7.49988L12.7235 2.41971C12.575 2.16013 12.299 2 12 2C11.701 2 11.425 2.16013 11.2765 2.41971L8.37208 7.49988L2.66162 8.70226C2.36991 8.76371 2.1332 8.9763 2.04095 9.2598C1.94866 9.5433 2.01483 9.85446 2.2145 10.0758L6.13167 14.4191L5.50612 20.2443C5.47425 20.5413 5.60371 20.8326 5.84546 21.0079C6.08725 21.1833 6.40437 21.2158 6.67671 21.0933L12 18.6975L17.3233 21.0933C17.4327 21.1425 17.5492 21.1667 17.6652 21.1667C17.8381 21.1667 18.0098 21.1129 18.1546 21.0079C18.3963 20.8326 18.5258 20.5413 18.4939 20.2443L17.8683 14.4191L21.7855 10.0758C21.9851 9.85446 22.0513 9.5433 21.9591 9.2598Z"
									fill={starIndex <= (hover || rating) ? "#00a7f6" : "#e0e0e0"}
								/>
							</svg>
						))}
					</div>
				</div>
				<div className="w-full">
					<textarea
						name="review"
						placeholder="이 콘텐츠의 어떤 점이 좋거나 싫었는지 다른 사용자들에게 알려주세요. 고객님의 리뷰는 다른 사용자들에게 큰 도움이 됩니다."
						className=" w-full min-h-[250px] max-h-72 border border-[#777] rounded bg-gray_03 text-white text-sm placeholder:text-[#777] placeholder:text-sm p-3 resize-y "
						value={review}
						onChange={handleReviewChange}
					></textarea>
				</div>
				<div className="w-full flex items-center justify-center mt-10">
					<button className="w-full py-2 bg-[#00a7f6] text-white font-semibold rounded-sm">
						수정하기
					</button>
				</div>
			</motion.div>
		</form>
	);
}

export default ModifyReviewModal;
