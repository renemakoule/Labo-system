"use client"

import { useLanguage } from "@/context/language-context"
import { KPICard } from "@/components/dashboard/kpi-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

const treasuryData = [
  { date: "01/12", amount: 4500000 }, { date: "05/12", amount: 4800000 },
  { date: "10/12", amount: 5200000 }, { date: "15/12", amount: 4900000 },
  { date: "20/12", amount: 5500000 }, { date: "25/12", amount: 5800000 },
  { date: "30/12", amount: 6200000 },
]

export function OverviewTab() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title={t('CfoDashboardTabs.overviewRevenue')}
          value="12,543,000 FCFA"
          change={{ value: t('CfoDashboardTabs.overviewRevenueChange'), type: "positive" }}
          icon={DollarSign}
        >
          <div className="mt-3">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>{t('CfoDashboardTabs.overviewObjective')}</span>
              <span>83%</span>
            </div>
            <Progress value={83} className="h-2" />
          </div>
        </KPICard>

        <KPICard
          title={t('CfoDashboardTabs.overviewTreasury')}
          value="6,200,000 FCFA"
          change={{ value: t('CfoDashboardTabs.overviewTreasuryChange'), type: "positive" }}
          icon={TrendingUp}
        />

        <KPICard
          title={t('CfoDashboardTabs.overviewReceivables')}
          value="1,875,000 FCFA"
          change={{ value: t('CfoDashboardTabs.overviewReceivablesChange'), type: "negative" }}
          icon={Users}
        />

        <KPICard
          title={t('CfoDashboardTabs.overviewMargin')}
          value="68.5%"
          change={{ value: t('CfoDashboardTabs.overviewMarginChange'), type: "positive" }}
          icon={AlertTriangle}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('CfoDashboardTabs.treasuryEvolutionTitle')}
            <InfoTooltip content={t('CfoDashboardTabs.treasuryEvolutionInfo')} />
          </CardTitle>
          <CardDescription>{t('CfoDashboardTabs.treasuryEvolutionDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={treasuryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value: number) => [`${value.toLocaleString()} FCFA`, t('CfoDashboardTabs.treasuryTooltipLabel')]} />
                <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">{t('CfoDashboardTabs.lateReceivablesTitle')}<InfoTooltip content={t('CfoDashboardTabs.lateReceivablesInfo')} /></CardTitle>
            <CardDescription>{t('CfoDashboardTabs.lateReceivablesDescription')}</CardDescription>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">320,000 FCFA</div></CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">{t('CfoDashboardTabs.expiringStockTitle')}<InfoTooltip content={t('CfoDashboardTabs.expiringStockInfo')} /></CardTitle>
            <CardDescription>{t('CfoDashboardTabs.expiringStockDescription')}</CardDescription>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-orange-600">185,000 FCFA</div></CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">{t('CfoDashboardTabs.top5AnalysesTitle')}<InfoTooltip content={t('CfoDashboardTabs.top5AnalysesInfo')} /></CardTitle>
            <CardDescription>{t('CfoDashboardTabs.top5AnalysesDescription')}</CardDescription>
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-green-600">9,783,500 FCFA</div></CardContent>
        </Card>
      </div>
    </div>
  )
}