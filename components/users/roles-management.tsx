"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Users, Settings, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RolesManagement() {
  const roles = [
    { name: "Technicien", userCount: 8, color: "bg-blue-100 text-blue-800" },
    { name: "Spécialiste", userCount: 3, color: "bg-purple-100 text-purple-800" },
    { name: "CFO", userCount: 1, color: "bg-red-100 text-red-800" },
    { name: "Réceptionniste", userCount: 4, color: "bg-green-100 text-green-800" },
    { name: "Secrétaire", userCount: 2, color: "bg-orange-100 text-orange-800" },
  ]

  const permissions = [
    { id: "create_patient", label: "Créer un dossier patient", category: "Patients" },
    { id: "view_patient", label: "Consulter un dossier patient", category: "Patients" },
    { id: "edit_patient", label: "Modifier un dossier patient", category: "Patients" },
    { id: "create_invoice", label: "Créer une facture", category: "Facturation" },
    { id: "validate_invoice", label: "Valider une facture", category: "Facturation" },
    { id: "view_reports", label: "Consulter les rapports", category: "Rapports" },
    { id: "validate_results", label: "Valider un résultat médical", category: "Résultats" },
    { id: "access_cfo_dashboard", label: "Accéder au Dashboard CFO", category: "Administration" },
    { id: "manage_users", label: "Gérer les utilisateurs", category: "Administration" },
    { id: "system_settings", label: "Paramètres système", category: "Administration" },
  ]

  const rolePermissions = {
    Réceptionniste: ["create_patient", "view_patient", "create_invoice"],
    Technicien: ["view_patient", "edit_patient", "validate_results"],
    Spécialiste: ["view_patient", "edit_patient", "validate_results", "view_reports"],
    CFO: ["view_reports", "access_cfo_dashboard", "validate_invoice"],
    Secrétaire: ["create_patient", "view_patient", "create_invoice", "view_reports"],
  }

  const [selectedRole, setSelectedRole] = useState("Réceptionniste")

  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, typeof permissions>,
  )

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Rôles et Profils</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Configuration des permissions par rôle utilisateur.
                  <br />
                  Définit les droits d'accès pour chaque type d'utilisateur :<br />
                  Techniciens, Spécialistes, CFO, Réceptionnistes, Secrétaires.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">Configuration des permissions par rôle utilisateur</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Rôles/Profils</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Sélectionnez un rôle pour configurer
                      <br />
                      ses permissions spécifiques.
                      <br />
                      Chaque rôle a des droits d'accès définis.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedRole === role.name ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedRole(role.name)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-gray-500">{role.userCount} utilisateur(s)</div>
                    </div>
                    <Badge className={`${role.color} hover:bg-current`}>{role.name}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <span>Permissions pour : {selectedRole}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Configurez les permissions par catégorie :<br />
                      Patients, Facturation, Rapports, Administration.
                      <br />
                      Les modifications s'appliquent à tous les utilisateurs du rôle.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <Button>Sauvegarder les modifications</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, perms]) => (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                  <div className="space-y-3 ml-4">
                    {perms.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={rolePermissions[selectedRole as keyof typeof rolePermissions]?.includes(
                            permission.id,
                          )}
                        />
                        <label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
