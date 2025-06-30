"use client"

import { KPICard } from "@/components/dashboard/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées
const treasuryData = [
  { date: "01/12", amount: 4500000 },
  { date: "05/12", amount: 4800000 },
  { date: "10/12", amount: 5200000 },
  { date: "15/12", amount: 4900000 },
  { date: "20/12", amount: 5500000 },
  { date: "25/12", amount: 5800000 },
  { date: "30/12", amount: 6200000 },
]

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* KPIs principaux */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Chiffre d'Affaires"
          value="12,543,000 FCFA"
          change={{ value: "+12.5% vs mois dernier", type: "positive" }}
          icon={DollarSign}
        >
          <div className="mt-3">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Objectif mensuel</span>
              <span>83%</span>
            </div>
            <Progress value={83} className="h-2" />
          </div>
        </KPICard>

        <KPICard
          title="Trésorerie Actuelle"
          value="6,200,000 FCFA"
          change={{ value: "+8.2% ce mois", type: "positive" }}
          icon={TrendingUp}
        />

        <KPICard
          title="Créances Clients"
          value="1,875,000 FCFA"
          change={{ value: "320,000 FCFA en retard", type: "negative" }}
          icon={Users}
        />

        <KPICard
          title="Marge Brute"
          value="68.5%"
          change={{ value: "+2.1% vs période précédente", type: "positive" }}
          icon={AlertTriangle}
        />
      </div>

      {/* Graphique de trésorerie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Évolution de la Trésorerie
            <InfoTooltip content="Ce graphique montre l'évolution quotidienne de votre trésorerie sur les 30 derniers jours. Il vous permet d'identifier les tendances et de prévoir les besoins de financement." />
          </CardTitle>
          <CardDescription>Évolution sur les 30 derniers jours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={treasuryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`${value?.toLocaleString()} FCFA`, "Trésorerie"]} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Créances en Retard
              <InfoTooltip content="Montant total des factures impayées dépassant la date d'échéance. Ces créances nécessitent un suivi prioritaire pour maintenir la trésorerie." />
            </CardTitle>
            <CardDescription>3 factures nécessitent un suivi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">320,000 FCFA</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Stock à Péremption
              <InfoTooltip content="Valeur des produits qui expireront dans les 30 prochains jours. Une action rapide est nécessaire pour éviter les pertes financières." />
            </CardTitle>
            <CardDescription>Produits expirant dans 30 jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">185,000 FCFA</div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Analyses Top 5
              <InfoTooltip content="Les 5 analyses les plus rentables qui génèrent la majorité de votre chiffre d'affaires. Concentrez vos efforts marketing sur ces services." />
            </CardTitle>
            <CardDescription>Génèrent 78% du CA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">9,783,500 FCFA</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}