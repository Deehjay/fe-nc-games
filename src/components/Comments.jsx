import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByReviewId } from "../api";
import { formatDate } from "../utils/utils";
import { BiLike } from "react-icons/bi";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getCommentsByReviewId(review_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
      setIsLoading(false);
    });
  }, [review_id]);

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <section className="comments">
      <ul className="comments-list">
        {comments.map((comment) => {
          return (
            <li className="comment-card" key={comment.comment_id}>
              <h6>
                {comment.author} - {formatDate(comment.created_at)}
              </h6>
              <p>{comment.body}</p>
              <span>
                <BiLike /> {comment.votes}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
