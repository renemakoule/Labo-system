"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ConnectionsWidget() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  // Les noms de connexion et messages d'erreur sont maintenant des clés pour la traduction
  const connections = [
    { nameKey: "dbConnection", status: "ok", icon: CheckCircle },
    { nameKey: "internetConnection", status: "ok", icon: CheckCircle },
    { nameKey: "hematologyAutomateInterface", status: "ok", icon: CheckCircle },
    { nameKey: "biochemistryAutomateInterface", status: "error", icon: XCircle, errorKey: "connectionTimeoutError" },
    { nameKey: "labelPrinter", status: "warning", icon: AlertTriangle, errorKey: "lowInkError" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t('ConnectionsWidget.status_ok')}</Badge>
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{t('ConnectionsWidget.status_warning')}</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{t('ConnectionsWidget.status_error')}</Badge>
      default:
        return <Badge variant="secondary">{t('ConnectionsWidget.status_unknown')}</Badge>
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">
            {t('ConnectionsWidget.title')}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content is directly translated here */}
                <p>{t('ConnectionsWidget.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {connections.map((connection, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <connection.icon
                  className={`h-5 w-5 ${
                    connection.status === "ok"
                      ? "text-green-500"
                      : connection.status === "warning"
                        ? "text-orange-500"
                        : "text-red-500"
                  }`}
                />
                <div>
                  {/* Traduire le nom de la connexion */}
                  <div className="font-medium text-sm">{t(`ConnectionsWidget.connectionNames.${connection.nameKey}`)}</div>
                  {/* Traduire le message d'erreur si présent */}
                  {connection.errorKey && <div className="text-xs text-gray-500">{t(`ConnectionsWidget.errorMessages.${connection.errorKey}`)}</div>}
                </div>
              </div>
              {getStatusBadge(connection.status)}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            {t('ConnectionsWidget.viewAllErrorLogsButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}