import Link from "next/link";
import { useContext } from "react";
import AuthContext from "contexts/AuthContext";
const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);
  return (
    <section className="profile_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <li className="list-group-item">
                <Link href="/profile">
                  <a>اطلاعات کاربر</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/profile/addresses">
                  <a>آدرس ها</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/profile/orders">
                  <a>سفارشات</a>
                </Link>
              </li>
              <li className="list-group-item">
                <Link href="/profile/transactions">
                  <a>تراکنش ها</a>
                </Link>
              </li>
              <li
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >
                <a> خروج</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-lg-9 mt-5 mt-lg-0">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
