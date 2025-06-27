'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, BrainCircuit, Mic, Bot } from 'lucide-react';
import { StreamingBotMessage } from './streaming-bot-message'; // Importez le nouveau composant

import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils'; // Assurez-vous d'avoir ce helper de Shadcn

// --- Types et Props ---
type ChatMessage = {
    id: number;
    sender: 'user' | 'bot' | 'thinking';
    content: string;
};

interface ChatbotWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- Moteur de Réponse de l'IA (le "cerveau") ---
const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Règle 1: Génération de rapport
    if (lowerInput.includes('rapport') && lowerInput.match(/pat-\d+/)) {
        const patientId = lowerInput.match(/pat-\d+/)?.[0].toUpperCase();
        return `**Rapport pour ${patientId}**

**Patient :** ${patientId}
**Date :** ${new Date().toLocaleDateString('fr-FR')}

**Contexte Clinique :** Bilan de routine.

**Résultats Notables :**
- **Hémoglobine :** 11.2 g/dL (Légèrement bas)
- **Leucocytes :** 12,500 /mm³ (Élevé)
- **Créatinine :** 1.3 mg/dL (Élevé)

**Interprétation :**
Le tableau biologique suggère un syndrome inflammatoire (hyperleucocytose) associé à une anémie modérée et une insuffisance rénale débutante.

**Recommandations :**
1. Corréler ces résultats avec le contexte clinique du patient.
2. Suggérer un suivi de la fonction rénale.
3. Envisager une consultation néphrologique si les valeurs se confirment.`;
    }

    // Règle 2: Interprétation
    if (lowerInput.includes('interprète') || lowerInput.includes('analyse')) {
        return `**Analyse d'Interprétation**

Pour vous fournir une interprétation précise, veuillez me donner les informations suivantes :
1. **L'ID du patient**
2. **Le(s) paramètre(s) en question** (ex: NFS, ionogramme)
3. **Les résultats numériques** avec leurs unités.

Je pourrai alors comparer aux valeurs de référence et mettre en évidence les anomalies potentielles.`;
    }

    // Règle 3: Consultation fictive
    if (lowerInput.includes('consultation')) {
        return `**Simulation de Consultation**

**Objectif :** Expliquer des résultats au patient ${lowerInput.match(/pat-\d+/)?.[0].toUpperCase() || '(ID non spécifié)'}.

**Plan de discussion :**
1. **Introduction :** "Bonjour, nous allons passer en revue les résultats de votre dernière prise de sang."
2. **Points Simples :** "La plupart de vos résultats sont dans les normes, ce qui est une bonne nouvelle."
3. **Aborder les Anomalies (avec simplicité) :** "Nous avons noté que votre taux de globules blancs est un peu élevé. Cela indique que votre corps combat une petite inflammation, comme un rhume."
4. **Recommandations :** "Je recommande un simple contrôle dans quelques semaines pour s'assurer que tout rentre dans l'ordre."
5. **Conclusion :** "Avez-vous des questions ?"`;
    }
    
    // Règle 4: Information patient
    if (lowerInput.includes('patient') && lowerInput.match(/pat-\d+/)) {
        const patientId = lowerInput.match(/pat-\d+/)?.[0].toUpperCase();
        return `**Dossier Patient : ${patientId}**

- **Dernier Prélèvement :** Il y a 3 jours (NFS, Ionogramme).
- **Antécédents Notables (fictifs) :** HTA, Diabète de type 2.
- **Dernier Rapport Validé :** Il y a 3 jours, signé par vous-même.
- **Action suggérée :** Comparer les résultats actuels avec l'historique pour évaluer l'évolution.`;
    }

    // Règle 5: Salutations
    if (lowerInput.startsWith('bonjour') || lowerInput.startsWith('salut')) {
        return "Bonjour Docteur. Comment puis-je vous assister aujourd'hui ?";
    }

    // Réponse par défaut
    return "Je suis à votre service. Vous pouvez me demander de générer un rapport, d'interpréter des résultats, ou de résumer l'historique d'un patient.";
};

