//components/biologiste/calendrier.tsx
'use client';

import { useState } from 'react';
// SUPPRIMER : import { useTranslations } from "next-intl";
import { useLanguage } from '@/context/language-context'; // UTILISER NOTRE HOOK
import { format } from 'date-fns';
import { fr, ar } from 'date-fns/locale'; // Importer les locales pour date-fns
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

type AppointmentStatus = 'Programmé' | 'Terminé' | 'Annulé' | 'En cours' | 'Reporté';
type Appointment = {
  id: string; date: string; time: string; patientId: string; type: 'Consultation' | 'Suivi'; status: AppointmentStatus;
};
type Availability = {
  workDays: { [key: number]: { active: boolean; start: string; end: string } };
  breakTime: { start: string; end: string };
  unavailableDates: string[];
};
type DayOfWeek = { id: number; fr: string; ar: string };

const initialAppointments: Appointment[] = [
  { id: 'RDV-001', date: '2023-11-20', time: '10:00', patientId: 'PAT-10845', type: 'Consultation', status: 'Programmé' },
  { id: 'RDV-002', date: '2023-11-20', time: '11:30', patientId: 'PAT-10932', type: 'Suivi', status: 'En cours' },
  { id: 'RDV-003', date: '2023-11-21', time: '09:00', patientId: 'PAT-10765', type: 'Suivi', status: 'Terminé' },
  { id: 'RDV-004', date: '2023-11-21', time: '14:00', patientId: 'PAT-10234', type: 'Consultation', status: 'Annulé' },
  { id: 'RDV-005', date: '2023-11-22', time: '15:00', patientId: 'PAT-11001', type: 'Consultation', status: 'Reporté' },
];
const initialAvailability: Availability = {
  workDays: {
    1: { active: true, start: "09:00", end: "17:00" }, 2: { active: true, start: "09:00", end: "17:00" },
    3: { active: true, start: "09:00", end: "17:00" }, 4: { active: true, start: "09:00", end: "17:00" },
    5: { active: true, start: "09:00", end: "13:00" }, 6: { active: false, start: "09:00", end: "17:00" },
    0: { active: false, start: "09:00", end: "17:00" },
  },
  breakTime: { start: "12:30", end: "13:30" },
  unavailableDates: ["2023-12-25", "2024-01-01"],
};
const daysOfWeek: DayOfWeek[] = [
    { id: 1, fr: 'Lundi', ar: 'الاثنين' }, { id: 2, fr: 'Mardi', ar: 'الثلاثاء' }, { id: 3, fr: 'Mercredi', ar: 'الأربعاء' },
    { id: 4, fr: 'Jeudi', ar: 'الخميس' }, { id: 5, fr: 'Vendredi', ar: 'الجمعة' }, { id: 6, fr: 'Samedi', ar: 'السبت' }, { id: 0, fr: 'Dimanche', ar: 'الأحد' }
];

