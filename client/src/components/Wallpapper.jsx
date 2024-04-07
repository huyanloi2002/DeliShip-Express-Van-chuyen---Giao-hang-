import React from "react";
import wallpapper from "../assets/wallpapper1.png";
import "../styles/Wallpapper.scss";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"

const Wallpapper = () => {
  const auth = useSelector(state=> state.auth)
  const {role} = auth
  return (
    <div className="wallpapper">
      <div className="wallpapper_container">
        <img src={wallpapper} alt="wallpapper" />
        <div className="content_wallpapper">
          <p className="title">
            Chọn phương thức
            <br />
            <b>giao hàng thuận tiện</b>
          </p>

          {role !== "admin" ? <div className="btn_create_parcel">
            <Link to="/create_order">
              <p className="text_add_new_parcel">Thêm một kiện hàng mới</p>
              <i className="fa-solid fa-square-plus"></i>
            </Link>
          </div>
            :
            <div className="btn_create_parcel">
              <p className="text_add_new_parcel">Bạn là admin nên không thể thêm đơn hàng!</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Wallpapper;
