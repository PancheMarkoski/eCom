import React from "react";
import ReactStars from "react-rating-stars-component";
import { LinkContainer } from "react-router-bootstrap"; // For wrapping <Link> functionality
import { Col, Image, ProgressBar, Badge } from "react-bootstrap"; // Import required components

const SpecialProduct = ({ data }) => {
  return (
    <Col md={6} className="mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <Image
              src={data.images[0].url}
              fluid
              alt="Special Product"
              className="special-product-image"
            />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{data.brand}</h5>
            <h6 className="title">{data.title}</h6>
            <ReactStars
              count={5}
              size={24}
              value={+data?.totalRating || 0}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="text-danger">${data.price}</span> &nbsp;
              <strike>$200</strike>
            </p>
            <div className="discount-till d-flex align-items-center gap-2">
              <p className="mb-0">
                <b>5</b> days
              </p>
              <div className="d-flex gap-2 align-items-center">
                <div className="d-inline-flex justify-content-center align-items-center special-product-card__badge">
                  1
                </div>
                :
                <div className="d-inline-flex justify-content-center align-items-center special-product-card__badge">
                  2
                </div>
                :
                <div className="d-inline-flex justify-content-center align-items-center special-product-card__badge">
                  3
                </div>
              </div>
            </div>
            <div className="prod-count my-3 products">
              <p>Products: {data.quantity}</p>
            </div>
            <ProgressBar now={50} className="mt-3" />
            <LinkContainer to="/add-to-cart">
              <a className="btn btn-primary mt-3">Add to Cart</a>
            </LinkContainer>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SpecialProduct;
