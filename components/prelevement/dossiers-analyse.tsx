'use client'; // Le composant doit être un composant client pour être interactif

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// --- DÉFINITION DES NOUVEAUX TYPES ---
type AnalysisStatus = 'En attente' | 'En cours' | 'Terminé';

type InAnalysisItem = {
  sampleId: string;
  patientId: string;
  analysis: string;
  machine: string;
  startTime: string;
  status: AnalysisStatus;
  endTime?: string; // Optionnel, car il n'existe que si le statut est 'Terminé'
};

// --- DONNÉES MOCK INITIALES AVEC STATUTS ---
const initialAnalysisData: InAnalysisItem[] = [
  { sampleId: 'SMP-008', patientId: 'PAT-10765', analysis: 'Bilan Hépatique', machine: 'Cobas 8000', startTime: '11:05', status: 'En cours' },
  { sampleId: 'SMP-009', patientId: 'PAT-10234', analysis: 'Ionogramme', machine: 'Sysmex XN', startTime: '11:12', status: 'En cours' },
  { sampleId: 'SMP-010', patientId: 'PAT-10845', analysis: 'NFS', machine: 'Sysmex XN', startTime: '11:20', status: 'En attente' },
  { sampleId: 'SMP-007', patientId: 'PAT-10555', analysis: 'TSH', machine: 'Cobas 8000', startTime: '10:45', status: 'Terminé', endTime: '11:15' },
];


export default function DossiersEnAnalysePage() {
    const { toast } = useToast();
    const [analyses, setAnalyses] = useState<InAnalysisItem[]>(initialAnalysisData);

    const handleStatusChange = (sampleId: string, newStatus: AnalysisStatus) => {
        setAnalyses(currentAnalyses =>
            currentAnalyses.map(item => {
                if (item.sampleId === sampleId) {
                    const updatedItem = { ...item, status: newStatus };
                    // Si le nouveau statut est 'Terminé', on ajoute l'heure de fin
                    if (newStatus === 'Terminé') {
                        updatedItem.endTime = new Date().toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                    } else {
                        // Sinon, on s'assure que l'heure de fin est enlevée
                        delete updatedItem.endTime;
                    }
                    return updatedItem;
                }
                return item;
            })
        );

        toast({
            title: "Statut mis à jour",
            description: `L'analyse ${sampleId} est maintenant : ${newStatus}.`,
        });
    };

    const getBadgeVariant = (status: AnalysisStatus): "default" | "secondary" | "outline" => {
        switch (status) {
            case 'Terminé': return 'default';
            case 'En cours': return 'outline';
            case 'En attente':
            default: return 'secondary';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <PageTitleWithInfo
                title="Dossiers en Cours d'Analyse"
                infoText="Suivi en temps réel des échantillons actuellement en cours de traitement sur les automates."
            />
            <Card>
                <CardHeader><CardTitle>Suivi des analyses</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID Prélèvement</TableHead>
                                <TableHead>ID Patient</TableHead>
                                <TableHead>Analyse</TableHead>
                                <TableHead>Automate</TableHead>
                                <TableHead>Heure Début</TableHead>
                                <TableHead>Heure Fin</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
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
                                    <TableCell>
                                        {/* Affiche l'heure de fin seulement si elle existe */}
                                        {item.status === 'Terminé' ? item.endTime : '—'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Ouvrir le menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(item.sampleId, 'En cours')}
                                                    disabled={item.status === 'En cours'}
                                                >
                                                    Marquer 'En cours'
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(item.sampleId, 'Terminé')}
                                                    disabled={item.status === 'Terminé'}
                                                >
                                                    Marquer 'Terminé'
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(item.sampleId, 'En attente')}
                                                >
                                                    Remettre 'En attente'
                                                </DropdownMenuItem>
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