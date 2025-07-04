"use client" // Assurez-vous que ce composant est un client component

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Key, Shield, RefreshCw, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function PasswordManagement() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  // Données pour les utilisateurs avec mots de passe expirés
  // Les dates/temps réels devraient être formatés dynamiquement pour l'i18n
  const expiredUsersData = [
    { user: "reception01", expiredKey: "expired5DaysAgo", lastLoginKey: "lastLogin3DaysAgo" },
    { user: "tech03", expiredKey: "expired2DaysAgo", lastLoginKey: "lastLoginToday" },
    { user: "sec_marie", expiredKey: "expired1DayAgo", lastLoginKey: "lastLogin1DayAgo" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('PasswordManagement.title')}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip content est traduit directement ici */}
                <p>{t('PasswordManagement.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">{t('PasswordManagement.description')}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>{t('PasswordManagement.policyTitle')}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {/* InfoTooltip content est traduit directement ici */}
                    <p>{t('PasswordManagement.policyTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="min-length">{t('PasswordManagement.minLengthLabel')}</Label>
                  <Input id="min-length" type="number" defaultValue="8" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="expiry-days">{t('PasswordManagement.expiryDaysLabel')}</Label>
                  <Input id="expiry-days" type="number" defaultValue="90" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="history-count">{t('PasswordManagement.historyCountLabel')}</Label>
                  <Input id="history-count" type="number" defaultValue="5" className="mt-1" />
                  <p className="text-sm text-gray-500 mt-1">{t('PasswordManagement.historyCountDescription')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('PasswordManagement.uppercaseRequiredLabel')}</Label>
                    <p className="text-sm text-gray-500">{t('PasswordManagement.uppercaseRequiredDescription')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('PasswordManagement.digitsRequiredLabel')}</Label>
                    <p className="text-sm text-gray-500">{t('PasswordManagement.digitsRequiredDescription')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('PasswordManagement.specialCharsRequiredLabel')}</Label>
                    <p className="text-sm text-gray-500">{t('PasswordManagement.specialCharsRequiredDescription')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('PasswordManagement.twoFactorAuthLabel')}</Label>
                    <p className="text-sm text-gray-500">{t('PasswordManagement.twoFactorAuthDescription')}</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button>{t('PasswordManagement.savePolicyButton')}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              <CardTitle>{t('PasswordManagement.securityActionsTitle')}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {/* InfoTooltip content est traduit directement ici */}
                    <p>{t('PasswordManagement.securityActionsTooltip')}</p>
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
                  <h4 className="font-medium mb-2">{t('PasswordManagement.globalResetTitle')}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t('PasswordManagement.globalResetDescription')}</p>
                  <Button
                    variant="outline"
                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 bg-transparent"
                  >
                    {t('PasswordManagement.forceResetButton')}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium mb-2">{t('PasswordManagement.passwordAuditTitle')}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t('PasswordManagement.passwordAuditDescription')}</p>
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                  >
                    {t('PasswordManagement.launchAuditButton')}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium mb-2">{t('PasswordManagement.securityReportTitle')}</h4>
                  <p className="text-sm text-gray-600 mb-4">{t('PasswordManagement.securityReportDescription')}</p>
                  <Button
                    variant="outline"
                    className="w-full border-green-300 text-green-700 hover:bg-green-100 bg-transparent"
                  >
                    {t('PasswordManagement.generateReportButton')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>{t('PasswordManagement.expiredPasswordsTitle')}</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    {/* InfoTooltip content est traduit directement ici */}
                    <p>{t('PasswordManagement.expiredPasswordsTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiredUsersData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{item.user}</div>
                    <div className="text-sm text-gray-500">
                      {t('PasswordManagement.expiredText', { expiredTime: t(`PasswordManagement.timeKeys.${item.expiredKey}`) })}
                      {" • "}
                      {t('PasswordManagement.lastLoginText', { lastLoginTime: t(`PasswordManagement.timeKeys.${item.lastLoginKey}`) })}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('PasswordManagement.sendReminderButton')}
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