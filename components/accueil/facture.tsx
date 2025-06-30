"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, Plus, Eye, Download, Printer, Edit, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Définition des types pour une meilleure sécurité et auto-complétion
interface Exam {
  name: string;
  price: number;
  category: string;
}

interface SelectedExam extends Exam {
  quantity: number;
}

const mockInvoices = [
  {
    id: "FACT-2024-001",
    patientId: "A-140",
    date: "15/01/2024",
    amount: 145500,
    status: "paid",
    items: [
      { name: "Numération Formule Sanguine", price: 45000 },
      { name: "Glycémie à jeun", price: 25000 },
      { name: "Cholestérol total", price: 30000 },
      { name: "Consultation", price: 45500 },
    ],
  },
  {
    id: "FACT-2024-002",
    patientId: "A-141",
    date: "15/01/2024",
    amount: 89000,
    status: "pending",
    items: [
      { name: "Hémoglobine glyquée", price: 65000 },
      { name: "Consultation", price: 24000 },
    ],
  },
  {
    id: "FACT-2024-003",
    patientId: "A-137",
    date: "14/01/2024",
    amount: 120000,
    status: "overdue",
    items: [
      { name: "Bilan hépatique complet", price: 95000 },
      { name: "Consultation", price: 25000 },
    ],
  },
]

const mockExams: Exam[] = [
  { name: "Numération Formule Sanguine", price: 45000, category: "Hématologie" },
  { name: "Glycémie à jeun", price: 25000, category: "Biochimie" },
  { name: "Cholestérol total", price: 30000, category: "Biochimie" },
  { name: "Hémoglobine glyquée", price: 65000, category: "Biochimie" },
  { name: "Bilan hépatique complet", price: 95000, category: "Biochimie" },
  { name: "TSH", price: 40000, category: "Hormonologie" },
]

export function AccueilFacture() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatientId, setSelectedPatientId] = useState("")
  // <- CORRECTION: Typage explicite du state pour que TypeScript connaisse la structure des objets dans le tableau.
  const [selectedExams, setSelectedExams] = useState<SelectedExam[]>([])
  const [invoiceNotes, setInvoiceNotes] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  // <- CORRECTION: Typage de l'argument 'exam'
  const addExamToInvoice = (exam: Exam) => {
    // 'item.name' est maintenant accessible car TypeScript sait que 'item' est de type SelectedExam
    if (!selectedExams.find((item) => item.name === exam.name)) {
      // Le nouvel objet correspond bien au type SelectedExam
      setSelectedExams([...selectedExams, { ...exam, quantity: 1 }])
    }
  }
  
  // <- CORRECTION: Typage de l'argument 'examName'
  const removeExamFromInvoice = (examName: string) => {
    setSelectedExams(selectedExams.filter((item) => item.name !== examName))
  }

  const calculateTotal = () => {
    // 'item.price' et 'item.quantity' sont maintenant accessibles
    return selectedExams.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCreateInvoice = () => {
    if (!selectedPatientId || selectedExams.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un patient et au moins un examen",
        variant: "destructive",
      })
      return
    }

    const newInvoiceId = `FACT-2024-${String(mockInvoices.length + 1).padStart(3, "0")}`
    toast({
      title: "Facture créée",
      description: `Facture ${newInvoiceId} créée pour le patient ${selectedPatientId}`,
    })

    // Reset form
    setSelectedPatientId("")
    setSelectedExams([])
    setInvoiceNotes("")
    setShowCreateDialog(false)
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Factures</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Cette page vous permet de créer de nouvelles factures, de suivre leur statut (payée, en attente, en retard) et de consulter l'historique.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Création et suivi des factures patients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Factures du Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 depuis hier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Montant Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2 450 000 FCFA</div>
                <p className="text-xs text-muted-foreground">Factures du jour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">En Attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <p className="text-xs text-muted-foreground">Non payées</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">En Retard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-xs text-muted-foreground">À relancer</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-4 mb-6">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une Facture
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer une Nouvelle Facture</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientId">ID Patient *</Label>
                      <Input
                        id="patientId"
                        value={selectedPatientId}
                        onChange={(e) => setSelectedPatientId(e.target.value)}
                        placeholder="Entrer le code unique du patient"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Date de facturation</Label>
                      <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                  </div>

                  <div>
                    <Label>Examens disponibles</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-4">
                      {mockExams.map((exam) => (
                        <Button
                          key={exam.name}
                          variant="outline"
                          size="sm"
                          onClick={() => addExamToInvoice(exam)}
                          className="justify-start h-auto p-2"
                        >
                          <div className="text-left">
                            <div className="font-medium text-xs">{exam.name}</div>
                            <div className="text-xs text-gray-500">{exam.price} FCFA</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Examens sélectionnés</Label>
                    <div className="space-y-2 mt-2">
                      {selectedExams.map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{item.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{item.price} FCFA</span>
                            <Button variant="outline" size="sm" onClick={() => removeExamFromInvoice(item.name)}>
                              ×
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {selectedExams.length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total:</span>
                          <span className="text-xl font-bold text-blue-600">{calculateTotal()} FCFA</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes (optionnel)</Label>
                    <Textarea
                      id="notes"
                      value={invoiceNotes}
                      onChange={(e) => setInvoiceNotes(e.target.value)}
                      placeholder="Notes additionnelles..."
                    />
                  </div>

                  <Button className="w-full" onClick={handleCreateInvoice}>
                    <FileText className="h-4 w-4 mr-2" />
                    Créer la Facture
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par ID facture ou ID patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historique des Factures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {invoice.id} - Patient {invoice.patientId}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Date: {invoice.date} • Montant: {invoice.amount.toLocaleString()} FCFA
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {invoice.items.length} examen(s) • {invoice.items.map((item) => item.name).join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <Badge
                        variant={
                          invoice.status === "paid"
                            ? "default"
                            : invoice.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {invoice.status === "paid" ? "Payée" : invoice.status === "pending" ? "En attente" : "En retard"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm"><Printer className="h-4 w-4" /></Button>
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