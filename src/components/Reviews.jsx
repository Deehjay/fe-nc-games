import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getReviews } from "../api";
import { formatDate } from "../utils/utils";
import Categories from "./Categories";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { category_slug } = useParams();
  const [sortParams, setSortParams] = useSearchParams();

  // votes, date(review_id), comment count, flip order asc/desc

  useEffect(() => {
    const sortQuery = sortParams.get("sort_by");
    const orderQuery = sortParams.get("order");
    getReviews(category_slug, sortQuery, orderQuery).then((reviews) => {
      setReviews(reviews);
      setIsLoading(false);
    });
  }, [category_slug, sortParams]);

  const handleSortBy = (e) => {
    if (e.target.value) {
      const selectedQuery = JSON.parse(e.target.value);
      setSortParams({
        sort_by: selectedQuery.sort_by,
        order: selectedQuery.order,
      });
    }
  };

  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <main className="reviews-section">
      <div className="categories-sortby-container">
        <Collapsible
          classParentString="sort-by"
          trigger="SORT BY ↓"
          triggerWhenOpen="SORT BY ↑">
          <option
            className="sort-by-option"
            onClick={handleSortBy}
            value={JSON.stringify({ sort_by: "votes", order: "desc" })}>
            Votes - Descending
          </option>
          <option
            className="sort-by-option"
            onClick={handleSortBy}
            value={JSON.stringify({ sort_by: "votes", order: "asc" })}>
            Votes - Ascending
          </option>
          <option
            className="sort-by-option"
            onClick={handleSortBy}
            value={JSON.stringify({ sort_by: "created_at", order: "desc" })}>
            Date - Descending
          </option>
          <option
            className="sort-by-option"
            onClick={handleSortBy}
            value={JSON.stringify({ sort_by: "created_at", order: "asc" })}>
            Date - Ascending
          </option>
          <option
            className="sort-by-option"
            onClick={handleSortBy}
            value={JSON.stringify({ sort_by: "comment_count", order: "desc" })}>
            Comments - Descending
          </option>
          <option
            className="sort-by-option"
            onClick={handleSortBy}
            value={JSON.stringify({ sort_by: "comment_count", order: "asc" })}>
            Comments - Ascending
          </option>
        </Collapsible>

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
