//components/prelevement/prelevement-nouveau.tsx
"use client";

// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from "@/context/language-context"; // UTILISER NOTRE HOOK
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTitleWithInfo } from "@/components/page-title-with-info";

export default function NouveauPrelevementPage() {
  // CORRECTION : Utiliser notre hook et les bonnes clés
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-4">
      <PageTitleWithInfo
        title={t('NouveauPrelevement.pageTitle')}
        infoText={t('NouveauPrelevement.pageInfo')}
      />
      <Card>
        <CardHeader>
          <CardTitle>{t('NouveauPrelevement.cardTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="patient-id">{t('NouveauPrelevement.patientIdLabel')}</Label>
                <Input id="patient-id" placeholder={t('NouveauPrelevement.patientIdPlaceholder')} />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="patient-dob">{t('NouveauPrelevement.patientDobLabel')}</Label>
                <Input id="patient-dob" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="analysis-type">{t('NouveauPrelevement.analysisLabel')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('NouveauPrelevement.analysisPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nfs">{t('NouveauPrelevement.analysisNFS')}</SelectItem>
                    <SelectItem value="glycemie">{t('NouveauPrelevement.analysisGlycemie')}</SelectItem>
                    <SelectItem value="bilan-lipidique">{t('NouveauPrelevement.analysisBilanLipidique')}</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <Button className="w-full">{t('NouveauPrelevement.submitButton')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}