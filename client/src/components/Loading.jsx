import React from "react";
import "../styles/Loading.scss";
import logo from "../assets/logo.png";

const Loading = () => {
  return (
    <div
      className="loading position-fixed w-100 h-100 text-center d-flex align-items-center justify-content-center"
      style={{
        background: "transparent",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <div className="loading_content">
        <img src={logo} alt="logo" width={110} className="logo_loading" />
      </div>
    </div>
  );
};

export default Loading;
