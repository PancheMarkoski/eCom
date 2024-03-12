import React, { useEffect, useMemo } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/user/userSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const filterAdminUsers = useMemo(() => {
    return users
      .filter((user) => user.role !== "admin") // Filter out admin users
      .map((user, index) => ({
        // Transform the structure for the table
        key: user._id,
        id: index + 1,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        mobile: user.mobile,
      }));
  }, [users]);

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={filterAdminUsers} />
      </div>
    </div>
  );
};

export default Customers;
