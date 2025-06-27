import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ConnectionsWidget() {
  const connections = [
    { name: "Connexion Base de Données", status: "ok", icon: CheckCircle },
    { name: "Connexion Internet", status: "ok", icon: CheckCircle },
    { name: "Interface Automate Hématologie", status: "ok", icon: CheckCircle },
    { name: "Interface Automate Biochimie", status: "error", icon: XCircle, error: "Timeout de connexion" },
    { name: "Imprimante Étiquettes", status: "warning", icon: AlertTriangle, error: "Niveau d'encre faible" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">OK</Badge>
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Avertissement</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Erreur</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">État des Connexions Critiques</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Statut des connexions aux équipements critiques :<br />
                  Base de données, automates, imprimantes.
                  <br />
                  Rouge = Erreur critique nécessitant une intervention.
                </p>
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
                  <div className="font-medium text-sm">{connection.name}</div>
                  {connection.error && <div className="text-xs text-gray-500">{connection.error}</div>}
                </div>
              </div>
              {getStatusBadge(connection.status)}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            Voir tous les logs d'erreur
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
