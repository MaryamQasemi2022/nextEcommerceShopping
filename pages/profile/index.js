import Layout from "@/components/Profile/Layout";
import useSWR from "swr";
import Loading from "../../components/Profile/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { handleError } from "lib/helper";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const url = "/api/profile/info";
  const { data, error, mutate } = useSWR(url);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/profile/info/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("اطلاعات شما با موفقیت ویرایش شد ");
        mutate(result);
      } else {
        toast.error(handleError(result));
      }
    } catch (error) {
      toast.error("خطایی در سرور رخ داده است");
    } finally {
      setLoading(false);
    }
  };
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
      <form onSubmit={handleSubmit(onSubmit)} className="vh-70">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <label className="form-label">نام و نام خانوادگی</label>
            <input
              type="text"
              className="form-control"
              defaultValue={data.user.name}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="mt-2 d-block text-warning">
                فیلد نام و نام خانوادگی الزامی ست
              </span>
            )}
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">ایمیل</label>
            <input
              type="text"
              className="form-control"
              defaultValue={data.user.email}
              {...register("email", {
                required: true,
                pattern: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/,
              })}
            />
            {errors.email && (
              <span className="mt-2 d-block text-warning">
                ایمیل معتبر وارد کنیدو فیلد ایمیل الزامی ست
              </span>
            )}
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label">شماره تلفن</label>
            <input
              type="text"
              disabled
              className="form-control"
              defaultValue={data.user.cellphone}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-4"
        >
          ویرایش
          {loading && <div className="spinner-border spinner-border-sm"></div>}
        </button>
      </form>
    </Layout>
  );
};

export default ProfilePage;
