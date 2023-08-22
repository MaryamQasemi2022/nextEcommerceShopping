import { Features, About, Contact, ProductsTab, Footer } from "components";
import { handleError } from "lib/helper";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = ({ productsTab, error }) => {
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
      <Features />
      {productsTab && <ProductsTab data={productsTab} />}
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_API_BASEURL}${process.env.BACKEND_API_PRODUCTSTAB_URL}`
    );
    const data = await response.json();

    if (response.ok) {
      return {
        props: { productsTab: data.data, error: null },
      };
    } else {
      return {
        props: {
          productsTab: null,
          error: handleError(data.message),
        },
      };
    }
  } catch (error) {
    return {
      props: { error: "خطایی در سرور رخ داده است", productsTab: null },
    };
  }
};
