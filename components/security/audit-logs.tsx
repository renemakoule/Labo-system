"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AuditLogs() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  // Les actions et détails sont remplacés par des clés pour la traduction
  const auditLogs = [
    {
      timestamp: "2024-01-15 14:32:15",
      user: "tech01",
      actionKey: "resultValidation",
      detailsKey: "resultDetails",
      detailsValues: { analysis: "Hémoglobine", patientId: "#P12345" },
      ip: "192.168.1.45",
      severity: "info",
    },
    {
      timestamp: "2024-01-15 14:28:42",
      user: "spec_dupont",
      actionKey: "patientFileConsultation",
      detailsKey: "patientIdDetails",
      detailsValues: { patientId: "#P67890" },
      ip: "192.168.1.23",
      severity: "info",
    },
    {
      timestamp: "2024-01-15 14:25:18",
      user: "cfo",
      actionKey: "invoiceModification",
      detailsKey: "invoiceModifiedDetails",
      detailsValues: { invoiceId: "#F54321" },
      ip: "192.168.1.12",
      severity: "warning",
    },
    {
      timestamp: "2024-01-15 14:20:05",
      user: "reception01",
      actionKey: "login",
      detailsKey: "loginSuccessDetails",
      ip: "192.168.1.67",
      severity: "info",
    },
    {
      timestamp: "2024-01-15 14:15:33",
      user: "unknown",
      actionKey: "failedLoginAttempt",
      detailsKey: "incorrectPasswordDetails",
      detailsValues: { user: "caisse01" },
      ip: "192.168.1.89",
      severity: "error",
    },
    {
      timestamp: "2024-01-15 14:10:22",
      user: "admin_cfo",
      actionKey: "patientFileConsultation",
      detailsKey: "offHoursAccessDetails",
      detailsValues: { patientId: "#P11111" },
      ip: "192.168.1.12",
      severity: "warning",
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "info":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {t('AuditLogs.severity_info')}
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            {t('AuditLogs.severity_warning')}
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            {t('AuditLogs.severity_error')}
          </Badge>
        )
      default:
        return <Badge variant="outline">{t('AuditLogs.severity_log')}</Badge>
    }
  };

  // Mappage des clés d'action pour l'affichage et les options du Select
  const actionOptions = [
    { value: "all", labelKey: "filterActionAll" },
    { value: "resultValidation", labelKey: "actionResultValidation" },
    { value: "patientFileConsultation", labelKey: "actionPatientFileConsultation" },
    { value: "invoiceModification", labelKey: "actionInvoiceModification" },
    { value: "login", labelKey: "actionLogin" },
    { value: "failedLoginAttempt", labelKey: "actionFailedLoginAttempt" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('AuditLogs.title')}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content est traduit directement ici */}
                <p>{t('AuditLogs.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">{t('AuditLogs.description')}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <CardTitle>{t('AuditLogs.auditLogsTitle')}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  {/* InfoTooltip content est traduit directement ici */}
                  <p>{t('AuditLogs.auditLogsTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> {/* `start-3` pour positionnement RTL */}
                <Input placeholder={t('AuditLogs.searchPlaceholder')} className="ps-10" /> {/* `ps-10` pour padding-inline-start */}
              </div>
            </div>

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={t('AuditLogs.userFilterPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('AuditLogs.filterUserAll')}</SelectItem>
                  <SelectItem value="tech01">tech01</SelectItem>
                  <SelectItem value="spec_dupont">spec_dupont</SelectItem>
                  <SelectItem value="cfo">cfo</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={t('AuditLogs.actionFilterPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {actionOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(`AuditLogs.${option.labelKey}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 me-2" /> {/* `me-2` for margin-inline-end */}
                {t('AuditLogs.filterButton')}
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 me-2" /> {/* `me-2` for margin-inline-end */}
                {t('AuditLogs.exportButton')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead> {/* Timestamp est un terme universel */}
                <TableHead>{t('AuditLogs.tableHeaders.user')}</TableHead>
                <TableHead>{t('AuditLogs.tableHeaders.action')}</TableHead>
                <TableHead>{t('AuditLogs.tableHeaders.details')}</TableHead>
                <TableHead>IP</TableHead> {/* IP est un terme universel */}
                <TableHead>{t('AuditLogs.tableHeaders.severity')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{t(`AuditLogs.actionNames.${log.actionKey}`)}</TableCell>
                  {/* Traduire les détails avec interpolation */}
                  <TableCell className="max-w-[300px] truncate">
                    {t(`AuditLogs.detailMessages.${log.detailsKey}`, {
                        analysis: log.detailsValues?.analysis,
                        patientId: log.detailsValues?.patientId,
                        invoiceId: log.detailsValues?.invoiceId,
                        user: log.detailsValues?.user
                    })}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-sm text-gray-500">
              {t('AuditLogs.paginationText', { start: 1, end: 6, total: 1247 })}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                {t('AuditLogs.previousButton')}
              </Button>
              <Button variant="outline" size="sm">
                {t('AuditLogs.nextButton')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}