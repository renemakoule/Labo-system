"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const suppliersData = [
  { name: "BioLab Supplies", amount: 15000000, category: "Réactifs" },
  { name: "MedEquip Pro", amount: 8500000, category: "Équipements" },
  { name: "ChemReagents", amount: 7200000, category: "Réactifs" },
  { name: "LabConsumables", amount: 6800000, category: "Consommables" },
  { name: "TechService", amount: 5000000, category: "Maintenance" },
]

const categoryData = [
  { name: "Réactifs", value: 22200000, color: "hsl(var(--primary))" },
  { name: "Équipements", value: 8500000, color: "hsl(var(--secondary))" },
]

export function CostsSuppliersTab() {
  const totalSpent = suppliersData.reduce((sum, supplier) => sum + supplier.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Dépenses</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{totalSpent.toLocaleString()} FCFA</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Principal Fournisseur</CardTitle></CardHeader><CardContent><div className="text-lg font-bold">BioLab Supplies</div></CardContent></Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Top 5 Fournisseurs</CardTitle><CardDescription>Répartition des dépenses par fournisseur</CardDescription></CardHeader>
          <CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={suppliersData} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(v) => `${v/1000000}M`} /><YAxis dataKey="name" type="category" width={100} /><Tooltip formatter={(value) => `${value.toLocaleString()} FCFA`}/><Bar dataKey="amount" fill="hsl(var(--primary))"/></BarChart></ResponsiveContainer></div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Répartition par Catégorie</CardTitle><CardDescription>Distribution des coûts par type</CardDescription></CardHeader>
          <CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${(value/1000000).toFixed(1)}M`} outerRadius={80} fill="#8884d8" dataKey="value">{categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color}/>)}</Pie><Tooltip formatter={(v) => `${v.toLocaleString()} FCFA`}/></PieChart></ResponsiveContainer></div></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Détail des Dépenses</CardTitle><CardDescription>Analyse par fournisseur</CardDescription></div><Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2"/>Exporter</Button></CardHeader>
        <CardContent>
          <Table><TableHeader><TableRow><TableHead>Fournisseur</TableHead><TableHead>Catégorie</TableHead><TableHead className="text-right">Montant</TableHead></TableRow></TableHeader>
            <TableBody>{suppliersData.map(s => <TableRow key={s.name}><TableCell className="font-medium">{s.name}</TableCell><TableCell>{s.category}</TableCell><TableCell className="text-right">{s.amount.toLocaleString()} FCFA</TableCell></TableRow>)}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}