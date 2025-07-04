//components/biologiste/rapports-finalises.tsx
'use client';

import { useState } from 'react';
// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from '@/context/language-context'; // UTILISER NOTRE HOOK
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { Button } from "@/components/ui/button";
import { ChatbotFab } from '@/components/chatbot/chatbot-fab';
import { ChatbotWindow } from '@/components/chatbot/chatbot-window';

type FinalReport = {
    id: string;
    patientId: string;
    reportDate: string;
    specialist: string;
};

const reportsData: FinalReport[] = [
    { id: 'REP-001', patientId: 'PAT-10172', reportDate: '2023-10-27', specialist: 'Dr. Ahmed Salif' },
    { id: 'REP-002', patientId: 'PAT-10290', reportDate: '2023-10-27', specialist: 'Dr. Ahmed Salif' },
];

export default function RapportsPage() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    // CORRECTION : Utiliser notre hook et les bonnes clés
    const { t } = useLanguage();

    return (
        <div className="relative min-h-screen">
            <div className="container mx-auto p-4 pb-24">
                <PageTitleWithInfo
                    title={t('RapportsFinalises.pageTitle')}
                    infoText={t('RapportsFinalises.pageInfo')}
                />
                <Card>
                    <CardHeader>
                        <CardTitle>{t('RapportsFinalises.cardTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('RapportsFinalises.headerReportId')}</TableHead>
                                    <TableHead>{t('RapportsFinalises.headerPatientId')}</TableHead>
                                    <TableHead>{t('RapportsFinalises.headerReportDate')}</TableHead>
                                    <TableHead>{t('RapportsFinalises.headerSignedBy')}</TableHead>
                                    <TableHead>{t('RapportsFinalises.headerAction')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportsData.map(report => (
                                    <TableRow key={report.id}>
                                        <TableCell>{report.id}</TableCell>
                                        <TableCell>{report.patientId}</TableCell>
                                        <TableCell>{report.reportDate}</TableCell>
                                        <TableCell>{report.specialist}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">{t('RapportsFinalises.actionButton')}</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <ChatbotWindow 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
            />
            <ChatbotFab 
                isOpen={isChatOpen} 
                onToggle={() => setIsChatOpen(!isChatOpen)} 
            />
        </div>
    );
}