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

export const getCommentsByReviewId = (review_id) => {
  return reviewsApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const getUsers = () => {
  return reviewsApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const likeReview = (review_id) => {
  return reviewsApi
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then((res) => {
      return res.data.review;
    });
};

export const undoLikeReview = (review_id) => {
  return reviewsApi
    .patch(`/reviews/${review_id}`, { inc_votes: -1 })
    .then((res) => {
      return res.data.review;
    });
};
