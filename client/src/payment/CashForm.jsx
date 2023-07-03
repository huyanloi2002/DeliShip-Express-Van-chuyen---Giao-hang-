import React from "react";
import cash from "../assets/cash.png";

const CashForm = ({ handlePaymentCash }) => {
  return (
    <div className="cash_form">
      <div className="button_payment" onClick={handlePaymentCash}>
        <i className="fa-regular fa-circle-check"></i>
        <p>Thanh toán bằng tiền mặt</p>
        <img src={cash} alt="cash" />
      </div>
    </div>
  );
};

export default CashForm;
