// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { patchData, deleteData, postData, getData } from "@/utils/crud";
// import useEdit from "@/store/useEdit";
// import useCreate from "@/store/useCreate";
// import UserProfileModal from "@/components/modal/UserProfileModal";
// import profileEdit from "@/assets/profiles/icon-edit.svg";
// import { useNavigate } from "react-router-dom";
// import checkIcon from "@/assets/profiles/icon-circle.svg";

// import { motion } from "framer-motion";
// import useProfile from "@/store/useProfile";

// function ProfileForEditDetail() {
//   const {
//     profileId,
//     profileName,
//     imageName,
//     userProfileUrl,
//     child,
//     imageId,

//     setProfileName,
//     setImageName,
//     setUserProfileUrl,
//     setChild,
//     setImageId,
//   } = useEdit();

//   const {
//     myImageId,
//     myProfileName,
//     myProfileUrl,
//     myChild,
//     myProfileId,
//     myChange,
//     myEvaluationId,
//     setMyImageId,
//     setMyChange,
//     reset,
//   } = useProfile();

//   const {
//     selectedImageName,
//     selectedImageUrl,
//     isImageSelected,
//     selectedImageId,
//     profileData,
//   } = useCreate();

//   const [updateProfileName, setUpdateProfileName] = useState(profileName);
//   const [currentProfile, setCurrentProfile] = useState({
//     src: userProfileUrl,
//     alt: "사용자 프로필 이미지",
//   });
//   // const userId = Cookies.get("userId");
//   // const isAutoLogin = Cookies.get("autoLogin");

//   //모달 창 관리 state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // 모달 창을 여는 함수
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   // 모달 창을 닫는 함수
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   //페이지 이동 함수
//   const navigate = useNavigate();

//   const handleNameChange = (e) => {
//     const inputName = e.target.value;
//     setUpdateProfileName(inputName);

//     const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

//     if (!regex.test(inputName) && inputName.length > 0) {
//       setUpdateProfileName(inputName.substring(0, inputName.length - 1));
//     }
//   };

//   //어린이 여부 확인
//   const handleChild = () => {
//     setChild(!child);
//   };

//   //프로필 수정 로직
//   const handleChange = async (e) => {
//     e.preventDefault();
//     try {
//       let url = "";
//       if (myProfileId) {
//         url = `${import.meta.env.VITE_API_URL}/profiles/${myProfileId}`;
//       } else {
//         url = `${import.meta.env.VITE_API_URL}/profiles/${profileId}`;
//       }

//       const type = Cookies.get("grantType");
//       const token = Cookies.get("accessToken");

//       const headers = {
//         "Content-Type": "application/json",
//         // "Access-Control-Allow-Origin": "*",
//         Authorization: `${type} ${token}`,
//       };

//       //기존 이름과 변경한 이름이 동일한 경우
//       let data = {};

//       if (myImageId) {
//         // setUpdateProfileName(myProfileName);

//         if (updateProfileName === myProfileName) {
//           if (isImageSelected) {
//             data = {
//               profileName: profileName,
//               profileImgId: selectedImageId,
//               child: child,
//             };
//           } else {
//             data = {
//               profileName: profileName,
//               profileImgId: myImageId,
//               child: child,
//             };
//           }
//         } else {
//           data = {
//             profileName: updateProfileName,
//             profileImgId: selectedImageId,
//             child: child,
//           };
//         }
//       } else {
//         if (updateProfileName === profileName) {
//           if (isImageSelected) {
//             data = {
//               profileName: profileName,
//               profileImgId: selectedImageId,
//               child: child,
//             };
//           } else {
//             data = {
//               profileName: profileName,
//               profileImgId: imageId,
//               child: child,
//             };
//           }
//         } else {
//           data = {
//             profileName: updateProfileName,
//             profileImgId: selectedImageId,
//             child: child,
//           };
//         }
//       }

//       const result = await patchData(url, data, headers);
//       setMyChange(false);
//       reset();

//       // console.log(`프로필 수정 완료`);
//       navigate("/user/profiles");
//     } catch (error) {
//       console.log(error);
//       console.log("프로필 수정 에러");
//     }
//   };

//   // console.log(selectedImageId)
//   //프로필 삭제 로직
//   const handleDelete = async (e) => {
//     e.preventDefault();

//     try {
//       let url = "";

