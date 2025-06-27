"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { ScanLine, CheckCircle, Printer, AlertTriangle } from "lucide-react"

export function PrelevementBox() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [collectionStep, setCollectionStep] = useState("waiting")
  const [tubesCompleted, setTubesCompleted] = useState({})

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleTubeCompletion = (tubeId: string) => {
    setTubesCompleted((prev) => ({
      ...prev,
      [tubeId]: !prev[tubeId],
    }))
  }

  const handleCollectionComplete = () => {
    const tubes = ["violet", "rouge", "jaune"]
    const allCompleted = tubes.every((tube) => tubesCompleted[tube])

    if (!allCompleted) {
      toast({
        title: "Prélèvement incomplet",
        description: "Veuillez cocher tous les tubes prélevés",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Prélèvement terminé",
      description: "Échantillons envoyés au laboratoire",
    })
    setCollectionStep("waiting")
    setTubesCompleted({})
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="text-lg font-semibold">BOX 2</span>
            <span className="text-gray-600">Infirmière: AICHA BENALI</span>
          </div>
          <div className="text-lg font-mono">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      <div className="p-8">
        {collectionStep === "waiting" ? (
          <div className="text-center py-20">
            <h1 className="text-6xl font-bold text-gray-900 mb-8">PROCHAIN PATIENT</h1>
            <div className="border-4 border-dashed border-blue-300 rounded-lg p-12 max-w-md mx-auto cursor-pointer hover:border-blue-400 transition-colors">
              <div className="text-8xl font-bold text-blue-600">A-137</div>
            </div>
            <Button className="mt-8 text-xl px-8 py-4" onClick={() => setCollectionStep("active")}>
              <ScanLine className="h-6 w-6 mr-2" />
              Scanner Patient
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Patient : A-137</h1>
              <p className="text-xl text-gray-600">Examens: Hématologie, Biochimie, Sérologie</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">GUIDE VISUEL DES TUBES</h2>
              <div className="grid grid-cols-3 gap-8">
                {[
                  { id: "violet", color: "bg-purple-500", name: "Tube Violet (EDTA)", count: "1x" },
                  { id: "rouge", color: "bg-red-500", name: "Tube Rouge (Sérum)", count: "1x" },
                  { id: "jaune", color: "bg-yellow-500", name: "Tube Jaune (Gel)", count: "1x" },
                ].map((tube) => (
                  <Card
                    key={tube.id}
                    className={`p-6 text-center cursor-pointer hover:shadow-lg transition-shadow ${
                      tubesCompleted[tube.id] ? "bg-gray-100 opacity-75" : "bg-white"
                    }`}
                    onClick={() => handleTubeCompletion(tube.id)}
                  >
                    <div className={`w-16 h-24 ${tube.color} rounded-lg mx-auto mb-4 shadow-lg`}></div>
                    <h3 className="text-lg font-semibold mb-2">{tube.count}</h3>
                    <p className="text-gray-700 mb-4">{tube.name}</p>
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={tubesCompleted[tube.id] || false}
                        onCheckedChange={() => handleTubeCompletion(tube.id)}
                        className="w-6 h-6"
                      />
                      <span className="ml-2">Prélevé</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-6">
              <div className="flex space-x-4 max-w-4xl mx-auto">
                <Button variant="outline" className="flex-1 h-12 text-lg hover:bg-gray-50">
                  <Printer className="h-5 w-5 mr-2" />
                  IMPRIMER ÉTIQUETTES
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 text-lg bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  SIGNALER UN PROBLÈME
                </Button>
                <Button className="flex-1 h-12 text-lg hover:bg-green-600" onClick={handleCollectionComplete}>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  PRÉLÈVEMENT TERMINÉ
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
