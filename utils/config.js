import "dotenv/config";

const BASE_API_URL = "http://localhost:8000";

const Config = {
  PORT: process.env.PORT,
  JWT: process.env.JWT,
  EMAIL: process.env.EMAIL,
  GOOGLE_PASS: process.env.GOOGLE_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  SECRET_SESSION: process.env.SECRET_SESSION,
  BASE_API_URL,
};

const SESSION_AGE = 2 * 60 * 1000; // 2 min
const COOKIE_AGE = 1000 * 60 * 60 * 24 * 5; // 5 days in milliseconds
// const COOKIE_AGE = 1000 * 60 * 1; // 1 min in milliseconds
const JWT_AGE = Math.floor(COOKIE_AGE / 1000); // in seconds

const SESSION_META_DATA = {
  secret: Config.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, // do true for https
    sameSite: "strict",
    maxAge: SESSION_AGE,
  },
};

const COOKIE_META_DATA = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: COOKIE_AGE,
};

export default Config;
export { COOKIE_META_DATA, SESSION_META_DATA, SESSION_AGE, JWT_AGE };
