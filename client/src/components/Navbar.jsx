import React, { useEffect, useState } from "react";
import logo from "../assets/text-primary.gif";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Notify from "../components/Notify";
import Settings from "./Settings";

import "../styles/Navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const [overview, setOverview] = useState(false);
  const [parcels, setParcels] = useState(false);
  const [prohibitedGoods, setProhibitedGoods] = useState(false);
  const [contact, setContact] = useState(false);
  const [policy, setPolicy] = useState(false);

  const [activeNotify, setActiveNotify] = useState(false);
  const [activeSetting, setActiveSetting] = useState(false);

  const pathName = location.pathname;

  const { auth } = useSelector((state) => state);

  const { data, dataPopupNoti } = useSelector((state) => state.notify);

  useEffect(() => {
    if (pathName === "/") {
      setOverview(true);
    } else {
      setOverview(false);
    }
    if (pathName === "/parcels") {
      setParcels(true);
    } else {
      setParcels(false);
    }
    if (pathName === "/prohibited_goods") {
      setProhibitedGoods(true);
    } else {
      setProhibitedGoods(false);
    }
    if (pathName === "/contact") {
      setContact(true);
    } else {
      setContact(false);
    }
    if (pathName === "/policy") {
      setPolicy(true);
    } else {
      setPolicy(false);
    }
  }, [
    pathName,
    setOverview,
    setParcels,
    setProhibitedGoods,
    setContact,
    setPolicy,
  ]);

  const handleChooseNotify = () => {
    setActiveNotify(!activeNotify);
    setActiveSetting(false);
  };
  const handleChooseSettings = () => {
    setActiveSetting(!activeSetting);
    setActiveNotify(false);
  };

  useEffect(() => {
    if (dataPopupNoti.user) {
      setActiveNotify(true);
    } else {
      setActiveNotify(false);
    }
  }, [dataPopupNoti]);

  let notifyIsRead = data.filter((item) => item.isRead === false);

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: `${
          auth.role === "admin"
            ? "var(--color-green)"
            : "var(--color-greenlight)"
        }`,
      }}
    >
      <div className="navbar_container">
        <div className="navbar_main ">
          <div className="logo_navbar">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="navbar_content position-relative">
            {activeNotify ? <Notify /> : null}
            {activeSetting ? <Settings /> : null}
            {auth.role !== "admin" && auth.role !== "sender" ? (
              <div className="search_navbar">
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="search_input"
                  placeholder="Tìm kiếm kiện hàng"
                />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            ) : null}
            <div className="function_navbar">
              <div className="noti_navbar" onClick={handleChooseNotify}>
                <i className="fa-regular fa-bell "></i>
                {notifyIsRead.length > 0 ? (
                  <i className="fa-solid fa-circle"></i>
                ) : null}
              </div>
              <div className="account_navbar" onClick={handleChooseSettings}>
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          </div>
        </div>
        {auth.role !== "admin" ? (
          <div className="navbar_direction">
            <ul className="navbar_group">
              <Link to="/">
                <li className={`navbar_link ${overview ? "active" : ""}`}>
                  Tổng quan
                </li>
              </Link>
              <Link to="/parcels">
                <li className={`navbar_link ${parcels ? "active" : ""}`}>
                  Kiện hàng
                </li>
              </Link>
              <Link to="/prohibited_goods">
                <li
                  className={`navbar_link ${prohibitedGoods ? "active" : ""}`}
                >
                  Hàng cấm gửi
                </li>
              </Link>
              <Link to="/contact">
                <li className={`navbar_link ${contact ? "active" : ""}`}>
                  Liên hệ
                </li>
              </Link>
              <Link to="/policy">
                <li className={`navbar_link ${policy ? "active" : ""}`}>
                  Chính sách
                </li>
              </Link>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
