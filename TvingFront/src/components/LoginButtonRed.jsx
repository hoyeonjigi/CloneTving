import { Link } from "react-router-dom";

function LoginButtonRed() {
  return (
    <>
      <Link to="/SignIn">
        <button
          type="button"
          className="bg-brand w-[435px] py-5 font-bold text-2xl rounded"
        >
          티빙 로그인
        </button>
      </Link>
    </>
  );
}

export default LoginButtonRed;
