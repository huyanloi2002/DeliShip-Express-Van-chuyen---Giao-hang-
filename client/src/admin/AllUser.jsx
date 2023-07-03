import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../redux/actions/userAction";
import moment from "moment";

const AllUser = () => {
  const dispatch = useDispatch();
  const { auth, allUsers } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllUser({ auth: auth }));
  }, [dispatch, auth]);

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <span className="text-uppercase fw-bold text-success">{`DEL-${_id.slice(
          -8
        )}`}</span>
      ),
    },
    {
      title: "Tên đơn hàng",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "identityCard",
      key: "identityCard",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className="oders_admin">
      <div className="orders_admin_content">
        <h2 className="title_orders">Tất cả người dùng</h2>
        <div className="table_orders">
          <Table dataSource={allUsers} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AllUser;
