import { useState, useEffect, useRef, useCallback } from "react";
import search from "@/assets/search/icon_search_white.svg";
import Cookies from "js-cookie";
import { getData, postData } from "@/utils/crud";
import debounce from "lodash/debounce";
import useContents from "@/store/useContent";
import { Link } from "react-router-dom";
import { patchData } from "@/utils/crud";
import useDetail from "@/store/useDetail";
import checkError from "@/utils/checkError";
// import debounce from "@/utils/debounce";

function SearchModal({ visible, onClose }) {
  const [query, setQuery] = useState(""); // 입력 값을 상태로 관리
  const [data, setData] = useState("");
  const [searchContent, setSearchContent] = useState([]);
  // const [shouldSearch, setShouldSearch] = useState(false); // 검색이 필요한지 여부를 상태로 관리

  const { setContent } = useContents();
  const { isSearch, setIsSearch } = useDetail();

  const baseURL = `${import.meta.env.VITE_API_URL}`;

  // const handleItemClick = (item) => {
  //   setContent(item);
  // };

  const handleViewCount = async (contentId) => {
    const already = Cookies.get(`alreadyViewCookie${contentId}`);
    if (already) {
      console.log("이미있음");
      return;
    } else {
      const url = `${baseURL}/contents/${contentId}/view`;
      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      };

      const body = {};
      const response = await postData(url, body, headers);

      Cookies.set(`alreadyViewCookie${contentId}`, `${contentId}`, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      }); // 1일 후에 만료되는 쿠키
    }
  };

  const debouncedSearch = useRef(null);

  const handleSearch = useCallback(
    debounce(async (query) => {
      // handleSearch 함수 구현
      try {
        // const baseUrl = "https://hoyeonjigi.site/content/";

        setIsSearch(false);
        const encodedQuery = encodeURIComponent(query);
        // const url = `${baseUrl}${encodedQuery}`;

        const url = `${baseURL}/contents?title=${encodedQuery}`;

        // console.log(url);

        const type = Cookies.get("grantType");
        const token = Cookies.get("accessToken");

        const headers = {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          Authorization: `${type} ${token}`,
        };
        const result = await getData(url, headers);

        // result에 값이 있으면 그대로 저장하고, 없으면 빈 배열을 저장합니다.
        const searchData =
          result.content.length > 0
            ? result.content.map((item) => ({
                contentId: item.contentId,
                contentTitle: item.title.replace(/"/g, ""),
                contentOverview: item.overview.replace(/"/g, ""),
                genreIds: item.genreIds,
                src: `https://image.tmdb.org/t/p/original/${item.poster.replace(
                  /"/g,
                  ""
                )}`,
                alt: item.title.replace(/"/g, ""),
              }))
            : [];

        setSearchContent(searchData);
      } catch (error) {
        console.error(`Error in sending get request: ${error}`);
        // refresh();
      }
    }, 500),
    []
  );

  debouncedSearch.current = handleSearch;

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchContent([]); // 검색 결과 초기화
    debouncedSearch.current(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.current.cancel();
    };
  }, []);

  useEffect(() => {
    // 모달이 보일 때 body의 overflow를 hidden으로 설정
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫힐 때 원래대로 돌려놓음
      document.body.style.overflow = "unset";
    }

    // 컴포넌트가 언마운트 될 때 스크롤을 원래대로 돌려놓음
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]); // visible 상태가 변경될 때마다 실행


  useEffect(() => {
    checkError();
  }, []);

  if (!visible) return null;

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  

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
      {searchContent.length > 0 && query !== "" ? (
        <div className="w-[80%] mt-10" id="test1">
          <ul className="flex  gap-3 justify-start">
            {searchContent.slice(0, 6).map((item, index) => (
              <li key={index} className="w-48">
                <Link
                  to={{
                    pathname: `/main/detail/${item.contentId}`, // 절대 경로를 사용합니다.
                  }}
                  onClick={() => {
                    setContent(item);
                    onClose();
                    setQuery("");
                    setIsSearch(true);
                    handleViewCount(item.contentId);
                  }}
                >
                  <img
                    src={item.src}
                    alt={`${item.alt} 포스터 이미지`}
                    className="rounded h-72"
                  />
                  <p className="mt-2 font-semibold text-lg text-gray_06 truncate">
                    {item.alt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-row w-[80%]" id="test2">
          <ul className="w-[50%] border-r-[1px] border-r-[#2e2e2e] mt-20">
            <li className="text-[#dedede] text-2xl font-medium mb-5 mt-[22px]">
              최근 검색어
            </li>
            <li className="text-[#dededeb2] text-xl font-medium">
              검색 내용이 없습니다.
            </li>
          </ul>
          <ul className="flex flex-col gap-4 w-[50%] pl-12 py-5 mt-20">
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
            <li>
              <button>
                <span className="inline-block text-[#ff153c] text-xl w-10 text-left">
                  2
                </span>
                <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">
                  인사이드 아웃 2
                </h3>
              </button>
            </li>
            <li>
              <button>
                <span className="inline-block text-[#ff153c] text-xl w-10 text-left">
                  3
                </span>
                <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">
                  쿵푸팬더 4
                </h3>
              </button>
            </li>
            <li>
              <button>
                <span className="inline-block text-[#ff153c] text-xl w-10 text-left">
                  4
                </span>
                <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">
                  아이언맨 2
                </h3>
              </button>
            </li>
            <li>
              <button>
                <span className="inline-block text-[#ff153c] text-xl w-10 text-left">
                  5
                </span>
                <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">
                  위대한 수업
                </h3>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchModal;
