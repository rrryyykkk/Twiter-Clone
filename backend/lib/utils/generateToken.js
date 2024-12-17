import jwt from "jsonwebtoken";

const generateTokenAndCookies = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 25 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks (mencegah XSS)
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks (mencegah CSRF attack)
    secure: process.env.NODE_ENV !== "development", //hanya aktif di HTTPS
  });
};

export default generateTokenAndCookies;
