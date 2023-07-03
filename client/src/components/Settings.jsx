import React from "react";
import "../styles/Settings.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="settings">
      <div className="settings_content">
        <ul className="list_settings">
          {role === "admin" && (
            <Link to="/admin">
              <li className="link_setting">Bảng điều khiển</li>
            </Link>
          )}
          <Link to="/profile">
            <li className="link_setting">Thông tin cá nhân</li>
          </Link>
          <li className="link_setting" onClick={handleLogout}>
            Đăng xuất
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Settings;
