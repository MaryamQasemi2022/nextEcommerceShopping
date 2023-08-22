import { numberFormat } from "lib/helper";
import Image from "next/image";

const Orders = ({ data, setPageIndex }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>آدرس</th>
              <th>وضعیت</th>
              <th>وضعیت پرداخت</th>
              <th>قیمت کل</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order.id}>
                <th>{order.id}</th>
                <td>{order.address_title}</td>
                <td>{order.status}</td>
                {order.payment_status === "موفق" ? (
                  <td>
                    <span className="text-success">
                      {order.payment_status}{" "}
                    </span>
                  </td>
                ) : (
                  <td>
                    <span className="text-danger">{order.payment_status} </span>
                  </td>
                )}

                <td>
                  <span className="me-1">
                    {numberFormat(order.paying_amount)}
                  </span>
                  تومان
                </td>
                <td> {order.created_at}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#model_${order.id}`}
                  >
                    محصولات
                  </button>
                  <div className="modal fade" id={`model_${order.id}`}>
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h6 className="modal-title">
                            {` محصولات سفارش شماره ${order.id}`}
                          </h6>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <table className="table align-middle">
                            <thead>
                              <tr>
                                <th>محصول</th>
                                <th>نام</th>
                                <th>قیمت</th>
                                <th>تعداد</th>
                                <th>قیمت کل</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.order_items.map((orderItem) => (
                                <tr key={orderItem.id}>
                                  <th>
                                    <Image
                                      src={orderItem.product_primary_image}
                                      layout="responsive"
                                      width={80}
                                      height={53}
                                      alt=""
                                    />
                                  </th>
                                  <td className="fw-bold">
                                    {orderItem.product_name}
                                  </td>
                                  <td>
                                    <span className="me-1">
                                      {numberFormat(orderItem.price)}
                                    </span>
                                    تومان
                                  </td>
                                  <td>{orderItem.quantity}</td>
                                  <td>
                                    <span className="me-1">
                                      {numberFormat(orderItem.subtotal)}
                                    </span>
                                    تومان
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="d-flex justify-content-center mt-5">
        <ul className="pagination">
          {data.meta.links.slice(1, -1).map((link, index) => (
            <li
              key={index}
              className={link.active ? "page-item active" : "page-item "}
            >
              <button
                className="page-link"
                onClick={() => {
                  setPageIndex(link.label);
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Orders;
