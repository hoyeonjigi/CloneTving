import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@/style/swal2.css";
import 'animate.css';

const MySwal = withReactContent(Swal);

function LogoutButton() {
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
      customClass:"swal2-btn",
      
    }).then((result) => {
      if (result.isConfirmed) {
        // 로그아웃 처리를 하는 코드를 여기에 작성합니다.
        // 예를 들어, session 또는 localStorage에서 사용자 정보를 삭제하는 등의 작업을 수행할 수 있습니다.
      }
    });
  };

  return <button onClick={onLogout}>로그아웃</button>;
}

export default LogoutButton;
