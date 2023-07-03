import React, { useState } from "react";
import ButtonStepper from "./ButtonStepper";

import { dataTrans } from "../data/data";

const Transportation = ({
  handleNextStep,
  keyStep,
  valueTrans,
  setValueTrans,
  setValuePrice,
  valuePrice,
}) => {
  const { nameTrans } = valuePrice;

  const handleChooseTrans = (value) => {
    setValueTrans(value);
    setValuePrice({ ...valuePrice, nameTrans: value.name });
  };
  return (
    <>
      <div className="transportation">
        {/* <h5 className="title">Hình thức vận chuyển</h5> */}
        <div className="transportation_content">
          <div className="choose_transportation">
            {dataTrans.map((item, index) => {
              return (
                <div
                  className={`card_transportation ${
                    valueTrans.id === item.id ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => handleChooseTrans(item)}
                >
                  <div className="radio_trans">
                    <div
                      className={`radio ${
                        valueTrans.id === item.id ? "active" : ""
                      }`}
                    ></div>
                  </div>
                  <div className="content_bottom">
                    <img src={item.img} alt="img" className="img_trans" />
                    <p className="text_trans">{item.name}</p>
                    <blockquote className="desc_trans">
                      {item.description}
                    </blockquote>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {valueTrans.id ? (
        <ButtonStepper handleNextStep={handleNextStep} keyStep={keyStep} />
      ) : null}
    </>
  );
};

export default Transportation;
