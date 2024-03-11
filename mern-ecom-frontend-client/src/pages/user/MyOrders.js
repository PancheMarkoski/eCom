import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import { getUserOrders } from "../../features/order/orderSlice";
import { useSelector, useDispatch } from "react-redux";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order?.userOrders?.orders);

  console.log({ orders });

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <>
      <Meta title={"My Orders"} />
      <BreadCrumb title={"My Orders"} />
      <div className="custom-table-container">
        {orders?.map((order) => {
          return (
            <table key={order._id} className="table table-bordered table-dark">
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
                  <td>{order?._id}</td>
                  <td>{order?.totalPrice}</td>
                  <td>{order?.priceAfterDiscount}</td>
                  <td>{order?.orderStatus}</td>
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
                {order?.orderItems?.map((product) => (
                  <React.Fragment key={product?.product?._id}>
                    <tr>
                      <td>{product?.product?.title}</td>
                      <td>{product?.quantity}</td>
                      <td>{product?.product?.price}</td>
                      <td style={{ backgroundColor: product?.color?.title }}>
                        {product?.color?.title}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          );
        })}
      </div>
    </>
  );
};

export default MyOrders;
