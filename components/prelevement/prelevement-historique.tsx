//components/prelevement/prelevement-historique.tsx
'use client';

// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context"; // UTILISER NOTRE HOOK
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
  // CORRECTION : Utiliser notre hook et les bonnes clés
  const { t } = useLanguage();

  const getStatusTranslation = (status: 'Terminé' | 'En attente') => {
    return status === 'Terminé' 
      ? t('HistoriquePrelevement.statusCompleted')
      : t('HistoriquePrelevement.statusPending');
  };

  return (
    <div className="container mx-auto p-4">
      <PageTitleWithInfo
        title={t('HistoriquePrelevement.pageTitle')}
        infoText={t('HistoriquePrelevement.pageInfo')}
      />
      <Card>
        <CardHeader>
          <CardTitle>{t('HistoriquePrelevement.cardTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('HistoriquePrelevement.headerSampleId')}</TableHead>
                <TableHead>{t('HistoriquePrelevement.headerPatientId')}</TableHead>
                <TableHead>{t('HistoriquePrelevement.headerDateTime')}</TableHead>
                <TableHead>{t('HistoriquePrelevement.headerTechnician')}</TableHead>
                <TableHead>{t('HistoriquePrelevement.headerStatus')}</TableHead>
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
                      {getStatusTranslation(sample.status)}
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