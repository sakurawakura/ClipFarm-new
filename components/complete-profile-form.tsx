"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function CompleteProfileForm() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [role, setRole] = useState<"creator" | "clipper">("clipper")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if no user is logged in
    if (!loading && !user) {
      router.push("/sign-in")
    }
  }, [user, loading, router])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    if (!user) {
      setError("You must be logged in to complete your profile")
      return
    }

    try {
      setIsSubmitting(true)

      // Store user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role,
        name: user.displayName || "User",
        createdAt: new Date().toISOString(),
      })

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to complete profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="grid gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>I am a</Label>
            <RadioGroup
              value={role}
              onValueChange={(value) => setRole(value as "creator" | "clipper")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creator" id="creator" />
                <Label htmlFor="creator" className="cursor-pointer">
                  Content Creator
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clipper" id="clipper" />
                <Label htmlFor="clipper" className="cursor-pointer">
                  Clipper
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Saving..." : "Complete Profile"}
          </Button>
        </div>
      </form>
    </div>
  )
}

