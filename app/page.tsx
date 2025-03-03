import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-full bg-primary" />
            <span>ClipFarm</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
              Connect Content Creators <br className="hidden sm:inline" />
              with Talented Clippers
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              ClipFarm helps content creators find skilled clippers to create viral shorts for TikTok, YouTube, and
              Instagram. Launch campaigns, track performance, and grow your audience.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/sign-up?role=creator">
              <Button size="lg" className="gap-2">
                I'm a Creator <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/sign-up?role=clipper">
              <Button size="lg" variant="outline" className="gap-2">
                I'm a Clipper <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

