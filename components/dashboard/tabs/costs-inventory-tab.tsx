"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Package, TrendingDown, RotateCcw } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

const inventoryData = [
  { category: "Réactifs Hématologie", currentValue: 12000000, expiredValue: 800000, turnoverRate: 4.2, status: "good" },
  { category: "Réactifs Biochimie", currentValue: 15000000, expiredValue: 1200000, turnoverRate: 3.8, status: "warning" },
  { category: "Consommables", currentValue: 8000000, expiredValue: 200000, turnoverRate: 6.1, status: "good" },
  { category: "Réactifs Immunologie", currentValue: 10000000, expiredValue: 1500000, turnoverRate: 2.1, status: "critical" },
]

const expirationData = [
  { period: "0-30 jours", value: 1850000, items: 12 },
  { period: "31-60 jours", value: 3200000, items: 18 },
]

export function CostsInventoryTab() {
  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.currentValue, 0)
  const totalExpiredValue = inventoryData.reduce((sum, item) => sum + item.expiredValue, 0)
  const averageTurnover = inventoryData.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryData.length

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Package className="h-4 w-4" />Valeur Totale Stock</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalInventoryValue.toLocaleString()} FCFA</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-600" />Stock Périmé</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">{totalExpiredValue.toLocaleString()} FCFA</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><RotateCcw className="h-4 w-4" />Taux de Rotation Moyen</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{averageTurnover.toFixed(1)}x</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2"><TrendingDown className="h-4 w-4 text-orange-600" />Perte Mensuelle</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-orange-600">650,000 FCFA</div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2">Gestion du Stock par Catégorie</CardTitle><CardDescription>Valeur, péremption et rotation par catégorie</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Catégorie</TableHead><TableHead className="text-right">Valeur Actuelle</TableHead><TableHead className="text-right">Valeur Périmée</TableHead><TableHead>Statut</TableHead></TableRow></TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-right">{item.currentValue.toLocaleString()} FCFA</TableCell>
                  <TableCell className="text-right text-red-600">{item.expiredValue.toLocaleString()} FCFA</TableCell>
                  <TableCell><Badge variant={item.status === "good" ? "default" : item.status === "warning" ? "outline" : "destructive"}>{item.status === "good" ? "Bon" : item.status === "warning" ? "Attention" : "Critique"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}