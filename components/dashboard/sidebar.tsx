"use client"

import {
  BarChart3,
  DollarSign,
  TrendingUp,
  Wallet,
  Settings,
  Home,
  PieChart,
  CreditCard,
  Users,
  FileText,
  Package,
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
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  {
    id: "overview",
    title: "Vue d'Ensemble",
    icon: Home,
    subItems: [],
  },
  {
    id: "sales",
    title: "CA & Ventes",
    icon: TrendingUp,
    subItems: [
      { id: "sales-performance", title: "Performance des Analyses", icon: BarChart3 },
      { id: "sales-channels", title: "Canaux de Paiement", icon: CreditCard },
    ],
  },
  {
    id: "treasury",
    title: "Trésorerie & Créances",
    icon: Wallet,
    subItems: [
      { id: "treasury-receivables", title: "Suivi des Créances", icon: Users },
      { id: "treasury-cashflow", title: "Flux de Trésorerie", icon: DollarSign },
    ],
  },
  {
    id: "costs",
    title: "Coûts & Rentabilité",
    icon: PieChart,
    subItems: [
      { id: "costs-suppliers", title: "Dépenses Fournisseurs", icon: Package },
      { id: "costs-inventory", title: "Gestion du Stock", icon: Package },
    ],
  },
  {
    id: "settings",
    title: "Paramètres & Rapports",
    icon: Settings,
    subItems: [
      { id: "settings-financial", title: "Paramètres Financiers", icon: Settings },
      { id: "settings-reports", title: "Générateur de Rapports", icon: FileText },
    ],
  },
]

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  return (
    <Sidebar className="border-r">
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

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    {item.subItems.length > 0 ? (
                      <Collapsible defaultOpen={activeTab.startsWith(item.id)}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={activeTab.startsWith(item.id)}
                            className="w-full justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton
                                  isActive={activeTab === subItem.id}
                                  onClick={() => onTabChange(subItem.id)}
                                  className="cursor-pointer"
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton isActive={activeTab === item.id} onClick={() => onTabChange(item.id)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
