import React, { useEffect } from "react";

const ButtonStepper = ({
  handleNextStep,
  handlePrevStep,
  keyStep,
  nameSender,
  senderAddress,
  phoneSender,
  nameReceiver,
  receiverAddress,
  phoneReceiver,
  nameParcel,
  weightParcel,
}) => {
  return (
    <>
      {keyStep === "checkAndPayment" && (
        <div className="button_group">
          <div className="button_group_prev">
            <button className="btn_prev_create_order" onClick={handlePrevStep}>
              Prev
            </button>
          </div>
        </div>
      )}
      {keyStep === "transportation" && (
        <div className="button_group">
          <div className="button_group_next">
            <button className="btn_next_create_order" onClick={handleNextStep}>
              Next
            </button>
          </div>
        </div>
      )}
      {keyStep === "fillInformation" && (
        <div className="button_group">
          <div className="button_group_prev">
            <button className="btn_prev_create_order" onClick={handlePrevStep}>
              Prev
            </button>
          </div>
          {
            <div className="button_group_next">
              <button
                className="btn_next_create_order"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          }
        </div>
      )}
    </>
  );
};

export default ButtonStepper;
