import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Printer, Activity, Wifi, RefreshCw, Trash2, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function InterfacesMonitoring() {
  const interfaces = [
    {
      name: "Imprimante étiquettes",
      status: "ok",
      icon: Printer,
      lastCommunication: "Il y a 2 min",
      details: "Prête",
    },
    {
      name: "Automate Roche Cobas",
      status: "ok",
      icon: Activity,
      lastCommunication: "Il y a 30 sec",
      details: "En cours d'analyse",
    },
    {
      name: "Scanner accueil",
      status: "warning",
      icon: Wifi,
      lastCommunication: "Il y a 5 min",
      details: "Batterie faible (15%)",
    },
    {
      name: "Automate Hématologie",
      status: "error",
      icon: Activity,
      lastCommunication: "Il y a 15 min",
      details: "Erreur de communication",
    },
  ]

  const recentLogs = [
    {
      timestamp: "14:32:15",
      interface: "Roche Cobas",
      type: "info",
      message: "Analyse terminée - Échantillon #A12345",
    },
    {
      timestamp: "14:30:22",
      interface: "Scanner",
      type: "warning",
      message: "Niveau de batterie faible détecté",
    },
    {
      timestamp: "14:28:45",
      interface: "Hématologie",
      type: "error",
      message: "Timeout de connexion - Tentative de reconnexion",
    },
    {
      timestamp: "14:25:10",
      interface: "Imprimante",
      type: "info",
      message: "Étiquette imprimée - Patient #P67890",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Opérationnel</Badge>
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Avertissement</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Erreur</Badge>
      default:
        return <Badge variant="secondary">Inconnu</Badge>
    }
  }

  const getLogTypeBadge = (type: string) => {
    switch (type) {
      case "info":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Info
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            Warning
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">Log</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Surveillance des Interfaces Matérielles</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Monitoring en temps réel des équipements connectés au laboratoire.
                  <br />
                  Surveillance des automates d'analyse, imprimantes, scanners
                  <br />
                  et gestion des communications avec les interfaces matérielles.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">Monitoring des équipements et automates connectés</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Schéma des Équipements</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Vue d'ensemble des équipements connectés :<br />
                      Vert = Opérationnel, Orange = Avertissement, Rouge = Erreur.
                      <br />
                      Cliquez sur un équipement pour plus de détails.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interfaces.map((interface_, index) => (
                <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                  <interface_.icon
                    className={`h-8 w-8 mx-auto mb-2 ${
                      interface_.status === "ok"
                        ? "text-green-500"
                        : interface_.status === "warning"
                          ? "text-orange-500"
                          : "text-red-500"
                    }`}
                  />
                  <div className="font-medium text-sm mb-1">{interface_.name}</div>
                  {getStatusBadge(interface_.status)}
                  <div className="text-xs text-gray-500 mt-2">{interface_.details}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Relancer les connexions
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Purger la file d'attente
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Logs de Communication en Temps Réel</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Journal des communications avec les équipements :<br />
                      Info = Normal, Warning = Attention, Error = Problème.
                      <br />
                      Mise à jour automatique toutes les 30 secondes.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Heure</TableHead>
                  <TableHead>Interface</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{log.interface}</TableCell>
                    <TableCell>{getLogTypeBadge(log.type)}</TableCell>
                    <TableCell className="text-sm">{log.message}</TableCell>
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
