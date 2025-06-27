import { ServerStatusWidget } from "../widgets/server-status-widget"
import { ConnectionsWidget } from "../widgets/connections-widget"
import { BackupWidget } from "../widgets/backup-widget"
import { SecurityAlertsWidget } from "../widgets/security-alerts-widget"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Vue d'Ensemble - Statut du Système</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Centre de contrôle principal du laboratoire médical.
                  <br />
                  Surveillance en temps réel de tous les composants critiques :<br />
                  serveur, connexions, sauvegardes et alertes de sécurité.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">Centre de contrôle du laboratoire médical</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <ServerStatusWidget />
        <ConnectionsWidget />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BackupWidget />
        <SecurityAlertsWidget />
      </div>
    </div>
  )
}
