import React, { useEffect, useState } from "react";
import axios from "axios";

const InputCountryReceiver = ({
  setValueReceiver,
  valueReceiver,
  handleSearchReceiver,
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
        setCitiesReceiver(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCityReceiver(cityName);

    const selectedCityData = citiesReceiver.find(
      (city) => city.Name === cityName
    );
    if (selectedCityData) {
      setDistrictsReceiver(selectedCityData.Districts);
      setSelectedDistrictReceiver("");
      setWardsReceiver([]);
    }
  };

  const handleDistrictChange = (event) => {
    const districtName = event.target.value;
    setSelectedDistrictReceiver(districtName);

    const selectedCityData = citiesReceiver.find(
      (city) => city.Name === selectedCityReceiver
    );
    if (selectedCityData) {
      const selectedDistrictData = selectedCityData.Districts.find(
        (district) => district.Name === districtName
      );
      if (selectedDistrictData) {
        setWardsReceiver(selectedDistrictData.Wards);
      }
    }
  };
  const handleWardChange = (event) => {
    const wardName = event.target.value;
    setSelectedWardReceiver(wardName);
  };

  useEffect(() => {
    setValueReceiver({
      ...valueReceiver,
      receiverAddress:
        `${addressDetailReceiver}, ${selectedWardReceiver}, ${selectedDistrictReceiver}, ${selectedCityReceiver}`.replace(
          /^,?\s*/,
          ""
        ),
    });
  }, [
    addressDetailReceiver,
    selectedCityReceiver,
    selectedDistrictReceiver,
    selectedWardReceiver,
  ]);

  return (
    <div className="input_country">
      <div className="form-group mb-2">
        <select
          name="selectedCity"
          value={selectedCityReceiver}
          onChange={handleCityChange}
          className="form-control"
          onBlur={handleSearchReceiver}
        >
          <option value="">Tỉnh/thành phố</option>
          {citiesReceiver.map((city) => (
            <option key={city.Id} value={city.Name}>
              {city.Name}
            </option>
          ))}
        </select>
        <small className="text-danger">
          {alert.err.selectedCityReceiver
            ? `* ${alert.err.selectedCityReceiver}`
            : ""}
        </small>
      </div>
      <div className="form-group mb-2">
        <select
          name="selectedDistrict"
          value={selectedDistrictReceiver}
          onChange={handleDistrictChange}
          className="form-control"
          onBlur={handleSearchReceiver}
        >
          <option value="">Quận/huyện</option>
          {districtsReceiver.map((district) => (
            <option key={district.Id} value={district.Name}>
              {district.Name}
            </option>
          ))}
        </select>
        <small className="text-danger">
          {alert.err.selectedDistrictReceiver
            ? `* ${alert.err.selectedDistrictReceiver}`
            : ""}
        </small>
      </div>
      <div className="form-group mb-2">
        <select
          name="selectedWard"
          value={selectedWardReceiver}
          onChange={handleWardChange}
          className="form-control"
          onBlur={handleSearchReceiver}
        >
          <option value="">Xã/phường</option>
          {wardsReceiver.map((ward) => (
            <option key={ward.Id} value={ward.Name}>
              {ward.Name}
            </option>
          ))}
        </select>
        <small className="text-danger">
          {alert.err.selectedWardReceiver
            ? `* ${alert.err.selectedWardReceiver}`
            : ""}
        </small>
      </div>
      <div className="form-group mb-2">
        <input
          type="text"
          className="form-control"
          value={addressDetailReceiver}
          name="addressDetail"
          placeholder="Địa chỉ chi tiết"
          onChange={(e) => setAddressDetailReceiver(e.target.value)}
          onBlur={handleSearchReceiver}
        />
      </div>
    </div>
  );
};

export default InputCountryReceiver;
