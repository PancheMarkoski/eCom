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
  updateProductCartQty,
} from "../../features/cart/cartSlice";
import { stripHtmlTags } from "../../utils/helperFunctions/stripHtmlTags";
import CartItem from "../../components/CartItem";
import { calculateCartSubtotal } from "../../utils/helperFunctions/calculateCartSubtotal";
import { Row, Col, Button } from "react-bootstrap";

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
            <div className="cart-header d-flex py-3 justify-content-between align-items-center cart-mobile-disNone">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {!cart.length ? (
              <Row className="justify-content-center py-5">
                <Col md={8} className="text-center">
                  <h3>Your cart is currently empty.</h3>
                  <Link to="/product">
                    <Button variant="light" className="mt-3">
                      <Link to="/product">Start Shopping</Link>
                    </Button>
                  </Link>
                </Col>
              </Row>
            ) : (
              cart?.map((product) => (
                <CartItem
                  key={product?._id}
                  product={product}
                  onDelete={(cartItemId) =>
                    dispatch(deleteCartItem({ cartId: cartItemId }))
                  }
                  onUpdateQuantity={(cartItemId, newQuantity) =>
                    dispatch(
                      updateProductCartQty({ cartId: cartItemId, newQuantity })
                    )
                  }
                />
              ))
            )}
            {cart?.length ? (
              <div className="col-12 py-2 mt-4">
                <div className="d-flex justify-content-between align-items-baseline cart-mobile-flexCol">
                  <Link to="/product" className="button cart-mobile-w100">
                    Continue Shopping
                  </Link>
                  <div className="d-flex flex-column align-items-end cart-mobile-w100">
                    <h3 className="cart-mobile-w100">
                      SubTotal: ${subtotal.toFixed(2)}
                    </h3>
                    <p className="cart-mobile-w100">
                      Taxes and shipping calculated at checkout
                    </p>
                    <Link to="/checkout" className="button cart-mobile-w100">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
