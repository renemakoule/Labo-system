'use client'; // Ce composant a une forte interactivité client

import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MoreHorizontal } from 'lucide-react';

import { PageTitleWithInfo } from "@/components/page-title-with-info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// --- TYPES DE DONNÉES ---
type AppointmentStatus = 'Programmé' | 'Terminé' | 'Annulé' | 'En cours' | 'Reporté';

type Appointment = {
  id: string;
  date: string; // Format 'YYYY-MM-DD'
  time: string; // Format 'HH:mm'
  patientId: string;
  type: 'Consultation' | 'Suivi';
  status: AppointmentStatus;
};

type Availability = {
  workDays: {
    [key: number]: { active: boolean; start: string; end: string }; // 0: Dimanche, 1: Lundi...
  },
  breakTime: { start: string; end: string };
  unavailableDates: string[]; // Format 'YYYY-MM-DD'
};

// --- DONNÉES MOCK INITIALES ---
const initialAppointments: Appointment[] = [
  { id: 'RDV-001', date: '2023-11-20', time: '10:00', patientId: 'PAT-10845', type: 'Consultation', status: 'Programmé' },
  { id: 'RDV-002', date: '2023-11-20', time: '11:30', patientId: 'PAT-10932', type: 'Suivi', status: 'En cours' },
  { id: 'RDV-003', date: '2023-11-21', time: '09:00', patientId: 'PAT-10765', type: 'Suivi', status: 'Terminé' },
  { id: 'RDV-004', date: '2023-11-21', time: '14:00', patientId: 'PAT-10234', type: 'Consultation', status: 'Annulé' },
  { id: 'RDV-005', date: '2023-11-22', time: '15:00', patientId: 'PAT-11001', type: 'Consultation', status: 'Reporté' },
];

const initialAvailability: Availability = {
  workDays: {
    1: { active: true, start: "09:00", end: "17:00" }, // Lundi
    2: { active: true, start: "09:00", end: "17:00" }, // Mardi
    3: { active: true, start: "09:00", end: "17:00" }, // Mercredi
    4: { active: true, start: "09:00", end: "17:00" }, // Jeudi
    5: { active: true, start: "09:00", end: "13:00" }, // Vendredi
    6: { active: false, start: "09:00", end: "17:00" }, // Samedi
    0: { active: false, start: "09:00", end: "17:00" }, // Dimanche
  },
  breakTime: { start: "12:30", end: "13:30" },
  unavailableDates: ["2023-12-25", "2024-01-01"],
};

const daysOfWeek = [
    { id: 1, label: 'Lundi' }, { id: 2, label: 'Mardi' }, { id: 3, label: 'Mercredi' },
    { id: 4, label: 'Jeudi' }, { id: 5, label: 'Vendredi' }, { id: 6, label: 'Samedi' }, { id: 0, label: 'Dimanche' }
];

