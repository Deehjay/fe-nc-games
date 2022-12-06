import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { useParams } from "react-router-dom";
import { getReviewById } from "../api";
import { formatDate } from "../utils/utils";
import Comments from "./Comments";

const SingleReview = () => {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviewById(review_id).then((reviewFromApi) => {
      setReview(reviewFromApi);
      setIsLoading(false);
    });
  }, [review_id]);

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
        <p>Likes: {review.votes}</p>
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
