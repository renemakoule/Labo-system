"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées
const cashflowData = [
  {
    period: "Sem 1",
    inflows: 28000,
    outflows: 15000,
    net: 13000,
    balance: 45000,
  },
  {
    period: "Sem 2",
    inflows: 32000,
    outflows: 18000,
    net: 14000,
    balance: 59000,
  },
  {
    period: "Sem 3",
    inflows: 25000,
    outflows: 22000,
    net: 3000,
    balance: 62000,
  },
  {
    period: "Sem 4",
    inflows: 30000,
    outflows: 25000,
    net: 5000,
    balance: 67000,
  },
  {
    period: "Sem 5 (Prév)",
    inflows: 28000,
    outflows: 30000,
    net: -2000,
    balance: 65000,
  },
]

const upcomingPayments = [
  { description: "Salaires équipe", amount: 12000, date: "2024-02-01", type: "recurring" },
  { description: "Fournisseur réactifs", amount: 8500, date: "2024-02-03", type: "supplier" },
  { description: "Loyer laboratoire", amount: 3500, date: "2024-02-05", type: "recurring" },
  { description: "Assurance", amount: 1200, date: "2024-02-10", type: "recurring" },
]

export function TreasuryCashflowTab() {
  const currentBalance = 67000
  const projectedBalance = cashflowData[cashflowData.length - 1].balance
  const totalUpcomingOutflows = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      {/* KPIs de trésorerie */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Solde Actuel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {currentBalance.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Entrées ce Mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{" "}
              {cashflowData
                .slice(0, 4)
                .reduce((sum, item) => sum + item.inflows, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              Sorties ce Mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              €{" "}
              {cashflowData
                .slice(0, 4)
                .reduce((sum, item) => sum + item.outflows, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Solde Projeté</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ {projectedBalance.toLocaleString()}</div>
            <Badge variant={projectedBalance > currentBalance ? "default" : "destructive"} className="mt-1">
              {projectedBalance > currentBalance ? "+" : ""}
              {(((projectedBalance - currentBalance) / currentBalance) * 100).toFixed(1)}%
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Graphique des flux de trésorerie */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Flux de Trésorerie Hebdomadaire
            <InfoTooltip content="Visualisation des entrées et sorties d'argent par semaine. Anticipez les périodes de tension de trésorerie et planifiez vos investissements." />
          </CardTitle>
          <CardDescription>Entrées, sorties et solde de trésorerie par semaine</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `€ ${value?.toLocaleString()}`,
                    name === "inflows" ? "Entrées" : name === "outflows" ? "Sorties" : "Net",
                  ]}
                />
                <ReferenceLine y={0} stroke="#000" strokeDasharray="2 2" />
                <Bar dataKey="inflows" fill="hsl(var(--primary))" name="inflows" />
                <Bar dataKey="outflows" fill="hsl(var(--destructive))" name="outflows" />
                <Bar dataKey="net" fill="hsl(var(--secondary))" name="net" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Paiements à venir */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Paiements à Venir
              <InfoTooltip content="Liste des paiements prévus dans les 15 prochains jours. Assurez-vous d'avoir suffisamment de liquidités pour honorer ces engagements." />
            </CardTitle>
            <CardDescription>Sorties prévues dans les 15 prochains jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{payment.description}</div>
                    <div className="text-sm text-muted-foreground">{payment.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">€ {payment.amount.toLocaleString()}</div>
                    <Badge variant="outline" className="text-xs">
                      {payment.type === "recurring" ? "Récurrent" : "Fournisseur"}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total à payer</span>
                  <span>€ {totalUpcomingOutflows.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analyse de risque */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Analyse de Risque
              <InfoTooltip content="Évaluation automatique de votre situation de trésorerie. Recevez des alertes et des recommandations pour maintenir un niveau de liquidité optimal." />
            </CardTitle>
            <CardDescription>Évaluation de la situation de trésorerie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
                <TrendingUp className="h-4 w-4" />
                Situation Favorable
              </div>
              <p className="text-sm text-green-700">
                Le solde de trésorerie reste positif même après les paiements prévus.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Solde actuel</span>
                <span className="font-medium">€ {currentBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Paiements prévus</span>
                <span className="font-medium text-red-600">- € {totalUpcomingOutflows.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Solde après paiements</span>
                <span className="font-bold">€ {(currentBalance - totalUpcomingOutflows).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Recommandation :</strong> Maintenir un coussin de sécurité d'au moins € 20,000 pour faire face
                aux imprévus.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
