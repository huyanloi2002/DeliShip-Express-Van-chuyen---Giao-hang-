import React, { useState, Suspense, lazy, useEffect } from "react";
import Stepper from "../components/Steppers";
import "../styles/CreateOrder.scss";
import { steppersItems } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import ModalErrorAddParcel from "../components/ModalErrorAddParcel";

import moment from "moment";
import "moment/dist/locale/vi";

moment.locale("vi");

const Transportation = lazy(() => import("../components/Transportation"));
const FillInformation = lazy(() => import("../components/FillInformation"));
const CheckAndPayment = lazy(() => import("../components/CheckAndPayment"));

import validFillInformation from "../utils/validFillInformation";
import { TYPES } from "../redux/actions/actionTypes";
import Loading from "../components/Loading";

const CreateOrder = () => {
  const { auth, alert } = useSelector((state) => state);
  const { phone, address, identityCard } = useSelector((state) => state.auth);
  const [activeStep, setActiveStep] = useState(0);
  //transportaition
  const [valueTrans, setValueTrans] = useState({});
  //fillinformation
  const [citiesSender, setCitiesSender] = useState([]);
  const [selectedCitySender, setSelectedCitySender] = useState("");
  const [districtsSender, setDistrictsSender] = useState([]);
  const [selectedDistrictSender, setSelectedDistrictSender] = useState("");
  const [wardsSender, setWardsSender] = useState([]);
  const [selectedWardSender, setSelectedWardSender] = useState("");
  const [addressDetailSender, setAddressDetailSender] = useState("");

  const [citiesReceiver, setCitiesReceiver] = useState([]);
  const [selectedCityReceiver, setSelectedCityReceiver] = useState("");
  const [districtsReceiver, setDistrictsReceiver] = useState([]);
  const [selectedDistrictReceiver, setSelectedDistrictReceiver] = useState("");
  const [wardsReceiver, setWardsReceiver] = useState([]);
  const [selectedWardReceiver, setSelectedWardReceiver] = useState("");
  const [addressDetailReceiver, setAddressDetailReceiver] = useState("");

  // giá trị người gửi
  const senderValue = {
    nameSender: auth.fullname,
    phoneSender: auth.phone,
    note: "",
    senderAddress: "",
    senderPosition: [21.028511, 105.804817],
  };
  const [valueSender, setValueSender] = useState(senderValue);

  // giá trị người nhận
  const receiverValue = {
    nameReceiver: "",
    phoneReceiver: "",
    receiverAddress: "",
    receiverPosition: [21.028511, 105.804817],
  };
  const [valueReceiver, setValueReceiver] = useState(receiverValue);

  // giá trị bưu kiện
  const parcelValue = {
    nameParcel: "",
    dateStart: moment(new Date()).format("YYYY-MM-DD"),
    weightParcel: 0,
    bonusServices: [],
  };
  const [valueParcel, setValueParcel] = useState(parcelValue);

  // giá trị tính tiền
  const priceValue = {
    nameTrans: "",
    unitTrans: "DELISHIP EXPRESS",
    distance: 0,
    priceTax: 0,
    priceService: 0,
    promotion: "",
    priceTotal: 0,
  };

  const [valuePrice, setValuePrice] = useState(priceValue);
  const [priceParcel, setPriceParcel] = useState(0);

  const { distance, priceTotal } = valuePrice;
  const { senderAddress, nameSender, phoneSender } = valueSender;
  const { receiverAddress, nameReceiver, phoneReceiver } = valueReceiver;
  const { dateStart, nameParcel, weightParcel } = valueParcel;
  const [dateExpected, setDateExpected] = useState("");

  //ngày dự kiến giao
  const { speed, value } = valueTrans;

  let deliveryDate = new Date(dateStart);
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  deliveryDate.setHours(
    deliveryDate.getHours() + value === "expedited"
      ? distance / speed + 1
      : distance / speed
  );
  const deliverDateConvert = moment(deliveryDate).format("YYYY-MM-DD");
  useEffect(() => {
    setDateExpected(deliverDateConvert.toString());
  }, [dateExpected, deliveryDate]);

  //payment
  const [valuePay, setValuePay] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeStep === 1) {
      const check = validFillInformation({
        nameSender,
        nameReceiver,
        selectedCityReceiver,
        selectedDistrictReceiver,
        selectedWardReceiver,
        selectedCitySender,
        selectedDistrictSender,
        selectedWardSender,
        phoneSender,
        phoneReceiver,
        nameParcel,
        weightParcel,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: {
          err: check.errMsg,
          lengthErr: check.errLength,
        },
      });
    }
  }, [
    dispatch,
    activeStep,
    nameSender,
    nameReceiver,
    selectedCityReceiver,
    selectedDistrictReceiver,
    selectedWardReceiver,
    selectedCitySender,
    selectedDistrictSender,
    selectedWardSender,
    phoneSender,
    phoneReceiver,
    nameParcel,
    weightParcel,
  ]);

  const handleNextStep = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);

      if (alert.lengthErr > 0) {
        setActiveStep(activeStep);
      } else {
        setActiveStep(activeStep + 1);
      }
    }
  };
  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <>
      {!phone && !address && !identityCard && <ModalErrorAddParcel />}
      <div className="create_order">
        <div className="container">
          <Stepper activeStep={activeStep} stepsItems={steppersItems} />
          {activeStep === 0 && (
            <>
              <Suspense fallback={<Loading />}>
                <Transportation
                  handleNextStep={handleNextStep}
                  keyStep="transportation"
                  valueTrans={valueTrans}
                  setValueTrans={setValueTrans}
                  setValuePrice={setValuePrice}
                  valuePrice={valuePrice}
                />
              </Suspense>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Suspense fallback={<Loading />}>
                <FillInformation
                  handleNextStep={handleNextStep}
                  handlePrevStep={handlePrevStep}
                  keyStep="fillInformation"
                  valueTrans={valueTrans}
                  setValueSender={setValueSender}
                  valueSender={valueSender}
                  setValueReceiver={setValueReceiver}
                  valueReceiver={valueReceiver}
                  setValueParcel={setValueParcel}
                  valueParcel={valueParcel}
                  setValuePrice={setValuePrice}
                  valuePrice={valuePrice}
                  priceParcel={priceParcel}
                  setPriceParcel={setPriceParcel}
                  dateExpected={dateExpected}
                  citiesSender={citiesSender}
                  setCitiesSender={setCitiesSender}
                  selectedCitySender={selectedCitySender}
                  setSelectedCitySender={setSelectedCitySender}
                  districtsSender={districtsSender}
                  setDistrictsSender={setDistrictsSender}
                  selectedDistrictSender={selectedDistrictSender}
                  setSelectedDistrictSender={setSelectedDistrictSender}
                  wardsSender={wardsSender}
                  setWardsSender={setWardsSender}
                  selectedWardSender={selectedWardSender}
                  setSelectedWardSender={setSelectedWardSender}
                  addressDetailSender={addressDetailSender}
                  setAddressDetailSender={setAddressDetailSender}
                  citiesReceiver={citiesReceiver}
                  setCitiesReceiver={setCitiesReceiver}
                  selectedCityReceiver={selectedCityReceiver}
                  setSelectedCityReceiver={setSelectedCityReceiver}
                  districtsReceiver={districtsReceiver}
                  setDistrictsReceiver={setDistrictsReceiver}
                  selectedDistrictReceiver={selectedDistrictReceiver}
                  setSelectedDistrictReceiver={setSelectedDistrictReceiver}
                  wardsReceiver={wardsReceiver}
                  setWardsReceiver={setWardsReceiver}
                  selectedWardReceiver={selectedWardReceiver}
                  setSelectedWardReceiver={setSelectedWardReceiver}
                  addressDetailReceiver={addressDetailReceiver}
                  setAddressDetailReceiver={setAddressDetailReceiver}
                />
              </Suspense>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Suspense fallback={<Loading />}>
                <CheckAndPayment
                  handlePrevStep={handlePrevStep}
                  keyStep="checkAndPayment"
                  priceTotal={priceTotal}
                  senderAddress={senderAddress}
                  nameSender={nameSender}
                  phoneSender={phoneSender}
                  receiverAddress={receiverAddress}
                  nameReceiver={nameReceiver}
                  phoneReceiver={phoneReceiver}
                  valueSender={valueSender}
                  valueReceiver={valueReceiver}
                  valueParcel={valueParcel}
                  valuePrice={valuePrice}
                  dateExpected={dateExpected}
                  priceParcel={priceParcel}
                />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
