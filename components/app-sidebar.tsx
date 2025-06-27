"use client"

import type * as React from "react"
import {
  BarChart3,
  Users,
  Wrench,
  Shield,
  UserCheck,
  Settings,
  Activity,
  Database,
  FileText,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange, ...props }: AppSidebarProps) {
  // Données simulées pour les indicateurs de statut
  const systemStatus = {
    overview: { status: "warning", count: 2 }, // 2 alertes
    users: { status: "ok", count: 23 }, // 23 utilisateurs actifs
    maintenance: { status: "error", count: 1 }, // 1 erreur critique
    security: { status: "warning", count: 5 }, // 5 alertes sécurité
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ok":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-orange-500" />
      case "error":
        return <XCircle className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string, count?: number) => {
    const colors = {
      ok: "bg-green-100 text-green-800",
      warning: "bg-orange-100 text-orange-800",
      error: "bg-red-100 text-red-800",
    }

    if (!count) return null

    return <Badge className={`${colors[status as keyof typeof colors]} hover:bg-current text-xs`}>{count}</Badge>
  }

  const navigationItems = [
    {
      title: "Vue d'Ensemble",
      icon: BarChart3,
      key: "overview",
      status: systemStatus.overview,
    },
    {
      title: "Utilisateurs & Droits",
      icon: Users,
      key: "users",
      status: systemStatus.users,
      items: [
        {
          title: "Liste des Utilisateurs",
          key: "users-list",
          icon: UserCheck,
        },
        {
          title: "Gestion des Rôles",
          key: "roles-management",
          icon: Settings,
        },
      ],
    },
    {
      title: "Surveillance & Maintenance",
      icon: Wrench,
      key: "maintenance",
      status: systemStatus.maintenance,
      items: [
        {
          title: "Interfaces Matérielles",
          key: "interfaces-monitoring",
          icon: Activity,
        },
        {
          title: "Base de Données",
          key: "database-monitoring",
          icon: Database,
        },
      ],
    },
    {
      title: "Sécurité & Audit",
      icon: Shield,
      key: "security",
      status: systemStatus.security,
      items: [
        {
          title: "Journal d'Activité",
          key: "audit-logs",
          icon: FileText,
        },
        {
          title: "Gestion des Mots de Passe",
          key: "password-management",
          icon: Key,
        },
      ],
    },
  ]

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-primary-foreground">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">LABO</span>
            <span className="text-xs text-muted-foreground">Laboratoire Médical</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    {item.items ? (
                      <Collapsible
                        defaultOpen={
                          activeSection.startsWith(item.key) ||
                          item.items.some((subItem) => subItem.key === activeSection)
                        }
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className="w-full justify-between"
                            isActive={activeSection.startsWith(item.key)}
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(item.status.status)}
                              {getStatusBadge(item.status.status, item.status.count)}
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="space-y-1 ml-2">
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.key}>
                                <SidebarMenuSubButton asChild isActive={activeSection === subItem.key}>
                                  <button onClick={() => onSectionChange(subItem.key)} className="w-full text-left">
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
                                  </button>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton asChild isActive={activeSection === item.key}>
                        <button onClick={() => onSectionChange(item.key)} className="w-full justify-between">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(item.status.status)}
                            {getStatusBadge(item.status.status, item.status.count)}
                          </div>
                        </button>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Statut Système</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Serveur</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-green-600 font-medium">OK</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Base de données</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-green-600 font-medium">OK</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Sauvegardes</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-orange-600 font-medium">Attention</span>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
