import axios from "axios";

const reviewsApi = axios.create({
  baseURL: "https://tuxedo-frog.cyclic.app/api",
});

export const getReviews = (categoryQuery, sort_by, order) => {
  return reviewsApi
    .get("/reviews", { params: { category: categoryQuery, sort_by, order } })
    .then((res) => {
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

export const patchReview = (review_id, inc_votes) => {
  return reviewsApi
    .patch(`/reviews/${review_id}`, { inc_votes })
    .then((res) => {
      return res.data.review;
    });
};

export const postReview = (owner, title, review_body, designer, category) => {
  return reviewsApi
    .post("/reviews", { owner, title, review_body, designer, category })
    .then((res) => {
      return res.data.review;
    });
};

export const postComment = (review_id, user, body) => {
  return reviewsApi
    .post(`/reviews/${review_id}/comments`, { username: user, body: body })
    .then((res) => {
      return res.data.comment;
    });
};

export const getCategories = () => {
  return reviewsApi.get("/categories").then((res) => {
    return res.data.categories;
  });
};

export const deleteComment = (comment_id) => {
  return reviewsApi.delete(`/comments/${comment_id}`);
};

export const deleteReview = (review_id) => {
  return reviewsApi.delete(`/reviews/${review_id}`);
};
