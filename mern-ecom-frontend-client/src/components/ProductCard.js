import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { LinkContainer } from "react-router-bootstrap"; // For wrapping <Link> functionality
import { Col, Image, OverlayTrigger, Tooltip } from "react-bootstrap"; // Import required components
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/famous-05.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addProductToWishlist } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsBalloonHeart, BsBalloonHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";

const ProductCard = ({ grid, data = {} }) => {
  const dispatch = useDispatch();

  const userWishlist = useSelector((state) => state?.user?.wishlist?.wishlist);
  const totalRating = useSelector(
    (state) => state?.products?.product?.totalRating
  );

  const [isInWishlistLocal, setIsInWishlistLocal] = useState(false);

  useEffect(() => {
    const wishlistIds =
      userWishlist?.filter(Boolean).map((object) => object._id) || [];
    setIsInWishlistLocal(wishlistIds.includes(data._id));
  }, [userWishlist, data._id]);

  const handleWishlistClick = (productId) => {
    // Optimistically update the local state
    const newStatus = !isInWishlistLocal;
    setIsInWishlistLocal(newStatus);

    // Dispatch the action to update the backend
    dispatch(addProductToWishlist(productId))
      .then(() => {
        // If the update is successful, no action is needed since we've already updated the UI
      })
      .catch((error) => {
        // If the update fails, revert the local state and optionally show an error message
        setIsInWishlistLocal(!newStatus);
        // Show an error message (e.g., using a toast notification)
        toast.error("Failed to update wishlist. Please try again.");
      });
  };

  return (
    <>
      <Col
        md={grid || 3}
        style={{ padding: grid && "10px 4px" }}
        className="ourStore__productCard__flex-basis100"
      >
        <div className="product-card position-relative">
          <div
            className="wishlist-icon position-absolute"
            style={{ cursor: "pointer" }}
            onClick={() => handleWishlistClick(data._id)}
          >
            {isInWishlistLocal ? <BsBalloonHeartFill /> : <BsBalloonHeart />}
          </div>
          <LinkContainer
            to={`/product/${data._id}`}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image">
              <Image
                src={data?.images?.[0]?.url ?? watch}
                fluid
                alt="Product"
              />
              <Image
                src={data?.images?.[1]?.url ?? watch2}
                fluid
                alt="Product"
              />
            </div>
          </LinkContainer>
          <div className="product-details">
            <h6 className="brand">{data?.brand}</h6>
            <h5 className="product-title">{data?.title}</h5>
            <ReactStars
              key={totalRating}
              count={5}
              size={24}
              value={Number(totalRating ? totalRating : 0)}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">{data?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <LinkContainer style={{ cursor: "pointer" }} to="/compare">
                <OverlayTrigger overlay={<Tooltip>Compare</Tooltip>}>
                  <Image
                    src={prodcompare}
                    alt="compare"
                    style={{ cursor: "pointer" }}
                  />
                </OverlayTrigger>
              </LinkContainer>
              <LinkContainer to="/view">
                <OverlayTrigger overlay={<Tooltip>View</Tooltip>}>
                  <Image style={{ cursor: "pointer" }} src={view} alt="view" />
                </OverlayTrigger>
              </LinkContainer>
              <LinkContainer to="/add-to-cart">
                <OverlayTrigger overlay={<Tooltip>Add to Cart</Tooltip>}>
                  <Image
                    style={{ cursor: "pointer" }}
                    src={addcart}
                    alt="add to cart"
                  />
                </OverlayTrigger>
              </LinkContainer>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductCard;
