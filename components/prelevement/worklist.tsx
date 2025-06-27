import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitleWithInfo } from "@/components/page-title-with-info";

type WorklistItem = {
  sampleId: string;
  patientId: string;
  analysis: string;
  priority: 'Urgent' | 'Routine';
};

const worklistData: WorklistItem[] = [
  { sampleId: 'SMP-010', patientId: 'PAT-10845', analysis: 'NFS', priority: 'Urgent' },
  { sampleId: 'SMP-011', patientId: 'PAT-10932', analysis: 'Glycémie', priority: 'Routine' },
];

export default function WorklistJourPage() {
  return (
    <div className="container mx-auto p-4">
       <PageTitleWithInfo
        title="Worklist du Jour"
        infoText="Liste des analyses à effectuer aujourd'hui, triées par priorité."
      />
      <Card>
        <CardHeader><CardTitle>Liste de travail du jour</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Prélèvement</TableHead>
                        <TableHead>ID Patient</TableHead>
                        <TableHead>Analyse</TableHead>
                        <TableHead>Priorité</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {worklistData.map(item => (
                        <TableRow key={item.sampleId}>
                            <TableCell>{item.sampleId}</TableCell>
                            <TableCell>{item.patientId}</TableCell>
                            <TableCell>{item.analysis}</TableCell>
                            <TableCell>
                                <Badge variant={item.priority === 'Urgent' ? 'destructive' : 'secondary'}>
                                    {item.priority}
                                </Badge>
                            </TableCell>
                            <TableCell><Button size="sm">Lancer l'analyse</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}