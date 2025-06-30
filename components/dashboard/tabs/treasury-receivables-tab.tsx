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

const receivablesData = [
  { id: "F001", patientId: "A-140", invoiceNumber: "INV-2024-001", totalAmount: 150000, remainingAmount: 45000, dueDate: "2024-01-15", daysOverdue: 12, status: "overdue" },
  { id: "F002", patientId: "A-141", invoiceNumber: "INV-2024-002", totalAmount: 200000, remainingAmount: 60000, dueDate: "2024-01-20", daysOverdue: 7, status: "overdue" },
]

export function TreasuryReceivablesTab() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = receivablesData.filter((item) => {
    const matchesFilter = filter === "all" || (filter === "overdue" && item.daysOverdue > 0) || (filter === "due_this_week" && item.daysOverdue <= 7 && item.daysOverdue >= 0)
    const matchesSearch = item.patientId.toLowerCase().includes(searchTerm.toLowerCase()) || item.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalOverdue = receivablesData.filter(item => item.daysOverdue > 0).reduce((sum, item) => sum + item.remainingAmount, 0)
  const totalReceivables = receivablesData.reduce((sum, item) => sum + item.remainingAmount, 0)

  const getStatusBadge = (status: string, daysOverdue: number) => {
    if (daysOverdue > 0) return <Badge variant="destructive">En retard ({daysOverdue}j)</Badge>
    if (daysOverdue <= 7 && daysOverdue >= 0) return <Badge variant="outline">Échéance proche</Badge>
    return <Badge variant="secondary">À jour</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Créances</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalReceivables.toLocaleString()} FCFA</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">En Retard</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-destructive">{totalOverdue.toLocaleString()} FCFA</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Nb Factures en Retard</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{receivablesData.filter(item => item.daysOverdue > 0).length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Retard Moyen</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{Math.round(receivablesData.filter(item => item.daysOverdue > 0).reduce((sum, item) => sum + item.daysOverdue, 0) / receivablesData.filter(item => item.daysOverdue > 0).length)} jours</div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div><CardTitle className="flex items-center gap-2">Suivi des Créances</CardTitle><CardDescription>Gestion des paiements en attente</CardDescription></div><div className="flex gap-2"><Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Exporter</Button><Button size="sm"><Phone className="h-4 w-4 mr-2" />Liste d'appels</Button></div></div></CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1"><Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Rechercher par ID patient ou facture..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8"/></div>
            <Select value={filter} onValueChange={setFilter}><SelectTrigger className="w-[200px]"><SelectValue placeholder="Filtrer par statut" /></SelectTrigger><SelectContent><SelectItem value="all">Toutes les créances</SelectItem><SelectItem value="overdue">En retard</SelectItem><SelectItem value="due_this_week">Échéance cette semaine</SelectItem></SelectContent></Select>
          </div>
          <Table>
            <TableHeader><TableRow><TableHead>ID Patient</TableHead><TableHead>N° Facture</TableHead><TableHead className="text-right">Montant Total</TableHead><TableHead className="text-right">Restant Dû</TableHead><TableHead>Date Échéance</TableHead><TableHead>Statut</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>{filteredData.map(receivable => (<TableRow key={receivable.id}><TableCell className="font-medium">{receivable.patientId}</TableCell><TableCell>{receivable.invoiceNumber}</TableCell><TableCell className="text-right">{receivable.totalAmount.toLocaleString()} FCFA</TableCell><TableCell className="text-right font-medium">{receivable.remainingAmount.toLocaleString()} FCFA</TableCell><TableCell>{receivable.dueDate}</TableCell><TableCell>{getStatusBadge(receivable.status, receivable.daysOverdue)}</TableCell><TableCell><div className="flex gap-2"><Button variant="outline" size="sm">Appeler</Button>{receivable.daysOverdue > 30 && (<Button variant="destructive" size="sm">Provisionner</Button>)}</div></TableCell></TableRow>))}</TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="border-orange-200 bg-orange-50"><CardHeader><CardTitle className="flex items-center gap-2 text-orange-800"><AlertTriangle className="h-5 w-5" />Actions Recommandées</CardTitle></CardHeader><CardContent className="text-orange-700"><ul className="space-y-2"><li>• 3 factures dépassent 10 jours de retard - Relance téléphonique recommandée</li><li>• Patient A-140 : 12 jours de retard (45,000 FCFA) - Priorité haute</li></ul></CardContent></Card>
    </div>
  )
}