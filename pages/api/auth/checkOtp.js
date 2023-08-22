import cookie from "cookie";

export default async function handeler(req, res) {
  if (req.method === "POST") {
    if (!req.cookies.login_token) {
      res.status(403).json({ message: "یک بار دیگر امتحان کنید" });
      return;
    }
    try {
      const response = await fetch(`${process.env.BACKEND_API_CHECKOTP}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          otp: req.body.otp,
          login_token: req.cookies.login_token,
        }),
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("login_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: new Date(0),
            path: "/",
          }),
          cookie.serialize("token", data.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          }),
        ]);
        res
          .status(200)
          .json({ user: data.data.user, message: "شما با موفقیت وارد شدید" });
      } else {
        res.status(response.status).json({ message: data.message });
      }
    } catch (error) {
      res.status(422).json({ message: { error: ["خطای سرور"] } });
    }
  } else {
    res.setHeaders("Allow", ["POST"]);
    res.status(405).json({ message: `method ${req.method} not allowed` });
  }
}
