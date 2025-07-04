"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Banknote, CreditCard, Smartphone, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import type { Invoice } from "./InvoiceDetails"

interface PaymentModalProps {
  isOpen: boolean
  onClose: (paymentMade: boolean) => void
  invoice: Invoice | null
}

type PaymentMethod = "cash" | "card" | "mobile";

interface PaymentTabProps {
  invoice: Invoice;
  onConfirmPayment: (amountPaid: number, method: PaymentMethod, changeToReturn?: number) => void;
  currencyFormatter: (value: number) => string;
}

function CashPayment({ invoice, onConfirmPayment, currencyFormatter }: PaymentTabProps) {
  const { t } = useLanguage();
  const [amountReceived, setAmountReceived] = useState<string>("")
  
  const numericAmountReceived = parseFloat(amountReceived) || 0;
  const isPaymentPossible = numericAmountReceived > 0;
  const amountToRecord = Math.min(numericAmountReceived, invoice.remainingAmount);
  const changeToReturn = Math.max(0, numericAmountReceived - invoice.remainingAmount);

  return (
    <div className="space-y-4 p-6">
      <div className="space-y-2">
        <Label htmlFor="receivedAmount" className="text-base">{t('PaymentModal.amountReceivedLabel')}</Label>
        <Input id="receivedAmount" type="number" placeholder="0.00" value={amountReceived} onChange={(e) => setAmountReceived(e.target.value)} className="h-14 text-2xl font-bold" autoFocus/>
      </div>
      <div className="space-y-2">
        <Label className="text-base">{t('PaymentModal.changeToReturnLabel')}</Label>
        <Input type="text" value={currencyFormatter(changeToReturn)} readOnly className="h-12 text-lg font-bold bg-gray-100 text-green-700 dark:bg-gray-800 dark:text-green-400" />
      </div>
      <Button onClick={() => onConfirmPayment(amountToRecord, "cash", changeToReturn)} className="w-full h-12 text-lg" disabled={!isPaymentPossible}>
        <CheckCircle className="me-2" />{t('PaymentModal.confirmCashPayment')}
      </Button>
    </div>
  )
}

function CardOrMobilePayment({ invoice, onConfirmPayment, method, currencyFormatter }: PaymentTabProps & { method: 'card' | 'mobile' }) {
  const { t } = useLanguage();
  const [amountToCharge, setAmountToCharge] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => { setAmountToCharge(invoice.remainingAmount.toString()) }, [invoice]);

  const numericAmountToCharge = parseFloat(amountToCharge) || 0;
  const isAmountValid = numericAmountToCharge > 0 && numericAmountToCharge <= invoice.remainingAmount;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => { onConfirmPayment(numericAmountToCharge, method); setIsProcessing(false) }, 2000);
  }

  const renderPaymentFields = () => {
    if (method === 'card') {
      return (
        <>
          <h3 className="text-lg font-semibold text-center">{t('PaymentModal.virtualTerminalTitle')}</h3>
          <Input readOnly placeholder="**** **** **** 4242" />
          <div className="flex gap-3"><Input readOnly placeholder={t('PaymentModal.cardExpiry')} /><Input readOnly placeholder={t('PaymentModal.cardCvc')} /></div>
        </>
      )
    }
    return (
      <>
        <h3 className="text-lg font-semibold text-center">{t('PaymentModal.mobilePaymentTitle')}</h3>
        <Input placeholder={t('PaymentModal.mobilePhonePlaceholder')} type="tel" className="h-12 text-lg" />
      </>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`amountToCharge-${method}`} className="text-base">{t('PaymentModal.amountToChargeLabel')}</Label>
        <Input id={`amountToCharge-${method}`} type="number" value={amountToCharge} onChange={(e) => setAmountToCharge(e.target.value)} className="h-14 text-2xl font-bold"/>
        {!isAmountValid && amountToCharge !== "" && (
          <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />{t('PaymentModal.amountError', { amount: currencyFormatter(invoice.remainingAmount) })}
          </p>
        )}
      </div>
      {renderPaymentFields()}
      <Button onClick={handlePay} className="w-full h-12 text-lg" disabled={!isAmountValid || isProcessing}>
        {isProcessing ? <Loader2 className="animate-spin me-2" /> : (method === 'card' ? <CreditCard className="me-2" /> : <Smartphone className="me-2" />)}
        {isProcessing ? t('PaymentModal.processing') : t('PaymentModal.payButton', { amount: currencyFormatter(numericAmountToCharge) })}
      </Button>
    </div>
  )
}

export function PaymentModal({ isOpen, onClose, invoice }: PaymentModalProps) {
  const { t, locale } = useLanguage();
  
  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'XOF', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  }
  
  if (!invoice) return null;

  const handlePaymentSuccess = (amountPaid: number, _method: PaymentMethod, changeToReturn?: number) => {
    const newRemainingBalance = invoice.remainingAmount - amountPaid;
    if (newRemainingBalance > 0) {
      toast.info(t('PaymentModal.toastPartialSuccessTitle'), { 
        description: t('PaymentModal.toastPartialSuccessDesc', { paid: currencyFormatter(amountPaid), remaining: currencyFormatter(newRemainingBalance) }), 
        duration: 8000 
      });
    } else {
      let successDescription = t('PaymentModal.toastFullSuccessDesc1', { invoiceId: invoice.id });
      if (changeToReturn && changeToReturn > 0) { 
        successDescription += ` ${t('PaymentModal.toastFullSuccessDesc2', { change: currencyFormatter(changeToReturn) })}`;
      }
      toast.success(t('PaymentModal.toastFullSuccessTitle'), { description: successDescription });
    }
    onClose(true);
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose(false)}>
      <DialogContent className="sm:max-w-lg p-0">
        <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-2xl">{t('PaymentModal.title')}</DialogTitle>
            <DialogDescription>{t('PaymentModal.description', { patientId: invoice.patientId, invoiceId: invoice.id })}</DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">{t('PaymentModal.remainingAmountLabel')}</p>
                <p className="text-4xl font-bold text-blue-900 dark:text-blue-200">{currencyFormatter(invoice.remainingAmount)}</p>
            </div>
        </div>
        <Tabs defaultValue="cash" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cash"><Banknote className="me-2" /> {t('PaymentModal.tabCash')}</TabsTrigger>
              <TabsTrigger value="card"><CreditCard className="me-2" /> {t('PaymentModal.tabCard')}</TabsTrigger>
              <TabsTrigger value="mobile"><Smartphone className="me-2" /> {t('PaymentModal.tabMobile')}</TabsTrigger>
          </TabsList>
          <TabsContent value="cash">
            <CashPayment invoice={invoice} onConfirmPayment={handlePaymentSuccess} currencyFormatter={currencyFormatter} />
          </TabsContent>
          <TabsContent value="card">
            <CardOrMobilePayment invoice={invoice} onConfirmPayment={handlePaymentSuccess} method="card" currencyFormatter={currencyFormatter} />
          </TabsContent>
          <TabsContent value="mobile">
            <CardOrMobilePayment invoice={invoice} onConfirmPayment={handlePaymentSuccess} method="mobile" currencyFormatter={currencyFormatter} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}