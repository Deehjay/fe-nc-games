import React, { useEffect, useState } from "react";
import { getReviews } from "../api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <main className="reviews-section">
      <ul className="reviews-list">
        {reviews.map((review) => {
          return (
            <div className="review-card">
              <li key={review.review_id}>
                <img src={review.review_img_url} alt={review.title} />
                <h3>{review.title}</h3>
                <h4>{review.owner}</h4>
                <h5>
                  Comments: {review.comment_count} Votes: {review.votes}
                </h5>
              </li>
            </div>
          );
        })}
      </ul>
    </main>
  );
};

export default Reviews;
