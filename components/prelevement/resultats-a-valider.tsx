'use client'; // Le composant devient interactif, donc 'use client' est nécessaire

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// --- NOUVELLE DÉFINITION DES TYPES ---
// Type pour les statuts possibles à ce stade
type ValidationStatus = 'En attente de validation' | 'Validé technique' | 'Rejeté (à refaire)';

// Type de l'objet résultat, enrichi avec le statut
type ResultToValidate = {
    sampleId: string;
    patientId: string;
    analysis: string;
    result: string;
    reference: string;
    flag?: 'H' | 'L'; // High or Low
    status: ValidationStatus;
};

// --- DONNÉES MOCK INITIALES ---
const initialResultsData: ResultToValidate[] = [
    { sampleId: 'SMP-001', patientId: 'PAT-10172', analysis: 'Hémoglobine', result: '14.5 g/dL', reference: '12.0 - 16.0', status: 'En attente de validation' },
    { sampleId: 'SMP-002', patientId: 'PAT-10290', analysis: 'Leucocytes', result: '11,500 /mm³', reference: '4,000 - 11,000', flag: 'H', status: 'En attente de validation' },
    { sampleId: 'SMP-004', patientId: 'PAT-10455', analysis: 'Plaquettes', result: '98,000 /mm³', reference: '150,000 - 450,000', flag: 'L', status: 'En attente de validation' },
    { sampleId: 'SMP-005', patientId: 'PAT-10689', analysis: 'Créatinine', result: '1.4 mg/dL', reference: '0.6 - 1.2', flag: 'H', status: 'Validé technique' },
];

export default function ResultatsAValiderPage() {
    const { toast } = useToast();
    // Utilisation de useState pour gérer l'état des résultats de manière interactive
    const [results, setResults] = useState<ResultToValidate[]>(initialResultsData);

    // Fonction pour changer le statut d'une analyse
    const handleStatusChange = (sampleId: string, newStatus: ValidationStatus) => {
        setResults(currentResults =>
            currentResults.map(result =>
                result.sampleId === sampleId ? { ...result, status: newStatus } : result
            )
        );
        toast({
            title: "Mise à jour réussie",
            description: `Le statut de l'analyse ${sampleId} est maintenant : ${newStatus}.`,
        });
    };
    
    // Fonction pour déterminer la couleur du badge en fonction du statut
    const getBadgeVariant = (status: ValidationStatus): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'Validé technique':
                return 'default'; // Fond bleu/noir (succès)
            case 'Rejeté (à refaire)':
                return 'destructive'; // Fond rouge (erreur/rejet)
            case 'En attente de validation':
            default:
                return 'secondary'; // Fond gris (en attente)
        }
    };

    return (
        <div className="container mx-auto p-4">
             <PageTitleWithInfo
                title="Validation Technique des Résultats"
                infoText="Vérifiez les résultats bruts sortis des automates avant de les transmettre pour validation biologique."
            />
            <Card>
                <CardHeader>
                    <CardTitle>Résultats techniques à valider</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">ID Analyse</TableHead>
                                <TableHead>Analyse</TableHead>
                                <TableHead>ID Patient</TableHead>
                                <TableHead>Résultat</TableHead>
                                <TableHead>Ref.</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
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
                                            <span className={`font-bold ml-2 ${item.flag === 'H' ? 'text-red-500' : 'text-blue-500'}`}>
                                                ({item.flag})
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-mono text-sm text-gray-500">{item.reference}</TableCell>
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
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(item.sampleId, 'Validé technique')}
                                                    disabled={item.status === 'Validé technique'}
                                                >
                                                    Valider Technique
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(item.sampleId, 'Rejeté (à refaire)')}
                                                    disabled={item.status === 'Rejeté (à refaire)'}
                                                >
                                                    Rejeter (à refaire)
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(item.sampleId, 'En attente de validation')}
                                                >
                                                    Remettre en attente
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