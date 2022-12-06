import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://tuxedo-frog.cyclic.app/api",
});

export const getReviews = () => {
  return reviewsApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};

export const getReviewById = (review_id) => {
  return reviewsApi.get(`/reviews/${review_id}`).then((res) => {
    return res.data.review;
  });
};
