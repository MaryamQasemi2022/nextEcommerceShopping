import { handleError } from "lib/helper";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCart } from "redux/cart/action";

const PaymentVerifyPage = ({ error: errorServer, payment }) => {
  if (errorServer) {
    return <div>{errorServer}</div>;
  }
  const dispatch = useDispatch();
  const { status, transId, error } = payment;
  if (status) {
    dispatch(clearCart());
  }
  return (
    <section className="auth_section ">
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-5">
                  {status ? (
                    <>
                      <i className="bi bi-check-circle-fill text-success fs-1"></i>
                      <h5 className="mt-3 text-success">
                        پرداخت شما با موفقیت انجام شد
                      </h5>
                      <h6 className="mt-3">
                        شماره پیگیری : <span>{transId}</span>
                      </h6>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-x-circle-fill text-danger fs-1"></i>
                      <h5 className="mt-3 text-danger">{error}</h5>
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-between">
                  {status ? (
                    <Link href="/profile/orders">
                      <a className="btn btn-primary">مشاهده سفارش</a>
                    </Link>
                  ) : (
                    <Link href="/cart">
                      <a className="btn btn-primary">بازگشت به سبد خرید </a>
                    </Link>
                  )}
                  <Link href="/">
                    <a className="btn btn-dark">بازگشت به سایت</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PaymentVerifyPage;

export const getServerSideProps = async ({ query }) => {
  const { status, token } = query;
  try {
    const response = await fetch(`${process.env.BACKEND_API_PAYMENT_VERIFY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status,
        token,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      return {
        props: { payment: data.data, error: null },
      };
    } else {
      return {
        props: {
          payment: {},
          error: handleError(data.message),
        },
      };
    }
  } catch (error) {
    return {
      props: { error: "خطایی در سرور رخ داده است", payment: {} },
    };
  }
};
