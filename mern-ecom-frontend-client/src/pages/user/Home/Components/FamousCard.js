// FamousCard.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { updatePromotedProductTheme } from "../../../../features/promotedProducts/promotedProductsSlice";

const FamousCard = ({ product, isAdmin }) => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(product?.theme ? product?.theme : "dark");

  // Handler to toggle theme
  const handleThemeChange = (newTheme, promotedProductId) => {
    setTheme(newTheme);

    dispatch(
      updatePromotedProductTheme({ promotedProductId, theme: newTheme })
    );
  };

  // Apply "text-dark" class if the theme is set to "dark"
  const textClass = theme === "dark" ? "text-dark" : "";

  return (
    <>
      <Col xs={12} sm={6} md={4} lg={3} className="my-2">
        {isAdmin && (
          <div>
            <input
              type="radio"
              id={`dark-${product._id}`}
              name={`theme-${product._id}`}
              value="dark"
              checked={theme === "dark"}
              onChange={() => handleThemeChange("dark", product._id)}
            />
            <label htmlFor="dark">Dark</label>
            <input
              type="radio"
              id={`light-${product._id}`}
              name={`theme-${product._id}`}
              value="light"
              checked={theme === "light"}
              onChange={() => handleThemeChange("light", product._id)}
            />
            <label htmlFor="light">Light</label>
          </div>
        )}
        <div className={`famous-card position-relative ${textClass}`}>
          <img
            src={product?.promoImage}
            alt={product?.product?.title}
            className="img-fluid"
          />
          <div className={`famous-content position-absolute ${textClass}`}>
            <h5
              className={textClass}
              style={{ color: theme === "dark" ? "black" : "white" }}
            >
              {product?.promoTag}
            </h5>
            <h6 className={textClass}>{product?.product?.title}</h6>
            <p className={textClass}>From: ${product?.product?.price}</p>
          </div>
        </div>
      </Col>
    </>
  );
};

export default FamousCard;
