import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <Container
      fluid
      className="text-center p-5"
      style={{ backgroundColor: "#f8f9fa", height: "100vh" }}
    >
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <Col xs={12}>
          <h1>Coming Soon</h1>
          <p className="lead">
            We are working hard to bring you new features. Stay tuned!
          </p>
          <Button variant="light">
            <Link to="/">Go to Home</Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ComingSoon;
