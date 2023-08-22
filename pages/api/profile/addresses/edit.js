export default async function handeler(req, res) {
  if (req.method === "POST") {
    if (!req.cookies.token) {
      res.status(403).json({ message: { error: ["not auth"] } });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.BACKEND_API_PROFILE_ADDRESSES_EDIT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${req.cookies.token}`,
          },
          body: JSON.stringify({
            title: req.body.title,
            cellphone: req.body.cellphone,
            postal_code: req.body.postal_code,
            province_id: req.body.province_id,
            city_id: req.body.city_id,
            address: req.body.address,
            address_id: req.body.address_id,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        res.status(200).json({ user: data.data });
      } else {
        res.status(response.status).json(data.message);
      }
    } catch (error) {
      res.status(500).json({ message: { error: ["خطای سرور"] } });
    }
  } else {
    res.setHeaders("Allow", ["POST"]);
    res.status(405).json({ message: `method ${req.method} not allowed` });
  }
}
