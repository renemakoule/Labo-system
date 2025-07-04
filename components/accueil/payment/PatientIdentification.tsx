"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
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
  const { t } = useLanguage();

  const handleSearch = () => {
    if (patientId.trim()) {
      onPatientFound(patientId.trim())
    }
  }

  const handleSimulateScan = () => {
    const mockIds = ["A-140", "A-141", "A-137"]
    const randomId = mockIds[Math.floor(Math.random() * mockIds.length)]
    onPatientFound(randomId)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-background">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t('PatientIdentification.title')}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          {t('PatientIdentification.description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            className="cursor-pointer hover:shadow-2xl hover:border-blue-400 transition-all duration-300"
            onClick={handleSimulateScan}
          >
            <CardContent className="flex flex-col items-center justify-center p-10">
              <div className="bg-blue-100 p-5 rounded-full mb-6">
                <QrCode className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t('PatientIdentification.scanTitle')}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{t('PatientIdentification.scanDescription')}</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center justify-center p-10">
              <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-full mb-6">
                <Keyboard className="h-16 w-16 text-gray-600 dark:text-gray-300" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('PatientIdentification.manualTitle')}</h3>
              <div className="w-full max-w-sm flex items-center space-x-2 rtl:space-x-reverse">
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