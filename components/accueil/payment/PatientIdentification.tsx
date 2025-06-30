"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QrCode, Keyboard, Search } from "lucide-react"

interface PatientIdentificationProps {
  onPatientFound: (patientId: string) => void
  isLoading: boolean
}

export function PatientIdentification({ onPatientFound, isLoading }: PatientIdentificationProps) {
  const [patientId, setPatientId] = useState("")

  const handleSearch = () => {
    if (patientId.trim()) {
      onPatientFound(patientId.trim())
    }
  }

  const handleSimulateScan = () => {
    // Simule la lecture d'un QR code en trouvant un patient au hasard
    const mockIds = ["A-140", "A-141", "A-137"]
    const randomId = mockIds[Math.floor(Math.random() * mockIds.length)]
    onPatientFound(randomId)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-background">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Identifier le Patient</h2>
        <p className="text-lg text-gray-600 mb-12">
          Scannez le QR code du ticket patient ou saisissez son code unique pour afficher la facture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option 1: Scanner le QR Code */}
          <Card
            className="cursor-pointer hover:shadow-2xl hover:border-blue-400 transition-all duration-300"
            onClick={handleSimulateScan}
          >
            <CardContent className="flex flex-col items-center justify-center p-10">
              <div className="bg-blue-100 p-5 rounded-full mb-6">
                <QrCode className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">Scanner le QR Code</h3>
              <p className="text-gray-600 mt-2">Approchez le ticket du lecteur.</p>
            </CardContent>
          </Card>

          {/* Option 2: Saisie Manuelle */}
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center justify-center p-10">
              <div className="bg-gray-100 p-5 rounded-full mb-6">
                <Keyboard className="h-16 w-16 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Saisir le Code Patient</h3>
              <div className="w-full max-w-sm flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Ex: A-140"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value.toUpperCase())}
                  className="text-center h-12 text-lg font-mono"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} size="lg" disabled={isLoading || !patientId.trim()} className="h-12">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}