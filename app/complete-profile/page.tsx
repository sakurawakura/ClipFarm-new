import type { Metadata } from "next"
import { CompleteProfileForm } from "@/components/complete-profile-form"

export const metadata: Metadata = {
  title: "Complete Your Profile | ClipFarm",
  description: "Complete your ClipFarm profile",
}

export default function CompleteProfilePage() {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Complete Your Profile</h1>
          <p className="text-sm text-muted-foreground">Just one more step to get started with ClipFarm</p>
        </div>
        <CompleteProfileForm />
      </div>
    </div>
  )
}

