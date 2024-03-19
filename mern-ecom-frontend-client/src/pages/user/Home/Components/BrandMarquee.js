import React from "react";
import Marquee from "react-fast-marquee";

const BrandMarquee = ({ brands }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="marqueeInnerWrapper">
          <Marquee className="brandFlexContainer">
            {brands.map((brand, index) => (
              <div key={index} className="brandItem">
                <img src={brand.image} alt={brand.name} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default BrandMarquee;
