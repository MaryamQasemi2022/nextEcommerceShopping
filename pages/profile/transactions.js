import Layout from "@/components/Profile/Layout";
import useSWR from "swr";
import Loading from "../../components/Profile/Loading";
import { useState } from "react";
import Transactions from "@/components/Profile/transactions/Transactions";

const TransactionsPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const url = `/api/profile/transactions?page=${pageIndex}`;
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
      <Transactions data={data} setPageIndex={setPageIndex} />
    </Layout>
  );
};

export default TransactionsPage;
