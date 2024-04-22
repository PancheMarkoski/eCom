// FamousCard.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form, Image, Card } from "react-bootstrap";
import { updatePromotedProductTheme } from "../../../../features/promotedProducts/promotedProductsSlice";
import { LinkContainer } from "react-router-bootstrap";

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
          <Form>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id={`dark-${product._id}`}
                name={`theme-${product._id}`}
                label="Dark"
                value="dark"
                checked={theme === "dark"}
                onChange={() => handleThemeChange("dark", product._id)}
              />
              <Form.Check
                type="radio"
                id={`light-${product._id}`}
                name={`theme-${product._id}`}
                label="Light"
                value="light"
                checked={theme === "light"}
                onChange={() => handleThemeChange("light", product._id)}
              />
            </div>
          </Form>
        )}
        <LinkContainer to={`/product/${product?.product?._id}`}>
          <div className={`famous-card position-relative ${textClass}`}>
            <Image
              src={product?.promoImage}
              alt={product?.product?.title}
              fluid // makes image responsive
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
        </LinkContainer>
      </Col>
    </>
  );
};

export default FamousCard;
