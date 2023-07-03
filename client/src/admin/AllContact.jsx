import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllContact } from "../redux/actions/contactAction";

const AllContact = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { contacts } = useSelector((state) => state.allContact);

  useEffect(() => {
    dispatch(getAllContact());
  }, [dispatch]);

  const columns = [
    {
      title: "Mã phản hồi",
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
      title: "SDT",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tin nhắn",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <div className="oders_admin">
      <div className="orders_admin_content">
        <h2 className="title_orders">Tất cả tin nhắn phản hồi</h2>
        <div className="table_orders">
          <Table dataSource={contacts} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default AllContact;
