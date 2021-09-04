import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="title">
        <span style={{ color: "#fff" }}>
          Start <span style={{ color: "#01bf71" }}>Quiz</span> Hub
        </span>
      </Link>

      <hr className="divider" />
    </div>
  );
};

export default Header;