export default function CalendrierPage() {
  const { toast } = useToast();
  // CORRECTION : Utiliser notre hook
  const { t, locale } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date('2023-11-20'));
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [availability, setAvailability] = useState<Availability>(initialAvailability);

  const appointmentsForSelectedDay = appointments.filter(
    apt => selectedDate && apt.date === format(selectedDate, 'yyyy-MM-dd')
  ).sort((a,b) => a.time.localeCompare(b.time));

  const getStatusTranslation = (status: AppointmentStatus) => t(`Calendrier.${status.toLowerCase().replace(/ /g, '_').replace(/\(/g, '').replace(/\)/g, '')}`);
  const getAppointmentTypeTranslation = (type: 'Consultation' | 'Suivi') => t(`Calendrier.type_${type.toLowerCase()}`);

  const handleStatusChange = (appointmentId: string, newStatus: AppointmentStatus) => {
    setAppointments(prev => prev.map(apt => apt.id === appointmentId ? { ...apt, status: newStatus } : apt));
    toast({ title: t('Calendrier.toastStatusUpdated'), description: `${t('Calendrier.toastAppointment')} ${appointmentId} ${t('Calendrier.toastIsNow')} : ${getStatusTranslation(newStatus)}` });
  };
  
  const handleSaveAvailability = () => {
    console.log("Saving availability:", availability);
    toast({ title: t('Calendrier.toastAvailabilitySaved'), description: t('Calendrier.toastScheduleUpdated') });
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
      <PageTitleWithInfo title={t('Calendrier.pageTitle')} infoText={t('Calendrier.pageInfo')} />
      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">{t('Calendrier.tabAppointments')}</TabsTrigger>
          <TabsTrigger value="availability">{t('Calendrier.tabAvailability')}</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 flex justify-center">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" locale={locale === 'ar' ? ar : fr} />
            </div>
            <div className="lg:col-span-2">
              <Card>
                <CardHeader><CardTitle>{t('Calendrier.appointmentsFor')} {selectedDate ? format(selectedDate, 'PPP', { locale: locale === 'ar' ? ar : fr }) : ''}</CardTitle></CardHeader>
                <CardContent>
                  {appointmentsForSelectedDay.length > 0 ? (
                    <ul className="space-y-4">
                      {appointmentsForSelectedDay.map(apt => (
                        <li key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border">
                          <div>
                            <p className="font-bold">{apt.time} - {t('Calendrier.patientId')}: <span className="font-mono">{apt.patientId}</span></p>
                            <p className="text-sm text-gray-500">{getAppointmentTypeTranslation(apt.type)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusBadgeVariant(apt.status)}>{getStatusTranslation(apt.status)}</Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleStatusChange(apt.id, 'En cours')}>{t('Calendrier.actionInProgress')}</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(apt.id, 'Terminé')}>{t('Calendrier.actionCompleted')}</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(apt.id, 'Reporté')}>{t('Calendrier.actionPostponed')}</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => handleStatusChange(apt.id, 'Annulé')}>{t('Calendrier.actionCancel')}</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-center text-gray-500 py-8">{t('Calendrier.noAppointments')}</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="availability">
            <Card>
                <CardHeader>
                    <CardTitle>{t('Calendrier.availabilityTitle')}</CardTitle>
                    <CardDescription>{t('Calendrier.availabilityDescription')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className='space-y-4'><h3 className="font-semibold">{t('Calendrier.workHours')}</h3>
                        {daysOfWeek.map(day => (<div key={day.id} className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex items-center gap-3">
                                    <Checkbox id={`day-${day.id}`} checked={availability.workDays[day.id].active} onCheckedChange={(checked) => setAvailability(prev => ({...prev, workDays: {...prev.workDays, [day.id]: {...prev.workDays[day.id], active: !!checked}}}))} />
                                    <Label htmlFor={`day-${day.id}`} className="w-20">{locale === 'ar' ? day.ar : day.fr}</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input type="time" className="w-32" value={availability.workDays[day.id].start} disabled={!availability.workDays[day.id].active} onChange={(e) => setAvailability(prev => ({...prev, workDays: {...prev.workDays, [day.id]: {...prev.workDays[day.id], start: e.target.value}}}))} />
                                    <span>-</span>
                                    <Input type="time" className="w-32" value={availability.workDays[day.id].end} disabled={!availability.workDays[day.id].active} onChange={(e) => setAvailability(prev => ({...prev, workDays: {...prev.workDays, [day.id]: {...prev.workDays[day.id], end: e.target.value}}}))} />
                                </div>
                            </div>))}
                    </div>
                    <div className='space-y-2'><h3 className="font-semibold">{t('Calendrier.lunchBreak')}</h3>
                        <div className="flex items-center gap-2">
                            <Label>{t('Calendrier.from')}</Label>
                            <Input type="time" className="w-32" value={availability.breakTime.start} onChange={(e) => setAvailability(prev => ({...prev, breakTime: {...prev.breakTime, start: e.target.value}}))} />
                            <Label>{t('Calendrier.to')}</Label>
                            <Input type="time" className="w-32" value={availability.breakTime.end} onChange={(e) => setAvailability(prev => ({...prev, breakTime: {...prev.breakTime, end: e.target.value}}))} />
                        </div>
                    </div>
                     <div className='space-y-2'><h3 className="font-semibold">{t('Calendrier.unavailableDays')}</h3><p className="text-sm text-gray-500">{t('Calendrier.unavailableInfo')} {availability.unavailableDates.join(', ')}.</p></div>
                    <Button onClick={handleSaveAvailability} className="w-full">{t('Calendrier.saveButton')}</Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}