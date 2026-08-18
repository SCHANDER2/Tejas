'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  ArrowRight,
  Shield
} from 'lucide-react';

interface AnalyticsRadarViewProps {
  onNavigateExam?: (examId: string) => void;
  targetExamId?: string;
}

export default function AnalyticsRadarView({
  onNavigateExam,
  targetExamId = 'afcat'
}: AnalyticsRadarViewProps) {
  const [activeMetric, setActiveMetric] = useState<'overview' | 'subjects' | 'speed'>('overview');

  const calibrationData = {
    examName: 'Air Force Common Admission Test (AFCAT 2026)',
    predictedScore: 232,
    maxScore: 300,
    targetCutoff: 155,
    airRank: 420,
    totalCandidates: '5,00,000+',
    percentile: 99.16,
    accuracy: 86.4,
    speedPerQuestion: '48 sec',
    qualificationStatus: 'HIGH PROBABILITY OF CLEARING EKT & AFSB CALL'
  };

  const subjectPerformance = [
    { subject: 'English Verbal Ability', score: '78 / 90', accuracy: 91, status: 'Strong Mastery', color: '#22C55E' },
    { subject: 'Numerical Ability', score: '48 / 60', accuracy: 80, status: 'Needs Speed Optimization', color: '#FAA114' },
    { subject: 'Reasoning & Military Aptitude', score: '63 / 75', accuracy: 88, status: 'Strong Mastery', color: '#22C55E' },
    { subject: 'General Awareness & Defence GK', score: '43 / 75', accuracy: 72, status: 'Weak Area Surgery Needed', color: '#EF4444' },
  ];

  const recentMockHistory = [
    { name: 'Official Model Paper #01', score: 204, percentile: 94.2, date: '10 Aug 2026' },
    { name: 'Official Model Paper #02', score: 216, percentile: 96.8, date: '12 Aug 2026' },
    { name: 'Official Model Paper #03', score: 228, percentile: 98.4, date: '15 Aug 2026' },
    { name: 'PYQ 2025 Shift 1 Full CBT', score: 232, percentile: 99.1, date: '17 Aug 2026' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="dark-container p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Candidate Calibration Radar
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              All-India Percentile & Rank Predictor
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time calibration based on over 2.4 million completed quizzes across India. Evaluates negative marking drag, subject-level percentile distributions, and SSB call cutoffs.
            </p>
          </div>

          <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-2xl text-center self-start md:self-auto shrink-0">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">VERDICT</div>
            <div className="text-sm font-black text-white font-display mt-0.5">QUALIFIED FOR AFSB</div>
          </div>
        </div>
      </div>

      {/* Main Scorecards KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="light-card p-6 rounded-3xl space-y-2 text-center">
          <span className="text-xs font-mono font-bold text-[#66625D] uppercase">Predicted Score</span>
          <div className="text-4xl font-black text-[#FAA114] font-display">
            {calibrationData.predictedScore} <span className="text-xs text-[#66625D] font-normal">/ {calibrationData.maxScore}</span>
          </div>
          <p className="text-xs text-emerald-600 font-bold">+{calibrationData.predictedScore - calibrationData.targetCutoff} Marks above cutoff</p>
        </div>

        <div className="light-card p-6 rounded-3xl space-y-2 text-center">
          <span className="text-xs font-mono font-bold text-[#66625D] uppercase">Predicted AIR Rank</span>
          <div className="text-4xl font-black text-blue-600 font-display">
            #{calibrationData.airRank}
          </div>
          <p className="text-xs text-[#66625D] font-mono">Top {calibrationData.percentile}%ile</p>
        </div>

        <div className="light-card p-6 rounded-3xl space-y-2 text-center">
          <span className="text-xs font-mono font-bold text-[#66625D] uppercase">Accuracy Rate</span>
          <div className="text-4xl font-black text-emerald-600 font-display">
            {calibrationData.accuracy}%
          </div>
          <p className="text-xs text-[#66625D]">Low negative marking penalty</p>
        </div>

        <div className="light-card p-6 rounded-3xl space-y-2 text-center">
          <span className="text-xs font-mono font-bold text-[#66625D] uppercase">Average Speed</span>
          <div className="text-4xl font-black text-[#1A1D1E] font-display">
            {calibrationData.speedPerQuestion}
          </div>
          <p className="text-xs text-[#66625D]">Optimal for 120-min paper</p>
        </div>
      </div>

      {/* Subject-Wise Mastery Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="light-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div>
            <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
              <Target className="w-5 h-5 text-[#FAA114]" /> Subject-Wise Percentile Breakdown
            </h3>
            <p className="text-xs text-[#66625D]">Accuracy and score distribution across the official 4 exam sections</p>
          </div>

          <div className="space-y-4">
            {subjectPerformance.map((sub, i) => (
              <div key={i} className="p-4 bg-[#F5F4F0] border border-[#E5E2D9] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1A1D1E]">{sub.subject}</span>
                  <span className="text-xs font-black font-mono text-[#1A1D1E]">{sub.score}</span>
                </div>

                <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${sub.accuracy}%`, backgroundColor: sub.color }} />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#66625D]">{sub.accuracy}% Accuracy</span>
                  <span className="font-bold" style={{ color: sub.color }}>{sub.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Test Score Trajectory */}
        <div className="light-card p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-[#1A1D1E] font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#22C55E]" /> Score Progression Trajectory
              </h3>
              <p className="text-xs text-[#66625D]">Performance trend across consecutive CBT full-length simulations</p>
            </div>

            <div className="space-y-3">
              {recentMockHistory.map((m, idx) => (
                <div key={idx} className="p-4 bg-[#F5F4F0] border border-[#E5E2D9] rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#1A1D1E]">{m.name}</h4>
                    <span className="text-[10px] text-[#66625D] font-mono">{m.date}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-[#FAA114] font-mono">{m.score} Marks</div>
                    <div className="text-[10px] text-emerald-600 font-bold">{m.percentile}%ile</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E2D9]">
            {onNavigateExam && (
              <button
                onClick={() => onNavigateExam(targetExamId)}
                className="w-full py-3 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>Attempt Next Full-Length CBT Paper →</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
