import React, { useEffect, useState } from "react";
import "../styles/VerifyEmail.scss";
import {
  verifyOTPRegister,
  resendOTPRegister,
} from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [countdownResendcode, setCountdownResendcode] = useState(10);
  const [showResend, setShowResend] = useState(false);

  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);

  const navigate = useNavigate();
  console.log(auth);
  useEffect(() => {
    if (auth.verified) {
      navigate("/");
    }
  }, [auth.verified]);

  const handleCoutdownResendCode = () => {
    dispatch(
      resendOTPRegister({
        userId: auth.userId,
        email: auth.email,
        username: auth.username,
        access_token: auth.token,
      })
    );

    const timer = setInterval(() => {
      setCountdownResendcode((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          setCountdownResendcode(10);
          setShowResend(false);
          return 0;
        } else {
          setShowResend(true);
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      setShowResend(false);
    };
  };

  const handleOnChageInput = (e) => {
    const { value } = e.target;
    if (value.length > 4) {
      return;
    }
    setOtp(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      verifyOTPRegister({ userId: auth.userId, otp, token: auth.token })
    );
  };
  return (
    <>
      <div className="verify_email">
        <div className="verify_email_content">
          <h3 className="title_verify_email">Verify your email</h3>
          <p className="text_verify_email">
            Thank you,{" "}
            <b style={{ color: "var(--color-pri)" }}>{auth.username}</b>! Please
            check your email address. A unique code has been sent to the email
            address your provided.
          </p>
          <div className="check_otp">
            <form className="verify" onSubmit={handleSubmit}>
              <input
                placeholder="ENTER OTP"
                className="input_verify_email"
                type="number"
                value={otp}
                onChange={handleOnChageInput}
              />
              <button className="btn_verify">Verify</button>
            </form>
            <span
              className="text-danger check_error"
              style={{
                transition: "0.5s all ease",
                fontSize: "11px",
                fontStyle: "italic",
                height: "10px",
                fontWeight: "bold",
              }}
            >
              {alert.type === "VERIFIED" ? `* ${alert.error}` : ""}
            </span>
            <button
              className="resend_otp"
              onClick={handleCoutdownResendCode}
              disabled={showResend === false ? false : true}
            >
              {showResend === false
                ? `Resend the code`
                : `${countdownResendcode}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
