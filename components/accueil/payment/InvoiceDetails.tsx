"use client"

import { useLanguage } from "@/context/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShieldCheck } from "lucide-react"

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
  const { t, locale } = useLanguage();

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'XOF' }).format(value);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 me-2" />
        {t('InvoiceDetails.changePatient')}
      </Button>

      <Card className="border-blue-200 shadow-lg">
        <CardHeader className="bg-blue-50/50 dark:bg-blue-900/20">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl text-blue-800 dark:text-blue-300">{t('InvoiceDetails.title')}</CardTitle>
              <p className="text-gray-600 dark:text-gray-400">
                {t('InvoiceDetails.invoice')} <span className="font-mono font-semibold">{invoice.id}</span> {t('InvoiceDetails.forPatient')}{" "}
                <span className="font-mono font-semibold">{invoice.patientId}</span>
              </p>
            </div>
            <div className="text-end">
              <p className="text-sm text-gray-500">{t('InvoiceDetails.date')}: {invoice.date}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 mb-6">
            {invoice.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                <span>{item.name}</span>
                <span className="font-mono">{currencyFormatter(item.price)}</span>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600 dark:text-gray-400">{t('InvoiceDetails.totalAmount')}</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{currencyFormatter(invoice.amount)}</span>
            </div>
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600 dark:text-gray-400">{t('InvoiceDetails.alreadyPaid')}</span>
              <span className="font-semibold text-green-600">{currencyFormatter(invoice.paidAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-xl p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <span className="font-bold text-yellow-800 dark:text-yellow-300">{t('InvoiceDetails.remainingAmount')}</span>
              <span className="font-bold text-yellow-800 dark:text-yellow-300">{currencyFormatter(invoice.remainingAmount)}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 h-12 text-base"
              onClick={onProceedToPayment}
              disabled={invoice.remainingAmount <= 0}
            >
              <ShieldCheck className="h-5 w-5 me-2" />
              {t('InvoiceDetails.proceedToPayment')} ({currencyFormatter(invoice.remainingAmount)})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}