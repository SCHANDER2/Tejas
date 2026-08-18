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
  BarChart3
} from 'lucide-react';

export default function AfcatHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeInUp">
      {/* Sub Navigation Bar - Google Colorography */}
      <div className="bg-white p-2 rounded-2xl border border-[#E8EAED] shadow-sm overflow-x-auto flex items-center gap-2 no-scrollbar">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'guide'
              ? 'bg-[#4285F4] text-white shadow-md shadow-blue-500/25'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'pyq'
              ? 'bg-[#EA4335] text-white shadow-md shadow-red-500/25'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <FileText className="w-4 h-4" /> PYQ Vault (PDFs)
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'model'
              ? 'bg-[#34A853] text-white shadow-md shadow-green-500/25'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <FileCheck className="w-4 h-4" /> 15 Model Papers
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'quiz'
              ? 'bg-[#4285F4] text-white shadow-md shadow-blue-500/25'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <Brain className="w-4 h-4" /> AI Practice Engine
        </button>

        <button
          onClick={() => setSubTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'analytics'
              ? 'bg-[#FBBC04] text-[#202124] shadow-md shadow-amber-500/25 font-black'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Candidate Analytics
        </button>
      </div>

      {/* Main Tab Render Container */}
      <div className="bg-white rounded-3xl border border-[#E8EAED] p-6 sm:p-8 shadow-sm">
        {subTab === 'guide' && <AfcatGuide />}
        {subTab === 'pyq' && <AfcatPyqVault />}
        {subTab === 'model' && <AfcatModelPapers />}
        {subTab === 'quiz' && <AfcatQuizEngine />}
        {subTab === 'analytics' && <AfcatAnalytics />}
      </div>
    </div>
  );
}
