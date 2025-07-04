"use client"

// Importez votre hook useLanguage depuis le chemin correct
import { useLanguage } from '@/context/language-context';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données de simulation
// Note: Ces données restent en dur dans le code. Si les noms de fournisseurs
// ou les catégories devaient être traduits, leurs valeurs devraient être
// des clés de traduction ou mappées dynamiquement. Ici, on va traduire
// les en-têtes de table et les labels des graphiques qui les affichent.
const suppliersData = [
  { name: "BioLab Supplies", amount: 15000000, category: "Réactifs" },
  { name: "MedEquip Pro", amount: 8500000, category: "Équipements" },
  { name: "ChemReagents", amount: 7200000, category: "Réactifs" },
  { name: "LabConsumables", amount: 6800000, category: "Consommables" },
  { name: "TechService", amount: 5000000, category: "Maintenance" },
];

const categoryData = [
  { nameKey: "Reactifs", value: 22200000, color: "hsl(var(--primary))" }, // Changé 'name' en 'nameKey'
  { nameKey: "Equipements", value: 8500000, color: "hsl(var(--secondary))" }, // Changé 'name' en 'nameKey'
  // Ajoutez d'autres catégories si nécessaire
  { nameKey: "Consommables", value: 6800000, color: "hsl(var(--chart-3))" },
  { nameKey: "Maintenance", value: 5000000, color: "hsl(var(--chart-4))" }
];

export function CostsSuppliersTab() {
  // Initialisez votre hook de langue personnalisé
  const { t } = useLanguage();

  const totalSpent = suppliersData.reduce((sum, supplier) => sum + supplier.amount, 0);

  // Fonction utilitaire pour obtenir la traduction d'une catégorie
  const getCategoryTranslation = (category: string) => {
    // Les catégories dans `suppliersData` sont des chaînes comme "Réactifs".
    // Nous devons les mapper à des clés JSON pour la traduction.
    // Par exemple, "Réactifs" -> "Reactifs" pour la clé JSON.
    const key = category.replace(/\s/g, ''); // Supprime les espaces pour correspondre à la clé JSON
    return t(`CostsSuppliersTab.categories.${key}`) || category; // Retourne l'original si pas trouvé
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {/* KPI: Total Dépenses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('CostsSuppliersTab.totalSpent')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSpent.toLocaleString()} {t('CostsSuppliersTab.currency')}</div>
          </CardContent>
        </Card>

        {/* KPI: Principal Fournisseur */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('CostsSuppliersTab.mainSupplier')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* BioLab Supplies est une donnée, non traduite directement */}
            <div className="text-lg font-bold">BioLab Supplies</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top 5 Fournisseurs */}
        <Card>
          <CardHeader>
            <CardTitle>{t('CostsSuppliersTab.top5SuppliersTitle')}</CardTitle>
            <CardDescription>{t('CostsSuppliersTab.top5SuppliersDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={suppliersData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* Utilisation de `text-end` et `text-start` si nécessaire pour les labels */}
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `${(v / 1000000).toFixed(0)}${t('CostsSuppliersTab.chartUnitMillion')}`}
                    className="text-end" // Adapte la position du texte du label en fonction de RTL/LTR
                  />
                  <YAxis dataKey="name" type="category" width={100} className="text-start" />
                  <Tooltip formatter={(value: number) => [`${value.toLocaleString()} ${t('CostsSuppliersTab.currency')}`, t('CostsSuppliersTab.tableHeaders.amount')]} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Répartition par Catégorie */}
        <Card>
          <CardHeader>
            <CardTitle>{t('CostsSuppliersTab.categoryDistributionTitle')}</CardTitle>
            <CardDescription>{t('CostsSuppliersTab.categoryDistributionDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nameKey, value }) => `${t(`CostsSuppliersTab.categories.${nameKey}`)}: ${(value / 1000000).toFixed(1)}${t('CostsSuppliersTab.chartUnitMillion')}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${v.toLocaleString()} ${t('CostsSuppliersTab.currency')}`, t('CostsSuppliersTab.tableHeaders.amount')]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détail des Dépenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('CostsSuppliersTab.expenseDetailsTitle')}</CardTitle>
            <CardDescription>{t('CostsSuppliersTab.expenseDetailsDescription')}</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 me-2" /> {/* `me-2` pour margin-end (compatible RTL) */}
            {t('CostsSuppliersTab.exportButton')}
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('CostsSuppliersTab.tableHeaders.supplier')}</TableHead>
                <TableHead>{t('CostsSuppliersTab.tableHeaders.category')}</TableHead>
                <TableHead className="text-end">{t('CostsSuppliersTab.tableHeaders.amount')}</TableHead> {/* `text-end` pour alignement compatible RTL */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliersData.map(s => (
                <TableRow key={s.name}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{getCategoryTranslation(s.category)}</TableCell> {/* Utilisation de la fonction d'aide */}
                  <TableCell className="text-end">{s.amount.toLocaleString()} {t('CostsSuppliersTab.currency')}</TableCell> {/* `text-end` pour alignement compatible RTL */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}