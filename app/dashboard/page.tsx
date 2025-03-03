"use client"

import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardCreator } from "@/components/dashboard-creator"

export default function DashboardPage() {
  const { userData } = useAuth()
  const userType = userData?.role || "creator"

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text={
          userType === "creator"
            ? "Manage your campaigns and track clipper performance."
            : "Find creator campaigns and track your earnings."
        }
      />
      <div>
        {userType === "creator" ? (
          <DashboardCreator />
        ) : (
          <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
            <h2 className="text-xl font-semibold">Welcome, Clipper!</h2>
            <p className="mt-2 text-muted-foreground">
              Your clipper dashboard is being set up. Check back soon to find campaigns and track your earnings.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

