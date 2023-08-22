import { numberFormat } from "lib/helper";
import Image from "next/image";

const Transactions = ({ data, setPageIndex }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>شماره پیگیری</th>
              <th>تاریخ</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <th>{transaction.order_id}</th>
                <td>{numberFormat(transaction.amount)} تومان</td>
                <td>
                  <span
                    className={
                      transaction.status === "موفق"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {transaction.status}
                  </span>
                </td>
                <td>{transaction.trans_id}</td>
                <td>{transaction.created_at}</td>
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

export default Transactions;
