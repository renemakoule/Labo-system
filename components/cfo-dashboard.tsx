"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardContent } from "@/components/dashboard/content"
import { DateRangeProvider } from "@/components/dashboard/date-range-context"

export function CFODashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DateRangeProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="h-screen flex w-full bg-background overflow-hidden">
          <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <DashboardContent activeTab={activeTab} />
        </div>
      </SidebarProvider>
    </DateRangeProvider>
  )
}
