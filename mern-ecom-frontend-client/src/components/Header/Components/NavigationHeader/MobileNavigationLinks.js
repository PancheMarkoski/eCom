import React from "react";
import { Link } from "react-router-dom";
import { Col, Nav, Collapse } from "react-bootstrap";

const MobileNavigationLinks = ({ isNavCollapsed, user, cart, subtotal }) => (
  <Col xs={12} className="d-md-none">
    <Collapse in={!isNavCollapsed}>
      <div>
        <Nav className="d-flex flex-column align-items-start">
          <Nav.Link as={Link} to="compare-product" className="text-white my-2">
            Compare Products
          </Nav.Link>
          <Nav.Link as={Link} to="wishlist" className="text-white my-2">
            Favourite Wishlist
          </Nav.Link>
          {user?.isSuccess ? (
            <Nav.Link as={Link} to="/profile" className="text-white my-2">
              Welcome {user?.user?.firstname}
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="login" className="text-white my-2">
              Login / My Account
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/cart" className="text-white my-2">
            Cart ({cart.length}) - ${subtotal.toFixed(2)}
          </Nav.Link>
        </Nav>
      </div>
    </Collapse>
  </Col>
);

export default MobileNavigationLinks;
