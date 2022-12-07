import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByReviewId, postComment } from "../api";
import { formatDate } from "../utils/utils";
import { BiLike } from "react-icons/bi";
import Collapsible from "react-collapsible";
import { UserContext } from "../contexts/users";

const Comments = ({ review }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const { user, isLoggedIn } = useContext(UserContext);
  const [loginPrompt, setLoginPrompt] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByReviewId(review_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
      setIsLoading(false);
    });
  }, [review_id]);

  const handleCommentTextChange = (e) => {
    setCommentBody(e.target.value);
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (isLoggedIn && commentBody) {
      setCommentBody("");
      setComments((currComments) => {
        console.log(currComments);
        return [
          ...currComments,
          {
            author: user.username,
            body: commentBody,
            created_at: new Date(),
            votes: 0,
          },
        ];
      });
      postComment(review_id, user.username, commentBody);
    } else if (!commentBody) {
      setLoginPrompt("Comment body must not be empty!");
    } else {
      setCommentBody("");
      setLoginPrompt("Please log in to comment");
    }
  };

  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="likes-and-comments">
      <section className="post-comment">
        <form id="comment-form" onSubmit={handlePostComment}>
          <textarea
            onChange={handleCommentTextChange}
            value={commentBody}
            cols="50"
            rows="4"
            placeholder="Your comment here..."
          />
          <button className="post-comment-button">Post Comment</button>
          <p className="warning">{loginPrompt}</p>
        </form>
      </section>
      <Collapsible
        id="comments-text"
        trigger={`Show ${comments.length} comments`}
        triggerWhenOpen={`Hide ${comments.length} comments`}>
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
      </Collapsible>
    </div>
  );
};

export default Comments;
