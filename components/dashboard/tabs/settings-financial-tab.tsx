"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, CreditCard, Calendar, Percent } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/dashboard/info-tooltip"

// Données simulées des paramètres financiers
const analysisPrice = [
  { name: "Hémogramme Complet", code: "HEM001", price: 25, category: "Hématologie" },
  { name: "Glycémie à Jeun", code: "BIO001", price: 15, category: "Biochimie" },
  { name: "Créatinine", code: "BIO002", price: 20, category: "Biochimie" },
  { name: "Cholestérol Total", code: "BIO003", price: 30, category: "Biochimie" },
  { name: "TSH", code: "IMM001", price: 45, category: "Immunologie" },
  { name: "Sérologie Hépatite B", code: "IMM002", price: 35, category: "Immunologie" },
]

const paymentRules = {
  depositPercentage: 70,
  paymentDelay: 15,
  latePaymentFee: 5,
  maxCreditAmount: 500,
}

const commissionRates = [
  { method: "Espèces", rate: 0, description: "Aucun frais" },
  { method: "Carte Bancaire", rate: 2.0, description: "2% du montant" },
  { method: "Mobile Money", rate: 2.5, description: "2.5% du montant" },
  { method: "Virement", rate: 0.5, description: "0.5% min 2€" },
]

export function SettingsFinancialTab() {
  return (
    <div className="space-y-6">
      {/* En-tête avec avertissement */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Eye className="h-5 w-5" />
            Paramètres Financiers - Vue Lecture Seule
          </CardTitle>
          <CardDescription className="text-blue-700">
            Cette section présente les règles financières actuellement configurées dans le système. Pour toute
            modification, contactez l'administrateur système.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Règles de paiement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Règles de Paiement
            <InfoTooltip content="Configuration des modalités de paiement appliquées dans votre laboratoire. Ces règles impactent directement votre trésorerie et vos relations clients." />
          </CardTitle>
          <CardDescription>Configuration des modalités de paiement et de crédit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Acompte Obligatoire</span>
                <Badge variant="outline" className="text-lg">
                  {paymentRules.depositPercentage}%
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">Pourcentage minimum à payer lors de la consultation</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Délai de Paiement</span>
                <Badge variant="outline" className="text-lg">
                  {paymentRules.paymentDelay} jours
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">Délai accordé pour le solde restant</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pénalité de Retard</span>
                <Badge variant="destructive" className="text-lg">
                  {paymentRules.latePaymentFee}%
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">Majoration appliquée après échéance</div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Crédit Maximum</span>
                <Badge variant="outline" className="text-lg">
                  € {paymentRules.maxCreditAmount}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">Montant maximum de crédit par patient</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste de prix des analyses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tarification des Analyses
            <InfoTooltip content="Grille tarifaire officielle de vos analyses. Ces prix déterminent votre chiffre d'affaires et votre positionnement concurrentiel." />
          </CardTitle>
          <CardDescription>Prix unitaires actuellement en vigueur</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Nom de l'Analyse</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="text-right">Prix Unitaire</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysisPrice.map((analysis) => (
                <TableRow key={analysis.code}>
                  <TableCell className="font-mono text-sm">{analysis.code}</TableCell>
                  <TableCell className="font-medium">{analysis.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{analysis.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-bold">€ {analysis.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Taux de commission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Taux de Commission
            <InfoTooltip content="Frais appliqués selon le mode de paiement choisi par vos patients. Ces coûts impactent directement votre marge nette." />
          </CardTitle>
          <CardDescription>Frais appliqués selon le mode de paiement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commissionRates.map((rate, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{rate.method}</div>
                    <div className="text-sm text-muted-foreground">{rate.description}</div>
                  </div>
                  <Badge
                    variant={rate.rate === 0 ? "secondary" : rate.rate > 2 ? "destructive" : "outline"}
                    className="text-lg"
                  >
                    {rate.rate}%
                  </Badge>
                </div>
                {index < commissionRates.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Résumé des règles */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analyse la Plus Chère</CardTitle>
            <CardDescription>Prix unitaire maximum</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">TSH</div>
            <div className="text-muted-foreground">€ 45</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mode de Paiement Optimal</CardTitle>
            <CardDescription>Sans frais de commission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Espèces</div>
            <div className="text-muted-foreground">0% de frais</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Politique de Crédit</CardTitle>
            <CardDescription>Conditions actuelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 jours</div>
            <div className="text-muted-foreground">Max € 500</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
