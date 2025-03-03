import type { Metadata } from "next"
import SignUpClientPage from "./SignUpClientPage"

export const metadata: Metadata = {
  title: "Sign Up | ClipFarm",
  description: "Create a ClipFarm account",
}

export default function SignUpPage() {
  return <SignUpClientPage />
}

