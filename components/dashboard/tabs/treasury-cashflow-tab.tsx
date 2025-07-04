"use client"

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { InfoTooltip } from "@/components/dashboard/info-tooltip" // InfoTooltip est un composant.

// Données simulées en FCFA (mises à jour avec des clés pour la traduction)
const cashflowData = [
  { periodKey: "Sem1", inflows: 2800000, outflows: 1500000, net: 1300000, balance: 4500000 },
  { periodKey: "Sem2", inflows: 3200000, outflows: 1800000, net: 1400000, balance: 5900000 },
  { periodKey: "Sem3", inflows: 2500000, outflows: 2200000, net: 300000, balance: 6200000 },
  { periodKey: "Sem4", inflows: 3000000, outflows: 2500000, net: 500000, balance: 6700000 },
  { periodKey: "Sem5Prev", inflows: 2800000, outflows: 3000000, net: -200000, balance: 6500000 }, // "Sem 5 (Prév)"
];

const upcomingPayments = [
  { descriptionKey: "teamSalaries", amount: 1200000, date: "2024-02-01", typeKey: "recurring" },
  { descriptionKey: "reagentSupplier", amount: 850000, date: "2024-02-03", typeKey: "supplier" },
  { descriptionKey: "labRent", amount: 350000, date: "2024-02-05", typeKey: "recurring" },
  { descriptionKey: "insurance", amount: 120000, date: "2024-02-10", typeKey: "recurring" },
];

export function TreasuryCashflowTab() {
  // Initialisez votre hook de langue personnalisé
  const { t } = useLanguage();

  const currentBalance = 6700000;
  const projectedBalance = cashflowData[cashflowData.length - 1].balance;
  const totalUpcomingOutflows = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {/* KPI: Solde Actuel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {t('TreasuryCashflowTab.currentBalance')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentBalance.toLocaleString()} {t('TreasuryCashflowTab.currency')}</div>
          </CardContent>
        </Card>

        {/* KPI: Entrées ce Mois */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              {t('TreasuryCashflowTab.inflowsThisMonth')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(cashflowData.slice(0, 4).reduce((sum, item) => sum + item.inflows, 0)).toLocaleString()} {t('TreasuryCashflowTab.currency')}
            </div>
          </CardContent>
        </Card>

        {/* KPI: Sorties ce Mois */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              {t('TreasuryCashflowTab.outflowsThisMonth')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {(cashflowData.slice(0, 4).reduce((sum, item) => sum + item.outflows, 0)).toLocaleString()} {t('TreasuryCashflowTab.currency')}
            </div>
          </CardContent>
        </Card>

        {/* KPI: Solde Projeté */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('TreasuryCashflowTab.projectedBalance')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectedBalance.toLocaleString()} {t('TreasuryCashflowTab.currency')}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('TreasuryCashflowTab.weeklyCashflowTitle')}
            <InfoTooltip content={t('TreasuryCashflowTab.infoTooltipContent.weeklyCashflow')} />
          </CardTitle>
          <CardDescription>
            {t('TreasuryCashflowTab.weeklyCashflowDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashflowData} margin={{ top: 20, end: 30, start: 20, bottom: 5 }}> {/* `end` et `start` pour alignement RTL */}
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodKey" tickFormatter={(periodKey: string) => t(`TreasuryCashflowTab.periods.${periodKey}`)} />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}${t('TreasuryCashflowTab.chartUnitMillion')}`} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value?.toLocaleString()} ${t('TreasuryCashflowTab.currency')}`,
                    t(`TreasuryCashflowTab.cashflowLabels.${name}`)
                  ]}
                />
                <ReferenceLine y={0} stroke="#000" strokeDasharray="2 2" />
                <Bar dataKey="inflows" fill="hsl(var(--primary))" name="inflows" />
                <Bar dataKey="outflows" fill="hsl(var(--destructive))" name="outflows" />
                <Bar dataKey="net" fill="hsl(var(--secondary))" name="net" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t('TreasuryCashflowTab.upcomingPaymentsTitle')}
              <InfoTooltip content={t('TreasuryCashflowTab.infoTooltipContent.upcomingPayments')} />
            </CardTitle>
            <CardDescription>
              {t('TreasuryCashflowTab.upcomingPaymentsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{t(`TreasuryCashflowTab.upcomingPaymentDescriptions.${payment.descriptionKey}`)}</div>
                    <div className="text-sm text-muted-foreground">{payment.date}</div>
                  </div>
                  <div className="text-end"> {/* `text-end` pour alignement compatible RTL */}
                    <div className="font-bold">{payment.amount.toLocaleString()} {t('TreasuryCashflowTab.currency')}</div>
                    <Badge variant="outline" className="text-xs">
                      {t(`TreasuryCashflowTab.paymentTypes.${payment.typeKey}`)}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between font-bold">
                  <span>{t('TreasuryCashflowTab.totalToPay')}</span>
                  <span>{totalUpcomingOutflows.toLocaleString()} {t('TreasuryCashflowTab.currency')}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t('TreasuryCashflowTab.riskAnalysisTitle')}
              <InfoTooltip content={t('TreasuryCashflowTab.infoTooltipContent.riskAnalysis')} />
            </CardTitle>
            <CardDescription>
              {t('TreasuryCashflowTab.riskAnalysisDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
                <TrendingUp className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
                {t('TreasuryCashflowTab.favorableSituationTitle')}
              </div>
              <p className="text-sm text-green-700">{t('TreasuryCashflowTab.favorableSituationText')}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">{t('TreasuryCashflowTab.currentBalanceLabel')}</span>
                <span className="font-medium">{currentBalance.toLocaleString()} {t('TreasuryCashflowTab.currency')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{t('TreasuryCashflowTab.scheduledPaymentsLabel')}</span>
                <span className="font-medium text-red-600">- {totalUpcomingOutflows.toLocaleString()} {t('TreasuryCashflowTab.currency')}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">{t('TreasuryCashflowTab.balanceAfterPaymentsLabel')}</span>
                <span className="font-bold">{(currentBalance - totalUpcomingOutflows).toLocaleString()} {t('TreasuryCashflowTab.currency')}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>{t('TreasuryCashflowTab.recommendationPrefix')}</strong> {t('TreasuryCashflowTab.recommendationText')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}