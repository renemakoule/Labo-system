"use client"

import { useLanguage } from "@/context/language-context"; // Importez votre hook de langue
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { User, Settings, LogOut, Bell } from "lucide-react"
import { LanguageSwitcher } from '@/components/language-switcher'; // Assurez-vous que ce chemin est correct

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { t } = useLanguage(); // Obtenez la fonction de traduction

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {/* Utilisez 'end-1' pour le support RTL */}
            <span className="absolute -top-1 -end-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          {/* Profil utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-auto px-2 rounded-full">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {/* Traduire le alt text si l'image est spécifique à la locale */}
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={t('Header.profileAltText')} />
                    {/* Le fallback peut être les initiales ou une image statique */}
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-start"> {/* Utilisez 'text-start' pour le support RTL */}
                    <div className="text-sm font-medium">{t('Header.userName')}</div>
                    <div className="text-xs text-muted-foreground">{t('Header.userRole')}</div>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{t('Header.userName')}</p>
                  <p className="text-xs leading-none text-muted-foreground">{t('Header.userEmail')}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {/* Utilisez 'me-2' pour margin-end (compatible RTL) */}
                <User className="me-2 h-4 w-4" />
                <span>{t('Header.profileLink')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {/* Utilisez 'me-2' pour margin-end (compatible RTL) */}
                <Settings className="me-2 h-4 w-4" />
                <span>{t('Header.settingsLink')}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                {/* Utilisez 'me-2' pour margin-end (compatible RTL) */}
                <LogOut className="me-2 h-4 w-4" />
                <span>{t('Header.logoutLink')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Ajouter le sélecteur de langue ici */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}