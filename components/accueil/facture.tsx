"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileText, Plus, Eye, Download, Printer, Edit, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Exam {
  name: string;
  price: number;
  category: string;
}
interface SelectedExam extends Exam {
  quantity: number;
}
const mockInvoices = [
  { id: "FACT-2024-001", patientId: "A-140", date: "15/01/2024", amount: 145500, status: "paid", items: [{ name: "Numération Formule Sanguine", price: 45000 }, { name: "Glycémie à jeun", price: 25000 }, { name: "Cholestérol total", price: 30000 }, { name: "Consultation", price: 45500 }] },
  { id: "FACT-2024-002", patientId: "A-141", date: "15/01/2024", amount: 89000, status: "pending", items: [{ name: "Hémoglobine glyquée", price: 65000 }, { name: "Consultation", price: 24000 }] },
  { id: "FACT-2024-003", patientId: "A-137", date: "14/01/2024", amount: 120000, status: "overdue", items: [{ name: "Bilan hépatique complet", price: 95000 }, { name: "Consultation", price: 25000 }] },
]
const mockExams: Exam[] = [
  { name: "Numération Formule Sanguine", price: 45000, category: "Hématologie" },
  { name: "Glycémie à jeun", price: 25000, category: "Biochimie" },
  { name: "Cholestérol total", price: 30000, category: "Biochimie" },
  { name: "Hémoglobine glyquée", price: 65000, category: "Biochimie" },
  { name: "Bilan hépatique complet", price: 95000, category: "Biochimie" },
  { name: "TSH", price: 40000, category: "Hormonologie" },
]

