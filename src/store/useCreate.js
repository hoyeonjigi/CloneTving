import { create } from "zustand";
import { persist } from "zustand/middleware";
const createProfileStore = (set) => ({
  //프로필 데이터
  // profileData: [],
  // profileImages: [],
  baseProfileImages: [],
  yumiProfileImages: [],

  //선택한 이미지 정보
  selectedImageName: "",
  selectedImageUrl: "",

  selectedImageId: 0,

  //이미지 선택 여부
  isImageSelected: false,

  // setProfileData : (profileData) => set({profileData}),
  // setProfileImages : (profileImages) => set({profileImages}),
  setBaseProfileImages: (baseProfileImages) => set({ baseProfileImages }),
  setYumiProfileImages: (yumiProfileImages) => set({ yumiProfileImages }),

  setSelectedImageName: (selectedImageName) => set({ selectedImageName }),
  setSelectedImageUrl: (selectedImageUrl) => set({ selectedImageUrl }),

  setSelectedImageId: (selectedImageId) => set({ selectedImageId }),

  setIsImageSelected: (isImageSelected) => set({ isImageSelected }),
});

const useCreate = create(
  persist(createProfileStore, {
    name: "profile", // 로컬 스토리지에 저장될 때 사용될 키 이름입니다.
    // 여기서는 'content-storage'라는 이름으로 저장됩니다.
    // getStorage 함수를 제공하여 사용할 스토리지 타입을 지정할 수 있습니다.
    // 기본값은 localStorage입니다. sessionStorage를 사용하려면 아래와 같이 설정하세요.
    // getStorage: () => sessionStorage,
  })
);

export default useCreate;

// import { create } from "zustand";
// // zustand/middleware에서 persist를 임포트합니다.
// import { persist } from "zustand/middleware";

// const contentsStore = (set) => ({
//   content: {},
//   genre: [],
//   setContent: (content) => set({ content }),
//   setGenre: (genre) => set({ genre }),
// });

// create 함수를 호출할 때 persist 함수로 contentStore를 감싸줍니다.
// persist 함수는 첫 번째 파라미터로 스토어 설정을 받고, 두 번째 파라미터로 옵션 객체를 받습니다.
// const useContents = create(
//   persist(contentsStore, {
//     name: "contents", // 로컬 스토리지에 저장될 때 사용될 키 이름입니다.
//     // 여기서는 'content-storage'라는 이름으로 저장됩니다.
//     // getStorage 함수를 제공하여 사용할 스토리지 타입을 지정할 수 있습니다.
//     // 기본값은 localStorage입니다. sessionStorage를 사용하려면 아래와 같이 설정하세요.
//     // getStorage: () => sessionStorage,
//   })
// );

// export default useContents;
