"use client"

// REMPLACER useTranslations par votre useLanguage
import { useLanguage } from "@/context/language-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserPlus, Key, UserX, Edit, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function UsersList() {
  // Utilisez votre hook useLanguage
  const { t } = useLanguage();

  const users = [
    // Gardez les rôles comme identifiants pour la traduction
    { id: 1, username: "tech01", fullName: "Jean Technicien", role: "Technician", status: "active", lastLogin: "Aujourd'hui 09:15" },
    { id: 2, username: "spec_dupont", fullName: "Dr. Marie Dupont", role: "Specialist", status: "active", lastLogin: "Hier 16:30" },
    { id: 3, username: "cfo", fullName: "Pierre Martin", role: "CFO", status: "active", lastLogin: "Aujourd'hui 08:45" },
    { id: 4, username: "reception01", fullName: "Sophie Réception", role: "Receptionist", status: "inactive", lastLogin: "Il y a 3 jours" },
    { id: 5, username: "sec_admin", fullName: "Julie Secrétaire", role: "Secretary", status: "active", lastLogin: "Aujourd'hui 10:20" },
  ];

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t('UsersList.statusActive')}</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{t('UsersList.statusInactive')}</Badge>
    );
  };

  const getRoleBadge = (roleKey: string) => { // Renommé 'role' en 'roleKey' pour plus de clarté
    const roleText = t(`UsersList.role${roleKey}`); // Utilise l'interpolation pour la clé

    // Mapping des couleurs basé sur la clé du rôle
    const colors: Record<string, string> = {
      Technician: "bg-blue-100 text-blue-800",
      Specialist: "bg-purple-100 text-purple-800",
      CFO: "bg-red-100 text-red-800",
      Receptionist: "bg-green-100 text-green-800",
      Secretary: "bg-orange-100 text-orange-800",
    };
    return (
      <Badge className={`${colors[roleKey] || "bg-gray-100 text-gray-800"} hover:bg-current`}>
        {roleText}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('UsersList.title')}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1 rounded-full">
                    <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {/* InfoTooltip est un composant, mais ici le contenu est direct. 
                   Si InfoTooltip utilise déjà `useLanguage` en interne, passez-lui une clé.
                   Sinon, traduisiez le contenu ici.
                   Pour l'exemple, je traduis directement ici, comme votre code original l'implique pour ce Tooltip. */}
                <p className="max-w-xs">{t('UsersList.infoTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">{t('UsersList.description')}</p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('UsersList.title')}</CardTitle>
          <Button>
            <UserPlus className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
            {t('UsersList.addUser')}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('UsersList.headerUsername')}</TableHead>
                <TableHead>{t('UsersList.headerFullName')}</TableHead>
                <TableHead>{t('UsersList.headerRole')}</TableHead>
                <TableHead>{t('UsersList.headerStatus')}</TableHead>
                <TableHead>{t('UsersList.headerLastLogin')}</TableHead>
                <TableHead className="w-[50px]">{t('UsersList.headerActions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
                          {t('UsersList.actionEdit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
                          {t('UsersList.actionResetPassword')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <UserX className="h-4 w-4 me-2" /> {/* `me-2` pour margin-inline-end */}
                          {user.status === "active" ? t('UsersList.actionDeactivate') : t('UsersList.actionActivate')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}