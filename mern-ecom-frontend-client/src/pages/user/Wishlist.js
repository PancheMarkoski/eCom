import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../../features/user/userSlice";
import { addProductToWishlist } from "../../features/product/productSlice";
const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWishlist());
  }, []);

  const wishlist = useSelector((state) => state?.user?.wishlist?.wishlist);

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title={"Wishlist"} />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlist?.map((product) => {
            return (
              <div className="col-3">
                <div
                  className="wishlist-card position-relative"
                  key={product._id}
                >
                  <img
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                    onClick={() => dispatch(addProductToWishlist(product._id))}
                  />
                  <div className="wishlist-card-image">
                    <img
                      src={product.images[0].url}
                      className="img-fluid w-100 p-2"
                      alt="Watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">{product.title}</h5>
                    <h6 className="price">${product.price}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
