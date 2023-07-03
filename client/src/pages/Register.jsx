import React, { useEffect, useState } from "react";
import { register } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import logo from "../assets/logo.png";
import logogif from "../assets/text-light.gif";
import "../styles/Register.scss";

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    fullname: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { username, email, fullname, password, cf_password } = userData;

  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (alert.success && auth.userId) {
      navigate("/verify_email");
    }
  }, [alert.success, auth.userId]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(register(userData));
  };
  return (
    <div className="register_container">
      <div className="register_content">
        <div className="register">
          <div className="content_left">
            <div className="box_left">
              <div className="logo_mini">
                <img src={logogif} alt="logo" width={200} />
              </div>
              <p className="slogan">Nhanh - Gọn - Khỏe</p>
            </div>
          </div>
          <div className="content_right">
            <div className="box_right">
              <div className="top">
                <div className="title_register">
                  <span>Register</span>
                  <img src={logo} alt="logo" width={80} />
                </div>
                <div className="change_link">
                  Don't have an account? <Link to="/login">Login</Link>
                </div>
              </div>
              <div className="bottom">
                <form className="form_register" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <div className="input_content">
                      <input
                        type="email"
                        className="form-control input_register input_email"
                        id="inputEmail"
                        placeholder="Enter email"
                        onChange={handleChangeInput}
                        value={email}
                        name="email"
                      />
                      <span
                        className="text-danger check_error"
                        style={{
                          transition: "0.5s all ease",
                          fontSize: "12px",
                          fontStyle: "italic",
                          height: "10px",
                        }}
                      >
                        {alert.errTypeEmail === "email"
                          ? `* ${alert.errMsgEmail}`
                          : ""}
                        {alert.type === "emailRegister"
                          ? `* ${alert.error}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputUsername">Username</label>
                    <div className="input_content">
                      <input
                        type="text"
                        className="form-control input_register input_username"
                        id="inputUsername"
                        placeholder="Enter username"
                        onChange={handleChangeInput}
                        value={username}
                        name="username"
                      />
                      <span
                        className="text-danger check_error"
                        style={{
                          transition: "0.5s all ease",
                          fontSize: "12px",
                          fontStyle: "italic",
                          height: "10px",
                        }}
                      >
                        {alert.errTypeUsername === "username"
                          ? `* ${alert.errMsgUsername}`
                          : ""}
                        {alert.type === "usernameRegister"
                          ? `* ${alert.error}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputFullname">Fullname</label>
                    <div className="input_content">
                      <input
                        type="text"
                        className="form-control input_register input_fullname"
                        id="inputFullname"
                        placeholder="Enter fullname"
                        onChange={handleChangeInput}
                        value={fullname}
                        name="fullname"
                      />
                      <span
                        className="text-danger check_error"
                        style={{
                          transition: "0.5s all ease",
                          fontSize: "12px",
                          fontStyle: "italic",
                          height: "10px",
                        }}
                      >
                        {alert.errTypeUsername === "username"
                          ? `* ${alert.errMsgUsername}`
                          : ""}
                        {alert.type === "usernameRegister"
                          ? `* ${alert.error}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputpPassword">Password</label>
                    <div className="input_content">
                      <input
                        type="password"
                        className="form-control input_register input_password"
                        id="inputpPassword"
                        placeholder="Password"
                        onChange={handleChangeInput}
                        value={password}
                        name="password"
                      />
                      <span
                        className="text-danger check_error"
                        style={{
                          transition: "0.5s all ease",
                          fontSize: "12px",
                          fontStyle: "italic",
                          height: "10px",
                        }}
                      >
                        {alert.errTypePassword === "password"
                          ? `* ${alert.errMsgPassword}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputpCfPassword">Confirm password</label>
                    <div className="input_content">
                      <input
                        type="password"
                        className="form-control input_register input_cf_password"
                        id="inputpCfPassword"
                        placeholder="Confirm password"
                        onChange={handleChangeInput}
                        value={cf_password}
                        name="cf_password"
                      />
                      <span
                        className="text-danger check_error"
                        style={{
                          transition: "0.5s all ease",
                          fontSize: "12px",
                          fontStyle: "italic",
                          height: "10px",
                        }}
                      >
                        {alert.errTypeCfpassword === "cf_password"
                          ? `* ${alert.errMsgCfpassword}`
                          : ""}
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn_register">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
