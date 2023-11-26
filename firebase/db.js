import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"
import config from "./config.js"

const firebaseConfig = config
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
