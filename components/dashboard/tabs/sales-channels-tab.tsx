"use client"

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Données de simulation
// Note: Si les noms des canaux de paiement ('Mobile Money', 'Espèces', 'Carte Bancaire')
// devaient être traduits dans le graphique et le tableau, ils devraient être des clés
// de traduction ou gérés via un mapping. Pour la simplicité et l'efficacité, on les
// gardera comme identifiants dans les données et on les traduira via une fonction getTranslatedChannelName.
const paymentChannelsData = [
  { name: "Mobile Money", value: 45, amount: 5643000, transactions: 892, fees: 112800 },
  { name: "Espèces", value: 35, amount: 4387500, transactions: 654, fees: 0 },
  { name: "Carte Bancaire", value: 20, amount: 2506000, transactions: 234, fees: 50100 },
];

const COLORS = ["hsl(142, 76%, 36%)", "hsl(221, 83%, 53%)", "hsl(262, 83%, 58%)"];

export function SalesChannelsTab() {
  // Initialisez votre hook de langue personnalisé
  const { t } = useLanguage();

  const totalAmount = paymentChannelsData.reduce((sum, item) => sum + item.amount, 0);
  const totalFees = paymentChannelsData.reduce((sum, item) => sum + item.fees, 0);

  // Fonction pour traduire les noms des canaux de paiement
  const getTranslatedChannelName = (name: string) => {
    // Convertit le nom en clé compatible JSON (ex: "Mobile Money" -> "MobileMoney")
    const key = name.replace(/\s/g, '');
    return t(`SalesChannelsTab.channels.${key}`) || name; // Retourne l'original si pas de traduction
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t('SalesChannelsTab.paymentChannelDistributionTitle')}
            </CardTitle>
            <CardDescription>
              {t('SalesChannelsTab.paymentChannelDistributionDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentChannelsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // Traduire le nom du canal dans le label du graphique
                    label={({ name, value }) => `${getTranslatedChannelName(name as string)}\n${value}%`}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {paymentChannelsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  {/* Traduire le nom du canal dans le tooltip */}
                  <Tooltip
                    formatter={(value: number, name: string, props) => [
                      `${value}% (${props.payload.amount.toLocaleString()} ${t('SalesChannelsTab.currency')})`,
                      getTranslatedChannelName(name),
                    ]}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t('SalesChannelsTab.financialSummaryTitle')}
            </CardTitle>
            <CardDescription>
              {t('SalesChannelsTab.financialSummaryDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('SalesChannelsTab.totalCollected')}</span>
              <span className="text-2xl font-bold">{totalAmount.toLocaleString()} {t('SalesChannelsTab.currency')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('SalesChannelsTab.totalFees')}</span>
              <span className="text-lg font-medium text-destructive">{totalFees.toLocaleString()} {t('SalesChannelsTab.currency')}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium">{t('SalesChannelsTab.netCollected')}</span>
              <span className="text-xl font-bold text-green-600">{(totalAmount - totalFees).toLocaleString()} {t('SalesChannelsTab.currency')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t('SalesChannelsTab.paymentChannelDetailsTitle')}
          </CardTitle>
          <CardDescription>
            {t('SalesChannelsTab.paymentChannelDetailsDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('SalesChannelsTab.tableHeaders.paymentMethod')}</TableHead>
                <TableHead className="text-end">{t('SalesChannelsTab.tableHeaders.totalAmount')}</TableHead>
                <TableHead className="text-end">{t('SalesChannelsTab.tableHeaders.numTransactions')}</TableHead>
                <TableHead className="text-end">{t('SalesChannelsTab.tableHeaders.estimatedFees')}</TableHead>
                <TableHead className="text-end">{t('SalesChannelsTab.tableHeaders.net')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentChannelsData.map((channel) => (
                <TableRow key={channel.name}>
                  <TableCell className="font-medium">{getTranslatedChannelName(channel.name)}</TableCell>
                  <TableCell className="text-end">{channel.amount.toLocaleString()} {t('SalesChannelsTab.currency')}</TableCell>
                  <TableCell className="text-end">{channel.transactions}</TableCell>
                  <TableCell className="text-end">
                    {channel.fees > 0 ? `${channel.fees.toLocaleString()} ${t('SalesChannelsTab.currency')}` : "-"}
                  </TableCell>
                  <TableCell className="text-end font-medium">
                    {(channel.amount - channel.fees).toLocaleString()} {t('SalesChannelsTab.currency')}
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