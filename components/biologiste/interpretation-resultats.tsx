import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { Badge } from "@/components/ui/badge";
import { ChatbotWindow } from "../chatbot/chatbot-window";
import { ChatbotFab } from "../chatbot/chatbot-fab";
import { useState } from "react";

const resultToInterpret = {
  patientId: 'PAT-10234',
  dob: '1980-05-20',
  analysis: 'Ionogramme',
  results: [
    { param: 'Sodium', value: '148 mmol/L', ref: '135-145' },
    { param: 'Potassium', value: '5.3 mmol/L', ref: '3.5-5.0' },
  ]
};

export default function InterpretationPage() {

    // La page gère uniquement l'état d'ouverture/fermeture
        const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div className="container mx-auto p-4">
      <PageTitleWithInfo
        title="Interprétation et Validation Biologique"
        infoText="Analysez les résultats techniques, ajoutez votre interprétation et signez électroniquement pour finaliser le rapport."
      />
      <Card>
        <CardHeader>
          <CardTitle>Dossier à Interpréter</CardTitle>
          <CardDescription>ID Patient : {resultToInterpret.patientId} - Né(e) le: {resultToInterpret.dob}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <h3 className="font-semibold mb-2">Résultats Bruts</h3>
            <Table>
                <TableHeader><TableRow><TableHead>Paramètre</TableHead><TableHead>Résultat</TableHead><TableHead>Valeurs de référence</TableHead></TableRow></TableHeader>
                <TableBody>
                    {resultToInterpret.results.map(r => (
                        <TableRow key={r.param}>
                            <TableCell>{r.param}</TableCell>
                            <TableCell><Badge variant="destructive" className="font-mono">{r.value}</Badge></TableCell>
                            <TableCell className="font-mono">{r.ref}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
          <div className="grid gap-2">
            <h3 className="font-semibold">Ajouter une Interprétation et Conclusion</h3>
            <Textarea placeholder="Ex: Hyperkaliémie et hypernatrémie modérées. A corréler à la clinique et à un éventuel traitement..." />
          </div>
          <Button className="w-full">Valider et Signer le Rapport</Button>
        </CardContent>
      </Card>

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