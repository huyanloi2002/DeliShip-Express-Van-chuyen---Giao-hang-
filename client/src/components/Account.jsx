import React from "react";
import "../styles/Account.scss";
import { useSelector } from "react-redux";
import moment from "moment";

const Account = () => {
  const { auth, user } = useSelector((state) => state);

  return (
    <div className="account">
      <div className="account_container">
        <div className="account_content">
          <div className="account_content_left">
            <h5 className="title_account">Độ bảo mật</h5>
            <div className="account_security">
              <div className="text_security">
                {auth.phone &&
                auth.address &&
                auth.identityCard &&
                auth.verified
                  ? "Mạnh"
                  : "Yếu"}
              </div>
            </div>
            <div className="note_security">
              <div className="note">
                <i
                  className="fa-regular fa-square-check"
                  style={{ color: `${auth.verified ? "green" : "red"}` }}
                ></i>
                <p
                  style={{ color: `${auth.verified ? "green" : "red"}` }}
                >{`50% (YẾU): Đăng ký tài khoản và xác nhận OTP qua email`}</p>
              </div>
              <div className="note">
                <i
                  className="fa-regular fa-square-check"
                  style={{
                    color: `${
                      auth.phone && auth.address && auth.identityCard
                        ? "green"
                        : "red"
                    }`,
                  }}
                ></i>
                <p
                  style={{
                    color: `${
                      auth.phone && auth.address && auth.identityCard
                        ? "green"
                        : "red"
                    }`,
                  }}
                >
                  {`100% (MẠNH): Cập nhật thông tin còn thiếu trong phần hồ sơ `}
                  {/* <a>tại đây</a> */}
                </p>
              </div>
            </div>
          </div>
          <div className="account_content_right">
            <h5 className="title_account">Thông tin cá nhân</h5>
            <div className="image_account">
              <img
                src={user.avatar ? user.avatar : auth.avatar}
                alt="avatar"
                className="avatar"
              />
            </div>
            <div className="account_info">
              <table>
                <tbody>
                  <tr>
                    <th>Tên: </th>
                    <td className="text-uppercase">{`${auth.fullname}`}</td>
                  </tr>
                  <tr>
                    <th>Email: </th>
                    <td>{`${auth.email}`}</td>
                  </tr>
                  <tr>
                    <th>Username: </th>
                    <td>{`@${auth.username}`}</td>
                  </tr>
                  <tr>
                    <th>Ngày tạo: </th>
                    <td>{moment(auth.createdAt, "YYYYMMDD").fromNow()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="warning_account text-danger">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <p>
            Vui lòng cập nhật đầy đủ thông tin, mới để tạo một kiện hàng mới
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
