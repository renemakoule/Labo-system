"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Importation des nouveaux composants modulaires
import { PatientIdentification } from "./payment/PatientIdentification"
import { InvoiceDetails, type Invoice } from "./payment/InvoiceDetails"
import { PaymentModal } from "./payment/PaymentModal"

// Données Mock Anonymisées
const mockInvoices: Record<string, Invoice> = {
  "A-140": {
    id: "FACT-2024-001",
    patientId: "A-140",
    date: "15/01/2024",
    amount: 145500,
    status: "partial",
    items: [
      { name: "Numération Formule Sanguine", price: 45000 },
      { name: "Glycémie à jeun", price: 25000 },
      { name: "Cholestérol total", price: 30000 },
      { name: "Consultation", price: 45500 },
    ],
    paidAmount: 100000,
    remainingAmount: 45500,
  },
  "A-141": {
    id: "FACT-2024-002",
    patientId: "A-141",
    date: "15/01/2024",
    amount: 89000,
    status: "unpaid",
    items: [
      { name: "Hémoglobine glyquée", price: 65000 },
      { name: "Consultation", price: 24000 },
    ],
    paidAmount: 0,
    remainingAmount: 89000,
  },
  "A-137": {
    id: "FACT-2024-003",
    patientId: "A-137",
    date: "14/01/2024",
    amount: 120000,
    status: "paid",
    items: [
      { name: "Bilan hépatique complet", price: 95000 },
      { name: "Consultation", price: 25000 },
    ],
    paidAmount: 120000,
    remainingAmount: 0,
  },
}

type PaymentStep = "identification" | "invoice_details"

export function AccueilPaiement() {
  const [step, setStep] = useState<PaymentStep>("identification")
  const [isLoading, setIsLoading] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const { toast } = useToast()

  const handlePatientFound = (patientId: string) => {
    setIsLoading(true)
    // Simuler un appel API pour récupérer la facture
    setTimeout(() => {
      const invoice = mockInvoices[patientId]
      if (invoice) {
        setCurrentInvoice(invoice)
        setStep("invoice_details")
      } else {
        toast({
          title: "Patient non trouvé",
          description: `Aucune facture en attente trouvée pour le patient ${patientId}.`,
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleBackToIdentification = () => {
    setCurrentInvoice(null)
    setStep("identification")
  }

  const handleProceedToPayment = () => {
    setIsPaymentModalOpen(true)
  }

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false)
    // Re-fetch invoice or reset
    handleBackToIdentification()
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full bg-background">
        <div className="p-6 space-y-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Espace Paiement</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Ce module gère le flux de paiement sécurisé. Identifiez le patient, consultez la facture, et procédez au paiement.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600">Suivi des paiements, soldes et facturation.</p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="mt-4 text-gray-600">Recherche de la facture...</p>
            </div>
          )}

          {!isLoading && step === "identification" && (
            <PatientIdentification onPatientFound={handlePatientFound} isLoading={isLoading} />
          )}

          {!isLoading && step === "invoice_details" && currentInvoice && (
            <InvoiceDetails
              invoice={currentInvoice}
              onBack={handleBackToIdentification}
              onProceedToPayment={handleProceedToPayment}
            />
          )}

          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={handleClosePaymentModal}
            invoice={currentInvoice}
          />
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}