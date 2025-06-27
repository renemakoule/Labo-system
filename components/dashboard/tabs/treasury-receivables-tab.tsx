"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, AlertTriangle, Phone } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées
const receivablesData = [
  {
    id: "F001",
    patientName: "Marie Dubois",
    invoiceNumber: "INV-2024-001",
    totalAmount: 150,
    remainingAmount: 45,
    dueDate: "2024-01-15",
    daysOverdue: 12,
    status: "overdue",
  },
  {
    id: "F002",
    patientName: "Jean Martin",
    invoiceNumber: "INV-2024-002",
    totalAmount: 200,
    remainingAmount: 60,
    dueDate: "2024-01-20",
    daysOverdue: 7,
    status: "overdue",
  },
  {
    id: "F003",
    patientName: "Sophie Laurent",
    invoiceNumber: "INV-2024-003",
    totalAmount: 120,
    remainingAmount: 36,
    dueDate: "2024-01-25",
    daysOverdue: 2,
    status: "overdue",
  },
  {
    id: "F004",
    patientName: "Pierre Durand",
    invoiceNumber: "INV-2024-004",
    totalAmount: 180,
    remainingAmount: 54,
    dueDate: "2024-01-30",
    daysOverdue: 0,
    status: "due_soon",
  },
  {
    id: "F005",
    patientName: "Claire Moreau",
    invoiceNumber: "INV-2024-005",
    totalAmount: 90,
    remainingAmount: 27,
    dueDate: "2024-02-05",
    daysOverdue: -3,
    status: "current",
  },
]

export function TreasuryReceivablesTab() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = receivablesData.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "overdue" && item.daysOverdue > 0) ||
      (filter === "due_this_week" && item.daysOverdue <= 7 && item.daysOverdue >= 0)

    const matchesSearch =
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const totalOverdue = receivablesData
    .filter((item) => item.daysOverdue > 0)
    .reduce((sum, item) => sum + item.remainingAmount, 0)

  const totalReceivables = receivablesData.reduce((sum, item) => sum + item.remainingAmount, 0)

  const getStatusBadge = (status: string, daysOverdue: number) => {
    if (daysOverdue > 0) {
      return <Badge variant="destructive">En retard ({daysOverdue}j)</Badge>
    } else if (daysOverdue <= 7 && daysOverdue >= 0) {
      return <Badge variant="outline">Échéance proche</Badge>
    }
    return <Badge variant="secondary">À jour</Badge>
  }

  return (
    <div className="space-y-6">
      {/* KPIs des créances */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Créances
              <InfoTooltip content="Montant total que vos patients vous doivent encore. Surveillez cette valeur pour anticiper vos rentrées de fonds." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {totalReceivables}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              En Retard
              <InfoTooltip content="Créances dépassant la date d'échéance. Ces montants nécessitent un suivi prioritaire pour éviter les pertes." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">€ {totalOverdue}</div>
            <div className="text-sm text-muted-foreground">
              {Math.round((totalOverdue / totalReceivables) * 100)}% du total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Nb Factures en Retard
              <InfoTooltip content="Nombre de factures impayées. Plus ce nombre est élevé, plus le risque d'impayés augmente." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receivablesData.filter((item) => item.daysOverdue > 0).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Retard Moyen
              <InfoTooltip content="Durée moyenne de retard de paiement. Un indicateur clé pour évaluer la discipline de paiement de vos patients." />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                receivablesData
                  .filter((item) => item.daysOverdue > 0)
                  .reduce((sum, item) => sum + item.daysOverdue, 0) /
                  receivablesData.filter((item) => item.daysOverdue > 0).length,
              )}{" "}
              jours
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Suivi des Créances
                <InfoTooltip content="Gestion active de vos créances clients. Surveillez les retards de paiement et prenez des actions préventives pour maintenir votre trésorerie." />
              </CardTitle>
              <CardDescription>Gestion des paiements en attente</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Liste d'appels
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou numéro de facture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les créances</SelectItem>
                <SelectItem value="overdue">En retard</SelectItem>
                <SelectItem value="due_this_week">Échéance cette semaine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>N° Facture</TableHead>
                <TableHead className="text-right">Montant Total</TableHead>
                <TableHead className="text-right">Restant Dû</TableHead>
                <TableHead>Date Échéance</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((receivable) => (
                <TableRow key={receivable.id}>
                  <TableCell className="font-medium">{receivable.patientName}</TableCell>
                  <TableCell>{receivable.invoiceNumber}</TableCell>
                  <TableCell className="text-right">€ {receivable.totalAmount}</TableCell>
                  <TableCell className="text-right font-medium">€ {receivable.remainingAmount}</TableCell>
                  <TableCell>{receivable.dueDate}</TableCell>
                  <TableCell>{getStatusBadge(receivable.status, receivable.daysOverdue)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Appeler
                      </Button>
                      {receivable.daysOverdue > 30 && (
                        <Button variant="destructive" size="sm">
                          Provisionner
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alertes */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5" />
            Actions Recommandées
          </CardTitle>
        </CardHeader>
        <CardContent className="text-orange-700">
          <ul className="space-y-2">
            <li>• 3 factures dépassent 10 jours de retard - Relance téléphonique recommandée</li>
            <li>• Marie Dubois : 12 jours de retard (€45) - Priorité haute</li>
            <li>• Considérer un provisionnement pour les créances &gt; 30 jours</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
