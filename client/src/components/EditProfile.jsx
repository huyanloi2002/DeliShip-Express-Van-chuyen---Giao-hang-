import React, { useState } from "react";
import "../styles/EditProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions/userAction";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { userId, token } = auth;

  const inputValue = {
    phone: auth.phone,
    address: auth.address,
    identityCard: auth.identityCard,
  };
  const [updateValue, setUpdateValue] = useState(inputValue);
  const { phone, address, identityCard } = updateValue;
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState(auth.avatar);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewAvatar(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUpdateValue({ ...updateValue, [name]: value });
    }
  };

  const handleSubmitUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile(userId, token, { phone, address, identityCard, avatar })
    );
  };

  return (
    <div className="edit_profile">
      <div className="edit_profile_content">
        <div className="title_edit_profile">
          <h5>Chỉnh sửa thông tin cá nhân</h5>
          <form className="form_edit" onSubmit={handleSubmitUpdateProfile}>
            <div className="row">
              <div className="form_input col-6">
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại: </label>
                  <input
                    type="number"
                    className="form-control input_phone"
                    placeholder="Số điện thoại"
                    name="phone"
                    value={phone}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ: </label>
                  <input
                    type="text"
                    className="form-control input_address"
                    placeholder="Địa chỉ"
                    name="address"
                    value={address}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="identityCard">CMND/CCCD: </label>
                  <input
                    type="number"
                    className="form-control input_identityCard"
                    placeholder="CMND/CCCD"
                    name="identityCard"
                    value={identityCard}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="form_avatar col-6">
                <div className="form-group">
                  <label htmlFor="avatar">Hình đại diện (chọn vào ảnh):</label>
                  <div>
                    <figure className="mr-3 item-rtl">
                      <img
                        src={previewAvatar}
                        className="preview_avatar"
                        alt="previewAvatar"
                      />
                      <input
                        type="file"
                        name="avatar"
                        className="avatar_account"
                        onChange={handleChangeInput}
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <div className="form_button col-12">
              <button className="btn_edit">Cập nhật thông tin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
