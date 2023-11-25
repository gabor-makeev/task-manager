import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { auth } from "../../../firebase/auth.js"

const logOutButton = document.getElementById("header__sign-out-button")
logOutButton.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      window.location.href = window.location.protocol + "//" + window.location.host + "/task-manager-front/pages/login/login.html"
    })
    .catch((e) => {
      console.log(e)
    })
})
