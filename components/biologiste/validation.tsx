"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, FileText, BarChart3, Lock, RotateCcw, MessageSquare, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChatbotWindow } from "../chatbot/chatbot-window"
import { ChatbotFab } from "../chatbot/chatbot-fab"

const mockResults = [
  { id: "A-139", patient: "Patient A-139", status: "pending", critical: true, discipline: "Hématologie" },
  { id: "A-136", patient: "Patient A-136", status: "pending", critical: false, discipline: "Biochimie" },
  { id: "A-134", patient: "Patient A-134", status: "validated", critical: false, discipline: "Hormonologie" },
]

export function BiologisteValidation() {
  const [selectedResult, setSelectedResult] = useState<(typeof mockResults)[0] | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { t } = useLanguage();

  const handleResultValidation = () => {
    toast({
      title: t('BiologisteValidation.toastValidationTitle'),
      description: t('BiologisteValidation.toastValidationDescription'),
    })
    setSelectedResult(null)
  }

  return (
    <TooltipProvider>
      <div className="flex h-full">
        <div className="w-80 bg-white border-e flex flex-col dark:bg-gray-900 dark:border-gray-700">
          <div className="p-4 border-b flex-shrink-0 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold dark:text-gray-100">{t('BiologisteValidation.sidebarTitle')}</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{t('BiologisteValidation.sidebarInfo')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 rounded-lg cursor-pointer border transition-colors ${selectedResult?.id === result.id ? "bg-blue-50 border-blue-200 dark:bg-blue-900/50 dark:border-blue-700" : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"}`}
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium dark:text-gray-200">{result.id}</span>
                    {result.critical && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="text-sm text-gray-600 truncate dark:text-gray-400">{result.patient}</div>
                  <Badge variant={result.status === "pending" ? "secondary" : "default"} className="text-xs mt-1">
                    {result.discipline}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-6">
              {selectedResult ? (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('BiologisteValidation.reportTitle')} {selectedResult.id}</h1>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse flex-wrap gap-2">
                      <Badge variant="outline">{t('BiologisteValidation.patientInfo1')}</Badge>
                      <Badge variant="outline">{t('BiologisteValidation.doctorInfo')}</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{t('BiologisteValidation.sampledOn')} 15/01/2024 {t('BiologisteValidation.atTime')} 08:30</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="hematologie" className="border rounded-lg dark:border-gray-700">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center">
                              <span className="font-semibold dark:text-gray-200">{t('BiologisteValidation.disciplineHematology')}</span>
                              {selectedResult.critical && <AlertCircle className="h-4 w-4 text-red-500 ms-2" />}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="space-y-2">
                              {/* Les résultats spécifiques ne sont généralement pas traduits */}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        {/* ... autres disciplines */}
                      </Accordion>

                      <div className="mt-6">
                        <Label htmlFor="interpretation">{t('BiologisteValidation.interpretationLabel')}</Label>
                        <Textarea id="interpretation" placeholder={t('BiologisteValidation.interpretationPlaceholder')} className="mt-2 min-h-[100px]" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Tabs defaultValue="historique" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="historique">{t('BiologisteValidation.tabHistory')}</TabsTrigger>
                          <TabsTrigger value="details">{t('BiologisteValidation.tabDetails')}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="historique" className="space-y-4">
                          <Card><CardHeader><CardTitle className="text-sm">{t('BiologisteValidation.hemoglobinEvolution')}</CardTitle></CardHeader><CardContent><div className="h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center"><BarChart3 className="h-8 w-8 text-gray-400" /><span className="ms-2 text-gray-500">{t('BiologisteValidation.evolutionGraph')}</span></div></CardContent></Card>
                        </TabsContent>
                        <TabsContent value="details" className="space-y-4">
                          <Card><CardHeader><CardTitle className="text-sm">{t('BiologisteValidation.sampleDetails')}</CardTitle></CardHeader><CardContent className="text-sm space-y-2">
                              {/* ... les détails ne sont généralement pas traduits */}
                          </CardContent></Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500"><div className="text-center"><FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" /><p className="text-lg">{t('BiologisteValidation.selectFolder')}</p></div></div>
              )}
            </div>
          </ScrollArea>

          {selectedResult && (
            <div className="border-t bg-white dark:bg-gray-900 p-4 flex-shrink-0">
              <div className="flex space-x-4 rtl:space-x-reverse max-w-4xl mx-auto">
                <Dialog>
                  <DialogTrigger asChild><Button className="flex-1 hover:bg-green-600"><Lock className="h-4 w-4 me-2" />{t('BiologisteValidation.validateButton')}</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>{t('BiologisteValidation.dialogTitle')}</DialogTitle></DialogHeader>
                    <div className="space-y-4"><p>{t('BiologisteValidation.dialogDescription')}</p><Input type="password" placeholder={t('BiologisteValidation.dialogPasswordPlaceholder')} /><Button className="w-full hover:bg-green-600" onClick={handleResultValidation}><Lock className="h-4 w-4 me-2" />{t('BiologisteValidation.dialogConfirmButton')}</Button></div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="flex-1 bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"><RotateCcw className="h-4 w-4 me-2" />{t('BiologisteValidation.recheckButton')}</Button>
                <Button variant="outline" className="flex-1 hover:bg-gray-50"><MessageSquare className="h-4 w-4 me-2" />{t('BiologisteValidation.saveDraftButton')}</Button>
              </div>
            </div>
          )}
        </div>
        <ChatbotWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        <ChatbotFab isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
      </div>
    </TooltipProvider>
  )
}