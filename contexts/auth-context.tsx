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
import { LoadingScreen } from "@/components/loading-screen"

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
  isAuthReady: boolean
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
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState<Error | null>(null)
  const router = useRouter()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let unsubscribe: () => void

    const initAuth = async () => {
      try {
        // Set a timeout for auth initialization
        const authTimeout = new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error("Auth initialization timed out"))
          }, 5000) // 5 second timeout
        })

        // Set up auth state listener
        const authInit = new Promise<void>((resolve) => {
          unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
              setUser(currentUser)

              if (currentUser) {
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
              } else {
                setUserData(null)
              }

              resolve()
            } catch (error) {
              console.error("Error in auth state change:", error)
              resolve() // Resolve anyway to prevent hanging
            }
          })
        })

        // Race between timeout and auth initialization
        await Promise.race([authInit, authTimeout])
        clearTimeout(timeoutId)
        setIsAuthReady(true)
      } catch (error) {
        console.error("Auth initialization error:", error)
        setAuthError(error as Error)
        setIsAuthReady(true) // Set ready even on error to prevent infinite loading
      }
    }

    initAuth()

    return () => {
      clearTimeout(timeoutId)
      if (unsubscribe) {
        unsubscribe()
      }
    }
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

  // Show error if auth initialization failed
  if (authError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md p-4 text-center">
          <h2 className="mb-2 text-lg font-semibold text-destructive">Authentication Error</h2>
          <p className="text-sm text-muted-foreground">
            There was a problem connecting to the authentication service. Please try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  // Show loading screen while checking auth state
  if (!isAuthReady) {
    return <LoadingScreen />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

