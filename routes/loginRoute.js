import express from "express";
import path from "node:path";
const loginRoute = express.Router();
import session from "express-session";
import { generateRand } from "../utils/rand.js";
import { sendEmail } from "../config/email.js";
import { createToken } from "../utils/jwt.js";
import { findOrCreateUser } from "../models/userModel.js";
import Config, { COOKIE_META_DATA, SESSION_AGE, SESSION_META_DATA } from "../utils/config.js";
const __dirname = path.resolve();

const sessionMiddleware = session(SESSION_META_DATA);

loginRoute.get("", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

loginRoute.post("", sessionMiddleware, async (req, res) => {
  const email = req.body.email.trim();
  if (!email) {
    res.status(400).json({ error: "Plz enter an email " });
  }
  req.session.email = email;
  req.session.otp = generateRand(3);
  req.session.expiredAt = Date.now() + SESSION_AGE;
  try {
    await sendEmail(req.session.email, req.session.otp);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
  // res.redirect(302, "/login/verify");
  res.status(200).json({ redirectedUrl: `${Config.BASE_API_URL}/login/verify` });
});

loginRoute.get("/verify", sessionMiddleware, (req, res) => {
  const { otp, expiredAt } = req.session;
  // in case of session has expired or otp was expired
  if (!otp || Date.now() > expiredAt) {
    res.redirect(302, "/login");
  }
  res.sendFile(path.join(__dirname, "public", "verification.html"));
});

loginRoute.post("/verify", sessionMiddleware, async (req, res) => {
  const userOtp = req.body.otp;
  const { email, otp, expiredAt } = req.session;
  console.log(email, otp, expiredAt);

  if (!otp || Date.now() > expiredAt) {
    return res.status(401).send({ error: "OTP expired, Please send verification again" });
  }

  if (userOtp != otp) {
    return res.status(401).send({ error: "Invalid OTP" });
  }

  try {
    const user = await findOrCreateUser(email);
    const jwtData = {
      id: user.id,
      email: user.email,
    };
    const token = createToken(jwtData);
    // store the token in the cookie
    res.cookie("authToken", token, COOKIE_META_DATA);
    res.status(201).json({ token, redirectedUrl: `${Config.BASE_API_URL}/chat` });
  } catch (err) {
    res.status(500).json({ error: err });
    Logger.error("error in db", err);
  }
});

export { loginRoute };
