'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  AlertCircle, 
  Plus, 
  Check, 
  Target, 
  BookOpen, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface StudyPlannerViewProps {
  onNavigateExam?: (examId: string) => void;
  targetExamId?: string;
}

export default function StudyPlannerView({
  onNavigateExam,
  targetExamId = 'afcat'
}: StudyPlannerViewProps) {
  const [selectedDay, setSelectedDay] = useState<number>(1); // Tuesday (18 Aug)
  const [rebalanced, setRebalanced] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, day: 1, slot: 'Morning (06:00 - 08:30)', title: 'Numerical Ability: Speed & Time PYQs (25 Qs)', subject: 'Maths', duration: '150 min', completed: true },
    { id: 2, day: 1, slot: 'Afternoon (14:00 - 15:30)', title: 'FSRS Spaced Review: Defence Current Affairs 2026', subject: 'General Knowledge', duration: '90 min', completed: true },
    { id: 3, day: 1, slot: 'Evening (18:00 - 20:00)', title: 'AFCAT Full CBT Mock Simulation #04', subject: 'Full CBT Test', duration: '120 min', completed: false },
    { id: 4, day: 1, slot: 'Night (21:30 - 22:30)', title: 'English Verbal: Error Spotting & Idioms Flashcards', subject: 'English', duration: '60 min', completed: false },

    { id: 5, day: 2, slot: 'Morning (06:00 - 08:30)', title: 'Reasoning: Venn Diagrams & Syllogisms Drills', subject: 'Reasoning', duration: '150 min', completed: false },
    { id: 6, day: 2, slot: 'Afternoon (14:00 - 15:30)', title: 'Physics & Chemistry NCERT High-Yield Recall', subject: 'General Science', duration: '90 min', completed: false },
    { id: 7, day: 2, slot: 'Evening (18:00 - 20:00)', title: 'Sectional Timer Drill: Numerical 30-min Sprint', subject: 'Maths', duration: '120 min', completed: false },

    { id: 8, day: 3, slot: 'Morning (06:00 - 08:30)', title: 'Indian History & Modern Freedom Movement Notes', subject: 'General Knowledge', duration: '150 min', completed: false },
    { id: 9, day: 3, slot: 'Evening (18:00 - 20:00)', title: 'AFCAT Full CBT Mock Simulation #05 + Error Log', subject: 'Full CBT Test', duration: '120 min', completed: false },
  ]);

  const daysOfWeek = [
    { id: 0, day: 'Mon', date: '17 Aug', tasksCount: 4, done: 4 },
    { id: 1, day: 'Tue', date: '18 Aug (Today)', tasksCount: 4, done: 2 },
    { id: 2, day: 'Wed', date: '19 Aug', tasksCount: 3, done: 0 },
    { id: 3, day: 'Thu', date: '20 Aug', tasksCount: 2, done: 0 },
    { id: 4, day: 'Fri', date: '21 Aug', tasksCount: 3, done: 0 },
    { id: 5, day: 'Sat', date: '22 Aug', tasksCount: 4, done: 0 },
    { id: 6, day: 'Sun', date: '23 Aug', tasksCount: 3, done: 0 },
  ];

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAutoRebalance = () => {
    setRebalanced(true);
    setTimeout(() => setRebalanced(false), 3000);
  };

  const activeDayTasks = tasks.filter(t => t.day === selectedDay);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="dark-container p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Adaptive Capacity Planner
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Smart Study Timetable & Capacity Balancer
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed mt-1">
              Algorithms adjust your daily topic loads based on historical mock scores, remaining exam days, and missed study sessions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAutoRebalance}
              className="px-5 py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Auto-Rebalance Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {rebalanced && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Syllabus load successfully redistributed across your remaining active study days!</span>
        </div>
      )}

      {/* Week Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {daysOfWeek.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDay(d.id)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              selectedDay === d.id
                ? 'bg-[#1A1D1E] text-white border-[#1A1D1E] shadow-md scale-[1.02]'
                : 'bg-white text-[#1A1D1E] border-[#E5E2D9] hover:bg-[#F5F4F0]'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span>{d.day}</span>
              {d.done === d.tasksCount && d.tasksCount > 0 ? (
                <span className="text-[10px] text-emerald-400">✓ Done</span>
              ) : (
                <span className={`text-[10px] ${selectedDay === d.id ? 'text-[#FAA114]' : 'text-[#66625D]'}`}>
                  {d.done}/{d.tasksCount}
                </span>
              )}
            </div>
            <div className="text-xs font-mono mt-1 opacity-80">{d.date}</div>
          </button>
        ))}
      </div>

      {/* Day Tasks View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1A1D1E] font-display flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FAA114]" /> Daily Study Sessions
            </h3>
            <span className="text-xs font-mono text-[#66625D]">
              {activeDayTasks.filter(t => t.completed).length} of {activeDayTasks.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {activeDayTasks.length === 0 ? (
              <div className="light-card p-8 rounded-3xl text-center text-[#66625D] text-xs">
                No active tasks scheduled for this day. Click &ldquo;Auto-Rebalance Schedule&rdquo; to populate study drills.
              </div>
            ) : (
              activeDayTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    t.completed
                      ? 'bg-[#F0FDF4] border-emerald-200 text-[#1A1D1E]'
                      : 'bg-white border-[#E5E2D9] hover:border-[#FAA114]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`w-6 h-6 mt-0.5 rounded-lg flex items-center justify-center transition-colors ${
                      t.completed ? 'bg-emerald-600 text-white' : 'border-2 border-[#94A3B8]'
                    }`}>
                      {t.completed && <Check className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-mono text-[#66625D]">{t.slot}</div>
                      <div className={`text-sm font-bold ${t.completed ? 'line-through text-[#66625D]' : 'text-[#1A1D1E]'}`}>
                        {t.title}
                      </div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7]">
                        {t.subject}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#66625D] shrink-0 ml-4">
                    {t.duration}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Milestone Targets & Exam Countdown */}
        <div className="space-y-6">
          <div className="light-card p-6 rounded-3xl space-y-4">
            <h3 className="font-bold text-base text-[#1A1D1E] font-display flex items-center gap-2">
              <Target className="w-4 h-4 text-[#FAA114]" /> Syllabus Milestones
            </h3>

            <div className="space-y-3">
              {[
                { title: 'Verbal Ability & English Comprehension', progress: 92, color: '#FAA114' },
                { title: 'Numerical Ability & Arithmetic Speed', progress: 84, color: '#3B82F6' },
                { title: 'Military Aptitude & Logical Sequences', progress: 88, color: '#22C55E' },
                { title: 'Defence Current Affairs & General Science', progress: 75, color: '#A855F7' },
              ].map((m, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#1A1D1E]">
                    <span>{m.title}</span>
                    <span className="font-mono text-[#66625D]">{m.progress}%</span>
                  </div>
                  <div className="w-full bg-[#E5E2D9] h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.progress}%`, backgroundColor: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dark-container p-6 rounded-3xl space-y-3">
            <span className="text-xs font-mono font-bold text-[#FAA114] uppercase">AI RECOMMENDATION</span>
            <h4 className="font-bold text-sm text-white">Focus on Weak Topic: Speed Math</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your recent test attempts show 22% time overage on Time & Distance calculations. Practice 15 speed drills today.
            </p>
            {onNavigateExam && (
              <button
                onClick={() => onNavigateExam(targetExamId)}
                className="w-full py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-sm transition"
              >
                Launch Speed Drill →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
