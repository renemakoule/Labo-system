import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HardDrive, Clock, Play, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function BackupWidget() {
  const backupData = {
    lastBackup: "Hier à 23:00",
    status: "success",
    nextBackup: "Aujourd'hui à 23:00",
    size: "2.3 GB",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">Statut des Sauvegardes</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Surveillance des sauvegardes automatiques :<br />
                  Dernière sauvegarde, prochaine planifiée.
                  <br />
                  Possibilité de lancer une sauvegarde manuelle.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <HardDrive className="h-5 w-5 text-gray-600" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Dernière sauvegarde</span>
            <div className="text-right">
              <div className="text-sm font-medium">{backupData.lastBackup}</div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">Réussie</Badge>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Prochaine sauvegarde</span>
            <div className="text-right">
              <div className="text-sm font-medium">{backupData.nextBackup}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Taille dernière sauvegarde</span>
            <span className="text-sm font-medium">{backupData.size}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Clock className="h-4 w-4 mr-2" />
            Historique
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Play className="h-4 w-4 mr-2" />
            Sauvegarde manuelle
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
