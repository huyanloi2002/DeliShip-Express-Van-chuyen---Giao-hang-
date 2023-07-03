import React from "react";
import { Link } from "react-router-dom";

const ModalErrorAddParcel = () => {
  return (
    <div
      className="err_add_parcel position-fixed w-100 h-100 text-center d-flex align-items-center justify-content-center"
      style={{
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <div
        className="err_add_parcel_content"
        style={{
          width: "500px",
          height: "300px",
          borderRadius: "20px",
          backgroundColor: "#ffffff",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#00bf63",
          gap: "2rem",
          padding: "1rem 2rem",
          border: "2px solid #00bf63",
        }}
      >
        <div className="content_err">
          <i
            className="fa-solid fa-circle-exclamation"
            style={{ color: "orange", fontSize: "100px" }}
          ></i>
          <p style={{ fontSize: "15px", fontWeight: "bold" }}>
            Vui lòng hoàn thiện thông tin <br />
            như (số điện thoại, địa chỉ, CCCD/CMND) để đặt hàng
          </p>
        </div>
        <div
          className="button_group"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "1rem",
              border: "none",
              borderRadius: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              fontSize: "12px",
              backgroundColor: "#00bf63",
            }}
          >
            Về trang chủ
          </Link>
          <Link
            to="/profile"
            style={{
              padding: "1rem",
              border: "none",
              borderRadius: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              fontSize: "12px",
              backgroundColor: "orange",
            }}
          >
            Đến thông tin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalErrorAddParcel;
