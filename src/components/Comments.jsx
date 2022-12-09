import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getCommentsByReviewId, postComment } from "../api";
import { formatDate } from "../utils/utils";
import { BiLike } from "react-icons/bi";
import Collapsible from "react-collapsible";
import { UserContext } from "../contexts/users";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Comments = ({ review }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const { user, isLoggedIn } = useContext(UserContext);
  const [loginPrompt, setLoginPrompt] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByReviewId(review_id).then((commentsFromApi) => {
      const sortedComments = commentsFromApi.sort((a, b) => {
        return b.comment_id - a.comment_id;
      });
      setComments(sortedComments);
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
      postComment(review_id, user.username, commentBody).then(
        (postedComment) => {
          setComments((currComments) => {
            return [postedComment, ...currComments];
          });
        }
      );
    } else if (!commentBody) {
      setLoginPrompt("Comment body must not be empty!");
    } else {
      setCommentBody("");
      setLoginPrompt("Please log in to comment");
    }
  };

  const handleDeleteComment = (comment_id) => {
    setIsDeleting(true);
    deleteComment(comment_id).then(() => {
      setIsDeleting(false);
      const updatedComments = comments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
      setComments(updatedComments);
    });
  };

  const handleDeleteButton = (comment_id) => {
    confirmAlert({
      title: "Delete comment",
      message: "Are you sure to do delete your comment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteComment(comment_id),
        },
        {
          label: "No",
          onClick: null,
        },
      ],
    });
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
                  {user.username === comment.author ? (
                    <button
                      onClick={() => {
                        handleDeleteButton(comment.comment_id);
                      }}>
                      Delete
                    </button>
                  ) : null}
                  {isDeleting && user.username === comment.author ? (
                    <p>Deleting comment...</p>
                  ) : null}
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