export function AccueilFacture() {
  const { t, locale } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatientId, setSelectedPatientId] = useState("")
  const [selectedExams, setSelectedExams] = useState<SelectedExam[]>([])
  const [invoiceNotes, setInvoiceNotes] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(value);
  }

  const filteredInvoices = mockInvoices.filter(
    (invoice) =>
      invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  
  const addExamToInvoice = (exam: Exam) => {
    if (!selectedExams.find((item) => item.name === exam.name)) {
      setSelectedExams([...selectedExams, { ...exam, quantity: 1 }])
    }
  }
  
  const removeExamFromInvoice = (examName: string) => {
    setSelectedExams(selectedExams.filter((item) => item.name !== examName))
  }

  const calculateTotal = () => {
    return selectedExams.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCreateInvoice = () => {
    if (!selectedPatientId || selectedExams.length === 0) {
      toast({
        title: t('AccueilFacture.toastErrorTitle'),
        description: t('AccueilFacture.toastErrorDesc'),
        variant: "destructive",
      })
      return
    }
    const newInvoiceId = `FACT-2024-${String(mockInvoices.length + 1).padStart(3, "0")}`
    toast({
      title: t('AccueilFacture.toastSuccessTitle'),
      description: t('AccueilFacture.toastSuccessDesc', { invoiceId: newInvoiceId, patientId: selectedPatientId }),
    })
    setSelectedPatientId(""); setSelectedExams([]); setInvoiceNotes(""); setShowCreateDialog(false);
  }

  const getStatusLabel = (status: string) => t(`AccueilFacture.status_${status}`);

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('AccueilFacture.pageTitle')}</h1>
              <Tooltip>
                <TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger>
                <TooltipContent><p className="max-w-xs">{t('AccueilFacture.pageInfo')}</p></TooltipContent>
              </Tooltip>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('AccueilFacture.pageDescription')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilFacture.kpiToday')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">12</div><p className="text-xs text-muted-foreground">{t('AccueilFacture.kpiTodayDesc')}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilFacture.kpiTotalAmount')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-green-600">{currencyFormatter(2450000)}</div><p className="text-xs text-muted-foreground">{t('AccueilFacture.kpiTotalAmountDesc')}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilFacture.kpiPending')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-orange-600">3</div><p className="text-xs text-muted-foreground">{t('AccueilFacture.kpiPendingDesc')}</p></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{t('AccueilFacture.kpiOverdue')}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold text-red-600">1</div><p className="text-xs text-muted-foreground">{t('AccueilFacture.kpiOverdueDesc')}</p></CardContent></Card>
          </div>

          <div className="flex space-x-4 rtl:space-x-reverse mb-6">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild><Button className="bg-green-600 hover:bg-green-700"><Plus className="h-4 w-4 me-2" />{t('AccueilFacture.createButton')}</Button></DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{t('AccueilFacture.dialogTitle')}</DialogTitle></DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4"><div className="space-y-1"><Label htmlFor="patientId">{t('AccueilFacture.dialogPatientId')} *</Label><Input id="patientId" value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} placeholder={t('AccueilFacture.dialogPatientIdPlaceholder')} className="mt-1"/></div><div className="space-y-1"><Label>{t('AccueilFacture.dialogDate')}</Label><Input type="date" defaultValue={new Date().toISOString().split("T")[0]} /></div></div>
                  <div><Label>{t('AccueilFacture.dialogAvailableExams')}</Label><div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-lg p-4">{mockExams.map((exam) => (<Button key={exam.name} variant="outline" size="sm" onClick={() => addExamToInvoice(exam)} className="justify-start h-auto p-2"><div className="text-start"><div className="font-medium text-xs">{exam.name}</div><div className="text-xs text-gray-500">{currencyFormatter(exam.price)}</div></div></Button>))}</div></div>
                  <div><Label>{t('AccueilFacture.dialogSelectedExams')}</Label><div className="space-y-2 mt-2">{selectedExams.map((item) => (<div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 rounded"><span className="text-sm">{item.name}</span><div className="flex items-center space-x-2 rtl:space-x-reverse"><span className="text-sm font-medium">{currencyFormatter(item.price)}</span><Button variant="outline" size="sm" onClick={() => removeExamFromInvoice(item.name)}>×</Button></div></div>))}</div>{selectedExams.length > 0 && (<div className="mt-4 p-4 bg-blue-50 rounded-lg"><div className="flex justify-between items-center"><span className="font-semibold">{t('AccueilFacture.dialogTotal')}:</span><span className="text-xl font-bold text-blue-600">{currencyFormatter(calculateTotal())}</span></div></div>)}</div>
                  <div><Label htmlFor="notes">{t('AccueilFacture.dialogNotes')}</Label><Textarea id="notes" value={invoiceNotes} onChange={(e) => setInvoiceNotes(e.target.value)} placeholder={t('AccueilFacture.dialogNotesPlaceholder')} /></div>
                  <Button className="w-full" onClick={handleCreateInvoice}><FileText className="h-4 w-4 me-2" />{t('AccueilFacture.dialogCreateButton')}</Button>
                </div>
              </DialogContent>
            </Dialog>
            <div className="flex-1 relative"><Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" /><Input placeholder={t('AccueilFacture.searchPlaceholder')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="ps-10"/></div>
          </div>

          <Card>
            <CardHeader><CardTitle>{t('AccueilFacture.historyTitle')}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse min-w-0 flex-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{invoice.id} - {t('AccueilFacture.patientLabel')} {invoice.patientId}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('AccueilFacture.dateLabel')}: {invoice.date} • {t('AccueilFacture.amountLabel')}: {currencyFormatter(invoice.amount)}</p>
                        <p className="text-sm text-gray-500 truncate">{t('AccueilFacture.examCount', {count: invoice.items.length})} • {invoice.items.map((item) => item.name).join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse flex-shrink-0">
                      <Badge variant={invoice.status === "paid" ? "default" : invoice.status === "pending" ? "secondary" : "destructive"}>{getStatusLabel(invoice.status)}</Badge>
                      <div className="flex space-x-2 rtl:space-x-reverse"><Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button><Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button><Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button><Button variant="outline" size="sm"><Printer className="h-4 w-4" /></Button></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}