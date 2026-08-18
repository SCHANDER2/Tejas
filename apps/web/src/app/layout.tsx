import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tejas — The AI-Powered Learning Operating System',
  description: 'Unifying competitive exams, university subjects, and document intelligence into one cohesive, personalized AI workspace for 500 million Indian learners.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#FAFAF8] text-[#1A1D1E] antialiased selection:bg-[#FAA114]/30 selection:text-[#1A1D1E] min-h-screen">
        {children}
      </body>
    </html>
  );
}
