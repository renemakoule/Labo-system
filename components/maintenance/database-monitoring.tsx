"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database, Zap, Settings, Play, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DatabaseMonitoring() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  // Les données statiques pour dbStats.uptime doivent être des clés de traduction
  const dbStats = {
    size: "15.2 GB", // Peut être traduit aussi si l'unité change
    queriesPerSecond: 45,
    connections: 12,
    uptimeKey: "uptimeValue", // Clé de traduction pour le temps de fonctionnement
  };

  // Les requêtes lentes seront traduites via leurs détails
  const slowQueries = [
    {
      query: "SELECT * FROM patients WHERE...", // La requête elle-même reste en code, mais le message d'impact est traduit
      duration: "2.3s",
      frequency: "15/min",
      impact: "high", // Clé pour la traduction de l'impact
    },
    {
      query: "UPDATE factures SET status...",
      duration: "1.8s",
      frequency: "8/min",
      impact: "medium",
    },
    {
      query: "SELECT COUNT(*) FROM resultats...",
      duration: "1.2s",
      frequency: "25/min",
      impact: "medium",
    },
  ];

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">{t('DatabaseMonitoring.impactHigh')}</span>
      case "medium":
        return <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">{t('DatabaseMonitoring.impactMedium')}</span>
      case "low":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">{t('DatabaseMonitoring.impactLow')}</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">{t('DatabaseMonitoring.impactUnknown')}</span>
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('DatabaseMonitoring.title')}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content est traduit directement ici */}
                <p>{t('DatabaseMonitoring.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">{t('DatabaseMonitoring.description')}</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">{t('DatabaseMonitoring.dbSizeLabel')}</span>
              </div>
              <div className="text-2xl font-bold">{dbStats.size}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">{t('DatabaseMonitoring.queriesPerSecondLabel')}</span>
              </div>
              <div className="text-2xl font-bold">{dbStats.queriesPerSecond}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">{t('DatabaseMonitoring.connectionsLabel')}</span>
              </div>
              <div className="text-2xl font-bold">{dbStats.connections}</div>
              <Progress value={dbStats.connections * 5} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">{t('DatabaseMonitoring.uptimeLabel')}</span>
              </div>
              <div className="text-lg font-bold">{t(`DatabaseMonitoring.uptimeValues.${dbStats.uptimeKey}`)}</div> {/* Traduire le temps de fonctionnement */}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>{t('DatabaseMonitoring.slowQueriesTitle')}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('DatabaseMonitoring.slowQueriesTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button variant="outline" size="sm">
              {t('DatabaseMonitoring.optimizeAutomaticallyButton')}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('DatabaseMonitoring.tableHeaders.query')}</TableHead>
                  <TableHead>{t('DatabaseMonitoring.tableHeaders.averageDuration')}</TableHead>
                  <TableHead>{t('DatabaseMonitoring.tableHeaders.frequency')}</TableHead>
                  <TableHead>{t('DatabaseMonitoring.tableHeaders.impact')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slowQueries.map((query, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm max-w-[300px] truncate">{query.query}</TableCell>
                    <TableCell className="font-medium">{query.duration}</TableCell>
                    <TableCell>{query.frequency}</TableCell>
                    <TableCell>{getImpactBadge(query.impact)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>{t('DatabaseMonitoring.maintenanceTasksTitle')}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('DatabaseMonitoring.maintenanceTasksTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Database className="h-6 w-6" />
                <span>{t('DatabaseMonitoring.reindexingTaskTitle')}</span>
                <span className="text-xs text-gray-500">{t('DatabaseMonitoring.reindexingTaskLastRun')}</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Settings className="h-6 w-6" />
                <span>{t('DatabaseMonitoring.cleanupTaskTitle')}</span>
                <span className="text-xs text-gray-500">{t('DatabaseMonitoring.cleanupTaskLastRun')}</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Zap className="h-6 w-6" />
                <span>{t('DatabaseMonitoring.optimizationTaskTitle')}</span>
                <span className="text-xs text-gray-500">{t('DatabaseMonitoring.optimizationTaskLastRun')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}