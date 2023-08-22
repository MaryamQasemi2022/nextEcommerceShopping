import { useState } from "react";
import Product from "../Product/Product";

const ProductsTab = ({ data }) => {
  const { tabList, tabPanel } = data;
  const [active, setActive] = useState("پیتزا");
  const [categoryId, setCategoryId] = useState(1);

  const handleClick = (tablist) => {
    setActive(tablist);
    tabPanel.forEach((panel) => {
      panel.forEach((product) => {
        if (product.category === tablist) {
          setCategoryId(product.category_id);
        }
      });
    });
  };

  return (
    <section className="food_section layout_padding-bottom">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>منو محصولات</h2>
        </div>

        <ul className="filters_menu">
          {tabList &&
            tabList.map((list, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(list)}
                  className={active === list ? "active" : ""}
                >
                  {list}
                </li>
              );
            })}
        </ul>

        <div className="filters-content">
          <div className="row grid">
            {tabPanel &&
              tabPanel[categoryId - 1].map((product, index) => (
                <div key={index} className="col-sm-6 col-lg-4">
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
        <div className="btn-box">
          <a href="">مشاهده بیشتر</a>
        </div>
      </div>
    </section>
  );
};
export default ProductsTab;
