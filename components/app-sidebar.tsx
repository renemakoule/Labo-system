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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

// Définissez le type pour l'objet de traduction que AppSidebar recevra
interface AppSidebarTranslations {
  navigation: string;
  overview: string;
  usersAndRights: string;
  usersList: string;
  rolesManagement: string;
  monitoringAndMaintenance: string;
  hardwareInterfaces: string;
  databaseMonitoring: string;
  securityAndAudit: string;
  activityLog: string;
  passwordManagement: string;
  systemStatus: string;
  server: string;
  database: string;
  backups: string;
  ok: string;
  warning: string;
  error: string;
  labName: string;
  labNameFull: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeSection: string
  onSectionChange: (section: string) => void
  translations: AppSidebarTranslations; // Prop de traduction
  side?: 'left' | 'right'; // AJOUT DE LA PROPRIÉTÉ SIDE
}

export function AppSidebar({ activeSection, onSectionChange, translations, side, ...props }: AppSidebarProps) {
  const t = translations;

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

  // Utiliser les traductions pour les titres des éléments de navigation
  const navigationItems = [
    {
      title: t.overview,
      icon: BarChart3,
      key: "overview",
      status: systemStatus.overview,
    },
    {
      title: t.usersAndRights,
      icon: Users,
      key: "users",
      status: systemStatus.users,
      items: [
        {
          title: t.usersList,
          key: "users-list",
          icon: UserCheck,
        },
        {
          title: t.rolesManagement,
          key: "roles-management",
          icon: Settings,
        },
      ],
    },
    {
      title: t.monitoringAndMaintenance,
      icon: Wrench,
      key: "maintenance",
      status: systemStatus.maintenance,
      items: [
        {
          title: t.hardwareInterfaces,
          key: "interfaces-monitoring",
          icon: Activity,
        },
        {
          title: t.databaseMonitoring,
          key: "database-monitoring",
          icon: Database,
        },
      ],
    },
    {
      title: t.securityAndAudit,
      icon: Shield,
      key: "security",
      status: systemStatus.security,
      items: [
        {
          title: t.activityLog,
          key: "audit-logs",
          icon: FileText,
        },
        {
          title: t.passwordManagement,
          key: "password-management",
          icon: Key,
        },
      ],
    },
  ]

  return (
    <Sidebar side={side} {...props}> {/* PASSEZ LA PROPRIÉTÉ SIDE ICI */}
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
                    <AvatarImage src="/78524.png?height=32&width=32" alt={t.labName} />
                    <AvatarFallback>LMD</AvatarFallback>
                  </Avatar>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-lg text-gray-900 truncate">{t.labName}</h2>
            <p className="text-xs text-gray-500 text-center">{t.labNameFull}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>{t.navigation}</SidebarGroupLabel>
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
                          <SidebarMenuSub className="ms-2">
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.key}>
                                <SidebarMenuSubButton asChild isActive={activeSection === subItem.key}>
                                  <button onClick={() => onSectionChange(subItem.key)} className="w-full text-start">
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
          <SidebarGroupLabel>{t.systemStatus}</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t.server}</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-green-600 font-medium">{t.ok}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t.database}</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-green-600 font-medium">{t.ok}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{t.backups}</span>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <span className="text-orange-600 font-medium">{t.warning}</span>
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