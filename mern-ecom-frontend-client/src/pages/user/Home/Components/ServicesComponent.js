import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ServicesComponent = ({ services }) => {
  return (
    <Row>
      <Col xs={12}>
        {/* Set the container to wrap items with `flex-wrap` */}
        <div className="services d-flex align-items-center justify-content-center flex-wrap">
          {services?.map((service, index) => (
            <div key={index} className="d-flex align-items-center gap-10 px-3">
              <img
                src={service.image}
                alt={service.title}
                style={{ width: "30px", height: "30px" }}
              />
              {/* Adjust the size as needed */}
              <div>
                <h5>{service.title}</h5>
                <p className="mb-0">{service.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default ServicesComponent;
