// apps/sil-internal/app/public/salle-attente/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Users, Clock, TrendingUp, Bell, X, BarChart2 } from 'lucide-react';

// --- Simulation de données ---
type CalledPatient = { ticket: string; box: string; };
const INITIAL_QUEUE: string[] = ['P-0124', 'P-0125', 'P-0126', 'P-0127', 'P-0128', 'P-0129', 'P-0130', 'P-0131', 'P-0132', 'P-0133'];
const INITIAL_CALLED: CalledPatient[] = [
  { ticket: 'P-0123', box: 'BOX 03' },
  { ticket: 'P-0121', box: 'BOX 01' },
];
const NOTIFICATIONS = [
  { id: 1, message: "Le Box 2 est maintenant disponible.", type: 'info', time: 'il y a 2 min' },
  { id: 2, message: "Pause technique prévue à 11h00.", type: 'warning', time: 'il y a 5 min' },
  { id: 3, message: "Merci de préparer votre carte vitale et ordonnance.", type: 'info', time: 'il y a 15 min' },
];

// MOCK: Graphique d'affluence compact
function AffluenceChartMock() {
  return (
    <div className="w-full flex-1 bg-blue-50/50 border border-slate-200/80 rounded-xl flex flex-col p-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
        <BarChart2 size={16} />
        <span>Affluence</span>
      </div>
      <div className="w-full flex-1 flex items-end justify-between gap-1.5">
        {[40, 60, 80, 70, 90, 65, 50, 45, 60].map((height, i) => (
          <div key={i} className="flex-1 bg-blue-200 rounded-t-sm" style={{ height: `${height}%` }}></div>
        ))}
      </div>
    </div>
  );
}

// --- Composant Carte principal pour la structure ---
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-slate-200/80 flex flex-col overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function WaitingRoomPage() {
  const [queue, setQueue] = useState<string[]>(INITIAL_QUEUE);
  const [called, setCalled] = useState<CalledPatient[]>(INITIAL_CALLED);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mise à jour de l'heure
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulation de l'appel des patients avec correction du bug de clé dupliquée
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prevQueue => {
        if (prevQueue.length === 0) {
            return INITIAL_QUEUE; // Réinitialise la file si elle est vide
        }

        const nextPatientToCall = prevQueue[0];
        const newQueue = prevQueue.slice(1);
        const boxNumber = Math.floor(Math.random() * 5) + 1;
        const newCall: CalledPatient = { ticket: nextPatientToCall, box: `BOX 0${boxNumber}` };

        // ** CORRECTION APPLIQUÉE ICI **
        // Garantit qu'il n'y a jamais de ticket dupliqué dans la liste "appelés"
        setCalled(prevCalled => {
          const filteredList = prevCalled.filter(
            (patient) => patient.ticket !== newCall.ticket
          );
          return [newCall, ...filteredList].slice(0, 5);
        });
        
        return newQueue;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { label: "En attente", value: queue.length, icon: Users, color: "text-teal-600 bg-teal-50" },
    { label: "Attente moy.", value: "06:12", icon: Clock, color: "text-blue-600 bg-blue-50" },
    { label: "Appelés", value: called.length, icon: TrendingUp, color: "text-slate-500 bg-slate-100" },
  ];

  return (
    // Structure globale : flex vertical qui occupe tout l'écran, sans scroll
    <div className="h-screen w-screen flex flex-col p-4 md:p-6 font-sans bg-slate-100 text-slate-800 overflow-hidden">
      
      {/* ===== Entête ===== */}
      <header className="flex justify-between items-center pb-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Assurez-vous que le chemin vers votre logo est correct */}
          <img src="/logo-dark.svg" alt="Logo Laboratoire" className="h-9" />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-700">SALLE D'ATTENTE</h1>
        </div>
        <div className="text-3xl md:text-4xl font-mono font-semibold text-slate-900">
          {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </header>

      {/* ===== Corps principal : Grid flexible pour s'adapter à l'espace restant ===== */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 pt-4 overflow-hidden">
        
        {/* Colonne "Appelés" (plus large) */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-blue-600 border-b border-slate-200 p-4 flex-shrink-0">DERNIERS APPELS</h2>
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <AnimatePresence>
              {called.map((patient, index) => (
                <motion.div
                  key={patient.ticket}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className={`p-3 rounded-lg flex justify-between items-center font-bold transition-all duration-500
                    ${index === 0 ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-100 text-slate-500'}`}
                >
                  <span className="text-3xl lg:text-4xl tracking-wider">{patient.ticket}</span>
                  <span className={`text-xl lg:text-2xl px-3 py-1 rounded-md ${index === 0 ? 'bg-white text-blue-600' : 'text-slate-400'}`}>
                    {patient.box}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Colonne "En Attente" (plus large) */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold text-teal-600 border-b border-slate-200 p-4 flex-shrink-0">PROCHAINS NUMÉROS</h2>
          <div className="flex-1 p-4 grid grid-cols-2 grid-rows-5 gap-3 text-2xl lg:text-3xl font-semibold text-slate-500">
            <AnimatePresence>
              {queue.slice(0, 10).map((ticket) => (
                <motion.div
                  key={ticket}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  className="bg-slate-100/80 border border-slate-200/90 rounded-lg flex items-center justify-center"
                >
                  {ticket}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Colonne de droite (KPIs + Graphique) */}
        <div className="lg:col-span-1 flex flex-col gap-4 lg:gap-6">
          {/* KPIs */}
          <div className="flex flex-row lg:flex-col gap-3">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="flex-1 flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-3">
                <div className={`p-2.5 rounded-full ${kpi.color}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">{kpi.value}</div>
                  <div className="text-xs text-slate-500">{kpi.label}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Graphique */}
          <AffluenceChartMock />
        </div>

      </main>

      {/* ===== Pied de page ===== */}
      <footer className="pt-4 mt-2 border-t border-slate-200 text-center text-base text-slate-500 flex items-center justify-center gap-2 flex-shrink-0">
        <Volume2 size={18} />
        <span>Veuillez prêter attention à l'appel de votre numéro.</span>
      </footer>

      {/* Pop-up de notifications (géré séparément pour être au-dessus de tout) */}
      <div className="absolute top-20 right-6 z-50">
        <AnimatePresence>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-80 bg-white border border-slate-200 rounded-xl shadow-lg"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                  <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                <ul className="space-y-3">
                  {NOTIFICATIONS.map((n) => (
                    <li key={n.id} className="flex items-start gap-3 text-sm">
                      <Bell className={`mt-0.5 h-4 w-4 shrink-0 ${n.type === 'warning' ? 'text-amber-500' : 'text-blue-500'}`} />
                      <div>
                        <p className="text-slate-700">{n.message}</p>
                        <p className="text-xs text-slate-400">{n.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}