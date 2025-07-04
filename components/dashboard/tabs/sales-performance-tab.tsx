"use client"

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip" // InfoTooltip est un composant, pas une chaîne à traduire directement ici.

// Données de simulation
// Note: Les noms d'analyse doivent être mappés à des clés de traduction.
// On va les garder comme "identifiants" dans `analysisData` et créer une fonction d'aide
// pour les traduire lors de l'affichage.
const analysisData = [
  { name: "Hemogramme", count: 450, price: 25000, revenue: 11250000, percentage: 35 }, // Changé pour une clé valide
  { name: "Glycemie", count: 380, price: 15000, revenue: 5700000, percentage: 18 },    // Changé pour une clé valide
  { name: "Creatinine", count: 320, price: 20000, revenue: 6400000, percentage: 20 },  // Changé pour une clé valide
  { name: "Cholesterol", count: 280, price: 30000, revenue: 8400000, percentage: 26 }, // Changé pour une clé valide
  { name: "TSH", count: 150, price: 45000, revenue: 6750000, percentage: 21 },         // Changé pour une clé valide
];

export function SalesPerformanceTab() {
  // Initialisez votre hook de langue personnalisé
  const { t } = useLanguage();

  // Fonction pour traduire les noms des analyses
  const getTranslatedAnalysisName = (name: string) => {
    return t(`SalesPerformanceTab.analysisNames.${name}`) || name; // Retourne l'original si pas de traduction
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('SalesPerformanceTab.paretoAnalysisTitle')}
          </CardTitle>
          <CardDescription>
            {t('SalesPerformanceTab.paretoAnalysisDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={80} 
                  // Utilise une fonction pour traduire les labels de l'axe X
                  tickFormatter={(name: string) => getTranslatedAnalysisName(name)} 
                />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}${t('SalesPerformanceTab.chartUnitMillion')}`} />
                <Tooltip 
                  // Traduire la valeur du tooltip et l'unité
                  formatter={(value: number) => [`${value?.toLocaleString()} ${t('SalesPerformanceTab.currency')}`]} 
                  // Traduire le nom de la barre dans le tooltip (e.g. "CA (FCFA)")
                  labelFormatter={(name: string) => getTranslatedAnalysisName(name)}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary))" 
                  name={t('SalesPerformanceTab.revenueLabel')} // Traduire le nom de la série pour la légende/tooltip
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {t('SalesPerformanceTab.analysisDetailsTitle')}
            </CardTitle>
            <CardDescription>
              {t('SalesPerformanceTab.analysisDetailsDescription')}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
            {t('SalesPerformanceTab.exportCsvButton')}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('SalesPerformanceTab.tableHeaders.analysisName')}</TableHead>
                <TableHead className="text-end">{t('SalesPerformanceTab.tableHeaders.countPerformed')}</TableHead>
                <TableHead className="text-end">{t('SalesPerformanceTab.tableHeaders.unitPrice')}</TableHead>
                <TableHead className="text-end">{t('SalesPerformanceTab.tableHeaders.totalRevenue')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysisData.map((analysis) => (
                <TableRow key={analysis.name}>
                  <TableCell className="font-medium">{getTranslatedAnalysisName(analysis.name)}</TableCell>
                  <TableCell className="text-end">{analysis.count}</TableCell>
                  <TableCell className="text-end">{analysis.price.toLocaleString()} {t('SalesPerformanceTab.currency')}</TableCell>
                  <TableCell className="text-end font-medium">{analysis.revenue.toLocaleString()} {t('SalesPerformanceTab.currency')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}