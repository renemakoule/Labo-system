"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées
const paymentChannelsData = [
  { name: "Mobile Money", value: 45, amount: 56430, transactions: 892, fees: 1128 },
  { name: "Espèces", value: 35, amount: 43875, transactions: 654, fees: 0 },
  { name: "Carte Bancaire", value: 20, amount: 25060, transactions: 234, fees: 501 },
]

const COLORS = [
  "hsl(142, 76%, 36%)", // Vert pour Mobile Money
  "hsl(221, 83%, 53%)", // Bleu pour Espèces
  "hsl(262, 83%, 58%)", // Violet pour Carte Bancaire
]

export function SalesChannelsTab() {
  const totalAmount = paymentChannelsData.reduce((sum, item) => sum + item.amount, 0)
  const totalFees = paymentChannelsData.reduce((sum, item) => sum + item.fees, 0)

  return (
    <div className="space-y-6">
      {/* Graphique en camembert */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Répartition par Canal de Paiement
              <InfoTooltip content="Ce graphique montre la répartition de vos encaissements par mode de paiement. Analysez les préférences de vos patients et optimisez vos coûts de transaction." />
            </CardTitle>
            <CardDescription>Distribution du chiffre d'affaires par mode de paiement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentChannelsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}\n${value}%`}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {paymentChannelsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [`${value}% (€${props.payload.amount.toLocaleString()})`, name]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color, fontWeight: "bold" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Légende personnalisée avec couleurs */}
            <div className="mt-4 space-y-2">
              {paymentChannelsData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">€ {item.amount.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Résumé Financier
              <InfoTooltip content="Vue consolidée de vos encaissements avec le détail des frais par mode de paiement. Utilisez ces données pour négocier de meilleurs taux avec vos prestataires." />
            </CardTitle>
            <CardDescription>Vue d'ensemble des encaissements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Encaissé</span>
              <span className="text-2xl font-bold">€ {totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Frais</span>
              <span className="text-lg font-medium text-destructive">€ {totalFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium">Net Encaissé</span>
              <span className="text-xl font-bold text-green-600">€ {(totalAmount - totalFees).toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau détaillé */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Détail par Canal de Paiement
            <InfoTooltip content="Analyse détaillée des performances financières par mode de paiement. Comparez les coûts et identifiez les opportunités d'optimisation." />
          </CardTitle>
          <CardDescription>Analyse détaillée des performances par mode de paiement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mode de Paiement</TableHead>
                <TableHead className="text-right">Montant Total</TableHead>
                <TableHead className="text-right">Nb Transactions</TableHead>
                <TableHead className="text-right">Frais Estimés</TableHead>
                <TableHead className="text-right">Taux de Frais</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentChannelsData.map((channel) => {
                const feeRate = channel.amount > 0 ? (channel.fees / channel.amount) * 100 : 0
                const netAmount = channel.amount - channel.fees

                return (
                  <TableRow key={channel.name}>
                    <TableCell className="font-medium">{channel.name}</TableCell>
                    <TableCell className="text-right">€ {channel.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{channel.transactions}</TableCell>
                    <TableCell className="text-right">{channel.fees > 0 ? `€ ${channel.fees}` : "-"}</TableCell>
                    <TableCell className="text-right">
                      {feeRate > 0 ? (
                        <Badge variant="outline">{feeRate.toFixed(2)}%</Badge>
                      ) : (
                        <Badge variant="secondary">0%</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">€ {netAmount.toLocaleString()}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Canal Préféré</CardTitle>
            <CardDescription>Mode de paiement le plus utilisé</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Mobile Money</div>
            <div className="text-muted-foreground">45% des transactions</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Canal le Plus Coûteux</CardTitle>
            <CardDescription>Frais de transaction les plus élevés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Carte Bancaire</div>
            <div className="text-muted-foreground">2% de frais</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Économies Potentielles</CardTitle>
            <CardDescription>Si 100% en espèces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€ {totalFees}</div>
            <div className="text-muted-foreground">par mois</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
