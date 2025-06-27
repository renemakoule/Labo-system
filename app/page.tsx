"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Loader2, Shield, Copy, Check } from "lucide-react" // Ajout de Copy et Check
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// Ajout des composants pour le Tooltip
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null) // Nouvel état pour le feedback de copie
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
      setIsLoading(false)
      alert("Adresse email non reconnue. Veuillez contacter l'administrateur.")
    }
  }

  // Nouvelle fonction pour gérer la copie dans le presse-papiers
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedEmail(text)
      // Réinitialise l'icône après 2 secondes
      setTimeout(() => setCopiedEmail(null), 2000)
    })
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
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 backdrop-blur-sm">
        <CardContent className="p-8">
          {/* Zone A : Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <div className="text-white font-bold text-xl">LABO</div>
            </div>
          </div>

          {/* Zone B : Titre */}
          <h1 className="text-xl font-bold text-center text-gray-900 mb-2">Portail de Connexion</h1>

          {/* Zone C : Texte d'instruction */}
          <p className="text-center text-sm leading-relaxed">Accédez à votre espace professionnel sécurisé</p>

          {/* Dialog d'aide avec design amélioré */}
          <div className="mb-4 text-center">
            <Dialog>
              <DialogTrigger asChild>
                <p className="underline cursor-pointer text-blue-700 hover:text-gray-900 text-sm">
                  {" "}
                  Cliquez ici pour obtenir les identifiants de connexion{" "}
                </p>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                <DialogHeader>
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                      <div className="text-white font-bold text-xl">LABO</div>
                    </div>
                  </div>
                  <DialogTitle className="text-xl font-semibold text-center text-gray-800">
                    Comptes de Démonstration
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-600 text-sm">
                    Utilisez ces identifiants pour explorer les différents portails
                  </DialogDescription>
                </DialogHeader>
                {/* MODIFICATION START: Enveloppe la liste dans un TooltipProvider */}
                <TooltipProvider>
                  <div className="grid gap-4 py-6 text-sm">
                    <div className="space-y-4">
                      {[
                        {
                          role: "Personnel Médical",
                          email: "personnel@medical.labo",
                          color: "from-green-500 to-emerald-600",
                        },
                        {
                          role: "Gestion Financière",
                          email: "finance@medical.labo",
                          color: "from-orange-500 to-amber-600",
                        },
                        {
                          role: "Administration",
                          email: "admin@medical.labo",
                          color: "from-purple-500 to-violet-600",
                        },
                      ].map((account, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                        >
                          <div className="flex items-center gap-3 mb-2 text-sm">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${account.color}`} />
                            <span className="font-medium text-gray-800">{account.role}</span>
                          </div>
                          {/* MODIFICATION START: Conteneur pour l'email et le bouton de copie */}
                          <div className="flex items-center justify-between gap-2 bg-blue-50 px-3 py-2 rounded-md text-sm">
                            <code className="text-sm text-blue-600 font-mono">{account.email}</code>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-gray-500 hover:text-gray-800"
                                  onClick={() => handleCopy(account.email)}
                                >
                                  {copiedEmail === account.email ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Copier l'adresse</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 text-white border-0">
                                <p className="text-center">Copiez l'adresse, collez-la dans le champ email.</p>
                                <p className="text-center">entrez n'importe quel mot de passe et validez. appuyez sur l'espace de votre ecran pour fermer le dialog.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          {/* MODIFICATION END */}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                      <p className="text-sm text-blue-800 text-center">
                        <strong>Mot de passe :</strong> Saisissez n'importe quel mot de passe
                      </p>
                    </div>
                  </div>
                </TooltipProvider>
                {/* MODIFICATION END */}
              </DialogContent>
            </Dialog>
          </div>

          {/* Zone D : Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
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
              <Label htmlFor="password" className="text-sm font-medium text-gray-900">
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