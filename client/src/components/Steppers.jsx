import React from "react";
import { Stepper, Step } from "react-form-stepper";

const Steppers = ({ activeStep, stepsItems }) => {
  return (
    <div className="stepper">
      <Stepper activeStep={activeStep}>
        {stepsItems.map((item, index) => (
          <Step
            key={index}
            label={
              <b
                style={{
                  color: `${activeStep === index ? "#000000" : "#b6b6b6"}`,
                }}
              >
                {item.title}
              </b>
            }
            styleConfig={{
              activeBgColor: "#00bf63",
              activeTextColor: "#000000",
              inactiveBgColor: "#b6b6b6",
              inactiveTextColor: "#000000",
              completedBgColor: "#03723c",
              completedTextColor: "#fff",
              size: "3em",
              fontWeight: "bold",
              circleFontSize: "0.5rem",
            }}
            children={<item.icon />}
          />
        ))}
      </Stepper>
    </div>
  );
};

export default Steppers;
