import cookie from "cookie";

export default async function handeler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch(`${process.env.BACKEND_API_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({ cellphone: req.body.cellphone }),
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        console.log("login_token=", data.data.login_token);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("login_token", data.data.login_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          })
        );
        res.status(200).json({ message: "کد ورود برای شما ارسال شد" });
      } else {
        res.status(response.status).json({ message: data.message });
      }
    } catch (error) {
      res.status(500).json({ message: { error: ["خطای سرور"] } });
    }
  } else {
    res.setHeaders("Allow", ["POST"]);
    res.status(405).json({ message: `method ${req.method} not allowed` });
  }
}
