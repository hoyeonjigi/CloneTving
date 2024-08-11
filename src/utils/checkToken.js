//

// utils/tokenUtils.js
import { postData } from "@/utils/crud";
import Cookies from "js-cookie";

const checkToken = async () => {
  const url = `${import.meta.env.VITE_API_URL}/member/reissue`;

  const type = Cookies.get("grantType");
  const refreshToken = Cookies.get("refreshToken");

  const headers = {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
    "Refresh-Token": `${refreshToken}`,
  };

  const data = {};

  console.log(refreshToken);
  try {
    const response = await postData(url, data, headers);

    console.log(response);

    Cookies.set("accessToken", response.accessToken, {
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("refreshToken", response.refreshToken, {
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("grantType", "Bearer", {
      secure: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.log("Token refresh failed:", error.response);

    // // 에러 발생 시 토큰 삭제
    // Cookies.remove("accessToken");
    // Cookies.remove("refreshToken");
    // Cookies.remove("grantType");

    throw error; // 에러를 다시 던져서 호출자에게 알림
  }
};

export default checkToken;
