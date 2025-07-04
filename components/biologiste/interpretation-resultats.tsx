'use client';

import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { Badge } from "@/components/ui/badge";
import { ChatbotWindow } from "../chatbot/chatbot-window";
import { ChatbotFab } from "../chatbot/chatbot-fab";

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
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { t } = useLanguage();

  return (
    <div className="container mx-auto p-4">
      <PageTitleWithInfo
        title={t('InterpretationResultats.pageTitle')}
        infoText={t('InterpretationResultats.pageInfo')}
      />
      <Card>
        <CardHeader>
          <CardTitle>{t('InterpretationResultats.cardTitle')}</CardTitle>
          <CardDescription>
            {t('InterpretationResultats.patientId')}: {resultToInterpret.patientId} - {t('InterpretationResultats.dob')}: {resultToInterpret.dob}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <h3 className="font-semibold mb-2">{t('InterpretationResultats.rawResults')}</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('InterpretationResultats.headerParam')}</TableHead>
                        <TableHead>{t('InterpretationResultats.headerResult')}</TableHead>
                        <TableHead>{t('InterpretationResultats.headerReference')}</TableHead>
                    </TableRow>
                </TableHeader>
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
            <h3 className="font-semibold">{t('InterpretationResultats.addInterpretationTitle')}</h3>
            <Textarea placeholder={t('InterpretationResultats.addInterpretationPlaceholder')} />
          </div>
          <Button className="w-full">{t('InterpretationResultats.submitButton')}</Button>
        </CardContent>
      </Card>

      <ChatbotWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ChatbotFab isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />
    </div>
  );
}