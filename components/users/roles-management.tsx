"use client"

import { useState } from "react"
// REMPLACER useTranslations par votre useLanguage
import { useLanguage } from "@/context/language-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Users, Settings, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RolesManagement() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();
  // tUsers n'est pas nécessaire si les rôles sont traduits directement via 'RolesManagement' ou une fonction d'aide
  // const tUsers = useTranslations('UsersList'); // Cette ligne doit être supprimée

  // Define roles with consistent keys for translation
  const rolesConfig = [
    { key: "Receptionist", userCount: 4, color: "bg-green-100 text-green-800" },
    { key: "Technician", userCount: 8, color: "bg-blue-100 text-blue-800" },
    { key: "Specialist", userCount: 3, color: "bg-purple-100 text-purple-800" },
    { key: "CFO", userCount: 1, color: "bg-red-100 text-red-800" },
    { key: "Secretary", userCount: 2, color: "bg-orange-100 text-orange-800" },
  ];

  // Permissions using keys for translation
  const permissionsConfig = [
    { id: "create_patient", labelKey: "permCreatePatient", categoryKey: "categoryPatients" },
    { id: "view_patient", labelKey: "permViewPatient", categoryKey: "categoryPatients" },
    { id: "edit_patient", labelKey: "permEditPatient", categoryKey: "categoryPatients" },
    { id: "create_invoice", labelKey: "permCreateInvoice", categoryKey: "categoryInvoicing" },
    { id: "validate_invoice", labelKey: "permValidateInvoice", categoryKey: "categoryInvoicing" },
    { id: "view_reports", labelKey: "permViewReports", categoryKey: "categoryReports" },
    { id: "validate_results", labelKey: "permValidateResults", categoryKey: "categoryResults" },
    { id: "access_cfo_dashboard", labelKey: "permAccessCfoDashboard", categoryKey: "categoryAdmin" },
    { id: "manage_users", labelKey: "permManageUsers", categoryKey: "categoryAdmin" },
    { id: "system_settings", labelKey: "permSystemSettings", categoryKey: "categoryAdmin" },
  ];

  // Role permissions using keys directly
  // Note: Here we use the actual role key ('Receptionist') as the object key,
  // not its translated name, to ensure consistent lookup.
  const rolePermissions: { [key: string]: string[] } = {
    "Receptionist": ["create_patient", "view_patient", "create_invoice"],
    "Technician": ["view_patient", "edit_patient", "validate_results"],
    "Specialist": ["view_patient", "edit_patient", "validate_results", "view_reports"],
    "CFO": ["view_reports", "access_cfo_dashboard", "validate_invoice"],
    "Secretary": ["create_patient", "view_patient", "create_invoice", "view_reports"],
  };

  // Initial selected role should use the key, not the translated name
  const [selectedRoleKey, setSelectedRoleKey] = useState("Receptionist");

  // Re-map permissions to include translated labels and categories
  const translatedPermissions = permissionsConfig.map(perm => ({
    ...perm,
    label: t(`RolesManagement.${perm.labelKey}`),
    category: t(`RolesManagement.${perm.categoryKey}`),
  }));


  const groupedPermissions = translatedPermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc;
    },
    {} as Record<string, typeof translatedPermissions>, // Type inference improved
  );

  // Helper to get translated role name for display
  const getTranslatedRoleName = (key: string) => t(`RolesManagement.role${key}`);


  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('RolesManagement.title')}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 rounded-full">
                    <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content is directly translated here */}
                <p className="max-w-xs">{t('RolesManagement.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">{t('RolesManagement.description')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{t('RolesManagement.rolesProfilesTitle')}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{t('RolesManagement.rolesProfilesTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rolesConfig.map((role) => (
                <div
                  key={role.key} // Use the role key as React key
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${getTranslatedRoleName(selectedRoleKey) === getTranslatedRoleName(role.key) ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}
                  onClick={() => setSelectedRoleKey(role.key)} // Set the role key
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{getTranslatedRoleName(role.key)}</div>
                      <div className="text-sm text-gray-500">{role.userCount} {t('RolesManagement.userCountSuffix')}</div>
                    </div>
                    <Badge className={`${role.color} hover:bg-current`}>
                      {getTranslatedRoleName(role.key)}
                    </Badge>
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
              {/* Pass the translated role name to the string interpolation */}
              <span>{t('RolesManagement.permissionsFor', { roleName: getTranslatedRoleName(selectedRoleKey) })}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{t('RolesManagement.permissionsTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <Button>{t('RolesManagement.saveChanges')}</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, perms]) => (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                  <div className="space-y-3 ms-4"> {/* ms-4 for margin-inline-start */}
                    {perms.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={permission.id}
                          // Check permissions against the `selectedRoleKey` directly
                          checked={rolePermissions[selectedRoleKey]?.includes(permission.id)}
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
  );
}