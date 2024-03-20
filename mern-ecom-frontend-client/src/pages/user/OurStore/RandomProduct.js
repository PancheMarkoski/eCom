import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const RandomProduct = ({ products }) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const getRandomProducts = (products, count) => {
      let shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setRandomProducts(getRandomProducts(products, 2));
  }, [products]);

  return (
    <div className="filter-card mb-3 ourStore__displayNoneMaxWidth">
      <h3 className="filter-title">Random Product</h3>
      {randomProducts?.map((product) => {
        return (
          <div key={product?._id}>
            <div className="random-products d-flex mb-3">
              <div className="w-50">
                <img
                  src={product?.images[0].url}
                  className="img-fluid"
                  alt="Watch"
                />
              </div>
              <div className="w-50">
                <h5>{product?.title}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={product?.totalRating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <b>${product?.price}</b>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RandomProduct;
