import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTitleWithInfo } from "@/components/page-title-with-info";

export default function NouveauPrelevementPage() {
  return (
    <div className="container mx-auto p-4">
      <PageTitleWithInfo
        title="Nouveau Prélèvement"
        infoText="Enregistrez un nouveau prélèvement en associant un ID Patient unique aux analyses demandées."
      />
      <Card>
        <CardHeader>
          <CardTitle>Enregistrer un Prélèvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="patient-id">ID Patient (Code Unique)</Label>
                <Input id="patient-id" placeholder="Ex: PAT-123456" />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="patient-dob">Date de Naissance du Patient</Label>
                <Input id="patient-dob" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="analysis-type">Analyses Demandées</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez les analyses..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nfs">Numération Formule Sanguine (NFS)</SelectItem>
                    <SelectItem value="glycemie">Glycémie à jeun</SelectItem>
                    <SelectItem value="bilan-lipidique">Bilan Lipidique</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <Button className="w-full">Enregistrer et Imprimer l'Étiquette</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}