import { useState, useContext, useEffect } from "react";
import AuthContext from "contexts/AuthContext";
import { toast } from "react-toastify";

const Login = ({ setStep }) => {
  const { login, loading } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (phoneNumber === "") {
      toast.error("وارد کردن شماره موبایل الزامی ست");
      return;
    }

    const pattern = /^(\+98|0)?9\d{9}$/;
    if (!pattern.test(phoneNumber)) {
      toast.error("فرمت شماره موبایل صحیح نمی باشد.");
      return;
    }

    login({ cellphone: phoneNumber });
    setStep(2);
  };

  return (
    <div className="form_container">
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            شماره موبایل
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            style={{ direction: "ltr" }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary btn-auth"
        >
          ورود
          {loading && (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
