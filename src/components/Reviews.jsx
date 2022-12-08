import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviews } from "../api";
import { formatDate } from "../utils/utils";
import Categories from "./Categories";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category_slug } = useParams();

  useEffect(() => {
    getReviews(category_slug).then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, [category_slug]);

  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <main className="reviews-section">
      <div className="categories-sortby-container">
        <Categories />
      </div>
      <ul className="reviews-list">
        {reviews.map((review) => {
          return (
            <div className="review-card" key={review.review_id}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/reviews/${review.review_id}`}>
                <li key={review.review_id}>
                  <img src={review.review_img_url} alt={review.title} />
                  <div className="review-card-text">
                    <h3>{review.title}</h3>
                    <h4>
                      {review.owner} - {formatDate(review.created_at)}
                    </h4>
                    <h5>
                      Comments: {review.comment_count} Votes: {review.votes}
                    </h5>
                  </div>
                </li>
              </Link>
            </div>
          );
        })}
      </ul>
    </main>
  );
};

export default Reviews;
