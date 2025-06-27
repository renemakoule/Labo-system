"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileText, Eye } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Types de rapports disponibles
const reportTypes = [
  {
    id: "monthly_sales",
    name: "Rapport de Ventes Mensuel",
    description: "Synthèse complète du chiffre d'affaires et des performances",
    category: "Ventes",
    formats: ["PDF", "Excel"],
  },
  {
    id: "receivables_status",
    name: "État des Créances",
    description: "Situation détaillée des paiements en attente",
    category: "Trésorerie",
    formats: ["PDF", "Excel"],
  },
  {
    id: "cash_journal",
    name: "Journal de Caisse",
    description: "Mouvements de trésorerie détaillés",
    category: "Comptabilité",
    formats: ["PDF", "Excel"],
  },
  {
    id: "supplier_expenses",
    name: "Rapport Dépenses Fournisseurs",
    description: "Analyse des coûts par fournisseur et catégorie",
    category: "Achats",
    formats: ["PDF", "Excel"],
  },
  {
    id: "inventory_valuation",
    name: "Valorisation du Stock",
    description: "Valeur du stock et analyse des péremptions",
    category: "Stock",
    formats: ["PDF", "Excel"],
  },
  {
    id: "financial_dashboard",
    name: "Tableau de Bord Financier",
    description: "KPIs financiers consolidés",
    category: "Synthèse",
    formats: ["PDF"],
  },
]

// Historique des rapports générés
const reportHistory = [
  {
    id: "RPT001",
    name: "Rapport de Ventes Mensuel",
    period: "Décembre 2024",
    generatedDate: "2025-01-02",
    format: "PDF",
    size: "2.3 MB",
    status: "completed",
  },
  {
    id: "RPT002",
    name: "État des Créances",
    period: "31 Décembre 2024",
    generatedDate: "2025-01-02",
    format: "Excel",
    size: "156 KB",
    status: "completed",
  },
  {
    id: "RPT003",
    name: "Journal de Caisse",
    period: "Décembre 2024",
    generatedDate: "2025-01-01",
    format: "PDF",
    size: "1.8 MB",
    status: "completed",
  },
]

export function SettingsReportsTab() {
  const [selectedReport, setSelectedReport] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    if (!selectedReport || !selectedFormat) return

    setIsGenerating(true)
    // Simulation de génération de rapport
    setTimeout(() => {
      setIsGenerating(false)
      // Ici on déclencherait le téléchargement du rapport
      alert(`Rapport généré avec succès ! Le téléchargement va commencer.`)
    }, 2000)
  }

  const selectedReportData = reportTypes.find((r) => r.id === selectedReport)

  return (
    <div className="space-y-6">
      {/* Générateur de rapports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Générateur de Rapports
            <InfoTooltip content="Outil de création de rapports personnalisés pour vos besoins comptables et de gestion. Générez des documents officiels pour vos analyses financières." />
          </CardTitle>
          <CardDescription>Créez des rapports personnalisés selon vos besoins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de Rapport</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rapport" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {report.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat} disabled={!selectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le format" />
                </SelectTrigger>
                <SelectContent>
                  {selectedReportData?.formats.map((format) => (
                    <SelectItem key={format} value={format.toLowerCase()}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedReportData && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{selectedReportData.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{selectedReportData.description}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Période</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd MMM yyyy", { locale: fr })} -{" "}
                        {format(dateRange.to, "dd MMM yyyy", { locale: fr })}
                      </>
                    ) : (
                      format(dateRange.from, "dd MMM yyyy", { locale: fr })
                    )
                  ) : (
                    <span>Sélectionner une période</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={fr}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGenerateReport}
              disabled={!selectedReport || !selectedFormat || !dateRange || isGenerating}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? "Génération en cours..." : "Générer le Rapport"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historique des rapports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Historique des Rapports
            <InfoTooltip content="Archive de tous vos rapports générés. Accédez rapidement à vos documents précédents pour le suivi historique et les comparaisons." />
          </CardTitle>
          <CardDescription>Rapports récemment générés et disponibles au téléchargement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rapport</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Date de Génération</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportHistory.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.format}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{report.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rapports prédéfinis */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rapport Mensuel Standard</CardTitle>
            <CardDescription>Synthèse complète du mois</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer (PDF)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">État des Créances</CardTitle>
            <CardDescription>Situation actuelle</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer (Excel)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Journal de Caisse</CardTitle>
            <CardDescription>Mouvements du jour</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Générer (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Informations utiles */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Informations sur les Rapports</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 space-y-2">
          <p>• Les rapports PDF sont optimisés pour l'impression et la présentation</p>
          <p>• Les rapports Excel permettent une analyse approfondie des données</p>
          <p>• L'historique des rapports est conservé pendant 6 mois</p>
          <p>• Les rapports sont générés en temps réel avec les dernières données</p>
        </CardContent>
      </Card>
    </div>
  )
}
