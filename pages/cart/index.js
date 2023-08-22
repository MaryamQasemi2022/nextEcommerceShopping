import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  discountAmount,
  numberFormat,
  pricePaid,
  salePercent,
  totalPrice,
} from "lib/helper";
import {
  clearCart,
  decrement,
  increment,
  removeFromCart,
} from "redux/cart/action";
import Image from "next/image";
import Swal from "sweetalert2";
import emptyCart from "public/images/emptycart/emptycart.jpg";
import Coupon from "@/components/cart/Copune";
import Addresses from "@/components/cart/Addresses";
import PaymentSend from "@/components/cart/PaymentSend";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState({ code: null, percent: 0 });
  const [addressId, setAddressId] = useState(null);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    Swal.fire({
      title: "ایا مطمعنی؟",
      text: `میخواهی ${product.name} رو حذف کنی؟`,
      icon: "question",
      cancelButtonText: "بیخیال!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "اره بابا حذفش کن",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(product));
        Swal.fire({
          text: `${product.name} از سبد خرید حذف شد`,
          icon: "warning",
        });
      }
    });
  };
  const handleClearCart = () => {
    Swal.fire({
      title: "ایا مطمعنی؟",
      text: `میخواهی همه ی سبد  رو حذف کنی؟`,
      icon: "question",
      cancelButtonText: "بیخیال!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "اره بابا حذفش کن",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          text: "سبد خرید خالی شد!",
          icon: "warning",
        });
      }
    });
  };

  useEffect(() => {
    setCart(shoppingCart.cart);
  }, [shoppingCart]);

  return cart.length ? (
    <section className="single_page_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="row gy-5">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr className="text-center">
                        <th>محصول</th>
                        <th>نام</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                        <th>تعداد</th>
                        <th>قیمت کل</th>
                        <th>حذف کردن</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id} className="text-center">
                          <th>
                            <Image
                              src={item.primary_image}
                              placeholder="blur"
                              blurDataURL={item.primary_image_blurDataURL}
                              width={200}
                              height={200}
                              objectFit="contain"
                              alt="food"
                            />
                          </th>
                          <td
                            className="fw-bold"
                            style={{ width: "150px", maxWidth: "180px" }}
                          >
                            <Link href={`/products/${item.slug}`}>
                              <a> {item.name}</a>
                            </Link>
                          </td>
                          <td>
                            {item.is_sale ? (
                              <>
                                {" "}
                                <div>
                                  <del className="me-3">
                                    {numberFormat(item.price)}تومان
                                  </del>
                                  {numberFormat(item.sale_price)}تومان
                                </div>
                                <div className="text-danger ">
                                  {salePercent(item.price, item.sale_price)}%
                                  تخفیف
                                </div>
                              </>
                            ) : (
                              <span>{numberFormat(item.price)}تومان</span>
                            )}
                          </td>
                          <td>
                            <div
                              className={
                                item.quantity < 5
                                  ? "input-number text-danger"
                                  : "input-number "
                              }
                            >
                              {item.quantity}
                            </div>
                          </td>
                          <td>
                            <div className="input-counter">
                              <span
                                onClick={() => {
                                  item.qty < item.quantity &&
                                    dispatch(increment(item));
                                }}
                                className="plus-btn"
                              >
                                +
                              </span>
                              <div className="input-number">{item.qty}</div>
                              <span
                                onClick={() => {
                                  item.qty > 1 && dispatch(decrement(item));
                                }}
                                className="minus-btn"
                              >
                                -
                              </span>
                            </div>
                          </td>
                          <td>
                            {item.is_sale ? (
                              <span>
                                {numberFormat(item.sale_price * item.qty)}
                              </span>
                            ) : (
                              <span>{numberFormat(item.price * item.qty)}</span>
                            )}

                            <span className="ms-1">تومان</span>
                          </td>
                          <td className="text-center">
                            <button
                              className="border-0"
                              style={{ backgroundColor: "transparent" }}
                              onClick={() => handleRemoveFromCart(item)}
                            >
                              <i className="bi bi-x text-danger fw-bold fs-4 cursor-pointer"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleClearCart}
                  className="btn btn-primary my-4"
                >
                  پاک کردن سبد خرید
                </button>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-6">
                <Coupon coupon={coupon} setCoupon={setCoupon} />
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-end align-items-baseline">
                <Addresses setAddressId={setAddressId} />
              </div>
            </div>
            <div className="row justify-content-center mt-5">
              <div className="col-12 col-md-6">
                <div className="card">
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold">مجموع سبد خرید</h5>
                    <ul className="list-group mt-4">
                      <li className="list-group-item d-flex justify-content-between">
                        <div>مجموع قیمت :</div>
                        <div>{numberFormat(totalPrice(cart))} تومان</div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <div>
                          تخفیف :
                          <span className="text-danger ms-1">{`${coupon.percent}%`}</span>
                        </div>
                        <div className="text-danger">
                          {numberFormat(discountAmount(cart, coupon.percent))}{" "}
                          تومان
                        </div>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <div>قیمت پرداختی :</div>
                        <div>
                          {numberFormat(pricePaid(cart, coupon.percent))} تومان
                        </div>
                      </li>
                    </ul>
                    <PaymentSend
                      coupon={coupon}
                      addressId={addressId}
                      cart={cart}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <h3>سبد خرید خالیه</h3>

      <Image
        src={emptyCart}
        width={200}
        height={200}
        objectFit="contain"
        alt="empty-cart"
      />
      <Link href="/menu">
        <a className="btn btn-outline-dark">بزن بریم خرید کنیم</a>
      </Link>
    </div>
  );
};
export default Cart;
