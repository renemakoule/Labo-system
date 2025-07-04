"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SecurityAlertsWidget() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  // Les messages d'alerte et les temps sont maintenant des clés pour la traduction
  // Les IDs de patient comme #1234 sont des interpolations
  const alerts = [
    {
      id: 1,
      type: "warning",
      messageKey: "failedLoginAttempts", // Nouvelle clé pour le message
      messageValues: { attempts: 5, user: "caisse01" }, // Valeurs pour l'interpolation
      timeKey: "time2hAgo", // Nouvelle clé pour le temps
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      messageKey: "offHoursPatientAccess",
      messageValues: { patientId: "#1234", user: "admin_cfo" },
      timeKey: "time4hAgo",
      severity: "low",
    },
    {
      id: 3,
      type: "warning",
      messageKey: "unknownIpDbAccess",
      timeKey: "time6hAgo",
      severity: "high",
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{t('SecurityAlertsWidget.severity_high')}</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{t('SecurityAlertsWidget.severity_medium')}</Badge>
      case "low":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{t('SecurityAlertsWidget.severity_low')}</Badge>
      default:
        return <Badge variant="secondary">{t('SecurityAlertsWidget.severity_info')}</Badge>
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">
            {t('SecurityAlertsWidget.title')}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content is directly translated here */}
                <p>{t('SecurityAlertsWidget.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <AlertTriangle className="h-5 w-5 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                {getSeverityBadge(alert.severity)}
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 me-1" /> {/* `me-1` pour margin-inline-end */}
                  {t(`SecurityAlertsWidget.timeKeys.${alert.timeKey}`)} {/* Traduire le temps */}
                </div>
              </div>
              {/* Traduire le message d'alerte avec interpolation des valeurs */}
              <p className="text-sm text-gray-700">{t(`SecurityAlertsWidget.alertMessages.${alert.messageKey}`, alert.messageValues)}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            {t('SecurityAlertsWidget.viewFullAuditLogButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}