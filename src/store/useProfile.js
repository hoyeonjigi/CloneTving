import { create } from "zustand";
import { persist } from "zustand/middleware";

const createProfileStore = (set) => ({
  //선택한 이미지 정보
  profileName: "",
  userProfileUrl: "",
  profileId: "",
  child: "",
  evaluationId: "",

  setProfileName: (profileName) => set({ profileName }),
  setUserProfileUrl: (userProfileUrl) => set({ userProfileUrl }),
  setChild: (child) => set({ child }),
  setProfileId: (profileId) => set({ profileId }),
  setEvaluationId: (evaluationId) => set({ evaluationId }),
});

const useProfile = create(
  persist(createProfileStore, {
    name: "myProfile", // 로컬 스토리지에 저장될 때 사용될 키 이름입니다.
    // 여기서는 'content-storage'라는 이름으로 저장됩니다.
    // getStorage 함수를 제공하여 사용할 스토리지 타입을 지정할 수 있습니다.
    // 기본값은 localStorage입니다. sessionStorage를 사용하려면 아래와 같이 설정하세요.
    // getStorage: () => sessionStorage,
  })
);

export default useProfile;
