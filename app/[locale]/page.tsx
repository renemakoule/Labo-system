"use client";

import type React from "react"
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Languages, Eye, EyeOff, Loader2, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Le prompt initial pour choisir la langue
function LanguagePrompt() {
  const { setLocale } = useLanguage();
  // Utilisation de `useEffect` pour vérifier côté client si le localStorage est défini
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(!localStorage.getItem('app-locale'));
    }
  }, []);

  const handleSelect = (lang: 'fr' | 'ar') => {
    setLocale(lang);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <Languages className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Choisissez votre langue / اختر لغتك</h2>
          <p className="text-gray-600 mb-6">Veuillez sélectionner votre langue. / .الرجاء تحديد لغتك</p>
          <div className="flex gap-4">
            <Button className="flex-1" size="lg" onClick={() => handleSelect('fr')}>Français</Button>
            <Button className="flex-1" size="lg" onClick={() => handleSelect('ar')}>العربية</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Le composant pour changer de langue
function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  return (
      <Button 
          variant="outline" 
          size="sm"
          onClick={() => setLocale(locale === 'fr' ? 'ar' : 'fr')}
          className="bg-white/30 border-white/50 text-white hover:bg-white/50"
      >
          <Languages className="me-2 h-4 w-4" />
          {locale === 'fr' ? 'العربية' : 'Français'}
      </Button>
  );
}


export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const emailLower = email.toLowerCase();
    if (emailLower === "personnel@medical.labo") router.push("/personnel-lab-medical");
    else if (emailLower === "finance@medical.labo") router.push("/finance-lab-medical");
    else if (emailLower === "admin@medical.labo") router.push("/admin-lab-medical");
    else { 
        setIsLoading(false); 
        // Note: 'alert' n'est pas traduit, car c'est une fonction navigateur.
        // Pour une meilleure UX, utilisez un composant de dialogue ou de toast.
        alert("Adresse email non reconnue. Veuillez contacter l'administrateur."); 
    }
  };
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <LanguagePrompt />
      
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

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 backdrop-blur-sm bg-white/50">
        <CardContent className="p-8">
            <div className="absolute top-4 end-4">
                <LanguageSwitcher />
            </div>

            <div className="flex justify-center mb-6">
                <Avatar className="h-16 w-16">
                    <AvatarImage src="/78524.png?height=32&width=32" alt="LMD" />
                    <AvatarFallback>LMD</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-center text-xs text-gray-800">Laboratoire D'Analyse Medical DABE</p>

            <h1 className="text-xl font-bold text-center text-gray-900 mb-2">
              {t('LoginPage.loginTitle')}
            </h1>

            <p className="text-center text-sm leading-relaxed text-gray-700">
              {t('LoginPage.loginDescription')}
            </p>

            <div className="mb-4 text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <p className="underline cursor-pointer text-blue-700 hover:text-gray-900 text-sm">
                    {t('LoginPage.credentialsHelp')}
                  </p>
                </DialogTrigger>
                <DialogContent>
                  {/* Le contenu du Dialog reste en français car il est destiné aux développeurs/testeurs */}
                  <DialogHeader>
                    <div className="flex justify-center mb-6 rounded-full">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/78524.png?height=32&width=32" alt="LMD" />
                        <AvatarFallback>LMD</AvatarFallback>
                      </Avatar>
                    </div>
                    <DialogTitle className="text-xl font-semibold text-center text-gray-800">Comptes de Démonstration</DialogTitle>
                    <DialogDescription className="text-center text-gray-600 text-sm">Utilisez ces identifiants pour explorer les différents portails</DialogDescription>
                  </DialogHeader>
                  <TooltipProvider>
                    <div className="grid gap-4 py-6 text-sm">
                      <div className="space-y-4">
                        {[{role: "Personnel Médical", email: "personnel@medical.labo"}, {role: "Gestion Financière", email: "finance@medical.labo"}, {role: "Administration", email: "admin@medical.labo"}].map((account) => (
                          <div key={account.email} className="p-4 rounded-xl bg-gray-50 border">
                            <h4 className="font-medium text-gray-800 mb-2">{account.role}</h4>
                            <div className="flex items-center justify-between gap-2 bg-blue-50 px-3 py-2 rounded-md">
                              <code className="text-sm text-blue-600 font-mono">{account.email}</code>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-gray-800" onClick={() => handleCopy(account.email)}>
                                    {copiedEmail === account.email ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Copier</p></TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm text-center">
                        <p className="text-blue-800"><strong>Mot de passe :</strong> Saisissez n'importe quel mot de passe.</p>
                      </div>
                    </div>
                  </TooltipProvider>
                </DialogContent>
              </Dialog>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-900">{t('LoginPage.emailLabel')}</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('LoginPage.emailPlaceholder')}
                        required
                        className="w-full h-12 px-4 border-gray-300 rounded-lg"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-900">{t('LoginPage.passwordLabel')}</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('LoginPage.passwordPlaceholder')}
                            required
                            className="w-full h-12 px-4 pe-12 border-gray-300 rounded-lg"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                 <Button type="submit" disabled={isLoading} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
                    {isLoading ? <><Loader2 className="me-2 h-4 w-4 animate-spin" />{t('LoginPage.loggingIn')}</> : t('LoginPage.loginButton')}
                </Button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                {t('LoginPage.forgotPassword')}
              </a>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}