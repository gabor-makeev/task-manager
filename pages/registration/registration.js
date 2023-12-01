import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { auth } from "../../firebase/auth.js"

const registrationForm = document.getElementById("registration-form")
registrationForm.addEventListener('submit',(e) => {
  e.preventDefault()

  const name = document.getElementById("registration-form__name-input").value
  const email = document.getElementById("registration-form__email-input").value
  const password = document.getElementById("registration-form__password-input").value

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      updateProfile(userCredentials.user, {
        displayName: name
      })
    })
    .catch((error) => {
      console.log(error)
    })
})
