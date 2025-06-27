import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SecurityAlertsWidget() {
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "5 tentatives de connexion échouées pour l'utilisateur caisse01",
      time: "Il y a 2h",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      message: "Accès au dossier du patient #1234 en dehors des heures de travail par admin_cfo",
      time: "Il y a 4h",
      severity: "low",
    },
    {
      id: 3,
      type: "warning",
      message: "Tentative d'accès à la base de données depuis une IP inconnue",
      time: "Il y a 6h",
      severity: "high",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Élevé</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Moyen</Badge>
      case "low":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Faible</Badge>
      default:
        return <Badge variant="secondary">Info</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">Alertes de Sécurité Récentes</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Événements de sécurité récents :<br />
                  Tentatives de connexion, accès suspects.
                  <br />
                  Classés par niveau de sévérité (Élevé/Moyen/Faible).
                </p>
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
                  <Clock className="h-3 w-3 mr-1" />
                  {alert.time}
                </div>
              </div>
              <p className="text-sm text-gray-700">{alert.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            Voir le journal d'audit complet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
