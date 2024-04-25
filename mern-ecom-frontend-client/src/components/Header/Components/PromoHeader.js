import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const PromoHeader = () => {
  return (
    <header className="header-top-strip py-3">
      <Container fluid>
        {/* React-Bootstrap Container, 'fluid' for full width */}
        <Row>
          {/* React-Bootstrap Row */}
          <Col xs={6}>
            {/* React-Bootstrap Col, 'xs={6}' for 50% width on extra small to larger devices */}
            <p className="text-white mb-0">
              Free Shipping Over $100 & Free Returns
            </p>
          </Col>
          <Col xs={6}>
            {/* Second Col, also with 'xs={6}' */}
            <p className="text-end text-white mb-0">
              Hotline:
              <Link to="tel:+918264954234" className="text-white">
                +91 070280201
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default PromoHeader;
