"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SignUpForm() {
  const { signUp, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams?.get("role") || "clipper"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"creator" | "clipper">(defaultRole as "creator" | "clipper")
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    try {
      const result = await signUp(email, password, role, name)
      if (result.success) {
        setIsSuccess(true)
        // Redirect to sign-in page after 2 seconds
        setTimeout(() => {
          router.push("/sign-in")
        }, 2000)
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.")
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSuccess && (
        <Alert className="border-green-500 text-green-500">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Account created successfully! Redirecting to login...</AlertDescription>
        </Alert>
      )}

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              disabled={loading || isSuccess}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={loading || isSuccess}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={loading || isSuccess}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Password must be at least 6 characters long</p>
          </div>
          <div className="grid gap-2">
            <Label>I am a</Label>
            <RadioGroup
              value={role}
              onValueChange={(value) => setRole(value as "creator" | "clipper")}
              className="flex gap-4"
              disabled={loading || isSuccess}
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
          <Button disabled={loading || isSuccess} className="w-full">
            {loading ? "Creating account..." : isSuccess ? "Account created!" : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  )
}

