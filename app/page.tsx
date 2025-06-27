"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation d'une vérification (délai de 1.5 secondes)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Logique de redirection basée sur l'email
    const emailLower = email.toLowerCase()

    if (emailLower === "personnel@medical.labo") {
      router.push("/personnel-lab-medical")
    } else if (emailLower === "finance@medical.labo") {
      router.push("/finance-lab-medical")
    } else if (emailLower === "admin@medical.labo") {
      router.push("/admin-lab-medical")
    } else {
      // Pour les autres emails, on peut afficher une erreur ou rediriger vers une page par défaut
      setIsLoading(false)
      alert("Adresse email non reconnue. Veuillez contacter l'administrateur.")
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Arrière-plan médical flou */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/2.webp?height=1080&width=1920"
          alt="Laboratoire médical"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Boîte de connexion centrale */}
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8">
          {/* Zone A : Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <div className="text-white font-bold text-xl">LABO</div>
            </div>
          </div>

          {/* Zone B : Titre */}
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Portail de Connexion</h1>

          {/* Zone C : Texte d'instruction */}
          <p className="text-center text-gray-600 mb-8">Veuillez vous identifier pour accéder à votre espace</p>

          {/* Zone D : Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Adresse email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre adresse email"
                required
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  required
                  className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Zone E : Bouton de connexion */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se Connecter"
              )}
            </Button>
          </form>

          {/* Zone F : Liens de support */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Mot de passe oublié ?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
