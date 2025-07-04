"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Eye, Edit, FileText, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockPatients = [
  { id: "A-140", cin: "BK123456", phone: "0612345678", lastVisit: "15/01/2024", status: "active" },
  { id: "A-141", cin: "AB789012", phone: "0687654321", lastVisit: "14/01/2024", status: "completed" },
  { id: "A-137", cin: "FK345678", phone: "0698765432", lastVisit: "13/01/2024", status: "pending" },
]

export function AccueilPatients() {
  const [searchTerm, setSearchTerm] = useState("")
  const { t } = useLanguage();

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusLabel = (status: string) => {
    const key = `AccueilPatients.status_${status}`;
    return t(key);
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('AccueilPatients.pageTitle')}</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 rounded-full">
                    <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{t('AccueilPatients.pageInfo')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('AccueilPatients.pageDescription')}</p>
          </div>

          <Card className="mb-6">
            <CardHeader><CardTitle>{t('AccueilPatients.searchCardTitle')}</CardTitle></CardHeader>
            <CardContent>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <div className="flex-1 relative">
                  <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={t('AccueilPatients.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ps-10"
                  />
                </div>
                <Button><Search className="h-4 w-4 me-2" />{t('AccueilPatients.searchButton')}</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>{t('AccueilPatients.listCardTitle')}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse min-w-0 flex-1 mb-4 md:mb-0">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{t('AccueilPatients.patientLabel')} {patient.id}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">CIN: {patient.cin}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{t('AccueilPatients.phoneLabel')}: {patient.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse flex-shrink-0 w-full md:w-auto justify-end">
                      <div className="text-end">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('AccueilPatients.lastVisitLabel')}</p>
                        <p className="font-medium">{patient.lastVisit}</p>
                      </div>
                      <Badge variant={patient.status === "active" ? "default" : patient.status === "completed" ? "secondary" : "outline"}>
                        {getStatusLabel(patient.status)}
                      </Badge>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm"><FileText className="h-4 w-4" /></Button>
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