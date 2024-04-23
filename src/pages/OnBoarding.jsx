import Footer from "@/components/Footer.jsx";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import logo_white from "@/assets/logo-white.svg";
import onboard from "@/assets/onBoarding/onboard.webp";
import LoginButtonRed from "@/components/LoginButtonRed";
import SlideTop from "@/components/onboarding/SlideTop";
import SlideBottom from "@/components/onboarding/SlideBottom";
import TvingOriginal from "@/components/onboarding/TvingOriginal";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { postData } from "@/utils/crud";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OnBoading() {
	const navigate = useNavigate();

	//쿠키에서 토큰값을 가져온다
	const accessToken = Cookies.get("accessToken");
	const refreshToken = Cookies.get("refreshToken");
	const isAutoLogin = Cookies.get("autoLogin");
	const userId = Cookies.get("userId");

	const autoLogin = () => {
		//accessToken이 존재하면 이동, refreshToken 존재 시 refresh 후 이동
		if (accessToken) {
			navigate("/user/profiles");
		} else if (refreshToken) {
			refresh();
			navigate("/user/profiles");
		} else;

		// try {
		// 	const url = "";
		// } catch (error) {}

		// if (refreshToken === null || refreshToken === "");
		// else if (accessToken !== null && accessToken !== "") {
		// 	navigate("/user/profiles");
		// }
	};

	const refresh = async () => {
		const url = "https://hoyeonjigi.site/user/refresh";
		const headers = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Token": `${Cookies.get("accessToken")}`,
			"Refresh-Token": `${Cookies.get("refreshToken")}`,
		};
		const body = {};

		const response = await postData(url, headers, body);
		//토큰 재설정
		Cookies.set("accessToken", response.accessToken, {
			secure: true,
			sameSite: "strict",
		});
		Cookies.set("refreshToken", response.refreshToken, {
			secure: true,
			sameSite: "strict",
		});
		Cookies.set("grantType", response.grantType, {
			secure: true,
			sameSite: "strict",
		});

		//자동 로그인 시 만료 시간 재설정
		if (isAutoLogin) {
			Cookies.set("autoLogin", true, {
				secure: true,
				sameSite: "strict",
				expires: 1,
			});
			Cookies.set("accessToken", response.accessToken, {
				secure: true,
				sameSite: "strict",
				expires: new Date(new Date().getTime() + 30 * 60 * 1000),
			});
			Cookies.set("refreshToken", response.refreshToken, {
				secure: true,
				sameSite: "strict",
				expires: 1,
			});
			Cookies.set("grantType", response.grantType, {
				secure: true,
				sameSite: "strict",
				expires: 1,
			});
			Cookies.set("userId", userId, {
				secure: true,
				sameSite: "strict",
				expires: 1,
			});
		}
	};

	useEffect(() => {
		localStorage.removeItem("isDataLoaded");
		localStorage.removeItem("contents");
		localStorage.removeItem("popularContent");
		localStorage.removeItem("latestDrama");
		localStorage.removeItem("romanceFilm");
		localStorage.removeItem("latestFilm");
		localStorage.removeItem("comedyDrama");
		localStorage.removeItem("reviews");
		localStorage.removeItem("profile");
		localStorage.removeItem("profileList");
		localStorage.removeItem("editProfile");
		autoLogin();
	}, []);
	return (
		<>
			<Helmet>
				<title>TvingFront - OnBoading</title>
			</Helmet>
			<div className="bg-black w-screen">
				<Header />

				<div>
					<section className="mb-80 relative" style={{ height: "80vh" }}>
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.9)), url(${onboard})`,
								backgroundSize: "cover",
								backgroundPosition: "center bottom",
								filter: "brightness(25%)",
							}}
						></div>

						<div className="relative flex flex-col justify-center items-center gap-5 text-white text-center text-4.5xl font-bold top-1/3">
							<p>티빙 오리지널부터</p>
							<p>드라마·예능, 영화, 해외시리즈까지!</p>
							<p className="mb-10">무제한으로 스트리밍해 보세요.</p>

							<LoginButtonRed />
						</div>
					</section>

					<section>
						<div className="flex flex-col items-center mb-12">
							<p className="text-white text-5xl font-bold mb-6">
								티빙 오리지널 시리즈
							</p>
							<p className="text-onboard text-2.5xl font-semibold mb-1">
								오직 티빙에서만 만날 수 있는
							</p>
							<p className="text-onboard text-2.5xl font-semibold mb-1">
								오리지널 콘텐츠를 감상해 보세요.
							</p>
						</div>
						<TvingOriginal />
					</section>

					<section className="mb-40">
						<div className="flex flex-col items-center text-center mb-12">
							<p className="text-white text-5xl font-bold mb-6">
								요즘 뜨는 모든 콘텐츠
							</p>
							<p className="text-onboard text-2.5xl font-semibold mb-1">
								tvN·JTBC·Mnet 프로그램, 영화, 해외 시리즈,
							</p>
							<p className="text-onboard text-2.5xl font-semibold mb-1">
								파라마운트+ 오리지널 및 독점 시리즈
							</p>
						</div>
						<SlideTop />
						<SlideBottom />
					</section>
					<section
						id="scroll-section-1"
						className="flex flex-col px-56 justify-center items-center mb-28 relative text-center"
					>
						<div className="mb-14">
							<p className="text-white text-5xl font-bold mb-6">
								언제 어디서나 본방 사수
							</p>
							<p className="text-onboard text-2.5xl font-semibold mb-1">
								본방 시작 5분 만에 Quick VOD로 빠르게 다시 보고,
							</p>
							<p className="text-onboard text-2.5xl font-semibold">
								놓친 방송은 타임머신으로 돌려보세요.
							</p>
						</div>
						<video
							src="https://image.tving.com/ntgs/operation/onboard/2023/10/25/1698197889_1.mp4"
							type="video/mp4"
							muted
							playsInline
							autoPlay
							loop
							className="w-[41%]"
						></video>
						<img
							src="https://image.tving.com/ntgs/operation/onboard/2023/10/25/1698197820_1.png"
							alt="똑똑하게 보는 재미 소개 영상"
							className="w-[36%] absolute bottom-0"
						/>
					</section>

					<section className="flex flex-col justify-center items-center text-white text-center">
						<div className="mb-16 flex flex-col flex-nowrap">
							<p className="text-white text-5xl font-bold mb-6">
								원하는 기기로 자유롭게 감상
							</p>
							<p className="text-onboard text-2.5xl font-semibold mb-1">
								스마트폰, 태블릿, PC, TV까지!
							</p>
							<p className="text-onboard text-2.5xl font-semibold">
								최대 4인 멀티 프로필로 가족, 친구와 함께 감상해 보세요.
							</p>
						</div>
						<video
							src="https://image.tving.com/ntgs/operation/onboard/2023/10/25/1698197625_1.mp4"
							type="video/mp4"
							muted
							playsInline
							autoPlay
							loop
							className="w-[58%]"
						></video>
					</section>

					<section className="flex flex-col items-center text-white gap-5 mt-72 mb-72">
						<img
							src={logo_white}
							alt="티빙 지금 시작해보세요"
							className="w-[13%]"
						/>
						<h2 className="text-4.5xl font-bold mb-5">지금 시작해보세요</h2>

						<LoginButtonRed />
					</section>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default OnBoading;
