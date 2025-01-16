import { verifyOtp } from "../api/login.js";
document.querySelector(".verification-container .btn").addEventListener("click", onVerifyClick);

function onVerifyClick() {
  const userOtp = getUserOtp();
  console.log(userOtp);
  verifyOtp(userOtp)
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        window.location.href = res.result.redirectedUrl;
      }
      if (res.status === 401) {
        document.querySelector(".error-email").innerHTML = res.error.error;
      }
    })
    .catch((_err) => {
      document.querySelector(".error-email").innerHTML = "Something went Wrong, Try again later";
    });
}

function getUserOtp() {
  return {
    otp: document.querySelector(".verification-container #otp").value,
  };
}
