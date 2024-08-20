import Footer from "@/components/Footer";
import HeaderMain from "@/components/HeaderMain";
import { useCallback, useState } from "react";
import ReviewModal from "@/components/modal/ReviewModal";
// import useContent from "@/store/useContent";
import { useEffect, useLayoutEffect, useRef, React } from "react";
import { getData, postData } from "@/utils/crud";
import Cookies from "js-cookie";
// import useReview from "@/store/useReviews";
import useContents from "@/store/useContent";
import useReviews from "@/store/useReviews";
import Star from "@/components/Star";
import ChangeReview from "@/components/modal/ChangeReview";
import Spinner from "@/components/Spinner";
import StarRating from "@/components/StarRating";
import { useNavigate } from "react-router-dom";
import useDetail from "@/store/useDetail";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { useQueryClient } from "@tanstack/react-query";

import dibs from "@/assets/dibs.svg";
import share from "@/assets/share.svg";
import play from "@/assets/play.svg";

function Detail() {
	const queryClient = useQueryClient();
	const { content, genre, setGenre } = useContents();
	const { isLoading, isSearch, setIsLoading, setIsSearch } = useDetail();
	const { reviewState, setReviewState, reset } = useReviews();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

	const navigate = useNavigate();

	const handleDotClick = (e) => {
		e.stopPropagation();

		if (isChangeModalOpen) {
			setIsChangeModalOpen(false);
		} else {
			setIsChangeModalOpen(true); // 모달이 닫혀 있을 경우, 열기 실행
		}
	};
	// 모달 창을 여는 함수
	const openModal = () => {
		-setIsModalOpen(true);
	};

	// 모달 창을 닫는 함수
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// 모달 창을 닫는 함수
	const closeChangeModal = () => {
		setIsChangeModalOpen(false);
	};

	useLayoutEffect(() => {
		const contentData = async () => {
			try {
				const type = Cookies.get("grantType");
				const token = Cookies.get("accessToken");

				const headers = {
					"Content-Type": "application/json",
					Authorization: `${type} ${token}`,
				};

				const str = content.genreIds;

				// 각 genreId에 대한 URL을 생성하고, 각 URL에 대해 getData 함수를 호출하는 프로미스 배열을 생성합니다.
				const promises = str.map((genreId) => {
					const url = `${import.meta.env.VITE_API_URL}/genre/${genreId}`;

					return getData(url, headers); // getData 함수가 각 URL에 대해 요청을 수행하고, 프로미스를 반환한다고 가정합니다.
				});

				// // Promise.all을 사용하여 모든 프로미스가 완료되길 기다립니다.
				const results = await Promise.all(promises);

				setGenre(results);
			} catch (error) {
				console.log(error);
				console.log("장르에러");
				// refresh();
			}
		};

		contentData();
	}, [isSearch]); // 이 효과는 컴포넌트가 마운트될 때만 실행됩니다.

	//--------------------------------------------------------------------

	const fetchReviews = async ({ pageParam }) => {
		try {
			// API로부터 리뷰 데이터를 페이지별로 가져오는 함수
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				Authorization: `${type} ${token}`,
			};

			const data = {
				contentId: content.contentId,
				sortType: "LATEST",
			};
			// API URL 구성, pageParam을 사용하여 현재 페이지 지정

			const url = `${
				import.meta.env.VITE_API_URL
			}/evaluation/retrieve?page=${pageParam}&size=5&sort=string&contentId=${
				content.contentId
			}&sortType=LATEST`;

			const response = await postData(url, data, headers);

			// console.log(response);

			setIsLoading(false);

			return response; // JSON 형태로 파싱된 응답 데이터
		} catch (error) {
			// 에러 발생 시 콘솔에 에러 메시지 출력
			console.error("fetchReviews 에러:", error);

			// console.log(data);
			// setReviewState({ endPage: true });
		}
	};

	const { ref, inView } = useInView();

	const {
		data,
		status,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = useInfiniteQuery({
		queryKey: ["infinity"],
		queryFn: fetchReviews,
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			// return allPages.length;
			// if (!lastPage) {
			//   return undefined; // 빈 페이지를 명시적으로 처리
			// }

			return allPages.length;
		},
	});

	// // 등록,수정 ,삭제 됐을 시 로직
	useEffect(() => {
		if (
			reviewState.isReview ||
			reviewState.isModify ||
			reviewState.deleteReview
		) {
			// window.location.reload();
			// window.scrollTo(0, 0);

			queryClient.invalidateQueries(["infinity"]);
			queryClient.refetchQueries(["infinity"]);
			// refetch();

			// queryClient.clear();

			// reset();
			// queryClient.invalidateQueries(["infinity"]);
			// queryClient.refetchQueries(["infinity"]);
			// refetch();

			console.log(data);

			if (data) {
				const updateReviewState = () => {
					// reset();

					if (
						data.pages[0].page["totalElements"] !== reviewState.numberOfReviews
					) {
						avgRating();
						let changeReviews = [];

						data.pages.map((reviews) => {
							reviews.content.forEach((review) => {
								changeReviews.push(review); // 리뷰 객체를 배열에 추가
							});

							setReviewState({
								review: changeReviews,
								numberOfReviews: reviews.page["totalElements"],
								totalPages: reviews.page["totalPages"],
								isReview: false,
								isModify: false,
								deleteReview: false,
							});
						});
					}
				};

				updateReviewState(); // 리뷰 상태 업데이트 함수 호출
				// window.scrollTo(0, 0);
			}
		}
	}, [
		data,
		isSearch,
		reviewState.isReview,
		reviewState.isModify,
		reviewState.deleteReview,
		queryClient,
	]);

	//스크롤을 내리면 기존 있었던 리뷰에 추가된 리뷰를 업데이트
	useEffect(() => {
		queryClient.invalidateQueries(["infinity"]);
		queryClient.refetchQueries(["infinity"]);
		refetch();

		if (reviewState.len >= reviewState.totalPages || !inView) {
			return;
		}

		if (data) {
			console.log(data.pages.length);
			console.log(data);

			// console.log(reviewState.len);
			// console.log(data.pages[data.pages.length - 1].content);
			// console.log(reviewState.len);
			// console.log(data.pages[data.pages.length]);

			if (reviewState.len !== 0 && data.pages.length !== reviewState.len) {
				// console.log(data);
				setReviewState({
					// averageRating: data.pages[data.pages.length - 1].avg,
					// numberOfReviews: data.pages[data.pages.length - 1].evaluationCount,
					// len:data.pages.length,
					review: [
						...reviewState.review,
						...data.pages[data.pages.length - 1].content,
					],
				});
			}

			setReviewState({
				len: data.pages.length,
			});

			// console.log(hasNextPage);
			fetchNextPage();
		}
	}, [data, inView, isSearch, refetch]);

	const avgRating = async () => {
		try {
			const type = Cookies.get("grantType");
			const token = Cookies.get("accessToken");

			const headers = {
				"Content-Type": "application/json",
				Authorization: `${type} ${token}`,
			};

			const url = `${
				import.meta.env.VITE_API_URL
			}/evaluation/average-rating?contentId=${content.contentId}`;

			const response = await getData(url, headers);

			setReviewState({
				averageRating: response,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// 맨 처음 랜더링 됐을때 초기 데이터 입력
	useEffect(() => {
		let accumulatedReviews = []; // 누적할 리뷰 배열

		if (reviewState.isFirst === false) {
			return;
		}

		avgRating();
		// console.log(data);

		if (data) {
			data.pages.map((reviews) => {
				reviews.content.forEach((review) => {
					accumulatedReviews.push(review); // 리뷰 객체를 배열에 추가
				});

				setReviewState({
					review: accumulatedReviews,
					numberOfReviews: reviews.page["totalElements"],
					totalPages: reviews.page["totalPages"],
					isFirst: false, // isFirst를 false로 설정하여 다음 렌더링에서는 조건문에서 리턴하도록
				});
			});
		}
	}, [data, reviewState.isFirst, isSearch]);

	useEffect(() => {
		window.history.scrollRestoration = "manual";
		// 스크롤을 맨 위로 올립니다
		window.scrollTo(0, 0);

		// React Query 캐시를 초기화합니다
		queryClient.removeQueries(["infinity"]);
		queryClient.refetchQueries(["infinity"]);

		// 컴포넌트의 상태를 초기화합니다
		reset();

		// isLoading 상태를 true로 설정하여 로딩 스피너를 표시합니다
		setIsLoading(true);

		// 필요한 경우 다른 상태들도 초기화합니다
		setIsModalOpen(false);
		setIsChangeModalOpen(false);
	}, []); // 빈 배열을 넣어 컴포넌트가 마운트될 때만 실행되도록 합니다

	return (
		<div className="bg-black">
			<HeaderMain />

			{/* 컨텐츠영역 */}
			{/* flex justify-between font-noto px-16 pb-12 pt-10 */}
			<div className="flex justify-between font-noto px-16 pb-12 pt-10 h-1420:h-[55vh] h-1920:h-[60vh]">
				<div className="flex-[0.55] ml-3">
					<h2 className="text-white font-medium text-5xl mb-6">
						{content.contentTitle}
					</h2>
					<div className="mb-7">
						<ul className="flex gap-1">
							{genre.map((item, index) => (
								<li
									key={index}
									className="text-gray_06 inline-block border border-gray_05 rounded font-semibold px-2"
								>
									{item.genreName}
								</li>
							))}
						</ul>
					</div>
					<div className="flex flex-row items-center gap-8 mb-7">
						<button className="flex items-center bg-white px-16 py-6 rounded">
							<img src={play} alt="시청하기" />
							<span className="ml-3 text-xl font-extrabold text-black">
								1화 시청하기
							</span>
						</button>
						<div className="text-white flex gap-8">
							<button>
								<img src={dibs} alt="찜하기" className="w-10" />
								<span>찜</span>
							</button>
							<button>
								<img src={share} alt="공유하기" className="w-10 fill-white" />
								<span>공유</span>
							</button>
						</div>
					</div>

					<p className="text-gray_07 font-semibold w-[70%] text-lg">
						{content.contentOverview}
					</p>
				</div>
				<div className="flex-[0.3] flex justify-center">
					<img
						src={content.src}
						alt={content.alt}
						className="h-[60vh] h-1420:h-[45vh] h-1920:h-[45vh] "
					/>
				</div>
			</div>

			<hr className="border-0 h-[1px] bg-gray_04 mx-12" />

			{/* 평점 영역 */}
			<div className="bg-black flex gap-4 mb-10">
				<div className="flex-grow-[0.2] ml-16 mt-10 relative">
					{isLoading ? (
						<Spinner />
					) : (
						<div className="flex items-center">
							<div className="text-6xl text-white font-extrabold mr-4 flex items-center">
								{reviewState.averageRating}
							</div>
							<div className="flex flex-col gap-2">
								<StarRating rating={reviewState.averageRating} />
								<p className="text-white">
									{reviewState.numberOfReviews}개 평점
								</p>
							</div>
						</div>
					)}

					<div className="flex items-start justify-between mt-8">
						<button
							onClick={openModal}
							className="border border-gray_05 hover:border-white text-white px-10 py-2 font-bold rounded-full"
						>
							리뷰 작성
						</button>

						<button
							className="text-white text-3xl font-bold modal-trigger mr-10"
							onClick={handleDotClick}
						>
							⋮
						</button>
					</div>
					<ChangeReview
						isOpen={isChangeModalOpen}
						onClose={closeChangeModal}
					></ChangeReview>
					<ReviewModal
						isOpen={isModalOpen}
						closeModal={closeModal}
					></ReviewModal>
				</div>

				<div className="flex flex-grow-[0.8] flex-col mb-24">
					<ul>
						<h3 className="text-white font-semibold mt-11">최신순</h3>

						{reviewState.review.length > 0 ? (
							reviewState.review.map((item, index) => (
								<li className="mt-11" key={index}>
									<Star starRating={item.rating}></Star>
									<p className="text-white mt-2 font-medium">{item.review}</p>
									<span className="mt-2 text-gray_07 text-sm">
										{item.profileName} • {item.ratingTime}{" "}
									</span>
								</li>
							))
						) : (
							<p className="text-gray_08 text-3xl mt-6 font-medium">
								등록된 리뷰가 없습니다.
							</p>
						)}
					</ul>
					{/* IntersectionObserver에 의해 관찰될 요소 */}
					<div id="observer"></div>
				</div>
			</div>
			<div ref={ref}></div>
			<Footer />
		</div>
	);
}

export default Detail;
