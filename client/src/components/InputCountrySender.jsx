import React, { useEffect, useState } from "react";
import axios from "axios";

const InputCountrySender = ({
  setValueSender,
  valueSender,
  handleSearchSender,
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
  alert,
}) => {
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCitiesSender(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCitySender(cityName);

    const selectedCityData = citiesSender.find(
      (city) => city.Name === cityName
    );
    if (selectedCityData) {
      setDistrictsSender(selectedCityData.Districts);
      setSelectedDistrictSender("");
      setWardsSender([]);
    }
  };

  const handleDistrictChange = (event) => {
    const districtName = event.target.value;
    setSelectedDistrictSender(districtName);

    const selectedCityData = citiesSender.find(
      (city) => city.Name === selectedCitySender
    );
    if (selectedCityData) {
      const selectedDistrictData = selectedCityData.Districts.find(
        (district) => district.Name === districtName
      );
      if (selectedDistrictData) {
        setWardsSender(selectedDistrictData.Wards);
      }
    }
  };
  const handleWardChange = (event) => {
    const wardName = event.target.value;
    setSelectedWardSender(wardName);
  };

  useEffect(() => {
    setValueSender({
      ...valueSender,
      senderAddress:
        `${addressDetailSender}, ${selectedWardSender}, ${selectedDistrictSender}, ${selectedCitySender}`.replace(
          /^,?\s*/,
          ""
        ),
    });
  }, [
    addressDetailSender,
    selectedCitySender,
    selectedDistrictSender,
    selectedWardSender,
  ]);

  return (
    <div className="input_country">
      <div className="form-group mb-2">
        <select
          name="selectedCity"
          value={selectedCitySender}
          onChange={handleCityChange}
          className="form-control"
          onBlur={handleSearchSender}
        >
          <option value="">Tỉnh/thành phố</option>
          {citiesSender.map((city) => (
            <option key={city.Id} value={city.Name}>
              {city.Name}
            </option>
          ))}
        </select>
        <small className="text-danger">
          {alert.err.selectedCitySender
            ? `* ${alert.err.selectedCitySender}`
            : ""}
        </small>
      </div>
      <div className="form-group mb-2">
        <select
          name="selectedDistrict"
          value={selectedDistrictSender}
          onChange={handleDistrictChange}
          className="form-control"
          onBlur={handleSearchSender}
        >
          <option value="">Quận/huyện</option>
          {districtsSender.map((district) => (
            <option key={district.Id} value={district.Name}>
              {district.Name}
            </option>
          ))}
        </select>
        <small className="text-danger">
          {alert.err.selectedDistrictSender
            ? `* ${alert.err.selectedDistrictSender}`
            : ""}
        </small>
      </div>
      <div className="form-group mb-2">
        <select
          name="selectedWard"
          value={selectedWardSender}
          onChange={handleWardChange}
          className="form-control"
          onBlur={handleSearchSender}
        >
          <option value="">Xã/phường</option>
          {wardsSender.map((ward) => (
            <option key={ward.Id} value={ward.Name}>
              {ward.Name}
            </option>
          ))}
        </select>
        <small className="text-danger">
          {alert.err.selectedWardSender
            ? `* ${alert.err.selectedWardSender}`
            : ""}
        </small>
      </div>
      <div className="form-group mb-2">
        <input
          type="text"
          className="form-control"
          value={addressDetailSender}
          name="addressDetail"
          placeholder="Địa chỉ chi tiết"
          onChange={(e) => setAddressDetailSender(e.target.value)}
          onBlur={handleSearchSender}
        />
      </div>
    </div>
  );
};

export default InputCountrySender;
