"use client"

import type * as React from "react"
import {
  FlaskConical,
  Home,
  Syringe,
  Package,
  Calendar,
  FileText,
  BarChart3,
  Users,
  History,
  Box,
  TestTube,
  CheckCircle,
  ClipboardList,
  ChevronDown,
  CreditCard,
  Calculator,
  Banknote,
} from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const navigationData = {
  navMain: [
    {
      title: "Accueil & Secrétariat",
      url: "#",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Tableau de Bord",
          url: "#",
          key: "accueil-dashboard",
          icon: BarChart3,
          isActive: true,
        },
        {
          title: "Patients",
          url: "#",
          key: "accueil-patients",
          icon: Users,
        },
        {
          title: "Paiement",
          url: "#",
          key: "accueil-paiement",
          icon: CreditCard,
        },
        {
          title: "Facture",
          url: "#",
          key: "accueil-facture",
          icon: FileText,
        },
        {
          title: "Encaissement",
          url: "#",
          key: "accueil-encaissement",
          icon: Banknote,
        },
        {
          title: "Rapport de Caisse",
          url: "#",
          key: "accueil-rapport-caisse",
          icon: Calculator,
        },
        {
          title: "Historique d'Actions",
          url: "#",
          key: "accueil-history",
          icon: History,
        },
      ],
    },
    {
      title: "Prélèvement",
      url: "#",
      icon: Syringe,
      items: [
        {
          title: "Box",
          url: "#",
          key: "prelevement-box",
          icon: Box,
        },
        {
          title: "Patients",
          url: "#",
          key: "prelevement-patients",
          icon: Users,
        },
        {
          title: "Historique d'Actions",
          url: "#",
          key: "prelevement-history",
          icon: History,
        },
        {
          title: "Worklist du Jour",
          url: "#",
          key: "prelevement-worklist",
          icon: ClipboardList,
        },
        {
          title: "Dossiers en Analyse",
          url: "#",
          key: "prelevement-analysis",
          icon: TestTube,
        },
        {
          title: "Résultats à Valider",
          url: "#",
          key: "prelevement-results",
          icon: CheckCircle,
        },
      ],
    },
    {
      title: "Logistique & Stocks",
      url: "#",
      icon: Package,
      key: "logistique",
      items: [],
    },
    {
      title: "Biologiste",
      url: "#",
      icon: FlaskConical,
      items: [
        {
          title: "Dossiers à Valider",
          url: "#",
          key: "biologiste-validation",
          icon: CheckCircle,
        },
        {
          title: "Rapports",
          url: "#",
          key: "biologiste-reports",
          icon: FileText,
        },
        {
          title: "Calendrier",
          url: "#",
          key: "biologiste-calendar",
          icon: Calendar,
        },
        {
          title: "Interprétation des Résultats",
          url: "#",
          key: "biologiste-interpretation",
          icon: BarChart3,
        },
      ],
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: string
  onViewChange: (view: string) => void
}

export function AppSidebar({ activeView, onViewChange, ...props }: AppSidebarProps) {
  // Déterminer quel groupe est actif basé sur activeView
  const getActiveGroup = (activeView: string) => {
    if (activeView.startsWith("accueil")) return "Accueil & Secrétariat"
    if (activeView.startsWith("prelevement")) return "Prélèvement"
    if (activeView === "logistique") return "Logistique & Stocks"
    if (activeView.startsWith("biologiste")) return "Biologiste"
    return "Accueil & Secrétariat"
  }

  const activeGroup = getActiveGroup(activeView)

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
                    <AvatarImage src="/78524.png?height=32&width=32" alt="LMD" />
                    <AvatarFallback>LMD</AvatarFallback>
                  </Avatar>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-lg text-gray-900 truncate">LMD</h2>
            <p className="text-xs text-gray-500 text-center">Laboratoire D'analyse Médical DABE</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <ScrollArea className="h-full px-3 py-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {navigationData.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.items && item.items.length > 0 ? (
                      <Collapsible defaultOpen={activeGroup === item.title} className="group/collapsible">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className="w-full justify-between hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            onClick={() => {
                              // Si l'item a une clé directe, naviguer vers elle
                              if (item.key) {
                                onViewChange(item.key)
                              } else if (item.items && item.items.length > 0) {
                                // Sinon, naviguer vers le premier sous-item
                                onViewChange(item.items[0].key)
                              }
                            }}
                          >
                            <div className="flex items-center">
                              <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                              <span className="truncate">{item.title}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                          <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={activeView === subItem.key}
                                  className="w-full justify-start pl-6 py-2 h-auto min-h-[36px]"
                                >
                                  <button
                                    onClick={() => onViewChange(subItem.key)}
                                    className="flex items-center w-full text-left"
                                  >
                                    {subItem.icon && <subItem.icon className="h-4 w-4 mr-3 flex-shrink-0" />}
                                    <span className="truncate text-sm">{subItem.title}</span>
                                  </button>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={activeView === item.key}
                        className="w-full justify-start py-2 h-auto min-h-[40px]"
                      >
                        <button
                          onClick={() => item.key && onViewChange(item.key)}
                          className="flex items-center w-full text-left"
                        >
                          <item.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
