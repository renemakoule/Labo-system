"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { AccueilDashboard } from "@/components/accueil/dashboard"
import { AccueilPatients } from "@/components/accueil/patients"
import { AccueilHistory } from "@/components/accueil/history"
import { PrelevementBox } from "@/components/prelevement/box"
import { LogistiqueDashboard } from "@/components/logistique/dashboard"
import { BiologisteValidation } from "@/components/biologiste/validation"
import { AccueilPaiement } from "@/components/accueil/paiement"
import { AccueilFacture } from "@/components/accueil/facture"
import { AccueilEncaissement } from "@/components/accueil/encaissement"
import { AccueilRapportCaisse } from "@/components/accueil/rapport-caisse"
import Worklist from "@/components/prelevement/worklist"
import RapportsPage from "@/components/biologiste/rapports-finalises"
import InterpretationPage from "@/components/biologiste/interpretation-resultats"
import ResultatsAValiderPage from "@/components/prelevement/resultats-a-valider"
import DossiersEnAnalysePage from "@/components/prelevement/dossiers-analyse"
import HistoriquePrelevementPage from "@/components/prelevement/prelevement-historique"
import NouveauPrelevementPage from "@/components/prelevement/prelevement-nouveau"
import CalendrierPage from "@/components/biologiste/calendrier"

export default function LISDashboard() {
  const [activeView, setActiveView] = useState("accueil-dashboard")

  const renderActiveView = () => {
    switch (activeView) {
      case "accueil-dashboard":
        return <AccueilDashboard />
      case "accueil-patients":
        return <AccueilPatients />
      case "accueil-history":
        return <AccueilHistory />
      case "accueil-paiement":
        return <AccueilPaiement />
      case "accueil-facture":
        return <AccueilFacture />
      case "accueil-encaissement":
        return <AccueilEncaissement />
      case "accueil-rapport-caisse":
        return <AccueilRapportCaisse />
      case "prelevement-box":
        return <PrelevementBox />
      case "prelevement-patients":
        return <NouveauPrelevementPage />
      case "prelevement-history":
        return <HistoriquePrelevementPage />
      case "prelevement-worklist":
        return <Worklist />
      case "prelevement-analysis":
        return <DossiersEnAnalysePage />
      case "prelevement-results":
        return <ResultatsAValiderPage />
      case "logistique":
        return <LogistiqueDashboard />
      case "biologiste-validation":
        return <BiologisteValidation />
      case "biologiste-reports":
        return <RapportsPage />
      case "biologiste-calendar":
        return <CalendrierPage />
      case "biologiste-interpretation":
        return <InterpretationPage />
      default:
        return <AccueilDashboard />
    }
  }

  const getPageTitle = () => {
    const titles = {
      "accueil-dashboard": "Tableau de Bord",
      "accueil-patients": "Patients",
      "accueil-history": "Historique",
      "accueil-paiement": "Paiement",
      "accueil-facture": "Facture",
      "accueil-encaissement": "Encaissement",
      "accueil-rapport-caisse": "Rapport de Caisse",
      "prelevement-box": "Box de Prélèvement",
      "prelevement-patients": "Patients",
      "prelevement-history": "Historique",
      "prelevement-worklist": "Worklist",
      "prelevement-analysis": "Analyse",
      "prelevement-results": "Résultats",
      logistique: "Logistique & Stocks",
      "biologiste-validation": "Validation",
      "biologiste-reports": "Rapports",
      "biologiste-calendar": "Calendrier",
      "biologiste-interpretation": "Interprétation",
    }
    return titles[activeView] || "Dashboard"
  }

  const getBreadcrumb = () => {
    if (activeView.startsWith("accueil")) return "Accueil & Secrétariat"
    if (activeView.startsWith("prelevement")) return "Prélèvement"
    if (activeView === "logistique") return "Logistique & Stocks"
    if (activeView.startsWith("biologiste")) return "Biologiste"
    return "Dashboard"
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          {activeView !== "prelevement-box" && (
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-gray-500">
                  {getBreadcrumb()} / {getPageTitle()}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Dr. BENNANI</span>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </div>
            </header>
          )}
          <main className="flex-1 overflow-auto">{renderActiveView()}</main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
