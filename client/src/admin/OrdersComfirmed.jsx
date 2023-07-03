import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersConfirmed,
  updateOrder,
} from "../redux/actions/orderAction";
import moment from "moment";
import PrintComponent from "../components/PrintComponent";

// const statusTexts = {
//   unconfirmed: "Chờ xác nhận",
//   confirmed: "Xác nhận",
// };
const statusOptions = ["unconfirmed", "confirmed"];

const OrdesComfirmed = () => {
  const dispatch = useDispatch();
  const { auth, socket } = useSelector((state) => state);
  const { orders } = useSelector((state) => state.admin);
  const [data, setData] = useState();

  const [status, setStatus] = useState("");
  const [order, setOrder] = useState({});

  const [activePrint, setActivePrint] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    dispatch(getAllOrdersConfirmed({ token: auth.token }));
  }, [dispatch, auth]);

  useEffect(() => {
    setData(orders);
  }, [orders]);

  useEffect(() => {
    if (status) {
      dispatch(
        updateOrder({
          order: order,
          dataUpdate: { status: status },
          auth: auth,
          socket: socket,
        })
      );
    }
  }, [dispatch, order, status, auth, socket]);

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
      title: "Xuất đơn",
      dataIndex: "_id",
      key: "export",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleExport(record)}>
          Xuất đơn
        </Button>
      ),
    },
  ];
  const handleExport = (record) => {
    setOrderDetails(record);
    setActivePrint(true);
    setOrder(record);
  };

  return (
    <div className="oders_admin">
      <div className="orders_admin_content">
        <h2 className="title_orders">Đơn hàng chờ xuất đơn</h2>
        <div className="table_orders">
          <Table dataSource={data} columns={columns} rowKey="_id" />
        </div>
        <div className={`${activePrint ? "d-block" : "d-none"}`}>
          <PrintComponent
            order={orderDetails}
            setStatus={setStatus}
            setActivePrint={setActivePrint}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdesComfirmed;
