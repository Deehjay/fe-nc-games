import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteReview, getReviews } from "../api";
import { UserContext } from "../contexts/users";
import { formatDate } from "../utils/utils";
import Modal from "react-modal";
import LoginPrompt from "./LoginPrompt";

const User = () => {
  let subtitle;
  const [reviews, setReviews] = useState([]);
  const { user, isLoggedIn } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    setIsLoading(true);
    getReviews().then((reviewsFromApi) => {
      const filteredReviews = reviewsFromApi.filter((review) => {
        return review.owner === user.username;
      });
      setReviews(filteredReviews);
      setIsLoading(false);
    });
  }, [user.username]);

  if (!isLoggedIn) {
    return <LoginPrompt />;
  }

  const handleDeleteReview = (review_id) => {
    console.log(review_id);
    deleteReview(review_id)
      .then(() => {
        const updatedReviews = reviews.filter((reviewFilter) => {
          return reviewFilter.review_id !== review_id;
        });
        setReviews(updatedReviews);
        setModalIsOpen(true);
      })
      .catch((err) => {
        setModalIsOpen(true);
        setErr({ err });
        console.log(err);
      });
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <section className="profile-section">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}>
        {err
          ? "Woops! Something went wrong. Please try again later."
          : "Your review has been deleted successfully!"}
      </Modal>
      <div className="profile-container">
        <div className="profile-info">
          <h2>{user.username}</h2>
          <h3>{user.name}</h3>
          <img
            src={user.avatar_url}
            alt={user.username}
            style={{ height: "100px", width: "100px" }}
          />
        </div>
        <div className="profile-articles">
          <ul className="profile-review-list">
            {reviews.map((review) => {
              return (
                <div className="profile-review-card" key={review.review_id}>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                    to={`/reviews/${review.review_id}`}></Link>
                  <li key={review.review_id}>
                    <img
                      src={review.review_img_url}
                      alt={review.title}
                      style={{ height: "100px", width: "100px" }}
                    />
                    <div className="review-card-text">
                      <h3>{review.title}</h3>
                      <h4>
                        {review.owner} - {formatDate(review.created_at)}
                      </h4>
                      <h5>
                        Comments: {review.comment_count} Votes: {review.votes}
                      </h5>
                      <button
                        className="post-comment-button"
                        onClick={() => {
                          handleDeleteReview(review.review_id);
                        }}>
                        Delete
                      </button>
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default User;
