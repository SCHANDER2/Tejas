'use client';

import React, { useState } from 'react';
import { NDA_EXAM_PATTERN, NDA_SUBJECTS, NDA_PYQ_PAPERS, NDA_MODEL_PAPERS } from '../../data/ndaData';
import { generateQuestionsForNdaPaper } from '../../data/ndaPaperGenerator';
import NdaExamCbtWindow from './NdaExamCbtWindow';
import { BookOpen, FileText, FileCheck, Brain, BarChart3, Shield, Award, CheckCircle2 } from 'lucide-react';

export default function NdaHub() {
  const [subTab, setSubTab] = useState<'guide' | 'pyq' | 'model'>('guide');
  const [activeCbtPaper, setActiveCbtPaper] = useState<{ title: string; yearOrType: string; questions: any[] } | null>(null);

  const startCbtPaper = (title: string, yearOrType: string) => {
    const questions = generateQuestionsForNdaPaper(`nda_${Date.now()}`, Math.floor(Math.random() * 50));
    setActiveCbtPaper({ title, yearOrType, questions });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {activeCbtPaper && (
        <NdaExamCbtWindow
          paperTitle={activeCbtPaper.title}
          paperYearOrType={activeCbtPaper.yearOrType}
          questions={activeCbtPaper.questions}
          onClose={() => setActiveCbtPaper(null)}
        />
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white rounded-3xl p-8 border border-amber-600/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full text-xs font-bold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> UPSC NDA & NA Prep Engine 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            National Defence Academy & Naval Academy (NDA)
          </h1>
          <p className="text-sm text-amber-100/80 leading-relaxed">
            Master Paper 1 Mathematics (120 Qs / 300 Marks) and Paper 2 GAT (150 Qs / 600 Marks) with official 270-question 900-mark CBT simulations, 15 model papers, and SSB qualification analytics.
          </p>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-white p-2 rounded-2xl border border-[#e5e2d9] shadow-sm flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setSubTab('guide')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'guide' ? 'bg-[#262a2b] text-white shadow-sm' : 'text-[#786e67] hover:bg-[#fcfcfb]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#faa114]" /> Mentor Guide & Syllabus
        </button>

        <button
          onClick={() => setSubTab('pyq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'pyq' ? 'bg-[#262a2b] text-white shadow-sm' : 'text-[#786e67] hover:bg-[#fcfcfb]'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-500" /> PYQ Vault
        </button>

        <button
          onClick={() => setSubTab('model')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            subTab === 'model' ? 'bg-[#262a2b] text-white shadow-sm' : 'text-[#786e67] hover:bg-[#fcfcfb]'
          }`}
        >
          <FileCheck className="w-4 h-4 text-purple-500" /> 15 Model Papers (CBT)
        </button>
      </div>

      {/* Tab Contents */}
      {subTab === 'guide' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" /> Official 270-Question 900-Mark Pattern
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-900 text-sm">Paper 1: Mathematics</h4>
                <p className="text-amber-800 mt-1">120 Questions • 300 Marks • 2.5 Hours</p>
                <p className="text-amber-700 font-medium mt-1">Marking: +2.5 / -0.833 Marks</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm">Paper 2: GAT (English & Science/GK)</h4>
                <p className="text-blue-800 mt-1">150 Questions • 600 Marks • 2.5 Hours</p>
                <p className="text-blue-700 font-medium mt-1">Marking: +4.0 / -1.333 Marks</p>
              </div>
            </div>
            <button
              onClick={() => startCbtPaper("NDA Full Mock Paper 2026", "900-Mark Standard Mock")}
              className="w-full py-3 bg-[#003366] hover:bg-blue-900 text-white rounded-xl font-bold text-xs transition"
            >
              Launch Full 270-Question NDA CBT Mock Window
            </button>
          </div>

          {/* NDA Subject Syllabi & YouTube Playlists */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" /> Subject Syllabus & Recommended Video Playlists
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {NDA_SUBJECTS.map((subject) => (
                <div key={subject.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{subject.paperName}</span>
                      <span className="text-xs text-gray-500 font-mono">{subject.totalQs} Qs • {subject.totalMarks}M</span>
                    </div>
                    <h4 className="font-bold text-base text-gray-900">{subject.name}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{subject.description}</p>
                    
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">High-Yield Modules:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {subject.topics.map(topic => (
                          <span key={topic.id} className="text-[11px] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md text-gray-700 font-medium">
                            {topic.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {subject.youtubePlaylist && (
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-3.5 space-y-2">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-red-600">📺 Curated Video Playlist</div>
                        <div className="font-bold text-xs text-gray-900 line-clamp-1">{subject.youtubePlaylist.title}</div>
                        <div className="text-[11px] text-gray-600">{subject.youtubePlaylist.channel} • {subject.youtubePlaylist.videoCount}</div>
                      </div>
                      <a
                        href={subject.youtubePlaylist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                      >
                        Watch Free Playlist ↗
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'pyq' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NDA_PYQ_PAPERS.map(pyq => (
            <div key={pyq.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-gray-900">{pyq.shift}</h4>
                <p className="text-xs text-gray-500">{pyq.totalQs} Questions • {pyq.totalMarks} Marks</p>
              </div>
              <button
                onClick={() => startCbtPaper(pyq.shift, `Year ${pyq.year}`)}
                className="px-4 py-2 bg-[#003366] hover:bg-blue-900 text-white rounded-xl font-bold text-xs transition"
              >
                Attempt CBT
              </button>
            </div>
          ))}
        </div>
      )}

      {subTab === 'model' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {NDA_MODEL_PAPERS.map(paper => (
            <div key={paper.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <h4 className="font-bold text-sm text-gray-900">{paper.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{paper.description}</p>
              </div>
              <button
                onClick={() => startCbtPaper(paper.title, `Model #${paper.paperNumber}`)}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs transition"
              >
                Attempt CBT Window
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
