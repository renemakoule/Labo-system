//components/accueil/dashboard.tsx
"use client"

import { useState } from "react"
// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context"; // UTILISER NOTRE HOOK
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Search, Info } from "lucide-react"
import { PatientRegistration } from "./patient-registration"
import { PatientFlowSidebar } from "./patient-flow-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// Le composant AccueilPaiement n'est pas utilisé ici, je le retire des imports.
// import { AccueilPaiement } from "./paiement" 

const mockPatients = [
  { id: "A-140", status: "payment", time: "10 min" },
  { id: "A-141", status: "payment", time: "8 min" },
  { id: "A-137", status: "collection", time: "2 min" },
  { id: "A-138", status: "collection", time: "5 min" },
  { id: "A-135", status: "active", box: "Box 1" },
]

export function AccueilDashboard() {
  const [activeMainView, setActiveMainView] = useState("dashboard")
  // CORRECTION : Remplacer useTranslations par notre hook
  const { t } = useLanguage();

  const handleNewPatientRegistration = () => {
    setActiveMainView("registration")
  }
  
  const handlePatientSelect = (patient: any) => {
    // La logique pour la sélection de patient reste la même
    console.log("Patient sélectionné:", patient)
  }

  const renderMainContent = () => {
    // CORRECTION : La logique de rendu est simplifiée
    // La vue de paiement était gérée par un autre état qui a été retiré, donc on simplifie.
    if (activeMainView === "registration") {
      return <PatientRegistration onBack={() => setActiveMainView("dashboard")} />
    }

    return (
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              {/* CORRECTION : Utiliser les clés de traduction correctes */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('AccueilDashboard.title')}</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  {/* Un bouton est sémantiquement plus correct pour un trigger de tooltip interactif */}
                  <button className="p-1 rounded-full">
                    <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{t('AccueilDashboard.info')}</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('AccueilDashboard.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-green-200 hover:border-green-300" onClick={handleNewPatientRegistration}>
              <CardContent className="flex items-center p-6">
                <div className="bg-green-100 p-3 rounded-full me-4 flex-shrink-0"><UserPlus className="h-8 w-8 text-green-600" /></div>
                <div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{t('AccueilDashboard.registerPatientTitle')}</h3><p className="text-gray-600 dark:text-gray-400 text-sm">{t('AccueilDashboard.registerPatientDescription')}</p></div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-200 hover:border-blue-300">
              <CardContent className="flex items-center p-6">
                <div className="bg-blue-100 p-3 rounded-full me-4 flex-shrink-0"><Search className="h-8 w-8 text-blue-600" /></div>
                <div><h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{t('AccueilDashboard.searchPatientTitle')}</h3><p className="text-gray-600 dark:text-gray-400 text-sm">{t('AccueilDashboard.searchPatientDescription')}</p></div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilDashboard.kpiPatientsToday')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">24</div><p className="text-xs text-muted-foreground">{t('AccueilDashboard.kpiPatientsTodayDescription')}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilDashboard.kpiWaiting')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">5</div><p className="text-xs text-muted-foreground">{t('AccueilDashboard.kpiWaitingDescription')}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilDashboard.kpiRevenue')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">2,450,000 FCFA</div><p className="text-xs text-muted-foreground">{t('AccueilDashboard.kpiRevenueDescription')}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilDashboard.kpiAvgTime')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">8 min</div><p className="text-xs text-muted-foreground">{t('AccueilDashboard.kpiAvgTimeDescription')}</p></CardContent></Card>
          </div>
        </div>
      </ScrollArea>
    )
  }

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1">
          {renderMainContent()}
        </div>
        <PatientFlowSidebar patients={mockPatients} onPatientSelect={handlePatientSelect} />
      </div>
    </TooltipProvider>
  )
}