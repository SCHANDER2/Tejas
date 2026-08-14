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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#080a0f] text-[#f1f5f9] antialiased selection:bg-amber-500/30 selection:text-amber-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
