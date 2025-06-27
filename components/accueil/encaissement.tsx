"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

// Import de l'icône Info et des autres icônes
import {
  Calendar,
  Search,
  Download,
  Filter,
  TrendingUp,
  CreditCard,
  Banknote,
  Info,
} from "lucide-react"

// Import des composants pour l'infobulle (Tooltip)
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mockTransactions = [
  {
    id: "TXN-001",
    date: "15/01/2024",
    time: "14:30",
    patientId: "A-140",
    patient: "Patient A-140",
    type: "payment",
    method: "card",
    amount: 145.5,
    invoiceId: "FACT-2024-001",
    operator: "AICHA BENALI",
    status: "completed",
  },
  {
    id: "TXN-002",
    date: "15/01/2024",
    time: "14:15",
    patientId: "A-141",
    patient: "Patient A-141",
    type: "payment",
    method: "cash",
    amount: 89.0,
    invoiceId: "FACT-2024-002",
    operator: "FATIMA ALAMI",
    status: "completed",
  },
  {
    id: "TXN-003",
    date: "15/01/2024",
    time: "13:45",
    patientId: "A-137",
    patient: "Patient A-137",
    type: "refund",
    method: "cash",
    amount: -25.0,
    invoiceId: "FACT-2024-003",
    operator: "AICHA BENALI",
    status: "completed",
  },
  {
    id: "TXN-004",
    date: "15/01/2024",
    time: "13:30",
    patientId: "A-138",
    patient: "Patient A-138",
    type: "payment",
    method: "check",
    amount: 120.0,
    invoiceId: "FACT-2024-004",
    operator: "FATIMA ALAMI",
    status: "pending",
  },
  {
    id: "TXN-005",
    date: "14/01/2024",
    time: "16:20",
    patientId: "A-135",
    patient: "Patient A-135",
    type: "payment",
    method: "transfer",
    amount: 200.0,
    invoiceId: "FACT-2024-005",
    operator: "AICHA BENALI",
    status: "completed",
  },
]

export function AccueilEncaissement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [methodFilter, setMethodFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate = !dateFilter || transaction.date === dateFilter
    const matchesMethod = methodFilter === "all" || transaction.method === methodFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesDate && matchesMethod && matchesType
  })

  const getTotalByMethod = (method: string) => {
    return filteredTransactions
      .filter((t) => t.method === method && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const getTotalByType = (type: string) => {
    return filteredTransactions
      .filter((t) => t.type === type && t.status === "completed")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />
      case "cash":
        return <Banknote className="h-4 w-4" />
      case "check":
        return <CreditCard className="h-4 w-4" />
      case "transfer":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getMethodLabel = (method: string) => {
    switch (method) {
      case "card":
        return "Carte"
      case "cash":
        return "Espèces"
      case "check":
        return "Chèque"
      case "transfer":
        return "Virement"
      default:
        return method
    }
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Historique des Encaissements</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Cette page affiche l'historique de toutes les transactions financières (paiements, remboursements). Vous pouvez filtrer les données et consulter les totaux en temps réel.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Suivi de toutes les transactions financières</p>
          </div>

          {/* Statistiques par méthode de paiement */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Banknote className="h-4 w-4 mr-2" />
                  Espèces
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{getTotalByMethod("cash")} DH</div>
                <p className="text-xs text-muted-foreground">
                  {filteredTransactions.filter((t) => t.method === "cash" && t.status === "completed").length}{" "}
                  transaction(s)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Cartes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{getTotalByMethod("card")} DH</div>
                <p className="text-xs text-muted-foreground">
                  {filteredTransactions.filter((t) => t.method === "card" && t.status === "completed").length}{" "}
                  transaction(s)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Chèques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{getTotalByMethod("check")} DH</div>
                <p className="text-xs text-muted-foreground">
                  {filteredTransactions.filter((t) => t.method === "check" && t.status === "completed").length}{" "}
                  transaction(s)
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Virements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{getTotalByMethod("transfer")} DH</div>
                <p className="text-xs text-muted-foreground">
                  {
                    filteredTransactions.filter((t) => t.method === "transfer" && t.status === "completed")
                      .length
                  }{" "}
                  transaction(s)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="cash">Espèces</SelectItem>
                    <SelectItem value="card">Carte</SelectItem>
                    <SelectItem value="check">Chèque</SelectItem>
                    <SelectItem value="transfer">Virement</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="payment">Paiement</SelectItem>
                    <SelectItem value="refund">Remboursement</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Résumé des totaux */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Total Encaissements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{getTotalByType("payment")} DH</div>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-red-700">Total Remboursements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{getTotalByType("refund")} DH</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Solde Net</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {getTotalByType("payment") - getTotalByType("refund")} DH
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 min-w-0 flex-1">
                      <div className="flex-shrink-0">{getMethodIcon(transaction.method)}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {transaction.id} - {transaction.patient}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {transaction.date} à {transaction.time} • Facture: {transaction.invoiceId}
                        </p>
                        <p className="text-sm text-gray-500">Opérateur: {transaction.operator}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 flex-shrink-0">
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            transaction.type === "refund" ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {transaction.type === "refund" ? "-" : "+"}
                          {Math.abs(transaction.amount)} DH
                        </div>
                        <div className="text-sm text-gray-500">{getMethodLabel(transaction.method)}</div>
                      </div>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : transaction.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {transaction.status === "completed"
                          ? "Terminé"
                          : transaction.status === "pending"
                            ? "En attente"
                            : "Échoué"}
                      </Badge>
                      <Badge variant="outline">{transaction.type === "payment" ? "Paiement" : "Remboursement"}</Badge>
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