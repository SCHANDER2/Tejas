'use client';

import React, { useState } from 'react';
import AfcatGuide from './AfcatGuide';
import AfcatPyqVault from './AfcatPyqVault';
import AfcatModelPapers from './AfcatModelPapers';
import AfcatQuizEngine from './AfcatQuizEngine';
import AfcatAnalytics from './AfcatAnalytics';
import { 
  BookOpen, 
  FileText, 
  FileCheck, 
  Brain, 
  BarChart3, 
  Shield, 
  Sparkles 
} from 'lucide-react';

export default function AfcatHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeInUp">
      {/* Sub Navigation Bar */}
      <div className="glass-panel p-2 rounded-2xl border border-white/10 shadow-lg overflow-x-auto flex items-center gap-2 no-scrollbar">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'guide'
              ? 'bg-amber-500 text-slate-950 shadow-glow-amber scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'pyq'
              ? 'bg-amber-500 text-slate-950 shadow-glow-amber scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" /> PYQ Vault (PDFs)
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'model'
              ? 'bg-amber-500 text-slate-950 shadow-glow-amber scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileCheck className="w-4 h-4" /> 15 Model Papers
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'quiz'
              ? 'bg-amber-500 text-slate-950 shadow-glow-amber scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Brain className="w-4 h-4" /> Quiz Engine (Full/Subject/Topic)
        </button>

        <button
          onClick={() => setSubTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'analytics'
              ? 'bg-amber-500 text-slate-950 shadow-glow-amber scale-[1.02]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Candidate Analytics
        </button>
      </div>

      {/* Sub Tab View Render */}
      <div>
        {subTab === 'guide' && <AfcatGuide />}
        {subTab === 'pyq' && <AfcatPyqVault />}
        {subTab === 'model' && <AfcatModelPapers onStartQuiz={() => setSubTab('quiz')} />}
        {subTab === 'quiz' && <AfcatQuizEngine onCompleteQuiz={() => setSubTab('analytics')} />}
        {subTab === 'analytics' && <AfcatAnalytics />}
      </div>
    </div>
  );
}
