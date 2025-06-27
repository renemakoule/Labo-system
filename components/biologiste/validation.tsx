"use client"

import { useState } from "react"
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

// 1. Importer l'icône "Info" et les composants du Tooltip
import { AlertCircle, FileText, BarChart3, Lock, RotateCcw, MessageSquare, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mockResults = [
  { id: "A-139", patient: "Patient A-139", status: "pending", critical: true, discipline: "Hématologie" },
  { id: "A-136", patient: "Patient A-136", status: "pending", critical: false, discipline: "Biochimie" },
  { id: "A-134", patient: "Patient A-134", status: "validated", critical: false, discipline: "Hormonologie" },
]

export function BiologisteValidation() {
  const [selectedResult, setSelectedResult] = useState(null)

  const handleResultValidation = () => {
    toast({
      title: "Résultats validés",
      description: "Rapport signé électroniquement et libéré",
    })
    setSelectedResult(null)
  }

  return (
    // 2. Envelopper le composant avec TooltipProvider
    <TooltipProvider>
      <div className="flex h-full">
        <div className="w-80 bg-white border-r flex flex-col">
          <div className="p-4 border-b flex-shrink-0">
            {/* 3. Modifier la structure du titre pour inclure l'icône */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Dossiers à Valider</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Validez les résultats des patients. Sélectionnez un dossier pour voir les détails, ajouter une interprétation et signer électroniquement.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {mockResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                    selectedResult?.id === result.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{result.id}</span>
                    {result.critical && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{result.patient}</div>
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Rapport - Patient {selectedResult.id}</h1>
                    <div className="flex items-center space-x-4 flex-wrap gap-2">
                      <Badge variant="outline">Homme, 45 ans</Badge>
                      <Badge variant="outline">Médecin: Dr. ALAMI</Badge>
                      <span className="text-sm text-gray-600">Prélevé le: 15/01/2024 à 08:30</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="hematologie" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center">
                              <span className="font-semibold">Hématologie</span>
                              {selectedResult.critical && <AlertCircle className="h-4 w-4 text-red-500 ml-2" />}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-red-50 rounded cursor-pointer hover:bg-red-100">
                                <span>Hémoglobine</span>
                                <span className="font-semibold text-red-600">8.5 g/dL</span>
                                <span className="text-sm text-gray-500">(12-16)</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                                <span>Globules Blancs</span>
                                <span className="font-semibold">7200 /μL</span>
                                <span className="text-sm text-gray-500">(4000-10000)</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded cursor-pointer hover:bg-yellow-100">
                                <span>Plaquettes</span>
                                <span className="font-semibold text-yellow-600">120000 /μL</span>
                                <span className="text-sm text-gray-500">(150000-400000)</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="biochimie" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">Biochimie</AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                                <span>Glycémie</span>
                                <span className="font-semibold">0.95 g/L</span>
                                <span className="text-sm text-gray-500">(0.70-1.10)</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                                <span>Créatinine</span>
                                <span className="font-semibold">12 mg/L</span>
                                <span className="text-sm text-gray-500">(7-13)</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="mt-6">
                        <Label htmlFor="interpretation">Interprétation & Conclusion du Biologiste</Label>
                        <Textarea
                          id="interpretation"
                          placeholder="Saisir votre interprétation..."
                          className="mt-2 min-h-[100px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Tabs defaultValue="historique" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="historique">Historique</TabsTrigger>
                          <TabsTrigger value="details">Détails</TabsTrigger>
                        </TabsList>
                        <TabsContent value="historique" className="space-y-4">
                          <Card className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                              <CardTitle className="text-sm">Évolution Hémoglobine</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-32 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                                <BarChart3 className="h-8 w-8 text-gray-400" />
                                <span className="ml-2 text-gray-500">Graphique d'évolution</span>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                        <TabsContent value="details" className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Détails du Prélèvement</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                              <div className="flex justify-between cursor-pointer hover:bg-gray-50 p-1 rounded">
                                <span>Heure:</span>
                                <span>08:30</span>
                              </div>
                              <div className="flex justify-between cursor-pointer hover:bg-gray-50 p-1 rounded">
                                <span>Infirmière:</span>
                                <span>AICHA BENALI</span>
                              </div>
                              <div className="flex justify-between cursor-pointer hover:bg-gray-50 p-1 rounded">
                                <span>Tubes:</span>
                                <span>EDTA, Sérum</span>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Sélectionnez un dossier à valider</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {selectedResult && (
            <div className="border-t bg-white p-4 flex-shrink-0">
              <div className="flex space-x-4 max-w-4xl mx-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 hover:bg-green-600">
                      <Lock className="h-4 w-4 mr-2" />
                      VALIDER ET LIBÉRER RÉSULTATS
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmation de Signature Électronique</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>Veuillez entrer votre mot de passe pour valider et signer ce rapport de manière irrévocable.</p>
                      <Input type="password" placeholder="Mot de passe" />
                      <Button className="w-full hover:bg-green-600" onClick={handleResultValidation}>
                        <Lock className="h-4 w-4 mr-2" />
                        Valider et Signer
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="flex-1 bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  DEMANDER RE-CONTRÔLE
                </Button>

                <Button variant="outline" className="flex-1 hover:bg-gray-50">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  ENREGISTRER BROUILLON
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}