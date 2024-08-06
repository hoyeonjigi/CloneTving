// import { create } from "zustand";

// const contentStore = (set) => ({
//   // contentId: "",
//   // contentTitle: "",
//   // contentOverview: "",
//   // genreIds: [],
//   content: {},
//   genre: [],

//   // setContentId: (contentId) => set({ contentId }),
//   // setContentTitle: (contentTitle) => set({ contentTitle }),
//   // setContentOverview: (contentOverview) => set({ contentOverview }),
//   // setGenreIds: (genreIds) => set({ genreIds }),
//   setContent: (content) => set({ content }),
//   setGenre: (genre) => set({ genre }),
// });

// const useContent = create(contentStore);

// export default useContent;

import { create } from "zustand";
// zustand/middleware에서 persist를 임포트합니다.
import { persist } from "zustand/middleware";

const contentsStore = (set) => ({
  content: {},
  genre: [],

  isRefresh: false,
  setContent: (content) => set({ content }),
  setGenre: (genre) => set({ genre }),
  setIsRefresh: (isRefresh) => set({ isRefresh }),
});

// create 함수를 호출할 때 persist 함수로 contentStore를 감싸줍니다.
// persist 함수는 첫 번째 파라미터로 스토어 설정을 받고, 두 번째 파라미터로 옵션 객체를 받습니다.
const useContents = create(
  persist(contentsStore, {
    name: "contents", // 로컬 스토리지에 저장될 때 사용될 키 이름입니다.
  })
);

export default useContents;
