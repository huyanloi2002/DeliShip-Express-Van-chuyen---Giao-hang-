import React, { useState } from "react";
import ButtonStepper from "./ButtonStepper";
import logo from "../assets/logo.png";
import { paymentMethod } from "../data/data";
import moment from "moment";
import { createOrder } from "../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import ModalSuccessPayment from "./ModalSuccessPayment";
import StripeForm from "../payment/StripeForm";
import CashForm from "../payment/CashForm";

const CheckAndPayment = ({
  handlePrevStep,
  keyStep,
  valueSender,
  valueReceiver,
  valueParcel,
  valuePrice,
  dateExpected,
  priceParcel,
}) => {
  const dispatch = useDispatch();
  const { alert, auth, socket } = useSelector((state) => state);
  const { userId } = auth;

  const [checkSuccess, setCheckSuccess] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { nameSender, senderAddress, phoneSender, note, senderPosition } =
    valueSender;
  const { nameReceiver, receiverAddress, phoneReceiver, receiverPosition } =
    valueReceiver;
  const { nameParcel, dateStart, weightParcel, bonusServices } = valueParcel;
  const { nameTrans, unitTrans, distance, priceTax, priceService, priceTotal } =
    valuePrice;

  const priceTotalFixed = priceTotal.toFixed();

  let dateNow = moment(new Date()).format("DD-MM-YYYY");

  const handleCheckSuccess = () => {
    setCheckSuccess(!checkSuccess);
  };

  const handlePaymentCash = ({}) => {
    dispatch(
      createOrder({
        data: {
          userId,
          nameSender,
          senderAddress,
          phoneSender,
          note,
          senderPosition,
          nameReceiver,
          receiverAddress,
          phoneReceiver,
          receiverPosition,
          nameParcel,
          dateStart,
          weightParcel,
          bonusServices,
          nameTrans,
          unitTrans,
          distance,
          priceTax,
          priceService,
          priceTotal,
          dateExpected,
          priceParcel,
          payMethod: "tiền mặt",
          checkPay: "unpaid",
        },
        auth: auth,
        socket: socket,
      })
    );
    if (!alert.loading) {
      setIsOpenModal(true);
    }
  };

  return (
    <>
      {isOpenModal ? <ModalSuccessPayment /> : null}
      <div className="check_and_payment">
        <div className="check_and_payment_content col-lg-12">
          <div className="row">
            <div className="content_check_left col-lg-8">
              <div className="check_top">
                <img src={logo} alt="logo" className="logo_check" />
                <div className="invoice">
                  <h4 className="trans_name">{nameTrans}</h4>
                  <h6 className="trans_unit">Đơn vị: {unitTrans}</h6>
                  <div className="invoice_date">
                    Ngày tạo đơn {`${dateNow}`}
                  </div>
                  <div className="invoice_due_date">
                    Ngày khởi hành {`${moment(dateStart).format("DD-MM-YYYY")}`}
                  </div>
                  <div className="invoice_due_date">
                    Ngày dự kiến giao{" "}
                    {`${moment(dateExpected).format("DD-MM-YYYY")}`}
                  </div>
                </div>
              </div>
              <div className="check_middle">
                <div className="payment_information col-md-12">
                  <div className="infor_pay col-md-6">
                    <div className="price">
                      <span>{`${parseInt(
                        priceTotalFixed
                      ).toLocaleString()} VND`}</span>
                      <p className="text_price">Tổng tiền</p>
                    </div>
                  </div>
                  <div className="intro_pay col-md-6 px-2">
                    {paymentMethod.map((item) => {
                      const image = item.image;
                      return (
                        <div key={item.id}>
                          <div className="content_intro">
                            <div className="content_img_intro">
                              {image.map((itemImg, index) => {
                                return (
                                  <img src={itemImg} alt="img" key={index} />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="customer_information col-md-12">
                  <div className="row">
                    <div className="customer_from customer col-md-6">
                      <div className="title_from title">Người gửi:</div>
                      <hr style={{ width: "100%" }} />
                      <p className="name_to name">{`* ${nameSender}`}</p>
                      <p className="address_to address">{`* ${senderAddress}`}</p>
                      <p className="phone_to phone">{`* ${phoneSender}`}</p>
                    </div>
                    <div className="customer_to customer col-md-6">
                      <div className="title_to title">Người nhận:</div>
                      <hr style={{ width: "100%" }} />
                      <p className="name_from name">{`* ${nameReceiver}`}</p>
                      <p className="address_from address">{`* ${receiverAddress}`}</p>
                      <p className="phone_from phone">{`* ${phoneReceiver}`}</p>
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
                        <td>{nameParcel}</td>
                        <td>{`${weightParcel}kg`}</td>
                        <td>{`${priceParcel.toLocaleString()} vnd`}</td>
                        <td>{`${priceService.toLocaleString()} vnd`}</td>
                        <td>2.00%</td>
                        <td>
                          {`${(priceTotal - priceTax).toLocaleString()} vnd`}
                        </td>
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
                    <p>{`${parseInt(priceTotalFixed).toLocaleString()} vnd`}</p>
                  </div>
                </div>
                <div className="note_thanks">
                  <small>
                    Cảm ơn quý khách đã ủng hộ dịch vụ của chúng tôi!
                  </small>
                </div>
              </div>
            </div>
            <div className="content_payment_right col-lg-4">
              <h2 className="title_payment">Thanh toán</h2>
              <div className="table_payment">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tên loại phí</th>
                      <th>Tổng mỗi loại phí</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Phí vận chuyển</th>
                      <td>{`${priceParcel.toLocaleString()} VND`}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phí dịch vụ</th>
                      <td>{`${priceService.toLocaleString()} VND`}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phí thuế</th>
                      <td>{`${parseInt(priceTax).toLocaleString()} VND`}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">TỔNG PHÍ THANH TOÁN</th>
                      <th>{`${parseInt(priceTotal).toLocaleString()} VND`}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="btn_success_payment">
                <div className="verify_payment">
                  <div className="check_verify" onClick={handleCheckSuccess}>
                    {checkSuccess ? <div className="success"></div> : ""}
                  </div>
                  <small>
                    Tôi đã kiểm tra và chắc chắn hoàn tất đúng mọi thông tin.
                  </small>
                </div>
              </div>
              {checkSuccess ? (
                <div className="choose_payment_method">
                  <div className="title_payment">Chọn phương thức</div>
                  <CashForm handlePaymentCash={handlePaymentCash} />
                  <StripeForm
                    amountVND={priceTotal}
                    userId={userId}
                    nameSender={nameSender}
                    senderAddress={senderAddress}
                    phoneSender={phoneSender}
                    note={note}
                    senderPosition={senderPosition}
                    nameReceiver={nameReceiver}
                    receiverAddress={receiverAddress}
                    phoneReceiver={phoneReceiver}
                    receiverPosition={receiverPosition}
                    nameParcel={nameParcel}
                    dateStart={dateStart}
                    weightParcel={weightParcel}
                    bonusServices={bonusServices}
                    nameTrans={nameTrans}
                    unitTrans={unitTrans}
                    distance={distance}
                    priceTax={priceTax}
                    priceService={priceService}
                    dateExpected={dateExpected}
                    priceParcel={priceParcel}
                    priceTotal={priceTotal}
                    payMethod={""}
                    checkPay={""}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <ButtonStepper handlePrevStep={handlePrevStep} keyStep={keyStep} />
    </>
  );
};

export default CheckAndPayment;
