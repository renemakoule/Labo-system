"use client"

import { Header } from "@/components/dashboard/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { DateRangeFilter } from "@/components/dashboard/date-range-filter"
import { OverviewTab } from "@/components/dashboard/tabs/overview-tab"
import { SalesPerformanceTab } from "@/components/dashboard/tabs/sales-performance-tab"
import { SalesChannelsTab } from "@/components/dashboard/tabs/sales-channels-tab"
import { TreasuryReceivablesTab } from "@/components/dashboard/tabs/treasury-receivables-tab"
import { TreasuryCashflowTab } from "@/components/dashboard/tabs/treasury-cashflow-tab"
import { CostsSuppliersTab } from "@/components/dashboard/tabs/costs-suppliers-tab"
import { CostsInventoryTab } from "@/components/dashboard/tabs/costs-inventory-tab"
import { SettingsFinancialTab } from "@/components/dashboard/tabs/settings-financial-tab"
import { SettingsReportsTab } from "@/components/dashboard/tabs/settings-reports-tab"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardContentProps {
  activeTab: string
}

const tabTitles: Record<string, string> = {
  overview: "Vue d'Ensemble",
  "sales-performance": "Performance des Analyses",
  "sales-channels": "Canaux de Paiement",
  "treasury-receivables": "Suivi des Créances",
  "treasury-cashflow": "Flux de Trésorerie",
  "costs-suppliers": "Dépenses Fournisseurs",
  "costs-inventory": "Gestion du Stock",
  "settings-financial": "Paramètres Financiers",
  "settings-reports": "Générateur de Rapports",
}

export function DashboardContent({ activeTab }: DashboardContentProps) {
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />
      case "sales-performance":
        return <SalesPerformanceTab />
      case "sales-channels":
        return <SalesChannelsTab />
      case "treasury-receivables":
        return <TreasuryReceivablesTab />
      case "treasury-cashflow":
        return <TreasuryCashflowTab />
      case "costs-suppliers":
        return <CostsSuppliersTab />
      case "costs-inventory":
        return <CostsInventoryTab />
      case "settings-financial":
        return <SettingsFinancialTab />
      case "settings-reports":
        return <SettingsReportsTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <SidebarInset className="flex flex-col h-screen">
      <Header title={tabTitles[activeTab] || "Dashboard"} />
      <div className="flex items-center justify-end p-4 border-b">
        <DateRangeFilter />
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 md:p-8">
          <div className="transition-all duration-300 ease-in-out">{renderTabContent()}</div>
        </div>
      </ScrollArea>
    </SidebarInset>
  )
}
