"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// 1. Importer l'icône "Info" et les composants du Tooltip
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Patient {
  id: string
  status: string
  time?: string
  box?: string
}

interface PatientFlowSidebarProps {
  patients: Patient[]
  onPatientSelect: (patient: Patient) => void
}

export function PatientFlowSidebar({ patients, onPatientSelect }: PatientFlowSidebarProps) {
  return (
    // 2. Envelopper le composant avec TooltipProvider
    <TooltipProvider>
      <div className="w-80 bg-white border-l flex flex-col">
        <div className="p-4 border-b flex-shrink-0">
          {/* 3. Modifier la structure du titre pour inclure l'icône */}
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Vue du Flux en Direct</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Cette barre latérale affiche en temps réel le statut des patients dans la file d'attente, du paiement au prélèvement.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-orange-700 mb-3 text-sm uppercase tracking-wide">
                EN ATTENTE PAIEMENT
              </h4>
              <div className="space-y-2">
                {patients
                  .filter((p) => p.status === "payment")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                      onClick={() => onPatientSelect(patient)}
                    >
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-medium">
                        {patient.id}
                      </Badge>
                      <span className="text-sm text-orange-600 font-medium">{patient.time}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-blue-700 mb-3 text-sm uppercase tracking-wide">
                EN ATTENTE PRÉLÈVEMENT
              </h4>
              <div className="space-y-2">
                {patients
                  .filter((p) => p.status === "collection")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                        {patient.id}
                      </Badge>
                      <span className="text-sm text-blue-600 font-medium">{patient.time}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-green-700 mb-3 text-sm uppercase tracking-wide">
                EN COURS DE PRÉLÈVEMENT
              </h4>
              <div className="space-y-2">
                {patients
                  .filter((p) => p.status === "active")
                  .map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                    >
                      <Badge variant="secondary" className="bg-green-100 text-green-800 font-medium">
                        {patient.id}
                      </Badge>
                      <span className="text-sm text-green-600 font-medium">{patient.box}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  )
}