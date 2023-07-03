import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersPaid } from "../redux/actions/orderAction";
import moment from "moment";

const statusColors = {
  paid: "green",
};

const statusTexts = {
  paid: "Đã thanh toán",
};

const OrdersDelivered = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { orders } = useSelector((state) => state.admin);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getAllOrdersPaid({ token: auth.token }));
  }, [dispatch, auth]);

  useEffect(() => {
    setData(orders);
  }, [orders]);

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
      dataIndex: "checkPay",
      key: "checkPay",
      render: (status) => (
        <Tag color={statusColors[status]}>{statusTexts[status]}</Tag>
      ),
    },
  ];

  return (
    <div className="oders_admin">
      <div className="orders_admin_content">
        <h2 className="title_orders">Đơn hàng đã thanh toán</h2>
        <div className="table_orders">
          <Table dataSource={data} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default OrdersDelivered;
