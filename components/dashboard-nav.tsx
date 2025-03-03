"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, PlusCircle, Settings, Users, Video } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: Home,
      title: "Overview",
    },
    {
      href: "/dashboard/campaigns",
      icon: Video,
      title: "Campaigns",
    },
    {
      href: "/dashboard/clippers",
      icon: Users,
      title: "Clippers",
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      title: "Analytics",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <nav className="grid items-start gap-2 py-4">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={pathname === route.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              pathname === route.href ? "bg-secondary" : "hover:bg-transparent hover:underline",
            )}
          >
            <route.icon className="size-4" />
            {route.title}
          </Button>
        </Link>
      ))}
      <Button className="mt-4 w-full justify-start gap-2">
        <PlusCircle className="size-4" />
        New Campaign
      </Button>
    </nav>
  )
}

