import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Suspense } from "react"
import { LoadingScreen } from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ClipFarm - Connect Creators with Clippers",
  description: "Platform for content creators to find clippers and grow their audience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<LoadingScreen />}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}



import './globals.css'