// --- Composant ---
export function ChatbotWindow({ isOpen, onClose }: ChatbotWindowProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isBotProcessing, setIsBotProcessing] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Effet pour initialiser le message de bienvenue
    useEffect(() => {
        if(isOpen && messages.length === 0) {
            setMessages([{ id: Date.now(), sender: 'bot', content: "Bonjour Docteur. Je suis LaboAssist, votre assistant IA. Comment puis-je vous aider ?" }]);
        }
    }, [isOpen]);

    // Effet pour scroller vers le bas à chaque nouveau message
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        // On pourrait déclencher l'envoi directement, mais laisser l'utilisateur valider est souvent une meilleure UX
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isBotProcessing) return;

        const userMessage: ChatMessage = { id: Date.now(), sender: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsBotProcessing(true);

        // 1. Phase de Réflexion
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'thinking', content: '' }]);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simule la réflexion
        
        // 2. Supprime le message de réflexion et prépare la réponse
        const botResponse = getBotResponse(userMessage.content);
        setMessages(prev => {
            const filtered = prev.filter(m => m.sender !== 'thinking');
            return [...filtered, { id: Date.now() + 2, sender: 'bot', content: botResponse }];
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-[440px] h-[70vh] max-h-[700px] flex flex-col bg-card border rounded-lg shadow-2xl z-50 animate-in slide-in-from-bottom-10 fade-in-50 duration-300">
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Bot className="h-6 w-6 text-primary" />
                        <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-card" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold">LaboAssist</h2>
                        <p className="text-xs text-muted-foreground">Votre assistant médical IA</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fermer le chat">
                    <X className="h-4 w-4" />
                </Button>
            </header>

            <main className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-6">
                        {messages.map((message) => {
                            if (message.sender === 'user') {
                                return (
                                    <div key={message.id} className="flex justify-end">
                                        <p className="max-w-[85%] bg-primary text-primary-foreground p-3 rounded-lg rounded-br-none text-sm">
                                            {message.content}
                                        </p>
                                    </div>
                                );
                            }
                            if (message.sender === 'thinking') {
                                return (
                                    <div key={message.id} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <BrainCircuit className="h-5 w-5 text-primary animate-pulse" />
                                        </div>
                                        <p className="text-sm text-muted-foreground italic mt-2">Réflexion en cours...</p>
                                    </div>
                                );
                            }
                            // Message du Bot
                            return <StreamingBotMessage key={message.id} content={message.content} onStreamComplete={() => setIsBotProcessing(false)} />;
                        })}
                         {/* Affiche les suggestions seulement si le bot n'est pas en train de répondre */}
                         {!isBotProcessing && messages.length < 3 && (
                            <div className="p-2 space-y-2">
                                <p className="text-xs text-center text-muted-foreground">Suggestions</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" size="sm" className="h-auto py-2 text-xs" onClick={() => handleSuggestionClick("Génère un rapport pour PAT-10172")}>Rapport pour PAT-10172</Button>
                                    <Button variant="outline" size="sm" className="h-auto py-2 text-xs" onClick={() => handleSuggestionClick("Propose une interprétation pour une NFS")}>Interpréter une NFS</Button>
                                    <Button variant="outline" size="sm" className="h-auto py-2 text-xs" onClick={() => handleSuggestionClick("Historique du patient PAT-10290")}>Historique de PAT-10290</Button>
                                    <Button variant="outline" size="sm" className="h-auto py-2 text-xs" onClick={() => handleSuggestionClick("Aide-moi pour une consultation")}>Aide à la consultation</Button>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </main>

            <footer className="p-4 border-t bg-background">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                    <Input 
                        placeholder="Posez votre question à LaboAssist..." 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isBotProcessing}
                        className="flex-grow"
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon" disabled={isBotProcessing || !inputValue.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </footer>
        </div>
    );
}