import facebook from "@/assets/SNS/Facebook.svg";
import instagram from "@/assets/SNS/Instagram.svg";
import twitter from "@/assets/SNS/Twitter.svg";
import youtube from "@/assets/SNS/Youtube.svg";

function Footer() {
  return (
    <div className="bg-black px-14">
      <nav className="py-5 border-t border-[#212121]">
        <ul className="flex flex-row gap-5 text-[#A3A3A3] font-semibold">
          <li className="hover:text-white">
            <a href="/" target="_blank" rel="noopener noreferrer">
              고객센터
            </a>
          </li>
          <li className="hover:text-white">
            <a href="/" target="_blank" rel="noopener noreferrer">
              이용약관
            </a>
          </li>
          <li className="hover:text-white">
            <a href="/" target="_blank" rel="noopener noreferrer">
              개인정보 처리방침
            </a>
          </li>
          <li className="hover:text-white">
            <a href="/" target="_blank" rel="noopener noreferrer">
              청소년 보호정책
            </a>
          </li>
          <li className="hover:text-white">
            <a href="/" target="_blank" rel="noopener noreferrer">
              법적고지
            </a>
          </li>
          <li className="hover:text-white">
            <a href="/" target="_blank" rel="noopener noreferrer">
              이벤트
            </a>
          </li>
          <li className="hover:text-white">
            <a href="/" target="_blank" rel="noopener noreferrer">
              인재채용
            </a>
          </li>
        </ul>
      </nav>
      <p className="flex flex-col text-[#6e6e6e] text-sm pb-6 gap-1">
        <span>
          대표이사 : 최주희<span className="text-xs"> | </span>{" "}
          <a href="/" className="underline hover:text-gray-100">
            사업자정보확인
          </a>
          <span className="text-xs"> | </span>사업자등록번호 : 188-88-01893{" "}
          <span className="text-xs"> | </span>
          통신판매신고번호 : 2020-서울마포-3641호
        </span>

        <span>
          사업장 : 서울특별시 마포구 상암산로 34, DMC디지털큐브 {"(상암동)"}{" "}
          <span className="text-xs"> | </span> 호스팅사업자 :
          씨제이올리브네트웍스{"(주)"}
        </span>

        <span>
          고객센터 {"(평일 09시~17시/점심시간 13시~14시)"}{" "}
          <span className="text-xs"> | </span>
          <a href="/" className="underline hover:text-gray-50">
            1:1 게시판 문의
          </a>
          <span className="text-xs"> | </span>대표메일 : tving@cj.net{" "}
          <span className="text-xs"> | </span>
          {"전화번호(ARS) : 1670-1525 (챗봇/채팅 상담 연결)"}
        </span>
        <span>
          ENM 시청자 상담실 {"(편성 문의 및 시청자 의견) : 080-080-0780"}{" "}
          <span className="text-xs"> | </span> Mnet 고객센터
          {"(방송편성문의) : 1855-1631"}
        </span>
      </p>
      <ul className="flex flex-row gap-3 pb-6">
        <li>
          <a
            href="https://www.youtube.com/c/TVING_official"
            className="hover:brightness-200"
          >
            <img src={youtube} className="hover:brightness-200"></img>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/tving.official">
            <img src={instagram}></img>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/tvingdotcom?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            <img src={twitter}></img>
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/CJTVING/?locale=ko_KR">
            <img src={facebook}></img>
          </a>
        </li>
      </ul>

      <p className="pb-36 text-sm text-[#6e6e6e]">
        Copyright &copy; 주식회사 티빙 All right reserved.
      </p>
    </div>
  );
}

export default Footer;
