import jwt from "jsonwebtoken";
import Config, { JWT_AGE } from "./config.js";

export function createToken(userData) {
  const token = jwt.sign(userData, Config.JWT, { expiresIn: JWT_AGE });
  return token;
}

export function decodeToken(token) {
  return jwt.verify(token, Config.JWT);
}
