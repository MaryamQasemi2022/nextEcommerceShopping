import { handleError } from "lib/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
const PaymentSend = ({ coupon, addressId, cart }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handlePayment = async () => {
    if (!addressId) {
      toast.error("وارد کردن آدرس الزامی است");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch("/api/cart/paymentSend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          code: coupon.code,
          cart,
          address_id: addressId,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        router.push(result.url);
      } else {
        toast.error(handleError(result));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="user_option btn-auth mt-4"
    >
      {loading ? "صبر کن.." : " پرداخت"}
    </button>
  );
};

export default PaymentSend;
