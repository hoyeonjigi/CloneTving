import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";

function Header() {
  return (
    <>
      <Helmet>
        <title>TvingFront - Header</title>
      </Helmet>
      <div>
        <Link to="/main" className="inline-block w-[235px] h-[30px] px-14 py-8">
          <h1 className="sr-only">티빙</h1>
          <img src={Logo} alt="tving 메인으로 바로가기" />
        </Link>
      </div>
    </>
  );
}

export default Header;
