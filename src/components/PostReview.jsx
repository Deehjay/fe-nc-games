import React, { useContext, useEffect, useState } from "react";
import { getCategories, postReview } from "../api";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { UserContext } from "../contexts/users";
import Modal from "react-modal";
import LoginPrompt from "./LoginPrompt";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const PostReview = () => {
  let subtitle;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, isLoggedIn } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    getCategories()
      .then((categoriesFromApi) => {
        setCategories(categoriesFromApi);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr({ err });
        setIsLoading(false);
      });
  }, []);

  const formatCategory = (slug) => {
    const formattedSlug = slug.replace(/-/g, " ");
    return formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1);
  };

  const onSubmit = (data) => {
    postReview(
      user.username,
      data.title,
      data.review_body,
      data.designer,
      data.category
    )
      .then((postedReview) => {
        setModalIsOpen(true);
        setTimeout(() => {
          navigate(`/reviews/${postedReview.review_id}`);
        }, 2000);
      })
      .catch((err) => {
        setErr({ err });
        setModalIsOpen(true);
      });
  };

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!isLoggedIn) {
    return <LoginPrompt />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <section className="post-review">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}>
        {err
          ? "Woops! Something went wrong. Please try again later."
          : "Your review has been submitted successfully!"}
      </Modal>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Review title..."
            {...register("title", { required: true, minLength: 5 })}
          />
        </Form.Field>
        {errors.title && (
          <p className="form-error">Title must be at least 5 characters</p>
        )}
        <Form.Field>
          <label htmlFor="category">Category</label>
          <select
            name="categories"
            {...register("category", { required: true })}>
            <option value="" defaultValue={"Select..."} disabled hidden>
              Select...
            </option>
            {categories.map((category) => {
              return (
                <option key={category.slug} value={category.slug}>
                  {formatCategory(category.slug)}
                </option>
              );
            })}
          </select>
        </Form.Field>
        {errors.category && (
          <p className="form-error">Please select a category</p>
        )}
        <Form.Field>
          <label htmlFor="designer">Designer</label>
          <input
            type="text"
            placeholder="Designer's name..."
            {...register("designer", { required: true })}
          />
        </Form.Field>
        {errors.designer && (
          <p className="form-error">Please include the designer of the game</p>
        )}
        <Form.Field>
          <label htmlFor="img-url">Image URL</label>
          <input
            type="text"
            placeholder="Review image url..."
            {...register("review_img_url", { required: true })}
          />
        </Form.Field>
        {errors.review_img_url && (
          <p className="form-error">Please include an image URL</p>
        )}
        <Form.Field>
          <label htmlFor="body">Body</label>
          <textarea
            cols="30"
            rows="10"
            placeholder="Your review here..."
            {...register("review_body", {
              required: true,
              minLength: 1,
            })}></textarea>
        </Form.Field>
        {errors.review_body && (
          <p className="form-error">
            Review body must be at least 100 characters
          </p>
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </section>
  );
};

export default PostReview;
