import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import Container from "../../../components/Container";
import { useSelector } from "react-redux";
import { stripHtmlTags } from "../../../utils/helperFunctions/stripHtmlTags";
import { calculateCartSubtotal } from "../../../utils/helperFunctions/calculateCartSubtotal";
import CheckoutShippingInfo from "./CheckoutShippingInfo";
import "../../../styles/shippingPage.css";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const subTotal = calculateCartSubtotal(cart);

  const orderItems = cart.map((product) => ({
    product: product?.productId._id,
    color: product?.color?._id,
    quantity: product?.quantity,
    price: product?.price,
  }));

  const totalPrice = subTotal.toFixed(2);
  const priceAfterDiscount = subTotal.toFixed(2);

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <CheckoutShippingInfo
              orderItems={orderItems}
              totalPrice={totalPrice}
              priceAfterDiscount={priceAfterDiscount}
            />
          </div>
          <div className="col-5">
            <div className="py-3">
              <div className="border-bottom py-4">
                {cart?.map((product) => {
                  return (
                    <div
                      key={product?._id}
                      className="d-flex gap-10 mb-4 align-items-center"
                    >
                      <div className="w-75 d-flex gap-10">
                        <div
                          style={{ height: "100px" }}
                          className="d-flex position-relative"
                        >
                          <span className={"circle-badge"}>
                            {product?.quantity}
                          </span>
                          <img
                            src={product?.productId?.images[0].url}
                            alt="Descriptive text for the image"
                          />
                        </div>
                        <div>
                          <h5 className="total-price">
                            {product?.productId?.title}
                          </h5>
                          <p className="total-price">${product?.price}</p>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="total">${totalPrice}</h5>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">${subTotal.toFixed(2)}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping price</p>
                  <p className="mb-0 total-price">$0</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">${subTotal.toFixed(2)}</h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
