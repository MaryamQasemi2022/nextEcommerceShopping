import { handleError } from "lib/helper";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    subject: "",
    text: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      dataUser.name === "" ||
      dataUser.email === "" ||
      dataUser.subject === "" ||
      dataUser.text === ""
    ) {
      toast.error("تمام موارد فرم الزامی ست");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_CONTACT_US}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataUser),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("موفقیت آمیز بود");
      } else {
        toast.error(handleError(data.message));
      }
    } catch (error) {
      toast.error(" بعدا دوباره تلاش کنید خطای سرور :D");
    } finally {
      setLoading(false);
    }
  };
  const handleChangeDataUser = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setDataUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          required
          type="text"
          name="name"
          value={dataUser.name}
          className="form-control"
          placeholder="نام و نام خانوادگی"
          onChange={handleChangeDataUser}
        />
      </div>
      <div>
        <input
          required
          type="email"
          name="email"
          value={dataUser.email}
          className="form-control"
          placeholder="ایمیل"
          onChange={handleChangeDataUser}
        />
      </div>
      <div>
        <input
          required
          type="text"
          value={dataUser.subject}
          name="subject"
          className="form-control"
          placeholder="موضوع پیام"
          onChange={handleChangeDataUser}
        />
      </div>
      <div>
        <textarea
          required
          name="text"
          value={dataUser.text}
          rows="10"
          style={{ height: 100 }}
          className="form-control"
          placeholder="متن پیام"
          onChange={handleChangeDataUser}
        ></textarea>
      </div>
      <div className="btn_box">
        <button type="submit">
          ارسال پیام
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
