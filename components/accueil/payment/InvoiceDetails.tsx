"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react"

// Anonymisation: Plus de nom de patient, uniquement l'ID
export type InvoiceItem = { name: string; price: number }
export type Invoice = {
  id: string
  patientId: string
  date: string
  amount: number
  status: "paid" | "partial" | "unpaid" | "overdue"
  items: InvoiceItem[]
  paidAmount: number
  remainingAmount: number
}

interface InvoiceDetailsProps {
  invoice: Invoice
  onBack: () => void
  onProceedToPayment: () => void
}

export function InvoiceDetails({ invoice, onBack, onProceedToPayment }: InvoiceDetailsProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Changer de patient
      </Button>

      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50/50">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-blue-800">Détails de la Facture</CardTitle>
              <p className="text-gray-600">
                Facture <span className="font-mono font-semibold">{invoice.id}</span> pour le patient{" "}
                <span className="font-mono font-semibold">{invoice.patientId}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Date: {invoice.date}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 mb-6">
            {invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-gray-700">
                <span>{item.name}</span>
                <span className="font-mono">{item.price.toFixed(2)} FCFA</span>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Montant Total</span>
              <span className="font-semibold text-gray-800">{invoice.amount.toFixed(2)} FCFA</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600">Déjà Payé</span>
              <span className="font-semibold text-green-600">{invoice.paidAmount.toFixed(2)} FCFA</span>
            </div>
            <div className="flex justify-between items-center text-xl p-4 bg-yellow-50 rounded-lg">
              <span className="font-bold text-yellow-800">Montant Restant à Payer</span>
              <span className="font-bold text-yellow-800">{invoice.remainingAmount.toFixed(2)} FCFA</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 h-12 text-base"
              onClick={onProceedToPayment}
              disabled={invoice.remainingAmount <= 0}
            >
              <ShieldCheck className="h-5 w-5 mr-2" />
              Procéder au Paiement ({invoice.remainingAmount.toFixed(2)} FCFA)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}