import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@/style/swal2.css";
import "animate.css";
import { useNavigate } from "react-router-dom"; // useNavigate를 임포트합니다.
import Cookies from "js-cookie";

const MySwal = withReactContent(Swal);

function LogoutButton() {
	const navigate = useNavigate();
	const onLogout = () => {
		MySwal.fire({
			title: "로그아웃 하시겠습니까?",
			showCancelButton: true,
			showClass: {
				popup: "animate__animated animate__zoomInBounce", // 등장 애니메이션
			},
			hideClass: {
				popup: "animate__animated animate__fadeOut", // 사라짐 애니메이션
			},
			confirmButtonText: "확인",
			cancelButtonText: "취소",
			customClass: "swal2-btn",
		}).then((result) => {
			if (result.isConfirmed) {
				localStorage.removeItem("isDataLoaded");
				localStorage.removeItem("popularContent");
				localStorage.removeItem("grantType");
				localStorage.removeItem("accessToken");
				localStorage.removeItem("latestDrama");
				localStorage.removeItem("romanceFilm");
				localStorage.removeItem("latestFilm");
				localStorage.removeItem("comedyDrama");
				localStorage.removeItem("myProfile");
				localStorage.removeItem("profile");
				localStorage.removeItem("profileList");
				Cookies.remove("autoLogin");
				Cookies.remove("userId");
				Cookies.remove("grantType");
				Cookies.remove("accessToken");
				Cookies.remove("refreshToken");

				navigate("/"); // 로그아웃 처리 후, 온보딩 페이지로 이동합니다.
				// 로그아웃 처리를 하는 코드를 여기에 작성합니다.
				// 예를 들어, session 또는 localStorage에서 사용자 정보를 삭제하는 등의 작업을 수행할 수 있습니다.
			}
		});
	};

	return <button onClick={onLogout}>로그아웃</button>;
}

export default LogoutButton;
