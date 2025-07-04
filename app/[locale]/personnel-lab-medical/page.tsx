"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

// Import des composants de l'application
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { AccueilDashboard } from "@/components/accueil/dashboard"
import { AccueilPatients } from "@/components/accueil/patients"
import { AccueilHistory } from "@/components/accueil/history"
import { AccueilPaiement } from "@/components/accueil/paiement"
import { AccueilFacture } from "@/components/accueil/facture"
import { AccueilEncaissement } from "@/components/accueil/encaissement"
import { AccueilRapportCaisse } from "@/components/accueil/rapport-caisse"
import { PrelevementBox } from "@/components/prelevement/box"
import NouveauPrelevementPage from "@/components/prelevement/prelevement-nouveau"
import HistoriquePrelevementPage from "@/components/prelevement/prelevement-historique"
import Worklist from "@/components/prelevement/worklist"
import DossiersEnAnalysePage from "@/components/prelevement/dossiers-analyse"
import ResultatsAValiderPage from "@/components/prelevement/resultats-a-valider"
import { LogistiqueDashboard } from "@/components/logistique/dashboard"
import { BiologisteValidation } from "@/components/biologiste/validation"
import RapportsPage from "@/components/biologiste/rapports-finalises"
import CalendrierPage from "@/components/biologiste/calendrier"
import InterpretationPage from "@/components/biologiste/interpretation-resultats"

export default function LISDashboard() {
  const [activeView, setActiveView] = useState("accueil-dashboard")
  const { t, locale } = useLanguage();

  const renderActiveView = () => {
    switch (activeView) {
      case "accueil-dashboard": return <AccueilDashboard />
      case "accueil-patients": return <AccueilPatients />
      case "accueil-history": return <AccueilHistory />
      case "accueil-paiement": return <AccueilPaiement />
      case "accueil-facture": return <AccueilFacture />
      case "accueil-encaissement": return <AccueilEncaissement />
      case "accueil-rapport-caisse": return <AccueilRapportCaisse />
      
      case "prelevement-box": return <PrelevementBox />
      case "prelevement-patients": return <NouveauPrelevementPage />
      case "prelevement-history": return <HistoriquePrelevementPage />
      case "prelevement-worklist": return <Worklist />
      case "prelevement-analysis": return <DossiersEnAnalysePage />
      case "prelevement-results": return <ResultatsAValiderPage />
      
      case "logistique": return <LogistiqueDashboard />
      
      case "biologiste-validation": return <BiologisteValidation />
      case "biologiste-reports": return <RapportsPage />
      case "biologiste-calendar": return <CalendrierPage />
      case "biologiste-interpretation": return <InterpretationPage />
      
      default: return <AccueilDashboard />
    }
  }

  const getPageTitle = () => {
    const titles: { [key: string]: string } = {
      "accueil-dashboard": t('PersonnelSidebar.accueil.dashboard'),
      "accueil-patients": t('PersonnelSidebar.accueil.patients'),
      "accueil-history": t('PersonnelSidebar.accueil.actionHistory'),
      "accueil-paiement": t('PersonnelSidebar.accueil.payment'),
      "accueil-facture": t('PersonnelSidebar.accueil.invoice'),
      "accueil-encaissement": t('PersonnelSidebar.accueil.cashing'),
      "accueil-rapport-caisse": t('PersonnelSidebar.accueil.cashReport'),
      "prelevement-box": t('PersonnelSidebar.prelevement.box'),
      "prelevement-patients": t('PersonnelSidebar.prelevement.patients'),
      "prelevement-history": t('PersonnelSidebar.prelevement.actionHistory'),
      "prelevement-worklist": t('PersonnelSidebar.prelevement.dailyWorklist'),
      "prelevement-analysis": t('PersonnelSidebar.prelevement.analysisFolders'),
      "prelevement-results": t('PersonnelSidebar.prelevement.resultsToValidate'),
      "logistique": t('PersonnelSidebar.logisticsAndStock'),
      "biologiste-validation": t('PersonnelSidebar.biologiste.foldersToValidate'),
      "biologiste-reports": t('PersonnelSidebar.biologiste.reports'),
      "biologiste-calendar": t('PersonnelSidebar.biologiste.calendar'),
      "biologiste-interpretation": t('PersonnelSidebar.biologiste.resultsInterpretation'),
    };
    return titles[activeView] || t('PersonnelDashboard.dashboard');
  }

  const getBreadcrumb = () => {
    if (activeView.startsWith("accueil")) return t('PersonnelSidebar.accueil.title');
    if (activeView.startsWith("prelevement")) return t('PersonnelSidebar.prelevement.title');
    if (activeView === "logistique") return t('PersonnelSidebar.logisticsAndStock');
    if (activeView.startsWith("biologiste")) return t('PersonnelSidebar.biologiste.title');
    return t('PersonnelDashboard.dashboard');
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          activeView={activeView}
          onViewChange={setActiveView}
          side={locale === 'ar' ? 'right' : 'left'}
        />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          {activeView !== "prelevement-box" && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ms-1" />
              <Separator orientation="vertical" className="me-2 h-4" />
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-gray-500">
                  {getBreadcrumb()} / {getPageTitle()}
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="text-sm text-gray-600">{t('PersonnelDashboard.user')}</span>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <LanguageSwitcher />
                </div>
              </div>
            </header>
          )}
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900/50">{renderActiveView()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}