'use client';

import React from 'react';
import { GateBranchId, GATE_BRANCHES, GATE_BRANCH_SUBJECTS, GATE_EXAM_PATTERN } from '../../data/gateData';
import { BookOpen, Award, Shield, Play, ExternalLink, Calculator, Flame, CheckCircle, ArrowRight } from 'lucide-react';

interface GateGuideProps {
  branchId: GateBranchId;
  onStartFullMock: () => void;
}

export default function GateGuide({ branchId, onStartFullMock }: GateGuideProps) {
  const branch = GATE_BRANCHES.find(b => b.id === branchId) || GATE_BRANCHES[0];
  const subjects = GATE_BRANCH_SUBJECTS[branchId] || GATE_BRANCH_SUBJECTS.cs;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Pattern Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Official GATE Pattern (IISc & IITs)
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {branch.fullName} Structure
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              65 Total Questions • 100 Maximum Marks • 180 Minutes (3.0 Hours) • CBT Examination
            </p>
          </div>

          <button
            onClick={onStartFullMock}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            Launch Official 65-Q Mock <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Question Types & Marking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-blue-400 uppercase">1. Multiple Choice (MCQ)</span>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              1 correct option out of 4. Negative marking applies: <strong>-0.33 for 1-Mark</strong> and <strong>-0.66 for 2-Marks</strong>.
            </p>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-purple-400 uppercase">2. Multiple Select (MSQ)</span>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              1 or more correct options. <strong>NO negative marking</strong> and <strong>NO partial credit</strong> (must select all exact correct options).
            </p>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">3. Numerical Answer (NAT)</span>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Real decimal or integer entered using on-screen virtual keypad. <strong>NO negative marking</strong> with specified tolerance range.
            </p>
          </div>
        </div>

        {/* Section Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Section 1</span>
              <h4 className="font-bold text-base text-white">General Aptitude (GA)</h4>
              <p className="text-xs text-slate-400 mt-0.5">5 Qs × 1M + 5 Qs × 2M</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-amber-400 font-mono">15</span>
              <span className="text-xs text-slate-400 block font-medium">Marks (15%)</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Section 2</span>
              <h4 className="font-bold text-base text-white">Technical Core & Engg Maths</h4>
              <p className="text-xs text-slate-400 mt-0.5">25 Qs × 1M + 30 Qs × 2M</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-400 font-mono">85</span>
              <span className="text-xs text-slate-400 block font-medium">Marks (85%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Syllabus & Recommended Video Playlists */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" /> {branch.shortName} Syllabus & Video Lectures
            </h3>
            <p className="text-xs text-slate-400">Curated high-yield video lectures and concept modules for every core subject.</p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            {subjects.length} Core Subjects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">
                    {subject.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-bold">
                    {subject.totalMarks} Marks
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {subject.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Engineering Modules:</span>
                  <div className="space-y-2">
                    {subject.topics.map(topic => (
                      <div key={topic.id} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200">{topic.name}</span>
                          <span className="text-[10px] font-bold text-amber-400">{topic.weightage}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {topic.keyConcepts.slice(0, 3).map((concept, cIdx) => (
                            <span key={cIdx} className="text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                              ✓ {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {subject.youtubePlaylists && subject.youtubePlaylists.length > 0 && (
                <div className="bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-800/40 rounded-xl p-3.5 space-y-2.5 flex flex-col gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" /> Curated Lecture Playlists
                    </span>
                  </div>
                  {subject.youtubePlaylists.map((playlist, idx) => (
                    <div key={idx} className="space-y-2 border-b border-red-800/30 pb-3 last:border-0 last:pb-0">
                      <div>
                        <h5 className="font-bold text-xs text-white line-clamp-1 mt-0.5">{playlist.title}</h5>
                        <p className="text-[11px] text-slate-400">{playlist.channel} • {playlist.videoCount}</p>
                      </div>
                      <a
                        href={playlist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                      >
                        Watch Free Playlist <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
