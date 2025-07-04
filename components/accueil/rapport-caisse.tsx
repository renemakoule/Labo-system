"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Download, Printer, TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, BarChart3, Info, UserCheck } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts"
import { useToast } from "@/hooks/use-toast"

// CORRECTION: Réintégration des données mock directement dans le fichier
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
  const { t, locale } = useLanguage();
  const { toast } = useToast();

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(value);
  }

  const cashDifference = typeof countedCash === 'number' 
    ? countedCash - mockDailyReport.paymentMethods.cash.amount 
    : 0;

  const generateReport = () => {
    toast({
      title: t('AccueilRapportCaisse.toastGenerateTitle'),
      description: t('AccueilRapportCaisse.toastGenerateDesc', { type: reportType, date: selectedDate }),
    })
  }
  
  const getMethodLabel = (method: string) => t(`AccueilRapportCaisse.method_${method}`);

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('AccueilRapportCaisse.pageTitle')}</h1>
              <Tooltip>
                <TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{t('AccueilRapportCaisse.pageInfo')}</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('AccueilRapportCaisse.pageDescription')}</p>
          </div>

          <Card className="mb-6">
            <CardHeader><CardTitle>{t('AccueilRapportCaisse.settingsTitle')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative"><Calendar className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="ps-10"/></div>
                <Select value={reportType} onValueChange={setReportType}><SelectTrigger><SelectValue placeholder={t('AccueilRapportCaisse.reportTypePlaceholder')} /></SelectTrigger><SelectContent><SelectItem value="daily">{t('AccueilRapportCaisse.reportTypeDaily')}</SelectItem><SelectItem value="weekly">{t('AccueilRapportCaisse.reportTypeWeekly')}</SelectItem><SelectItem value="monthly">{t('AccueilRapportCaisse.reportTypeMonthly')}</SelectItem></SelectContent></Select>
                <Button onClick={generateReport}><BarChart3 className="h-4 w-4 me-2" />{t('AccueilRapportCaisse.generateButton')}</Button>
                <div className="flex space-x-2 rtl:space-x-reverse"><Button variant="outline" size="sm"><Download className="h-4 w-4 me-2" />PDF</Button><Button variant="outline" size="sm"><Printer className="h-4 w-4 me-2" />{t('AccueilRapportCaisse.printButton')}</Button></div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="daily" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="daily">{t('AccueilRapportCaisse.tabDaily')}</TabsTrigger><TabsTrigger value="weekly">{t('AccueilRapportCaisse.tabWeekly')}</TabsTrigger><TabsTrigger value="summary">{t('AccueilRapportCaisse.tabSummary')}</TabsTrigger></TabsList>

            <TabsContent value="daily" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center"><TrendingUp className="h-4 w-4 me-2" />{t('AccueilRapportCaisse.kpiCashed')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600 dark:text-green-400">{currencyFormatter(mockDailyReport.totalPayments)}</div><p className="text-xs text-green-600 dark:text-green-500">{t('AccueilRapportCaisse.transactionCount', { count: mockDailyReport.transactionCount })}</p></CardContent></Card>
                <Card className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center"><TrendingDown className="h-4 w-4 me-2" />{t('AccueilRapportCaisse.kpiRefunds')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600 dark:text-red-400">{currencyFormatter(mockDailyReport.totalRefunds)}</div><p className="text-xs text-red-600 dark:text-red-500">{t('AccueilRapportCaisse.refundCount', { count: 3 })}</p></CardContent></Card>
                <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center"><DollarSign className="h-4 w-4 me-2" />{t('AccueilRapportCaisse.kpiBalance')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currencyFormatter(mockDailyReport.closingBalance)}</div><p className="text-xs text-blue-600 dark:text-blue-500">{t('AccueilRapportCaisse.closingBalance')}</p></CardContent></Card>
                <Card className="bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">{t('AccueilRapportCaisse.kpiAvgTicket')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currencyFormatter(mockDailyReport.totalPayments / mockDailyReport.transactionCount)}</div><p className="text-xs text-purple-600 dark:text-purple-500">{t('AccueilRapportCaisse.perTransaction')}</p></CardContent></Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="flex items-center gap-2"><CreditCard />{t('AccueilRapportCaisse.byMethodTitle')}</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>{t('AccueilRapportCaisse.headerMethod')}</TableHead><TableHead className="text-end">{t('AccueilRapportCaisse.headerAmount')}</TableHead><TableHead className="text-end">Tx</TableHead></TableRow></TableHeader><TableBody>{Object.entries(mockDailyReport.paymentMethods).map(([key, value]) => (<TableRow key={key}><TableCell className="capitalize">{getMethodLabel(key)}</TableCell><TableCell className="text-end">{currencyFormatter(value.amount)}</TableCell><TableCell className="text-end">{value.count}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
                <Card><CardHeader><CardTitle className="flex items-center gap-2"><UserCheck />{t('AccueilRapportCaisse.byOperatorTitle')}</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>{t('AccueilRapportCaisse.headerOperator')}</TableHead><TableHead className="text-end">{t('AccueilRapportCaisse.headerAmount')}</TableHead><TableHead className="text-end">Tx</TableHead></TableRow></TableHeader><TableBody>{mockDailyReport.operators.map((op) => (<TableRow key={op.name}><TableCell>{op.name}</TableCell><TableCell className="text-end">{currencyFormatter(op.amount)}</TableCell><TableCell className="text-end">{op.transactions}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-6">
              <Card><CardHeader><CardTitle>{t('AccueilRapportCaisse.weeklySummaryTitle')}</CardTitle><CardDescription>{t('AccueilRapportCaisse.periodLabel')}: {mockWeeklyReport.period}</CardDescription></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"><p className="text-sm text-muted-foreground">{t('AccueilRapportCaisse.totalRevenue')}</p><p className="text-2xl font-bold">{currencyFormatter(mockWeeklyReport.totalRevenue)}</p></div><div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"><p className="text-sm text-muted-foreground">{t('AccueilRapportCaisse.transactions')}</p><p className="text-2xl font-bold">{mockWeeklyReport.totalTransactions}</p></div><div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"><p className="text-sm text-muted-foreground">{t('AccueilRapportCaisse.avgRevenue')}</p><p className="text-2xl font-bold">{currencyFormatter(mockWeeklyReport.averagePerDay)}</p></div></CardContent></Card>
              <Card><CardHeader><CardTitle>{t('AccueilRapportCaisse.dailyPerformanceTitle')}</CardTitle></CardHeader><CardContent className="h-[350px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={mockWeeklyReport.dailyBreakdown}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis tickFormatter={(val) => `${val/1000000}M`} /><RechartsTooltip formatter={(val: number) => currencyFormatter(val)} /><Legend payload={[{ value: t('AccueilRapportCaisse.revenue'), type: 'line', id: 'revenue', color: 'hsl(var(--primary))'}]} /><Bar dataKey="revenue" fill="hsl(var(--primary))" name={t('AccueilRapportCaisse.revenue')} /></BarChart></ResponsiveContainer></CardContent></Card>
            </TabsContent>
            
            <TabsContent value="summary" className="space-y-6">
               <Card><CardHeader><CardTitle>{t('AccueilRapportCaisse.manualCloseTitle')}</CardTitle><CardDescription>{t('AccueilRapportCaisse.manualCloseDesc')}</CardDescription></CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"><p className="text-sm font-medium text-blue-800 dark:text-blue-300">{t('AccueilRapportCaisse.theoreticalCash')}</p><p className="text-3xl font-bold text-blue-900 dark:text-blue-200">{currencyFormatter(mockDailyReport.paymentMethods.cash.amount)}</p></div>
                      <div><Label htmlFor="countedCash">{t('AccueilRapportCaisse.countedCash')}</Label><Input id="countedCash" type="number" placeholder={t('AccueilRapportCaisse.countedCashPlaceholder')} value={countedCash} onChange={(e) => setCountedCash(e.target.value === '' ? '' : Number(e.target.value))} className="text-lg h-12 mt-1"/></div>
                      <div className={`p-4 rounded-lg border ${cashDifference === 0 ? 'bg-gray-100 dark:bg-gray-800' : cashDifference > 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                        <p className="text-sm font-medium">{t('AccueilRapportCaisse.cashDifference')}</p>
                        <p className={`text-3xl font-bold ${cashDifference === 0 ? '' : cashDifference > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{currencyFormatter(cashDifference)}</p>
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