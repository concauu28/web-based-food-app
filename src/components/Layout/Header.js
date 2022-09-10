import React, { Fragment } from "react";
import mealsImage from "./meals.jpg";
import "./Header.css";
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
  return (
    <div className="header-container">
      <header className="header">
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className="main-image">
        <img src={mealsImage} />
      </div>
    </div>
  );
}

export default Header;
