"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"
import { SignUpForm } from "@/components/sign-up-form"

export default function SignUpClientPage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link href="/" className="absolute left-4 top-4 flex items-center text-sm font-medium md:left-8 md:top-8">
        <ArrowLeft className="mr-2 size-4" />
        Back
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
          <div className="size-8 rounded-full bg-white" />
          <span>ClipFarm</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "I've been able to monetize my editing skills through ClipFarm. The platform connects me with creators who
              value my work and pay fairly."
            </p>
            <footer className="text-sm">Alex Chen, Professional Clipper</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Fill in your details to get started with ClipFarm</p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpForm />
          </Suspense>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

