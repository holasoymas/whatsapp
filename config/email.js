import nodemailer from "nodemailer";
import Config from "../../utils/config.js";
import { generateRand } from "../../utils/rand.js";

function generateHtml(verificationCode) {
  return ` <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border: 1px solid #ddd;">
        <h2 style="color: #333;">Email Verification</h2>
        <p style="font-size: 16px;">Your verification code is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0;">
          ${verificationCode}
        </div>
        <p style="font-size: 14px; color: #555;">Please enter this code to complete your verification process.</p>
      </div>
`;
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.google.com",
  port: 465,
  secure: true,
  auth: {
    user: Config.EMAIL,
    pass: Config.GOOGLE_PASS,
  },
});

function genEmailMetaData(email, verificationCode) {
  return {
    from: `'No Reply' <${Config.EMAIL}>`,
    to: email,
    subject: "Verification Code",
    html: generateHtml(verificationCode),
  };
}

export async function sendEmail(email) {
  try {
    const rand = generateRand(3);
    const emailMetaData = genEmailMetaData(email, rand);
    const info = await transporter.sendMail(emailMetaData);
    console.log(info);
    if (info.accepted.includes(email)) {
      console.log(`Rand email send`);
    }
  } catch (err) {
    throw err;
  }
}
