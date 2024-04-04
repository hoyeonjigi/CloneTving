import { create } from "zustand";

const contentStore = (set) => ({
  // contentId: "",
  // contentTitle: "",
  // contentOverview: "",
  // genreIds: [],
  content: {},
  genre: [],

  // setContentId: (contentId) => set({ contentId }),
  // setContentTitle: (contentTitle) => set({ contentTitle }),
  // setContentOverview: (contentOverview) => set({ contentOverview }),
  // setGenreIds: (genreIds) => set({ genreIds }),
  setContent: (content) => set({ content }),
  setGenre: (genre) => set({ genre }),
});

const useContent = create(contentStore);

export default useContent;
