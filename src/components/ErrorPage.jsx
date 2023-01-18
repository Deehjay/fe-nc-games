import React from "react";

const ErrorPage = ({ message }) => {
  return message ? (
    <div className="error-container">
      <div className="error-inner">
        <h2>{message}</h2>
      </div>
    </div>
  ) : (
    <div className="error-container">
      <div className="error-inner">
        <h2>Something went wrong. Please try again later.</h2>
      </div>
    </div>
  );
};

export default ErrorPage;
