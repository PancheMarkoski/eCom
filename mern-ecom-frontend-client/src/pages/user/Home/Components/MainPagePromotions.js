import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const MainPagePromotions = () => {
  const promotedProducts = useSelector(
    (state) => state?.promotedProducts?.promotedProducts
  );

  const mainPromotedProducts = promotedProducts.filter(
    (product) => product.promoType === "main"
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={12} xl={6}>
          <div className="main-banner position-relative mb-2">
            {mainPromotedProducts[0] && (
              <>
                <Image
                  src={mainPromotedProducts[0]?.promoImage} // Use dynamic source
                  fluid
                  rounded
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4>Best Sale</h4>
                  <h5>{mainPromotedProducts[0]?.product?.title}</h5>
                  <p>From ${mainPromotedProducts[0]?.product?.price}</p>
                  <LinkContainer to="/buy-now">
                    <button className="button">BUY NOW</button>
                  </LinkContainer>
                </div>
              </>
            )}
          </div>
        </Col>
        <Col
          xs={12}
          md={12}
          xl={6}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-10">
            {mainPromotedProducts?.slice(1, 5).map((product) => (
              <div key={product._id} className="small-banner position-relative">
                <Image
                  src={product?.promoImage}
                  fluid
                  rounded
                  alt={product?.product?.title}
                />
                <div className="small-banner-content position-absolute">
                  <h4>{product?.promoTag}</h4>
                  <h5>{product?.product?.title}</h5>
                  <p>From ${product?.product?.price}</p>
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
