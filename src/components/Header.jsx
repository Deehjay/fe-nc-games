import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-image">
          <div className="overlay"></div>
          <div className="content">
            <h1 id="header-name">Welcome to the House of Games</h1>
            <p>
              A board game review website built as part of the Northcoders
              front-end project review week. This site has a whole host of
              features, and users are able to view reviews, comment and like
              reviews, as well as create their own! This project was built using
              React.js in combination with various third party components, and
              functions in tandem with my REST api.
            </p>
            <a className="button" href="#reviews">
              Check out the latest reviews
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
