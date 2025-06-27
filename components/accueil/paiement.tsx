"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

// 1. Importer l'icône "Info" et les composants du Tooltip
import { Search, CreditCard, CheckCircle, RotateCcw, Euro, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mockPayments = [
  {
    id: "A-140",
    patient: "Patient A-140",
    totalAmount: 145.5,
    paidAmount: 100.0,
    remainingAmount: 45.5,
    status: "partial",
    lastPayment: "15/01/2024",
    paymentMethod: "Carte",
  },
  {
    id: "A-141",
    patient: "Patient A-141",
    totalAmount: 89.0,
    paidAmount: 0.0,
    remainingAmount: 89.0,
    status: "unpaid",
    lastPayment: "-",
    paymentMethod: "-",
  },
  {
    id: "A-137",
    patient: "Patient A-137",
    totalAmount: 120.0,
    paidAmount: 120.0,
    remainingAmount: 0.0,
    status: "paid",
    lastPayment: "14/01/2024",
    paymentMethod: "Espèces",
  },
]

export function AccueilPaiement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [refundAmount, setRefundAmount] = useState("")

  const filteredPayments = mockPayments.filter(
    (payment) =>
      payment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePayment = () => {
    if (!paymentAmount || !paymentMethod) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir le montant et la méthode de paiement",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Paiement enregistré",
      description: `Paiement de ${paymentAmount} DH enregistré pour ${selectedPatient.patient}`,
    })
    setPaymentAmount("")
    setPaymentMethod("")
    setSelectedPatient(null)
  }

  const handleRefund = () => {
    if (!refundAmount) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir le montant du remboursement",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Remboursement traité",
      description: `Remboursement de ${refundAmount} DH traité pour ${selectedPatient.patient}`,
    })
    setRefundAmount("")
    setSelectedPatient(null)
  }

  return (
    // 2. Envelopper le composant avec TooltipProvider
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            {/* 3. Modifier la structure du titre pour inclure l'icône */}
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Cette page permet de gérer les paiements des patients. Vous pouvez enregistrer de nouveaux paiements, suivre les soldes restants et traiter les remboursements.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Suivi des paiements, soldes et remboursements</p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Encaissé Aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2,450 DH</div>
                <p className="text-xs text-muted-foreground">+12% vs hier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Paiements Partiels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">3</div>
                <p className="text-xs text-muted-foreground">Soldes restants</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Impayés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-xs text-muted-foreground">À relancer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Remboursements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">1</div>
                <p className="text-xs text-muted-foreground">En attente</p>
              </CardContent>
            </Card>
          </div>

          {/* Recherche */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recherche Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par ID patient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des paiements */}
          <Card>
            <CardHeader>
              <CardTitle>État des Paiements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">{payment.patient}</h3>
                        <p className="text-sm text-gray-600">
                          Total: {payment.totalAmount} DH • Payé: {payment.paidAmount} DH • Restant:{" "}
                          {payment.remainingAmount} DH
                        </p>
                        <p className="text-sm text-gray-500">Dernier paiement: {payment.lastPayment}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <Badge
                        variant={
                          payment.status === "paid"
                            ? "default"
                            : payment.status === "partial"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {payment.status === "paid" ? "Payé" : payment.status === "partial" ? "Partiel" : "Impayé"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPatient(payment)}
                              disabled={payment.status === "paid"}
                            >
                              <CreditCard className="h-4 w-4 mr-1" />
                              Payer
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Enregistrer un Paiement - {payment.patient}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm">
                                  <strong>Montant total:</strong> {payment.totalAmount} DH
                                </p>
                                <p className="text-sm">
                                  <strong>Déjà payé:</strong> {payment.paidAmount} DH
                                </p>
                                <p className="text-sm font-semibold text-red-600">
                                  <strong>Montant restant:</strong> {payment.remainingAmount} DH
                                </p>
                              </div>
                              <div>
                                <Label htmlFor="amount">Montant du paiement (DH)</Label>
                                <Input
                                  id="amount"
                                  type="number"
                                  value={paymentAmount}
                                  onChange={(e) => setPaymentAmount(e.target.value)}
                                  placeholder="0.00"
                                  max={payment.remainingAmount}
                                />
                              </div>
                              <div>
                                <Label htmlFor="method">Méthode de paiement</Label>
                                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une méthode" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="cash">Espèces</SelectItem>
                                    <SelectItem value="card">Carte Bancaire</SelectItem>
                                    <SelectItem value="check">Chèque</SelectItem>
                                    <SelectItem value="transfer">Virement</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button className="w-full" onClick={handlePayment}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Enregistrer le Paiement
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {payment.status === "paid" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedPatient(payment)}
                                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              >
                                <RotateCcw className="h-4 w-4 mr-1" />
                                Rembourser
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Traiter un Remboursement - {payment.patient}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <p className="text-sm">
                                    <strong>Montant payé:</strong> {payment.paidAmount} DH
                                  </p>
                                  <p className="text-sm">
                                    <strong>Méthode de paiement:</strong> {payment.paymentMethod}
                                  </p>
                                </div>
                                <div>
                                  <Label htmlFor="refund">Montant du remboursement (DH)</Label>
                                  <Input
                                    id="refund"
                                    type="number"
                                    value={refundAmount}
                                    onChange={(e) => setRefundAmount(e.target.value)}
                                    placeholder="0.00"
                                    max={payment.paidAmount}
                                  />
                                </div>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleRefund}>
                                  <Euro className="h-4 w-4 mr-2" />
                                  Traiter le Remboursement
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
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