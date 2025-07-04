"use client"

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, CreditCard, Calendar, Percent } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip" // InfoTooltip est un composant, pas une chaîne à traduire directement ici.

// Données de simulation
// Note: Les noms d'analyse et catégories seront mappés à des clés de traduction.
const analysisPrice = [
  { nameKey: "CompleteHemogram", code: "HEM001", price: 25000, categoryKey: "Hematology" },
  { nameKey: "FastingGlucose", code: "BIO001", price: 15000, categoryKey: "Biochemistry" },
  { nameKey: "Creatinine", code: "BIO002", price: 20000, categoryKey: "Biochemistry" },
  { nameKey: "TotalCholesterol", code: "BIO003", price: 30000, categoryKey: "Biochemistry" },
  { nameKey: "TSH", code: "IMM001", price: 45000, categoryKey: "Immunology" },
];

const paymentRules = {
  depositPercentage: 70,
  paymentDelay: 15,
  latePaymentFee: 5,
  maxCreditAmount: 500000,
};

// commissionRates n'est pas utilisé dans le rendu actuel du composant, mais les descriptions
// pourraient être traduites si elles étaient affichées. Je vais les inclure dans le JSON.
const commissionRates = [
  { method: "Cash", rate: 0, descriptionKey: "NoFees" },
  { method: "BankCard", rate: 2.0, descriptionKey: "2PercentOfAmount" },
  { method: "MobileMoney", rate: 2.5, descriptionKey: "2_5PercentOfAmount" },
  { method: "Transfer", rate: 0.5, descriptionKey: "0_5PercentMin2000" },
];

export function SettingsFinancialTab() {
  // Initialisez votre hook de langue personnalisé
  const { t } = useLanguage();

  // Fonctions pour traduire les noms d'analyse et les catégories
  const getTranslatedAnalysisName = (nameKey: string) => {
    return t(`SettingsFinancialTab.analysisNames.${nameKey}`) || nameKey;
  };
  const getTranslatedCategoryName = (categoryKey: string) => {
    return t(`SettingsFinancialTab.categories.${categoryKey}`) || categoryKey;
  };

  return (
    <div className="space-y-6">
      {/* Carte d'information en lecture seule */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Eye className="h-5 w-5" />
            {t('SettingsFinancialTab.readOnlyTitle')}
          </CardTitle>
          <CardDescription className="text-blue-700">
            {t('SettingsFinancialTab.readOnlyDescription')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Carte des règles de paiement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t('SettingsFinancialTab.paymentRulesTitle')}
          </CardTitle>
          <CardDescription>
            {t('SettingsFinancialTab.paymentRulesDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Acompte Obligatoire */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('SettingsFinancialTab.mandatoryDeposit')}</span>
                <Badge variant="outline" className="text-lg">{paymentRules.depositPercentage}%</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{t('SettingsFinancialTab.minDepositDescription')}</div>
            </div>
            {/* Délai de Paiement */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('SettingsFinancialTab.paymentDelay')}</span>
                <Badge variant="outline" className="text-lg">{paymentRules.paymentDelay} {t('SettingsFinancialTab.days')}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{t('SettingsFinancialTab.remainingBalanceDelayDescription')}</div>
            </div>
            {/* Pénalité de Retard */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('SettingsFinancialTab.latePaymentPenalty')}</span>
                <Badge variant="destructive" className="text-lg">{paymentRules.latePaymentFee}%</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{t('SettingsFinancialTab.penaltyDescription')}</div>
            </div>
            {/* Crédit Maximum */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t('SettingsFinancialTab.maxCredit')}</span>
                <Badge variant="outline" className="text-lg">{paymentRules.maxCreditAmount.toLocaleString()} {t('SettingsFinancialTab.currency')}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">{t('SettingsFinancialTab.maxAmountPerPatientDescription')}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carte de tarification des analyses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('SettingsFinancialTab.analysisPricingTitle')}
          </CardTitle>
          <CardDescription>
            {t('SettingsFinancialTab.analysisPricingDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('SettingsFinancialTab.tableHeaders.code')}</TableHead>
                <TableHead>{t('SettingsFinancialTab.tableHeaders.analysisName')}</TableHead>
                <TableHead>{t('SettingsFinancialTab.tableHeaders.category')}</TableHead>
                <TableHead className="text-end">{t('SettingsFinancialTab.tableHeaders.unitPrice')}</TableHead> {/* `text-end` pour alignement compatible RTL */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysisPrice.map((analysis) => (
                <TableRow key={analysis.code}>
                  <TableCell className="font-mono text-sm">{analysis.code}</TableCell>
                  <TableCell className="font-medium">{getTranslatedAnalysisName(analysis.nameKey)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{getTranslatedCategoryName(analysis.categoryKey)}</Badge>
                  </TableCell>
                  <TableCell className="text-end font-bold">{analysis.price.toLocaleString()} {t('SettingsFinancialTab.currency')}</TableCell> {/* `text-end` pour alignement compatible RTL */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}