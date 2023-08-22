import useSWR from "swr";
import Layout from "../Profile/Layout";
import Loading from "../Profile/Loading";
import Link from "next/link";

const Addresses = ({ setAddressId }) => {
  const url = "/api/cart/addresses";
  const { data: addresses, error } = useSWR(url);

  if (error) {
    return <div>failed to load data</div>;
  }
  if (!addresses) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <>
      {addresses.length ? (
        <select
          style={{ width: "200px" }}
          className="form-select ms-3"
          aria-label="Default select example"
          defaultValue=""
          onChange={(e) => setAddressId(e.target.value)}
        >
          <option value="">انتخاب آدرس</option>
          {addresses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      ) : (
        <Link href="profile/addresses">
          <a className="btn btn-primary">ایجاد آدرس</a>
        </Link>
      )}
    </>
  );
};

export default Addresses;
