import React, { useState } from "react";
import "../styles/Notify.scss";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isReadNotify } from "../redux/actions/notifyAction";
import NotNotifyModal from "../components/NotNotifyModal";
import moment from "moment";
import "moment/dist/locale/vi";
import { TYPES } from "../redux/actions/actionTypes";
moment.locale("vi");

const Notify = () => {
  const dispatch = useDispatch();
  const { auth, notify } = useSelector((state) => state);
  const { data } = useSelector((state) => state.notify);
  const { role } = useSelector((state) => state.auth);

  const handleReadNotify = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({ type: TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  return (
    <div className="notify">
      <div className="notify_content">
        <div className="title_noti d-flex justify-content-between">
          <h5>Thông báo</h5>
          {notify.sound ? (
            <div className="sound_noti" onClick={handleSound}>
              <i className="fa-solid fa-bell"></i>
            </div>
          ) : (
            <div className="sound_noti" onClick={handleSound}>
              <i className="fa-solid fa-bell-slash"></i>
            </div>
          )}
        </div>
        {data.length > 0 ? (
          data.map((item, index) => {
            let text = "";
            if (item.text === "confirmed") {
              text = "Đã xác nhận";
            } else if (item.text === "preparing") {
              text = "Đang chờ lấy hàng";
            } else if (item.text === "pickup complete") {
              text = "Lấy hàng thành công";
            } else if (item.text === "in transit") {
              text = "Đang vận chuyển";
            } else if (item.text === "delivered") {
              text = "Giao hàng thành công";
            } else if (item.text === "paid") {
              text = "Đã thanh toán";
            } else if (item.text === "add_new_order") {
              text = "Đặt đơn hàng mới";
            }

            return (
              <Link
                className="notify_card"
                key={index}
                style={{
                  backgroundColor: `${
                    item.isRead === true
                      ? "var(--color-bg)"
                      : "var(--color-greenlight)"
                  }`,
                }}
                onClick={() => handleReadNotify(item)}
                to={
                  role === "admin"
                    ? `/admin/order_details/${item.id}`
                    : `/order_details/${item.id}`
                }
              >
                <div className="avatar">
                  <img
                    src={item.user ? item.user.avatar.url : ""}
                    alt="logo"
                    className="img_noti"
                  />
                </div>
                <div className="content_text">
                  <div className="text_noti">
                    <span className="email_noti">
                      {item.user ? item.user.email : ""}
                    </span>
                    <span className="span_noti">{text}</span>
                    <span className="desc_noti">{`(${item.content})`}</span>
                    <span className="time_noti">
                      {moment(item.createdAt).startOf("hour").fromNow()}
                    </span>
                  </div>
                  <div
                    className={`${
                      item.isRead === true ? "is_not_read" : "is_read"
                    }`}
                  >
                    <i className="fa-solid fa-circle"></i>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <NotNotifyModal />
        )}
      </div>
    </div>
  );
};

export default Notify;
