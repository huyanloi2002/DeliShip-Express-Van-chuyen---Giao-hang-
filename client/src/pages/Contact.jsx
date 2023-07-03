import React, { useState } from "react";
import "../styles/Contact.scss";
import logo from "../assets/text-primary.gif";

import { useDispatch, useSelector } from "react-redux";
import { sendContact } from "../redux/actions/contactAction";

const Contact = () => {
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);

  const initialState = { fullname: "", email: "", phone: "", message: "" };
  const [contactData, setContactData] = useState(initialState);
  const { fullname, email, phone, message } = contactData;

  const handleChangeInput = (e) => {
    const { value, name } = e.target;

    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmitContact = (e) => {
    e.preventDefault();

    dispatch(sendContact({ data: contactData, auth }));
  };

  return (
    <div className="contact container">
      <div className="contact_content">
        <div className="row">
          <div className="content_contact_left col-md-6">
            <div className="title_desc">
              <h1>Liên hệ</h1>
              <blockquote className="desc">
                DELISHIP EXPRESS rất vui vì được tiếp nhận liên hệ của bạn. Có
                bất cứ điều gì cần phản hồi/giải đáp, gửi ngay cho chúng tôi bên
                dưới nhé!
              </blockquote>
            </div>
            <form className="form_contact" onSubmit={handleSubmitContact}>
              <div className="form-group">
                <label htmlFor="fullname">* Họ và tên</label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">* Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">* Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">* Tin nhắn phản hổi/giải đáp</label>
                <textarea
                  name="message"
                  id="message"
                  cols="50"
                  rows="10"
                  className="form-control"
                  value={message}
                  onChange={(e) => handleChangeInput(e)}
                ></textarea>
              </div>
              <button type="submit" className="save_contact">
                {alert.success ? (
                  <p className="text-light">{alert.success}</p>
                ) : (
                  "Gửi"
                )}
              </button>
            </form>
          </div>
          <div className="content_contact_right col-md-6">
            <div className="contact_us">
              <h3 className="title">Kết nối với DELISHIP EXPRESS</h3>
              <ul className="content_contact_us">
                <li className="hotline">
                  <div>
                    <i className="fa-solid fa-phone"></i>
                    <p>Hotline</p>
                  </div>
                  <strong>0764988537</strong>
                  <hr
                    style={{
                      backgroundColor: "white",
                      height: "1px",
                      marginTop: "1rem",
                    }}
                  />
                </li>

                <li className="email">
                  <div>
                    <i className="fa-solid fa-envelope"></i>
                    <p>Email</p>
                  </div>
                  <strong>huyanloi2002@gmail.com</strong>
                  <hr
                    style={{
                      backgroundColor: "white",
                      height: "1px",
                      marginTop: "1rem",
                    }}
                  />
                </li>
                <li className="address">
                  <div>
                    <i className="fa-solid fa-location-dot"></i>
                    <p>Địa chỉ liên hệ</p>
                  </div>
                  <strong>
                    KTX B1, Nguyễn Hoàng, Phường 7, Tp. Đà Lạt, Lâm Đồng
                  </strong>
                  <hr
                    style={{
                      backgroundColor: "white",
                      height: "1px",
                      marginTop: "1rem",
                    }}
                  />
                </li>
              </ul>
            </div>
            <div className="social">
              <h3 className="title_social">Mạng xã hội</h3>
              <ul className="content_social">
                <li>
                  <i className="fa-brands fa-facebook-f"></i>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>
                </li>
                <li>
                  <i className="fa-brands fa-youtube"></i>
                </li>
                <li>
                  <i className="fa-brands fa-twitter"></i>
                </li>
                <li>
                  <i className="fa-brands fa-tiktok"></i>
                </li>
              </ul>
            </div>
            <div className="image_brands">
              <img src={logo} alt="logo" width={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
