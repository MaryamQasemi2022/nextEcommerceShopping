import { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { handleError } from "lib/helper";

const Create = ({ provinces, cities }) => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch("/api/profile/addresses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("  آدرس جدید شمابا موفقیت ایجاد شد ");
        mutate("/api/profile/addresses");
      } else {
        toast.error(handleError(result));
      }
    } catch (error) {
      toast.error("خطایی در سرور رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        ایجاد آدرس جدید
      </button>
      <div className="collapse mt-3" id="collapseExample">
        <form onSubmit={handleSubmit(onSubmit)} className="card card-body">
          <div className="row g-4">
            <div className="col col-md-6">
              <label className="form-label">عنوان</label>
              <input
                type="text"
                className="form-control"
                {...register("title", { required: "فیلد عنوان الزامی ست" })}
              />
              {errors.title && (
                <span className="mt-2 d-block text-warning">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="col col-md-6">
              <label className="form-label">شماره تماس</label>
              <input
                type="text"
                className="form-control"
                style={{ direction: "ltr" }}
                {...register("cellphone", {
                  required: "فیلذ شماره تماس الزامی ست",
                  pattern: {
                    value: /^(\+98|0)?9\d{9}$/i,
                    message: "شماره تماس معتبر نمیباشد",
                  },
                })}
              />
              {errors.cellphone && (
                <span className="mt-2 d-block text-warning">
                  {errors.cellphone.message}
                </span>
              )}
            </div>
            <div className="col col-md-6">
              <label className="form-label">کد پستی</label>
              <input
                type="text"
                className="form-control"
                style={{ direction: "ltr" }}
                {...register("postal_code", {
                  required: "فیلد کدپستی الزامی ست",
                  pattern: {
                    value: /^\d{5}[ -]?\d{5}$/i,
                    message: "کدپستی معتبر نمیباشد",
                  },
                })}
              />
              {errors.postal_code && (
                <span className="mt-2 d-block text-warning">
                  {errors.postal_code.message}
                </span>
              )}
            </div>
            <div className="col col-md-6">
              <label className="form-label">استان</label>
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("province_id", {
                  required: "فیلد استان الزامی ست",
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  انتخاب استان
                </option>
                {provinces &&
                  provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
              </select>
              {errors.province_id && (
                <span className="mt-2 d-block text-warning">
                  {errors.province_id.message}
                </span>
              )}
            </div>
            <div className="col col-md-6">
              <label className="form-label">شهر</label>
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("city_id", {
                  required: "فیلد شهر الزامی ست",
                })}
                defaultValue=""
              >
                <option disabled value="">
                  انتخاب شهر
                </option>
                {cities &&
                  cities
                    .filter(
                      (city) =>
                        city.province_id.toString() === watch("province_id")
                    )
                    .map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
              </select>
              {errors.province_id && (
                <span className="mt-2 d-block text-warning">
                  {errors.province_id.message}
                </span>
              )}
            </div>
            <div className="col col-md-12">
              <label className="form-label">آدرس</label>
              <textarea
                type="text"
                rows="5"
                className="form-control"
                {...register("address", {
                  required: "فیلد آدرس الزامی ست",
                })}
              ></textarea>
              {errors.address && (
                <span className="mt-2 d-block text-warning">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary mt-4"
            >
              ایجاد
              {loading && (
                <div className="spinner-border spinner-border-sm"></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
