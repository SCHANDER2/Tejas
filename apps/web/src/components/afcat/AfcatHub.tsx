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
      <div className="bg-white p-2 rounded-2xl border border-[#E5E2D9] shadow-sm overflow-x-auto flex items-center gap-2 no-scrollbar">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'guide'
              ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm'
              : 'text-[#66625D] hover:text-[#1A1D1E] hover:bg-[#F5F4F0]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#1A1D1E]" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'pyq'
              ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm'
              : 'text-[#66625D] hover:text-[#1A1D1E] hover:bg-[#F5F4F0]'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" /> PYQ Vault (PDFs)
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'model'
              ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm'
              : 'text-[#66625D] hover:text-[#1A1D1E] hover:bg-[#F5F4F0]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-purple-600" /> 15 Model Papers
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'quiz'
              ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm'
              : 'text-[#66625D] hover:text-[#1A1D1E] hover:bg-[#F5F4F0]'
          }`}
        >
          <Brain className="w-4 h-4 text-emerald-600" /> Quiz Engine (Full/Subject/Topic)
        </button>

        <button
          onClick={() => setSubTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'analytics'
              ? 'bg-[#FAA114] text-[#1A1D1E] shadow-sm'
              : 'text-[#66625D] hover:text-[#1A1D1E] hover:bg-[#F5F4F0]'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-indigo-600" /> Candidate Analytics
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
