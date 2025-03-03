import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDxaCtdJTxZEALWGLD1Vpca0mjRsrXelcg",
  authDomain: "clipfarm-6555c.firebaseapp.com",
  projectId: "clipfarm-6555c",
  storageBucket: "clipfarm-6555c.appspot.com",
  messagingSenderId: "315305785683",
  appId: "1:315305785683:web:YOUR_APP_ID", // You'll need to add your actual App ID here
}

// Initialize Firebase immediately, but only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Initialize services
const auth = getAuth(app)
const db = getFirestore(app)

// Enable offline persistence for Firestore
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.")
    } else if (err.code === "unimplemented") {
      console.warn("The current browser does not support persistence.")
    }
  })
}

export { app, auth, db }

