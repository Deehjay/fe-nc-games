import React, { useContext, useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { BiLike } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { getReviewById, likeReview, undoLikeReview } from "../api";
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
      likeReview(review_id);
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
      undoLikeReview(review_id);
    }
  };

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <main className="single-review">
      <div className="single-review-container">
        <img src={review.review_img_url} alt={review.title} />
        <h2>{review.title}</h2>
        <h4>
          by {review.owner} on {formatDate(review.created_at)}
        </h4>
        <p>{review.review_body}</p>
        <p>
          Like this article? -{" "}
          {hasVoted ? (
            <IconContext.Provider
              value={{ color: "blue", className: "like-clicked" }}>
              <button className="review-like-button">
                <BiLike
                  onClick={() => {
                    undoLike();
                  }}
                />
              </button>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{ color: "black", className: "like-unclicked" }}>
              <button className="review-like-button">
                <BiLike
                  onClick={() => {
                    like();
                  }}
                />
              </button>
            </IconContext.Provider>
          )}
          <span>{votes}</span>
        </p>
        <p>{loginPrompt}</p>
        <div className="likes-and-comments">
          <Collapsible
            id="comments-text"
            trigger={`Show ${review.comment_count} comments`}
            triggerWhenOpen={`Hide ${review.comment_count} comments`}>
            <Comments />
          </Collapsible>
        </div>
      </div>
    </main>
  );
};

export default SingleReview;
