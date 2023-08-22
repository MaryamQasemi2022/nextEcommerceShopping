import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Product } from "../components";
import ProductsCategorization from "@/components/ProductsCategorization/ProductsCategorization";
import { toast } from "react-toastify";
import { handleError } from "lib/helper";
import { useRouter } from "next/router";

const MenuPage = ({ categories, error, products }) => {
  const [productsList, setProductsList] = useState(products);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleFilter = async (value) => {
    let query = { ...router.query, ...value };
    if (!value.hasOwnProperty("page") && query.hasOwnProperty("page")) {
      delete query.page;
    }
    if (value.hasOwnProperty("search") && !value.search) {
      delete query.search;
    }
    if (value.hasOwnProperty("sortBy") && !value.sortBy) {
      delete query.sortBy;
    }
    if (value.hasOwnProperty("category") && !value.category) {
      delete query.category;
    }

    const params = new URLSearchParams(query).toString();

    try {
      setLoading(true);
      const responseProducts = await fetch(
        `${process.env.NEXT_PUBLIC_API_MENU}?${params}`
      );
      const data = await responseProducts.json();

      if (responseProducts.ok) {
        setProductsList(data.data);
        router.push(`/menu?${params}`, undefined, { shallow: true });
      } else {
        toast.error(handleError(data.message));
      }
    } catch (error) {
      toast.error(handleError("خطای سرور"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  useEffect(() => {
    if (router.query.hasOwnProperty("search")) {
      setSearch(router.query.search);
    } else {
      setSearch("");
    }
  }, [router.query]);

  return (
    <section className="food_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <SearchBox
              handleFilter={handleFilter}
              setSearch={setSearch}
              search={search}
            />
            <hr />
            <ProductsCategorization
              categories={categories}
              handleFilter={handleFilter}
              categoryId={
                router.query.hasOwnProperty("category")
                  ? router.query.category
                  : false
              }
            />
            <hr />
            <div>
              <label className="form-label">مرتب سازی</label>
              {[
                { titel: "بیشترین قیمت", sortBy: "max" },
                { titel: "کمترین قیمت", sortBy: "min" },
                { titel: "پرفروش ترین", sortBy: "bestseller" },
                { titel: " با تخفیف", sortBy: "sale" },
              ].map((item, index) => (
                <div key={index} className="form-check my-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sortBy"
                    value={item.sortBy}
                    id={item.sortBy}
                    onChange={() => handleFilter({ sortBy: item.sortBy })}
                    checked={
                      router.query.hasOwnProperty("sortBy") &&
                      router.query.sortBy === item.sortBy
                    }
                  />
                  <label
                    className="form-check-label cursor-pointer"
                    htmlFor={item.sortBy}
                  >
                    {item.titel}
                  </label>
                </div>
              ))}
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortBy"
                  value="any"
                  id="any"
                  onChange={() => handleFilter({ sortBy: null })}
                  checked={!router.query.hasOwnProperty("sortBy")}
                />
                <label
                  className="form-check-label cursor-pointer"
                  htmlFor="any"
                >
                  هیچ کدام
                </label>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-lg-9">
            {productsList && productsList.products.length > 0 ? (
              <>
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                  </div>
                ) : (
                  <>
                    <div className="row gx-3">
                      {productsList &&
                        productsList.products.map((product, index) => (
                          <div key={index} className="col-sm-6 col-lg-4">
                            <Product product={product} />
                          </div>
                        ))}
                    </div>
                    <nav className="d-flex justify-content-center mt-5">
                      <ul className="pagination">
                        {productsList &&
                          productsList.meta.links
                            .slice(1, -1)
                            .map((link, index) => (
                              <Pagination
                                key={index}
                                link={link}
                                handleFilter={handleFilter}
                              />
                            ))}
                      </ul>
                    </nav>
                  </>
                )}
              </>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                {router.query.search && (
                  <h3 className="text-warning text-decoration-underline">{` ${router.query.search} `}</h3>
                )}
                <h5> در این دسته بندی یافت نمیشود</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async ({ resolvedUrl }) => {
  try {
    const responseCategory = await fetch(
      `${process.env.BACKEND_API_BASEURL}${process.env.BACKEND_API_CATEGORIES}`
    );
    const responseProducts = await fetch(
      `${process.env.BACKEND_API_BASEURL}${resolvedUrl}`
    );
    const dataCategory = await responseCategory.json();

    const dataProducts = await responseProducts.json();

    if (responseCategory.ok && responseProducts.ok) {
      return {
        props: {
          categories: dataCategory.data,
          products: dataProducts.data,
          error: null,
        },
      };
    } else {
      if (!responseCategory.ok) {
        return {
          props: {
            categories: null,
            products: dataProducts.data,
            error: handleError(dataCategory.message),
          },
        };
      } else {
        return {
          props: {
            categories: dataCategory.data,
            products: null,
            error: handleError(dataProducts.message),
          },
        };
      }
    }
  } catch (error) {
    return {
      props: { error: "خطایی در سرور رخ داده است", categories: null },
    };
  }
};

export default MenuPage;
