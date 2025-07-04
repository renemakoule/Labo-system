"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BadgeIcon as IdCard, User, ScanLine, X, RefreshCw, Check, CheckCircle, CreditCard, Banknote, Plus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Les données mock restent en français car elles simulent une lecture OCR
const mockOCRData = [
  { nom: "BENALI", prenom: "AMINA", dateNaissance: "15/03/1985", lieuNaissance: "CASABLANCA", cin: "BK123456", adresse: "123 RUE MOHAMMED V, CASABLANCA", telephone: "0612345678", sexe: "F" },
  { nom: "ALAOUI", prenom: "YOUSSEF", dateNaissance: "22/07/1978", lieuNaissance: "RABAT", cin: "AB789012", adresse: "45 AVENUE HASSAN II, RABAT", telephone: "0687654321", sexe: "M" },
]

interface ScannedDataType {
  nom: string; prenom: string; dateNaissance: string; lieuNaissance: string; cin: string; adresse: string; telephone: string; sexe: string; id?: string; name?: string; amount?: number;
}

interface PatientRegistrationProps {
  selectedPatient?: any
  onBack: () => void
}

export function PatientRegistration({ selectedPatient, onBack }: PatientRegistrationProps) {
  const [registrationStep, setRegistrationStep] = useState(selectedPatient ? "payment" : "method")
  const [scanningProgress, setScanningProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<ScannedDataType | null>(selectedPatient || null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const { t, locale } = useLanguage();
  const { toast } = useToast();

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'XOF', minimumFractionDigits: 2 }).format(value);
  }

  const startIDScanning = async () => {
    setRegistrationStep("scanning")
    setIsScanning(true)
    setScanningProgress(0)
    const interval = setInterval(() => {
      setScanningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          const randomData = mockOCRData[Math.floor(Math.random() * mockOCRData.length)]
          setScannedData(randomData)
          setRegistrationStep("form")
          toast({ title: t('PatientRegistration.toastScanSuccessTitle'), description: t('PatientRegistration.toastScanSuccessDesc') })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleManualEntry = () => {
    setRegistrationStep("form")
    setScannedData({ nom: "", prenom: "", dateNaissance: "", lieuNaissance: "", cin: "", adresse: "", telephone: "", sexe: "" })
  }

  const handleFormSubmit = () => {
    if (!scannedData || !scannedData.nom || !scannedData.prenom || !scannedData.cin) {
      toast({ title: t('PatientRegistration.toastFormErrorTitle'), description: t('PatientRegistration.toastFormErrorDesc'), variant: "destructive" })
      return
    }
    const newPatient: ScannedDataType = { ...scannedData, id: `A-${Math.floor(Math.random() * 1000) + 100}`, name: `${scannedData.prenom} ${scannedData.nom}`, amount: 100, }
    setScannedData(newPatient)
    setRegistrationStep("payment")
  }

  const handlePaymentValidation = () => {
    if (!paymentMethod) {
      toast({ title: t('PatientRegistration.toastPaymentErrorTitle'), description: t('PatientRegistration.toastPaymentErrorDesc'), variant: "destructive" })
      return
    }
    toast({ title: t('PatientRegistration.toastPaymentSuccessTitle'), description: t('PatientRegistration.toastPaymentSuccessDesc', { patientId: scannedData?.id || '' }) })
    onBack()
  }

  return (
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {registrationStep === "method" && (
            <div className="text-center space-y-6">
              <div className="mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('PatientRegistration.step1Title')}</h2>
                  <Tooltip><TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger><TooltipContent><p>{t('PatientRegistration.step1Info')}</p></TooltipContent></Tooltip>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{t('PatientRegistration.step1Description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-blue-200 hover:border-blue-300" onClick={startIDScanning}>
                  <CardContent className="flex flex-col items-center p-8">
                    <div className="bg-blue-100 p-4 rounded-full mb-4"><IdCard className="h-12 w-12 text-blue-600" /></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('PatientRegistration.scanCardTitle')}</h3>
                    <p className="text-gray-600 text-center">{t('PatientRegistration.scanCardDesc')}</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">{t('PatientRegistration.recommended')}</Badge>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow border-gray-200 hover:border-gray-300" onClick={handleManualEntry}>
                  <CardContent className="flex flex-col items-center p-8">
                    <div className="bg-gray-100 p-4 rounded-full mb-4"><User className="h-12 w-12 text-gray-600" /></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('PatientRegistration.manualEntryTitle')}</h3>
                    <p className="text-gray-600 text-center">{t('PatientRegistration.manualEntryDesc')}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="pt-4"><Button variant="outline" onClick={onBack} size="lg">{t('PatientRegistration.backToDashboard')}</Button></div>
            </div>
          )}

          {registrationStep === "scanning" && (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('PatientRegistration.step2Title')}</h2>
                <Tooltip><TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger><TooltipContent><p>{t('PatientRegistration.step2Info')}</p></TooltipContent></Tooltip>
              </div>
              <div className="relative max-w-md mx-auto">
                <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative"><video ref={videoRef} autoPlay muted className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} /><div className="absolute inset-0 flex items-center justify-center"><div className="border-2 border-blue-400 rounded-lg w-80 h-48 relative"><div className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-lg animate-pulse"></div><ScanLine className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-400 animate-bounce" /></div></div><div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded"><p className="text-sm text-center">{isScanning ? t('PatientRegistration.scanningInProgress') : t('PatientRegistration.scanningInstruction')}</p></div></div>
                <div className="mt-4 space-y-2"><div className="flex items-center justify-between text-sm"><span>{t('PatientRegistration.ocrExtraction')}</span><span>{scanningProgress}%</span></div><Progress value={scanningProgress} className="w-full" /></div>
                <div className="flex space-x-4 rtl:space-x-reverse mt-6"><Button variant="outline" onClick={() => setRegistrationStep("method")} className="flex-1"><X className="h-4 w-4 me-2" />{t('PatientRegistration.cancel')}</Button><Button onClick={startIDScanning} disabled={isScanning} className="flex-1"><RefreshCw className={`h-4 w-4 me-2 ${isScanning ? "animate-spin" : ""}`} />{isScanning ? t('PatientRegistration.scanningInProgress') : t('PatientRegistration.rescan')}</Button></div>
              </div>
            </div>
          )}

          {registrationStep === "form" && scannedData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('PatientRegistration.step3Title')}</h2><Tooltip><TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger><TooltipContent><p>{t('PatientRegistration.step3Info')}</p></TooltipContent></Tooltip></div>
                {scannedData.nom && (<Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 me-1" />{t('PatientRegistration.ocrDataExtracted')}</Badge>)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label htmlFor="nom">{t('PatientRegistration.formLastName')} *</Label><Input id="nom" value={scannedData.nom} onChange={(e) => setScannedData({ ...scannedData, nom: e.target.value })} className="mt-1"/></div>
                <div><Label htmlFor="prenom">{t('PatientRegistration.formFirstName')} *</Label><Input id="prenom" value={scannedData.prenom} onChange={(e) => setScannedData({ ...scannedData, prenom: e.target.value })} className="mt-1"/></div>
                <div><Label htmlFor="cin">CIN *</Label><Input id="cin" value={scannedData.cin} onChange={(e) => setScannedData({ ...scannedData, cin: e.target.value })} className="mt-1"/></div>
                <div><Label htmlFor="dateNaissance">{t('PatientRegistration.formDob')}</Label><Input id="dateNaissance" value={scannedData.dateNaissance} onChange={(e) => setScannedData({ ...scannedData, dateNaissance: e.target.value })} className="mt-1"/></div>
                <div><Label htmlFor="telephone">{t('PatientRegistration.formPhone')}</Label><Input id="telephone" value={scannedData.telephone} onChange={(e) => setScannedData({ ...scannedData, telephone: e.target.value })} className="mt-1"/></div>
                <div><Label htmlFor="lieuNaissance">{t('PatientRegistration.formPob')}</Label><Input id="lieuNaissance" value={scannedData.lieuNaissance} onChange={(e) => setScannedData({ ...scannedData, lieuNaissance: e.target.value })} className="mt-1"/></div>
                <div className="md:col-span-2"><Label htmlFor="adresse">{t('PatientRegistration.formAddress')}</Label><Input id="adresse" value={scannedData.adresse} onChange={(e) => setScannedData({ ...scannedData, adresse: e.target.value })} className="mt-1"/></div>
              </div>
              <div className="flex space-x-4 rtl:space-x-reverse"><Button variant="outline" onClick={() => setRegistrationStep("method")} className="flex-1">{t('PatientRegistration.back')}</Button><Button onClick={handleFormSubmit} className="flex-1"><CheckCircle className="h-4 w-4 me-2" />{t('PatientRegistration.continueToBilling')}</Button></div>
            </div>
          )}

          {registrationStep === "payment" && scannedData && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2"><h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('PatientRegistration.step4Title')}</h2><Tooltip><TooltipTrigger asChild><button><Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" /></button></TooltipTrigger><TooltipContent><p>{t('PatientRegistration.step4Info')}</p></TooltipContent></Tooltip></div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <Card><CardHeader><CardTitle>{t('PatientRegistration.patientRecord')}</CardTitle></CardHeader>
                    <CardContent><div className="grid grid-cols-2 gap-4">
                      <div><Label>{t('PatientRegistration.patientName')}</Label><Input value={`${t('PatientRegistration.patientLabel')} ${scannedData.id || "A-XXX"}`} readOnly /></div>
                      <div><Label>{t('PatientRegistration.patientId')}</Label><Input value={scannedData.id || "A-XXX"} readOnly /></div>
                      <div><Label>CIN</Label><Input value={scannedData.cin} readOnly /></div>
                      <div><Label>{t('PatientRegistration.formPhone')}</Label><Input value={scannedData.telephone} readOnly /></div>
                    </div></CardContent>
                  </Card>
                  <Card><CardHeader><CardTitle className="flex items-center justify-between">{t('PatientRegistration.requestedExams')}<Button variant="outline" size="sm"><Plus className="h-4 w-4 me-2" />{t('PatientRegistration.add')}</Button></CardTitle></CardHeader>
                    <CardContent>{/* ... Examens ... */}</CardContent>
                  </Card>
                </div>
                <div className="space-y-6">
                  <Card className="bg-gray-50 dark:bg-gray-800"><CardHeader><CardTitle>{t('PatientRegistration.quoteCalculation')}</CardTitle></CardHeader>
                    <CardContent><div className="space-y-2">
                        <div className="flex justify-between"><span>{t('PatientRegistration.subtotal')}:</span><span>{currencyFormatter(100)}</span></div>
                        <div className="flex justify-between font-semibold"><span>{t('PatientRegistration.total')}:</span><span>{currencyFormatter(100)}</span></div>
                        <div className="flex justify-between text-blue-600 font-bold"><span>{t('PatientRegistration.requiredDeposit')} (70%):</span><span>{currencyFormatter(70)}</span></div>
                    </div></CardContent>
                  </Card>
                  <Card><CardHeader><CardTitle>{t('PatientRegistration.paymentMethod')}</CardTitle></CardHeader>
                    <CardContent><div className="grid grid-cols-2 gap-2">
                      <Button variant={paymentMethod === "cash" ? "default" : "outline"} onClick={() => setPaymentMethod("cash")} className="h-12"><Banknote className="h-4 w-4 me-2" />{t('PatientRegistration.cash')}</Button>
                      <Button variant={paymentMethod === "card" ? "default" : "outline"} onClick={() => setPaymentMethod("card")} className="h-12"><CreditCard className="h-4 w-4 me-2" />{t('PatientRegistration.card')}</Button>
                    </div></CardContent>
                  </Card>
                  <Button className="w-full h-12 text-lg" disabled={!paymentMethod} onClick={handlePaymentValidation}><CheckCircle className="h-5 w-5 me-2" />{t('PatientRegistration.validateAndTransfer')}</Button>
                  <Button variant="outline" onClick={onBack} className="w-full">{t('PatientRegistration.backToDashboard')}</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}