//       if (myProfileId) {
//         url = `${import.meta.env.VITE_API_URL}/profiles/${myProfileId}`;
//       } else {
//         url = `${import.meta.env.VITE_API_URL}/profiles/${profileId}`;
//       }
//       // const testUrl = `${import.meta.env.VITE_API_URL}/profiles/${profileId}`;
//       const type = Cookies.get("grantType");
//       const token = Cookies.get("accessToken");

//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `${type} ${token}`,
//       };

//       const result = await deleteData(url, headers);
//       setMyChange(false);
//       reset();
//       // console.log(result);
//       navigate("/user/profiles");
//     } catch (error) {
//       console.log(error);
//       console.log("에러출력");
//     }
//   };

//   useEffect(() => {
//     // const randomIndex = Math.floor(Math.random() * profiles.length);
//     // setCurrentProfile(profiles[randomIndex]);
//     // setCurrentProfile()

//     profileData.map((item) => {
//       if (item.image_url === userProfileUrl) {
//         setImageId(item.profileImageId);
//       }

//       if (myProfileUrl) {
//         if (item.image_url === myProfileUrl) {
//           setMyImageId(item.profileImageId);
//         }
//       }

//       return null; // map 함수에서 반드시 반환값을 제공해야 합니다.
//     });

//     if (isImageSelected) {
//       setCurrentProfile({
//         src: selectedImageUrl,
//         alt: "대체 이미지",
//         // selectedImageName: selectedImageName,
//       });
//       // setImageName(selectedImageName);
//     }
//   }, [selectedImageUrl]);

//   useEffect(() => {
//     if (!myChange) {
//       localStorage.removeItem("myProfile");
//       return;
//     } else {
//       if (myProfileId) {
//         setUpdateProfileName(myProfileName);
//         setCurrentProfile({
//           src: myProfileUrl,
//           alt: "유저 프로필 이미지",
//           // selectedImageName: selectedImageName,
//         });
//       }
//       // setMyChange(false);
//     }
//   }, [myChange]);

//   return (
//     <div className="bg-black font-noto">
//       <Helmet>
//         <title>프로필 편집</title>
//       </Helmet>

//       <Header />

//       <div className="flex flex-col items-center justify-center md-h lg-h">
//         <h3 className="text-white text-4xl font-bold mt-24 mb-12">
//           프로필 편집
//         </h3>

//         <form className="flex flex-col items-center">
//           <motion.button
//             className="w-[40%] overflow-hidden relative flex items-center justify-center"
//             whileHover={{ y: -15 }} // 마우스 호버 시 y축으로 -10 이동
//             transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
//             onClick={openModal}
//             type="button"
//           >
//             <img
//               src={currentProfile.src}
//               alt={currentProfile.alt}
//               className="w-full h-auto "
//             />
//             <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
//             <img
//               src={profileEdit}
//               alt="프로필 편집 아이콘"
//               className="absolute w-[25%] h-auto top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//             />
//           </motion.button>

//           <UserProfileModal
//             isOpen={isModalOpen}
//             closeModal={closeModal}
//           ></UserProfileModal>

//           <div className="w-full mt-12">
//             <label htmlFor="name" className="sr-only">
//               사용자 프로필 이름
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="bg-[#191919] w-full focus:border-red-700 text-white px-5 py-4 rounded-sm placeholder:text-[#4d4d4d] text-xl"
//               placeholder="프로필 이름"
//               defaultValue={updateProfileName}
//               onChange={handleNameChange}
//               minLength={2}
//               maxLength={10}
//             />
//             <p className="text-[#808080] text-sm font-medium mt-2 mb-8">
//               * 2자 이상 10자 이내의 한글, 영문, 숫자 입력 가능합니다.
//             </p>
//           </div>

//           <hr className="border border-[#191919] mb-5 w-full" />

//           <div className="flex flex-row justify-between w-full mb-5 items-center">
//             <div className="text-[#B3B3B3] text-base">어린이인가요?</div>
//             <button
//               type="button"
//               className={`${
//                 child ? "bg-[#008FE7]" : "bg-[#6E6E6E]"
//               } rounded-full w-10 h-6 relative`}
//               onClick={handleChild}
//             >
//               <img
//                 src={checkIcon}
//                 className={`absolute w-[18px] top-1/2 ${
//                   child ? "left-7" : "left-3"
//                 } transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out`}
//                 alt="어린이 여부"
//               />
//             </button>
//           </div>

//           <hr className="border border-[#191919] mb-14 w-full" />

