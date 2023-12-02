import Footer from "@/components/Footer.jsx";
import Header from "@/components/Header";
import React from "react";
import { Helmet } from "react-helmet-async";


function OnBoading() {
  return (
    <>
      <Helmet>
        <title>TvingFront - OnBoading</title>
      </Helmet>
      <div className="bg-black">
        <Header />

        <div className="flex flex-col px-56 justify-center items-center">
          <div>
            <p>언제 어디서나 본방 사수</p>
            <p>본방 시작 5분 만에 Quick VOD로 빠르게 다시 보고,</p>
            <p>놓친 방송은 타임머신으로 돌려보세요.</p>
          </div>

          <video
            src="https://image.tving.com/ntgs/operation/onboard/2023/10/25/1698197889_1.mp4"
            type="video/mp4"
            muted
            playsInline
            autoPlay
            loop
            className="first in w-[500px]"
          ></video>
          <img
            src="https://image.tving.com/ntgs/operation/onboard/2023/10/25/1698197820_1.png"
            alt="똑똑하게 보는 재미 소개 영상"
            className="w-[580px]"
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default OnBoading;
