import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deleteOrder } from "../redux/actions/orderAction";
import moment from "moment";

const statusColors = {
  unconfirmed: "gray",
  confirmed: "red",
  preparing: "orange",
  "pickup complete": "#ffbd59",
  "in transit": "purple",
  delivered: "green",
};

const statusTexts = {
  unconfirmed: "Chưa xác nhận",
  confirmed: "Xác nhận",
  preparing: "Đang chuẩn bị",
  "pickup complete": "Hoàn thành lấy hàng",
  "in transit": "Đang vận chuyển",
  delivered: "Đã giao hàng",
};

const Orders = () => {
  const dispatch = useDispatch();
  const { auth, socket } = useSelector((state) => state);
  const { orders } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllOrders({ token: auth.token }));
  }, [dispatch, auth]);

  const columns = [
    {
      title: "Mã đơn hàng",
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
      dataIndex: "nameParcel",
      key: "nameParcel",
    },
    {
      title: "Tên người gửi",
      dataIndex: "nameSender",
      key: "nameSender",
    },
    {
      title: "Địa chỉ người gửi",
      dataIndex: "senderAddress",
      key: "senderAddress",
      render: (senderAddress) => <span>{senderAddress.nameAddressSender}</span>,
    },
    {
      title: "Tên người nhận",
      dataIndex: "nameReceiver",
      key: "nameReceiver",
    },
    {
      title: "Địa chỉ người nhận",
      dataIndex: "receiverAddress",
      key: "receiverAddress",
      render: (receiverAddress) => (
        <span>{receiverAddress.nameAddressReceiver}</span>
      ),
    },
    {
      title: "Ngày đặt đơn",
      dataIndex: "dateStart",
      key: "dateStart",
      render: (dateStart) => (
        <span>{moment(dateStart).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Tổng giá đơn hàng",
      dataIndex: "priceTotal",
      key: "priceTotal",
      render: (priceTotal) => (
        <span className="fw-bold">{`${parseInt(
          priceTotal
        ).toLocaleString()} VND`}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]}>{statusTexts[status]}</Tag>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "action",
      render: (_, record) => (
        <>
          <button
            className="delete_order bg-danger px-3 py-1 border border-none rounded"
            onClick={() => handleDelete(record)}
          >
            <i className="fa-solid fa-trash text-light"></i>
          </button>
        </>
      ),
    },
  ];

  const handleDelete = (record) => {
    dispatch(deleteOrder({ order: record, auth: auth, socket: socket }));
  };

  return (
    <div className="oders_admin">
      <div className="orders_admin_content">
        <h2 className="title_orders">Tất cả đơn hàng</h2>
        <div className="table_orders">
          <Table dataSource={orders} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default Orders;
