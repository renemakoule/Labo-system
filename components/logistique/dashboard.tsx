"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

// 1. Importer l'icône "Info" et les composants du Tooltip
import { AlertTriangle, Truck, CheckCircle, Package, User, Plus, Minus, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

  const handleStockWithdrawal = () => {
    toast({
      title: "Sortie de stock confirmée",
      description: `${stockQuantity} Gants Nitrile M retirés du stock`,
    })
    setStockQuantity(1)
  }

  return (
    // 2. Envelopper le composant avec TooltipProvider
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            {/* 3. Modifier la structure du titre pour inclure l'icône */}
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Logistique & Stocks</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Cette page offre une vue d'ensemble des stocks, des commandes en cours et des réceptions de lots.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Gestion des stocks et approvisionnements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-red-200 cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center text-red-700">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Alertes Stock Bas
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-red-600 mb-2">3 Articles Critiques</div>
                <div className="space-y-2">
                  {mockStock.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between text-sm cursor-pointer hover:bg-red-50 p-2 rounded transition-colors"
                    >
                      <span className="truncate mr-2">{item.name}</span>
                      <span className="text-red-600 font-semibold flex-shrink-0">
                        {item.current}/{item.min}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-700">
                  <Truck className="h-5 w-5 mr-2" />
                  Commandes en Cours
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">5 Commandes en Transit</div>
                <div className="space-y-2">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between text-sm cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors"
                    >
                      <span className="truncate mr-2">{order.supplier}</span>
                      <span className="text-blue-600 flex-shrink-0">{order.items} articles</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center text-green-700">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Réception de Lots
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600 mb-2">2 Lots à Vérifier</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm cursor-pointer hover:bg-green-50 p-2 rounded transition-colors">
                    <span className="truncate mr-2">Lot MED-2024-001</span>
                    <span className="text-green-600 flex-shrink-0">En attente</span>
                  </div>
                  <div className="flex justify-between text-sm cursor-pointer hover:bg-green-50 p-2 rounded transition-colors">
                    <span className="truncate mr-2">Lot LAB-2024-015</span>
                    <span className="text-green-600 flex-shrink-0">En attente</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interface de Sortie Manuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="mb-6">
                  <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg">Bonjour TECHNICIEN ALAMI</p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <div className="w-24 h-24 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
                      <Package className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Gants Nitrile - Taille M</h3>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setStockQuantity(Math.max(1, stockQuantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-bold w-12 text-center">{stockQuantity}</span>
                      <Button variant="outline" size="sm" onClick={() => setStockQuantity(stockQuantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full h-12 text-lg hover:bg-green-600" onClick={handleStockWithdrawal}>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    CONFIRMER LE RETRAIT DE STOCK
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}