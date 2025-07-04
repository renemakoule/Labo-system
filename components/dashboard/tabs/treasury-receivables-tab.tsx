"use client"

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, Search, AlertTriangle, Phone } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { InfoTooltip } from "@/components/dashboard/info-tooltip" // InfoTooltip est un composant.

// Données de simulation (aucune traduction directe ici, les valeurs dynamiques seront traduites)
const receivablesData = [
  { id: "F001", patientId: "A-140", invoiceNumber: "INV-2024-001", totalAmount: 150000, remainingAmount: 45000, dueDate: "2024-01-15", daysOverdue: 12, status: "overdue" },
  { id: "F002", patientId: "A-141", invoiceNumber: "INV-2024-002", totalAmount: 200000, remainingAmount: 60000, dueDate: "2024-01-20", daysOverdue: 7, status: "overdue" },
];

export function TreasuryReceivablesTab() {
  // Initialisez votre hook de langue personnalisé
  const { t } = useLanguage();

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
    if (daysOverdue > 0) return <Badge variant="destructive">{t('TreasuryReceivablesTab.statusBadge.overdue', { days: daysOverdue })}</Badge>
    if (daysOverdue <= 7 && daysOverdue >= 0) return <Badge variant="outline">{t('TreasuryReceivablesTab.statusBadge.dueSoon')}</Badge>
    return <Badge variant="secondary">{t('TreasuryReceivablesTab.statusBadge.onTime')}</Badge>
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {/* KPI: Total Créances */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('TreasuryReceivablesTab.totalReceivables')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReceivables.toLocaleString()} {t('TreasuryReceivablesTab.currency')}</div>
          </CardContent>
        </Card>
        {/* KPI: En Retard */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('TreasuryReceivablesTab.overdueAmount')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{totalOverdue.toLocaleString()} {t('TreasuryReceivablesTab.currency')}</div>
          </CardContent>
        </Card>
        {/* KPI: Nb Factures en Retard */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('TreasuryReceivablesTab.numOverdueInvoices')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{receivablesData.filter(item => item.daysOverdue > 0).length}</div>
          </CardContent>
        </Card>
        {/* KPI: Retard Moyen */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('TreasuryReceivablesTab.averageOverdue')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(receivablesData.filter(item => item.daysOverdue > 0).reduce((sum, item) => sum + item.daysOverdue, 0) / receivablesData.filter(item => item.daysOverdue > 0).length)}{t('TreasuryReceivablesTab.daysAbbreviation')}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {t('TreasuryReceivablesTab.receivablesTrackingTitle')}
              </CardTitle>
              <CardDescription>
                {t('TreasuryReceivablesTab.receivablesTrackingDescription')}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
                {t('TreasuryReceivablesTab.exportButton')}
              </Button>
              <Button size="sm">
                <Phone className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
                {t('TreasuryReceivablesTab.callListButton')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute start-2 top-2.5 h-4 w-4 text-muted-foreground" /> {/* `start-2` pour positionnement compatible RTL */}
              <Input
                placeholder={t('TreasuryReceivablesTab.searchPlaceholder')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="ps-8" // `ps-8` pour padding-start (compatible RTL)
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={t('TreasuryReceivablesTab.filterByStatusPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('TreasuryReceivablesTab.filterAll')}</SelectItem>
                <SelectItem value="overdue">{t('TreasuryReceivablesTab.filterOverdue')}</SelectItem>
                <SelectItem value="due_this_week">{t('TreasuryReceivablesTab.filterDueThisWeek')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('TreasuryReceivablesTab.tableHeaders.patientId')}</TableHead>
                <TableHead>{t('TreasuryReceivablesTab.tableHeaders.invoiceNumber')}</TableHead>
                <TableHead className="text-end">{t('TreasuryReceivablesTab.tableHeaders.totalAmount')}</TableHead> {/* `text-end` pour alignement compatible RTL */}
                <TableHead className="text-end">{t('TreasuryReceivablesTab.tableHeaders.remainingAmount')}</TableHead> {/* `text-end` pour alignement compatible RTL */}
                <TableHead>{t('TreasuryReceivablesTab.tableHeaders.dueDate')}</TableHead>
                <TableHead>{t('TreasuryReceivablesTab.tableHeaders.status')}</TableHead>
                <TableHead>{t('TreasuryReceivablesTab.tableHeaders.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map(receivable => (
                <TableRow key={receivable.id}>
                  <TableCell className="font-medium">{receivable.patientId}</TableCell>
                  <TableCell>{receivable.invoiceNumber}</TableCell>
                  <TableCell className="text-end">{receivable.totalAmount.toLocaleString()} {t('TreasuryReceivablesTab.currency')}</TableCell> {/* `text-end` pour alignement compatible RTL */}
                  <TableCell className="text-end font-medium">{receivable.remainingAmount.toLocaleString()} {t('TreasuryReceivablesTab.currency')}</TableCell> {/* `text-end` pour alignement compatible RTL */}
                  <TableCell>{receivable.dueDate}</TableCell>
                  <TableCell>{getStatusBadge(receivable.status, receivable.daysOverdue)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">{t('TreasuryReceivablesTab.callButton')}</Button>
                      {receivable.daysOverdue > 30 && (
                        <Button variant="destructive" size="sm">
                          {t('TreasuryReceivablesTab.provisionButton')}
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
      {/* Carte des Actions Recommandées */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-5 w-5 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
            {t('TreasuryReceivablesTab.recommendedActionsTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-orange-700">
          <ul className="space-y-2">
            <li>
              • {t('TreasuryReceivablesTab.recommendation1')}
            </li>
            {/* Interpolation des valeurs pour l'exemple hardcodé */}
            <li>
              • {t('TreasuryReceivablesTab.recommendation2', {
                patientId: 'A-140',
                days: 12,
                amount: '45,000',
                currency: t('TreasuryReceivablesTab.currency')
              })}
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}