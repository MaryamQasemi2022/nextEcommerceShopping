import { handleError, numberFormat, salePercent } from "lib/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Product } from "@/components/index";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "redux/cart/action";
import Swal from "sweetalert2";
import { BsCartCheckFill } from "react-icons/bs";

const ProductItem = ({ product, error, productRandom }) => {
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shoppingCart);
  const handelAddToCart = () => {
    dispatch(addToCart(product, 1));
    Swal.fire({
      text: `${product.name} به سبد خرید اضافه شد`,
      icon: "success",
    });
  };
  const handleRemoveFromCart = () => {
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

  useEffect(() => {
    toast.error(error);
  }, [error]);

  useEffect(() => {
    setAdded(
      cart.find((p) =>
        p.id.toString() === product.id.toString() ? true : false
      )
    );
  }, [cart]);

  if (!product) {
    return <h1>چنین محصولی وجود ندارد</h1>;
  }
  return (
    <>
      {product && (
        <section className="single_page_section layout_padding">
          <div className="container">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="row gy-5">
                  <div className="col-sm-12 col-lg-6">
                    <h3 className="fw-bold mb-4">{product.name}</h3>
                    <h5 className="mb-3">
                      {product.is_sale ? (
                        <div className="d-flex">
                          <del className="me-3">
                            {numberFormat(product.price)}تومان
                          </del>
                          <span>{numberFormat(product.sale_price)} تومان</span>
                        </div>
                      ) : (
                        <span>{numberFormat(product.price)}تومان</span>
                      )}

                      <div className="text-danger fs-6 mt-2">
                        {product.is_sale && (
                          <span>
                            {salePercent(product.price, product.sale_price)}
                            %تخفیف
                          </span>
                        )}
                      </div>
                    </h5>
                    <p>{product.description}</p>

                    <div className="mt-5 d-flex">
                      {added ? (
                        <div>
                          <button
                            className="btn-add "
                            onClick={handleRemoveFromCart}
                          >
                            حذف از سبد خرید
                          </button>
                          <h6 className="text-success mt-3">
                            {` ${product.name} به سبد خریدشما اضافه شده`}
                          </h6>
                        </div>
                      ) : (
                        <button className="btn-add" onClick={handelAddToCart}>
                          افزودن به سبد خرید
                        </button>
                      )}
                      <div className="input-counter ms-4">
                        <h6 className="text-danger">
                          {" "}
                          موجودی:{product.quantity}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-lg-6">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-indicators">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0"
                          className="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        {product.images.map((img, index) => (
                          <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index + 1}
                            aria-label="Slide 2"
                          ></button>
                        ))}
                      </div>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <Image
                            src={product.primary_image}
                            placeholder="blur"
                            blurDataURL={product.primary_image_blurDataURL}
                            className="d-block w-100"
                            width={464}
                            height={309}
                            layout="responsive"
                            priority={true}
                            alt="food"
                          />
                        </div>
                        {product.images.map((item, index) => (
                          <div key={index} className="carousel-item">
                            <Image
                              src={item.image}
                              className="d-block w-100"
                              width={464}
                              height={309}
                              layout="responsive"
                              alt="food"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <hr />
      {productRandom && (
        <section className="food_section my-5">
          <div className="container">
            <div className="row gx-3">
              {productRandom.map((item) => (
                <div className="col-sm-6 col-lg-3" key={item.id}>
                  <Product product={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductItem;

export const getServerSideProps = async ({ query }) => {
  //   console.log(encodeURI(query.slug));
  try {
    const response = await fetch(
      `${process.env.BACKEND_API_BASEURL}/products/${encodeURI(query.slug)}`
    );
    const data = await response.json();
    // console.log(data);
    const responseRandom = await fetch(
      `${process.env.BACKEND_API_BASEURL}/random-products?count=4`
    );
    const dataRandom = await responseRandom.json();

    if (response.ok && responseRandom.ok) {
      return {
        props: {
          product: data.data,
          error: null,
          productRandom: dataRandom.data,
        },
      };
    } else {
      return {
        props: {
          product: null,
          productRandom: null,
          error: handleError(data.message),
        },
      };
    }
  } catch (error) {
    return {
      props: { error: "خطایی در سرور رخ داده است", product: null },
    };
  }
};
