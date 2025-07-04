//components/prelevement/worklist.tsx
'use client';

// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context"; // UTILISER NOTRE HOOK
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
  // CORRECTION : Utiliser notre hook et les bonnes clés
  const { t } = useLanguage();

  const getPriorityTranslation = (priority: 'Urgent' | 'Routine') => {
    return priority === 'Urgent' 
      ? t('Worklist.priorityUrgent') 
      : t('Worklist.priorityRoutine');
  };

  return (
    <div className="container mx-auto p-4">
       <PageTitleWithInfo
        title={t('Worklist.pageTitle')}
        infoText={t('Worklist.pageInfo')}
      />
      <Card>
        <CardHeader><CardTitle>{t('Worklist.cardTitle')}</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('Worklist.headerSampleId')}</TableHead>
                        <TableHead>{t('Worklist.headerPatientId')}</TableHead>
                        <TableHead>{t('Worklist.headerAnalysis')}</TableHead>
                        <TableHead>{t('Worklist.headerPriority')}</TableHead>
                        <TableHead>{t('Worklist.headerAction')}</TableHead>
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
                                    {getPriorityTranslation(item.priority)}
                                </Badge>
                            </TableCell>
                            <TableCell><Button size="sm">{t('Worklist.actionButton')}</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}