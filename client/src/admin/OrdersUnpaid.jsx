import React, { useEffect, useState } from "react";
import { Table, Select } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersUnpaid, updateOrder } from "../redux/actions/orderAction";
import moment from "moment";

const statusTexts = {
  unpaid: "Chờ thanh toán",
  paid: "Đã thanh toán",
};
const statusOptions = ["unpaid", "paid"];

const OrdersUnpaid = () => {
  const dispatch = useDispatch();
  const { auth, socket } = useSelector((state) => state);

  const { orders } = useSelector((state) => state.admin);
  const [data, setData] = useState();

  const [checkPay, setCheckPay] = useState("");
  const [order, setOrder] = useState({});

  useEffect(() => {
    dispatch(getAllOrdersUnpaid({ token: auth.token }));
  }, [dispatch, auth]);

  useEffect(() => {
    setData(orders);
  }, [orders]);

  useEffect(() => {
    if (order._id) {
      dispatch(
        updateOrder({
          order: order,
          dataUpdate: { checkPay: checkPay },
          auth: auth,
          socket: socket,
        })
      );
    }
  }, [dispatch, order, checkPay, socket, auth]);
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
      render: (checkPay, order) => (
        <Select
          value={checkPay}
          onChange={(value) => handleCheckPayChange(order, value)}
          style={{ width: 150 }}
        >
          {statusOptions.map((option) => (
            <Select.Option key={option} value={option}>
              {statusTexts[option]}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];
  const handleCheckPayChange = (order, newCheckPay) => {
    // Cập nhật dữ liệu trong bảng
    setOrder(order);
    setCheckPay(newCheckPay);
  };
  return (
    <div className="oders_admin">
      <div className="orders_admin_content">
        <h2 className="title_orders">Đơn hàng chưa thanh toán</h2>
        <div className="table_orders">
          <Table dataSource={data} columns={columns} rowKey="_id" />
        </div>
      </div>
    </div>
  );
};

export default OrdersUnpaid;
