import { create } from "zustand";

const reviewStore = (set) => ({
  // contentId: "",
  // contentTitle: "",
  // contentOverview: "",
  // genreIds: [],
  review: {},

  // setContentId: (contentId) => set({ contentId }),
  // setContentTitle: (contentTitle) => set({ contentTitle }),
  // setContentOverview: (contentOverview) => set({ contentOverview }),
  // setGenreIds: (genreIds) => set({ genreIds }),
  setReview: (review) => set({ review }),
});

const useReview = create(reviewStore);

export default useReview;
