import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";
import { TYPES } from "../redux/actions/actionTypes";

const Alert = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);
  return (
    <div className="alert position-absolute">
      {alert.loading && <Loading />}
      {alert.error && !alert.type && (
        <Toast
          msg={{ title: "Error", body: alert.error }}
          handleShow={() => dispatch({ type: TYPES.ALERT, payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {alert.error && !alert.type && (
        <Toast
          msg={{ title: "Success", body: alert.success }}
          handleShow={() => dispatch({ type: TYPES.ALERT, payload: {} })}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Alert;
