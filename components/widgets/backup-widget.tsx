"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HardDrive, Clock, Play, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function BackupWidget() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  // Note: 'Hier à 23:00' et 'Aujourd'hui à 23:00' sont des chaînes statiques ici.
  // Pour une vraie i18n, vous devriez calculer et formater ces dates dynamiquement.
  const backupData = {
    lastBackup: t('BackupWidget.lastBackupTime'), // Traduire le temps aussi
    status: "success", // La clé du statut sera utilisée pour la traduction du badge
    nextBackup: t('BackupWidget.nextBackupTime'), // Traduire le temps aussi
    size: "2.3 GB", // Garder l'unité GB, ou traduire aussi si besoin
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-medium">
            {t('BackupWidget.title')}
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content is directly translated here */}
                <p>{t('BackupWidget.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <HardDrive className="h-5 w-5 text-gray-600" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('BackupWidget.lastBackupLabel')}</span>
            <div className="text-end"> {/* `text-end` pour alignement compatible RTL */}
              <div className="text-sm font-medium">{backupData.lastBackup}</div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                {t(`BackupWidget.status_${backupData.status}`)} {/* Traduire le statut du badge */}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('BackupWidget.nextBackupLabel')}</span>
            <div className="text-end"> {/* `text-end` pour alignement compatible RTL */}
              <div className="text-sm font-medium">{backupData.nextBackup}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('BackupWidget.lastBackupSizeLabel')}</span>
            <span className="text-sm font-medium">{backupData.size}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Clock className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
            {t('BackupWidget.historyButton')}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Play className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
            {t('BackupWidget.manualBackupButton')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}