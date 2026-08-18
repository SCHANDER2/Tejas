'use client';

import React, { useState } from 'react';
import { GateBranchId, GATE_BRANCHES } from '../../data/gateData';
import { generateQuestionsForGatePaper, generateSubjectQuestions } from '../../data/gatePaperGenerator';
import GateBranchSelector from './GateBranchSelector';
import GateGuide from './GateGuide';
import GatePyqVault from './GatePyqVault';
import GateModelPapers from './GateModelPapers';
import GateQuizEngine from './GateQuizEngine';
import GateAnalytics from './GateAnalytics';
import GateExamCbtWindow from './GateExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, Sparkles } from 'lucide-react';

export default function GateHub() {
  const [selectedBranchId, setSelectedBranchId] = useState<GateBranchId>('cs');
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model' | 'quiz' | 'analytics'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; questions: any[] } | null>(null);

  const activeBranch = GATE_BRANCHES.find(b => b.id === selectedBranchId) || GATE_BRANCHES[0];

  const handleStartCbtPaper = (title: string, yearOrType: string, customSubjectId?: string) => {
    let questions;
    if (customSubjectId) {
      questions = generateSubjectQuestions(customSubjectId, 20, selectedBranchId);
    } else {
      questions = generateQuestionsForGatePaper(`gate_${Date.now()}`, Math.floor(Math.random() * 100), selectedBranchId);
    }
    setActiveCbtPaper({ title, yearOrType, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Active CBT Window Modal */}
      {activeCbtPaper && (
        <GateExamCbtWindow
          paperTitle={activeCbtPaper.title}
          paperYearOrType={activeCbtPaper.yearOrType}
          questions={activeCbtPaper.questions}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-bold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> IISc & IIT GATE 2026 Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Graduate Aptitude Test in Engineering — {activeBranch.code}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
            Multi-branch master preparation portal for <strong>{activeBranch.fullName}</strong>. Practice with authentic 65-question CBT exams, subject-wise & topic-specific PYQ banks, 15 full mocks with complete step solutions, and real-time PSU qualification calibration.
          </p>
        </div>
      </div>

      {/* Engineering Stream Branch Selector */}
      <GateBranchSelector
        selectedBranchId={selectedBranchId}
        onSelectBranch={(branchId) => {
          setSelectedBranchId(branchId);
        }}
      />

      {/* 5-Pillar Navigation Bar - Google Colorography */}
      <div className="bg-white p-2 rounded-2xl border border-[#E8EAED] shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
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
          <FileText className="w-4 h-4" /> PYQ Vault (Full / Subject / Topic)
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'model'
              ? 'bg-[#34A853] text-white shadow-md shadow-green-500/25'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <FileCheck className="w-4 h-4" /> 15 Model Papers (CBT & Solutions)
        </button>

        <button
          onClick={() => setSubTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'quiz'
              ? 'bg-[#4285F4] text-white shadow-md shadow-blue-500/25'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <Brain className="w-4 h-4" /> Quiz Engine (Interactive Drills)
        </button>

        <button
          onClick={() => setSubTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            subTab === 'analytics'
              ? 'bg-[#FBBC04] text-[#202124] shadow-md shadow-amber-500/25 font-black'
              : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> GATE Score & PSU Calibration
        </button>
      </div>

      {/* Sub Tab Views */}
      <div>
        {subTab === 'guide' && (
          <GateGuide
            branchId={selectedBranchId}
            onStartFullMock={() => handleStartCbtPaper(`GATE ${activeBranch.code} Full Mock Exam`, "100-Mark Official Mock")}
          />
        )}
        {subTab === 'pyq' && (
          <GatePyqVault
            branchId={selectedBranchId}
            onStartCbtPaper={handleStartCbtPaper}
          />
        )}
        {subTab === 'model' && (
          <GateModelPapers
            branchId={selectedBranchId}
            onStartCbtPaper={handleStartCbtPaper}
          />
        )}
        {subTab === 'quiz' && (
          <GateQuizEngine
            branchId={selectedBranchId}
            onCompleteQuiz={() => setSubTab('analytics')}
          />
        )}
        {subTab === 'analytics' && (
          <GateAnalytics
            branchId={selectedBranchId}
            onLaunchRemedialQuiz={(subId) => {
              setSubTab('quiz');
            }}
          />
        )}
      </div>
    </div>
  );
}
