"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

// 1. Importer l'icône "Info" et les composants du Tooltip
import {
  Calendar,
  Download,
  Printer,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Banknote,
  FileText,
  BarChart3,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mockDailyReport = {
  date: "15/01/2024",
  openingBalance: 500.0,
  totalPayments: 2450.0,
  totalRefunds: 125.0,
  closingBalance: 2825.0,
  transactionCount: 24,
  paymentMethods: {
    cash: { amount: 1200.0, count: 12 },
    card: { amount: 950.0, count: 8 },
    check: { amount: 200.0, count: 2 },
    transfer: { amount: 100.0, count: 2 },
  },
  operators: [
    { name: "AICHA BENALI", transactions: 15, amount: 1650.0 },
    { name: "FATIMA ALAMI", transactions: 9, amount: 800.0 },
  ],
  hourlyBreakdown: [
    { hour: "08:00", amount: 145.0, count: 2 },
    { hour: "09:00", amount: 320.0, count: 4 },
    { hour: "10:00", amount: 280.0, count: 3 },
    { hour: "11:00", amount: 410.0, count: 5 },
    { hour: "12:00", amount: 180.0, count: 2 },
    { hour: "13:00", amount: 0.0, count: 0 },
    { hour: "14:00", amount: 520.0, count: 6 },
    { hour: "15:00", amount: 395.0, count: 4 },
    { hour: "16:00", amount: 190.0, count: 2 },
  ],
}

const mockWeeklyReport = {
  period: "09/01/2024 - 15/01/2024",
  totalRevenue: 12450.0,
  totalTransactions: 156,
  averagePerDay: 1778.57,
  dailyBreakdown: [
    { date: "09/01", amount: 1850.0, transactions: 22 },
    { date: "10/01", amount: 2100.0, transactions: 25 },
    { date: "11/01", amount: 1650.0, transactions: 19 },
    { date: "12/01", amount: 1950.0, transactions: 23 },
    { date: "13/01", amount: 2450.0, transactions: 28 },
    { date: "14/01", amount: 1200.0, transactions: 15 },
    { date: "15/01", amount: 1250.0, transactions: 24 },
  ],
}

export function AccueilRapportCaisse() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [reportType, setReportType] = useState("daily")

  const generateReport = () => {
    // Logique de génération de rapport
    console.log("Génération du rapport pour:", selectedDate, reportType)
  }

  return (
    // 2. Envelopper le composant avec TooltipProvider
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            {/* 3. Modifier la structure du titre pour inclure l'icône */}
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Rapport de Caisse</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Cette page offre une analyse détaillée des transactions financières. Vous pouvez générer des rapports journaliers, hebdomadaires ou mensuels.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Analyse complète des transactions et encaissements</p>
          </div>

          {/* Contrôles de rapport */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Paramètres du Rapport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de rapport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Journalier</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={generateReport}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Générer
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="daily" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Rapport Journalier</TabsTrigger>
              <TabsTrigger value="weekly">Rapport Hebdomadaire</TabsTrigger>
              <TabsTrigger value="summary">Résumé Financier</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-6">
              {/* Résumé journalier */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-green-700 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Encaissements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{mockDailyReport.totalPayments} DH</div>
                    <p className="text-xs text-green-600">{mockDailyReport.transactionCount} transactions</p>
                  </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-red-700 flex items-center">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Remboursements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{mockDailyReport.totalRefunds} DH</div>
                    <p className="text-xs text-red-600">3 remboursements</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Solde de Caisse
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{mockDailyReport.closingBalance} DH</div>
                    <p className="text-xs text-blue-600">Solde de clôture</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-purple-700">Ticket Moyen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {(mockDailyReport.totalPayments / mockDailyReport.transactionCount).toFixed(0)} DH
                    </div>
                    <p className="text-xs text-purple-600">Par transaction</p>
                  </CardContent>
                </Card>
              </div>

              {/* Répartition par méthode de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Méthode de Paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Banknote className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <p className="font-semibold">Espèces</p>
                          <p className="text-sm text-gray-600">{mockDailyReport.paymentMethods.cash.count} paiements</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          {mockDailyReport.paymentMethods.cash.amount} DH
                        </p>
                        <p className="text-sm text-gray-500">
                          {((mockDailyReport.paymentMethods.cash.amount / mockDailyReport.totalPayments) * 100).toFixed(
                            1,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
                        <div>
                          <p className="font-semibold">Cartes</p>
                          <p className="text-sm text-gray-600">{mockDailyReport.paymentMethods.card.count} paiements</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          {mockDailyReport.paymentMethods.card.amount} DH
                        </p>
                        <p className="text-sm text-gray-500">
                          {((mockDailyReport.paymentMethods.card.amount / mockDailyReport.totalPayments) * 100).toFixed(
                            1,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-purple-600 mr-3" />
                        <div>
                          <p className="font-semibold">Chèques</p>
                          <p className="text-sm text-gray-600">
                            {mockDailyReport.paymentMethods.check.count} paiements
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-purple-600">
                          {mockDailyReport.paymentMethods.check.amount} DH
                        </p>
                        <p className="text-sm text-gray-500">
                          {((mockDailyReport.paymentMethods.check.amount / mockDailyReport.totalPayments) * 100).toFixed(
                            1,
                          )}
                          %
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-8 w-8 text-orange-600 mr-3" />
                        <div>
                          <p className="font-semibold">Virements</p>
                          <p className="text-sm text-gray-600">
                            {mockDailyReport.paymentMethods.transfer.count} paiements
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-orange-600">
                          {mockDailyReport.paymentMethods.transfer.amount} DH
                        </p>
                        <p className="text-sm text-gray-500">
                          {(
                            (mockDailyReport.paymentMethods.transfer.amount / mockDailyReport.totalPayments) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance par opérateur */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance par Opérateur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockDailyReport.operators.map((operator, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{operator.name}</h3>
                          <p className="text-sm text-gray-600">{operator.transactions} transactions</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{operator.amount} DH</p>
                          <p className="text-sm text-gray-500">
                            {((operator.amount / mockDailyReport.totalPayments) * 100).toFixed(1)}% du total
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Répartition horaire */}
              <Card>
                <CardHeader>
                  <CardTitle>Répartition Horaire des Encaissements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockDailyReport.hourlyBreakdown.map((hour, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="font-medium">{hour.hour}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{hour.count} transactions</span>
                          <span className="font-semibold text-green-600">{hour.amount} DH</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-6">
              {/* Résumé hebdomadaire */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-green-700">Chiffre d'Affaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{mockWeeklyReport.totalRevenue} DH</div>
                    <p className="text-xs text-green-600">Semaine du {mockWeeklyReport.period}</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-blue-700">Total Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{mockWeeklyReport.totalTransactions}</div>
                    <p className="text-xs text-blue-600">7 jours</p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-purple-700">Moyenne Journalière</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {mockWeeklyReport.averagePerDay.toFixed(0)} DH
                    </div>
                    <p className="text-xs text-purple-600">Par jour</p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-orange-700">Meilleur Jour</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">13/01</div>
                    <p className="text-xs text-orange-600">2,450 DH</p>
                  </CardContent>
                </Card>
              </div>

              {/* Évolution quotidienne */}
              <Card>
                <CardHeader>
                  <CardTitle>Évolution Quotidienne</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockWeeklyReport.dailyBreakdown.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{day.date}</h3>
                          <p className="text-sm text-gray-600">{day.transactions} transactions</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{day.amount} DH</p>
                          <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  (day.amount / Math.max(...mockWeeklyReport.dailyBreakdown.map((d) => d.amount))) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              {/* Résumé financier global */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bilan de Caisse</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Solde d'ouverture:</span>
                      <span className="font-semibold">{mockDailyReport.openingBalance} DH</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span>+ Encaissements:</span>
                      <span className="font-semibold text-green-600">+{mockDailyReport.totalPayments} DH</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                      <span>- Remboursements:</span>
                      <span className="font-semibold text-red-600">-{mockDailyReport.totalRefunds} DH</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <span className="font-semibold">Solde de clôture:</span>
                        <span className="font-bold text-blue-600 text-lg">{mockDailyReport.closingBalance} DH</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Indicateurs Clés</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Nombre de patients:</span>
                      <Badge variant="outline">{mockDailyReport.transactionCount}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Ticket moyen:</span>
                      <Badge variant="outline">
                        {(mockDailyReport.totalPayments / mockDailyReport.transactionCount).toFixed(0)} DH
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Taux de remboursement:</span>
                      <Badge variant="outline">
                        {((mockDailyReport.totalRefunds / mockDailyReport.totalPayments) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>Paiements en espèces:</span>
                      <Badge variant="outline">
                        {((mockDailyReport.paymentMethods.cash.amount / mockDailyReport.totalPayments) * 100).toFixed(
                          1,
                        )}
                        %
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions recommandées */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions Recommandées</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-yellow-800">Vérification de caisse recommandée</p>
                        <p className="text-sm text-yellow-700">
                          Le solde en espèces est élevé. Considérez un dépôt bancaire.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-blue-800">Performance excellente</p>
                        <p className="text-sm text-blue-700">
                          Les encaissements sont supérieurs à la moyenne hebdomadaire.
                        </p>
                      </div>
                    </div>
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