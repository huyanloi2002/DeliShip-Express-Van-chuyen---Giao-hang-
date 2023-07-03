import React from "react";
import "../styles/Instruct.scss";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";

const Instruct = () => {
  return (
    <div className="instruct">
      <div className="instruct_container">
        <p className="instruct_title">
          Làm thế nào để tạo một kiện hàng
          <br /> mới trong vòng 5 phút?
        </p>
        <div className="instruct_content">
          <div className="instruct_card">
            <span className="steps">Bước 1</span>
            <h5 className="instruct_text">Chọn tạo mới bưu kiện</h5>
            <img className="instruct_image" src={step1} alt="step" />
          </div>
          <div className="instruct_card">
            <span className="steps">Bước 2</span>
            <h5 className="instruct_text">Chọn phương thức</h5>
            <img className="instruct_image" src={step2} alt="step" />
          </div>
          <div className="instruct_card">
            <span className="steps">Bước 3</span>
            <h5 className="instruct_text">
              Điền thông tin cá nhân và bưu kiện
            </h5>
            <img className="instruct_image" src={step3} alt="step" />
          </div>
          <div className="instruct_card">
            <span className="steps">Bước 4</span>
            <h5 className="instruct_text">Kiểm tra và thanh toán</h5>
            <img className="instruct_image" src={step4} alt="step" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instruct;
