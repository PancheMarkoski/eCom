import React, { useEffect, useMemo } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../../features/order/orderSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Status",
    dataIndex: "status",
  },
];

const OrderStatusSelect = ({ status, onChange }) => (
  <select
    onChange={onChange}
    value={status}
    className="form-control form-select"
  >
    <option value="Not Processed">Not Processed</option>
    <option value="Cash on Delivery">Cash on Delivery</option>
    <option value="Dispatched">Dispatched</option>
    <option value="Cancelled">Cancelled</option>
    <option value="Delivered">Delivered</option>
  </select>
);

const AdminOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state?.order?.orders || []);

  const ordersData = useMemo(() => {
    return orderState.length > 0
      ? orderState.map((order, i) => ({
          key: order?._id,
          id: i + 1,
          name: order?.user?.firstname,
          product: <Link to={`/admin/orders/${order?._id}`}>View Orders</Link>,
          amount: order?.totalPrice,
          date: new Date(order?.createdAt).toLocaleString(),
          status: (
            <OrderStatusSelect
              status={order.orderStatus}
              onChange={(e) =>
                dispatch(
                  updateOrderStatus({
                    orderId: order._id,
                    status: e.target.value,
                  })
                )
              }
            />
          ),
        }))
      : [];
  }, [orderState]);

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={ordersData} />}</div>
    </div>
  );
};

export default AdminOrders;
