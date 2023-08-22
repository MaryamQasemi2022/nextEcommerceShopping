import Layout from "@/components/Profile/Layout";
import useSWR from "swr";
import Loading from "../../components/Profile/Loading";
import Orders from "@/components/Profile/orders/Orders";
import { useState } from "react";

const OrdersPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const url = `/api/profile/orders?page=${pageIndex}`;
  const { data, error } = useSWR(url);

  if (error) {
    return <div>failed to load data</div>;
  }
  if (!data) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <Orders data={data} setPageIndex={setPageIndex} />
    </Layout>
  );
};

export default OrdersPage;
