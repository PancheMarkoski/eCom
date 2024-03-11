import React from "react";
import { Link } from "react-router-dom";
import { Col, Nav } from "react-bootstrap";
import WishlistImg from "../../../../images/wishlist.svg";
import CompareImg from "../../../../images/compare.svg";
import userImg from "../../../../images/user.svg";
import cartImg from "../../../../images/cart.svg";

const NavigationLinks = ({ user, cart, subtotal }) => (
  <Col md={5} className="d-none d-md-block">
    <Nav className="header-upper-links d-flex align-items-center justify-content-between flex-wrap">
      <Nav.Item>
        <Link
          to="compare-product"
          className="d-flex align-items-center gap-2 text-white"
        >
          <img src={CompareImg} alt="compare" />
          <p className="mb-0">
            Compare <br /> Products
          </p>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link
          to="wishlist"
          className="d-flex align-items-center gap-2 text-white"
        >
          <img src={WishlistImg} alt="wishlist" />
          <p className="mb-0">
            Favourite <br /> Wishlist
          </p>
        </Link>
      </Nav.Item>
      <Nav.Item>
        {user?.user ? (
          <Link
            to="/profile"
            className="d-flex align-items-center gap-2 text-white"
          >
            <img src={userImg} alt="user" />
            <p className="mb-0">
              Welcome
              <br /> {user?.user?.firstName}
            </p>
          </Link>
        ) : (
          <Link
            to="login"
            className="d-flex align-items-center gap-2 text-white"
          >
            <img src={userImg} alt="user" />
            <p className="mb-0">
              Login <br /> My Account
            </p>
          </Link>
        )}
      </Nav.Item>
      <Nav.Item>
        <Link to="/cart" className="d-flex align-items-center gap-2 text-white">
          <img src={cartImg} alt="cart" />
          <div className="d-flex flex-column gap-2">
            <span className="badge bg-white text-dark">{cart.length}</span>
            <p className="mb-0">${subtotal.toFixed(2)}</p>
          </div>
        </Link>
      </Nav.Item>
    </Nav>
  </Col>
);

export default NavigationLinks;
