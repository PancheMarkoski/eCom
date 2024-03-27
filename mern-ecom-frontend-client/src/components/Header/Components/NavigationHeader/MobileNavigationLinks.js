import React from "react";
import { Link } from "react-router-dom";
import { Col, Nav, Collapse, Button } from "react-bootstrap";

const MobileNavigationLinks = ({
  isNavCollapsed,
  user,
  cart,
  subtotal,
  handleLogout,
  handleNavCollapse,
}) => (
  <Col xs={12} className="d-md-none">
    <Collapse in={!isNavCollapsed}>
      <div>
        <Nav className="d-flex flex-column align-items-start">
          <Nav.Link
            as={Link}
            onClick={handleNavCollapse}
            className="text-white my-2"
            to="/"
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            onClick={handleNavCollapse}
            className="text-white my-2"
            to="/product"
          >
            Our Store
          </Nav.Link>
          <Nav.Link
            as={Link}
            onClick={handleNavCollapse}
            to="/cart"
            className="text-white my-2"
          >
            Cart ({cart.length}) - ${subtotal.toFixed(2)}
          </Nav.Link>
          {user?.isSuccess ? (
            <Nav.Link
              as={Link}
              onClick={handleNavCollapse}
              to="/profile"
              className="text-white my-2"
            >
              Welcome {user?.user?.firstName}
            </Nav.Link>
          ) : (
            <Nav.Link
              as={Link}
              onClick={handleNavCollapse}
              to="login"
              className="text-white my-2"
            >
              Login / My Account
            </Nav.Link>
          )}
          <Nav.Link
            as={Link}
            onClick={handleNavCollapse}
            to="wishlist"
            className="text-white my-2"
          >
            Favourite Wishlist
          </Nav.Link>
          <Nav.Link
            as={Link}
            onClick={handleNavCollapse}
            to="compare-product"
            className="text-white my-2"
          >
            Compare Products
          </Nav.Link>

          <Nav.Link
            as={Link}
            onClick={handleNavCollapse}
            to="/blogs"
            className="text-white my-2"
          >
            Blogs
          </Nav.Link>
          <Nav.Link
            as={Link}
            onClick={handleNavCollapse}
            to="/contact"
            className="text-white my-2"
          >
            Contact
          </Nav.Link>
          {user.user && (
            <>
              <Nav.Link
                as={Link}
                onClick={handleNavCollapse}
                to="/my-orders"
                className="text-white my-2"
              >
                My Orders
              </Nav.Link>
              {user.user?.role === "admin" && (
                <Nav.Link
                  as={Link}
                  onClick={handleNavCollapse}
                  to="/dashboard"
                  className="text-white my-2"
                >
                  Dashboard
                </Nav.Link>
              )}
              <Button
                variant="outline-primary"
                className="text-uppercase custom-logout-btn"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </>
          )}
        </Nav>
      </div>
    </Collapse>
  </Col>
);

export default MobileNavigationLinks;
