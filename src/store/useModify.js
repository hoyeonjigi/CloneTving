import { create } from "zustand";
// zustand/middleware에서 persist를 임포트합니다.
import { persist } from "zustand/middleware";

const modifyStore = (set) => ({
  Modifytate: {
    review: [],
  },
  setModifytate: (newState) =>
    set((state) => ({
      Modifytate: {
        ...state.Modifytate,
        ...newState,
      },
    })),

});

// create 함수를 호출할 때 persist 함수로 contentStore를 감싸줍니다.
// persist 함수는 첫 번째 파라미터로 스토어 설정을 받고, 두 번째 파라미터로 옵션 객체를 받습니다.
const useModify = create(
  persist(modifyStore, {
    name: "modify", // 로컬 스토리지에 저장될 때 사용될 키 이름입니다.
    // 여기서는 'content-storage'라는 이름으로 저장됩니다.
    // getStorage 함수를 제공하여 사용할 스토리지 타입을 지정할 수 있습니다.
    // 기본값은 localStorage입니다. sessionStorage를 사용하려면 아래와 같이 설정하세요.
    // getStorage: () => sessionStorage,
  })
);

// 상태를 초기화하고 로컬 스토리지에서 해당 항목을 삭제하는 함수

export default useModify;
