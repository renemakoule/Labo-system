"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

// 1. Importer l'icône "Info" et les composants du Tooltip
import {
  BadgeIcon as IdCard,
  User,
  ScanLine,
  X,
  RefreshCw,
  Check,
  CheckCircle,
  CreditCard,
  Banknote,
  Plus,
  Info,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mockOCRData = [
  {
    nom: "BENALI",
    prenom: "AMINA",
    dateNaissance: "15/03/1985",
    lieuNaissance: "CASABLANCA",
    cin: "BK123456",
    adresse: "123 RUE MOHAMMED V, CASABLANCA",
    telephone: "0612345678",
    sexe: "F",
  },
  {
    nom: "ALAOUI",
    prenom: "YOUSSEF",
    dateNaissance: "22/07/1978",
    lieuNaissance: "RABAT",
    cin: "AB789012",
    adresse: "45 AVENUE HASSAN II, RABAT",
    telephone: "0687654321",
    sexe: "M",
  },
]

interface PatientRegistrationProps {
  selectedPatient?: any
  onBack: () => void
}

export function PatientRegistration({ selectedPatient, onBack }: PatientRegistrationProps) {
  const [registrationStep, setRegistrationStep] = useState(selectedPatient ? "payment" : "method")
  const [scanningProgress, setScanningProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState(selectedPatient || null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const videoRef = useRef(null)

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
          toast({
            title: "Scan réussi",
            description: "Informations extraites de la carte d'identité",
          })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const handleManualEntry = () => {
    setRegistrationStep("form")
    setScannedData({
      nom: "",
      prenom: "",
      dateNaissance: "",
      lieuNaissance: "",
      cin: "",
      adresse: "",
      telephone: "",
      sexe: "",
    })
  }

  const handleFormSubmit = () => {
    if (!scannedData.nom || !scannedData.prenom || !scannedData.cin) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      })
      return
    }

    const newPatient = {
      id: `A-${Math.floor(Math.random() * 1000) + 100}`,
      name: `${scannedData.prenom} ${scannedData.nom}`,
      cin: scannedData.cin,
      dateNaissance: scannedData.dateNaissance,
      telephone: scannedData.telephone,
      adresse: scannedData.adresse,
      amount: 100,
    }

    setScannedData(newPatient)
    setRegistrationStep("payment")
  }

  const handlePaymentValidation = () => {
    if (!paymentMethod) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une méthode de paiement",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Paiement validé",
      description: `Patient ${scannedData.id} transféré vers le prélèvement`,
    })
    onBack()
  }

  return (
    // 2. Envelopper le composant avec TooltipProvider
    <TooltipProvider>
      <ScrollArea className="h-full">
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {registrationStep === "method" && (
            <div className="text-center space-y-6">
              <div className="mb-8">
                {/* 3. Modification du titre */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">Enregistrement Nouveau Patient</h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choisissez de scanner la CIN pour un remplissage automatique ou de saisir les informations manuellement.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-gray-600">Choisissez votre méthode d'enregistrement</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow border-blue-200 hover:border-blue-300"
                  onClick={startIDScanning}
                >
                  <CardContent className="flex flex-col items-center p-8">
                    <div className="bg-blue-100 p-4 rounded-full mb-4">
                      <IdCard className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Scanner Carte d'Identité</h3>
                    <p className="text-gray-600 text-center">Extraction automatique des informations par OCR</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">Recommandé</Badge>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow border-gray-200 hover:border-gray-300"
                  onClick={handleManualEntry}
                >
                  <CardContent className="flex flex-col items-center p-8">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <User className="h-12 w-12 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Saisie Manuelle</h3>
                    <p className="text-gray-600 text-center">Remplir les informations manuellement</p>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <Button variant="outline" onClick={onBack} size="lg">
                  Retour au tableau de bord
                </Button>
              </div>
            </div>
          )}

          {registrationStep === "scanning" && (
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Scan de la Carte d'Identité</h2>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Placez la carte d'identité du patient dans le cadre pour lancer l'analyse.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="relative max-w-md mx-auto">
                <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border-2 border-blue-400 rounded-lg w-80 h-48 relative">
                      <div className="absolute inset-0 border-2 border-dashed border-blue-300 rounded-lg animate-pulse"></div>
                      <ScanLine className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-blue-400 animate-bounce" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded">
                    <p className="text-sm text-center">
                      {isScanning ? "Analyse en cours..." : "Placez la carte d'identité dans le cadre"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Extraction OCR</span>
                    <span>{scanningProgress}%</span>
                  </div>
                  <Progress value={scanningProgress} className="w-full" />
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setRegistrationStep("method")} className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                  <Button onClick={startIDScanning} disabled={isScanning} className="flex-1">
                    <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? "animate-spin" : ""}`} />
                    {isScanning ? "Scan en cours..." : "Relancer Scan"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {registrationStep === "form" && scannedData && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">Informations Patient</h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vérifiez et complétez les informations du patient. Les champs avec un * sont obligatoires.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                {scannedData.nom && (
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" />
                    Données extraites par OCR
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={scannedData.nom}
                    onChange={(e) => setScannedData({ ...scannedData, nom: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={scannedData.prenom}
                    onChange={(e) => setScannedData({ ...scannedData, prenom: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cin">CIN *</Label>
                  <Input
                    id="cin"
                    value={scannedData.cin}
                    onChange={(e) => setScannedData({ ...scannedData, cin: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dateNaissance">Date de Naissance</Label>
                  <Input
                    id="dateNaissance"
                    value={scannedData.dateNaissance}
                    onChange={(e) => setScannedData({ ...scannedData, dateNaissance: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={scannedData.telephone}
                    onChange={(e) => setScannedData({ ...scannedData, telephone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lieuNaissance">Lieu de Naissance</Label>
                  <Input
                    id="lieuNaissance"
                    value={scannedData.lieuNaissance}
                    onChange={(e) => setScannedData({ ...scannedData, lieuNaissance: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="adresse">Adresse</Label>
                  <Input
                    id="adresse"
                    value={scannedData.adresse}
                    onChange={(e) => setScannedData({ ...scannedData, adresse: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setRegistrationStep("method")} className="flex-1">
                  Retour
                </Button>
                <Button onClick={handleFormSubmit} className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Continuer vers Facturation
                </Button>
              </div>
            </div>
          )}

          {registrationStep === "payment" && scannedData && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">Facturation et Paiement</h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vérifiez le devis, sélectionnez la méthode de paiement, puis validez pour finaliser l'enregistrement.</p>
                    </TooltipContent>
                  </Tooltip>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fiche Patient</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Nom du Patient</Label>
                          <Input value={`Patient ${scannedData.id || "A-XXX"}`} readOnly />
                        </div>
                        <div>
                          <Label>ID Patient</Label>
                          <Input value={scannedData.id || "A-XXX"} readOnly />
                        </div>
                        <div>
                          <Label>CIN</Label>
                          <Input value={scannedData.cin} readOnly />
                        </div>
                        <div>
                          <Label>Téléphone</Label>
                          <Input value={scannedData.telephone} readOnly />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Examens Demandés
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Numération Formule Sanguine</span>
                          <span className="font-semibold">45.00 DH</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Glycémie à jeun</span>
                          <span className="font-semibold">25.00 DH</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Cholestérol total</span>
                          <span className="font-semibold">30.00 DH</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-gray-50">
                    <CardHeader>
                      <CardTitle>Calcul du Devis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Sous-total:</span>
                          <span>100.00 DH</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>100.00 DH</span>
                        </div>
                        <div className="flex justify-between text-blue-600 font-bold">
                          <span>Acompte Requis (70%):</span>
                          <span>70.00 DH</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Méthode de Paiement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={paymentMethod === "cash" ? "default" : "outline"}
                          onClick={() => setPaymentMethod("cash")}
                          className="h-12"
                        >
                          <Banknote className="h-4 w-4 mr-2" />
                          ESPÈCES
                        </Button>
                        <Button
                          variant={paymentMethod === "card" ? "default" : "outline"}
                          onClick={() => setPaymentMethod("card")}
                          className="h-12"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          CARTE
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full h-12 text-lg" disabled={!paymentMethod} onClick={handlePaymentValidation}>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    VALIDER PAIEMENT & TRANSFÉRER
                  </Button>

                  <Button variant="outline" onClick={onBack} className="w-full">
                    Retour au tableau de bord
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </TooltipProvider>
  )
}