//           <div className="flex flex-row gap-3 mb-56">
//             <button
//               className="px-[4rem] py-5 font-bold text-1.5xl bg-[#dedede] text-black  rounded hover:bg-white"
//               onClick={handleChange}
//             >
//               확인
//             </button>
//             <Link to="/profilesForEdit">
//               <button className="px-[4rem] py-5 font-normal text-1.5xl  text-btnText border border-btnBorder rounded hover:text-[#dedede] hover:border-[#888888]">
//                 취소
//               </button>
//             </Link>
//             <button
//               className="px-[2rem] py-5 font-normal text-1.5xl  text-btnText border border-btnBorder rounded hover:text-[#dedede] hover:border-[#888888]"
//               onClick={handleDelete}
//             >
//               프로필 삭제
//             </button>
//           </div>
//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default ProfileForEditDetail;

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { patchData, deleteData } from "@/utils/crud";
import useEdit from "@/store/useEdit";
import useCreate from "@/store/useCreate";
import useProfile from "@/store/useProfile";
import UserProfileModal from "@/components/modal/UserProfileModal";
import profileEdit from "@/assets/profiles/icon-edit.svg";
import checkIcon from "@/assets/profiles/icon-circle.svg";
import { motion } from "framer-motion";
import checkError from "@/utils/checkError";

