'use client';
// Tejas Version Tag: 2026.08.18-v3-prod
import React, { useState, useEffect, useRef } from 'react';
import AfcatHub from '../components/afcat/AfcatHub';
import CdsHub from '../components/cds/CdsHub';
import NdaHub from '../components/nda/NdaHub';
import JeeMainsHub from '../components/jee/JeeMainsHub';
import NeetHub from '../components/neet/NeetHub';
import UpscHub from '../components/upsc/UpscHub';
import SscCglHub from '../components/ssc/SscCglHub';
import GateHub from '../components/gate/GateHub';
import CatHub from '../components/cat/CatHub';
import DashboardView from '../components/platform/DashboardView';
import StudyPlannerView from '../components/platform/StudyPlannerView';
import ExamExplorerView from '../components/platform/ExamExplorerView';
import LearningHubView from '../components/platform/LearningHubView';
import PdfWorkspaceView from '../components/platform/PdfWorkspaceView';
import RevisionFsrsView from '../components/platform/RevisionFsrsView';
import AnalyticsRadarView from '../components/platform/AnalyticsRadarView';
import ProfileSettingsView from '../components/platform/ProfileSettingsView';
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
  ChevronDown,
  RotateCcw,
  Zap,
  Brain,
  Target,
  BarChart3,
  Shield,
  Star,
  GraduationCap,
  Flame,
  Menu,
  X,
  Quote,
  Lock,
  Mail,
  RefreshCw,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

/* ──────────────────────────────────────────────────
   SCROLL REVEAL HOOK
   ────────────────────────────────────────────────── */
