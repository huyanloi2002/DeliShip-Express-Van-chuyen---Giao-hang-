import React from "react";
import notNotify from "../assets/not_notify.png";

const NotNotifyModal = () => {
  return (
    <div className="not_notify_modal d-flex justify-content-center">
      <img src={notNotify} alt="notNotify" style={{ width: "200px" }} />
    </div>
  );
};

export default NotNotifyModal;
