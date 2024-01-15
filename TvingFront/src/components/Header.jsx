import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";

function Header() {
  return (
    <>
      <Helmet>
        <title>TvingFront - Header</title>
      </Helmet>

      {/* onboarding과 main의 header를 구별해줘야함 */}
      <div className="py-6 px-16">
        <Link to="/" className="inline-block w-[120px]">
          <h1 className="sr-only">티빙</h1>
          <img src={Logo} alt="tving 메인으로 바로가기"  className="top-1"/>
        </Link>
      </div>
    </>
  );
}

export default Header;
