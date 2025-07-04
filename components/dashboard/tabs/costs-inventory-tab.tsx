"use client"

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context'; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Package, TrendingDown, RotateCcw } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip" 

const inventoryData = [
  { category: "Réactifs Hématologie", currentValue: 12000000, expiredValue: 800000, turnoverRate: 4.2, status: "good" },
  { category: "Réactifs Biochimie", currentValue: 15000000, expiredValue: 1200000, turnoverRate: 3.8, status: "warning" },
  { category: "Consommables", currentValue: 8000000, expiredValue: 200000, turnoverRate: 6.1, status: "good" },
  { category: "Réactifs Immunologie", currentValue: 10000000, expiredValue: 1500000, turnoverRate: 2.1, status: "critical" },
];

const expirationData = [
  { period: "0-30 jours", value: 1850000, items: 12 },
  { period: "31-60 jours", value: 3200000, items: 18 },
];

export function CostsInventoryTab() {
  // Initialisez votre hook de langue personnalisé
  const { t } = useLanguage(); 

  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.currentValue, 0);
  const totalExpiredValue = inventoryData.reduce((sum, item) => sum + item.expiredValue, 0);
  const averageTurnover = inventoryData.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryData.length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {/* KPI: Valeur Totale Stock */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              {t('CostsInventoryTab.totalStockValue')} {/* Utilisez la clé complète avec le namespace */}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventoryValue.toLocaleString()} {t('CostsInventoryTab.currency')}</div>
          </CardContent>
        </Card>

        {/* KPI: Stock Périmé */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              {t('CostsInventoryTab.expiredStock')} 
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalExpiredValue.toLocaleString()} {t('CostsInventoryTab.currency')}</div>
          </CardContent>
        </Card>

        {/* KPI: Taux de Rotation Moyen */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              {t('CostsInventoryTab.averageTurnoverRate')} 
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageTurnover.toFixed(1)}x</div>
          </CardContent>
        </Card>

        {/* KPI: Perte Mensuelle */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-orange-600" />
              {t('CostsInventoryTab.monthlyLoss')} 
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">650,000 {t('CostsInventoryTab.currency')}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('CostsInventoryTab.categoryManagementTitle')}
          </CardTitle>
          <CardDescription>
            {t('CostsInventoryTab.categoryManagementDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('CostsInventoryTab.tableHeaders.category')}</TableHead>
                <TableHead className="text-end">{t('CostsInventoryTab.tableHeaders.currentValue')}</TableHead>
                <TableHead className="text-end">{t('CostsInventoryTab.tableHeaders.expiredValue')}</TableHead>
                <TableHead>{t('CostsInventoryTab.tableHeaders.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.category}>
                  {/* Si 'Réactifs Hématologie' etc. devaient être traduits, ils devraient aussi être des clés de traduction,
                      par exemple: t(`CostsInventoryTab.categories.${item.category.replace(/\s/g, '')}`) */}
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-end">{item.currentValue.toLocaleString()} {t('CostsInventoryTab.currency')}</TableCell>
                  <TableCell className="text-end text-red-600">{item.expiredValue.toLocaleString()} {t('CostsInventoryTab.currency')}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "good" ? "default" : item.status === "warning" ? "outline" : "destructive"}>
                      {t(`CostsInventoryTab.statuses.${item.status}`)} {/* Traduction dynamique du statut */}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}