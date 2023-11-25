import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import config from "./config.js"

const firebaseConfig = config
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
