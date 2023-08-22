import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useState } from "react";
import { handleError } from "lib/helper";

const Delete = ({ id }) => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/profile/addresses/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ address_id: id }),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("  آدرس شما با موفقیت حذف شد");
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
    <button className="btn btn-dark" onClick={handleDelete} type="button">
      حذف
      {loading && <div className="spinner-border spinner-border-sm"></div>}
    </button>
  );
};

export default Delete;
