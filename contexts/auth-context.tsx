"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"

type UserRole = "creator" | "clipper"

interface UserData {
  uid: string
  email: string | null
  role: UserRole
  displayName: string | null
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  isAuthReady: boolean // New property to track initial auth state
  loading: boolean
  signUp: (email: string, password: string, role: UserRole, name: string) => Promise<void | { success: boolean }>
  signIn: (email: string, password: string) => Promise<void | { success: boolean }>
  logOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isAuthReady, setIsAuthReady] = useState(false) // Track if initial auth check is complete
  const [loading, setLoading] = useState(false) // Only for operations, not initial load
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid)
          const userDoc = await getDoc(userDocRef)

          if (userDoc.exists()) {
            setUserData({
              uid: currentUser.uid,
              email: currentUser.email,
              role: userDoc.data().role as UserRole,
              displayName: currentUser.displayName || userDoc.data().name,
            })
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        setUserData(null)
      }

      setIsAuthReady(true) // Mark auth as ready after initial check
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, role: UserRole, name: string) => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await setDoc(doc(db, "users", user.uid), {
        email,
        role,
        name,
        createdAt: new Date().toISOString(),
      })

      await signOut(auth)
      return { success: true }
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
      return { success: true }
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const logOut = async () => {
    try {
      setLoading(true)
      await signOut(auth)
      router.push("/")
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setLoading(true)
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    userData,
    isAuthReady,
    loading,
    signUp,
    signIn,
    logOut,
    resetPassword,
  }

  // Don't render children until initial auth check is complete
  if (!isAuthReady) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

