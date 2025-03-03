import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDxaCtdJTxZEALWGLD1Vpca0mjRsrXelcg",
  authDomain: "clipfarm-6555c.firebaseapp.com",
  projectId: "clipfarm-6555c",
  storageBucket: "clipfarm-6555c.appspot.com",
  messagingSenderId: "315305785683",
  appId: "1:315305785683:web:YOUR_APP_ID", // Make sure to replace this with your actual App ID
}

// Initialize Firebase immediately, but only once
let app
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
} catch (error) {
  console.error("Error initializing Firebase:", error)
  throw error
}

// Initialize services
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }

