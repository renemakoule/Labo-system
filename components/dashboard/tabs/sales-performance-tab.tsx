"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées
const analysisData = [
  { name: "Hémogramme", count: 450, price: 25, revenue: 11250, percentage: 35 },
  { name: "Glycémie", count: 380, price: 15, revenue: 5700, percentage: 18 },
  { name: "Créatinine", count: 320, price: 20, revenue: 6400, percentage: 20 },
  { name: "Cholestérol", count: 280, price: 30, revenue: 8400, percentage: 26 },
  { name: "TSH", count: 150, price: 45, revenue: 6750, percentage: 21 },
]

const paretoData = analysisData.map((item, index) => ({
  ...item,
  cumulative: analysisData.slice(0, index + 1).reduce((sum, curr) => sum + curr.percentage, 0),
}))

export function SalesPerformanceTab() {
  return (
    <div className="space-y-6">
      {/* Graphique Pareto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Analyse de Pareto - Performance des Analyses
            <InfoTooltip content="Le principe de Pareto montre que 20% de vos analyses génèrent 80% de votre chiffre d'affaires. Concentrez vos efforts sur ces analyses les plus rentables." />
          </CardTitle>
          <CardDescription>Distribution du chiffre d'affaires par type d'analyse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paretoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--primary))" name="CA (€)" />
                <LineChart>
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cumulative"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    name="% Cumulé"
                  />
                </LineChart>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tableau détaillé */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Détail des Analyses
              <InfoTooltip content="Tableau détaillé de toutes vos analyses avec leur performance financière. Utilisez ces données pour ajuster vos prix et optimiser votre offre de services." />
            </CardTitle>
            <CardDescription>Performance détaillée par type d'analyse</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de l'analyse</TableHead>
                <TableHead className="text-right">Nombre réalisé</TableHead>
                <TableHead className="text-right">Prix unitaire</TableHead>
                <TableHead className="text-right">CA Total</TableHead>
                <TableHead className="text-right">% du CA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysisData.map((analysis) => (
                <TableRow key={analysis.name}>
                  <TableCell className="font-medium">{analysis.name}</TableCell>
                  <TableCell className="text-right">{analysis.count}</TableCell>
                  <TableCell className="text-right">€ {analysis.price}</TableCell>
                  <TableCell className="text-right font-medium">€ {analysis.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{analysis.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top 3 Analyses</CardTitle>
            <CardDescription>Génèrent 73% du CA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Hémogramme</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Cholestérol</span>
                <span className="font-medium">26%</span>
              </div>
              <div className="flex justify-between">
                <span>Créatinine</span>
                <span className="font-medium">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analyse la Plus Rentable</CardTitle>
            <CardDescription>Prix unitaire le plus élevé</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">TSH</div>
            <div className="text-muted-foreground">€ 45 / analyse</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Volume Total</CardTitle>
            <CardDescription>Analyses réalisées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,580</div>
            <div className="text-muted-foreground">analyses ce mois</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
