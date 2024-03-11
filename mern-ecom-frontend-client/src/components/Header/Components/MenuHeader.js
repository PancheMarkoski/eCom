import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, Button } from "react-bootstrap";

const MenuHeader = ({ user, handleLogout }) => {
  return (
    <header className="header-top-strip py-3">
      <Container fluid="xxl">
        <Row>
          <Col>
            <Navbar variant="dark" className="justify-content-center ">
              <Nav className="align-items-center gap-3">
                {/* Ensures items are aligned horizontally */}
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/product">
                  Our Store
                </Nav.Link>
                <Nav.Link as={NavLink} to="/blogs">
                  Blogs
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
                {user.user && (
                  <>
                    <Nav.Link as={NavLink} to="/my-orders">
                      My Orders
                    </Nav.Link>
                    {user.user?.role === "admin" && (
                      <Nav.Link as={NavLink} to="/dashboard">
                        Dashboard
                      </Nav.Link>
                    )}
                    <Button
                      variant="outline-primary"
                      className="text-uppercase"
                      style={{ fontSize: "0.875rem" }}
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default MenuHeader;
