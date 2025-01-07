import "dotenv/config";

const Config = {
  PORT: process.env.PORT,
  JWT: process.env.JWT,
  EMAIL: process.env.EMAIL,
  GOOGLE_PASS: process.env.GOOGLE_PASS,
};

export default Config;
