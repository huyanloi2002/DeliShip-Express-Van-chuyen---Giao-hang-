import React, { Suspense, lazy, useEffect, useState } from "react";
import ButtonStepper from "./ButtonStepper";
import axios from "axios";

import { useSelector } from "react-redux";

import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

import { bonusService } from "../data/data";
import Loading from "./Loading";
const Map = lazy(() => import("../components/Map"));
const InputCountrySender = lazy(() =>
  import("../components/InputCountrySender")
);
const InputCountryReceiver = lazy(() =>
  import("../components/InputCountryReceiver")
);

const currentDate = new Date().toISOString().split("T")[0];

const FillInformation = ({
  handleNextStep,
  handlePrevStep,
  keyStep,
  valueTrans,
  valueReceiver,
  setValueReceiver,
  setValueSender,
  valueSender,
  setValueParcel,
  valueParcel,
  setValuePrice,
  valuePrice,
  priceParcel,
  setPriceParcel,
  dateExpected,
  citiesSender,
  setCitiesSender,
  selectedCitySender,
  setSelectedCitySender,
  districtsSender,
  setDistrictsSender,
  selectedDistrictSender,
  setSelectedDistrictSender,
  wardsSender,
  setWardsSender,
  selectedWardSender,
  setSelectedWardSender,
  addressDetailSender,
  setAddressDetailSender,
  citiesReceiver,
  setCitiesReceiver,
  selectedCityReceiver,
  setSelectedCityReceiver,
  districtsReceiver,
  setDistrictsReceiver,
  selectedDistrictReceiver,
  setSelectedDistrictReceiver,
  wardsReceiver,
  setWardsReceiver,
  selectedWardReceiver,
  setSelectedWardReceiver,
  addressDetailReceiver,
  setAddressDetailReceiver,
}) => {
  const { alert } = useSelector((state) => state);
  const [locationNow, setLocationNow] = useState(false);

  const { nameSender, phoneSender, note, senderAddress } = valueSender;
  const { nameReceiver, phoneReceiver, receiverAddress } = valueReceiver;
  const { nameParcel, weightParcel, dateStart, bonusServices } = valueParcel;
  const { distance, priceTax, priceService, priceTotal } = valuePrice;

  const handleChooseBonusServices = (value) => {
    const checkBonusService = bonusServices.find(
      (el) => el.title === value.title
    );
    if (checkBonusService) {
      // Xóa giá trị khỏi mảng
      const updatedBonusServices = bonusServices.filter(
        (item) => item.title !== value.title
      );
      setValueParcel({ ...valueParcel, bonusServices: updatedBonusServices });
    } else {
      // Thêm giá trị mới vào mảng
      setValueParcel({
        ...valueParcel,
        bonusServices: [...bonusServices, value],
      });
    }
  };
  const handleOnChangeInputSender = (e) => {
    const { name, value } = e.target;
    setValueSender({ ...valueSender, [name]: value });
  };
  const handleOnChangeInputReceiver = (e) => {
    const { name, value } = e.target;
    setValueReceiver({ ...valueReceiver, [name]: value });
  };
  const handleOnChangeInputParcel = (e) => {
    const { name, value } = e.target;
    setValueParcel({ ...valueParcel, [name]: value });
  };
  const handleSearchSender = async () => {
    const key = "7cc710989a1249959ed69f38e581748a";
    try {
      const senderResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${senderAddress}&key=${key}`
      );

      const senderLat = senderResponse.data.results[0].geometry.lat;
      const senderLng = senderResponse.data.results[0].geometry.lng;

      setValueSender({
        ...valueSender,
        senderPosition: [senderLat, senderLng],
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleSearchReceiver = async () => {
    const key = "7cc710989a1249959ed69f38e581748a";
    try {
      const receiverResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${receiverAddress}&key=${key}`
      );

      const receiverLat = receiverResponse.data.results[0].geometry.lat;
      const receiverLng = receiverResponse.data.results[0].geometry.lng;

      setValueReceiver({
        ...valueReceiver,
        receiverPosition: [receiverLat, receiverLng],
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //hàm tính tống tiền dịch vụ
  useEffect(() => {
    let totalPriceServive = 0;
    bonusServices.forEach((value) => {
      let priceValue = value.price;
      totalPriceServive += priceValue;
    });
    if (totalPriceServive !== 0) {
      setValuePrice({ ...valuePrice, priceService: totalPriceServive });
    } else {
      setValuePrice({ ...valuePrice, priceService: 0 });
    }
  }, [bonusServices]);
  //hàm tính tỉnh tiền hàng hóa
  const { price } = valueTrans;
  useEffect(() => {
    let totalPriceParcel =
      (distance / 1000) * price + price * parseInt(weightParcel);
    setPriceParcel(totalPriceParcel !== 0 ? totalPriceParcel : 0);
  }, [price, distance, weightParcel]);

  //hàm tính tổng tiền cần thanh toán
  useEffect(() => {
    let totalPrice = priceService + priceParcel + priceTax;

    if (totalPrice !== 0) {
      setValuePrice({ ...valuePrice, priceTotal: totalPrice });
    } else {
      setValuePrice({ ...valuePrice, priceTotal: 0 });
    }
  }, [priceService, priceParcel, priceTax]);
  //hàm tính tiền thuế(2.5%)
  useEffect(() => {
    let totalPriceTax = (priceService + priceParcel) * (2.5 / 100);

    if (totalPriceTax !== 0) {
      setValuePrice({ ...valuePrice, priceTax: totalPriceTax });
    } else {
      setValuePrice({ ...valuePrice, priceTax: 0 });
    }
  }, [priceService, priceParcel]);
  return (
    <>
      <div className="fill_information">
        <div className="fill_information_content col-md-12">
          <div className="row">
            <div className="form_content form_content_left col-md-8">
              <div className="content_sender content">
                <h5 className="mb-4 text-center text-uppercase fw-bold">
                  Thông tin người gửi
                </h5>
                <div className="form-group">
                  <label htmlFor="nameSender">Tên người gửi:</label>
                  <input
                    type="text"
                    name="nameSender"
                    className="form-control"
                    value={nameSender}
                    onChange={(e) => handleOnChangeInputSender(e)}
                  />
                  <small className="text-danger">
                    {alert.err.nameSender ? `* ${alert.err.nameSender}` : ""}
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="addressSender">Địa chỉ người gửi:</label>
                  <div className="content_input_sender_address">
                    <Suspense fallback={<Loading />}>
                      <InputCountrySender
                        setValueSender={setValueSender}
                        valueSender={valueSender}
                        handleSearchSender={handleSearchSender}
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
                        alert={alert}
                      />
                    </Suspense>
                  </div>
                  <div></div>
                </div>
                <div className="form-group">
                  <label htmlFor="phoneSender">Số điện thoại:</label>
                  <input
                    type="phone"
                    name="phoneSender"
                    className="form-control"
                    value={phoneSender}
                    onChange={(e) => handleOnChangeInputSender(e)}
                  />
                  <small className="text-danger">
                    {alert.err.phoneSender ? `* ${alert.err.phoneSender}` : ""}
                  </small>
                </div>
                <div className="form-group">
                  <div className="note_special">
                    <label htmlFor="noteSpecial">
                      Ghi chú đặc biệt về bưu kiện (nếu có):{" "}
                    </label>
                    <textarea
                      name="note"
                      id="noteSpecial"
                      rows="4"
                      className="form-control"
                      value={note}
                      onChange={(e) => handleOnChangeInputSender(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="content_receiver content">
                <h5 className="mb-4 text-center text-uppercase fw-bold">
                  Thông tin người nhận
                </h5>
                <div className="form-group">
                  <label htmlFor="nameReceiver">Tên người nhận:</label>
                  <input
                    type="text"
                    name="nameReceiver"
                    className="form-control"
                    value={nameReceiver}
                    onChange={(e) => handleOnChangeInputReceiver(e)}
                  />
                  <small className="text-danger">
                    {alert.err.nameReceiver
                      ? `* ${alert.err.nameReceiver}`
                      : ""}
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="addressReceiver">Địa chỉ người nhận:</label>
                  <Suspense fallback={<Loading />}>
                    <InputCountryReceiver
                      setValueReceiver={setValueReceiver}
                      valueReceiver={valueReceiver}
                      handleSearchReceiver={handleSearchReceiver}
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
                      alert={alert}
                    />
                  </Suspense>
                </div>
                <div className="form-group">
                  <label htmlFor="phoneReceiver">Số điện thoại:</label>
                  <input
                    type="phone"
                    name="phoneReceiver"
                    className="form-control"
                    value={phoneReceiver}
                    onChange={(e) => handleOnChangeInputReceiver(e)}
                  />
                  <small className="text-danger">
                    {alert.err.phoneReceiver
                      ? `* ${alert.err.phoneReceiver}`
                      : ""}
                  </small>
                </div>
              </div>
              <div className="content_infor_parcel content">
                <h5 className="mb-4 text-center text-uppercase fw-bold">
                  Thông tin bưu kiện (đơn hàng)
                </h5>
                <div className="form-group">
                  <label htmlFor="nameParcel">Tên bưu kiện:</label>
                  <input
                    type="text"
                    name="nameParcel"
                    className="form-control"
                    value={nameParcel}
                    onChange={(e) => handleOnChangeInputParcel(e)}
                  />
                  <small className="text-danger">
                    {alert.err.nameParcel ? `* ${alert.err.nameParcel}` : ""}
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="weightParcel">Trọng lượng:</label>
                  <input
                    type="number"
                    name="weightParcel"
                    className="form-control"
                    value={weightParcel}
                    onChange={(e) => handleOnChangeInputParcel(e)}
                  />
                  <small className="text-danger">
                    {alert.err.weightParcel
                      ? `* ${alert.err.weightParcel}`
                      : ""}
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="dateStart">Thời gian xuất phát:</label>
                  <input
                    type="date"
                    name="dateStart"
                    className="departure_datetime form-control"
                    value={dateStart}
                    min={currentDate}
                    onChange={(e) => handleOnChangeInputParcel(e)}
                  />
                </div>
                <div className="form-group">
                  <div className="bonus_services">
                    <span className="title_bonus_services">
                      Dịch vụ bổ sung (nếu có):
                    </span>
                    <div className="services_content">
                      {bonusService &&
                        bonusService.map((item, index) => {
                          return (
                            <div
                              className={`service_card ${
                                bonusServices.find(
                                  (el) => el.title === item.title
                                )
                                  ? "active"
                                  : ""
                              }`}
                              key={index}
                              onClick={() =>
                                handleChooseBonusServices({
                                  price: item.price,
                                  title: item.title,
                                })
                              }
                            >
                              <div className="service_radio">
                                <div className="radio"></div>
                              </div>
                              <div className="service_ct">
                                <div className="service_title">
                                  {item.title}
                                </div>
                                <p className="service_desc">{item.desc}</p>
                                <div className="service_price">
                                  {item.price} VND
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form_content form_content_right col-md-4">
              <div className="content content_transportation">
                <h5 className="mb-4 text-center text-uppercase fw-bold">
                  Thông tin vận tải
                </h5>
                <div className="form-group d-flex justify-content-between">
                  <div className="trans">
                    <span className="title_trans">Phương thức vận chuyển:</span>
                    <p className="text_trans">{valueTrans.name}</p>
                  </div>
                  <div className="unit_trans">
                    <span className="title_unit_trans">Đơn vị vận chuyển:</span>
                    <p className="text_unit_trans">DeliShip Express</p>
                  </div>
                </div>
                <div className="form-group">
                  <div className="map_delivery">
                    <span className="title_map_delivery">Vị trí:</span>
                    <div className="content_map">
                      <Suspense fallback={<Loading />}>
                        <Map
                          valueTrans={valueTrans}
                          setLocationNow={setLocationNow}
                          locationNow={locationNow}
                          valueSender={valueSender}
                          setValueSender={setValueSender}
                          valueReceiver={valueReceiver}
                          setValueReceiver={setValueReceiver}
                          valuePrice={valuePrice}
                          setValuePrice={setValuePrice}
                        />
                      </Suspense>
                    </div>
                  </div>
                </div>
                <div className="form-group d-flex justify-content-between mt-2">
                  <div className="date_delivery">
                    <span className="title_date_delivery">
                      Thời gian dự kiến giao:
                    </span>
                    <p className="text_date_delivery">
                      {distance ? moment(dateExpected).format("llll") : null}
                    </p>
                  </div>
                  <div className="distance_delivery">
                    <span className="title_distance_delivery">
                      Quảng đường:
                    </span>
                    <p className="text_distance_delivery">
                      {distance ? `${distance} km` : null}
                    </p>
                  </div>
                </div>
              </div>
              <div className="content content_total_amount">
                <div className="mb-2 text-left text-uppercase d-flex justify-content-between">
                  <h5 className="fw-bold">Tổng thành tiền:</h5>
                  <h5 className="fw-bold">{`${
                    priceTotal ? parseInt(priceTotal).toLocaleString() : 0
                  } VND`}</h5>
                </div>
                <div className="form-group">
                  <div className="total_product d-flex justify-content-between">
                    <span className="title">Tổng phí hàng hóa:</span>
                    <p className="text">{`${
                      priceParcel ? parseInt(priceParcel).toLocaleString() : 0
                    } VND`}</p>
                  </div>
                  <div className="total_taxation d-flex justify-content-between">
                    <span className="title">Tổng phí thuế (2,5%):</span>
                    <p className="text">{`${
                      priceTax ? parseInt(priceTax).toLocaleString() : 0
                    } VND`}</p>
                  </div>
                  <div className="total_services d-flex justify-content-between">
                    <span className="title">Tổng phí dịch vụ:</span>
                    <p className="text">{`${priceService.toLocaleString()} VND`}</p>
                  </div>
                  {/* <div className="promotion d-flex justify-content-between">
                    <span className="title">Khuyến mãi:</span>
                    <p className="text">1000</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <ButtonStepper
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          keyStep={keyStep}
          nameSender={nameSender}
          senderAddress={senderAddress}
          phoneSender={phoneSender}
          nameReceiver={nameReceiver}
          receiverAddress={receiverAddress}
          phoneReceiver={phoneReceiver}
          nameParcel={nameParcel}
          weightParcel={weightParcel}
        />
      }
    </>
  );
};

export default FillInformation;
