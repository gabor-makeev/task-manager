import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { auth } from "../../firebase/auth.js"

const loginForm = document.getElementById("login-form")
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = document.getElementById("login-form__email-input").value
  const password = document.getElementById("login-form__password-input").value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = '../auth/dashboard/dashboard.html';
    })
    .catch((error) => {
      console.log(error)
    });
})
