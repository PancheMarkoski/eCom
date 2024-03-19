// FamousCard.js

import React from "react";
import { Col } from "react-bootstrap";

const FamousCard = ({ imgSrc, title, subtitle, details, theme = "light" }) => {
  // Apply "text-dark" class if the theme is set to "dark"
  const textClass = theme === "dark" ? "text-dark" : "";

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="my-2">
      <div className="famous-card position-relative">
        <img src={imgSrc} alt={subtitle} className="img-fluid" />
        <div className={`famous-content position-absolute ${textClass}`}>
          <h5
            className={textClass}
            style={{ color: textClass ? "black" : "white" }}
          >
            {title}
          </h5>
          <h6 className={textClass}>{subtitle}</h6>
          <p className={textClass}>{details}</p>
        </div>
      </div>
    </Col>
  );
};

export default FamousCard;
