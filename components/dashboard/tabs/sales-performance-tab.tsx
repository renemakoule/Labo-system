"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

const analysisData = [
  { name: "Hémogramme", count: 450, price: 25000, revenue: 11250000, percentage: 35 },
  { name: "Glycémie", count: 380, price: 15000, revenue: 5700000, percentage: 18 },
  { name: "Créatinine", count: 320, price: 20000, revenue: 6400000, percentage: 20 },
  { name: "Cholestérol", count: 280, price: 30000, revenue: 8400000, percentage: 26 },
  { name: "TSH", count: 150, price: 45000, revenue: 6750000, percentage: 21 },
]

export function SalesPerformanceTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Analyse de Pareto - Performance des Analyses</CardTitle>
          <CardDescription>Distribution du chiffre d'affaires par type d'analyse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <Tooltip formatter={(value) => `${value?.toLocaleString()} FCFA`} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="CA (FCFA)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle className="flex items-center gap-2">Détail des Analyses</CardTitle><CardDescription>Performance détaillée par type d'analyse</CardDescription></div>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Exporter CSV</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Nom de l'analyse</TableHead><TableHead className="text-right">Nombre réalisé</TableHead><TableHead className="text-right">Prix unitaire</TableHead><TableHead className="text-right">CA Total</TableHead></TableRow></TableHeader>
            <TableBody>{analysisData.map((analysis) => (<TableRow key={analysis.name}><TableCell className="font-medium">{analysis.name}</TableCell><TableCell className="text-right">{analysis.count}</TableCell><TableCell className="text-right">{analysis.price.toLocaleString()} FCFA</TableCell><TableCell className="text-right font-medium">{analysis.revenue.toLocaleString()} FCFA</TableCell></TableRow>))}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}