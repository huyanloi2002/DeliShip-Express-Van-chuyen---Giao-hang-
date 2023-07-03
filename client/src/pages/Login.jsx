import React, { useEffect, useState } from "react";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import logo from "../assets/logo.png";
import logogif from "../assets/text-light.gif";
import "../styles/Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);

  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token && auth.verified) {
      navigate("/");
    }
  }, [auth.token, auth.verified]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="login_container">
      <div className="login_content">
        <div className="login">
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
                <div className="title_login">
                  <span>Login</span>
                  <img src={logo} alt="logo" width={80} />
                </div>
                <div className="change_link">
                  Have an account? <Link to="/register">Register</Link>
                </div>
              </div>
              <div className="bottom">
                <form className="form_login" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <div className="input_content">
                      <input
                        type="email"
                        className="form-control input_login input_email"
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
                        {alert.type === "emailLogin" ? `* ${alert.error}` : ""}
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputpPassword">Password</label>
                    <div className="input_content">
                      <input
                        type="password"
                        className="form-control input_login input_password"
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
                        }}
                      >
                        {alert.type === "passwordLogin"
                          ? `* ${alert.error}`
                          : ""}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn_login"
                    disabled={email && password ? false : true}
                  >
                    Login
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

export default Login;
