import cookie from "cookie";

export default async function handeler(req, res) {
  if (req.method === "POST") {
    if (!req.cookies.token) {
      res.status(403).json({ message: "یک بار دیگر امتحان کنید" });
      return;
    }
    try {
      const response = await fetch(`${process.env.BACKEND_API_LOGOUT}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: new Date(0),
            path: "/",
          })
        );
        res.status(200).json({ message: "شما با موفقیت خارج شدید" });
      } else {
        res
          .status(response.status)
          .json({ message: "یک بار دیگر امتحان کنید" });
      }
    } catch (error) {
      res.status(422).json({ message: { error: ["خطای سرور"] } });
    }
  } else {
    res.setHeaders("Allow", ["POST"]);
    res.status(405).json({ message: `method ${req.method} not allowed` });
  }
}
