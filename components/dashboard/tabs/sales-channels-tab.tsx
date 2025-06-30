"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const paymentChannelsData = [
  { name: "Mobile Money", value: 45, amount: 5643000, transactions: 892, fees: 112800 },
  { name: "Espèces", value: 35, amount: 4387500, transactions: 654, fees: 0 },
  { name: "Carte Bancaire", value: 20, amount: 2506000, transactions: 234, fees: 50100 },
]

const COLORS = ["hsl(142, 76%, 36%)", "hsl(221, 83%, 53%)", "hsl(262, 83%, 58%)"]

export function SalesChannelsTab() {
  const totalAmount = paymentChannelsData.reduce((sum, item) => sum + item.amount, 0)
  const totalFees = paymentChannelsData.reduce((sum, item) => sum + item.fees, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">Répartition par Canal de Paiement</CardTitle><CardDescription>Distribution du CA par mode de paiement</CardDescription></CardHeader>
          <CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={paymentChannelsData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}\n${value}%`} outerRadius={90} innerRadius={40} fill="#8884d8" dataKey="value" stroke="#fff" strokeWidth={2}>{paymentChannelsData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Tooltip formatter={(value, name, props) => [`${value}% (${props.payload.amount.toLocaleString()} FCFA)`, name]}/><Legend verticalAlign="bottom" height={36}/></PieChart></ResponsiveContainer></div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2">Résumé Financier</CardTitle><CardDescription>Vue d'ensemble des encaissements</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Total Encaissé</span><span className="text-2xl font-bold">{totalAmount.toLocaleString()} FCFA</span></div>
            <div className="flex justify-between items-center"><span className="text-sm text-muted-foreground">Total Frais</span><span className="text-lg font-medium text-destructive">{totalFees.toLocaleString()} FCFA</span></div>
            <div className="flex justify-between items-center pt-2 border-t"><span className="text-sm font-medium">Net Encaissé</span><span className="text-xl font-bold text-green-600">{(totalAmount - totalFees).toLocaleString()} FCFA</span></div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2">Détail par Canal de Paiement</CardTitle><CardDescription>Analyse détaillée des performances par mode de paiement</CardDescription></CardHeader>
        <CardContent>
          <Table><TableHeader><TableRow><TableHead>Mode de Paiement</TableHead><TableHead className="text-right">Montant Total</TableHead><TableHead className="text-right">Nb Transactions</TableHead><TableHead className="text-right">Frais Estimés</TableHead><TableHead className="text-right">Net</TableHead></TableRow></TableHeader>
            <TableBody>{paymentChannelsData.map((channel) => (<TableRow key={channel.name}><TableCell className="font-medium">{channel.name}</TableCell><TableCell className="text-right">{channel.amount.toLocaleString()} FCFA</TableCell><TableCell className="text-right">{channel.transactions}</TableCell><TableCell className="text-right">{channel.fees > 0 ? `${channel.fees.toLocaleString()} FCFA` : "-"}</TableCell><TableCell className="text-right font-medium">{(channel.amount - channel.fees).toLocaleString()} FCFA</TableCell></TableRow>))}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}