function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRevealOnScroll();
  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`}>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────
   EXAM CARD DATA (MATCHING SCREENSHOT MOCKUP)
   ────────────────────────────────────────────────── */
const examCategories = [
  { id: 'afcat', name: 'AFCAT 2026 (Air Force)', category: 'defence', icon: Shield, candidates: '5L+', color: '#FAA114', badge: 'AIR FORCE', tag: 'CBT Suite Ready' },
  { id: 'cds', name: 'CDS (IMA / OTA)', category: 'defence', icon: Shield, candidates: '6L+', color: '#22C55E', badge: 'DEFENCE', tag: 'Official CDAC' },
  { id: 'nda', name: 'NDA & NA (UPSC)', category: 'defence', icon: Shield, candidates: '8L+', color: '#FAA114', badge: 'UPSC DEFENCE', tag: 'Maths & GAT' },
  { id: 'jee_mains', name: 'JEE Main & Advanced', category: 'engineering', icon: Zap, candidates: '25L+', color: '#3B82F6', badge: 'IIT / NTA', tag: 'Physics & Chem' },
  { id: 'neet', name: 'NEET UG Medical', category: 'medical', icon: GraduationCap, candidates: '21L+', color: '#22C55E', badge: 'MEDICAL / NTA', tag: 'NCERT Ingestion' },
  { id: 'upsc', name: 'UPSC CSE (IAS / IPS)', category: 'civil', icon: BookOpen, candidates: '12L+', color: '#A855F7', badge: 'CIVIL SERVICES', tag: 'Prelims + Mains' },
  { id: 'ssc_cgl', name: 'SSC CGL Tier 1 & 2', category: 'aptitude', icon: Target, candidates: '30L+', color: '#F97316', badge: 'GOVERNMENT', tag: 'Speed Math' },
  { id: 'gate', name: 'GATE (IISc / IITs)', category: 'engineering', icon: Brain, candidates: '9L+', color: '#6366F1', badge: 'ENGINEERING', tag: 'NAT & MSQ' },
  { id: 'cat', name: 'CAT (IIMs B-Schools)', category: 'aptitude', icon: BarChart3, candidates: '3.5L+', color: '#EC4899', badge: 'MANAGEMENT', tag: 'DILR & VARC' },
];

const examHubDetails: Record<string, {
  badge: string;
  title: string;
  description: string;
  mocks: string;
  features: string[];
  color: string;
}> = {
  afcat: {
    badge: '✈️ AFCAT 2026 MENTOR EDITION',
    title: 'Air Force Common Admission Test',
    description: 'Complete mentor-led AFCAT hub featuring comprehensive syllabus roadmaps, 15 full-length model papers, authentic PYQ PDFs (2018-2025), subject video playlists, and official AFCAT CBT quiz simulations.',
    mocks: '15 Mocks',
    features: ['Topic Tests', 'Full Mocks', 'PYQ Papers', 'Daily Goals', 'AI Revision Plan', 'AI Explainer', 'Sectional Limits', 'Readiness Report'],
    color: '#FAA114'
  },
  cds: {
    badge: '🛡️ CDS PREPARATION HUB',
    title: 'Combined Defence Services (IMA / OTA / AFA)',
    description: 'Access complete general knowledge maps, english vocabulary boosters, full-length OTA mock tests, and historical papers structured to simulate the actual UPSC CDAC exam environment.',
    mocks: '12 Mocks',
    features: ['GK Question Bank', 'English Vocab Boosters', 'OTA Mock Tests', 'FSRS Spaced Repetition', 'CDS Performance Ranker'],
    color: '#22C55E'
  },
  nda: {
    badge: '⚔️ NDA & NA PREPARATION PLATFORM',
    title: 'National Defence Academy & Naval Academy',
    description: 'Syllabus alignment for UPSC NDA Mathematics and General Ability Test. Train with dynamic formula cheatsheets, topic practice drills, and full-length CBT model papers.',
    mocks: '10 Mocks',
    features: ['Maths Concepts Explorer', 'GAT Practice Drills', 'Formula Cheatsheets', 'Daily Flashcards', 'Performance Tracker'],
    color: '#FAA114'
  },
  jee_mains: {
    badge: '⚛️ JEE MAIN & ADVANCED CORE ENGINE',
    title: 'Joint Entrance Examination',
    description: 'Master engineering physics, complex chemistry reaction pipelines, and logic-heavy mathematics matrices. Access step-by-step video solvers and AI-guided micro challenges.',
    mocks: '20 Mocks',
    features: ['Numerical Solvers', 'Mock Test Engine', 'Physics Visualizers', 'IIT Syllabus Mapping', 'Chapter-wise Quizzes'],
    color: '#3B82F6'
  },
  neet: {
    badge: '🩺 NEET UG MEDICAL CORE ENGINE',
    title: 'National Eligibility cum Entrance Test',
    description: 'NCERT biology interactive mapping, high-yield organic/inorganic chemistry formula builders, and physics conceptual drills designed to scale active recall.',
    mocks: '18 Mocks',
    features: ['NCERT Map Engine', 'Biology Flashcards', 'Chemistry Drills', 'Weak-Topic Focus', 'CBT Test Simulator'],
    color: '#22C55E'
  },
  upsc: {
    badge: '🏛️ UPSC CIVIL SERVICES EXAM HUB',
    title: 'UPSC CSE (IAS / IPS / IFS)',
    description: 'Deep Indian Polity analysis, modern history visual timelines, and weekly current affairs summaries. Practice mains answer generation with instant AI logic feedback.',
    mocks: '10 Mocks',
    features: ['Polity Timelines', 'Mains Answer Generator', 'CSAT Practice Portal', 'Current Affairs Hub', 'Syllabus Accordion'],
    color: '#A855F7'
  },
  ssc_cgl: {
    badge: '📋 SSC CGL TIER 1 & 2 ENGINE',
    title: 'Staff Selection Commission CGL',
    description: 'Optimize quantitative aptitude speed, logical reasoning sequence solving, and general awareness memory logs. Take daily speed-math sprints and reasoning logical sequence drills.',
    mocks: '25 Mocks',
    features: ['Speed Math Drills', 'Reasoning Sprints', 'General Awareness Logs', 'Tier 2 Simulators', 'Syllabus Tracker'],
    color: '#F97316'
  },
  gate: {
    badge: '⚡ GATE ENGINEERING ENGINE',
    title: 'Graduate Aptitude Test in Engineering',
    description: 'Subject-specific core engineering workflows, aptitude shortcuts, and previous-year numerical answer type questions with immediate step explanations.',
    mocks: '15 Mocks',
    features: ['Numerical Answers (NAT)', 'Aptitude Shortcuts', 'Core Topic Workspaces', 'Formula Sheets', 'Dynamic Assessments'],
    color: '#6366F1'
  },
  cat: {
    badge: '📊 CAT MBA ENTRANCE PLATFORM',
    title: 'Common Admission Test (IIMs)',
    description: 'High-difficulty Data Interpretation & Logical Reasoning (DILR) caselets, Quantitative Aptitude practice sets, and Verbal Ability reading comprehensions.',
    mocks: '12 Mocks',
    features: ['DILR Caselets', 'QA Speed Booster', 'VARC Comprehensions', 'Percentile Predictor', 'Adaptive Practice Sets'],
    color: '#EC4899'
  }
};

const features = [
  {
    id: 'quiz',
    tabId: 'pdf',
    icon: Sparkles,
    title: 'AI Instant Quiz Engine',
    description: 'Paste any topic, upload a textbook PDF, or drop a YouTube link — generates authentic exam-pattern questions with instant step explanations.',
    tag: 'GENAI ENGINE',
    color: '#FAA114'
  },
  {
    id: 'planner',
    tabId: 'planner',
    icon: Calendar,
    title: 'Adaptive Capacity Planner',
    description: 'Personalized daily study schedules that auto-rebalance when you miss sessions or when your target exam date draws closer.',
    tag: 'DYNAMIC SCHEDULER',
    color: '#3B82F6'
  },
  {
    id: 'revision',
    tabId: 'revision',
    icon: RotateCcw,
    title: 'FSRS Spaced Repetition',
    description: 'Scientific active recall scheduling based on the Free Spaced Repetition Scheduler algorithm — eliminates forgetfulness forever.',
    tag: 'RETENTION ALGORITHM',
    color: '#22C55E'
  },
  {
    id: 'pdf',
    tabId: 'pdf',
    icon: FileText,
    title: 'Split-Pane Research Hub',
    description: 'Read document PDFs on the left, highlight complex formulas, and chat with your dedicated AI tutor on the right in real time.',
    tag: 'INTELLIGENT WORKSPACE',
    color: '#A855F7'
  },
  {
    id: 'analytics',
    tabId: 'analytics',
    icon: TrendingUp,
    title: 'Concept Mastery Heatmap',
    description: 'Real-time detection of weak topics, predicted percentile calibration, and tailored recommendations that fix knowledge gaps.',
    tag: 'CALIBRATION RADAR',
    color: '#F97316'
  },
  {
    id: 'explorer',
    tabId: 'explorer',
    icon: Shield,
    title: 'Official CBT Exam Window',
    description: 'Authentic CDAC and NTA exam simulation interface featuring sectional timers, question palettes, and instant post-exam rank reports.',
    tag: 'REAL SIMULATION',
    color: '#6366F1'
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'UPSC CSE 2025 — AIR 47',
    quote: 'Tejas transformed how I prepared for Civil Services. The AI study planner alone saved me 2 hours daily by eliminating guesswork and keeping my syllabus strictly on track.',
    avatar: 'PS',
    badge: 'AIR 47'
  },
  {
    name: 'Arjun Menon',
    role: 'JEE Advanced — 99.4%ile',
    quote: 'The instant quiz engine from my textbook PDFs is incredible. I could test myself on any physics topic in seconds with complete step-by-step solution derivations.',
    avatar: 'AM',
    badge: '99.4%ile'
  },
  {
    name: 'Kavitha R.',
    role: 'NEET UG — 680/720',
    quote: 'The spaced repetition system helped me retain Botany and Zoology concepts that I kept forgetting. It was the single most impactful tool in my medical preparation.',
    avatar: 'KR',
    badge: '680 / 720'
  },
];

const API_BASE_URL = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3001'
    : '/api/backend';

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState('landing');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hero search & filters
  const [heroExamFilter, setHeroExamFilter] = useState<'all' | 'defence' | 'engineering' | 'medical' | 'civil' | 'aptitude'>('all');
  const [heroExamSearch, setHeroExamSearch] = useState('');

  // Auth fields & 2-Step OTP
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [authFullName, setAuthFullName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccessMsg, setOtpSuccessMsg] = useState<string | null>(null);
  const [otpTimer, setOtpTimer] = useState<number>(30);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

  // User & Workspace state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileFullName, setProfileFullName] = useState('Priya Sharma');
  const [profileGoal, setProfileGoal] = useState(120);
  const [profileLanguage, setProfileLanguage] = useState('en');
  const [profilePhoneNumber, setProfilePhoneNumber] = useState('');
  const [profileTargetExamId, setProfileTargetExamId] = useState('afcat');
  const [profileTargetYear, setProfileTargetYear] = useState<any>('2026');
  const [profileState, setProfileState] = useState('Maharashtra');
  const [profilePrepStatus, setProfilePrepStatus] = useState('dedicated');
  const [profileOnboardingCompleted, setProfileOnboardingCompleted] = useState(true);

  // Auth Modal & Stream selection state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTargetExam, setAuthTargetExam] = useState<string>('gate');
  const [authGateBranch, setAuthGateBranch] = useState<string>('cs');
  const [authDefenceTrack, setAuthDefenceTrack] = useState<string>('ima');
  const [targetSwitcherOpen, setTargetSwitcherOpen] = useState<boolean>(false);

  // Restore local session on initial render
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('tejas_is_logged_in');
      const savedProfile = localStorage.getItem('tejas_user_profile');
      const savedExam = localStorage.getItem('tejas_target_exam');
      if (savedAuth === 'true') {
        setIsLoggedIn(true);
      } else {
        // Pop up Registration / Login window at start for new/unauthenticated visitors
        setShowAuthModal(true);
      }
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.fullName) setProfileFullName(parsed.fullName);
        if (parsed.targetExam) setProfileTargetExamId(parsed.targetExam);
        if (parsed.targetYear) setProfileTargetYear(parsed.targetYear);
        if (parsed.dailyGoal) setProfileGoal(parsed.dailyGoal);
        if (parsed.email) setAuthEmail(parsed.email);
        if (parsed.phone) setProfilePhoneNumber(parsed.phone);
        if (parsed.state) setProfileState(parsed.state);
        if (parsed.prepStatus) setProfilePrepStatus(parsed.prepStatus);
      } else if (savedExam) {
        setProfileTargetExamId(savedExam);
      }
    } catch (e) {
      console.warn('Local session restore failed', e);
    }
  }, []);

  // OTP Timer Countdown
  useEffect(() => {
    if (showAuthModal && signupStep === 2 && otpTimer > 0) {
      const interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [showAuthModal, signupStep, otpTimer]);

  const resetAuthState = () => {
    setErrorMsg(null);
    setOtpError(null);
    setOtpSuccessMsg(null);
    setOtpCode('');
    setSignupStep(1);
    setOtpTimer(30);
    setAuthPassword('');
    setShowPassword(false);
  };

  const openAuth = (mode: 'login' | 'signup', targetExam: string = 'gate') => {
    setAuthMode(mode);
    setAuthTargetExam(targetExam);
    resetAuthState();
    setShowAuthModal(true);
  };

  const handleInitiateSignup = () => {
    if (!authFullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!authEmail.trim() || !authEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (authPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setErrorMsg(null);
    setOtpTimer(30);
    setSignupStep(2);
    setOtpSuccessMsg(`Verification code sent to ${authEmail}. Enter OTP to activate your workspace.`);
  };

  const handleVerifyOtpAndComplete = () => {
    if (otpCode.length < 4) {
      setOtpError('Please enter a valid verification code.');
      return;
    }

    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      handleAuthComplete(authTargetExam);
    }, 600);
  };

  const handleLoginSubmit = () => {
    if (!authEmail.trim() || !authEmail.includes('@')) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    if (!authPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setErrorMsg(null);
    handleAuthComplete(authTargetExam);
  };

  const handleAuthComplete = (examId: string = authTargetExam) => {
    setIsLoggedIn(true);
    setProfileOnboardingCompleted(true);
    setProfileTargetExamId(examId);
    if (authFullName.trim()) {
      setProfileFullName(authFullName.trim());
    }

    try {
      localStorage.setItem('tejas_is_logged_in', 'true');
      localStorage.setItem('tejas_target_exam', examId);
      localStorage.setItem('tejas_user_profile', JSON.stringify({
        fullName: authFullName.trim() || profileFullName,
        email: authEmail,
        targetExam: examId,
        targetYear: profileTargetYear,
        dailyGoal: profileGoal,
        phone: profilePhoneNumber,
        state: profileState,
        prepStatus: profilePrepStatus
      }));
    } catch (e) {
      console.warn('Storage save failed', e);
    }

    setShowAuthModal(false);
    const targetMap: Record<string, string> = {
      jee: 'jee_mains',
      ssc: 'ssc_cgl',
    };
    const finalTab = targetMap[examId] || examId;
    triggerLoadingState(finalTab);
  };

  const triggerLoadingState = (targetTab: string) => {
    setLoading(true);
    setErrorMsg(null);
    setMobileMenuOpen(false);
    setTimeout(() => {
      setLoading(false);
      setActiveTab(targetTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 350);
  };

  const openExamWorkspace = (examId: string = 'afcat') => {
    if (isLoggedIn) {
      setProfileTargetExamId(examId);
      try {
        localStorage.setItem('tejas_target_exam', examId);
      } catch (e) {}
      const targetMap: Record<string, string> = {
        jee: 'jee_mains',
        ssc: 'ssc_cgl',
      };
      const finalTab = targetMap[examId] || examId;
      triggerLoadingState(finalTab);
    } else {
      openAuth('signup', examId);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredExams = examCategories.filter(exam => {
    const matchesCategory = heroExamFilter === 'all' || exam.category === heroExamFilter;
    const matchesSearch = exam.name.toLowerCase().includes(heroExamSearch.toLowerCase()) || 
                          exam.tag.toLowerCase().includes(heroExamSearch.toLowerCase()) ||
                          exam.id.toLowerCase().includes(heroExamSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* ────────────────────────────────────────
     LANDING PAGE (WARM ALABASTER CREAM & GOLD)
     ──────────────────────────────────────── */
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAFAF8] text-[#1A1D1E] font-sans selection:bg-[#FAA114]/30 selection:text-[#1A1D1E]">

        {/* ═══════════ NAVIGATION BAR ═══════════ */}
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'glass-header py-3.5 shadow-sm' : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1A1D1E] text-[#FAFAF8] flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-[#1A1D1E] font-display">Tejas</span>
                <div className="flex items-center gap-1 ml-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-[#EA4335] animate-pulse delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-[#FBBC04] animate-pulse delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse delay-200"></span>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#66625D]">
              <a href="#exams" className="hover:text-[#1A1D1E] transition-colors">Exam Suites</a>
              <a href="#features" className="hover:text-[#1A1D1E] transition-colors">AI Capabilities</a>
              <a href="#testimonials" className="hover:text-[#1A1D1E] transition-colors">Success Stories</a>
              <a href="#pricing" className="hover:text-[#1A1D1E] transition-colors">Pricing</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => openAuth('login')}
                className="px-5 py-2.5 text-sm font-bold text-[#1A1D1E] hover:bg-[#E5E2D9]/50 rounded-xl transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => openAuth('signup')}
                className="px-6 py-2.5 text-sm font-bold bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl transition-all active:scale-95 shadow-sm flex items-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1D1E] hover:bg-[#E5E2D9]/50 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* ═══════════ HERO SECTION ═══════════ */}
        <section className="ambient-mesh relative pt-32 md:pt-44 pb-20 md:pb-24 px-6 md:px-12 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            
            <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E6] border border-[#E8D5B7] text-[#C88410] mb-8 text-xs font-mono font-bold tracking-wider uppercase">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
              </div>
              <span>NEXT-GEN AI STUDY OPERATING SYSTEM</span>
            </div>

            <h1 className="animate-fadeInUp delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.06] mb-6 font-display text-[#1A1D1E]">
              One Platform.<br />
              <span className="text-[#FAA114]">Every Exam.</span><br />
              Infinite Mastery.
            </h1>

            <p className="animate-fadeInUp delay-200 text-base md:text-lg text-[#66625D] max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Unifying competitive exams, university subjects, and document intelligence into one cohesive, personalized AI workspace for 500 million Indian learners.
            </p>

            <div className="animate-fadeInUp delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={() => openAuth('signup')}
                className="w-full sm:w-auto px-8 py-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black rounded-xl flex items-center justify-center gap-3 shadow-md transition-all active:scale-[0.98] text-base"
              >
                Start Free Workspace
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="animate-fadeInUp delay-400 border-t border-[#E5E2D9] pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[#66625D]">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#1A1D1E] font-display">50,000+</div>
                <div className="text-xs font-semibold text-[#66625D] mt-1">Active Aspirants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#FAA114] font-display">120+</div>
                <div className="text-xs font-semibold text-[#66625D] mt-1">Exams Supported</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#1A1D1E] font-display">2.4M+</div>
                <div className="text-xs font-semibold text-[#66625D] mt-1">Quizzes Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-[#22C55E] font-display">98.4%</div>
                <div className="text-xs font-semibold text-[#66625D] mt-1">Score Calibration</div>
              </div>
            </div>

          </div>
        </section>



        {/* ═══════════ ALL MAJOR INDIAN EXAMINATIONS ═══════════ */}
        <RevealSection>
          <section id="exams" className="px-6 md:px-12 py-20 relative bg-[#F5F4F0] border-y border-[#E5E2D9]">
            <div className="max-w-7xl mx-auto space-y-12">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <div className="pill-badge">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]"></span>
                    </div>
                    <span>TARGET EXAMINATIONS</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A1D1E] font-display">
                    Target Examinations
                  </h2>
                  <p className="text-[#66625D] text-sm md:text-base max-w-xl">
                    Dedicated CBT environments, curated model test papers, authentic past-year questions, and adaptive study roadmaps for every national target.
                  </p>
                </div>

                <div className="w-full md:w-80">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Search exam, category, or tag..."
                      value={heroExamSearch}
                      onChange={(e) => setHeroExamSearch(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] placeholder-[#94A3B8] focus:outline-none focus:border-[#FAA114] transition-colors"
                    />
                    <Search className="w-4 h-4 text-[#66625D] absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { id: 'all', label: 'All Exams (9)' },
                  { id: 'defence', label: 'Defence (AFCAT, CDS, NDA)' },
                  { id: 'engineering', label: 'Engineering (JEE, GATE)' },
                  { id: 'medical', label: 'Medical (NEET UG)' },
                  { id: 'civil', label: 'Civil Services (UPSC CSE)' },
                  { id: 'aptitude', label: 'Aptitude & MBA (SSC, CAT)' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setHeroExamFilter(pill.id as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      heroExamFilter === pill.id
                        ? 'bg-[#1A1D1E] text-[#FAFAF8] shadow-sm'
                        : 'bg-white text-[#66625D] hover:text-[#1A1D1E] border border-[#E5E2D9]'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map((exam) => {
                  const Icon = exam.icon;
                  const info = examHubDetails[exam.id];
                  return (
                    <div
                      key={exam.id}
                      onClick={() => openExamWorkspace(exam.id)}
                      className="light-card light-card-hover p-6 rounded-3xl cursor-pointer group flex flex-col justify-between space-y-6 relative overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div 
                            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${exam.color}15`, border: `1px solid ${exam.color}30` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: exam.color }} />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#F5F4F0] border border-[#E5E2D9] text-[#66625D]">
                            {exam.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-[#1A1D1E] font-display group-hover:text-[#FAA114] transition-colors">
                            {exam.name}
                          </h3>
                          <p className="text-xs text-[#66625D] mt-1 font-mono">
                            {exam.candidates} Aspirants • {info?.mocks || 'Full Mock Series'}
                          </p>
                        </div>

                        <p className="text-xs text-[#66625D] line-clamp-2 leading-relaxed">
                          {info?.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {info?.features.slice(0, 3).map((f, i) => (
                            <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F5F4F0] text-[#66625D] border border-[#E5E2D9]">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between text-xs font-bold text-[#FAA114] group-hover:text-[#E8940F]">
                        <span>Launch CBT Engine</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        </RevealSection>

        {/* ═══════════ CORE FEATURES BENTO GRID ═══════════ */}
        <RevealSection>
          <section id="features" className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <div className="pill-badge">
                <span>✦ ARCHITECTURE & MODULES</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A1D1E] font-display">
                Every tool you need to pass faster.
              </h2>
              <p className="text-[#66625D] text-sm md:text-base max-w-xl mx-auto">
                Six interconnected AI modules working together to transform raw syllabus into deep conceptual retention.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={i} 
                    onClick={() => triggerLoadingState(feature.tabId || 'dashboard')}
                    className="light-card light-card-hover p-8 rounded-3xl space-y-5 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: feature.color }} />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#F5F4F0] border border-[#E5E2D9] text-[#66625D]">
                          {feature.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#1A1D1E] font-display group-hover:text-[#FAA114] transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-[#66625D] leading-relaxed font-normal">
                        {feature.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E2D9] flex items-center gap-2 text-xs font-bold text-[#FAA114]">
                      <span>Launch {feature.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ THREE STEPS TO MASTERY ═══════════ */}
        <RevealSection>
          <section className="px-6 md:px-12 py-20 bg-[#F5F4F0] border-y border-[#E5E2D9]">
            <div className="max-w-6xl mx-auto space-y-16">
              
              <div className="text-center space-y-3">
                <div className="pill-badge">
                  <span>✦ SIMPLE 3-STEP WORKFLOW</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A1D1E] font-display">
                  Three Steps to Mastery
                </h2>
                <p className="text-[#66625D] text-sm md:text-base max-w-lg mx-auto">
                  A frictionless transition from chaotic preparation to structured, algorithmic confidence.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Pick Target & Timeline',
                    description: 'Select your target examination. Tejas automatically maps the exact official syllabus and generates your daily study capacity timetable.',
                    icon: Target,
                  },
                  {
                    step: '02',
                    title: 'Active Recall Practice',
                    description: 'Ingest notes or textbooks. The AI quiz engine breaks down concepts into targeted drills, live simulations, and spaced review cards.',
                    icon: Brain,
                  },
                  {
                    step: '03',
                    title: 'Rank Prediction & Exam Day',
                    description: 'Take full-length CBT papers in authentic CDAC windows. Receive precision cutoff percentiles and weak-area surgery before the real exam.',
                    icon: Award,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="light-card p-8 rounded-3xl space-y-4 text-center relative group">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF3E6] border border-[#E8D5B7] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-[#FAA114]" />
                      </div>
                      <div className="text-xs font-mono font-bold text-[#C88410] tracking-widest uppercase">STEP {item.step}</div>
                      <h3 className="text-xl font-bold text-[#1A1D1E] font-display">{item.title}</h3>
                      <p className="text-sm text-[#66625D] leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        </RevealSection>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <RevealSection>
          <section id="testimonials" className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <div className="pill-badge">
                <span>✦ VERIFIED RANKERS</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A1D1E] font-display">
                Loved by Top Rankers
              </h2>
              <p className="text-[#66625D] text-sm md:text-base max-w-lg mx-auto">
                Real aspirants who transformed their preparation discipline and cleared their dream cutoffs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="light-card p-8 rounded-3xl space-y-6 flex flex-col justify-between relative group">
                  <Quote className="w-8 h-8 text-[#FAA114]/20 absolute top-6 right-6" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#FAF3E6] border border-[#E8D5B7] flex items-center justify-center text-sm font-extrabold text-[#C88410] font-display">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-base font-bold text-[#1A1D1E]">{t.name}</div>
                        <div className="text-xs text-[#FAA114] font-mono font-semibold">{t.role}</div>
                      </div>
                    </div>

                    <p className="text-sm text-[#66625D] leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E2D9] flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-[#FAA114] text-[#FAA114]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F5F4F0] text-[#66625D] border border-[#E5E2D9]">
                      {t.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ PRICING TIERS ═══════════ */}
        <RevealSection>
          <section id="pricing" className="px-6 md:px-12 py-20 bg-[#F5F4F0] border-t border-[#E5E2D9]">
            <div className="max-w-5xl mx-auto space-y-16">
              <div className="text-center space-y-3">
                <div className="pill-badge">
                  <span>✦ TRANSPARENT MEMBERSHIP</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A1D1E] font-display">
                  Plans That Scale With Your Prep
                </h2>
                <p className="text-[#66625D] text-sm md:text-base max-w-lg mx-auto">
                  Every serious aspirant deserves world-class AI preparation tools at an affordable price.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                <div className="light-card p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#66625D] uppercase">FREE LEARNER</span>
                      <div className="text-5xl font-black text-[#1A1D1E] font-display mt-2">
                        ₹0 <span className="text-sm font-medium text-[#66625D]">/ month</span>
                      </div>
                      <p className="text-xs text-[#66625D] mt-2">Essential study tools for getting started.</p>
                    </div>

                    <ul className="space-y-3">
                      {[
                        '3 AI quiz generations daily',
                        'Basic exam syllabus roadmaps',
                        'Past 30-day performance tracking',
                        'Official exam pattern guides',
                        'Community forum access'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-[#66625D]">
                          <CheckCircle className="w-4 h-4 text-[#FAA114] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => openAuth('signup')}
                    className="w-full py-4 border border-[#E5E2D9] hover:bg-[#F5F4F0] text-[#1A1D1E] font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
                  >
                    Start Free Plan
                  </button>
                </div>

                <div className="light-card p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-8 border-2 border-[#FAA114] relative shadow-md">
                  <div className="absolute -top-3.5 right-8 bg-[#FAA114] text-[#1A1D1E] text-[10px] font-extrabold font-mono px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    ✦ RECOMMENDED
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#FAA114] uppercase">ELITE PREMIUM</span>
                      <div className="text-5xl font-black text-[#1A1D1E] font-display mt-2">
                        ₹499 <span className="text-sm font-medium text-[#66625D]">/ month</span>
                      </div>
                      <p className="text-xs text-[#66625D] mt-2">For dedicated aspirants targeting top AIR ranks.</p>
                    </div>

                    <ul className="space-y-3">
                      {[
                        'Unlimited GenAI quiz generations',
                        'Full PDF & textbook split-pane ingestion',
                        '15+ Official CDAC CBT exam simulations',
                        'FSRS automatic spaced recall sync',
                        'Concept mastery weak-point surgery',
                        'Priority neural processing speed',
                        'All future exam hubs included'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-[#1A1D1E] font-medium">
                          <CheckCircle className="w-4 h-4 text-[#FAA114] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => openAuth('signup')}
                    className="w-full py-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-sm rounded-xl transition-all active:scale-[0.98] shadow-sm"
                  >
                    Get Elite Access →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ FINAL CALL TO ACTION (DARK CHARCOAL #262A2B) ═══════════ */}
        <RevealSection>
          <section className="px-6 md:px-12 py-20 md:py-24 relative">
            <div className="max-w-5xl mx-auto dark-container p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  Ready to Transform Your Preparation?
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Join over 50,000 aspirants who are preparing with algorithmic precision and daily clarity.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => { setAuthMode('signup'); resetAuthState(); triggerLoadingState('auth'); }}
                    className="w-full sm:w-auto px-10 py-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-base rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Start Free Workspace
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="border-t border-[#E5E2D9] py-16 px-6 md:px-12 bg-[#FAFAF8] text-[#66625D]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1A1D1E] text-[#FAFAF8] flex items-center justify-center font-black text-sm">
                  T
                </div>
                <span className="text-xl font-bold text-[#1A1D1E] font-display">Tejas</span>
              </div>
              <p className="text-xs text-[#66625D] leading-relaxed max-w-sm">
                The unified AI study operating system for competitive exams, university subjects, and document intelligence across India.
              </p>
              <div className="text-xs font-mono text-[#94A3B8] pt-2">
                Built for 500 Million Indian Aspirants.
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1A1D1E]">Exams</h4>
              <ul className="space-y-2 text-xs">
                {['AFCAT 2026', 'CDS IMA/OTA', 'NDA & NA', 'JEE Main', 'NEET UG', 'UPSC CSE', 'GATE Engineering', 'CAT MBA'].map((e) => (
                  <li key={e} className="hover:text-[#1A1D1E] cursor-pointer transition-colors">{e}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1A1D1E]">Platform</h4>
              <ul className="space-y-2 text-xs">
                {['CBT Exam Engine', 'Instant AI Quiz', 'Study Planner', 'FSRS Revision', 'PYQ Paper Vault', 'Research Hub'].map((p) => (
                  <li key={p} className="hover:text-[#1A1D1E] cursor-pointer transition-colors">{p}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#1A1D1E]">Company & Legal</h4>
              <ul className="space-y-2 text-xs">
                {['Privacy Policy', 'Terms of Service', 'Security & Safety', 'Contact Support', 'WhatsApp Helpline'].map((l) => (
                  <li key={l} className="hover:text-[#1A1D1E] cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E5E2D9] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#66625D]">
            <p>© 2026 Tejas Learning Technologies. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <span className="text-[#FAA114]">⚡</span> for Bharat
            </p>
          </div>
        </footer>

      </div>
    );
  }

  /* ────────────────────────────────────────
     APP WORKSPACE (INNER APP & HUBS)
     ──────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAF8] text-[#1A1D1E] font-sans">
      <aside className="hidden md:flex w-64 bg-[#FFFFFF] border-r border-[#E5E2D9] flex-col justify-between shrink-0 sticky top-0 h-screen">
        <div>
          <div className="p-6 border-b border-[#E5E2D9] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-[#1A1D1E] font-display">Tejas</span>
              <span className="w-2 h-2 rounded-full bg-[#FAA114]"></span>
            </div>
            <button onClick={() => triggerLoadingState('landing')} className="text-[11px] text-[#FAA114] hover:underline font-mono">
              ← Home
            </button>
          </div>

          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
            {[
              { id: 'afcat', label: 'AFCAT 2026 Hub', icon: Shield },
              { id: 'cds', label: 'CDS (IMA/OTA) Hub', icon: Shield },
              { id: 'nda', label: 'NDA & NA Hub', icon: Shield },
              { id: 'jee_mains', label: 'JEE Main Hub', icon: Zap },
              { id: 'neet', label: 'NEET UG Hub', icon: Award },
              { id: 'upsc', label: 'UPSC CSE Hub', icon: BookOpen },
              { id: 'ssc_cgl', label: 'SSC CGL Hub', icon: FileText },
              { id: 'gate', label: 'GATE Engine', icon: Sparkles },
              { id: 'cat', label: 'CAT Engine', icon: TrendingUp },
              { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
              { id: 'planner', label: 'Study Planner', icon: Calendar },
              { id: 'explorer', label: 'Exam Explorer', icon: Search },
              { id: 'learning', label: 'Learning Hub', icon: BookMarked },
              { id: 'pdf', label: 'PDF Workspace', icon: FileText },
              { id: 'revision', label: 'Revision (FSRS)', icon: RotateCcw },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'profile', label: 'Profile', icon: User },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => triggerLoadingState(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150 ${
                    isActive 
                      ? 'bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7] font-bold' 
                      : 'text-[#66625D] hover:bg-[#F5F4F0] hover:text-[#1A1D1E]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#E5E2D9]">
          <button
            onClick={() => triggerLoadingState('afcat')}
            className="w-full py-3 px-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-95 text-xs"
          >
            <Plus className="w-4 h-4" />
            Instant AI Quiz
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <header className="h-16 border-b border-[#E5E2D9] px-6 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3 relative">
            <span className="text-xs font-medium text-[#66625D]">Current Target:</span>
            <div className="relative">
              <button 
                onClick={() => setTargetSwitcherOpen(!targetSwitcherOpen)}
                className="px-3.5 py-1 bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7] text-xs font-bold rounded-full hover:bg-[#F5E8D0] transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>
                  {activeTab === 'afcat' && 'AFCAT 2026 (Air Force)'}
                  {activeTab === 'cds' && 'CDS 2026 (IMA / OTA)'}
                  {activeTab === 'nda' && 'NDA & NA 2026 (Defence)'}
                  {activeTab === 'jee_mains' && 'JEE Main 2026 (Engineering)'}
                  {activeTab === 'neet' && 'NEET UG 2026 (Medical)'}
                  {activeTab === 'upsc' && 'UPSC CSE 2026 (Civil Services)'}
                  {activeTab === 'ssc_cgl' && 'SSC CGL 2026 (Staff Selection)'}
                  {activeTab === 'gate' && 'GATE 2026 (Engineering Core)'}
                  {activeTab === 'cat' && 'CAT 2026 (IIM Management)'}
                  {!['afcat','cds','nda','jee_mains','neet','upsc','ssc_cgl','gate','cat'].includes(activeTab) && 'Switch Exam'}
                </span>
                <span className="text-[10px] text-[#C88410]">▼</span>
              </button>

              {targetSwitcherOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E5E2D9] rounded-2xl shadow-xl z-50 p-2 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#66625D] px-3 py-1">
                    Select Target Course Room
                  </div>
                  {[
                    { id: 'gate', label: 'GATE 2026 (6 Streams)' },
                    { id: 'afcat', label: 'AFCAT 2026 (Air Force)' },
                    { id: 'cds', label: 'CDS 2026 (IMA/OTA)' },
                    { id: 'nda', label: 'NDA & NA 2026 (Defence)' },
                    { id: 'jee_mains', label: 'JEE Main 2026' },
                    { id: 'neet', label: 'NEET UG 2026' },
                    { id: 'upsc', label: 'UPSC CSE 2026' },
                    { id: 'ssc_cgl', label: 'SSC CGL 2026' },
                    { id: 'cat', label: 'CAT 2026 (IIM)' },
                  ].map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => { setTargetSwitcherOpen(false); triggerLoadingState(ex.id); }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition ${
                        activeTab === ex.id ? 'bg-[#FAF3E6] text-[#C88410] font-bold' : 'text-[#1A1D1E] hover:bg-[#F5F4F0]'
                      }`}
                    >
                      {ex.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => triggerLoadingState('landing')} className="text-xs font-bold text-[#FAA114] hover:underline">
              ✦ Landing Page
            </button>
          </div>
        </header>

        {loading ? (
          <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
            <div className="max-w-xl mx-auto w-full space-y-4">
              <div className="h-8 w-48 shimmer-placeholder rounded-xl"></div>
              <div className="h-4 w-full shimmer-placeholder rounded-lg"></div>
              <div className="h-4 w-5/6 shimmer-placeholder rounded-lg"></div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 md:p-8">
            {/* 9 National Examination Hubs */}
            {activeTab === 'afcat' && <AfcatHub />}
            {activeTab === 'cds' && <CdsHub />}
            {activeTab === 'nda' && <NdaHub />}
            {activeTab === 'jee_mains' && <JeeMainsHub />}
            {activeTab === 'neet' && <NeetHub />}
            {activeTab === 'upsc' && <UpscHub />}
            {activeTab === 'ssc_cgl' && <SscCglHub />}
            {activeTab === 'gate' && <GateHub />}
            {activeTab === 'cat' && <CatHub />}

            {/* 8 Core Platform Modules */}
            {activeTab === 'dashboard' && (
              <DashboardView
                onNavigateExam={openExamWorkspace}
                onNavigateTab={triggerLoadingState}
                candidateName={profileFullName}
                targetExamId={profileTargetExamId}
              />
            )}
            {activeTab === 'planner' && (
              <StudyPlannerView
                onNavigateExam={openExamWorkspace}
                targetExamId={profileTargetExamId}
              />
            )}
            {activeTab === 'explorer' && (
              <ExamExplorerView
                onNavigateExam={openExamWorkspace}
              />
            )}
            {activeTab === 'learning' && (
              <LearningHubView
                onNavigateExam={openExamWorkspace}
              />
            )}
            {activeTab === 'pdf' && (
              <PdfWorkspaceView />
            )}
            {activeTab === 'revision' && (
              <RevisionFsrsView />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsRadarView
                onNavigateExam={openExamWorkspace}
                targetExamId={profileTargetExamId}
              />
            )}
            {activeTab === 'profile' && (
              <ProfileSettingsView
                onLogout={() => {
                  try {
                    localStorage.removeItem('tejas_is_logged_in');
                  } catch (e) {}
                  setIsLoggedIn(false);
                  triggerLoadingState('landing');
                }}
                onTargetExamChanged={(newExam) => {
                  setProfileTargetExamId(newExam);
                }}
                initialProfile={{
                  fullName: profileFullName,
                  email: authEmail || 'priya.sharma@example.com',
                  targetExam: profileTargetExamId,
                  targetYear: profileTargetYear,
                  dailyGoal: profileGoal,
                  phone: profilePhoneNumber,
                  state: profileState,
                  prepStatus: profilePrepStatus
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* ═══════════ AUTHENTICATION & TARGET SPECIALIZATION MODAL ═══════════ */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E5E2D9] my-8 animate-fadeInUp">
            
            {/* Modal Header */}
            <div className="bg-[#1A1D1E] text-white p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#FAA114] uppercase">
                    TEJAS PREPARATION SUITE 2026
                  </span>
                  <h3 className="text-xl font-black mt-1">
                    {authMode === 'signup' 
                      ? (signupStep === 1 ? 'Create Your Free Account' : 'Verify Email Address')
                      : 'Sign In to Your Workspace'
                    }
                  </h3>
                </div>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <X className="w-5 h-5 text-white/80" />
                </button>
              </div>

              {/* Mode Toggle (Step 1 only) */}
              {signupStep === 1 && (
                <div className="flex bg-white/10 p-1 rounded-xl mt-4">
                  <button
                    onClick={() => { setAuthMode('signup'); resetAuthState(); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                      authMode === 'signup' ? 'bg-[#FAA114] text-[#1A1D1E]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Register Free
                  </button>
                  <button
                    onClick={() => { setAuthMode('login'); resetAuthState(); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                      authMode === 'login' ? 'bg-[#FAA114] text-[#1A1D1E]' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Error and Notice Banners */}
            {errorMsg && (
              <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {otpSuccessMsg && signupStep === 2 && (
              <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{otpSuccessMsg}</span>
              </div>
            )}

            {/* Modal Body: STEP 1 (Inputs) */}
            {signupStep === 1 ? (
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A1D1E]">Full Name</label>
                    <input
                      type="text"
                      value={authFullName}
                      onChange={(e) => setAuthFullName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 bg-[#F5F4F0] border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A1D1E]">Email Address</label>
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#F5F4F0] border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1A1D1E]">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 bg-[#F5F4F0] border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#66625D] hover:text-[#1A1D1E]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Target Exam Selection */}
                <div className="space-y-2.5 pt-2 border-t border-[#E5E2D9]">
                  <label className="text-xs font-bold text-[#1A1D1E] flex items-center justify-between">
                    <span>Target Examination</span>
                    <span className="text-[10px] text-[#FAA114] font-mono font-bold">Directs to Course</span>
                  </label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'gate', label: 'GATE 2026' },
                      { id: 'afcat', label: 'AFCAT' },
                      { id: 'cds', label: 'CDS' },
                      { id: 'nda', label: 'NDA' },
                      { id: 'jee', label: 'JEE Main' },
                      { id: 'neet', label: 'NEET UG' },
                      { id: 'upsc', label: 'UPSC' },
                      { id: 'ssc', label: 'SSC CGL' },
                      { id: 'cat', label: 'CAT' },
                    ].map(ex => (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => setAuthTargetExam(ex.id)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition ${
                          authTargetExam === ex.id
                            ? 'bg-[#1A1D1E] text-white border-[#1A1D1E] shadow-sm'
                            : 'bg-[#F5F4F0] text-[#66625D] border-[#E5E2D9] hover:bg-white'
                        }`}
                      >
                        {ex.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* GATE Branch Specialization Selection */}
                {authTargetExam === 'gate' && (
                  <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl space-y-2">
                    <span className="text-xs font-bold text-purple-950 block">Select Engineering Stream:</span>
                    <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
                      {[
                        { id: 'cs', label: 'CS / IT' },
                        { id: 'da', label: 'Data Science & AI' },
                        { id: 'me', label: 'Mechanical' },
                        { id: 'ce', label: 'Civil' },
                        { id: 'ee', label: 'Electrical' },
                        { id: 'ec', label: 'Electronics' },
                      ].map(br => (
                        <button
                          key={br.id}
                          type="button"
                          onClick={() => setAuthGateBranch(br.id)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                            authGateBranch === br.id
                              ? 'bg-purple-900 text-white border-purple-900'
                              : 'bg-white text-purple-800 border-purple-200 hover:bg-purple-100'
                          }`}
                        >
                          {br.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Submit */}
                <button
                  type="button"
                  onClick={() => {
                    if (authMode === 'signup') {
                      handleInitiateSignup();
                    } else {
                      handleLoginSubmit();
                    }
                  }}
                  className="w-full py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>
                    {authMode === 'signup' 
                      ? 'Continue to Verification →' 
                      : `Sign In to ${authTargetExam.toUpperCase()} Workspace →`
                    }
                  </span>
                </button>
              </div>
            ) : (
              /* Modal Body: STEP 2 (OTP Verification) */
              <div className="p-6 space-y-5 animate-fadeIn">
                <div className="text-center space-y-1">
                  <span className="text-xs text-[#66625D]">Enter the 6-digit verification code sent to</span>
                  <div className="text-xs font-bold text-[#1A1D1E]">{authEmail}</div>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Enter 6-Digit OTP"
                    className="w-full px-4 py-3 text-center tracking-[0.5em] font-mono text-lg font-black bg-[#F5F4F0] border-2 border-[#E5E2D9] rounded-2xl text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]"
                    autoFocus
                  />
                  {otpError && (
                    <p className="text-center text-xs text-red-600 font-bold">{otpError}</p>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setOtpCode('123456')}
                    className="text-[11px] text-[#C88410] font-mono font-bold hover:underline bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E8D5B7]"
                  >
                    ⚡ Quick Demo: Auto-Fill OTP (123456)
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-[#66625D]">
                  {otpTimer > 0 ? (
                    <span>Resend OTP in <strong className="font-mono text-[#1A1D1E]">{otpTimer}s</strong></span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setOtpTimer(30); setOtpSuccessMsg('New OTP code sent!'); }}
                      className="text-[#FAA114] font-bold hover:underline"
                    >
                      Resend Verification Code
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSignupStep(1)}
                    className="hover:underline text-[#66625D]"
                  >
                    Change Email
                  </button>
                </div>

                <button
                  type="button"
                  disabled={isVerifyingOtp}
                  onClick={handleVerifyOtpAndComplete}
                  className="w-full py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isVerifyingOtp ? (
                    <span>Verifying Code & Initializing Course...</span>
                  ) : (
                    <span>Verify & Enter {authTargetExam.toUpperCase()} Workspace →</span>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
