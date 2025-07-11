"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Server, Activity, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ServerStatusWidget() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  const serverData = {
    status: "operational",
    cpu: 45,
    ram: 68,
    disk: 23,
  }

  // getStatusColor et getProgressColor sont des fonctions de style, elles n'ont pas besoin de traduction.

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">
            {t('ServerStatusWidget.title')}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content is directly translated here */}
                <p>{t('ServerStatusWidget.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          {/* getStatusColor est une fonction de style, pas besoin de traduction */}
          <div className={`w-3 h-3 rounded-full ${getStatusColor(serverData.status)}`} />
          <Server className="h-5 w-5 text-gray-600" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t('ServerStatusWidget.cpuLoadLabel')}</span>
              <span className="font-medium">{serverData.cpu}%</span>
            </div>
            <Progress value={serverData.cpu} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t('ServerStatusWidget.ramUsageLabel')}</span>
              <span className="font-medium">{serverData.ram}%</span>
            </div>
            <Progress value={serverData.ram} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>{t('ServerStatusWidget.diskSpaceLabel')}</span>
              <span className="font-medium">{serverData.disk}%</span>
            </div>
            <Progress value={serverData.disk} className="h-2" />
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full bg-transparent">
          <Activity className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
          {t('ServerStatusWidget.detailedProcessViewButton')}
        </Button>
      </CardContent>
    </Card>
  )
}

// Ces fonctions sont des utilitaires de style, pas besoin de les traduire.
const getStatusColor = (status: string) => {
  switch (status) {
    case "operational":
      return "bg-green-500"
    case "warning":
      return "bg-orange-500"
    case "critical":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getProgressColor = (value: number) => {
  if (value < 50) return "bg-green-500"
  if (value < 80) return "bg-orange-500"
  return "bg-red-500"
}