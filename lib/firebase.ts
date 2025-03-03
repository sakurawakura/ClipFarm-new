import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDxaCtdJTxZEALWGLD1Vpca0mjRsrXelcg",
  authDomain: "clipfarm-6555c.firebaseapp.com",
  projectId: "clipfarm-6555c",
  storageBucket: "clipfarm-6555c.appspot.com",
  messagingSenderId: "315305785683",
  appId: "1:315305785683:web:YOUR_APP_ID", // You'll need to add your actual App ID here
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app

