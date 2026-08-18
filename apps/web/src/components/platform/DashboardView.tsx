'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Target, 
  Flame, 
  Award, 
  CheckCircle, 
  Clock, 
  Play, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Shield, 
  Zap, 
  RotateCcw,
  AlertCircle
} from 'lucide-react';

interface DashboardViewProps {
  onNavigateExam: (examId: string) => void;
  onNavigateTab: (tabId: string) => void;
  candidateName?: string;
  targetExamId?: string;
}

export default function DashboardView({
  onNavigateExam,
  onNavigateTab,
  candidateName = 'Priya Sharma',
  targetExamId = 'afcat'
}: DashboardViewProps) {
  const [activeStreak, setActiveStreak] = useState(14);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(120);
  const [completedMinutesToday, setCompletedMinutesToday] = useState(75);

  const examDetails: Record<string, { name: string; date: string; daysLeft: number; readiness: number; color: string; badge: string }> = {
    afcat: { name: 'AFCAT 2026 (Air Force)', date: '24 Aug 2026', daysLeft: 6, readiness: 88, color: '#FAA114', badge: 'AIR FORCE' },
    gate: { name: 'GATE 2026 (Engineering)', date: '07 Feb 2027', daysLeft: 173, readiness: 74, color: '#6366F1', badge: 'IISc / IIT' },
    cds: { name: 'UPSC CDS (IMA/OTA)', date: '01 Sep 2026', daysLeft: 14, readiness: 82, color: '#22C55E', badge: 'DEFENCE' },
    nda: { name: 'UPSC NDA & NA', date: '01 Sep 2026', daysLeft: 14, readiness: 79, color: '#FAA114', badge: 'DEFENCE' },
    jee_mains: { name: 'JEE Main 2027', date: '22 Jan 2027', daysLeft: 157, readiness: 85, color: '#3B82F6', badge: 'NTA IIT' },
    neet: { name: 'NEET UG 2027', date: '04 May 2027', daysLeft: 259, readiness: 91, color: '#22C55E', badge: 'MEDICAL' },
    upsc: { name: 'UPSC CSE 2027', date: '24 May 2027', daysLeft: 279, readiness: 68, color: '#A855F7', badge: 'CIVIL' },
    ssc_cgl: { name: 'SSC CGL Tier 1', date: '15 Sep 2026', daysLeft: 28, readiness: 84, color: '#F97316', badge: 'GOVT' },
    cat: { name: 'CAT 2026 (IIMs)', date: '29 Nov 2026', daysLeft: 103, readiness: 76, color: '#EC4899', badge: 'MANAGEMENT' }
  };

  const currentExam = examDetails[targetExamId] || examDetails.afcat;

  const recentAttempts = [
    { title: 'AFCAT Full Mock #03', score: '228/300', accuracy: '86%', date: 'Yesterday, 8:30 PM', verdict: 'Qualified', color: '#22C55E' },
    { title: 'GATE CS Data Structures Practice', score: '38/45', accuracy: '84%', date: '16 Aug 2026', verdict: 'Top 5%ile', color: '#6366F1' },
    { title: 'CDS GK & Defence Current Affairs', score: '68/100', accuracy: '78%', date: '14 Aug 2026', verdict: 'SSB Ready', color: '#FAA114' },
  ];

  const dailyTasks = [
    { task: 'Solve 20 Numerical Ability PYQs', duration: '30m', completed: true, exam: 'AFCAT' },
    { task: 'Review 15 FSRS Spaced Recall Flashcards', duration: '15m', completed: true, exam: 'General' },
    { task: 'Complete AFCAT Full CBT Mock Test #04', duration: '120m', completed: false, exam: 'AFCAT' },
    { task: 'Read Indian Polity Constitutional Amendments PDF', duration: '45m', completed: false, exam: 'CDS / UPSC' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Welcome Header */}
      <div className="dark-container p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Bharat Aspirant Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Welcome back, {candidateName} 🇮🇳
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Targeting <strong>{currentExam.name}</strong> ({currentExam.date}). You are <span className="text-[#FAA114] font-bold">{currentExam.daysLeft} days away</span> from exam day with a calibrated readiness of <strong className="text-emerald-400">{currentExam.readiness}%</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center">
              <div className="flex items-center justify-center gap-1 text-[#FAA114] font-black text-xl font-display">
                <Flame className="w-5 h-5 fill-[#FAA114]" /> {activeStreak}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Day Streak</div>
            </div>

            <button
              onClick={() => onNavigateExam(targetExamId)}
              className="px-5 py-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-[#1A1D1E]" />
              <span>Launch {currentExam.badge} CBT</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="light-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-[#66625D]">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Today&apos;s Study Time</span>
            <Clock className="w-4 h-4 text-[#FAA114]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1A1D1E] font-display">{completedMinutesToday}m</span>
            <span className="text-xs text-[#66625D] font-mono">/ {dailyGoalMinutes}m goal</span>
          </div>
          <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#FAA114] h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, Math.round((completedMinutesToday / dailyGoalMinutes) * 100))}%` }}
            />
          </div>
        </div>

        <div className="light-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-[#66625D]">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Overall Readiness</span>
            <Award className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#22C55E] font-display">{currentExam.readiness}%</span>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Above Cutoff
            </span>
          </div>
          <p className="text-[11px] text-[#66625D]">Predicted All India Rank: Top 1.2%ile</p>
        </div>

        <div className="light-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-[#66625D]">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">FSRS Memory Cards</span>
            <RotateCcw className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1A1D1E] font-display">18</span>
            <span className="text-xs text-[#66625D]">Cards Due Today</span>
          </div>
          <button 
            onClick={() => onNavigateTab('revision')}
            className="text-[11px] font-bold text-[#3B82F6] hover:underline flex items-center gap-1"
          >
            Review Spaced Cards →
          </button>
        </div>

        <div className="light-card p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-[#66625D]">
            <span className="text-xs font-bold uppercase tracking-wider font-mono">Countdown Target</span>
            <Calendar className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#1A1D1E] font-display">{currentExam.daysLeft}</span>
            <span className="text-xs text-[#66625D]">Days Left</span>
          </div>
          <p className="text-[11px] text-[#66625D]">{currentExam.name} on {currentExam.date}</p>
        </div>
      </div>

      {/* Main 2-Column Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Daily Plan & Recent Attempts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Schedule */}
          <div className="light-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#1A1D1E] font-display flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FAA114]" /> Daily Adaptive Study Targets
                </h3>
                <p className="text-xs text-[#66625D]">Dynamic schedule balanced for {currentExam.daysLeft} days remaining</p>
              </div>
              <button 
                onClick={() => onNavigateTab('planner')}
                className="text-xs font-bold text-[#FAA114] hover:underline"
              >
                Full Timetable →
              </button>
            </div>

            <div className="space-y-2.5">
              {dailyTasks.map((t, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    t.completed 
                      ? 'bg-[#F0FDF4] border-emerald-200 text-[#1A1D1E]' 
                      : 'bg-white border-[#E5E2D9] text-[#1A1D1E]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center ${t.completed ? 'bg-emerald-600 text-white' : 'border border-[#94A3B8]'}`}>
                      {t.completed && <CheckCircle className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <span className={`text-xs font-semibold ${t.completed ? 'line-through text-[#66625D]' : 'text-[#1A1D1E]'}`}>
                        {t.task}
                      </span>
                      <span className="ml-2 text-[10px] font-mono px-2 py-0.5 bg-[#FAF3E6] text-[#C88410] rounded border border-[#E8D5B7]">
                        {t.exam}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#66625D]">{t.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mock Attempts */}
          <div className="light-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#1A1D1E] font-display flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#FAA114]" /> Recent CBT Mock Attempts
                </h3>
                <p className="text-xs text-[#66625D]">Verified CDAC / NTA simulation test logs</p>
              </div>
              <button 
                onClick={() => onNavigateTab('analytics')}
                className="text-xs font-bold text-[#FAA114] hover:underline"
              >
                View Analytics →
              </button>
            </div>

            <div className="space-y-3">
              {recentAttempts.map((att, i) => (
                <div key={i} className="p-4 bg-[#F5F4F0] rounded-2xl border border-[#E5E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1A1D1E]">{att.title}</h4>
                    <span className="text-[11px] text-[#66625D]">{att.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-black text-[#1A1D1E] font-mono">{att.score}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">{att.accuracy} Acc</div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {att.verdict}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Exam Switcher & Platform Tools */}
        <div className="space-y-6">
          <div className="light-card p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-base text-[#1A1D1E] font-display">
              Quick Exam Portals
            </h3>
            <div className="space-y-2">
              {Object.entries(examDetails).map(([key, ex]) => (
                <button
                  key={key}
                  onClick={() => onNavigateExam(key)}
                  className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                    targetExamId === key 
                      ? 'bg-[#FAF3E6] border-[#FAA114] shadow-sm' 
                      : 'bg-white border-[#E5E2D9] hover:bg-[#F5F4F0]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ex.color }} />
                    <span className="text-xs font-bold text-[#1A1D1E]">{ex.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#66625D]">{ex.daysLeft}d</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-[#FAA114]/30 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-[#C88410] font-bold text-xs font-mono uppercase">
              <Sparkles className="w-4 h-4" /> Split-Pane AI Workspace
            </div>
            <h4 className="font-bold text-sm text-[#1A1D1E]">
              Research & Practice with PDFs
            </h4>
            <p className="text-xs text-[#66625D] leading-relaxed">
              Read any question paper or subject note on the left and quiz yourself with AI generated step solutions on the right.
            </p>
            <button
              onClick={() => onNavigateTab('pdf')}
              className="w-full py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-sm transition"
            >
              Open PDF Workspace →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
