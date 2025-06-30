"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Banknote, CreditCard, Smartphone, CheckCircle, Loader2, AlertCircle } from "lucide-react"

// Types pour la facture et les props
import type { Invoice } from "./InvoiceDetails"

interface PaymentModalProps {
  isOpen: boolean
  onClose: (paymentMade: boolean) => void
  invoice: Invoice | null
}

type PaymentMethod = "cash" | "card" | "mobile";

// --- PROPS POUR LES SOUS-COMPOSANTS ---
interface PaymentTabProps {
  invoice: Invoice;
  // La fonction de confirmation est maintenant plus précise
  onConfirmPayment: (amountPaid: number, method: PaymentMethod, changeToReturn?: number) => void;
}


// --- SOUS-COMPOSANTS DE PAIEMENT REFACTORISÉS ---

function CashPayment({ invoice, onConfirmPayment }: PaymentTabProps) {
  const [amountReceived, setAmountReceived] = useState<string>("")
  
  const numericAmountReceived = parseFloat(amountReceived) || 0
  const isPaymentPossible = numericAmountReceived > 0

  // Calcule le montant qui sera effectivement appliqué à la facture
  const amountToRecord = Math.min(numericAmountReceived, invoice.remainingAmount)
  // Calcule la monnaie à rendre si le montant reçu est supérieur au montant dû
  const changeToReturn = Math.max(0, numericAmountReceived - invoice.remainingAmount)

  return (
    <div className="space-y-4 p-6">
      <div className="space-y-2">
        <Label htmlFor="receivedAmount" className="text-base">Montant Reçu du Patient (FCFA)</Label>
        <Input
          id="receivedAmount"
          type="number"
          placeholder="0.00"
          value={amountReceived}
          onChange={(e) => setAmountReceived(e.target.value)}
          className="h-14 text-2xl font-bold"
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base">Monnaie à Rendre</Label>
        <Input type="text" value={`${changeToReturn.toFixed(2)} FCFA`} readOnly className="h-12 text-lg font-bold bg-gray-100 text-green-700" />
      </div>
      <Button
        onClick={() => onConfirmPayment(amountToRecord, "cash", changeToReturn)}
        className="w-full h-12 text-lg"
        disabled={!isPaymentPossible}
      >
        <CheckCircle className="mr-2" />
        Confirmer Paiement Espèces
      </Button>
    </div>
  )
}

function CardOrMobilePayment({ invoice, onConfirmPayment, method }: PaymentTabProps & { method: 'card' | 'mobile' }) {
  const [amountToCharge, setAmountToCharge] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setAmountToCharge(invoice.remainingAmount.toString())
  }, [invoice])

  const numericAmountToCharge = parseFloat(amountToCharge) || 0
  const isAmountValid = numericAmountToCharge > 0 && numericAmountToCharge <= invoice.remainingAmount

  const handlePay = () => {
    setIsProcessing(true)
    setTimeout(() => {
      onConfirmPayment(numericAmountToCharge, method)
      setIsProcessing(false)
    }, 2000)
  }

  const renderContent = () => {
    if (method === 'card') {
      return (
        <>
          <h3 className="text-lg font-semibold text-center">Terminal de Paiement Virtuel</h3>
          <Input readOnly placeholder="**** **** **** 4242" />
          <div className="flex gap-3">
            <Input readOnly placeholder="MM/AA" />
            <Input readOnly placeholder="CVC" />
          </div>
        </>
      )
    }
    return (
      <>
        <h3 className="text-lg font-semibold text-center">Paiement par Mobile Money</h3>
        <Input placeholder="Numéro de téléphone du patient" type="tel" className="h-12 text-lg" />
      </>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`amountToCharge-${method}`} className="text-base">Montant à Débiter (FCFA)</Label>
        <Input
          id={`amountToCharge-${method}`}
          type="number"
          value={amountToCharge}
          onChange={(e) => setAmountToCharge(e.target.value)}
          className="h-14 text-2xl font-bold"
        />
        {!isAmountValid && amountToCharge !== "" && (
          <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            Doit être entre 1 et {invoice.remainingAmount.toLocaleString()} FCFA.
          </p>
        )}
      </div>
      {renderContent()}
      <Button onClick={handlePay} className="w-full h-12 text-lg" disabled={!isAmountValid || isProcessing}>
        {isProcessing ? <Loader2 className="animate-spin mr-2" /> : (method === 'card' ? <CreditCard className="mr-2" /> : <Smartphone className="mr-2" />)}
        {isProcessing ? "Traitement..." : `Payer ${numericAmountToCharge.toLocaleString()} FCFA`}
      </Button>
    </div>
  )
}

// --- COMPOSANT PRINCIPAL DU MODAL ---
export function PaymentModal({ isOpen, onClose, invoice }: PaymentModalProps) {
  if (!invoice) return null

  const handlePaymentSuccess = (amountPaid: number, method: PaymentMethod, changeToReturn?: number) => {
    const newRemainingBalance = invoice.remainingAmount - amountPaid

    if (newRemainingBalance > 0) {
      toast.info("Paiement Partiel Réussi", {
        description: `Paiement de ${amountPaid.toLocaleString()} FCFA enregistré. Reste à payer : ${newRemainingBalance.toLocaleString()} FCFA.`,
        duration: 8000,
      })
    } else {
      let successDescription = `La facture ${invoice.id} a été entièrement soldée.`
      if (changeToReturn && changeToReturn > 0) {
        successDescription += ` Monnaie à rendre : ${changeToReturn.toLocaleString()} FCFA.`
      }
      toast.success("Paiement Complet Réussi", {
        description: successDescription,
      })
    }
    onClose(true)
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose(false)}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl">Effectuer un Paiement</DialogTitle>
          <DialogDescription>Patient {invoice.patientId} - Facture {invoice.id}</DialogDescription>
        </DialogHeader>

        <div className="p-6 pt-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">Montant Total Restant Dû</p>
                <p className="text-4xl font-bold text-blue-900">{invoice.remainingAmount.toLocaleString()} FCFA</p>
            </div>
        </div>

        <Tabs defaultValue="cash" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cash"><Banknote className="mr-2" /> Espèces</TabsTrigger>
            <TabsTrigger value="card"><CreditCard className="mr-2" /> Carte</TabsTrigger>
            <TabsTrigger value="mobile"><Smartphone className="mr-2" /> Mobile Money</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cash">
            <CashPayment invoice={invoice} onConfirmPayment={handlePaymentSuccess} />
          </TabsContent>
          <TabsContent value="card">
            <CardOrMobilePayment invoice={invoice} onConfirmPayment={handlePaymentSuccess} method="card" />
          </TabsContent>
          <TabsContent value="mobile">
            <CardOrMobilePayment invoice={invoice} onConfirmPayment={handlePaymentSuccess} method="mobile" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}