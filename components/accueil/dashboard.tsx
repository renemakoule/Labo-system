"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Search, Info } from "lucide-react"
import { PatientRegistration } from "./patient-registration"
import { PatientFlowSidebar } from "./patient-flow-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AccueilPaiement } from "./paiement" // Importer la nouvelle vue de paiement

const mockPatients = [
  { id: "A-140", status: "payment", time: "10 min" },
  { id: "A-141", status: "payment", time: "8 min" },
  { id: "A-137", status: "collection", time: "2 min" },
  { id: "A-138", status: "collection", time: "5 min" },
  { id: "A-135", status: "active", box: "Box 1" },
]

export function AccueilDashboard() {
  const [activeMainView, setActiveMainView] = useState("dashboard") // 'dashboard' ou 'registration'
  const [selectedPatientForPayment, setSelectedPatientForPayment] = useState(null)

  const handleNewPatientRegistration = () => {
    setActiveMainView("registration")
    setSelectedPatientForPayment(null)
  }

  const handlePatientSelect = (patient: any) => {
    // Cette fonction pourrait maintenant lancer le flux de paiement
    // Pour l'instant, laissons-la pour la sélection visuelle
    console.log("Patient sélectionné:", patient)
  }

  const renderMainContent = () => {
    switch (activeMainView) {
      case "registration":
        return <PatientRegistration onBack={() => setActiveMainView("dashboard")} />
      case "dashboard":
      default:
        return (
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Accueil</h1>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Vue d'ensemble du flux des patients et accès aux fonctions clés de l'accueil.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-gray-600">Gestion des patients et flux d'entrée</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow border-green-200 hover:border-green-300"
                  onClick={handleNewPatientRegistration}
                >
                  <CardContent className="flex items-center p-6">
                    <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <UserPlus className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Enregistrer Nouveau Patient</h3>
                      <p className="text-gray-600 text-sm">Créer un nouveau dossier patient avec scan CIN.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-200 hover:border-blue-300">
                  <CardContent className="flex items-center p-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Search className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Rechercher Dossier Patient</h3>
                      <p className="text-gray-600 text-sm">Consulter un dossier existant.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Patients du Jour</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold">24</div><p className="text-xs text-muted-foreground">+2 depuis hier</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">En Attente</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold">5</div><p className="text-xs text-muted-foreground">Paiement & Prélèvement</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold">2,450,000 FCFA</div><p className="text-xs text-muted-foreground">+12% vs hier</p></CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Temps Moyen</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold">8 min</div><p className="text-xs text-muted-foreground">Par patient</p></CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        )
    }
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