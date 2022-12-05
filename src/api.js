import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://tuxedo-frog.cyclic.app/api",
});

export const getReviews = () => {
  return reviewsApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};
