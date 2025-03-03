import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

import { ForgotPasswordForm } from "@/components/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password | ClipFarm",
  description: "Reset your ClipFarm password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center">
      <Link href="/sign-in" className="absolute left-4 top-4 flex items-center text-sm font-medium md:left-8 md:top-8">
        <ArrowLeft className="mr-2 size-4" />
        Back to Sign In
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

