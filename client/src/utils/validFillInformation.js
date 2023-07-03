const validFillInformation = ({
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
}) => {
  const err = {};
  const type = {};

  if (!nameSender) {
    err.nameSender = "Vui lòng thêm tên người gửi.";
    type.nameSender = "nameSender";
  } else if (nameSender.length < 8) {
    err.nameSender = "Tên người gửi không được dưới 8 kí tự";
    type.nameSender = "nameSender";
  } else if (nameSender.length > 50) {
    err.nameSender = "Tên người gửi đã quá số kí tự";
    type.nameSender = "nameSender";
  }

  if (!nameReceiver) {
    err.nameReceiver = "Vui lòng thêm tên người nhận.";
    type.nameReceiver = "nameReceiver";
  } else if (nameReceiver.length < 8) {
    err.nameReceiver = "Tên người nhận không được dưới 8 kí tự";
    type.nameReceiver = "nameReceiver";
  } else if (nameSender.length > 50) {
    err.nameReceiver = "Tên người nhận đã quá số kí tự";
    type.nameReceiver = "nameReceiver";
  }

  if (!selectedCitySender) {
    err.selectedCitySender = "Vui lòng chọn tỉnh/thành phố người gửi";
    type.selectedCitySender = "selectedCitySender";
  }

  if (!selectedDistrictSender) {
    err.selectedDistrictSender = "Vui lòng chọn quận/huyện người gửi";
    type.selectedDistrictSender = "selectedDistrictSender";
  }

  if (!selectedWardSender) {
    err.selectedWardSender = "Vui lòng chọn phường/xã người gửi";
    type.selectedWardSender = "selectedWardSender";
  }

  if (!selectedCityReceiver) {
    err.selectedCityReceiver = "Vui lòng chọn tỉnh/thành phố người nhận";
    type.selectedCityReceiver = "selectedCityReceiver";
  }

  if (!selectedDistrictReceiver) {
    err.selectedDistrictReceiver = "Vui lòng chọn quận/huyện người nhận";
    type.selectedDistrictReceiver = "selectedDistrictReceiver";
  }

  if (!selectedWardReceiver) {
    err.selectedWardReceiver = "Vui lòng chọn phường/xã phố người nhận";
    type.selectedWardReceiver = "selectedWardReceiver";
  }

  if (!phoneSender) {
    err.phoneSender = "Vui lòng nhập số điện thoại người gửi";
    type.phoneSender = "phoneSender";
  } else if (!validatePhone(phoneSender)) {
    err.phoneSender = "Số điện thoại người gửi không đúng định dạng";
    type.phoneSender = "phoneSender";
  }

  if (!phoneReceiver) {
    err.phoneReceiver = "Vui lòng nhập số điện thoại người nhận";
    type.phoneReceiver = "phoneReceiver";
  } else if (!validatePhone(phoneReceiver)) {
    err.phoneReceiver = "Số điện thoại người nhận không đúng định dạng";
    type.phoneReceiver = "phoneReceiver";
  }

  if (!nameParcel) {
    err.nameParcel = "Vui lòng thêm tên bưu kiện.";
    type.nameParcel = "nameParcel";
  } else if (nameParcel.length < 4) {
    err.nameParcel = "Tên bưu kiện không được dưới 4 kí tự";
    type.nameParcel = "nameParcel";
  } else if (nameParcel.length > 40) {
    err.nameParcel = "Tên bưu kiện đã quá số kí tự";
    type.nameParcel = "nameParcel";
  }

  if (!weightParcel) {
    err.weightParcel = "Vui lòng nhập trọng lượng bưu kiện";
    type.weightParcel = "weightParcel";
  } else if (weightParcel <= 0) {
    err.weightParcel = "Trọng lượng không hợp lệ";
    type.weightParcel = "weightParcel";
  }

  return {
    errType: type,
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};
function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}
export default validFillInformation;
