import ContactForm from "../ContactForm/ContactForm";

import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map/Map"), {
  ssr: false,
});
const Contact = () => {
  return (
    <section className="book_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>تماس با ما</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form_container">
              <ContactForm />
            </div>
          </div>
          <div className="col-md-6">
            <div className="map_container ">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
