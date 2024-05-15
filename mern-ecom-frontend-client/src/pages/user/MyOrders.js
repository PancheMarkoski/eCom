import React, { useEffect, useMemo } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { getUserOrders } from "../../features/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import "../../styles/myOrders.css";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order?.userOrders);
  const isLoading = useSelector((state) => state.order?.isLoading);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title="My Orders" />
      <BreadCrumb title="My Orders" />
      <div className="custom-table-container">
        {orders?.map((order) => <OrderTable key={order._id} order={order} />)}
      </div>
    </>
  );
};

const OrderTable = ({ order }) => (
  <table className="table table-bordered table-dark">
    <thead>
      <tr>
        <th scope="col">Order Id</th>
        <th scope="col">Total Amount</th>
        <th scope="col">Total Amount after Discount</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{order._id}</td>
        <td>{order.totalPrice}</td>
        <td>{order.priceAfterDiscount}</td>
        <td>{order.orderStatus}</td>
      </tr>
    </tbody>
    <thead>
      <tr>
        <th scope="col">Product Name</th>
        <th scope="col">Quantity</th>
        <th scope="col">Price</th>
        <th scope="col">Color</th>
      </tr>
    </thead>
    <tbody>
      {order.orderItems.map((product) => (
        <tr key={product.product._id}>
          <td>{product.product.title}</td>
          <td>{product.quantity}</td>
          <td>{product.product.price}</td>
          <td style={{ backgroundColor: product.color.title }}>
            {product.color.title}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MyOrders;
