"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { ServerStatusWidget } from "../widgets/server-status-widget"
import { ConnectionsWidget } from "../widgets/connections-widget"
import { BackupWidget } from "../widgets/backup-widget"
import { SecurityAlertsWidget } from "../widgets/security-alerts-widget"
// Importez le composant InfoTooltip
import { InfoTooltip } from "@/components/dashboard/info-tooltip" 

// Les imports de Info, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
// ne sont plus nécessaires ici si vous utilisez InfoTooltip
// import { Info } from "lucide-react" 
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function OverviewTab() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('OverviewTab.title')}
          </h1>
          {/* Utilisez votre composant InfoTooltip ici */}
          <InfoTooltip contentKey="OverviewTab.infoTooltip" />
        </div>
        <p className="text-gray-600">
          {t('OverviewTab.description')}
        </p>
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