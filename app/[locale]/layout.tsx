import type { Metadata } from 'next';
import { Cairo } from 'next/font/google'; // Vous pouvez garder la police
import './globals.css';
import { Toaster } from "sonner" // Gardez le Toaster si besoin
import { Providers } from '../providers';

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'LABO',
  description: 'Systeme Information de Laboratoire Analyse Medical',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={cairo.className}>
        <Providers> {/* Envelopper {children} */}
          {children}
        </Providers>
      </body>
    </html>
  );
}