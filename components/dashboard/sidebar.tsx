"use client"

import { useLanguage } from "@/context/language-context"; // Importez votre hook de langue
import { BarChart3, DollarSign, TrendingUp, Wallet, Settings, Home, PieChart, CreditCard, Users, FileText, Package } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  const { t, locale } = useLanguage(); // Obtenez la fonction de traduction et la locale

  // Déterminez la position de la sidebar en fonction de la locale
  const sidebarSide = locale === 'ar' ? 'right' : 'left';

  const menuItems = [
    { id: "overview", title: t('CFOSidebar.overview'), icon: Home, subItems: [] },
    {
      id: "sales", title: t('CFOSidebar.sales'), icon: TrendingUp,
      subItems: [
        { id: "sales-performance", title: t('CFOSidebar.salesPerformance'), icon: BarChart3 },
        { id: "sales-channels", title: t('CFOSidebar.salesChannels'), icon: CreditCard },
      ],
    },
    {
      id: "treasury", title: t('CFOSidebar.treasury'), icon: Wallet,
      subItems: [
        { id: "treasury-receivables", title: t('CFOSidebar.receivablesTracking'), icon: Users },
        { id: "treasury-cashflow", title: t('CFOSidebar.cashflow'), icon: DollarSign },
      ],
    },
    {
      id: "costs", title: t('CFOSidebar.costs'), icon: PieChart,
      subItems: [
        { id: "costs-suppliers", title: t('CFOSidebar.supplierExpenses'), icon: Package },
        { id: "costs-inventory", title: t('CFOSidebar.inventoryManagement'), icon: Package },
      ],
    },
    {
      id: "settings", title: t('CFOSidebar.settings'), icon: Settings,
      subItems: [
        { id: "settings-financial", title: t('CFOSidebar.financialSettings'), icon: Settings },
        { id: "settings-reports", title: t('CFOSidebar.reportGenerator'), icon: FileText },
      ],
    },
  ];

  return (
    // Passez la prop 'side' au composant Sidebar
    <Sidebar className="border-e" side={sidebarSide}> {/* Utilisez 'border-e' pour border-end (compatible RTL) */}
      <SidebarHeader className="p-4 border-b">
        {/* Utilisez 'space-x-3 rtl:space-x-reverse' pour que l'espacement s'inverse en RTL */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/78524.png?height=32&width=32" alt="LMD" />
              <AvatarFallback>LMD</AvatarFallback>
            </Avatar>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-lg text-gray-900 truncate dark:text-gray-100">LMD</h2>
            {/* Traduire le texte du laboratoire */}
            <p className="text-xs text-gray-500 text-center dark:text-gray-400">{t('CFOSidebar.labNameFull')}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            {/* Traduire le label de groupe */}
            <SidebarGroupLabel>{t('CFOSidebar.navigation')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    {item.subItems.length > 0 ? (
                      <Collapsible defaultOpen={activeTab.startsWith(item.id)}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={activeTab.startsWith(item.id)} className="w-full justify-between cursor-pointer">
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
                                <SidebarMenuSubButton isActive={activeTab === subItem.id} onClick={() => onTabChange(subItem.id)} className="cursor-pointer">
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