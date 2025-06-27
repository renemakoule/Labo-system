import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserPlus, Key, UserX, Edit, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function UsersList() {
  const users = [
    {
      id: 1,
      username: "tech01",
      fullName: "Jean Technicien",
      role: "Technicien",
      status: "active",
      lastLogin: "Aujourd'hui 09:15",
    },
    {
      id: 2,
      username: "spec_dupont",
      fullName: "Dr. Marie Dupont",
      role: "Spécialiste",
      status: "active",
      lastLogin: "Hier 16:30",
    },
    {
      id: 3,
      username: "cfo",
      fullName: "Pierre Martin",
      role: "CFO",
      status: "active",
      lastLogin: "Aujourd'hui 08:45",
    },
    {
      id: 4,
      username: "reception01",
      fullName: "Sophie Réception",
      role: "Réceptionniste",
      status: "inactive",
      lastLogin: "Il y a 3 jours",
    },
    {
      id: 5,
      username: "sec_admin",
      fullName: "Julie Secrétaire",
      role: "Secrétaire",
      status: "active",
      lastLogin: "Aujourd'hui 10:20",
    },
  ]

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactif</Badge>
    )
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      Technicien: "bg-blue-100 text-blue-800",
      Spécialiste: "bg-purple-100 text-purple-800",
      CFO: "bg-red-100 text-red-800",
      Réceptionniste: "bg-green-100 text-green-800",
      Secrétaire: "bg-orange-100 text-orange-800",
    }

    return (
      <Badge className={`${colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"} hover:bg-current`}>
        {role}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Liste des Utilisateurs</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Gestion centralisée de tous les comptes utilisateurs du système.
                  <br />
                  Permet la création, modification, désactivation des comptes
                  <br />
                  et la réinitialisation des mots de passe.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">Gestion des comptes utilisateurs du système</p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Liste des Utilisateurs</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Gestion complète des comptes utilisateurs :<br />
                    Création, modification, désactivation.
                    <br />
                    Réinitialisation des mots de passe.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un utilisateur
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom d'utilisateur</TableHead>
                <TableHead>Nom complet</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
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
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="h-4 w-4 mr-2" />
                          Réinitialiser mot de passe
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <UserX className="h-4 w-4 mr-2" />
                          {user.status === "active" ? "Désactiver" : "Activer"}
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
  )
}
