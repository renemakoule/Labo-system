'use client';

import { Bot, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ChatbotFabProps {
    isOpen: boolean;
    onToggle: () => void;
}

export function ChatbotFab({ isOpen, onToggle }: ChatbotFabProps) {
    return (
        <Button
            onClick={onToggle}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 bg-blue-500"
            aria-label={isOpen ? "Fermer l'assistant IA" : "Ouvrir l'assistant IA"}
        >
            {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
    );
}