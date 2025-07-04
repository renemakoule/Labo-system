//components/prelevement/resultats-a-valider.tsx
'use client'; 

import { useState } from 'react';
// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from '@/context/language-context'; // UTILISER NOTRE HOOK
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ValidationStatus = 'En attente de validation' | 'Validé technique' | 'Rejeté (à refaire)';

type ResultToValidate = {
    sampleId: string;
    patientId: string;
    analysis: string;
    result: string;
    reference: string;
    flag?: 'H' | 'L';
    status: ValidationStatus;
};

const initialResultsData: ResultToValidate[] = [
    { sampleId: 'SMP-001', patientId: 'PAT-10172', analysis: 'Hémoglobine', result: '14.5 g/dL', reference: '12.0 - 16.0', status: 'En attente de validation' },
    { sampleId: 'SMP-002', patientId: 'PAT-10290', analysis: 'Leucocytes', result: '11,500 /mm³', reference: '4,000 - 11,000', flag: 'H', status: 'En attente de validation' },
    { sampleId: 'SMP-004', patientId: 'PAT-10455', analysis: 'Plaquettes', result: '98,000 /mm³', reference: '150,000 - 450,000', flag: 'L', status: 'En attente de validation' },
    { sampleId: 'SMP-005', patientId: 'PAT-10689', analysis: 'Créatinine', result: '1.4 mg/dL', reference: '0.6 - 1.2', flag: 'H', status: 'Validé technique' },
];

export default function ResultatsAValiderPage() {
    const { toast } = useToast();
    const [results, setResults] = useState<ResultToValidate[]>(initialResultsData);
    // CORRECTION : Utiliser notre hook
    const { t } = useLanguage();

    const getStatusTranslation = (status: ValidationStatus) => {
        const keyMap = {
            'En attente de validation': 'ResultatsAValider.statusPending',
            'Validé technique': 'ResultatsAValider.statusValidated',
            'Rejeté (à refaire)': 'ResultatsAValider.statusRejected'
        };
        return t(keyMap[status]);
    };

    const handleStatusChange = (sampleId: string, newStatus: ValidationStatus) => {
        setResults(currentResults =>
            currentResults.map(result =>
                result.sampleId === sampleId ? { ...result, status: newStatus } : result
            )
        );
        toast({ 
            title: t('ResultatsAValider.toastTitle'), 
            description: `${t('ResultatsAValider.toastDescription1')} ${sampleId} ${t('ResultatsAValider.toastDescription2')} ${getStatusTranslation(newStatus)}.` 
        });
    };
    
    const getBadgeVariant = (status: ValidationStatus): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'Validé technique': return 'default';
            case 'Rejeté (à refaire)': return 'destructive';
            case 'En attente de validation': default: return 'secondary';
        }
    };

    return (
        <div className="container mx-auto p-4">
             <PageTitleWithInfo
                title={t('ResultatsAValider.pageTitle')}
                infoText={t('ResultatsAValider.pageInfo')}
            />
            <Card>
                <CardHeader><CardTitle>{t('ResultatsAValider.cardTitle')}</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">{t('ResultatsAValider.headerSampleId')}</TableHead>
                                <TableHead>{t('ResultatsAValider.headerAnalysis')}</TableHead>
                                <TableHead>{t('ResultatsAValider.headerPatientId')}</TableHead>
                                <TableHead>{t('ResultatsAValider.headerResult')}</TableHead>
                                <TableHead>{t('ResultatsAValider.headerReference')}</TableHead>
                                <TableHead>{t('ResultatsAValider.headerStatus')}</TableHead>
                                <TableHead className="text-end">{t('ResultatsAValider.headerActions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map(item => (
                                <TableRow key={item.sampleId}>
                                    <TableCell className="font-mono">{item.sampleId}</TableCell>
                                    <TableCell className="font-medium">{item.analysis}</TableCell>
                                    <TableCell className="font-mono">{item.patientId}</TableCell>
                                    <TableCell className="font-mono">
                                        {item.result} 
                                        {item.flag && (
                                            <span className={`font-bold ms-2 ${item.flag === 'H' ? 'text-red-500' : 'text-blue-500'}`}>
                                                ({item.flag})
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm text-gray-500">{item.reference}</TableCell>
                                    <TableCell><Badge variant={getBadgeVariant(item.status)}>{getStatusTranslation(item.status)}</Badge></TableCell>
                                    <TableCell className="text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Ouvrir le menu</span><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>{t('ResultatsAValider.actionLabel')}</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleStatusChange(item.sampleId, 'Validé technique')} disabled={item.status === 'Validé technique'}>{t('ResultatsAValider.actionValidate')}</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleStatusChange(item.sampleId, 'Rejeté (à refaire)')} disabled={item.status === 'Rejeté (à refaire)'}>{t('ResultatsAValider.actionReject')}</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleStatusChange(item.sampleId, 'En attente de validation')}>{t('ResultatsAValider.actionSetPending')}</DropdownMenuItem>
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