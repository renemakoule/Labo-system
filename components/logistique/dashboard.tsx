"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"; // UTILISER NOTRE HOOK
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Truck, CheckCircle, Package, User, Plus, Minus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockStock = [
  { name: "Gants Nitrile M", current: 15, min: 50, status: "critical" },
  { name: "Tubes EDTA", current: 25, min: 100, status: "critical" },
  { name: "Seringues 5ml", current: 8, min: 30, status: "critical" },
]

const mockOrders = [
  { id: "CMD-001", supplier: "MedSupply", items: 12, status: "transit" },
  { id: "CMD-002", supplier: "LabEquip", items: 8, status: "transit" },
]

export function LogistiqueDashboard() {
  const [stockQuantity, setStockQuantity] = useState(1)
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleStockWithdrawal = () => {
    toast({
      title: t('LogistiqueDashboard.toastWithdrawalTitle'),
      description: t('LogistiqueDashboard.toastWithdrawalDesc', { quantity: stockQuantity, item: "Gants Nitrile M" }),
    })
    setStockQuantity(1)
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('LogistiqueDashboard.pageTitle')}</h1>
              <Tooltip>
                <TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{t('LogistiqueDashboard.pageInfo')}</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('LogistiqueDashboard.pageDescription')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200 cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="bg-red-50 dark:bg-red-900/20">
                <CardTitle className="flex items-center text-red-700 dark:text-red-300"><AlertTriangle className="h-5 w-5 me-2" />{t('LogistiqueDashboard.lowStockAlerts')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{t('LogistiqueDashboard.criticalItems', { count: 3 })}</div>
                <div className="space-y-2">
                  {mockStock.map((item) => (<div key={item.name} className="flex justify-between text-sm cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded transition-colors"><span className="truncate me-2">{item.name}</span><span className="text-red-600 dark:text-red-400 font-semibold flex-shrink-0">{item.current}/{item.min}</span></div>))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                <CardTitle className="flex items-center text-blue-700 dark:text-blue-300"><Truck className="h-5 w-5 me-2" />{t('LogistiqueDashboard.ordersInProgress')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">{t('LogistiqueDashboard.ordersInTransit', { count: 5 })}</div>
                <div className="space-y-2">
                  {mockOrders.map((order) => (<div key={order.id} className="flex justify-between text-sm cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded transition-colors"><span className="truncate me-2">{order.supplier}</span><span className="text-blue-600 dark:text-blue-400 flex-shrink-0">{t('LogistiqueDashboard.orderItems', { count: order.items })}</span></div>))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50 dark:bg-green-900/20">
                <CardTitle className="flex items-center text-green-700 dark:text-green-300"><CheckCircle className="h-5 w-5 me-2" />{t('LogistiqueDashboard.batchReception')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{t('LogistiqueDashboard.batchesToVerify', { count: 2 })}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/30 p-2 rounded transition-colors"><span className="truncate me-2">{t('LogistiqueDashboard.batch')} MED-2024-001</span><span className="text-green-600 dark:text-green-400 flex-shrink-0">{t('LogistiqueDashboard.batchStatusPending')}</span></div>
                  <div className="flex justify-between text-sm cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/30 p-2 rounded transition-colors"><span className="truncate me-2">{t('LogistiqueDashboard.batch')} LAB-2024-015</span><span className="text-green-600 dark:text-green-400 flex-shrink-0">{t('LogistiqueDashboard.batchStatusPending')}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>{t('LogistiqueDashboard.manualWithdrawalInterface')}</CardTitle></CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="mb-6"><User className="h-16 w-16 mx-auto text-gray-400 mb-4" /><p className="text-lg">{t('LogistiqueDashboard.welcomeUser', { name: "TECHNICIEN ALAMI" })}</p></div>
                <div className="max-w-md mx-auto space-y-6">
                  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                    <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 rounded-lg mx-auto mb-4 flex items-center justify-center cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/80 transition-colors"><Package className="h-12 w-12 text-blue-600 dark:text-blue-400" /></div>
                    <h3 className="text-xl font-semibold mb-2">{t('LogistiqueDashboard.gloveItem')}</h3>
                    <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse mb-4">
                      <Button variant="outline" size="sm" onClick={() => setStockQuantity(Math.max(1, stockQuantity - 1))}><Minus className="h-4 w-4" /></Button>
                      <span className="text-2xl font-bold w-12 text-center">{stockQuantity}</span>
                      <Button variant="outline" size="sm" onClick={() => setStockQuantity(stockQuantity + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Button className="w-full h-12 text-lg hover:bg-green-600" onClick={handleStockWithdrawal}><CheckCircle className="h-5 w-5 me-2" />{t('LogistiqueDashboard.confirmWithdrawalButton')}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}