import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import { auth } from "../../firebase/auth.js"
import { db } from "../../firebase/db.js"

const registrationForm = document.getElementById("registration-form")
registrationForm.addEventListener('submit',(e) => {
  e.preventDefault()

  const email = document.getElementById("registration-form__email-input").value
  const password = document.getElementById("registration-form__password-input").value

  addDoc(collection(db, "users"), {
    email: email
  })

  createUserWithEmailAndPassword(auth, email, password)
    .then()
    .catch((error) => {
      console.log(error)
    })
})
