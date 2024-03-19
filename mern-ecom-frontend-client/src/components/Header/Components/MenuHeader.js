import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Button, Nav } from "react-bootstrap";

const MenuHeader = ({ user, handleLogout }) => {
  return (
    <header className="header-top-strip py-3">
      <Container fluid="xxl">
        <Navbar variant="dark" className="justify-content-center custom-navbar">
          <Nav className="nav-container align-items-center">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/product">
              Our Store
            </NavLink>
            <NavLink className="nav-link" to="/blogs">
              Blogs
            </NavLink>
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
            {user.user && (
              <>
                <NavLink className="nav-link" to="/my-orders">
                  My Orders
                </NavLink>
                {user.user?.role === "admin" && (
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
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
        </Navbar>
      </Container>
    </header>
  );
};

export default MenuHeader;
