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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Sub Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-[#e5e2d9] shadow-sm overflow-x-auto flex items-center gap-2">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'guide'
              ? 'bg-[#262a2b] text-white shadow-sm'
              : 'text-[#786e67] hover:text-[#262a2b] hover:bg-[#fcfcfb]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#faa114]" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'pyq'
              ? 'bg-[#262a2b] text-white shadow-sm'
              : 'text-[#786e67] hover:text-[#262a2b] hover:bg-[#fcfcfb]'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-500" /> PYQ Vault (PDFs)
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'model'
              ? 'bg-[#262a2b] text-white shadow-sm'
              : 'text-[#786e67] hover:text-[#262a2b] hover:bg-[#fcfcfb]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-purple-500" /> 15 Model Papers
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'quiz'
              ? 'bg-[#262a2b] text-white shadow-sm'
              : 'text-[#786e67] hover:text-[#262a2b] hover:bg-[#fcfcfb]'
          }`}
        >
          <Brain className="w-4 h-4 text-[#faa114]" /> Quiz Engine (Full/Subject/Topic)
        </button>

        <button
          onClick={() => setSubTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'analytics'
              ? 'bg-[#262a2b] text-white shadow-sm'
              : 'text-[#786e67] hover:text-[#262a2b] hover:bg-[#fcfcfb]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-500" /> Candidate Analytics
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
