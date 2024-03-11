import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/famous-05.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addProductToWishlist } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsBalloonHeart } from "react-icons/bs";
import { BsBalloonHeartFill } from "react-icons/bs";

const ProductCard = ({ grid, data = {} }) => {
  const dispatch = useDispatch();

  const userWishlist = useSelector((state) => state?.user?.wishlist?.wishlist);
  const validWishlistItems = (userWishlist || []).filter(Boolean);
  const wishlistIds = validWishlistItems.map((object) => object._id);

  const isInWishlist = data && "_id" in data && wishlistIds.includes(data._id);
  return (
    <>
      <div
        className={grid ? `col-${grid}` : "col-3"}
        style={{ padding: grid && "10px 4px" }}
      >
        <div className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(addProductToWishlist(data._id))}
            >
              {isInWishlist ? <BsBalloonHeartFill /> : <BsBalloonHeart />}
            </div>
          </div>
          <Link to={`/product/${data._id}`} className="product-image">
            <img
              src={data?.images?.[0]?.url ?? watch}
              className="img-fluid"
              alt="Product"
            />
            <img
              src={data?.images?.[1]?.url ?? watch}
              className="img-fluid"
              alt="Product"
            />
          </Link>
          <div className="product-details">
            <h6 className="brand">{data?.brand}</h6>
            <h5 className="product-title">{data?.title}</h5>
            <ReactStars
              count={5}
              size={24}
              value={+data?.totalRating || 0}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">{data?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <Link to="/compare">
                <img src={prodcompare} alt="compare" />
              </Link>
              <Link to="/view">
                <img src={view} alt="view" />
              </Link>
              <Link to="/add-to-cart">
                <img src={addcart} alt="addcart" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
