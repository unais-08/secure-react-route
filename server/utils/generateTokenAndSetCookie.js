import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    // httpOnly: true, // prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    // sameSite: "strict", //prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};