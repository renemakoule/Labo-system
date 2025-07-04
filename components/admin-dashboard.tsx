"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context" // Importez votre hook useLanguage

import { AppSidebar } from "./app-sidebar" // Ce composant aura besoin d'être mis à jour aussi
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
import { LanguageSwitcher } from "@/components/language-switcher"

// Import all content components (ces composants devront être mis à jour individuellement)
import { OverviewTab } from "./tabs/overview-tab"
import { UsersList } from "./users/users-list"
import { RolesManagement } from "./users/roles-management"
import { InterfacesMonitoring } from "./maintenance/interfaces-monitoring"
import { DatabaseMonitoring } from "./maintenance/database-monitoring"
import { AuditLogs } from "./security/audit-logs"
import { PasswordManagement } from "./security/password-management"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const { t, locale } = useLanguage() // Obtenez la locale ici

  // Déterminez la position de la sidebar en fonction de la locale
  const sidebarSide = locale === 'ar' ? 'right' : 'left';

  const renderContent = () => {
    switch (activeSection) {
      case "overview": return <OverviewTab />
      case "users-list": return <UsersList />
      case "roles-management": return <RolesManagement />
      case "interfaces-monitoring": return <InterfacesMonitoring />
      case "database-monitoring": return <DatabaseMonitoring />
      case "audit-logs": return <AuditLogs />
      case "password-management": return <PasswordManagement />
      default: return <OverviewTab />
    }
  }

  const getBreadcrumb = () => {
    const breadcrumbs: { [key: string]: { title: string; parent: string | null } } = {
      overview: { title: t('AdminDashboard.breadcrumb.overview'), parent: null },
      "users-list": { title: t('AdminDashboard.breadcrumb.usersList'), parent: t('AdminDashboard.breadcrumb.usersParent') },
      "roles-management": { title: t('AdminDashboard.breadcrumb.rolesManagement'), parent: t('AdminDashboard.breadcrumb.usersParent') },
      "interfaces-monitoring": { title: t('AdminDashboard.breadcrumb.interfacesMonitoring'), parent: t('AdminDashboard.breadcrumb.maintenanceParent') },
      "database-monitoring": { title: t('AdminDashboard.breadcrumb.databaseMonitoring'), parent: t('AdminDashboard.breadcrumb.maintenanceParent') },
      "audit-logs": { title: t('AdminDashboard.breadcrumb.auditLogs'), parent: t('AdminDashboard.breadcrumb.securityParent') },
      "password-management": { title: t('AdminDashboard.breadcrumb.passwordManagement'), parent: t('AdminDashboard.breadcrumb.securityParent') },
    }
    return breadcrumbs[activeSection] || breadcrumbs.overview
  }

  const currentBreadcrumb = getBreadcrumb()

  // Passez les traductions au AppSidebar
  const sidebarTranslations = {
    navigation: t('AdminSidebar.navigation'),
    overview: t('AdminSidebar.overview'),
    usersAndRights: t('AdminSidebar.usersAndRights'),
    usersList: t('AdminSidebar.usersList'),
    rolesManagement: t('AdminSidebar.rolesManagement'),
    monitoringAndMaintenance: t('AdminSidebar.monitoringAndMaintenance'),
    hardwareInterfaces: t('AdminSidebar.hardwareInterfaces'),
    databaseMonitoring: t('AdminSidebar.databaseMonitoring'),
    securityAndAudit: t('AdminSidebar.securityAndAudit'),
    activityLog: t('AdminSidebar.activityLog'),
    passwordManagement: t('AdminSidebar.passwordManagement'),
    systemStatus: t('AdminSidebar.systemStatus'),
    server: t('AdminSidebar.server'),
    database: t('AdminSidebar.database'),
    backups: t('AdminSidebar.backups'),
    ok: t('AdminSidebar.ok'),
    warning: t('AdminSidebar.warning'),
    error: t('AdminSidebar.error'),
    labName: t('AdminSidebar.labName'),
    labNameFull: t('AdminSidebar.labNameFull')
  };

  return (
    <SidebarProvider>
      <AppSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        translations={sidebarTranslations}
        side={sidebarSide}
      />
      <SidebarInset className="h-screen flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ms-1" />
          <Separator orientation="vertical" className="me-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setActiveSection("overview")}>
                  {t('AdminDashboard.breadcrumb.dashboard')}
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
          <div className="ms-auto">
            <LanguageSwitcher />
          </div>
        </header>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4 p-4">{renderContent()}</div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  )
}