"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar, Download, Printer, TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, FileText, BarChart3, Info, UserCheck, Calculator
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"
import { toast } from "@/hooks/use-toast"

const mockDailyReport = {
  date: "15/01/2024",
  openingBalance: 500000,
  totalPayments: 2450000,
  totalRefunds: 125000,
  closingBalance: 2825000,
  transactionCount: 24,
  paymentMethods: {
    cash: { amount: 1200000, count: 12 },
    card: { amount: 950000, count: 8 },
    mobile: { amount: 200000, count: 2 },
    transfer: { amount: 100000, count: 2 },
  },
  operators: [
    { name: "AICHA BENALI", transactions: 15, amount: 1650000 },
    { name: "FATIMA ALAMI", transactions: 9, amount: 800000 },
  ],
  hourlyBreakdown: [
    { hour: "08h", amount: 145000 }, { hour: "09h", amount: 320000 },
    { hour: "10h", amount: 280000 }, { hour: "11h", amount: 450000 },
    { hour: "12h", amount: 210000 }, { hour: "14h", amount: 550000 },
    { hour: "15h", amount: 350000 }, { hour: "16h", amount: 145000 },
  ],
}

const mockWeeklyReport = {
    period: "09/01/2024 - 15/01/2024",
    totalRevenue: 12450000,
    totalTransactions: 156,
    averagePerDay: 1778571,
    dailyBreakdown: [
      { day: "Lun", revenue: 1600000 }, { day: "Mar", revenue: 1850000 },
      { day: "Mer", revenue: 1700000 }, { day: "Jeu", revenue: 2100000 },
      { day: "Ven", revenue: 2400000 }, { day: "Sam", revenue: 2800000 },
    ]
}

export function AccueilRapportCaisse() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [reportType, setReportType] = useState("daily")
  const [countedCash, setCountedCash] = useState<number | string>("")

  const cashDifference = typeof countedCash === 'number' 
    ? countedCash - mockDailyReport.paymentMethods.cash.amount 
    : 0;

  const generateReport = () => {
    toast({
      title: "Génération de Rapport",
      description: `Rapport ${reportType} pour le ${selectedDate} demandé.`,
    })
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Rapport de Caisse</h1>
              <Tooltip>
                <TooltipTrigger asChild><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">Analyse détaillée des transactions financières.</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Analyse complète des transactions et encaissements</p>
          </div>

          <Card className="mb-6">
            <CardHeader><CardTitle>Paramètres du Rapport</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="pl-10"/>
                </div>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger><SelectValue placeholder="Type de rapport" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Journalier</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={generateReport}><BarChart3 className="h-4 w-4 mr-2" />Générer</Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />PDF</Button>
                  <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" />Imprimer</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="daily" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Rapport Journalier</TabsTrigger>
              <TabsTrigger value="weekly">Rapport Hebdomadaire</TabsTrigger>
              <TabsTrigger value="summary">Résumé & Clôture</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-green-700 flex items-center"><TrendingUp className="h-4 w-4 mr-2" />Encaissements</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold text-green-600">{mockDailyReport.totalPayments.toLocaleString()} FCFA</div><p className="text-xs text-green-600">{mockDailyReport.transactionCount} transactions</p></CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-700 flex items-center"><TrendingDown className="h-4 w-4 mr-2" />Remboursements</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold text-red-600">{mockDailyReport.totalRefunds.toLocaleString()} FCFA</div><p className="text-xs text-red-600">3 remboursements</p></CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-blue-700 flex items-center"><DollarSign className="h-4 w-4 mr-2" />Solde de Caisse</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold text-blue-600">{mockDailyReport.closingBalance.toLocaleString()} FCFA</div><p className="text-xs text-blue-600">Solde de clôture</p></CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-purple-700">Ticket Moyen</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold text-purple-600">{(mockDailyReport.totalPayments / mockDailyReport.transactionCount).toFixed(0).toLocaleString()} FCFA</div><p className="text-xs text-purple-600">Par transaction</p></CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard />Répartition par Méthode</CardTitle></CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader><TableRow><TableHead>Méthode</TableHead><TableHead className="text-right">Montant</TableHead><TableHead className="text-right">Tx</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {Object.entries(mockDailyReport.paymentMethods).map(([key, value]) => (
                          <TableRow key={key}><TableCell className="capitalize">{key}</TableCell><TableCell className="text-right">{value.amount.toLocaleString()} FCFA</TableCell><TableCell className="text-right">{value.count}</TableCell></TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><UserCheck />Performance par Opérateur</CardTitle></CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader><TableRow><TableHead>Opérateur</TableHead><TableHead className="text-right">Montant</TableHead><TableHead className="text-right">Tx</TableHead></TableRow></TableHeader>
                      <TableBody>
                        {mockDailyReport.operators.map((op) => (
                          <TableRow key={op.name}><TableCell>{op.name}</TableCell><TableCell className="text-right">{op.amount.toLocaleString()} FCFA</TableCell><TableCell className="text-right">{op.transactions}</TableCell></TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé Hebdomadaire</CardTitle>
                  <CardDescription>Période: {mockWeeklyReport.period}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-100 rounded-lg text-center"><p className="text-sm text-muted-foreground">Revenu Total</p><p className="text-2xl font-bold">{mockWeeklyReport.totalRevenue.toLocaleString()} FCFA</p></div>
                  <div className="p-4 bg-gray-100 rounded-lg text-center"><p className="text-sm text-muted-foreground">Transactions</p><p className="text-2xl font-bold">{mockWeeklyReport.totalTransactions}</p></div>
                  <div className="p-4 bg-gray-100 rounded-lg text-center"><p className="text-sm text-muted-foreground">Revenu Moyen/Jour</p><p className="text-2xl font-bold">{mockWeeklyReport.averagePerDay.toLocaleString()} FCFA</p></div>
                </CardContent>
              </Card>
              <Card>
                  <CardHeader><CardTitle>Performance Journalière de la Semaine</CardTitle></CardHeader>
                  <CardContent className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={mockWeeklyReport.dailyBreakdown}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="day" />
                              <YAxis tickFormatter={(val) => `${val/1000000}M`} />
                              <RechartsTooltip formatter={(val) => `${Number(val).toLocaleString()} FCFA`} />
                              <Legend />
                              <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenu" />
                          </BarChart>
                      </ResponsiveContainer>
                  </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="summary" className="space-y-6">
               <Card>
                  <CardHeader><CardTitle>Clôture de Caisse Manuelle</CardTitle><CardDescription>Comparez le montant théorique en espèces avec le comptage physique.</CardDescription></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Montant Espèces Théorique</p>
                        <p className="text-3xl font-bold text-blue-900">{mockDailyReport.paymentMethods.cash.amount.toLocaleString()} FCFA</p>
                      </div>
                      <div>
                        <Label htmlFor="countedCash">Montant Espèces Compté</Label>
                        <Input 
                            id="countedCash" 
                            type="number"
                            placeholder="Entrez le montant compté..."
                            value={countedCash}
                            onChange={(e) => setCountedCash(e.target.value === '' ? '' : Number(e.target.value))}
                            className="text-lg h-12 mt-1"
                        />
                      </div>
                      <div className={`p-4 rounded-lg border ${cashDifference === 0 ? 'bg-gray-100' : cashDifference > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <p className="text-sm font-medium">Écart de Caisse</p>
                        <p className={`text-3xl font-bold ${cashDifference === 0 ? '' : cashDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>{cashDifference.toLocaleString()} FCFA</p>
                      </div>
                  </CardContent>
               </Card>
            </TabsContent>

          </Tabs>
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}