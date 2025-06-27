"use client"

import { useState } from "react"
import { AppSidebar } from "./app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"

// Import all content components
import { OverviewTab } from "./tabs/overview-tab"
import { UsersList } from "./users/users-list"
import { RolesManagement } from "./users/roles-management"
import { InterfacesMonitoring } from "./maintenance/interfaces-monitoring"
import { DatabaseMonitoring } from "./maintenance/database-monitoring"
import { AuditLogs } from "./security/audit-logs"
import { PasswordManagement } from "./security/password-management"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewTab />
      case "users-list":
        return <UsersList />
      case "roles-management":
        return <RolesManagement />
      case "interfaces-monitoring":
        return <InterfacesMonitoring />
      case "database-monitoring":
        return <DatabaseMonitoring />
      case "audit-logs":
        return <AuditLogs />
      case "password-management":
        return <PasswordManagement />
      default:
        return <OverviewTab />
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs = {
      overview: { title: "Vue d'Ensemble", parent: null },
      "users-list": { title: "Liste des Utilisateurs", parent: "Utilisateurs & Droits" },
      "roles-management": { title: "Gestion des Rôles", parent: "Utilisateurs & Droits" },
      "interfaces-monitoring": { title: "Interfaces Matérielles", parent: "Surveillance & Maintenance" },
      "database-monitoring": { title: "Base de Données", parent: "Surveillance & Maintenance" },
      "audit-logs": { title: "Journal d'Activité", parent: "Sécurité & Audit" },
      "password-management": { title: "Gestion des Mots de Passe", parent: "Sécurité & Audit" },
    }

    return breadcrumbs[activeSection as keyof typeof breadcrumbs] || breadcrumbs.overview
  }

  const currentBreadcrumb = getBreadcrumb()

  return (
    <SidebarProvider>
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <SidebarInset className="h-screen flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setActiveSection("overview")}>
                  Dashboard Administrateur
                </BreadcrumbLink>
              </BreadcrumbItem>
              {currentBreadcrumb.parent && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">{currentBreadcrumb.parent}</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentBreadcrumb.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4 p-4">{renderContent()}</div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}
