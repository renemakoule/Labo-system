"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// 1. Importer l'icône "Info" et les composants du Tooltip
import { Search, Eye, Edit, FileText, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mockPatients = [
  {
    id: "A-140",
    name: "MARIE DUBOIS",
    cin: "BK123456",
    phone: "0612345678",
    lastVisit: "15/01/2024",
    status: "active",
  },
  {
    id: "A-141",
    name: "JEAN MARTIN",
    cin: "AB789012",
    phone: "0687654321",
    lastVisit: "14/01/2024",
    status: "completed",
  },
  {
    id: "A-137",
    name: "AMINA BENALI",
    cin: "FK345678",
    phone: "0698765432",
    lastVisit: "13/01/2024",
    status: "pending",
  },
]

export function AccueilPatients() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    // 2. Envelopper le composant avec TooltipProvider
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            {/* 3. Modifier la structure du titre pour inclure l'icône */}
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Patients</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Cette page vous permet de rechercher des dossiers patients existants par nom, CIN ou ID, et de consulter leurs informations.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Recherche et consultation des dossiers patients</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recherche Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom, CIN ou ID patient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liste des Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">Patient {patient.id}</h3>
                        <p className="text-sm text-gray-600 truncate">CIN: {patient.cin}</p>
                        <p className="text-sm text-gray-600 truncate">Tél: {patient.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Dernière visite</p>
                        <p className="font-medium">{patient.lastVisit}</p>
                      </div>
                      <Badge
                        variant={
                          patient.status === "active"
                            ? "default"
                            : patient.status === "completed"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {patient.status === "active"
                          ? "Actif"
                          : patient.status === "completed"
                            ? "Terminé"
                            : "En attente"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}