import React from "react";
import logo from "../assets/logo.png";
import moment from "moment";
import "../styles/PrintComponent.scss";

const PrintComponent = ({ order, setStatus, setActivePrint }) => {
  const {
    priceParcel,
    priceService,
    priceTax,
    priceTotal,
    receiverAddress,
    senderAddress,
  } = order;

  const handlePrintOrder = () => {
    window.print();
    setActivePrint(false);
    setStatus("preparing");
  };

  return (
    <div
      className="print position-fixed w-100 h-100 d-flex flex-column"
      style={{
        background: "var(--color-green)",
        // color: "white",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <h3 className="fw-bold text-center text-pri">HOÁ ĐƠN</h3>
      <div className="check_top">
        <img src={logo} alt="logo" className="logo_check" />
        <div className="invoice">
          <h4 className="trans_name">{order.nameTrans}</h4>
          <h6 className="trans_unit">Đơn vị: {order.unitTrans}</h6>
          <h6 className="invoice_code text-uppercase fw-bold text-success">
            Mã đơn hàng:
            {order._id ? `  DEL-${order._id.slice(-8)}` : ""}
          </h6>
          <div className="invoice_due_date">
            Ngày khởi hành {`${moment(order.dateStart).format("DD-MM-YYYY")}`}
          </div>
          <div className="invoice_due_date">
            Ngày dự kiến giao{" "}
            {`${moment(order.dateExpected).format("DD-MM-YYYY")}`}
          </div>
        </div>
      </div>
      <div className="check_middle">
        <div className="payment_information col-md-12">
          <div className="infor_pay col-md-6">
            <div className="price">
              <span>{`TỔNG TIỀN: ${parseInt(
                priceTotal
              ).toLocaleString()} VND`}</span>
            </div>
          </div>
        </div>
        <div className="customer_information col-md-12">
          <div className="row">
            <div className="customer_from customer col-md-6">
              <div className="title_from title">Người gửi:</div>
              <hr style={{ width: "100%" }} />
              <p className="name_to name">{`* ${order.nameSender}`}</p>
              <p className="address_from address">{`* ${
                senderAddress ? senderAddress.nameAddressSender : ""
              }`}</p>
              <p className="phone_to phone">{`* ${order.phoneSender}`}</p>
            </div>
            <div className="customer_to customer col-md-6">
              <div className="title_to title">Người nhận:</div>
              <hr style={{ width: "100%" }} />
              <p className="name_from name">{`* ${order.nameReceiver}`}</p>
              <p className="address_from address">{`* ${
                receiverAddress ? receiverAddress.nameAddressReceiver : ""
              }`}</p>
              <p className="phone_from phone">{`* ${order.phoneReceiver}`}</p>
            </div>
          </div>
        </div>
        <div className="price_information col-md-12">
          <table className="table table_price">
            <thead>
              <tr>
                <th>Tên đơn hàng</th>
                <th>Trọng lượng</th>
                <th>Phí vận chuyển</th>
                <th>Phí dịch vụ</th>
                <th>Phí thuế</th>
                <th>Tổng phí</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.nameParcel}</td>
                <td>{`${order.weightParcel}kg`}</td>
                <td>{`${parseInt(priceParcel).toLocaleString()} vnd`}</td>
                <td>{`${parseInt(priceService).toLocaleString()} vnd`}</td>
                <td>2.00%</td>
                <td>{`${parseInt(
                  priceTotal - priceTax
                ).toLocaleString()} vnd`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="check_bottom">
        <div className="invoice_total">
          <div className="subtotal total">
            <p>Tổng phụ:</p>
            <p>{`${(priceTotal - priceTax).toLocaleString()} vnd`}</p>
          </div>
          <div className="total_tax total">
            <p>Phí thuế (2%):</p>
            <p>{`${parseInt(priceTax).toLocaleString()} vnd`}</p>
          </div>
          <div className="invoice_total_price total">
            <p>Tổng đơn hàng:</p>
            <p>{`${parseInt(priceTotal).toLocaleString()} vnd`}</p>
          </div>
        </div>
        <div className="note_thanks">
          <small>Cảm ơn quý khách đã ủng hộ dịch vụ của chúng tôi!</small>
        </div>
        <button
          style={{
            margin: "1rem",
            padding: "1rem 3rem",
            border: "none",
            borderRadius: "10px",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
          onClick={handlePrintOrder}
        >
          Xuất đơn
        </button>
      </div>
    </div>
  );
};

export default PrintComponent;
