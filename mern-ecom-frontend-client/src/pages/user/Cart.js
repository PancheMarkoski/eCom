import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import watch from "../../images/watch.jpg";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  deleteCartItem,
  updateProductQuantityFromCart,
} from "../../features/cart/cartSlice";
import { stripHtmlTags } from "../../utils/helperFunctions/stripHtmlTags";
import CartItem from "../../components/CartItem";
import { calculateCartSubtotal } from "../../utils/helperFunctions/calculateCartSubtotal";

const Cart = () => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const subtotal = calculateCartSubtotal(cart);

  return (
    <div>
      <Meta title={"Cart"} />
      <BreadCrumb title={"Cart"} />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header d-flex py-3 justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {cart?.map((product) => (
              <CartItem
                key={product?._id}
                product={product}
                onDelete={(cartItemId) =>
                  dispatch(deleteCartItem({ cartItemId }))
                }
                onUpdateQuantity={(cartItemId, newQuantity) =>
                  dispatch(
                    updateProductQuantityFromCart({ cartItemId, newQuantity })
                  )
                }
              />
            ))}
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h3>SubTotal: ${subtotal.toFixed(2)}</h3>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
