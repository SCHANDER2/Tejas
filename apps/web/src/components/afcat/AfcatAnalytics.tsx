'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Zap, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  Shield, 
  Clock, 
  Brain,
  Sparkles,
  Flame
} from 'lucide-react';
import { AFCAT_SUBJECTS } from '../../data/afcatData';

export default function AfcatAnalytics() {
  // Candidate Mock Analytics Data
  const overallAccuracy = 74;
  const averageScore = 168; // Out of 300
  const expectedCutoff = 158;
  const totalQuizzesTaken = 14;
  const totalTimeSpentHours = 26.5;

  const subjectPerformance = [
    { name: 'Verbal Ability (English)', accuracy: 82, status: 'Strong', color: 'emerald' },
    { name: 'Numerical Ability (Maths)', accuracy: 64, status: 'Needs Improvement', color: 'amber' },
    { name: 'Reasoning & Aptitude', accuracy: 88, status: 'Mastered', color: 'emerald' },
    { name: 'General Awareness & GA', accuracy: 62, status: 'Needs Revision', color: 'rose' },
  ];

  const weakTopics = [
    { name: 'Time & Work / Pipes & Cisterns', subject: 'Numerical Ability', accuracy: 48, recommend: 'Watch Defence Wallah Time & Work Video #4' },
    { name: 'Defence Commands & Joint Exercises', subject: 'General Awareness', accuracy: 52, recommend: 'Revise 2024-2025 Bilateral Military Exercises PDF' },
    { name: 'Synonyms & Antonyms', subject: 'Verbal Ability', accuracy: 58, recommend: 'Review FSRS Spaced Repetition Flashcards' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Analytics Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1c2226] via-[#262a2b] to-[#343a40] text-white p-8 shadow-xl border border-white/10">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faa114]/20 border border-[#faa114]/30 text-[#faa114] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Candidate Mastery Intelligence
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Outfit' }}>
              AFCAT Candidate Performance Report
            </h2>
            <p className="text-white/70 text-sm max-w-2xl">
              Continuous monitoring of accuracy, speed index, subject weightages, and weak area alerts to maximize your selection probability.
            </p>
          </div>

          <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-center shrink-0">
            <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">AFCAT Cutoff Status</div>
            <div className="text-2xl font-bold text-white mt-1">168 / 300 Marks</div>
            <div className="text-xs text-emerald-400 font-semibold mt-0.5">✓ Safe Zone (+10 above cutoff)</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#e5e2d9] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#786e67] font-medium mb-1">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-[#faa114]" />
          </div>
          <div className="text-2xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>{overallAccuracy}%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">↑ +4% this week</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e5e2d9] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#786e67] font-medium mb-1">
            <span>Quizzes Attempted</span>
            <Award className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>{totalQuizzesTaken} Tests</div>
          <div className="text-xs text-[#786e67] font-medium mt-1">Full + Subject Mocks</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e5e2d9] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#786e67] font-medium mb-1">
            <span>Avg Speed / Question</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>54 Secs</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Optimal Pace</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#e5e2d9] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#786e67] font-medium mb-1">
            <span>Study Hours Logged</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>{totalTimeSpentHours} Hours</div>
          <div className="text-xs text-[#786e67] font-medium mt-1">Active AFCAT prep</div>
        </div>
      </div>

      {/* Subject-Wise Accuracy Bars */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e5e2d9] shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>
          Subject Mastery Matrix
        </h3>

        <div className="space-y-5">
          {subjectPerformance.map((sub, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-[#262a2b]">{sub.name}</span>
                <span className="font-bold text-[#262a2b]">{sub.accuracy}% Accuracy</span>
              </div>
              <div className="h-3 w-full bg-[#fcfcfb] rounded-full border border-[#e5e2d9] overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    sub.accuracy >= 80 ? 'bg-emerald-500' : sub.accuracy >= 65 ? 'bg-[#faa114]' : 'bg-rose-500'
                  }`}
                  style={{ width: `${sub.accuracy}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Area Detection & AI Mentor Recommendations */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#e5e2d9] shadow-sm space-y-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <h3 className="text-xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>
            Weak Area Alerts & Action Plan
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weakTopics.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#fcfcfb] border border-[#e5e2d9] space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-sm text-[#262a2b]">{item.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                  {item.accuracy}% Acc
                </span>
              </div>
              <p className="text-xs text-[#786e67]">Subject: {item.subject}</p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-snug">
                <strong>Mentor Suggestion:</strong> {item.recommend}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
