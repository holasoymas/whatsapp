import { fetchFromServer } from "../utils/fetcher.js";

export async function registerUser(userData) {
  try {
    const data = await fetchFromServer("login", "POST", userData);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function verifyOtp(otp) {
  try {
    const data = await fetchFromServer("login/verify", "POST", otp);
    return data;
  } catch (err) {
    throw err;
  }
}
