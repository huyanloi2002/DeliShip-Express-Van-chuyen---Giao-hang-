import React from "react";
import "../styles/Toast.scss";

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed ${bgColor} text-light`}
      style={{ bottom: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}
    >
      <div
        className={`toast-header d-flex justify-content-between align-items-center ${bgColor} text-light`}
      >
        <strong className="text-light">{msg.title}</strong>
        <button
          className="close text-light"
          data-dismiss="toast"
          onClick={handleShow}
        >
          &times;
        </button>
      </div>
      <div className="toast-body">{msg.body}</div>
    </div>
  );
};

export default Toast;
