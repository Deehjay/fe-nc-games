import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getCommentsByReviewId, postComment } from "../api";
import { formatDate } from "../utils/utils";
import Collapsible from "react-collapsible";
import { UserContext } from "../contexts/users";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ErrorPage from "./ErrorPage";
import Modal from "react-modal";
import Loading from "./Loading";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { review_id } = useParams();
  const [commentBody, setCommentBody] = useState("");
  const { user, isLoggedIn } = useContext(UserContext);
  const [loginPrompt, setLoginPrompt] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [err, setErr] = useState(null);
  const [commentErr, setCommentErr] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
    getCommentsByReviewId(review_id)
      .then((commentsFromApi) => {
        const sortedComments = commentsFromApi.sort((a, b) => {
          return b.comment_id - a.comment_id;
        });
        setComments(sortedComments);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr({ err });
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
      setModalIsOpen(true).catch((err) => {
        setCommentErr({ err });
        setModalIsOpen(true);
      });
    } else if (!commentBody) {
      setLoginPrompt("Comment body must not be empty!");
    } else {
      setCommentBody("");
      setLoginPrompt("Please log in to comment");
    }
  };

  const handleDeleteComment = (comment) => {
    setIsDeleting(true);
    deleteComment(comment.comment_id)
      .then(() => {
        setIsDeleting(false);
        comment.body = "COMMENT DELETED";
        setTimeout(() => {
          const updatedComments = comments.filter((commentFilter) => {
            return commentFilter.comment_id !== comment.comment_id;
          });
          setComments(updatedComments);
        }, 4000);
      })
      .catch((err) => {
        setCommentErr({ err });
        setModalIsOpen(true);
      });
  };

  const handleDeleteButton = (comment) => {
    confirmAlert({
      title: "Delete comment",
      message: "Are you sure you want to delete your comment?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteComment(comment),
        },
        {
          label: "No",
          onClick: null,
        },
      ],
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
    <div className="likes-and-comments">
      <section className="post-comment">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}>
          {commentErr
            ? "Woops! Something went wrong. Please try again later."
            : "Your comment has been posted successfully!"}
        </Modal>
        <form id="comment-form" onSubmit={handlePostComment}>
          <textarea
            onChange={handleCommentTextChange}
            value={commentBody}
            cols="50"
            rows="4"
            placeholder="Your comment here..."
          />
          <p className="warning" id="comment-warning">
            {loginPrompt}
          </p>
          <button className="post-comment-button">Comment</button>
        </form>
      </section>
      <Collapsible
        trigger={
          comments.length
            ? `Show ${comments.length} comments`
            : "Looks like there's no comments here. Be the first!"
        }
        triggerWhenOpen={
          comments.length
            ? `Hide ${comments.length} comments`
            : "Looks like there's no comments here. Be the first!"
        }>
        <section className="comments">
          <ul className="comments-list">
            {comments.map((comment) => {
              return (
                <li className="comment-card" key={comment.comment_id}>
                  <h6>
                    {comment.author} - {formatDate(comment.created_at)}
                  </h6>
                  <p>{comment.body}</p>
                  {/* {comment.body !== "COMMENT DELETED" ? (
                    // <span>
                    //   <BiLike /> {comment.votes}
                    // </span>
                  ) : null} */}
                  {user.username === comment.author &&
                  comment.body !== "COMMENT DELETED" ? (
                    <button
                      onClick={() => {
                        handleDeleteButton(comment);
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