function ProfileForEditDetail() {
  const {
    profileId,
    profileName,
    imageName,
    userProfileUrl,
    child,
    imageId,

    setProfileName,
    setImageName,
    setUserProfileUrl,
    setChild,
    setImageId,
  } = useEdit();

  const {
    myImageId,
    myProfileName,
    myProfileUrl,
    myChild,
    myProfileId,
    myChange,
    myEvaluationId,
    setMyImageId,
    setMyChange,
    reset,
  } = useProfile();

  const {
    selectedImageName,
    selectedImageUrl,
    isImageSelected,
    selectedImageId,
    profileData,
  } = useCreate();

  const [updateProfileName, setUpdateProfileName] = useState(profileName);
  const [currentProfile, setCurrentProfile] = useState({
    src: userProfileUrl,
    alt: "사용자 프로필 이미지",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 모달 창을 여는 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 창을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setUpdateProfileName(inputName);

    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

    if (!regex.test(inputName) && inputName.length > 0) {
      setUpdateProfileName(inputName.substring(0, inputName.length - 1));
    }
  };

  // 어린이 여부 확인
  const handleChild = () => {
    setChild(!child);
  };

  // myProfileId가 있을 때의 프로필 수정 로직
  const handleMyProfileChange = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/profiles/${myProfileId}`;

      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      };

      let data = {};

      if (updateProfileName === myProfileName) {
        data = {
          profileName: myProfileName,
          profileImgId: isImageSelected ? selectedImageId : myImageId,
          child: myChild,
        };
      } else {
        data = {
          profileName: updateProfileName,
          profileImgId: isImageSelected ? selectedImageId : myImageId,
          child: myChild,
        };
      }

      await patchData(url, data, headers);
      setMyChange(false);
      reset();

      navigate("/user/profiles");
    } catch (error) {
      console.error("프로필 수정 에러:", error);
    }
  };

  // myProfileId가 없을 때의 프로필 수정 로직
  const handleDefaultProfileChange = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/profiles/${profileId}`;

      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      };

      let data = {};

      if (updateProfileName === profileName) {
        data = {
          profileName: profileName,
          profileImgId: isImageSelected ? selectedImageId : imageId,
          child: child,
        };
      } else {
        data = {
          profileName: updateProfileName,
          profileImgId: isImageSelected ? selectedImageId : imageId,
          child: child,
        };
      }

      await patchData(url, data, headers);
      navigate("/user/profiles");
    } catch (error) {
      console.error("프로필 수정 에러:", error);
    }
  };

  // myProfileId가 있을 때의 프로필 삭제 로직
  const handleMyProfileDelete = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/profiles/${myProfileId}`;

      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      };

      await deleteData(url, headers);
      setMyChange(false);
      reset();

      navigate("/user/profiles");
    } catch (error) {
      console.error("프로필 삭제 에러:", error);
    }
  };

  // myProfileId가 없을 때의 프로필 삭제 로직
  const handleDefaultProfileDelete = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/profiles/${profileId}`;

      const type = Cookies.get("grantType");
      const token = Cookies.get("accessToken");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `${type} ${token}`,
      };

      await deleteData(url, headers);

      navigate("/user/profiles");
    } catch (error) {
      console.error("프로필 삭제 에러:", error);
    }
  };

  // 확인 버튼 클릭 시 실행되는 함수
  const handleChange = (e) => {
    e.preventDefault();
    if (myProfileId) {
      handleMyProfileChange();
    } else {
      handleDefaultProfileChange();
    }
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDelete = (e) => {
    e.preventDefault();
    if (myProfileId) {
      handleMyProfileDelete();
    } else {
      handleDefaultProfileDelete();
    }
  };

  useEffect(() => {
    profileData.forEach((item) => {
      if (item.image_url === userProfileUrl) {
        setImageId(item.profileImageId);
      }

      if (myProfileUrl && item.image_url === myProfileUrl) {
        setMyImageId(item.profileImageId);
      }
    });

    if (isImageSelected) {
      setCurrentProfile({
        src: selectedImageUrl,
        alt: "대체 이미지",
      });
    }
  }, [selectedImageUrl]);

  useEffect(() => {
    if (!myChange) {
      localStorage.removeItem("myProfile");
    } else {
      if (myProfileId) {
        setUpdateProfileName(myProfileName);
        setCurrentProfile({
          src: myProfileUrl,
          alt: "유저 프로필 이미지",
        });
      }
    }
  }, [myChange]);

  const defaultName = myProfileId ? myProfileName : updateProfileName;
  // useEffect(() => {
  //   // myProfileId가 있을 경우 updateProfileName 대신 myProfileName을 사용
  //   if (myProfileId) {
  //     setUpdateProfileName(myProfileName);
  //   } else {
  //     setUpdateProfileName(profileName);
  //   }
  // }, [myProfileId, myProfileName, updateProfileName]);

  useEffect(() => {
    checkError();
  }, []);

  return (
    <div className="bg-black font-noto">
      <Helmet>
        <title>프로필 편집</title>
      </Helmet>

      <Header />

      <div className="flex flex-col items-center justify-center md-h lg-h">
        <h3 className="text-white text-4xl font-bold mt-24 mb-12">
          프로필 편집
        </h3>

        <form className="flex flex-col items-center">
          <motion.button
            className="w-[40%] overflow-hidden relative flex items-center justify-center"
            whileHover={{ y: -15 }}
            transition={{ type: "tween", stiffness: 300, duration: 0.2 }}
            onClick={openModal}
            type="button"
          >
            <img
              src={currentProfile.src}
              alt={currentProfile.alt}
              className="w-full h-auto "
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <img
              src={profileEdit}
              alt="프로필 편집 아이콘"
              className="absolute w-[25%] h-auto top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </motion.button>

          <UserProfileModal isOpen={isModalOpen} closeModal={closeModal} />

          <div className="w-full mt-12">
            <label htmlFor="name" className="sr-only">
              사용자 프로필 이름
            </label>
            <input
              type="text"
              id="name"
              className="bg-[#191919] w-full focus:border-red-700 text-white px-5 py-4 rounded-sm placeholder:text-[#4d4d4d] text-xl"
              placeholder="프로필 이름"
              defaultValue={defaultName}
              onChange={handleNameChange}
              minLength={2}
              maxLength={10}
            />
          </div>

          <div className="w-full flex justify-between items-center my-10">
            <h4 className="text-white text-2xl">어린이인가요?</h4>
            <button
              type="button"
              className={`${
                child ? "bg-[#008FE7]" : "bg-[#6E6E6E]"
              } rounded-full w-10 h-6 relative`}
              onClick={handleChild}
            >
              <img
                src={checkIcon}
                className={`absolute w-[18px] top-1/2 ${
                  child ? "left-7" : "left-3"
                } transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out`}
                alt="어린이 여부"
              />
            </button>
          </div>

          <hr className="border border-[#191919] mb-14 w-full" />

          <div className="flex flex-row gap-3 mb-56">
            <button
              className="px-[4rem] py-5 font-bold text-1.5xl bg-[#dedede] text-black  rounded hover:bg-white"
              onClick={handleChange}
            >
              확인
            </button>
            <Link to="/profilesForEdit">
              <button className="px-[4rem] py-5 font-normal text-1.5xl  text-btnText border border-btnBorder rounded hover:text-[#dedede] hover:border-[#888888]">
                취소
              </button>
            </Link>
            <button
              className="px-[2rem] py-5 font-normal text-1.5xl  text-btnText border border-btnBorder rounded hover:text-[#dedede] hover:border-[#888888]"
              onClick={handleDelete}
            >
              프로필 삭제
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default ProfileForEditDetail;