// --- COMPOSANT PRINCIPAL ---
export default function CalendrierPage() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date('2023-11-20'));
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [availability, setAvailability] = useState<Availability>(initialAvailability);

  // Filtre les RDV pour le jour sélectionné
  const appointmentsForSelectedDay = appointments.filter(
    apt => selectedDate && apt.date === format(selectedDate, 'yyyy-MM-dd')
  ).sort((a,b) => a.time.localeCompare(b.time));

  // Gère le changement de statut d'un RDV
  const handleStatusChange = (appointmentId: string, newStatus: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
    toast({ title: "Statut mis à jour", description: `Le rendez-vous ${appointmentId} est maintenant : ${newStatus}` });
  };
  
  // Gère la sauvegarde des disponibilités
  const handleSaveAvailability = () => {
    // Dans une vraie application, on enverrait `availability` à une API
    console.log("Saving availability:", availability);
    toast({ title: "Disponibilités enregistrées", description: "Votre planning a été mis à jour avec succès." });
  };

  const getStatusBadgeVariant = (status: AppointmentStatus) => {
    switch (status) {
      case 'Annulé': return 'destructive';
      case 'Terminé': return 'default';
      case 'En cours': return 'outline';
      case 'Reporté': return 'secondary';
      default: return 'default';
    }
  };


  return (
    <div className="container mx-auto p-4">
      <PageTitleWithInfo
        title="Gestion du Planning"
        infoText="Gérez vos rendez-vous avec les patients et définissez vos plages de travail, vos pauses et vos jours d'indisponibilité."
      />
      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">Gestion des Rendez-vous</TabsTrigger>
          <TabsTrigger value="availability">Gestion des Disponibilités</TabsTrigger>
        </TabsList>

        {/* ONGLET 1: GESTION DES RENDEZ-VOUS */}
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                locale={fr}
              />
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rendez-vous du {selectedDate ? format(selectedDate, 'PPP', { locale: fr }) : ''}</CardTitle>
                </CardHeader>
                <CardContent>
                  {appointmentsForSelectedDay.length > 0 ? (
                    <ul className="space-y-4">
                      {appointmentsForSelectedDay.map(apt => (
                        <li key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border">
                          <div>
                            <p className="font-bold">{apt.time} - ID Patient: <span className="font-mono">{apt.patientId}</span></p>
                            <p className="text-sm text-gray-500">{apt.type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusBadgeVariant(apt.status)}>{apt.status}</Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleStatusChange(apt.id, 'En cours')}>Marquer 'En cours'</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(apt.id, 'Terminé')}>Marquer 'Terminé'</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(apt.id, 'Reporté')}>Marquer 'Reporté'</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(apt.id, 'Annulé')}>Annuler le RDV</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center text-gray-500 py-8">Aucun rendez-vous programmé pour cette date.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ONGLET 2: GESTION DES DISPONIBILITÉS */}
        <TabsContent value="availability">
            <Card>
                <CardHeader>
                    <CardTitle>Configuration de vos Disponibilités</CardTitle>
                    <CardDescription>Définissez vos heures de travail, pauses et jours de congé.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Horaires de travail */}
                    <div className='space-y-4'>
                        <h3 className="font-semibold">Horaires de travail hebdomadaires</h3>
                        {daysOfWeek.map(day => (
                            <div key={day.id} className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex items-center gap-3">
                                    <Checkbox 
                                        id={`day-${day.id}`} 
                                        checked={availability.workDays[day.id].active}
                                        onCheckedChange={(checked) => setAvailability(prev => ({...prev, workDays: {...prev.workDays, [day.id]: {...prev.workDays[day.id], active: !!checked}}}))}
                                    />
                                    <Label htmlFor={`day-${day.id}`} className="w-20">{day.label}</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input type="time" className="w-32" value={availability.workDays[day.id].start} disabled={!availability.workDays[day.id].active} onChange={(e) => setAvailability(prev => ({...prev, workDays: {...prev.workDays, [day.id]: {...prev.workDays[day.id], start: e.target.value}}}))} />
                                    <span>-</span>
                                    <Input type="time" className="w-32" value={availability.workDays[day.id].end} disabled={!availability.workDays[day.id].active} onChange={(e) => setAvailability(prev => ({...prev, workDays: {...prev.workDays, [day.id]: {...prev.workDays[day.id], end: e.target.value}}}))} />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pause */}
                    <div className='space-y-2'>
                         <h3 className="font-semibold">Pause déjeuner</h3>
                         <div className="flex items-center gap-2">
                            <Label>De</Label>
                            <Input type="time" className="w-32" value={availability.breakTime.start} onChange={(e) => setAvailability(prev => ({...prev, breakTime: {...prev.breakTime, start: e.target.value}}))} />
                            <Label>à</Label>
                            <Input type="time" className="w-32" value={availability.breakTime.end} onChange={(e) => setAvailability(prev => ({...prev, breakTime: {...prev.breakTime, end: e.target.value}}))} />
                        </div>
                    </div>
                     {/* Jours indisponibles */}
                     <div className='space-y-2'>
                        <h3 className="font-semibold">Jours d'indisponibilité (Congés)</h3>
                        <p className="text-sm text-gray-500">
                            Indisponibilités enregistrées : {availability.unavailableDates.join(', ')}. 
                            (Dans une vraie application, un sélecteur de dates multiples serait ici.)
                        </p>
                    </div>

                    <Button onClick={handleSaveAvailability} className="w-full">Enregistrer les modifications</Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}