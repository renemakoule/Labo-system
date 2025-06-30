"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, CreditCard, Calendar, Percent } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

const analysisPrice = [
  { name: "Hémogramme Complet", code: "HEM001", price: 25000, category: "Hématologie" },
  { name: "Glycémie à Jeun", code: "BIO001", price: 15000, category: "Biochimie" },
  { name: "Créatinine", code: "BIO002", price: 20000, category: "Biochimie" },
  { name: "Cholestérol Total", code: "BIO003", price: 30000, category: "Biochimie" },
  { name: "TSH", code: "IMM001", price: 45000, category: "Immunologie" },
]

const paymentRules = {
  depositPercentage: 70,
  paymentDelay: 15,
  latePaymentFee: 5,
  maxCreditAmount: 500000,
}

const commissionRates = [
  { method: "Espèces", rate: 0, description: "Aucun frais" },
  { method: "Carte Bancaire", rate: 2.0, description: "2% du montant" },
  { method: "Mobile Money", rate: 2.5, description: "2.5% du montant" },
  { method: "Virement", rate: 0.5, description: "0.5% min 2000 FCFA" },
]

export function SettingsFinancialTab() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader><CardTitle className="flex items-center gap-2 text-blue-800"><Eye className="h-5 w-5" />Paramètres Financiers - Vue Lecture Seule</CardTitle><CardDescription className="text-blue-700">Cette section présente les règles financières actuellement configurées. Pour toute modification, contactez l'administrateur.</CardDescription></CardHeader>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" />Règles de Paiement</CardTitle><CardDescription>Configuration des modalités de paiement et de crédit</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3"><div className="flex justify-between items-center"><span className="text-sm font-medium">Acompte Obligatoire</span><Badge variant="outline" className="text-lg">{paymentRules.depositPercentage}%</Badge></div><div className="text-sm text-muted-foreground">Pourcentage minimum à payer</div></div>
            <div className="space-y-3"><div className="flex justify-between items-center"><span className="text-sm font-medium">Délai de Paiement</span><Badge variant="outline" className="text-lg">{paymentRules.paymentDelay} jours</Badge></div><div className="text-sm text-muted-foreground">Délai pour le solde restant</div></div>
            <div className="space-y-3"><div className="flex justify-between items-center"><span className="text-sm font-medium">Pénalité de Retard</span><Badge variant="destructive" className="text-lg">{paymentRules.latePaymentFee}%</Badge></div><div className="text-sm text-muted-foreground">Majoration après échéance</div></div>
            <div className="space-y-3"><div className="flex justify-between items-center"><span className="text-sm font-medium">Crédit Maximum</span><Badge variant="outline" className="text-lg">{paymentRules.maxCreditAmount.toLocaleString()} FCFA</Badge></div><div className="text-sm text-muted-foreground">Montant maximum par patient</div></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Tarification des Analyses</CardTitle><CardDescription>Prix unitaires actuellement en vigueur</CardDescription></CardHeader>
        <CardContent>
          <Table><TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Nom de l'Analyse</TableHead><TableHead>Catégorie</TableHead><TableHead className="text-right">Prix Unitaire</TableHead></TableRow></TableHeader>
            <TableBody>{analysisPrice.map((analysis) => (<TableRow key={analysis.code}><TableCell className="font-mono text-sm">{analysis.code}</TableCell><TableCell className="font-medium">{analysis.name}</TableCell><TableCell><Badge variant="secondary">{analysis.category}</Badge></TableCell><TableCell className="text-right font-bold">{analysis.price.toLocaleString()} FCFA</TableCell></TableRow>))}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}