import Layout from "@/components/Profile/Layout";
import useSWR from "swr";
import Loading from "../../components/Profile/Loading";
import Create from "@/components/Profile/addresses/Create";
import Edit from "@/components/Profile/addresses/Edit";

const ProfileAdressPage = () => {
  const url = "/api/profile/addresses";
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
      <Create provinces={data.provinces} cities={data.cities} />
      <hr />
      {data.addresses.map((address) => (
        <Edit
          key={address.id}
          address={address}
          provinces={data.provinces}
          cities={data.cities}
        />
      ))}
    </Layout>
  );
};

export default ProfileAdressPage;
