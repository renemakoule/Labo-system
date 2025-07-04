//components/accueil/patient-flow-sidebar.tsx
"use client"

// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context"; // UTILISER NOTRE HOOK
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  // CORRECTION : Remplacer useTranslations par notre hook
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <div className="w-80 bg-white border-s flex flex-col dark:bg-gray-900 dark:border-gray-700">
        <div className="p-4 border-b flex-shrink-0 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {/* CORRECTION : Utiliser les clés de traduction correctes */}
            <h3 className="text-lg font-semibold dark:text-gray-100">{t('PatientFlowSidebar.title')}</h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 rounded-full">
                  <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent><p className="max-w-xs">{t('PatientFlowSidebar.info')}</p></TooltipContent>
            </Tooltip>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-orange-700 mb-3 text-sm uppercase tracking-wide">{t('PatientFlowSidebar.waitingPayment')}</h4>
              <div className="space-y-2">
                {patients.filter((p) => p.status === "payment").map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 dark:bg-orange-900/50 dark:hover:bg-orange-900" onClick={() => onPatientSelect(patient)}>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-medium dark:bg-orange-800 dark:text-orange-100">{patient.id}</Badge>
                    <span className="text-sm text-orange-600 font-medium dark:text-orange-300">{patient.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-blue-700 mb-3 text-sm uppercase tracking-wide">{t('PatientFlowSidebar.waitingCollection')}</h4>
              <div className="space-y-2">
                {patients.filter((p) => p.status === "collection").map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900" onClick={() => onPatientSelect(patient)}>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium dark:bg-blue-800 dark:text-blue-100">{patient.id}</Badge>
                    <span className="text-sm text-blue-600 font-medium dark:text-blue-300">{patient.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-green-700 mb-3 text-sm uppercase tracking-wide">{t('PatientFlowSidebar.inCollection')}</h4>
              <div className="space-y-2">
                {patients.filter((p) => p.status === "active").map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900" onClick={() => onPatientSelect(patient)}>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 font-medium dark:bg-green-800 dark:text-green-100">{patient.id}</Badge>
                    <span className="text-sm text-green-600 font-medium dark:text-green-300">{patient.box}</span>
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