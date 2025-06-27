import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { Button } from "@/components/ui/button";

type FinalReport = {
    id: string;
    patientId: string;
    reportDate: string;
    specialist: string;
}
const reportsData: FinalReport[] = [
    { id: 'REP-001', patientId: 'PAT-10172', reportDate: '2023-10-27', specialist: 'Dr. Ahmed Salif' },
    { id: 'REP-002', patientId: 'PAT-10290', reportDate: '2023-10-27', specialist: 'Dr. Ahmed Salif' },
]

export default function RapportsPage() {
    return (
        <div className="container mx-auto p-4">
            <PageTitleWithInfo
                title="Rapports Finalisés"
                infoText="Consultez et téléchargez les rapports de résultats qui ont été validés et signés."
            />
            <Card>
                <CardHeader>
                <CardTitle>Historique des Rapports Finalisés</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID Rapport</TableHead>
                            <TableHead>ID Patient</TableHead>
                            <TableHead>Date du Rapport</TableHead>
                            <TableHead>Signé par</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {reportsData.map(report => (
                        <TableRow key={report.id}>
                        <TableCell>{report.id}</TableCell>
                        <TableCell>{report.patientId}</TableCell>
                        <TableCell>{report.reportDate}</TableCell>
                        <TableCell>{report.specialist}</TableCell>
                        <TableCell><Button variant="outline" size="sm">Voir le PDF</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
    );
}