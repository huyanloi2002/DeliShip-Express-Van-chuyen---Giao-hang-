import React from "react";
import { prohibitedGoods } from "../data/data";
import "../styles/ProhibitedGoods.scss";

const ProhibitedGoods = () => {
  return (
    <div className="prohibited_goods container px-lg-5 mb-5">
      <h3 className="text-uppercase fw-bold text-center py-4">Hàng cấm gửi</h3>
      <div className="prohibited_goods_content px-lg-5">
        {prohibitedGoods.map((item, index) => {
          return (
            <div className="prohibited_card" key={index}>
              <div className="left_content">
                <img src={item.image} alt="" className="img_pro" />
              </div>

              <div className="right_content">
                <div className="text">
                  <p className="name_pro">{`${item.id}. ${item.name}`}</p>
                  <blockquote className="desc_pro">{item.desc}</blockquote>
                </div>

                <hr
                  style={{
                    width: "100%",
                    height: "3px",
                    backgroundColor: "var(--color-bg)",
                  }}
                />
              </div>
            </div>
          );
        })}
        <div className="note_pro text-center fw-bold pt-2 pb-3 px-5">
          {`* Nhân viên cần phải kiểm tra hàng trước nhận từ khách để xác nhận loại hàng đang gửi thuộc loại hàng nào trong hai loại kể trên để xử lý hàng`}
        </div>
      </div>
    </div>
  );
};

export default ProhibitedGoods;
