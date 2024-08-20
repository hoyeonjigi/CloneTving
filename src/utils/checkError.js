//

// utils/tokenUtils.js
import { getData, postData } from "@/utils/crud";
import Cookies from "js-cookie";

const checkError = async () => {
  try {
    const profileUrl = `${import.meta.env.VITE_API_URL}/profileImages`;
    const type = Cookies.get("grantType");
    const token = Cookies.get("accessToken");
    const headers = {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      Authorization: `${type} ${token}`,
    };

    const result = await getData(profileUrl, headers);

    // console.log(result);
  } catch (error) {
    checkToken();
    console.error(`Error in sending POST request: ${error}`);
  }
};

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

  try {
    const response = await postData(url, data, headers);

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

    // return response;
    window.location.reload();
  } catch (error) {
    console.log("Token refresh failed:", error.response);

    throw error; // 에러를 다시 던져서 호출자에게 알림
  }
};

export default checkError;
