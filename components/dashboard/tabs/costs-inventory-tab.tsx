"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Package, TrendingDown, RotateCcw } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées
const inventoryData = [
  {
    category: "Réactifs Hématologie",
    currentValue: 12000,
    expiredValue: 800,
    turnoverRate: 4.2,
    status: "good",
  },
  {
    category: "Réactifs Biochimie",
    currentValue: 15000,
    expiredValue: 1200,
    turnoverRate: 3.8,
    status: "warning",
  },
  {
    category: "Consommables",
    currentValue: 8000,
    expiredValue: 200,
    turnoverRate: 6.1,
    status: "good",
  },
  {
    category: "Réactifs Immunologie",
    currentValue: 10000,
    expiredValue: 1500,
    turnoverRate: 2.1,
    status: "critical",
  },
]

const expirationData = [
  { period: "0-30 jours", value: 1850, items: 12 },
  { period: "31-60 jours", value: 3200, items: 18 },
  { period: "61-90 jours", value: 2100, items: 8 },
  { period: "> 90 jours", value: 38850, items: 156 },
]

export function CostsInventoryTab() {
  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.currentValue, 0)
  const totalExpiredValue = inventoryData.reduce((sum, item) => sum + item.expiredValue, 0)
  const averageTurnover = inventoryData.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryData.length

  return (
    <div className="space-y-6">
      {/* KPIs du stock */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Valeur Totale Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {totalInventoryValue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              Stock Périmé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">€ {totalExpiredValue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">
              {((totalExpiredValue / totalInventoryValue) * 100).toFixed(1)}% du stock total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Taux de Rotation Moyen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTurnover.toFixed(1)}x</div>
            <div className="text-sm text-muted-foreground">par an</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-orange-600" />
              Perte Mensuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">€ 650</div>
            <div className="text-sm text-muted-foreground">Produits périmés</div>
          </CardContent>
        </Card>
      </div>

      {/* Analyse par catégorie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Gestion du Stock par Catégorie
            <InfoTooltip content="Analyse financière de votre stock par catégorie de produits. Surveillez les pertes dues aux péremptions et optimisez vos commandes." />
          </CardTitle>
          <CardDescription>Valeur, péremption et rotation par catégorie de produits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-right">Valeur Actuelle</TableHead>
                <TableHead className="text-right">Valeur Périmée</TableHead>
                <TableHead className="text-right">% Perte</TableHead>
                <TableHead className="text-right">Taux Rotation</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => {
                const lossPercentage = (item.expiredValue / item.currentValue) * 100

                return (
                  <TableRow key={item.category}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-right">€ {item.currentValue.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-red-600">€ {item.expiredValue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={lossPercentage > 10 ? "destructive" : lossPercentage > 5 ? "outline" : "secondary"}
                      >
                        {lossPercentage.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{item.turnoverRate}x</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "good" ? "default" : item.status === "warning" ? "outline" : "destructive"
                        }
                      >
                        {item.status === "good" ? "Bon" : item.status === "warning" ? "Attention" : "Critique"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Analyse des expirations */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Produits par Échéance
              <InfoTooltip content="Répartition de votre stock selon les dates d'expiration. Planifiez vos actions pour minimiser les pertes financières." />
            </CardTitle>
            <CardDescription>Répartition du stock selon les dates d'expiration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expirationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€ ${value?.toLocaleString()}`, "Valeur"]} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Actions Prioritaires
              <InfoTooltip content="Recommandations automatiques basées sur l'analyse de votre stock. Suivez ces conseils pour réduire les pertes et améliorer la rentabilité." />
            </CardTitle>
            <CardDescription>Mesures à prendre pour optimiser le stock</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                <AlertTriangle className="h-4 w-4" />
                Urgent - 0-30 jours
              </div>
              <div className="text-sm text-red-700">
                <div>€ 1,850 de produits expirent bientôt</div>
                <div>12 références à écouler rapidement</div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-800 font-medium mb-2">
                <Package className="h-4 w-4" />
                Attention - 31-60 jours
              </div>
              <div className="text-sm text-orange-700">
                <div>€ 3,200 à surveiller</div>
                <div>Planifier les promotions</div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Recommandation :</strong> Revoir les quantités de commande pour les réactifs d'immunologie
                (rotation trop lente).
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicateurs de performance */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Catégorie la Plus Efficace</CardTitle>
            <CardDescription>Meilleur taux de rotation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Consommables</div>
            <div className="text-muted-foreground">6.1x par an</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Catégorie Problématique</CardTitle>
            <CardDescription>Plus fort taux de perte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Immunologie</div>
            <div className="text-muted-foreground">15% de perte</div>
            <Progress value={15} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Économies Potentielles</CardTitle>
            <CardDescription>Optimisation des commandes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€ 2,400</div>
            <div className="text-muted-foreground">par mois</div>
            <div className="text-sm text-green-600 mt-2">Réduction des pertes de 60%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
