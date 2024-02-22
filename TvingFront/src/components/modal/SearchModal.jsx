import { useState, useEffect } from "react";
import search from "@/assets/search/icon_search_white.svg";
import Cookies from "js-cookie";
import { getData, postData } from "@/utils/crud";
import debounce from "lodash/debounce";
// import debounce from "@/utils/debounce";

function SearchModal({ visible, onClose }) {
  const [query, setQuery] = useState(""); // 입력 값을 상태로 관리

  const refresh = async () => {
    const reUrl = `http://hoyeonjigi.site/user/refresh`;

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Token": `${Cookies.get("accessToken")}`,
      "Refresh-Token": `${Cookies.get("refreshToken")}`,
    };

    const body = {};

    const response = await postData(reUrl, body, headers);

    if (response.success) {
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
    } else {
      console.log(response.message);
    }
  };

  if (!visible) return null;
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSearch = async () => {
    try {
      const baseUrl = "https://hoyeonjigi.site/content/";
      // const query = "영화";
      const encodedQuery = encodeURIComponent(query);
      const url = `${baseUrl}${encodedQuery}`;

      console.log(url);

      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `${type} ${token}`,
      };
      const result = await getData(url, headers);

      console.log(result);
    } catch (error) {
      console.error(`Error in sending get request: ${error}`);
      refresh();
    }
  };

  const debouncedHandleSearch = debounce(handleSearch, 500); // 디바운스 함수

  // const searchDebounce = debounce(handleSearch,500)

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedHandleSearch();
  };

  // useEffect(() => {
  //   if (query) {
  //     handleSearch();
  //   }
  // }, [query]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center bg-[#191919] h-[90%] translate-y-20 z-50"
      onClick={stopPropagation}
    >
      <label
        htmlFor="searchInput"
        className="w-[80%] flex border-b-2 border-b-white pb-1 mt-16"
      >
        <input
          type="text"
          placeholder="제목, 인물명을 입력해보세요."
          id="searchInput"
          value={query} // 입력 값을 상태로 관리
          onChange={handleChange} // 입력 값이 변경될 때마다 이벤트 핸들러 호출
          className="w-full h-16 bg-[#191919] text-white text-3xl placeholder:text-3xl placeholder:text-[#525252] placeholder:font-medium outline-none"
        />
        <button type="button">
          <img src={search} alt="검색 버튼" className="w-11" />
        </button>
      </label>
      <div className="h-16"></div>
      <div className="flex flex-row w-[80%]">
        <ul className="w-[50%] border-r-[1px] border-r-[#2e2e2e]">
          <li className="text-[#dedede] text-2xl font-medium mb-5">
            최근 검색어
          </li>
          <li className="text-[#dededeb2] text-xl font-medium">
            검색 내용이 없습니다.
          </li>
        </ul>
        <ul className="flex flex-col gap-4 w-[50%] pl-12 py-5">
          <h2 className="text-[#dedede] text-2xl font-bold mb-6">
            실시간 인기 검색어
          </h2>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">
                1
              </span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">
                이재, 곧 죽습니다
              </h3>
            </button>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default SearchModal;
