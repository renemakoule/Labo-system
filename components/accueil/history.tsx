"use client"

import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Search, Download, Filter, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockHistory = [
  { id: "ACT-001", timestamp: "15/01/2024 14:30", user: "AICHA BENALI", actionKey: "action_registerPatient", patient: "Patient A-140", details: "Nouveau patient enregistré avec scan CIN", status: "success", },
  { id: "ACT-002", timestamp: "15/01/2024 14:25", user: "FATIMA ALAMI", actionKey: "action_paymentValidated", patient: "Patient A-141", details: "Paiement par carte - 145.50 DH", status: "success", },
  { id: "ACT-003", timestamp: "15/01/2024 14:20", user: "AICHA BENALI", actionKey: "action_editRecord", patient: "Patient A-137", details: "Mise à jour numéro de téléphone", status: "info", },
  { id: "ACT-004", timestamp: "15/01/2024 14:15", user: "SYSTEM", actionKey: "action_paymentError", patient: "Patient A-138", details: "Échec transaction carte bancaire", status: "error", },
]

export function AccueilHistory() {
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('AccueilHistory.pageTitle')}</h1>
              <Tooltip>
                <TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{t('AccueilHistory.pageInfo')}</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('AccueilHistory.pageDescription')}</p>
          </div>

          <Card className="mb-6">
            <CardHeader><CardTitle>{t('AccueilHistory.filtersTitle')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder={t('AccueilHistory.searchPlaceholder')} className="ps-10" />
                </div>
                <div className="relative">
                  <Calendar className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input type="date" className="ps-10" />
                </div>
                <Button variant="outline"><Filter className="h-4 w-4 me-2" />{t('AccueilHistory.filterButton')}</Button>
                <Button variant="outline"><Download className="h-4 w-4 me-2" />{t('AccueilHistory.exportButton')}</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>{t('AccueilHistory.activityLogTitle')}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHistory.map((entry) => (
                  <div key={entry.id} className="flex items-start space-x-4 rtl:space-x-reverse p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <Badge variant={entry.status === "success" ? "default" : entry.status === "error" ? "destructive" : "secondary"} className="w-2 h-2 p-0 rounded-full"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{t(`AccueilHistory.${entry.actionKey}`)}</h3>
                        <span className="text-sm text-gray-500 flex-shrink-0 ms-2">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">{entry.patient}</p>
                      <p className="text-sm text-gray-500 mb-2">{entry.details}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{t('AccueilHistory.by')}: {entry.user}</span>
                        <span className="text-xs text-gray-400">ID: {entry.id}</span>
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