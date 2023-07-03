import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import mastercard from "../assets/mastercard.png";
import visa from "../assets/visa.png";
import ModalSuccessPayment from "../components/ModalSuccessPayment";
import { useDispatch, useSelector } from "react-redux";
import { paymentCreditCard } from "../redux/actions/orderAction";

const keyApiStripe =
  "pk_test_51NLjCFHzTxAkjMmoLFoCM7aqy4sNEbzDq6qbbwuyZS3OVm93cYUblGDLmkNsj7CihqsF9V7314ONZ7SBLesLK3Ce00aUvNwLvM";

const StripeForm = ({
  amountVND,
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
  dateExpected,
  priceParcel,
  priceTotal,
  payMethod,
  checkPay,
}) => {
  const [amountUSD, setAmountUSD] = useState(0);
  const dispatch = useDispatch();
  const { alert, auth, socket } = useSelector((state) => state);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const convertVNDtoUSD = async () => {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/USD`
      );
      const data = await response.json();

      const exchangeRate = data.rates.VND;

      // // Chuyển đổi số tiền từ VND sang USD
      const convertedAmountUSD = amountVND / exchangeRate;

      setAmountUSD(parseFloat(convertedAmountUSD.toFixed(2)));
    };
    convertVNDtoUSD();
  }, [amountVND]);

  const handlePayment = (token) => {
    dispatch(
      paymentCreditCard({
        data: {
          token,
          amountUSD,
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
          dateExpected,
          priceParcel,
          priceTotal,
          payMethod: "credit card",
          checkPay: "paid",
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
      <div className="stripe_form">
        <StripeCheckout
          token={handlePayment}
          amount={amountUSD * 100}
          stripeKey={keyApiStripe}
          currency="USD"
        >
          <div className="button_payment">
            <i className="fa-regular fa-circle-check"></i>
            <p>Thanh toán bằng Credit Card</p>
            <img src={visa} alt="creditcard" />
            <img src={mastercard} alt="creditcard" />
          </div>
        </StripeCheckout>
      </div>
    </>
  );
};

export default StripeForm;
