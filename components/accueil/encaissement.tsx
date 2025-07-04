"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, Filter, CreditCard, Banknote, Smartphone, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockTransactions = [
  { id: "TXN-001", date: "15/01/2024", time: "14:30", patientId: "A-140", type: "payment", method: "card", amount: 145500, invoiceId: "FACT-2024-001", operator: "AICHA BENALI", status: "completed", },
  { id: "TXN-002", date: "15/01/2024", time: "14:15", patientId: "A-141", type: "payment", method: "cash", amount: 89000, invoiceId: "FACT-2024-002", operator: "FATIMA ALAMI", status: "completed", },
  { id: "TXN-003", date: "15/01/2024", time: "13:45", patientId: "A-137", type: "refund", method: "cash", amount: -25000, invoiceId: "FACT-2024-003", operator: "AICHA BENALI", status: "completed", },
  { id: "TXN-004", date: "15/01/2024", time: "13:30", patientId: "A-138", type: "payment", method: "mobile", amount: 120000, invoiceId: "FACT-2024-004", operator: "FATIMA ALAMI", status: "completed", },
  { id: "TXN-005", date: "14/01/2024", time: "16:20", patientId: "A-135", type: "payment", method: "mobile", amount: 200000, invoiceId: "FACT-2024-005", operator: "AICHA BENALI", status: "pending", },
]

export function AccueilEncaissement() {
  const { t, locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  }

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMethod = methodFilter === "all" || transaction.method === methodFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesMethod && matchesType
  })

  const getTotalByMethod = (method: string) => {
    return filteredTransactions.filter((t) => t.method === method && t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  }

  const getTotalByType = (type: string) => {
    return filteredTransactions.filter((t) => t.type === type && t.status === "completed").reduce((sum, t) => sum + Math.abs(t.amount), 0)
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card": return <CreditCard className="h-4 w-4" />
      case "cash": return <Banknote className="h-4 w-4" />
      case "mobile": return <Smartphone className="h-4 w-4" />
      default: return <CreditCard className="h-4 w-4" />
    }
  }

  const getMethodLabel = (method: string) => t(`AccueilEncaissement.method_${method}`);
  const getStatusLabel = (status: string) => t(`AccueilEncaissement.status_${status}`);
  const getTypeLabel = (type: string) => t(`AccueilEncaissement.type_${type}`);

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('AccueilEncaissement.pageTitle')}</h1>
              <Tooltip>
                <TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{t('AccueilEncaissement.pageInfo')}</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('AccueilEncaissement.pageDescription')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center"><Banknote className="h-4 w-4 me-2" />{t('AccueilEncaissement.method_cash')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{currencyFormatter(getTotalByMethod("cash"))}</div><p className="text-xs text-muted-foreground">{t('AccueilEncaissement.transactionCount', {count: filteredTransactions.filter(t => t.method === 'cash' && t.status === 'completed').length})}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center"><CreditCard className="h-4 w-4 me-2" />{t('AccueilEncaissement.method_card')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600">{currencyFormatter(getTotalByMethod("card"))}</div><p className="text-xs text-muted-foreground">{t('AccueilEncaissement.transactionCount', {count: filteredTransactions.filter(t => t.method === 'card' && t.status === 'completed').length})}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium flex items-center"><Smartphone className="h-4 w-4 me-2" />{t('AccueilEncaissement.method_mobile')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-purple-600">{currencyFormatter(getTotalByMethod("mobile"))}</div><p className="text-xs text-muted-foreground">{t('AccueilEncaissement.transactionCount', {count: filteredTransactions.filter(t => t.method === 'mobile' && t.status === 'completed').length})}</p></CardContent></Card>
          </div>

          <Card className="mb-6">
            <CardHeader><CardTitle>{t('AccueilEncaissement.filtersTitle')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative col-span-2"><Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><Input placeholder={t('AccueilEncaissement.searchPlaceholder')} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="ps-10" /></div>
                <Select value={methodFilter} onValueChange={setMethodFilter}><SelectTrigger><SelectValue placeholder={t('AccueilEncaissement.methodLabel')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('AccueilEncaissement.allMethods')}</SelectItem><SelectItem value="cash">{t('AccueilEncaissement.method_cash')}</SelectItem><SelectItem value="card">{t('AccueilEncaissement.method_card')}</SelectItem><SelectItem value="mobile">{t('AccueilEncaissement.method_mobile')}</SelectItem></SelectContent></Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger><SelectValue placeholder={t('AccueilEncaissement.typeLabel')} /></SelectTrigger><SelectContent><SelectItem value="all">{t('AccueilEncaissement.allTypes')}</SelectItem><SelectItem value="payment">{t('AccueilEncaissement.type_payment')}</SelectItem><SelectItem value="refund">{t('AccueilEncaissement.type_refund')}</SelectItem></SelectContent></Select>
                <Button variant="outline"><Download className="h-4 w-4 me-2" />{t('AccueilEncaissement.exportButton')}</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">{t('AccueilEncaissement.totalCashed')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600 dark:text-green-400">{currencyFormatter(getTotalByType("payment"))}</div></CardContent></Card>
            <Card className="bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">{t('AccueilEncaissement.totalRefunded')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600 dark:text-red-400">{currencyFormatter(getTotalByType("refund"))}</div></CardContent></Card>
            <Card className="bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">{t('AccueilEncaissement.netBalance')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currencyFormatter(getTotalByType("payment") - getTotalByType("refund"))}</div></CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle>{t('AccueilEncaissement.transactionsTitle')} ({filteredTransactions.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse min-w-0 flex-1 mb-2 sm:mb-0">
                      <div className="flex-shrink-0 text-gray-500">{getMethodIcon(transaction.method)}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{transaction.id} - {t('AccueilEncaissement.patientLabel')} {transaction.patientId}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{transaction.date} {t('AccueilEncaissement.atTime')} {transaction.time} • {t('AccueilEncaissement.invoiceLabel')}: {transaction.invoiceId}</p>
                        <p className="text-sm text-gray-500">{t('AccueilEncaissement.operatorLabel')}: {transaction.operator}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse flex-shrink-0 w-full sm:w-auto justify-end">
                      <div className="text-end">
                        <div className={`text-lg font-bold ${transaction.type === 'refund' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                          {transaction.type === 'refund' ? '-' : '+'}{currencyFormatter(Math.abs(transaction.amount))}
                        </div>
                        <div className="text-sm text-gray-500">{getMethodLabel(transaction.method)}</div>
                      </div>
                      <Badge variant={transaction.status === 'completed' ? 'default' : transaction.status === 'pending' ? 'secondary' : 'destructive'}>
                        {getStatusLabel(transaction.status)}
                      </Badge>
                      <Badge variant="outline">{getTypeLabel(transaction.type)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}