'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Layers, 
  Calendar, 
  Search, 
  FileText, 
  TrendingUp, 
  User, 
  Plus, 
  CheckCircle, 
  UploadCloud, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  BookMarked,
  Award,
  ChevronRight,
  Play,
  RotateCcw
} from 'lucide-react';

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState('landing');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Ingestion state
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; status: string }>>([
    { name: 'UPSC_Syllabus_2026.pdf', size: '2.4 MB', status: 'Completed' },
    { name: 'Physics_Electromagnetism.pdf', size: '4.8 MB', status: 'Completed' }
  ]);

  // Auth mock state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Force loading trigger to demonstrate loading state
  const triggerLoadingState = (targetTab: string) => {
    setLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setLoading(false);
      setActiveTab(targetTab);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fcfcfb] text-[#262a2b] font-sans">
      
      {/* LEFT SIDEBAR NAVIGATION (Desktop) */}
      {activeTab !== 'landing' && activeTab !== 'auth' && activeTab !== 'pricing' && (
        <aside className="w-full md:w-64 bg-[#fcfcfb] border-b md:border-b-0 md:border-r border-[#dbd7c7] flex flex-col justify-between shrink-0">
          <div>
            {/* Logo */}
            <div className="p-6 border-b border-[#dbd7c7] flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#262a2b] font-display flex items-center">
                Tejas<span className="w-2 h-2 rounded-full bg-[#faa114] ml-1"></span>
              </span>
            </div>

            {/* Navigation links */}
            <nav className="p-4 space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
                { id: 'planner', label: 'Study Planner', icon: Calendar },
                { id: 'explorer', label: 'Exam Explorer', icon: Search },
                { id: 'learning', label: 'Learning Hub', icon: BookMarked },
                { id: 'pdf', label: 'PDF Workspace', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'profile', label: 'Profile', icon: User },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => triggerLoadingState(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#dbd7c7] text-[#262a2b] border-l-4 border-[#faa114]' 
                        : 'text-[#786e67] hover:bg-[#dbd7c7]/50 hover:text-[#262a2b]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Quiz FAB helper */}
          <div className="p-4 border-t border-[#dbd7c7]">
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizScore(null);
                triggerLoadingState('quiz-gen');
              }}
              className="w-full py-3 px-4 bg-[#faa114] hover:bg-[#faa114]/90 text-[#262a2b] font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Instant Quiz
            </button>
          </div>
        </aside>
      )}

      {/* CORE WORKSPACE CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        
        {/* TOP STATUS GATEWAY (Except Landing & Auth) */}
        {activeTab !== 'landing' && activeTab !== 'auth' && activeTab !== 'pricing' && (
          <header className="h-16 border-b border-[#dbd7c7] px-6 flex items-center justify-between bg-[#fcfcfb]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#786e67]">Current Target:</span>
              <span className="px-3 py-1 bg-[#dbd7c7] text-xs font-semibold rounded-full text-[#262a2b]">UPSC CSE 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => triggerLoadingState('pricing')}
                className="text-xs font-semibold text-[#faa114] hover:underline"
              >
                Upgrade to Premium
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  triggerLoadingState('landing');
                }}
                className="text-xs font-semibold text-[#786e67] hover:text-[#262a2b] hover:underline"
              >
                Logout
              </button>
            </div>
          </header>
        )}

        {/* LOADING SHIMMER CONTAINER STATE */}
        {loading ? (
          <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
            <div className="max-w-xl mx-auto w-full space-y-4">
              <div className="h-8 w-48 shimmer-placeholder rounded-lg"></div>
              <div className="h-4 w-full shimmer-placeholder rounded-lg"></div>
              <div className="h-4 w-5/6 shimmer-placeholder rounded-lg"></div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="h-32 shimmer-placeholder rounded-2xl"></div>
                <div className="h-32 shimmer-placeholder rounded-2xl"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 md:p-8">
            
            {/* SCREEN 1: LANDING PAGE */}
            {activeTab === 'landing' && (
              <div className="max-w-6xl mx-auto space-y-16 py-12">
                <header className="flex justify-between items-center pb-8 border-b border-[#dbd7c7]">
                  <span className="text-2xl font-bold tracking-tight text-[#262a2b] flex items-center">
                    Tejas<span className="w-2.5 h-2.5 rounded-full bg-[#faa114] ml-1"></span>
                  </span>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => triggerLoadingState('auth')}
                      className="px-4 py-2 text-sm font-semibold text-[#786e67] hover:text-[#262a2b]"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => triggerLoadingState('auth')}
                      className="px-5 py-2 text-sm font-semibold bg-[#262a2b] text-[#fcfcfb] rounded-xl hover:bg-[#262a2b]/95"
                    >
                      Get Started
                    </button>
                  </div>
                </header>

                {/* Hero Section */}
                <section className="text-center space-y-6 max-w-3xl mx-auto py-12">
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#262a2b] leading-tight">
                    The AI-Powered Learning Operating System
                  </h1>
                  <p className="text-lg text-[#786e67] max-w-xl mx-auto">
                    Unifying competitive exams, university subjects, and document intelligence into one cohesive, personalized workspace.
                  </p>
                  <div className="flex justify-center gap-4 pt-4">
                    <button 
                      onClick={() => {
                        setIsLoggedIn(true);
                        triggerLoadingState('dashboard');
                      }}
                      className="px-8 py-4 bg-[#faa114] hover:bg-[#faa114]/90 text-[#262a2b] font-bold rounded-2xl flex items-center gap-2 shadow-sm transition-all active:scale-95"
                    >
                      Start Free Trial <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </section>

                {/* Exam Categories */}
                <section className="space-y-6">
                  <h2 className="text-2xl font-bold text-center">Supported Examinations</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['UPSC Civil Services', 'JEE Main & Advanced', 'NEET UG', 'GATE Engineering'].map((item) => (
                      <div key={item} className="p-6 bg-[#fcfcfb] border border-[#dbd7c7] rounded-2xl text-center font-semibold text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* SCREEN 2: AUTHENTICATION */}
            {activeTab === 'auth' && (
              <div className="min-h-[80vh] flex items-center justify-center">
                <div className="w-full max-w-md bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Create Account</h1>
                    <p className="text-sm text-[#786e67]">Start preparing for your targets today.</p>
                  </div>
                  <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); triggerLoadingState('dashboard'); }} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#786e67]">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe" 
                        className="w-full px-4 py-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#786e67]">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="john@domain.com" 
                        className="w-full px-4 py-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#786e67]">Password</label>
                      <input 
                        type="password" 
                        required 
                        placeholder="••••••••" 
                        className="w-full px-4 py-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full py-3 bg-[#262a2b] hover:bg-[#262a2b]/95 text-[#fcfcfb] font-semibold rounded-xl transition-all active:scale-95"
                    >
                      Sign Up
                    </button>
                  </form>
                  <p className="text-xs text-center text-[#786e67]">
                    Already have an account? <span onClick={() => triggerLoadingState('auth')} className="text-[#faa114] cursor-pointer hover:underline">Log in</span>
                  </p>
                </div>
              </div>
            )}

            {/* SCREEN 3: PRICING */}
            {activeTab === 'pricing' && (
              <div className="max-w-4xl mx-auto space-y-8 py-8">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold">Simple, Transparent Plans</h1>
                  <p className="text-sm text-[#786e67]">Upgrade to unlock unlimited daily AI generation tokens.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 pt-6">
                  {/* Free Plan */}
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl flex flex-col justify-between">
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-[#786e67]">Free Learner</h2>
                      <div className="text-4xl font-bold">₹0<span className="text-sm font-medium text-[#b3aa9e]"> / month</span></div>
                      <ul className="space-y-2 text-sm text-[#786e67]">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> 3 AI quiz tokens daily</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Basic syllabus roadmap</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Performance tracking history</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => triggerLoadingState('dashboard')}
                      className="mt-8 w-full py-3 border border-[#dbd7c7] text-[#262a2b] font-semibold rounded-xl hover:bg-[#dbd7c7]/50"
                    >
                      Current Active Plan
                    </button>
                  </div>
                  {/* Premium Plan */}
                  <div className="bg-[#fcfcfb] border-2 border-[#faa114] p-8 rounded-3xl flex flex-col justify-between relative">
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#faa114] text-[#262a2b] text-xs font-bold px-3 py-1 rounded-full">
                      RECOMMENDED
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-[#faa114]">Elite Premium</h2>
                      <div className="text-4xl font-bold">₹499<span className="text-sm font-medium text-[#b3aa9e]"> / month</span></div>
                      <ul className="space-y-2 text-sm text-[#786e67]">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Unlimited AI quiz generations</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> PDF & YouTube playlists ingestion</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Advanced analytics & predicted percentiles</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Spaced repetition cards auto-sync</li>
                      </ul>
                    </div>
                    <button 
                      onClick={() => {
                        alert('Elite plan mock checkout successful!');
                        triggerLoadingState('dashboard');
                      }}
                      className="mt-8 w-full py-3 bg-[#faa114] text-[#262a2b] font-bold rounded-xl hover:bg-[#faa114]/90"
                    >
                      Upgrade Workspace
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 4: USER DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Streak Banner */}
                <div className="bg-[#dbd7c7]/40 border border-[#dbd7c7] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      Streak Active: 5 Days! 🔥
                    </h2>
                    <p className="text-sm text-[#786e67]">Keep going to stay on track for UPSC CSE 2026.</p>
                  </div>
                  <button 
                    onClick={() => triggerLoadingState('planner')}
                    className="px-4 py-2 text-xs font-semibold bg-[#262a2b] text-[#fcfcfb] rounded-xl hover:bg-[#262a2b]/95"
                  >
                    View Plan Calendar
                  </button>
                </div>

                {/* Grid Split */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Daily Tasks */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold">Today's Targets</h3>
                    <div className="space-y-3">
                      {[
                        { title: 'Read Chapter 4: Indian Polity', duration: '60m', done: true },
                        { title: 'Attempt Dynamic MCQ on Federalism', duration: '20m', done: false },
                        { title: 'Review Spaced Repetition Due Cards', duration: '15m', done: false }
                      ].map((task, idx) => (
                        <div key={idx} className="p-4 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input 
                              type="checkbox" 
                              defaultChecked={task.done} 
                              className="accent-[#faa114] w-4 h-4"
                            />
                            <span className={`text-sm ${task.done ? 'line-through text-[#b3aa9e]' : 'text-[#262a2b] font-medium'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className="text-xs text-[#786e67]">{task.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Drag and drop uploader */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold">Quick Ingest</h3>
                    <div className="border-2 border-dashed border-[#dbd7c7] p-8 rounded-2xl text-center space-y-4 hover:border-[#faa114] transition-colors cursor-pointer bg-[#fcfcfb]">
                      <UploadCloud className="w-10 h-10 text-[#786e67] mx-auto" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Upload PDF textbook</p>
                        <p className="text-xs text-[#b3aa9e]">Drag & drop or click file browser</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 5: STUDY PLANNER */}
            {activeTab === 'planner' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Study Planner</h1>
                  <button 
                    onClick={() => {
                      alert('Timeline rebalancing request dispatched to worker pipeline.');
                      triggerLoadingState('planner');
                    }}
                    className="px-4 py-2 border border-[#dbd7c7] hover:bg-[#dbd7c7]/50 text-xs font-semibold rounded-xl"
                  >
                    Reschedule / Rebalance
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Planner Config */}
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-2xl space-y-4">
                    <h3 className="text-lg font-bold">Capacity Configuration</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-[#786e67]">Daily Time Budget (Hours)</label>
                        <input type="range" min="1" max="12" defaultValue="4" className="w-full accent-[#faa114]" />
                        <div className="text-sm text-right font-medium">4 Hours / Day</div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#786e67]">Primary Target Exam</label>
                        <select className="w-full p-2 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm">
                          <option>UPSC CSE 2026</option>
                          <option>JEE Advanced 2026</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Calendar schedule */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold">Weekly Timeline Mapping</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="p-3 bg-[#dbd7c7]/20 border border-[#dbd7c7] rounded-xl text-center">
                          <span className="text-xs font-bold block mb-2">{day}</span>
                          <div className="h-16 bg-[#786e67] rounded-lg text-[9px] text-[#fcfcfb] p-1 overflow-hidden flex flex-col justify-between">
                            <span>Polity Block</span>
                            <span className="font-semibold text-right">2 hrs</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 6: EXAM EXPLORER */}
            {activeTab === 'explorer' && (
              <div className="space-y-6">
                <div className="max-w-md space-y-1">
                  <label className="text-xs font-semibold text-[#786e67]">Search Examinations Database</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search UPSC, GATE, Banking..." 
                      className="w-full pl-10 pr-4 py-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm"
                    />
                    <Search className="w-4 h-4 text-[#786e67] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {['UPSC Civil Services', 'JEE Advanced', 'NEET UG', 'GATE CSE', 'SBI PO'].map((exam) => (
                    <div key={exam} className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-2xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">{exam}</h3>
                        <p className="text-xs text-[#786e67]">Syllabus structure current version 1.2</p>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <button 
                          onClick={() => triggerLoadingState('learning')}
                          className="flex-1 py-2 bg-[#dbd7c7] hover:bg-[#dbd7c7]/80 text-xs font-semibold rounded-xl text-center"
                        >
                          View Syllabus Tree
                        </button>
                        <button 
                          onClick={() => {
                            alert(`Enrolled in ${exam} Primary roadmap initialized.`);
                            triggerLoadingState('dashboard');
                          }}
                          className="flex-1 py-2 bg-[#faa114] text-xs font-semibold rounded-xl text-center"
                        >
                          Enroll Roadmap
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCREEN 7: LEARNING HUB */}
            {activeTab === 'learning' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Syllabus Explorer</h1>
                  <button 
                    onClick={() => triggerLoadingState('quiz-gen')}
                    className="px-4 py-2 bg-[#faa114] text-xs font-bold rounded-xl flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Test Me on this Chapter
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Topic navigation Tree */}
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-2xl space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#786e67]">Syllabus Tree</h3>
                    <div className="space-y-2 text-sm">
                      <div className="font-semibold text-[#faa114] cursor-pointer flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 transform rotate-90" /> 1. Indian Constitution
                      </div>
                      <div className="pl-6 space-y-1 text-[#786e67]">
                        <div className="cursor-pointer font-medium text-[#262a2b] hover:text-[#faa114]">1.1 Historical Background</div>
                        <div className="cursor-pointer hover:text-[#faa114]">1.2 Salient Features</div>
                        <div className="cursor-pointer hover:text-[#faa114]">1.3 Preamble & Union</div>
                      </div>
                    </div>
                  </div>

                  {/* Reading panel */}
                  <div className="md:col-span-2 bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-2xl space-y-4">
                    <h2 className="text-xl font-display font-bold">1.1 Historical Background</h2>
                    <p className="text-sm text-[#786e67] leading-relaxed">
                      The Indian Constitution has its roots in several historical developments during British rule. 
                      Significant landmarks include the Regulating Act of 1773, Pitt's India Act of 1784, and the 
                      Charter Acts which consolidated administrative authority under the East India Company...
                    </p>
                    <div className="pt-6 border-t border-[#dbd7c7] flex justify-between items-center">
                      <span className="text-xs text-[#b3aa9e]">Resource references: Laxmikanth Chapter 1</span>
                      <button 
                        onClick={() => triggerLoadingState('pdf')}
                        className="text-xs font-semibold text-[#faa114] hover:underline"
                      >
                        Read Reference PDF &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 8: PDF WORKSPACE */}
            {activeTab === 'pdf' && (
              <div className="grid md:grid-cols-3 gap-6 h-[75vh]">
                {/* PDF Viewer */}
                <div className="md:col-span-2 border border-[#dbd7c7] rounded-3xl bg-[#dbd7c7]/10 flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-[#dbd7c7] flex justify-between items-center bg-[#fcfcfb]">
                    <span className="text-sm font-semibold">UPSC_Syllabus_2026.pdf (Page 1 of 12)</span>
                    <div className="flex gap-2">
                      <button className="px-2 py-1 bg-[#dbd7c7] rounded-lg text-xs">Prev</button>
                      <button className="px-2 py-1 bg-[#dbd7c7] rounded-lg text-xs">Next</button>
                    </div>
                  </div>
                  <div className="flex-1 p-8 flex items-center justify-center text-center">
                    <div className="max-w-md space-y-4">
                      <FileText className="w-16 h-16 text-[#b3aa9e] mx-auto" />
                      <h3 className="text-lg font-bold">Indian Constitution Overview</h3>
                      <p className="text-xs text-[#786e67]">
                        [PDF Render Preview] Select text on layout screen to trigger context annotations or ask questions to the AI panel on the right.
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Chat workspace panel */}
                <div className="border border-[#dbd7c7] rounded-3xl bg-[#fcfcfb] flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-[#dbd7c7] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#faa114]" />
                    <span className="text-sm font-semibold">AI Paper Explainer</span>
                  </div>
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    <div className="p-3 bg-[#dbd7c7]/30 text-xs rounded-xl max-w-[85%]">
                      Hello! How can I help you understand this document today?
                    </div>
                  </div>
                  <div className="p-3 border-t border-[#dbd7c7] flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ask the paper workspace..." 
                      className="flex-1 px-3 py-2 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-xs focus:outline-none focus:border-[#faa114]"
                    />
                    <button className="px-3 py-2 bg-[#faa114] text-xs font-bold rounded-xl">Send</button>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 9: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <h1 className="text-2xl font-bold">Performance Analytics</h1>

                {/* Heatmap Blocks */}
                <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-3xl space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold">Concept Mastery Heatmap</h3>
                    <p className="text-xs text-[#786e67]">Mastery calculations mapped from latest assessment attempts.</p>
                  </div>
                  <div className="grid grid-cols-8 gap-2 max-w-lg">
                    {[
                      { topic: 'Polity', mastery: '#faa114' },
                      { topic: 'History', mastery: '#786e67' },
                      { topic: 'Geography', mastery: '#dbd7c7' },
                      { topic: 'Economics', mastery: '#262a2b' },
                      { topic: 'Science', mastery: '#faa114' },
                      { topic: 'Current Affairs', mastery: '#dbd7c7' },
                      { topic: 'Environment', mastery: '#786e67' },
                      { topic: 'Aptitude', mastery: '#262a2b' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        style={{ backgroundColor: item.mastery }}
                        className="h-12 rounded-xl flex items-center justify-center text-[10px] font-bold text-[#fcfcfb] cursor-pointer"
                        title={`${item.topic} Mastery`}
                      >
                        {item.topic.substring(0, 4)}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4 text-xs font-semibold text-[#786e67]">
                    <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 rounded bg-[#faa114]"></span> Mastered</span>
                    <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 rounded bg-[#786e67]"></span> Strong</span>
                    <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 rounded bg-[#dbd7c7]"></span> Moderate</span>
                    <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 rounded bg-[#262a2b]"></span> Critical</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 10: INSTANT QUIZ DYNAMIC WORKSPACE */}
            {activeTab === 'quiz-gen' && (
              <div className="max-w-2xl mx-auto space-y-8">
                
                {!quizStarted ? (
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6">
                    <div className="text-center space-y-2">
                      <Sparkles className="w-12 h-12 text-[#faa114] mx-auto" />
                      <h1 className="text-2xl font-bold">Instant Quiz Generator</h1>
                      <p className="text-sm text-[#786e67]">Generate personalized question sets dynamically from files.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-[#786e67]">Select Ingestion Source</label>
                        <select className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm">
                          <option>UPSC_Syllabus_2026.pdf (Document)</option>
                          <option>Physics_Electromagnetism.pdf (Document)</option>
                          <option>Chapter 1.1 Historical Background (Syllabus Topic)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-[#786e67]">Difficulty</label>
                          <select className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-[#786e67]">Questions Count</label>
                          <input type="number" defaultValue="5" className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm" />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setQuizStarted(true)}
                      className="w-full py-4 bg-[#faa114] text-[#262a2b] font-bold rounded-xl hover:bg-[#faa114]/90"
                    >
                      Generate AI Quiz
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Progress timer bar */}
                    <div className="h-1.5 w-full bg-[#dbd7c7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#faa114] w-[40%]"></div>
                    </div>

                    {/* Active Question Canvas */}
                    <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-[#786e67]">Question 1 of 2 (Federalism)</span>
                        <h2 className="text-xl font-bold">
                          Which of the following acts first initiated administrative centralization under the East India Company?
                        </h2>
                      </div>

                      <div className="space-y-3">
                        {[
                          { key: 'A', text: 'Regulating Act of 1773' },
                          { key: 'B', text: 'Pitt\'s India Act of 1784' },
                          { key: 'C', text: 'Charter Act of 1833' },
                          { key: 'D', text: 'Government of India Act of 1858' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setSelectedOption(opt.key)}
                            className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                              selectedOption === opt.key 
                                ? 'border-[#faa114] bg-[#dbd7c7]/20 font-semibold' 
                                : 'border-[#dbd7c7] hover:border-[#786e67]'
                            }`}
                          >
                            <span className="font-bold mr-2 text-[#786e67]">{opt.key}.</span> {opt.text}
                          </button>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-[#dbd7c7] flex justify-between">
                        <button 
                          onClick={() => setQuizStarted(false)}
                          className="px-4 py-2 border border-[#dbd7c7] text-xs font-semibold rounded-xl"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => {
                            setQuizScore(selectedOption === 'A' ? 100 : 0);
                          }}
                          className="px-6 py-2 bg-[#262a2b] text-[#fcfcfb] text-xs font-bold rounded-xl"
                          disabled={!selectedOption}
                        >
                          Submit Response
                        </button>
                      </div>
                    </div>

                    {/* Feedback Explanation popup */}
                    {quizScore !== null && (
                      <div className="bg-[#fcfcfb] border-2 border-[#faa114] p-6 rounded-3xl space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-[#faa114]" />
                          <h3 className="font-bold text-lg">
                            {quizScore === 100 ? 'Correct Response! (+100%)' : 'Incorrect Response. (+0%)'}
                          </h3>
                        </div>
                        <p className="text-sm text-[#786e67]">
                          <strong>Explanation:</strong> The Regulating Act of 1773 was the first step taken by the British Government to control and regulate the affairs of the East India Company in India. It laid the foundations of central administration in India.
                        </p>
                        <button 
                          onClick={() => {
                            setQuizStarted(false);
                            setQuizScore(null);
                            setSelectedOption(null);
                          }}
                          className="px-4 py-2 bg-[#faa114] text-xs font-bold rounded-xl"
                        >
                          Back to Generator
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 11: PROFILE & SETTINGS */}
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6">
                <h1 className="text-2xl font-bold">User Settings</h1>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#786e67]">Target Goal (Minutes / Day)</label>
                    <input 
                      type="number" 
                      defaultValue="60" 
                      className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#786e67]">UI Accent Colors Preference</label>
                    <div className="flex gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#faa114] border-2 border-[#262a2b] cursor-pointer"></span>
                      <span className="w-6 h-6 rounded-full bg-[#786e67] cursor-pointer"></span>
                      <span className="w-6 h-6 rounded-full bg-[#b3aa9e] cursor-pointer"></span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Settings updated successfully.')}
                    className="w-full py-3 bg-[#faa114] text-[#262a2b] font-bold rounded-xl"
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {activeTab !== 'landing' && activeTab !== 'auth' && activeTab !== 'pricing' && (
        <nav className="md:hidden h-16 border-t border-[#dbd7c7] bg-[#fcfcfb] flex items-center justify-around fixed bottom-0 left-0 right-0 z-50">
          {[
            { id: 'dashboard', icon: BookOpen },
            { id: 'planner', icon: Calendar },
            { id: 'quiz-gen', icon: Plus },
            { id: 'explorer', icon: Search },
            { id: 'profile', icon: User }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => triggerLoadingState(item.id)}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive ? 'text-[#faa114]' : 'text-[#786e67] hover:text-[#262a2b]'
                }`}
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          })}
        </nav>
      )}

    </div>
  );
}
