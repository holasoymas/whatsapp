import jwt from "jsonwebtoken";
import Config from "./config.js";

export const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

export function createToken(userData) {
  const token = jwt.sign(userData, Config.JWT, { expiresIn: "5d" });
  return token;
}

export function decodeToken(token) {
  const userData = jwt.decode(token, Config.JWT);
  if (!userData) return null;
  return userData;
}
