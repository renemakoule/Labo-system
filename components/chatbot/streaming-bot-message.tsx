'use client';

import { Bot } from "lucide-react";
import { useEffect, useState } from "react";

interface StreamingBotMessageProps {
  content: string;
  onStreamComplete: () => void;
}

export function StreamingBotMessage({ content, onStreamComplete }: StreamingBotMessageProps) {
  const [displayedContent, setDisplayedContent] = useState("");
  const words = content.split(' ');

  useEffect(() => {
    // Si le contenu est vide, on termine tout de suite
    if (words.length === 0 || words[0] === '') {
      onStreamComplete();
      return;
    }

    setDisplayedContent(""); // Réinitialiser le contenu affiché au début
    let wordIndex = 0;

    const intervalId = setInterval(() => {
      if (wordIndex < words.length) {
        setDisplayedContent((prev) => prev + (wordIndex > 0 ? " " : "") + words[wordIndex]);
        wordIndex++;
      } else {
        clearInterval(intervalId);
        onStreamComplete();
      }
    }, 100); // Vitesse de streaming (en ms par mot)

    return () => clearInterval(intervalId); // Nettoyage de l'intervalle
  }, [content]); // Se déclenche à chaque nouveau contenu

  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot className="h-5 w-5 text-primary" />
      </div>
      <div className="bg-muted p-3 rounded-lg rounded-tl-none">
        <p className="text-sm text-foreground leading-relaxed">
          {displayedContent}
          {/* Curseur clignotant pendant la frappe */}
          {displayedContent.length !== content.length && (
            <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}