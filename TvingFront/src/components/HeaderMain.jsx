import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.svg";
import { useState } from "react";

import search from "@/assets/search/icon_search.svg";
import searchHover from "@/assets/search/icon_search_white.svg";

import close from "@/assets/search/x.svg";
import closeHover from "@/assets/search/x_white.svg";
import myProfile from "@/assets/profiles/profile_s1.webp";
import SearchModal from "./SearchModal";

function HeaderMain() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false); // 추가된 코드

  const handleSearchClick = () => {
    // 추가된 코드
    setIsSearchClicked((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>TvingFront - Header</title>
      </Helmet>

      {/* onboarding과 main의 header를 구별해줘야함 */}
      <div className="py-6 px-16 bg-black flex flex-row items-center justify-between">
        <div className="flex flex-row">
          <Link to="/main" className="inline-block w-[120px]">
            <h1 className="sr-only">티빙</h1>
            <img src={Logo} alt="tving 메인으로 바로가기" className="top-1" />
          </Link>
          <ul className="text-[#d9d9d9] text-lg flex flex-row gap-8 ml-8 font-medium">
            <li className="hover:text-white">
              <Link to="/main">시리즈</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/main">영화</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/main">라이브</Link>
            </li>
            <li className="hover:text-white">
              <Link to="/main">파라마운트+</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-row">
          <button
            className="mr-9 w-8"
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={handleSearchClick}
          >
            {isSearchClicked ? (
              <img src={isHovered ? closeHover : close} alt="닫기 버튼" />
            ) : (
              <img src={isHovered ? searchHover : search} alt="검색 버튼" />
            )}
          </button>
          <button>
            <img src={myProfile} alt="" className="w-8" />
          </button>
        </div>
        
      </div>
      <SearchModal visible={isSearchClicked} onClose={handleSearchClick}/>
    </>
  );
}

export default HeaderMain;
