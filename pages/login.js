import Login from "@/components/auth/login";
import CheckOtp from "@/components/auth/CheckOtp";
import { useState } from "react";

const LoginPage = () => {
  const [step, setStep] = useState(1);
  return (
    <section className="auth_section book_section">
      <div className="container">
        <div className="row my-5  justify-content-center ">
          <div className="col-md-9 col-lg-6 ">
            <div className="card ">
              <div className="card-body">
                {step === 1 && <Login setStep={setStep} />}
                {step === 2 && <CheckOtp />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
