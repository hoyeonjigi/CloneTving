import { create } from "zustand";

const loginStore = (set) => ({
  accessToken: "",
  reToken: "",
  grantType: "",
  userId: "",
  userPassword: "",
  setAccessToken: (accessToken) => set({ accessToken }),
  setReToken: (reToken) => set({ reToken }),
  setUserId: (userId) => set({ userId }),
  setUserPassword: (userPassword) => set({ userPassword }),
  setGrantType: (grantType) => set({ grantType }),
});

const useLogin = create(loginStore);

export default useLogin;
