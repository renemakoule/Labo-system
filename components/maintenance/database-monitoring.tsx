import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database, Zap, Settings, Play, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DatabaseMonitoring() {
  const dbStats = {
    size: "15.2 GB",
    queriesPerSecond: 45,
    connections: 12,
    uptime: "15 jours 8h 32min",
  }

  const slowQueries = [
    {
      query: "SELECT * FROM patients WHERE...",
      duration: "2.3s",
      frequency: "15/min",
      impact: "high",
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
  ]

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Élevé</span>
      case "medium":
        return <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">Moyen</span>
      case "low":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Faible</span>
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">Inconnu</span>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Monitoring Base de Données</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Surveillance et optimisation de la base de données du laboratoire.
                  <br />
                  Monitoring des performances, requêtes lentes, connexions actives
                  <br />
                  et outils de maintenance préventive pour assurer la stabilité.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">Surveillance et optimisation de la base de données</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Taille de la DB</span>
              </div>
              <div className="text-2xl font-bold">{dbStats.size}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Requêtes/sec</span>
              </div>
              <div className="text-2xl font-bold">{dbStats.queriesPerSecond}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium">Connexions</span>
              </div>
              <div className="text-2xl font-bold">{dbStats.connections}</div>
              <Progress value={dbStats.connections * 5} className="mt-2 h-1" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Uptime</span>
              </div>
              <div className="text-lg font-bold">{dbStats.uptime}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Requêtes les Plus Lentes</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Requêtes nécessitant une optimisation :<br />
                      Impact Élevé = Priorité critique.
                      <br />
                      L'optimisation automatique améliore les performances.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button variant="outline" size="sm">
              Optimiser automatiquement
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requête</TableHead>
                  <TableHead>Durée moyenne</TableHead>
                  <TableHead>Fréquence</TableHead>
                  <TableHead>Impact</TableHead>
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
              <CardTitle>Tâches de Maintenance</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Maintenance préventive de la base de données :<br />
                      Réindexation = Améliore les performances.
                      <br />
                      Nettoyage = Supprime les données temporaires.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Database className="h-6 w-6" />
                <span>Réindexation</span>
                <span className="text-xs text-gray-500">Dernière: Il y a 2 jours</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Settings className="h-6 w-6" />
                <span>Nettoyage</span>
                <span className="text-xs text-gray-500">Dernière: Il y a 1 semaine</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Zap className="h-6 w-6" />
                <span>Optimisation</span>
                <span className="text-xs text-gray-500">Dernière: Il y a 3 jours</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
