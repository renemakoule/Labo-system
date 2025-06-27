"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// 1. Importer l'icône "Info"
import { UserPlus, Search, Info } from "lucide-react"
import { PatientRegistration } from "./patient-registration"
import { PatientFlowSidebar } from "./patient-flow-sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
// 2. Importer les composants pour l'infobulle (Tooltip)
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Modifier le mockPatients pour utiliser des identifiants anonymes :
const mockPatients = [
  { id: "A-140", status: "payment", time: "10 min", amount: 145.5 },
  { id: "A-141", status: "payment", time: "8 min", amount: 89.0 },
  { id: "A-137", status: "collection", time: "2 min", tests: ["Hématologie", "Biochimie"] },
  { id: "A-138", status: "collection", time: "5 min", tests: ["Hormonologie"] },
  {
    id: "A-135",
    status: "active",
    box: "Box 1",
    tests: ["Hématologie", "Biochimie", "Sérologie"],
  },
]

export function AccueilDashboard() {
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)

  const handleNewPatientRegistration = () => {
    setShowRegistration(true)
    setSelectedPatient(null)
  }

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
    setShowRegistration(true)
  }

  if (showRegistration) {
    return (
      <PatientRegistration
        selectedPatient={selectedPatient}
        onBack={() => {
          setShowRegistration(false)
          setSelectedPatient(null)
        }}
      />
    )
  }

  return (
    // Le TooltipProvider est nécessaire pour que les infobulles fonctionnent
    <TooltipProvider>
      <div className="flex h-full">
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <div className="mb-8">
                {/* 3. Modification du titre pour inclure l'icône */}
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Accueil</h1>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {/* L'icône Info qui déclenche l'infobulle */}
                      <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {/* Le message d'explication qui s'affiche au survol */}
                      <p className="max-w-xs">
                        Cette page vous permet de gérer le flux des patients : enregistrer de nouveaux arrivants, rechercher des dossiers existants et suivre les statistiques clés de la journée.
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
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Enregistrer Nouveau Patient</h3>
                      <p className="text-gray-600 text-sm">Créer un nouveau dossier patient avec scan CIN</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-200 hover:border-blue-300">
                  <CardContent className="flex items-center p-6">
                    <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Search className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Rechercher Dossier Patient</h3>
                      <p className="text-gray-600 text-sm">Consulter un dossier existant</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Statistiques du jour */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Patients du Jour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">+2 depuis hier</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">En Attente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">Paiement & Prélèvement</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,450 DH</div>
                    <p className="text-xs text-muted-foreground">+12% vs hier</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8 min</div>
                    <p className="text-xs text-muted-foreground">Par patient</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>

        <PatientFlowSidebar patients={mockPatients} onPatientSelect={handlePatientSelect} />
      </div>
    </TooltipProvider>
  )
}