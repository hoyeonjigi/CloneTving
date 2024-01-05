import React from "react";
import search from "@/assets/search/icon_search_white.svg"

function SearchModal({ visible, onClose }) {
  if (!visible) return null;
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center bg-[#191919] h-[90%] translate-y-20"
      onClick={stopPropagation}
    >
      <label htmlFor="searchInput" className="w-[80%] flex border-b-2 border-b-white pb-1 mt-16">
        <input type="text" placeholder="제목, 인물명을 입력해보세요." id="searchInput" className="w-full h-16 bg-[#191919] text-white text-3xl placeholder:text-3xl placeholder:text-[#525252] placeholder:font-medium outline-none" />
        <button type="button"><img src={search} alt="검색 버튼"  className="w-11"/></button>
      </label>
      <div className="h-16">

        
      </div>
      <div className="flex flex-row w-[80%]">
        <ul className="w-[50%] border-r-[1px] border-r-[#2e2e2e]">
          <li className="text-[#dedede] text-2xl font-medium mb-5">최근 검색어</li>
          <li className="text-[#dededeb2] text-xl font-medium">검색 내용이 없습니다.</li>
        </ul>
        <ul className="flex flex-col gap-4 w-[50%] pl-12 py-5">
          <h2 className="text-[#dedede] text-2xl font-bold mb-6">실시간 인기 검색어</h2>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">1</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">이재, 곧 죽습니다</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">2</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">내 남편과 결혼해줘</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">3</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">환승연애3</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">4</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">최강야구</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">5</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">장사천재 백사장2</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">6</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">짱구는못말려23</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">7</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">웰컴투 삼달리</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">8</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">환승연애2</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">9</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">마에스트라</h3>
            </button>
          </li>
          <li>
            <button>
              <span className="inline-block text-[#ff153c] text-xl w-10 text-left">10</span>
              <h3 className="inline-block text-[#dededeb2] text-xl hover:text-[#dedede]">뭉쳐야 찬다3</h3>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchModal;
