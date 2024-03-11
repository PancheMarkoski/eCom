import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

const Logo = () => (
  <Col md={2} xs={6}>
    <h2>
      <Link to="/" className="text-white">
        Dev Corner
      </Link>
    </h2>
  </Col>
);

export default Logo;
