import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isReadNotify } from "../redux/actions/notifyAction";

import { Link } from "react-router-dom";
import "../styles/NotifyPopup.scss";
import moment from "moment";

const NotifyPopup = () => {
  const dispatch = useDispatch();
  const { dataPopupNoti } = useSelector((state) => state.notify);

  const { role } = useSelector((state) => state.auth);

  const handleReadNotify = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  let text = "";
  if (dataPopupNoti.text === "confirmed") {
    text = "Đã xác nhận";
  } else if (dataPopupNoti.text === "preparing") {
    text = "Đang chờ lấy hàng";
  } else if (dataPopupNoti.text === "pickup complete") {
    text = "Lấy hàng thành công";
  } else if (dataPopupNoti.text === "in transit") {
    text = "Đang vận chuyển";
  } else if (dataPopupNoti.text === "delivered") {
    text = "Giao hàng thành công";
  } else if (dataPopupNoti.text === "paid") {
    text = "Đã thanh toán";
  } else if (dataPopupNoti.text === "add_new_order") {
    text = "Đặt đơn hàng mới";
  }

  return (
    <div
      className={`notify_popup show position-fixed text-light`}
      style={{ bottom: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div
        className={`notify_popup_content d-flex flex-column justify-content-center text-light m-2`}
      >
        <div className="content_body">
          <Link
            className="notify_card"
            onClick={() => handleReadNotify(dataPopupNoti)}
            style={{
              backgroundColor: `${
                dataPopupNoti.isRead === true
                  ? "var(--color-bg)"
                  : "var(--color-greenlight)"
              }`,
            }}
            to={
              role === "admin"
                ? `/admin/order_details/${dataPopupNoti.id}`
                : `/order_details/${dataPopupNoti.id}`
            }
          >
            <div className="avatar">
              <img
                src={dataPopupNoti.user ? dataPopupNoti.user.avatar.url : ""}
                alt="logo"
                className="img_noti"
              />
            </div>
            <div className="content_text">
              <div className="text_noti">
                <span className="email_noti">
                  {dataPopupNoti.user ? dataPopupNoti.user.email : ""}
                </span>
                <span className="span_noti">{text}</span>
                <span className="desc_noti">{`(${dataPopupNoti.content})`}</span>
                <span className="time_noti">
                  {moment(dataPopupNoti.createdAt).startOf("hour").fromNow()}
                </span>
              </div>
              <div
                className={`${
                  dataPopupNoti.isRead === true ? "is_not_read" : "is_read"
                }`}
              >
                <i className="fa-solid fa-circle"></i>
              </div>
              <button className="close_noti">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotifyPopup;
