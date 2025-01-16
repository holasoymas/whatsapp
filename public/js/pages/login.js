import { registerUser } from "../api/login.js";

document.querySelector("#loginPage .btn").addEventListener("click", onHandleClick);

async function onHandleClick() {
  const userDetails = getUserDetails();
  console.log(userDetails);
  registerUser(userDetails)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.location.href = res.result.redirectedUrl;
      }
      if (res.status === 400) {
        document.querySelector(".error-email").innerHTML = res.error.error;
      }
    })
    .catch((_err) => {
      document.querySelector(".error-email").innerHTML = "Something went Wrong, Try again later";
    });
}

function getUserDetails() {
  return {
    email: document.querySelector("#loginPage #email").value,
  };
}
