//components/prelevement/dossiers-analyse.tsx
'use client';

import { useState } from 'react';
// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context"; // UTILISER NOTRE HOOK
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type AnalysisStatus = 'En attente' | 'En cours' | 'Terminé';

type InAnalysisItem = {
  sampleId: string;
  patientId: string;
  analysis: string;
  machine: string;
  startTime: string;
  status: AnalysisStatus;
  endTime?: string;
};

const initialAnalysisData: InAnalysisItem[] = [
  { sampleId: 'SMP-008', patientId: 'PAT-10765', analysis: 'Bilan Hépatique', machine: 'Cobas 8000', startTime: '11:05', status: 'En cours' },
  { sampleId: 'SMP-009', patientId: 'PAT-10234', analysis: 'Ionogramme', machine: 'Sysmex XN', startTime: '11:12', status: 'En cours' },
  { sampleId: 'SMP-010', patientId: 'PAT-10845', analysis: 'NFS', machine: 'Sysmex XN', startTime: '11:20', status: 'En attente' },
  { sampleId: 'SMP-007', patientId: 'PAT-10555', analysis: 'TSH', machine: 'Cobas 8000', startTime: '10:45', status: 'Terminé', endTime: '11:15' },
];

export default function DossiersEnAnalysePage() {
    const { toast } = useToast();
    const [analyses, setAnalyses] = useState<InAnalysisItem[]>(initialAnalysisData);
    // CORRECTION : Utiliser notre hook et les bonnes clés
    const { t } = useLanguage();

    const getStatusTranslation = (status: AnalysisStatus) => {
        const keyMap = {
            'En attente': 'DossiersAnalyse.statusPending',
            'En cours': 'DossiersAnalyse.statusInProgress',
            'Terminé': 'DossiersAnalyse.statusCompleted'
        };
        return t(keyMap[status]);
    }

    const handleStatusChange = (sampleId: string, newStatus: AnalysisStatus) => {
        setAnalyses(currentAnalyses =>
            currentAnalyses.map(item => {
                if (item.sampleId === sampleId) {
                    const updatedItem: InAnalysisItem = { ...item, status: newStatus };
                    if (newStatus === 'Terminé' && !item.endTime) {
                        updatedItem.endTime = new Date().toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                    } else if (newStatus !== 'Terminé') {
                        delete updatedItem.endTime;
                    }
                    return updatedItem;
                }
                return item;
            })
        );
        toast({ title: t('DossiersAnalyse.toastTitle'), description: `${t('DossiersAnalyse.toastDescription1')} ${sampleId} ${t('DossiersAnalyse.toastDescription2')} ${getStatusTranslation(newStatus)}.` });
    };

    const getBadgeVariant = (status: AnalysisStatus): "default" | "secondary" | "outline" => {
        switch (status) {
            case 'Terminé': return 'default';
            case 'En cours': return 'outline';
            case 'En attente': default: return 'secondary';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <PageTitleWithInfo
                title={t('DossiersAnalyse.pageTitle')}
                infoText={t('DossiersAnalyse.pageInfo')}
            />
            <Card>
                <CardHeader><CardTitle>{t('DossiersAnalyse.cardTitle')}</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('DossiersAnalyse.headerSampleId')}</TableHead>
                                <TableHead>{t('DossiersAnalyse.headerPatientId')}</TableHead>
                                <TableHead>{t('DossiersAnalyse.headerAnalysis')}</TableHead>
                                <TableHead>{t('DossiersAnalyse.headerMachine')}</TableHead>
                                <TableHead>{t('DossiersAnalyse.headerStartTime')}</TableHead>
                                <TableHead>{t('DossiersAnalyse.headerEndTime')}</TableHead>
                                <TableHead>{t('DossiersAnalyse.headerStatus')}</TableHead>
                                <TableHead className="text-end">{t('DossiersAnalyse.headerActions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {analyses.map(item => (
                                <TableRow key={item.sampleId}>
                                    <TableCell className="font-mono">{item.sampleId}</TableCell>
                                    <TableCell className="font-mono">{item.patientId}</TableCell>
                                    <TableCell className="font-medium">{item.analysis}</TableCell>
                                    <TableCell>{item.machine}</TableCell>
                                    <TableCell>{item.startTime}</TableCell>
                                    <TableCell>{item.endTime || '—'}</TableCell>
                                    <TableCell><Badge variant={getBadgeVariant(item.status)}>{getStatusTranslation(item.status)}</Badge></TableCell>
                                    <TableCell className="text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Ouvrir le menu</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>{t('DossiersAnalyse.actionChangeStatus')}</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleStatusChange(item.sampleId, 'En cours')} disabled={item.status === 'En cours'}>{t('DossiersAnalyse.actionInProgress')}</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(item.sampleId, 'Terminé')} disabled={item.status === 'Terminé'}>{t('DossiersAnalyse.actionCompleted')}</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(item.sampleId, 'En attente')}>{t('DossiersAnalyse.actionPending')}</DropdownMenuItem>
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