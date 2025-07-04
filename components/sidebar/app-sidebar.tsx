"use client"

import type * as React from "react"
import { useLanguage } from "@/context/language-context"
import {
  FlaskConical, Home, Syringe, Package, Calendar, FileText, BarChart3, Users, History, Box, TestTube, CheckCircle, ClipboardList, ChevronDown, CreditCard, Calculator, Banknote,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeView: string
  onViewChange: (view: string) => void
  side?: 'left' | 'right'
}

export function AppSidebar({ activeView, onViewChange, side = 'left', ...props }: AppSidebarProps) {
  const { t } = useLanguage();

  const navigationData = {
    navMain: [
      {
        title: t('PersonnelSidebar.accueil.title'), icon: Home,
        items: [
          { title: t('PersonnelSidebar.accueil.dashboard'), key: "accueil-dashboard", icon: BarChart3 },
          { title: t('PersonnelSidebar.accueil.patients'), key: "accueil-patients", icon: Users },
          { title: t('PersonnelSidebar.accueil.payment'), key: "accueil-paiement", icon: CreditCard },
          { title: t('PersonnelSidebar.accueil.invoice'), key: "accueil-facture", icon: FileText },
          { title: t('PersonnelSidebar.accueil.cashing'), key: "accueil-encaissement", icon: Banknote },
          { title: t('PersonnelSidebar.accueil.cashReport'), key: "accueil-rapport-caisse", icon: Calculator },
          { title: t('PersonnelSidebar.accueil.actionHistory'), key: "accueil-history", icon: History },
        ],
      },
      {
        title: t('PersonnelSidebar.prelevement.title'), icon: Syringe,
        items: [
          { title: t('PersonnelSidebar.prelevement.box'), key: "prelevement-box", icon: Box },
          { title: t('PersonnelSidebar.prelevement.patients'), key: "prelevement-patients", icon: Users },
          { title: t('PersonnelSidebar.prelevement.actionHistory'), key: "prelevement-history", icon: History },
          { title: t('PersonnelSidebar.prelevement.dailyWorklist'), key: "prelevement-worklist", icon: ClipboardList },
          { title: t('PersonnelSidebar.prelevement.analysisFolders'), key: "prelevement-analysis", icon: TestTube },
          { title: t('PersonnelSidebar.prelevement.resultsToValidate'), key: "prelevement-results", icon: CheckCircle },
        ],
      },
      { title: t('PersonnelSidebar.logisticsAndStock'), icon: Package, key: "logistique", items: [] },
      {
        title: t('PersonnelSidebar.biologiste.title'), icon: FlaskConical,
        items: [
          { title: t('PersonnelSidebar.biologiste.foldersToValidate'), key: "biologiste-validation", icon: CheckCircle },
          { title: t('PersonnelSidebar.biologiste.reports'), key: "biologiste-reports", icon: FileText },
          { title: t('PersonnelSidebar.biologiste.calendar'), key: "biologiste-calendar", icon: Calendar },
          { title: t('PersonnelSidebar.biologiste.resultsInterpretation'), key: "biologiste-interpretation", icon: BarChart3 },
        ],
      },
    ],
  }

  const getActiveGroup = (activeView: string) => {
    if (activeView.startsWith("accueil")) return t('PersonnelSidebar.accueil.title')
    if (activeView.startsWith("prelevement")) return t('PersonnelSidebar.prelevement.title')
    if (activeView === "logistique") return t('PersonnelSidebar.logisticsAndStock')
    if (activeView.startsWith("biologiste")) return t('PersonnelSidebar.biologiste.title')
    return t('PersonnelSidebar.accueil.title')
  }

  const activeGroup = getActiveGroup(activeView)

  return (
    <Sidebar {...props} side={side}>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/78524.png?height=32&width=32" alt="LMD" />
              <AvatarFallback>LMD</AvatarFallback>
            </Avatar>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-lg text-gray-900 truncate dark:text-gray-100">LMD</h2>
            <p className="text-xs text-gray-500 text-center dark:text-gray-400">{t('CFOSidebar.labNameFull')}</p>
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
                              if (item.key) onViewChange(item.key)
                              else if (item.items && item.items.length > 0) onViewChange(item.items[0].key)
                            }}
                          >
                            <div className="flex items-center">
                              <item.icon className="h-4 w-4 me-3 flex-shrink-0" />
                              <span className="truncate">{item.title}</span>
                            </div>
                            <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                          <SidebarMenuSub className="ms-4 mt-1 space-y-1">
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.key}>
                                <SidebarMenuSubButton
                                  asChild isActive={activeView === subItem.key}
                                  className="w-full justify-start ps-6 py-2 h-auto min-h-[36px]"
                                >
                                  <button onClick={() => onViewChange(subItem.key)} className="flex items-center w-full text-start">
                                    {subItem.icon && <subItem.icon className="h-4 w-4 me-3 flex-shrink-0" />}
                                    <span className="truncate text-sm">{subItem.title}</span>
                                  </button>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton asChild isActive={activeView === item.key} className="w-full justify-start py-2 h-auto min-h-[40px]">
                        <button onClick={() => item.key && onViewChange(item.key)} className="flex items-center w-full text-start">
                          <item.icon className="h-4 w-4 me-3 flex-shrink-0" />
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