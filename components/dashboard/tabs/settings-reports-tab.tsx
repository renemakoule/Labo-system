"use client"

import { useState, useEffect } from "react"
// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context'; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, FileText, Eye } from "lucide-react"
import { format } from "date-fns"
// Nous allons importer dynamiquement la locale de date-fns
import { type Locale as DateFnsLocale } from 'date-fns'; // Importation du type pour la locale de date-fns

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip" // InfoTooltip est un composant.

// Types de rapports disponibles (mis à jour avec des clés de traduction)
const reportTypesConfig = [
  {
    id: "monthly_sales",
    nameKey: "monthlySalesName",
    descriptionKey: "monthlySalesDescription",
    categoryKey: "Sales",
    formats: ["PDF", "Excel"],
  },
  {
    id: "receivables_status",
    nameKey: "receivablesStatusName",
    descriptionKey: "receivablesStatusDescription",
    categoryKey: "Treasury",
    formats: ["PDF", "Excel"],
  },
  {
    id: "cash_journal",
    nameKey: "cashJournalName",
    descriptionKey: "cashJournalDescription",
    categoryKey: "Accounting",
    formats: ["PDF", "Excel"],
  },
  {
    id: "supplier_expenses",
    nameKey: "supplierExpensesName",
    descriptionKey: "supplierExpensesDescription",
    categoryKey: "Purchases",
    formats: ["PDF", "Excel"],
  },
  {
    id: "inventory_valuation",
    nameKey: "inventoryValuationName",
    descriptionKey: "inventoryValuationDescription",
    categoryKey: "Stock",
    formats: ["PDF", "Excel"],
  },
  {
    id: "financial_dashboard",
    nameKey: "financialDashboardName",
    descriptionKey: "financialDashboardDescription",
    categoryKey: "Summary",
    formats: ["PDF"],
  },
];

// Historique des rapports générés (mis à jour pour utiliser des clés de traduction pour le nom)
const reportHistoryData = [
  {
    id: "RPT001",
    reportTypeID: "monthly_sales", // Lien vers le type de rapport
    period: "Décembre 2024", // À traduire via date-fns
    generatedDate: "2025-01-02",
    format: "PDF",
    size: "2.3 MB",
    status: "completed",
  },
  {
    id: "RPT002",
    reportTypeID: "receivables_status",
    period: "31 Décembre 2024",
    generatedDate: "2025-01-02",
    format: "Excel",
    size: "156 KB",
    status: "completed",
  },
  {
    id: "RPT003",
    reportTypeID: "cash_journal",
    period: "Décembre 2024",
    generatedDate: "2025-01-01",
    format: "PDF",
    size: "1.8 MB",
    status: "completed",
  },
];

