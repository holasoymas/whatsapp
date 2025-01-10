import express from "express";
import path from "node:path";
const loginRoute = express.Router();
import session from "express-session";
import { generateRand } from "../utils/rand.js";
import { sendEmail } from "../config/email.js";
import { createToken } from "../utils/jwt.js";

const __dirname = path.resolve();

const SESSION_AGE = 2 * 60 * 1000; // 2 min

const sessionMetaData = {
  secret: "mysecret_session",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, // do true for https
    sameSite: "strict",
    maxAge: SESSION_AGE,
  },
};

const sessionMiddleware = session(sessionMetaData);

loginRoute.get("", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

loginRoute.post("", sessionMiddleware, async (req, res) => {
  const { email } = req.body;
  req.session.email = email.trim();
  req.session.otp = generateRand(3);
  req.session.expiredAt = Date.now() + SESSION_AGE;
  await sendEmail(req.session.email, req.session.otp);
  res.redirect(302, "/login/verify");
});

loginRoute.get("/verify", sessionMiddleware, (req, res) => {
  const { otp, expiredAt } = req.session;
  // in case of session has expired or otp was expired
  if (!otp || Date.now() > expiredAt) {
    res.redirect(302, "/login");
  }
  res.sendFile(path.join(__dirname, "public", "verification.html"));
});

loginRoute.post("/verify", sessionMiddleware, (req, res) => {
  const userOtp = req.body.otp;
  const { email, otp, expiredAt } = req.session;
  console.log(email, otp, expiredAt);

  if (!otp || Date.now() > expiredAt) {
    return res.status(401).send({ error: "OTP expired, Please send verification again" });
  }

  if (userOtp != otp) {
    return res.status(401).send({ error: "Invalid OTP" });
  }
  const userData = {
    email,
  };
  const token = createToken(userData);
  res.status(200).send({ token, redirectedUrl: "/chat" });
});

export { loginRoute };
