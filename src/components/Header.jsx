import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1>Welcome to the</h1>
          <h1 id="header-name">HOUSE OF GAMES</h1>
          <p>
            A board game review website built as part of the Northcoders
            front-end project review week. This site has a whole host of
            features, and users are able to view reviews, comment and like
            reviews, as well as create their own! This project was built using
            React.js in combination with various third party components, and
            functions in tandem with my REST api.
          </p>
          <h3>Check out the latest reviews below!</h3>
        </div>
        <div className="header-right">
          <img
            id="header-img"
            src="https://cdn.pixabay.com/photo/2015/05/10/21/16/board-761586_1280.jpg"
            alt=""
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
