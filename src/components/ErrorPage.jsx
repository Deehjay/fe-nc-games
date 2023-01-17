import React from "react";

const ErrorPage = ({ message }) => {
  return message ? (
    <div>
      <h2>{message}</h2>
    </div>
  ) : (
    <div>
      <h2>Something went wrong. Please try again later.</h2>
    </div>
  );
};

export default ErrorPage;
