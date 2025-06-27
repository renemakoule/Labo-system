import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AuditLogs() {
  const auditLogs = [
    {
      timestamp: "2024-01-15 14:32:15",
      user: "tech01",
      action: "Validation_Résultat",
      details: "Résultat Hémoglobine - Patient #P12345",
      ip: "192.168.1.45",
      severity: "info",
    },
    {
      timestamp: "2024-01-15 14:28:42",
      user: "spec_dupont",
      action: "Consultation_Dossier_Patient",
      details: "Patient ID #P67890",
      ip: "192.168.1.23",
      severity: "info",
    },
    {
      timestamp: "2024-01-15 14:25:18",
      user: "cfo",
      action: "Modification_Facture",
      details: "Facture #F54321 - Montant modifié",
      ip: "192.168.1.12",
      severity: "warning",
    },
    {
      timestamp: "2024-01-15 14:20:05",
      user: "reception01",
      action: "Connexion",
      details: "Connexion réussie",
      ip: "192.168.1.67",
      severity: "info",
    },
    {
      timestamp: "2024-01-15 14:15:33",
      user: "unknown",
      action: "Tentative_Connexion_Échouée",
      details: "Mot de passe incorrect pour caisse01",
      ip: "192.168.1.89",
      severity: "error",
    },
    {
      timestamp: "2024-01-15 14:10:22",
      user: "admin_cfo",
      action: "Consultation_Dossier_Patient",
      details: "Patient ID #P11111 - Accès hors heures",
      ip: "192.168.1.12",
      severity: "warning",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "info":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            Info
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-200">
            Avertissement
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="text-red-600 border-red-200">
            Erreur
          </Badge>
        )
      default:
        return <Badge variant="outline">Log</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Journal d'Activité</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Journal d'audit inviolable de toutes les actions du système.
                  <br />
                  Traçabilité complète des connexions, consultations, modifications
                  <br />
                  pour assurer la conformité réglementaire et la sécurité.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">Logs d'audit et traçabilité des actions utilisateurs</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <CardTitle>Journal d'Activité (Logs d'Audit)</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Journal inviolable de toutes les actions :<br />
                    Connexions, consultations, modifications.
                    <br />
                    Utilisez les filtres pour des recherches précises.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Rechercher dans les logs..." className="pl-10" />
              </div>
            </div>

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="tech01">tech01</SelectItem>
                  <SelectItem value="spec_dupont">spec_dupont</SelectItem>
                  <SelectItem value="cfo">cfo</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="connexion">Connexion</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="modification">Modification</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Détails</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Sévérité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{log.action.replace(/_/g, " ")}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{log.details}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="text-sm text-gray-500">Affichage de 1-6 sur 1,247 entrées</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
