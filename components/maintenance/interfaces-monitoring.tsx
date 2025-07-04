"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer, Activity, Wifi, RefreshCw, Trash2, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function InterfacesMonitoring() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  // Les noms d'interfaces, leurs dernières communications et détails sont maintenant des clés pour la traduction
  const interfacesConfig = [
    { nameKey: "labelPrinter", status: "ok", icon: Printer, lastCommunicationKey: "lastComm2MinAgo", detailsKey: "readyDetails" },
    { nameKey: "rocheCobasAutomate", status: "ok", icon: Activity, lastCommunicationKey: "lastComm30SecAgo", detailsKey: "analysisInProgressDetails" },
    { nameKey: "receptionScanner", status: "warning", icon: Wifi, lastCommunicationKey: "lastComm5MinAgo", detailsKey: "lowBatteryDetails" },
    { nameKey: "hematologyAutomate", status: "error", icon: Activity, lastCommunicationKey: "lastComm15MinAgo", detailsKey: "communicationErrorDetails" },
  ];

  // Les messages de log sont aussi des clés pour la traduction
  const recentLogsConfig = [
    { timestamp: "14:32:15", interfaceNameKey: "rocheCobasAutomate", type: "info", messageKey: "analysisCompletedMessage", messageValues: { sampleId: "#A12345" } },
    { timestamp: "14:30:22", interfaceNameKey: "receptionScanner", type: "warning", messageKey: "lowBatteryDetectedMessage" },
    { timestamp: "14:28:45", interfaceNameKey: "hematologyAutomate", type: "error", messageKey: "connectionTimeoutMessage" },
    { timestamp: "14:25:10", interfaceNameKey: "labelPrinter", type: "info", messageKey: "labelPrintedMessage", messageValues: { patientId: "#P67890" } },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t('InterfacesMonitoring.statusOperational')}</Badge>
      case "warning": return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{t('InterfacesMonitoring.statusWarning')}</Badge>
      case "error": return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{t('InterfacesMonitoring.statusError')}</Badge>
      default: return <Badge variant="secondary">{t('InterfacesMonitoring.statusUnknown')}</Badge>
    }
  };

  const getLogTypeBadge = (type: string) => {
    switch (type) {
      case "info": return <Badge variant="outline" className="text-blue-600 border-blue-200">{t('InterfacesMonitoring.logTypeInfo')}</Badge>
      case "warning": return <Badge variant="outline" className="text-orange-600 border-orange-200">{t('InterfacesMonitoring.logTypeWarning')}</Badge>
      case "error": return <Badge variant="outline" className="text-red-600 border-red-200">{t('InterfacesMonitoring.logTypeError')}</Badge>
      default: return <Badge variant="outline">{t('InterfacesMonitoring.logTypeLog')}</Badge>
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('InterfacesMonitoring.title')}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content est traduit directement ici */}
                <p>{t('InterfacesMonitoring.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">{t('InterfacesMonitoring.description')}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>{t('InterfacesMonitoring.equipmentSchemaTitle')}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('InterfacesMonitoring.equipmentSchemaTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interfacesConfig.map((interface_, index) => (
                <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                  <interface_.icon className={`h-8 w-8 mx-auto mb-2 ${interface_.status === "ok" ? "text-green-500" : interface_.status === "warning" ? "text-orange-500" : "text-red-500"}`}/>
                  <div className="font-medium text-sm mb-1">{t(`InterfacesMonitoring.interfaceNames.${interface_.nameKey}`)}</div>
                  {getStatusBadge(interface_.status)}
                  <div className="text-xs text-gray-500 mt-2">{t(`InterfacesMonitoring.interfaceDetails.${interface_.detailsKey}`)}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
                {t('InterfacesMonitoring.relaunchConnectionsButton')}
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
                {t('InterfacesMonitoring.purgeQueueButton')}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>{t('InterfacesMonitoring.realtimeLogsTitle')}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('InterfacesMonitoring.realtimeLogsTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">{t('InterfacesMonitoring.tableHeaders.time')}</TableHead>
                  <TableHead>{t('InterfacesMonitoring.tableHeaders.interface')}</TableHead>
                  <TableHead>{t('InterfacesMonitoring.tableHeaders.type')}</TableHead>
                  <TableHead>{t('InterfacesMonitoring.tableHeaders.message')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLogsConfig.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{t(`InterfacesMonitoring.interfaceNames.${log.interfaceNameKey}`)}</TableCell>
                    <TableCell>{getLogTypeBadge(log.type)}</TableCell>
                    <TableCell className="text-sm">
                      {t(`InterfacesMonitoring.logMessages.${log.messageKey}`, {
                        sampleId: log.messageValues?.sampleId,
                        patientId: log.messageValues?.patientId,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}