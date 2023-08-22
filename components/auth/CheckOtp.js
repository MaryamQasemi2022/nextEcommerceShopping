import { useState, useContext, useEffect } from "react";
import AuthContext from "contexts/AuthContext";
import { toast } from "react-toastify";

const CheckOtp = () => {
  const { checkOtp, loading, resendOtp, loadingResendOtp } =
    useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState("");

  const handleCheckOtp = () => {
    if (otp === "") {
      toast.error("وارد کزدن کد تایید الزامی است باشد.");
      return;
    }
    const pattern = /^[0-9]{6}$/;
    if (!pattern.test(otp)) {
      toast.error("فرمت کد تایید صحیح نمی باشد.");
      return;
    }
    checkOtp(otp);
  };
  const handleResendOtp = () => {
    resendOtp();
    setShow(false);
  };
  useEffect(() => {
    let time = "00:10";
    let interval = setInterval(() => {
      let countDown = time.split(":"); //["00","59"]
      let minutes = parseInt(countDown[0], 10); //0
      let seconds = parseInt(countDown[1], 10); //59
      --seconds; //seconds -=1
      minutes = seconds < 0 ? --minutes : minutes;
      if (minutes < 0) {
        clearInterval(interval);
        setShow(true);
      }
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      time = `${minutes}:${seconds}`;
      setTimer(time);
    }, 1000);

    return () => {
      clearInterval(interval);
      setTimer("");
    };
  }, [loadingResendOtp]);
  return (
    <div className="form_container">
      <div className="mb-3">
        <label htmlFor="exampleInputEmail2" className="form-label">
          کد تایید شماره
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail2"
          aria-describedby="emailHelp"
          style={{ direction: "ltr " }}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          onClick={handleCheckOtp}
          disabled={loading}
          type="button"
          className="btn btn-primary btn-auth"
        >
          ارسال
          {loading && (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          )}
        </button>
        <div>
          {show ? (
            <button
              onClick={handleResendOtp}
              className="btn btn-dark"
              disabled={loadingResendOtp}
            >
              ارسال مجدد کد
              {loadingResendOtp && (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              )}
            </button>
          ) : (
            <div>{timer}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOtp;
