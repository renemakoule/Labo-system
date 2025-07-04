"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PatientIdentification } from "./payment/PatientIdentification"
import { InvoiceDetails, type Invoice } from "./payment/InvoiceDetails"
import { PaymentModal } from "./payment/PaymentModal"

const mockInvoices: Record<string, Invoice> = {
  // ... (données mock inchangées)
}

type PaymentStep = "identification" | "invoice_details"

export function AccueilPaiement() {
  const [step, setStep] = useState<PaymentStep>("identification")
  const [isLoading, setIsLoading] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage();

  const handlePatientFound = (patientId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      const invoice = mockInvoices[patientId]
      if (invoice) {
        setCurrentInvoice(invoice)
        setStep("invoice_details")
      } else {
        toast({
          title: t('AccueilPaiement.toastPatientNotFoundTitle'),
          description: t('AccueilPaiement.toastPatientNotFoundDesc', { patientId }),
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
    handleBackToIdentification()
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full bg-background">
        <div className="p-6 space-y-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('AccueilPaiement.pageTitle')}</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                    <button className="p-1 rounded-full">
                        <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{t('AccueilPaiement.pageInfo')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('AccueilPaiement.pageDescription')}</p>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <p className="mt-4 text-gray-600 dark:text-gray-300">{t('AccueilPaiement.loadingInvoice')}</p>
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