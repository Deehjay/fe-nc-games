import React, { useContext, useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { getReviewById, patchReview } from "../api";
import { formatDate } from "../utils/utils";
import Comments from "./Comments";
import { IconContext } from "react-icons";
import { UserContext } from "../contexts/users";

const SingleReview = () => {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const { isLoggedIn } = useContext(UserContext);
  const [loginPrompt, setLoginPrompt] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((reviewFromApi) => {
      setReview(reviewFromApi);
      setVotes(reviewFromApi.votes);
      setIsLoading(false);
    });
  }, [review_id]);

  const like = () => {
    if (isLoggedIn) {
      setVotes((currVotes) => {
        return currVotes + 1;
      });
      setHasVoted(true);
      patchReview(review_id, 1);
    } else {
      setLoginPrompt("Please log in to vote!");
    }
  };

  const undoLike = () => {
    if (isLoggedIn) {
      setVotes((currVotes) => {
        return currVotes - 1;
      });
      setHasVoted(false);
      patchReview(review_id, -1);
    }
  };

  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <main className="single-review">
      <div className="single-review-container">
        <img src={review.review_img_url} alt={review.title} />
        <h2>{review.title}</h2>
        <h4>
          by {review.owner} on {formatDate(review.created_at)}
        </h4>
        <p>{review.review_body}</p>
        <p id="like-text">
          Like this review? -{" "}
          {hasVoted ? (
            <IconContext.Provider
              value={{
                color: "#44C1D4",
                backgroundColor: "blue",
                className: "like-clicked",
              }}>
              <button
                onClick={() => {
                  undoLike();
                }}
                className="review-like-button">
                <BiLike />
                <span id="votes-voted">{votes}</span>
              </button>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ color: "white", className: "like-unclicked" }}>
              <button
                onClick={() => {
                  like();
                }}
                className="review-like-button">
                <BiLike />
                <span id="votes-unvoted">{votes}</span>
              </button>
            </IconContext.Provider>
          )}
        </p>
        <p className="warning">{loginPrompt}</p>
        <Comments review={review} />
      </div>
    </main>
  );
};

export default SingleReview;
