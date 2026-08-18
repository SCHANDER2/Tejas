'use client';

import React, { useState } from 'react';
import { GateBranchId, GATE_BRANCHES, GATE_BRANCH_SUBJECTS } from '../../data/gateData';
import { BarChart3, TrendingUp, Award, Zap, AlertTriangle, CheckCircle, Brain, Shield, Clock, ArrowRight, Target } from 'lucide-react';

interface GateAnalyticsProps {
  branchId: GateBranchId;
  onLaunchRemedialQuiz?: (subjectId: string) => void;
}

export default function GateAnalytics({ branchId, onLaunchRemedialQuiz }: GateAnalyticsProps) {
  const branch = GATE_BRANCHES.find(b => b.id === branchId) || GATE_BRANCHES[0];
  const subjects = GATE_BRANCH_SUBJECTS[branchId] || GATE_BRANCH_SUBJECTS.cs;

  // Mock calibrated student metrics
  const candidateStats = {
    totalMockAttempts: 8,
    avgScore: '64.5',
    highestScore: '78.0',
    gateScore: 742,
    predictedAir: '340 - 480',
    accuracy: '76.4%',
    qualifyingStatus: 'QUALIFIED (PSU Shortlist Eligible)',
    timePerQuestionAvg: '2.4 mins'
  };

  const subjectPerformance = subjects.map((sub, i) => {
    const accuracy = [84, 68, 92, 54, 76, 62][i % 6];
    const status = accuracy >= 80 ? 'Mastered' : accuracy >= 65 ? 'Moderate' : 'Needs Focus';
    return {
      id: sub.id,
      name: sub.shortName,
      totalMarks: sub.totalMarks,
      accuracy,
      status,
      attemptedCount: 40 + i * 15,
      weakTopic: sub.topics[0]?.name || 'Core Fundamentals'
    };
  });

  const psuCutoffs = [
    { name: 'ISRO Scientist / Engineer', minGateScore: 720, status: 'Eligible', color: 'text-emerald-400' },
    { name: 'BARC OCES / DGFS Training', minGateScore: 740, status: 'Eligible', color: 'text-emerald-400' },
    { name: 'IOCL Officer Trainee', minGateScore: 710, status: 'Eligible', color: 'text-emerald-400' },
    { name: 'ONGC Graduate Executive', minGateScore: 760, status: 'Borderline (Need +18)', color: 'text-amber-400' },
    { name: 'NTPC Engineering Executive', minGateScore: 680, status: 'Eligible', color: 'text-emerald-400' },
    { name: 'DRDO Scientist \'B\'', minGateScore: 700, status: 'Eligible', color: 'text-emerald-400' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BarChart3 className="w-3.5 h-3.5" /> Performance Calibration Radar
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {branch.fullName} Readiness & PSU Index
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time assessment calibration based on your mock attempts, sectional timing, accuracy, and GATE score normalization.
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-2xl flex items-center gap-3">
          <Award className="w-6 h-6 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Qualification Status</span>
            <p className="text-xs font-bold text-emerald-300">{candidateStats.qualifyingStatus}</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">Estimated GATE Score</span>
          <p className="text-3xl font-black text-amber-400 mt-1 font-mono">{candidateStats.gateScore} <span className="text-xs text-slate-500">/ 1000</span></p>
          <span className="text-[10px] text-emerald-400 mt-1 block">Top 1.2% Percentile</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">Predicted All-India Rank</span>
          <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-1 font-mono">AIR {candidateStats.predictedAir}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Calibrated to 1.4L candidates</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">Average Mock Score</span>
          <p className="text-3xl font-black text-emerald-400 mt-1 font-mono">{candidateStats.avgScore} <span className="text-xs text-slate-500">/ 100</span></p>
          <span className="text-[10px] text-slate-400 mt-1 block">Highest: {candidateStats.highestScore}</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">Average Accuracy</span>
          <p className="text-3xl font-black text-purple-400 mt-1 font-mono">{candidateStats.accuracy}</p>
          <span className="text-[10px] text-slate-400 mt-1 block">Avg Time: {candidateStats.timePerQuestionAvg}</span>
        </div>
      </div>

      {/* Subject Mastery Heatmap & Weak Area Diagnoser */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-400" /> Subject-by-Subject Mastery & Weakness Diagnoser
          </h3>
          <span className="text-xs text-slate-400">Target: Minimum 75% accuracy across every core topic</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectPerformance.map((sub) => (
            <div
              key={sub.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{sub.name}</h4>
                  <span className="text-[11px] text-slate-400">{sub.attemptedCount} Questions Attempted</span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  sub.status === 'Mastered'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : sub.status === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {sub.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Accuracy Rate:</span>
                  <span className="font-bold text-white">{sub.accuracy}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all ${
                      sub.accuracy >= 80 ? 'bg-emerald-500' : sub.accuracy >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${sub.accuracy}%` }}
                  />
                </div>
              </div>

              {/* Weak Topic Callout */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Remedial Focus:</span>
                <p className="text-xs text-slate-300 line-clamp-1">{sub.weakTopic}</p>
              </div>

              <button
                onClick={() => onLaunchRemedialQuiz ? onLaunchRemedialQuiz(sub.id) : alert(`Launching tailored practice for ${sub.name}`)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl transition border border-slate-700 flex items-center justify-center gap-1"
              >
                Launch Remedial Drill (10 Qs) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PSU Cutoff Compatibility Radar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" /> PSU Direct Recruitment Eligibility Radar
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Based on your calibrated GATE Score of {candidateStats.gateScore}/1000.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {psuCutoffs.map((psu, pIdx) => (
            <div key={pIdx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-white">{psu.name}</h4>
                <span className="text-[10px] text-slate-500 font-mono">Cutoff: ~{psu.minGateScore} Score</span>
              </div>
              <span className={`text-xs font-bold ${psu.color}`}>
                {psu.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
