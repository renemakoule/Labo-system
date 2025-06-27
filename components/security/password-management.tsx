import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Key, Shield, RefreshCw, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PasswordManagement() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Mots de Passe</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Configuration des politiques de sécurité des mots de passe.
                  <br />
                  Définition des règles de complexité, expiration, historique
                  <br />
                  et actions de sécurité globales pour tous les utilisateurs.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">Politique de sécurité et gestion des mots de passe</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Politique de Sécurité des Mots de Passe</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Configuration des règles de sécurité :<br />
                      Complexité, expiration, historique.
                      <br />
                      S'applique à tous les nouveaux mots de passe.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="min-length">Longueur minimale</Label>
                  <Input id="min-length" type="number" defaultValue="8" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="expiry-days">Expiration (jours)</Label>
                  <Input id="expiry-days" type="number" defaultValue="90" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="history-count">Historique des mots de passe</Label>
                  <Input id="history-count" type="number" defaultValue="5" className="mt-1" />
                  <p className="text-sm text-gray-500 mt-1">Nombre de mots de passe précédents à retenir</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Majuscules requises</Label>
                    <p className="text-sm text-gray-500">Au moins une lettre majuscule</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chiffres requis</Label>
                    <p className="text-sm text-gray-500">Au moins un chiffre</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Caractères spéciaux</Label>
                    <p className="text-sm text-gray-500">Au moins un caractère spécial</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Authentification à deux facteurs</Label>
                    <p className="text-sm text-gray-500">Obligatoire pour les admins</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button>Sauvegarder la politique</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              <CardTitle>Actions de Sécurité</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Actions de sécurité globales :<br />
                      Réinitialisation = Force le changement pour tous.
                      <br />
                      Audit = Vérifie la conformité des mots de passe.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h4 className="font-medium mb-2">Réinitialisation Globale</h4>
                  <p className="text-sm text-gray-600 mb-4">Force tous les utilisateurs à changer leur mot de passe</p>
                  <Button
                    variant="outline"
                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                  >
                    Forcer la réinitialisation
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium mb-2">Audit des Mots de Passe</h4>
                  <p className="text-sm text-gray-600 mb-4">Vérifie la conformité des mots de passe actuels</p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                  >
                    Lancer l'audit
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium mb-2">Rapport de Sécurité</h4>
                  <p className="text-sm text-gray-600 mb-4">Génère un rapport détaillé de sécurité</p>
                  <Button
                    variant="outline"
                    className="w-full border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
                  >
                    Générer le rapport
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Utilisateurs avec Mots de Passe Expirés</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Utilisateurs nécessitant un renouvellement :<br />
                      Envoi automatique de rappels par email.
                      <br />
                      Accès bloqué après expiration prolongée.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { user: "reception01", expired: "Il y a 5 jours", lastLogin: "Il y a 3 jours" },
                { user: "tech03", expired: "Il y a 2 jours", lastLogin: "Aujourd'hui" },
                { user: "sec_marie", expired: "Il y a 1 jour", lastLogin: "Il y a 1 jour" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.user}</div>
                    <div className="text-sm text-gray-500">
                      Expiré {item.expired} • Dernière connexion: {item.lastLogin}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Envoyer rappel
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