export function SettingsReportsTab() {
  // Initialisez votre hook de langue personnalisé
  const { t, locale } = useLanguage(); 

  const [selectedReport, setSelectedReport] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [isGenerating, setIsGenerating] = useState(false)
  const [dateFnsLocale, setDateFnsLocale] = useState<DateFnsLocale | null>(null);

  // Charger dynamiquement la locale de date-fns
  useEffect(() => {
    async function loadDateFnsLocale() {
      if (locale === 'fr') {
        const { fr } = await import('date-fns/locale');
        setDateFnsLocale(fr);
      } else if (locale === 'ar') {
        const { ar } = await import('date-fns/locale');
        setDateFnsLocale(ar);
      }
    }
    loadDateFnsLocale();
  }, [locale]);


  const handleGenerateReport = async () => {
    if (!selectedReport || !selectedFormat) return

    setIsGenerating(true)
    // Simulation de génération de rapport
    setTimeout(() => {
      setIsGenerating(false)
      // Utilisez la traduction pour le message d'alerte
      alert(t('SettingsReportsTab.reportGenerationSuccessAlert')); 
    }, 2000)
  }

  const selectedReportData = reportTypesConfig.find((r) => r.id === selectedReport);

  // Fonctions pour traduire les noms de rapports et catégories
  const getTranslatedReportName = (id: string) => {
    const report = reportTypesConfig.find(r => r.id === id);
    return report ? t(`SettingsReportsTab.reportTypes.${report.nameKey}`) : id;
  };
  const getTranslatedReportDescription = (id: string) => {
    const report = reportTypesConfig.find(r => r.id === id);
    return report ? t(`SettingsReportsTab.reportTypes.${report.descriptionKey}`) : '';
  };
  const getTranslatedCategoryName = (categoryKey: string) => {
    return t(`SettingsReportsTab.categories.${categoryKey}`) || categoryKey;
  };


  return (
    <div className="space-y-6">
      {/* Générateur de rapports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('SettingsReportsTab.reportGeneratorTitle')}
            {/* InfoTooltip est un composant qui doit utiliser useLanguage en interne pour traduire son 'content' */}
            <InfoTooltip content={t('SettingsReportsTab.infoTooltipContent.generator')} />
          </CardTitle>
          <CardDescription>
            {t('SettingsReportsTab.reportGeneratorDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('SettingsReportsTab.reportTypeLabel')}</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder={t('SettingsReportsTab.selectReportPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {reportTypesConfig.map((report) => (
                    <SelectItem key={report.id} value={report.id}>
                      {getTranslatedReportName(report.id)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('SettingsReportsTab.formatLabel')}</label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat} disabled={!selectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder={t('SettingsReportsTab.chooseFormatPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {selectedReportData?.formats.map((formatOption) => (
                    <SelectItem key={formatOption} value={formatOption.toLowerCase()}>
                      {formatOption} {/* PDF, Excel sont des termes universels, mais si besoin, on pourrait les traduire aussi */}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedReportData && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{getTranslatedCategoryName(selectedReportData.categoryKey)}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{getTranslatedReportDescription(selectedReportData.id)}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('SettingsReportsTab.periodLabel')}</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-start font-normal"> {/* `text-start` pour alignement compatible RTL */}
                  <CalendarIcon className="me-2 h-4 w-4" /> {/* `me-2` pour margin-end (compatible RTL) */}
                  {dateRange?.from && dateFnsLocale ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd MMM yyyy", { locale: dateFnsLocale })} -{" "}
                        {format(dateRange.to, "dd MMM yyyy", { locale: dateFnsLocale })}
                      </>
                    ) : (
                      format(dateRange.from, "dd MMM yyyy", { locale: dateFnsLocale })
                    )
                  ) : (
                    <span>{t('SettingsReportsTab.selectPeriodPlaceholder')}</span>
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
                  locale={dateFnsLocale || undefined} // Utilisez la locale chargée
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
              <Download className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
              {isGenerating ? t('SettingsReportsTab.generatingReportButton') : t('SettingsReportsTab.generateReportButton')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Historique des rapports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('SettingsReportsTab.reportHistoryTitle')}
            {/* InfoTooltip doit utiliser useLanguage en interne */}
            <InfoTooltip content={t('SettingsReportsTab.infoTooltipContent.history')} />
          </CardTitle>
          <CardDescription>
            {t('SettingsReportsTab.reportHistoryDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('SettingsReportsTab.tableHeaders.report')}</TableHead>
                <TableHead>{t('SettingsReportsTab.tableHeaders.period')}</TableHead>
                <TableHead>{t('SettingsReportsTab.tableHeaders.generationDate')}</TableHead>
                <TableHead>{t('SettingsReportsTab.tableHeaders.format')}</TableHead>
                <TableHead>{t('SettingsReportsTab.tableHeaders.size')}</TableHead>
                <TableHead>{t('SettingsReportsTab.tableHeaders.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportHistoryData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{getTranslatedReportName(report.reportTypeID)}</TableCell>
                  <TableCell>{report.period}</TableCell> {/* Les périodes comme "Décembre 2024" peuvent être laissées comme telles ou traduire la partie mois */}
                  <TableCell>{report.generatedDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.format}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{report.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 me-1" /> {/* `me-1` pour margin-end (compatible RTL) */}
                        {t('SettingsReportsTab.viewButton')}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 me-1" /> {/* `me-1` pour margin-end (compatible RTL) */}
                        {t('SettingsReportsTab.downloadButton')}
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
            <CardTitle className="text-lg">{t('SettingsReportsTab.predefinedReports.monthlyStandardTitle')}</CardTitle>
            <CardDescription>{t('SettingsReportsTab.predefinedReports.monthlyStandardDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
              {t('SettingsReportsTab.predefinedReports.generatePdfButton')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('SettingsReportsTab.predefinedReports.receivablesStatusTitle')}</CardTitle>
            <CardDescription>{t('SettingsReportsTab.predefinedReports.receivablesStatusDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
              {t('SettingsReportsTab.predefinedReports.generateExcelButton')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('SettingsReportsTab.predefinedReports.cashJournalTitle')}</CardTitle>
            <CardDescription>{t('SettingsReportsTab.predefinedReports.cashJournalDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
              {t('SettingsReportsTab.predefinedReports.generatePdfButton')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Informations utiles */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">{t('SettingsReportsTab.usefulInfoTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 space-y-2">
          <p>• {t('SettingsReportsTab.usefulInfoPoint1')}</p>
          <p>• {t('SettingsReportsTab.usefulInfoPoint2')}</p>
          <p>• {t('SettingsReportsTab.usefulInfoPoint3')}</p>
          <p>• {t('SettingsReportsTab.usefulInfoPoint4')}</p>
        </CardContent>
      </Card>
    </div>
  )
}