import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageTitleWithInfo } from "@/components/page-title-with-info";

type Sample = {
  id: string;
  patientId: string;
  sampleDate: string;
  technician: string;
  status: 'Terminé' | 'En attente';
};

const sampleHistory: Sample[] = [
  { id: 'SMP-001', patientId: 'PAT-10172', sampleDate: '2023-10-27 09:15', technician: 'Dr. Karimou', status: 'Terminé' },
  { id: 'SMP-002', patientId: 'PAT-10290', sampleDate: '2023-10-27 09:45', technician: 'Dr. Karimou', status: 'Terminé' },
  { id: 'SMP-003', patientId: 'PAT-10311', sampleDate: '2023-10-26 14:30', technician: 'Dr. Gwladys Lydie', status: 'Terminé' },
];

export default function HistoriquePrelevementPage() {
  return (
    <div className="container mx-auto p-4">
      <PageTitleWithInfo
        title="Historique des Prélèvements"
        infoText="Consultez la liste de tous les prélèvements enregistrés dans le système, identifiés par leur code unique."
      />
      <Card>
        <CardHeader>
          <CardTitle>Historique des Prélèvements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Prélèvement</TableHead>
                <TableHead>ID Patient</TableHead>
                <TableHead>Date et Heure</TableHead>
                <TableHead>Technicien</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleHistory.map((sample) => (
                <TableRow key={sample.id}>
                  <TableCell className="font-medium">{sample.id}</TableCell>
                  <TableCell>{sample.patientId}</TableCell>
                  <TableCell>{sample.sampleDate}</TableCell>
                  <TableCell>{sample.technician}</TableCell>
                  <TableCell>
                    <Badge variant={sample.status === 'Terminé' ? 'default' : 'secondary'}>
                      {sample.status}
                    </Badge>
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