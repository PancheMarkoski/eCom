import React, { useState } from "react";
import { stripHtmlTags } from "../utils/helperFunctions/stripHtmlTags";
import { AiFillDelete } from "react-icons/ai";

const CartItem = ({ product, onDelete, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(product?.quantity);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || product?.quantity; // Fallback to the current quantity if parsing fails
    setQuantity(newQuantity);
  };

  const handleBlur = () => {
    if (quantity !== product?.quantity) {
      onUpdateQuantity(product?._id, quantity);
    }
  };

  return (
    <div
      key={product?._id}
      className="cart-data cart-mobile-flexCol py-3 mb-2 d-flex justify-content-between align-items-center"
    >
      <div className="cart-col-1 cart-mobile-flexCol d-flex gap-15 align-items-center cart-mobile-w100">
        <div className="w-25">
          <img
            className="img-fluid"
            alt="product image"
            src={product?.productId?.images[0]?.url}
          />
        </div>
        <div className="w-75">
          <p>{product?.productId?.title}</p>
          <p>{stripHtmlTags(product?.productId?.description)}</p>
        </div>
      </div>
      <div className="cart-col-2 cart-mobile-w100">
        <h5 className="price ">
          ${(product?.productId?.price ?? 0).toFixed(2)}
        </h5>
      </div>
      <div className="cart-col-3 d-flex align-items-center gap-15 cart-mobile-w100">
        <div>
          <input
            type="number"
            name=""
            className="form-control"
            min={1}
            max={10}
            id=""
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
          />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => onDelete(product?._id)}
        >
          <AiFillDelete className="text-danger" />
        </div>
      </div>

      <div className="cart-col-4 cart-mobile-w100">
        <h5 className="price">
          ${((product?.quantity ?? 0) * (product?.price ?? 0)).toFixed(2)}
        </h5>
      </div>
    </div>
  );
};

export default CartItem;
