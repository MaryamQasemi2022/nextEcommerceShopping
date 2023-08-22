import React, { useEffect, useState } from "react";
import { Header, Footer } from "@/components/index";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import Router from "next/router";
import nProgress from "nprogress";
// import "nprogress/nprogress.css";
import { AuthProvider } from "contexts/AuthContext";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import store from "redux/store";

Router.events.on("routeChangeStart", () => {
  nProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  nProgress.done();
});

const MyApp = ({ Component, pageProps }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher: (address) => fetch(address).then((result) => result.json()),
        }}
      >
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <ToastContainer />
        </Provider>
      </SWRConfig>
    </AuthProvider>
  );
};

export default MyApp;
