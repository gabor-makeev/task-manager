import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { auth } from "../firebase/auth.js"

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // TODO: refactor this solution — probably it could be improved as soon as the path is currently hardcoded
    window.location.href = window.location.protocol + "//" + window.location.host + "/task-manager-front/pages/login/login.html"
  }
})
