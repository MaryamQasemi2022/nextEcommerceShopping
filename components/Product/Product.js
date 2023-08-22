import Image from "next/image";
import { numberFormat } from "lib/helper";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "redux/cart/action";
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Product = ({ product }) => {
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shoppingCart);
  const handleAddToCart = () => {
    dispatch(addToCart(product, 1));
    Swal.fire({
      text: `${product.name} به سبد خرید اضافه شد`,
      icon: "success",
    });
  };
  const handleRemoveFromCart = () => {
    Swal.fire({
      title: "میخواهی از سبد خرید حذفش کنی؟",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef8292",
      cancelButtonColor: "#66e0c8",
      confirmButtonText: "اره!حذفش کن",
      cancelButtonText: "نه !میخوامش",
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

  useEffect(() => {
    setAdded(
      cart.find((p) =>
        p.id.toString() === product.id.toString() ? true : false
      )
    );
  }, [cart]);
  return (
    <div className="box">
      <div>
        <div className="img-box">
          <Image
            className="img-fluid"
            src={product.primary_image}
            layout="responsive"
            width={300}
            height={200}
            placeholder="blur"
            blurDataURL={product.primary_image_blurDataURL}
          />
        </div>
        <div className="detail-box">
          <h5>
            <Link href={`/products/${product.slug}`}>
              <a> {product.name}</a>
            </Link>
          </h5>
          <p>{product.description}</p>
          <div className="options">
            <h6>
              {product.is_sale ? (
                <div className="d-flex">
                  <del className="me-3">{numberFormat(product.price)}تومان</del>
                  <span>{numberFormat(product.sale_price)} تومان</span>
                </div>
              ) : (
                <span>{numberFormat(product.price)}تومان</span>
              )}
            </h6>
            {added ? (
              <button className="bg-white" onClick={handleRemoveFromCart}>
                <BsCartCheckFill className="text-success fs-4" />
              </button>
            ) : (
              <button onClick={handleAddToCart}>
                <BsCartPlusFill className=" text-white fs-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
