import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const MainPagePromotions = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={12} xl={6}>
          {" "}
          {/* Adjusted for full width on md and above */}
          <div className="main-banner position-relative p-3">
            <Image
              src="images/main-banner-1.jpg"
              fluid
              rounded
              alt="main banner"
            />
            <div className="main-banner-content position-absolute">
              <h4>SUPERCHARGED FOR PROS.</h4>
              <h5>iPad S13+ Pro</h5>
              <p>From $999.00 or $41.62/mo.</p>
              <LinkContainer to="/buy-now">
                <button className="button">BUY NOW</button>
              </LinkContainer>
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} xl={6}>
          {" "}
          {/* Adjusted for full width on md and above */}
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="small-banner position-relative">
                <Image
                  src={`images/catbanner-0${i}.jpg`}
                  fluid
                  rounded
                  alt="category banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>
                    {i === 1
                      ? "Best Sale"
                      : i === 2
                      ? "New Arrival"
                      : "SUPERCHARGED FOR PROS."}
                  </h4>
                  <h5>iPad S13+ Pro</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPagePromotions;
