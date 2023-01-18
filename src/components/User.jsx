import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteReview, getReviews } from "../api";
import { UserContext } from "../contexts/users";
import { formatDate } from "../utils/utils";
import Modal from "react-modal";
import LoginPrompt from "./LoginPrompt";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import CommentsComponent from "./Svg/CommentsComponent";
import LikesComponent from "./Svg/LikesComponent";

const User = () => {
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
    getReviews()
      .then((reviewsFromApi) => {
        const filteredReviews = reviewsFromApi.filter((review) => {
          return review.owner === user.username;
        });
        setReviews(filteredReviews);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr({ err });
      });
  }, [user.username]);

  if (!isLoggedIn) {
    return <LoginPrompt />;
  }

  const handleDeleteReview = (review_id) => {
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
      });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (err) {
    return <ErrorPage message={err.message} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        {err
          ? "Woops! Something went wrong. Please try again later."
          : "Your review has been deleted successfully!"}
      </Modal>
      <main className="reviews-section" id="reviews">
        <div className="profile-info">
          <div className="profile-info-inner">
            <h2>{user.username}</h2>
            <h3>{user.name}</h3>
            <img
              src={user.avatar_url}
              alt={user.username}
              style={{ height: "100px", width: "100px" }}
            />
          </div>
        </div>
        <h2>My Reviews</h2>
        <ul className="reviews-list">
          {reviews.map((review) => {
            return (
              <>
                <li className="review-card" key={review.review_id}>
                  <Link to={`/reviews/${review.review_id}`}>
                    <div className="revew-inner">
                      <div
                        className="image"
                        style={{
                          backgroundImage:
                            'url("' + review.review_img_url + '")',
                        }}></div>
                      <div className="review-card-text">
                        <h3>{review.title}</h3>
                        <h4>
                          {review.owner} - {formatDate(review.created_at)}
                        </h4>
                        <div className="likes-and-comments-section">
                          <div className="icon-ground">
                            <span className="icon">
                              <CommentsComponent />
                            </span>
                            <span className="text" id="comment-count">
                              {review.comment_count}
                            </span>
                          </div>

                          <div className="icon-ground">
                            <span className="icon">
                              <LikesComponent />
                            </span>
                            <span className="text">{review.votes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
                <button
                  key={review.votes}
                  id="delete-review-button"
                  onClick={() => {
                    handleDeleteReview(review.review_id);
                  }}>
                  Delete
                </button>
              </>
            );
          })}
        </ul>
      </main>
    </>
    // <main className="reviews-section" id="reviews">
    //   <Modal
    //     isOpen={modalIsOpen}
    //     onRequestClose={closeModal}
    //     style={customStyles}>
    //     {err
    //       ? "Woops! Something went wrong. Please try again later."
    //       : "Your review has been deleted successfully!"}
    //   </Modal>
    //   <div className="profile-container">
    // <div className="profile-info">
    //   <div className="profile-info-inner">
    //     <h2>{user.username}</h2>
    //     <h3>{user.name}</h3>
    //     <img
    //       src={user.avatar_url}
    //       alt={user.username}
    //       style={{ height: "100px", width: "100px" }}
    //     />
    //   </div>
    // </div>
    //     <div className="profile-articles">
    //       <h2>My Reviews</h2>
    //       <ul className="reviews-list">
    //         {reviews.map((review) => {
    //           return (
    //             <li className="review-card" key={review.review_id}>
    //               <Link to={`/reviews/${review.review_id}`}>
    //                 <div className="revew-inner">
    //                   <div
    //                     className="image"
    //                     style={{
    //                       backgroundImage:
    //                         'url("' + review.review_img_url + '")',
    //                     }}></div>
    //                   <div className="review-card-text">
    //                     <h3>{review.title}</h3>
    //                     <h4>
    //                       {review.owner} - {formatDate(review.created_at)}
    //                     </h4>
    //                     <div className="likes-and-comments-section">
    //                       <div className="icon-ground">
    //                         <span className="icon">
    //                           <CommentsComponent />
    //                         </span>
    //                         <span className="text" id="comment-count">
    //                           {review.comment_count}
    //                         </span>
    //                       </div>

    //                       <div className="icon-ground">
    //                         <span className="icon">
    //                           <LikesComponent />
    //                         </span>
    //                         <span className="text">{review.votes}</span>
    //                         <button
    //                           className="button-secondary"
    //                           onClick={handleDeleteReview}>
    //                           DELETE
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </Link>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //   </div>
    // </main>
  );
};

export default User;
