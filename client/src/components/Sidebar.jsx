import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="col-auto col-xl-2 col-xl-1 px-sm-1 px-0 overflow-x-scroll"
      style={{ backgroundColor: "var(--color-green)" }}
    >
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 ">
        {/* <a
              // href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a> */}
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start ul_dashboard"
          id="menu"
        >
          <li className="li_dashboard">
            <Link to="/admin" className="nav-link align-middle">
              <i className="fa-solid fa-gauge px-1"></i>
              <span className="ms-1 d-none d-xl-inline">Bảng điều khiển</span>
            </Link>
          </li>
          <li className="li_dashboard">
            <a
              href="#submenu2"
              data-bs-toggle="collapse"
              className="nav-link align-middle "
            >
              <i className="fa-solid fa-store px-1"></i>
              <span className="ms-1 d-none d-xl-inline">
                <span>Đơn hàng</span>
                <i className="fa-solid fa-caret-down px-2"></i>
              </span>
            </a>
            <ul
              className="collapse nav flex-column collapse_link"
              id="submenu2"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <Link to="/admin/orders" className="nav-link">
                  <span className="d-none d-xl-inline">+ Quản lý đơn hàng</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/admin/orders_unconfirmed" className="nav-link">
                  <span className="d-none d-xl-inline">
                    + Đơn hàng chờ xác nhận
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/admin/orders_confirmed" className="nav-link">
                  <span className="d-none d-xl-inline">
                    + Đơn hàng chờ xuất đơn
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/admin/orders_delivering" className="nav-link">
                  <span className="d-none d-xl-inline">
                    + Đơn hàng đang vận chuyển
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/admin/orders_delivered" className="nav-link">
                  <span className="d-none d-xl-inline">
                    + Đơn hàng đã giao thành công
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/admin/orders_unpaid" className="nav-link">
                  <span className="d-none d-xl-inline">
                    + Đơn hàng chưa thanh toán
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link to="/admin/orders_paid" className="nav-link">
                  <span className="d-none d-xl-inline">
                    + Đơn hàng đã thanh toán
                  </span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="li_dashboard">
            <Link to="/admin/all_user" className="nav-link align-middle">
              <i className="fa-solid fa-gauge px-1"></i>
              <span className="ms-1 d-none d-xl-inline">
                Quản lý thông tin người dùng
              </span>
            </Link>
          </li>
          <li className="li_dashboard">
            <Link to="/admin/all_reviews" className="nav-link align-middle">
              <i className="fa-solid fa-gauge px-1"></i>
              <span className="ms-1 d-none d-xl-inline">
                Quản lý đánh giá đơn hàng
              </span>
            </Link>
          </li>
          <li className="li_dashboard">
            <Link to="/admin/all_contact" className="nav-link align-middle">
              <i className="fa-solid fa-gauge px-1"></i>
              <span className="ms-1 d-none d-xl-inline">
                Quản lý tin nhắn phản hồi
              </span>
            </Link>
          </li>
        </ul>
        {/* <hr />
        <div className="dropdown pb-4">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className="d-none d-sm-inline mx-1">loser</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
