import { handleError } from "lib/helper";
import { useState } from "react";
import { toast } from "react-toastify";

const Coupon = ({ coupon, setCoupon }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckCoupon = async () => {
    if (!coupon.code) {
      toast.error("وارد کردن کد کوپن الزامی است");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch("/api/cart/coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ code: coupon.code }),
      });
      const result = await response.json();

      if (response.ok) {
        setCoupon((prev) => ({ ...prev, percent: result.data.percentage }));
        toast.success(" کد تخفیف شما با موفقیت اعمال شد");
      } else {
        toast.error(handleError(result));
        setCoupon({ code: null, percent: 0 });
      }
    } catch (error) {
      toast.error(error.message);
      setCoupon({ code: null, percent: 0 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="input-group mb-3">
      <input
        onChange={(e) =>
          setCoupon((prev) => ({ ...prev, code: e.target.value }))
        }
        type="text"
        className="form-control"
        placeholder="کد تخفیف"
      />
      <button
        onClick={handleCheckCoupon}
        disabled={loading}
        className="input-group-text"
        id="basic-addon2"
      >
        {loading ? "صبر کن.." : " اعمال کد تخفیف"}
      </button>
      {coupon.percent !== 0 && (
        <div className="text-success w-100 mt-2">
          <span>{`${coupon.percent}%`} </span>
          <span>کد تخفیف اعمال شد</span>
        </div>
      )}
    </div>
  );
};

export default Coupon;
