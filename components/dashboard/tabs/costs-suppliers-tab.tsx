"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées
const suppliersData = [
  { name: "BioLab Supplies", amount: 15000, percentage: 35, category: "Réactifs", transactions: 12 },
  { name: "MedEquip Pro", amount: 8500, percentage: 20, category: "Équipements", transactions: 3 },
  { name: "ChemReagents", amount: 7200, percentage: 17, category: "Réactifs", transactions: 8 },
  { name: "LabConsumables", amount: 6800, percentage: 16, category: "Consommables", transactions: 15 },
  { name: "TechService", amount: 5000, percentage: 12, category: "Maintenance", transactions: 4 },
]

const categoryData = [
  { name: "Réactifs", value: 22200, color: "hsl(var(--primary))" },
  { name: "Équipements", value: 8500, color: "hsl(var(--secondary))" },
  { name: "Consommables", value: 6800, color: "hsl(var(--accent))" },
  { name: "Maintenance", value: 5000, color: "hsl(var(--muted))" },
]

const monthlyTrend = [
  { month: "Oct", amount: 38000 },
  { month: "Nov", amount: 41000 },
  { month: "Déc", amount: 42500 },
  { month: "Jan", amount: 39000 },
]

export function CostsSuppliersTab() {
  const totalSpent = suppliersData.reduce((sum, supplier) => sum + supplier.amount, 0)

  return (
    <div className="space-y-6">
      {/* KPIs des dépenses */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {totalSpent.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Ce mois</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Principal Fournisseur</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">BioLab Supplies</div>
            <div className="text-sm text-muted-foreground">35% des dépenses</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nb Fournisseurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliersData.length}</div>
            <div className="text-sm text-muted-foreground">Ce mois</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Évolution vs Mois Dernier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">+8.2%</div>
            <div className="text-sm text-muted-foreground">€ 3,200 de plus</div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Top 5 Fournisseurs
              <InfoTooltip content="Vos principaux fournisseurs classés par volume de dépenses. Identifiez vos partenaires stratégiques et négociez de meilleures conditions." />
            </CardTitle>
            <CardDescription>Répartition des dépenses par fournisseur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={suppliersData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`€ ${value?.toLocaleString()}`, "Montant"]} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Répartition par Catégorie
              <InfoTooltip content="Distribution de vos coûts par type de dépense. Analysez la structure de vos coûts pour identifier les postes d'optimisation." />
            </CardTitle>
            <CardDescription>Distribution des coûts par type de dépense</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: €${value.toLocaleString()}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`€ ${value?.toLocaleString()}`, "Montant"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau détaillé */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Détail des Dépenses Fournisseurs
              <InfoTooltip content="Analyse complète de vos relations fournisseurs avec métriques de performance. Optimisez vos achats et réduisez vos coûts." />
            </CardTitle>
            <CardDescription>Analyse détaillée par fournisseur</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead className="text-right">% du Total</TableHead>
                <TableHead className="text-right">Nb Transactions</TableHead>
                <TableHead className="text-right">Montant Moyen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliersData.map((supplier) => (
                <TableRow key={supplier.name}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell className="text-right">€ {supplier.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{supplier.percentage}%</TableCell>
                  <TableCell className="text-right">{supplier.transactions}</TableCell>
                  <TableCell className="text-right">
                    € {Math.round(supplier.amount / supplier.transactions).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Évolution mensuelle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Évolution des Dépenses
            <InfoTooltip content="Tendance de vos dépenses sur les derniers mois. Détectez les variations anormales et ajustez votre budget en conséquence." />
          </CardTitle>
          <CardDescription>Tendance des dépenses sur les 4 derniers mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€ ${value?.toLocaleString()}`, "Dépenses"]} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Insights et recommandations */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Opportunité de Négociation</CardTitle>
            <CardDescription>Fournisseur principal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">BioLab Supplies</div>
            <div className="text-muted-foreground">€ 15,000 ce mois</div>
            <div className="text-sm text-blue-600 mt-2">Potentiel de réduction : 5-10%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Catégorie Dominante</CardTitle>
            <CardDescription>Plus gros poste de coût</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Réactifs</div>
            <div className="text-muted-foreground">52% des dépenses</div>
            <div className="text-sm text-orange-600 mt-2">Surveiller les prix du marché</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Diversification</CardTitle>
            <CardDescription>Répartition des risques</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bonne</div>
            <div className="text-muted-foreground">5 fournisseurs actifs</div>
            <div className="text-sm text-green-600 mt-2">Pas de dépendance critique</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
