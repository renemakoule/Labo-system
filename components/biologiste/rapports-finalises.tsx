'use client'; // Garder 'use client' car la page gère l'état d'ouverture du chat

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { Button } from "@/components/ui/button";

// Importez les nouveaux composants
import { ChatbotFab } from '@/components/chatbot/chatbot-fab';
import { ChatbotWindow } from '@/components/chatbot/chatbot-window';


// --- Types et Données Mock (inchangés) ---
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


// --- Composant Principal (simplifié) ---
export default function RapportsPage() {
    // La page gère uniquement l'état d'ouverture/fermeture
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="relative min-h-screen">
            <div className="container mx-auto p-4 pb-24"> {/* Ajout de padding en bas pour que le FAB ne cache pas le contenu */}
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

            {/* --- Appel des composants du Chatbot --- */}
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