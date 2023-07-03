import React, { Suspense, useEffect, useState } from "react";
import moment from "moment";
import plane from "../assets/plane.png";
import truck from "../assets/truck.png";
import shipper from "../assets/shipper.png";

import { statusDelivery } from "../data/data";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import MapComponent from "./MapComponent";

const ParcelDetailsBox = ({ orderById }) => {
  const { dataOrderId } = useSelector((state) => state.orderById);
  const [senderPosition, setSenderPosition] = useState([0, 0]);
  const [senderNameAddress, setSenderNameAddress] = useState("");
  const [receiverPosition, setReceiverPosition] = useState([0, 0]);
  const [receiverNameAddress, setReceiverNameAddress] = useState("");

  const {
    nameTrans,
    _id,
    dateExpected,
    dateStart,
    senderAddress,
    receiverAddress,
    status,
    nameSender,
    nameReceiver,
    nameParcel,
    checkPay,
  } = dataOrderId;

  let imgTrans;
  if (nameTrans === "Vận chuyển tiêu chuẩn") {
    imgTrans = shipper;
  } else if (nameTrans === "Vận chuyển nhanh") {
    imgTrans = truck;
  } else if (nameTrans === "Vận chuyển cấp tốc") {
    imgTrans = plane;
  }
  let statusDetails = "";
  let colorDetails = "";

  if (status === "unconfirmed") {
    statusDetails = "Chưa xác nhận";
    colorDetails = "gray";
  } else if (status === "confirmed") {
    statusDetails = "Đã xác nhận";
    colorDetails = "red";
  } else if (status === "preparing") {
    statusDetails = "Chờ lấy hàng";
    colorDetails = "orange";
  } else if (status === "pickup complete") {
    statusDetails = "Lấy hàng thành công";
    colorDetails = "yellow";
  } else if (status === "in transit") {
    statusDetails = "Đang vận chuyển";
    colorDetails = "greenyellow";
  } else if (status === "delivered") {
    statusDetails = "Đã nhận hàng";
    colorDetails = "green";
  }

  let statusCheckPay = "";
  if (checkPay === "unpaid") {
    statusCheckPay = "Chưa thanh toán";
  } else if (checkPay === "paid") {
    statusCheckPay = "Đã thanh toán";
  }

  useEffect(() => {
    if (senderAddress === undefined) {
      setSenderPosition([0, 0]);
      setSenderNameAddress("");
    } else {
      setSenderPosition([
        senderAddress.latitudeSender,
        senderAddress.longitudeSender,
      ]);
      setSenderNameAddress(senderAddress.nameAddressSender);
    }
  }, [senderAddress]);
  useEffect(() => {
    if (receiverAddress === undefined) {
      setReceiverPosition([0, 0]);
      setReceiverNameAddress("");
    } else {
      setReceiverPosition([
        receiverAddress.latitudeReceiver,
        receiverAddress.longitudeReceiver,
      ]);
      setReceiverNameAddress(receiverAddress.nameAddressReceiver);
    }
  }, [receiverAddress]);

  const address =
    statusDetails !== "Đã nhận hàng"
      ? senderNameAddress
          .split(",")
          [senderNameAddress.split(",").length - 1].trim()
      : receiverNameAddress
          .split(",")
          [receiverNameAddress.split(",").length - 1].trim();

  return (
    <div className="parcels_details_box">
      <div className="content_top_details">
        <div className="trans_details">
          <img
            className="img_trans_details"
            src={imgTrans}
            alt="imgTrans"
            width={60}
          />
          <div className="text_trans_details">
            <h4 className="name_trans_details">
              {nameTrans ? nameTrans.replace("Vận chuyển", "") : ""}
            </h4>
            <small>
              <b>{statusCheckPay}</b>
            </small>
            <div className="track_number_details">
              {_id ? `DEL-${_id.slice(-8)}` : ""}
            </div>
          </div>
        </div>
        <div className="date_details">
          <span>Tên đơn hàng: </span>
          <span className="fw-bold text-uppercase">{`${nameParcel}`}</span>
          <div className="date_start">
            <span>Ngày xuất phát: </span>
            {moment(dateStart).format("DD/MM/YYYY")}
          </div>
          <div className="date_expected">
            <span>Ngày dự kiến: </span>
            {moment(dateExpected).format("DD/MM/YYYY")}
          </div>
        </div>
      </div>
      <div className="content_bottom_details">
        <div className="address_details">
          <MapComponent
            senderPosition={senderPosition}
            receiverPosition={receiverPosition}
          />
        </div>
        <div className="right_details">
          <div className="info_address_details">
            <div className="circle_adrress">
              <i className="fa-solid fa-circle circle_sender"></i>
              <i className="fa-solid fa-circle-dot circle_receiver"></i>
            </div>
            <div className="sender_receiver">
              <div className="sender">
                <p className="title_sender">Người gửi</p>
                <p className="name_sender name">{nameSender}</p>
                <p className="address_sender address">{senderNameAddress}</p>
              </div>
              <hr style={{ backgroundColor: "#dddddd" }} />
              <div className="receiver">
                <p className="title_receiver">Người nhận</p>
                <p className="name_receiver name">{nameReceiver}</p>
                <p className="address_receiver address">
                  {receiverNameAddress}
                </p>
              </div>
            </div>
          </div>
          <div className="status_details">
            {statusDelivery.map((item, index) => {
              return (
                <div
                  className={`status_card ${
                    statusDetails === item.name ? "active" : ""
                  }`}
                  key={index}
                >
                  <div className="content_icon_status">
                    <i className="fa-solid fa-circle-dot"></i>
                  </div>
                  <div className="content_text_status">
                    <span className="name_status">{item.name}</span>
                    <span className="address_status">
                      {item.name === statusDetails ? `(${address})` : ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="price_details"></div>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetailsBox;
