export default async function handeler(req, res) {
  if (req.method === "GET") {
    if (!req.cookies.token) {
      res.status(403).json({ message: { error: ["not auth"] } });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.BACKEND_API_USER_ADDRESSES}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data.data);
      } else {
        res.status(response.status).json(data.message);
      }
    } catch (error) {
      res.status(500).json({ message: { error: ["خطای سرور"] } });
    }
  } else {
    res.setHeaders("Allow", ["GET"]);
    res.status(405).json({ message: `method ${req.method} not allowed` });
  }
}
