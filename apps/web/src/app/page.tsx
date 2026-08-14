'use client';

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
  Play,
  RotateCcw,
  Zap,
  Brain,
  Target,
  Clock,
  BarChart3,
  Shield,
  Star,
  GraduationCap,
  Flame,
  Menu,
  X,
  ExternalLink,
  ArrowUpRight,
  Quote,
  Users,
  Lock,
  Mail,
  RefreshCw,
  Check,
  Compass,
  Cpu,
  Bookmark
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
   ANIMATED COUNTER COMPONENT
   ────────────────────────────────────────────────── */
function AnimatedCounter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-slate-400 mt-2 font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   EXAM CARD DATA
   ────────────────────────────────────────────────── */
const examCategories = [
  { id: 'afcat', name: 'AFCAT 2026 (Air Force)', category: 'defence', icon: Shield, candidates: '5L+', color: '#f59e0b', badge: 'AIR FORCE', tag: 'CBT Suite Ready' },
  { id: 'cds', name: 'CDS (IMA / OTA)', category: 'defence', icon: Shield, candidates: '6L+', color: '#10b981', badge: 'DEFENCE', tag: 'Official CDAC' },
  { id: 'nda', name: 'NDA & NA (UPSC)', category: 'defence', icon: Shield, candidates: '8L+', color: '#f59e0b', badge: 'UPSC DEFENCE', tag: 'Maths & GAT' },
  { id: 'jee_mains', name: 'JEE Main & Advanced', category: 'engineering', icon: Zap, candidates: '25L+', color: '#38bdf8', badge: 'IIT / NTA', tag: 'Physics & Chem' },
  { id: 'neet', name: 'NEET UG Medical', category: 'medical', icon: GraduationCap, candidates: '21L+', color: '#10b981', badge: 'MEDICAL / NTA', tag: 'NCERT Ingestion' },
  { id: 'upsc', name: 'UPSC CSE (IAS / IPS)', category: 'civil', icon: BookOpen, candidates: '12L+', color: '#a855f7', badge: 'CIVIL SERVICES', tag: 'Prelims + Mains' },
  { id: 'ssc_cgl', name: 'SSC CGL Tier 1 & 2', category: 'aptitude', icon: Target, candidates: '30L+', color: '#f97316', badge: 'GOVERNMENT', tag: 'Speed Math' },
  { id: 'gate', name: 'GATE (IISc / IITs)', category: 'engineering', icon: Brain, candidates: '9L+', color: '#6366f1', badge: 'ENGINEERING', tag: 'NAT & MSQ' },
  { id: 'cat', name: 'CAT (IIMs B-Schools)', category: 'aptitude', icon: BarChart3, candidates: '3.5L+', color: '#ec4899', badge: 'MANAGEMENT', tag: 'DILR & VARC' },
];

const examHubDetails: Record<string, {
  badge: string;
  title: string;
  description: string;
  mocks: string;
  features: string[];
  emoji: string;
  color: string;
}> = {
  afcat: {
    badge: '✈️ AFCAT 2026 MENTOR EDITION',
    title: 'Air Force Common Admission Test',
    description: 'Complete mentor-led AFCAT hub featuring comprehensive syllabus roadmaps, 15 full-length model papers, authentic PYQ PDFs (2018-2025), subject video playlists, and official AFCAT CBT quiz simulations.',
    mocks: '15 Mocks',
    features: ['Topic Tests', 'Full Mocks', 'PYQ Papers', 'Daily Goals', 'AI Revision Plan', 'AI Explainer', 'Sectional Limits', 'Readiness Report'],
    emoji: '✈️',
    color: '#f59e0b'
  },
  cds: {
    badge: '🛡️ CDS PREPARATION HUB',
    title: 'Combined Defence Services (IMA / OTA / AFA)',
    description: 'Access complete general knowledge maps, english vocabulary boosters, full-length OTA mock tests, and historical papers structured to simulate the actual UPSC CDAC exam environment.',
    mocks: '12 Mocks',
    features: ['GK Question Bank', 'English Vocab Boosters', 'OTA Mock Tests', 'FSRS Spaced Repetition', 'CDS Performance Ranker'],
    emoji: '🛡️',
    color: '#10b981'
  },
  nda: {
    badge: '⚔️ NDA & NA PREPARATION PLATFORM',
    title: 'National Defence Academy & Naval Academy',
    description: 'Syllabus alignment for UPSC NDA Mathematics and General Ability Test. Train with dynamic formula cheatsheets, topic practice drills, and full-length CBT model papers.',
    mocks: '10 Mocks',
    features: ['Maths Concepts Explorer', 'GAT Practice Drills', 'Formula Cheatsheets', 'Daily Flashcards', 'Performance Tracker'],
    emoji: '⚔️',
    color: '#f59e0b'
  },
  jee_mains: {
    badge: '⚛️ JEE MAIN & ADVANCED CORE ENGINE',
    title: 'Joint Entrance Examination',
    description: 'Master engineering physics, complex chemistry reaction pipelines, and logic-heavy mathematics matrices. Access step-by-step video solvers and AI-guided micro challenges.',
    mocks: '20 Mocks',
    features: ['Numerical Solvers', 'Mock Test Engine', 'Physics Visualizers', 'IIT Syllabus Mapping', 'Chapter-wise Quizzes'],
    emoji: '⚛️',
    color: '#38bdf8'
  },
  neet: {
    badge: '🩺 NEET UG MEDICAL CORE ENGINE',
    title: 'National Eligibility cum Entrance Test',
    description: 'NCERT biology interactive mapping, high-yield organic/inorganic chemistry formula builders, and physics conceptual drills designed to scale active recall.',
    mocks: '18 Mocks',
    features: ['NCERT Map Engine', 'Biology Flashcards', 'Chemistry Drills', 'Weak-Topic Focus', 'CBT Test Simulator'],
    emoji: '🩺',
    color: '#10b981'
  },
  upsc: {
    badge: '🏛️ UPSC CIVIL SERVICES EXAM HUB',
    title: 'UPSC CSE (IAS / IPS / IFS)',
    description: 'Deep Indian Polity analysis, modern history visual timelines, and weekly current affairs summaries. Practice mains answer generation with instant AI logic feedback.',
    mocks: '10 Mocks',
    features: ['Polity Timelines', 'Mains Answer Generator', 'CSAT Practice Portal', 'Current Affairs Hub', 'Syllabus Accordion'],
    emoji: '🏛️',
    color: '#a855f7'
  },
  ssc_cgl: {
    badge: '📋 SSC CGL TIER 1 & 2 ENGINE',
    title: 'Staff Selection Commission CGL',
    description: 'Optimize quantitative aptitude speed, logical reasoning sequence solving, and general awareness memory logs. Take daily speed-math sprints and reasoning logical sequence drills.',
    mocks: '25 Mocks',
    features: ['Speed Math Drills', 'Reasoning Sprints', 'General Awareness Logs', 'Tier 2 Simulators', 'Syllabus Tracker'],
    emoji: '📋',
    color: '#f97316'
  },
  gate: {
    badge: '⚡ GATE ENGINEERING ENGINE',
    title: 'Graduate Aptitude Test in Engineering',
    description: 'Subject-specific core engineering workflows, aptitude shortcuts, and previous-year numerical answer type questions with immediate step explanations.',
    mocks: '15 Mocks',
    features: ['Numerical Answers (NAT)', 'Aptitude Shortcuts', 'Core Topic Workspaces', 'Formula Sheets', 'Dynamic Assessments'],
    emoji: '⚡',
    color: '#6366f1'
  },
  cat: {
    badge: '📊 CAT MBA ENTRANCE PLATFORM',
    title: 'Common Admission Test (IIMs)',
    description: 'High-difficulty Data Interpretation & Logical Reasoning (DILR) caselets, Quantitative Aptitude practice sets, and Verbal Ability reading comprehensions.',
    mocks: '12 Mocks',
    features: ['DILR Caselets', 'QA Speed Booster', 'VARC Comprehensions', 'Percentile Predictor', 'Adaptive Practice Sets'],
    emoji: '📊',
    color: '#ec4899'
  }
};

const features = [
  {
    icon: Sparkles,
    title: 'AI Instant Quiz Engine',
    description: 'Paste any topic, upload a textbook PDF, or drop a YouTube link — generates authentic exam-pattern questions with instant step explanations.',
    tag: 'GENAI ENGINE',
    color: '#f59e0b'
  },
  {
    icon: Calendar,
    title: 'Adaptive Capacity Planner',
    description: 'Personalized daily study schedules that auto-rebalance when you miss sessions or when your target exam date draws closer.',
    tag: 'DYNAMIC SCHEDULER',
    color: '#38bdf8'
  },
  {
    icon: RotateCcw,
    title: 'FSRS Spaced Repetition',
    description: 'Scientific active recall scheduling based on the Free Spaced Repetition Scheduler algorithm — eliminates forgetfulness forever.',
    tag: 'RETENTION ALGORITHM',
    color: '#10b981'
  },
  {
    icon: FileText,
    title: 'Split-Pane Research Hub',
    description: 'Read document PDFs on the left, highlight complex formulas, and chat with your dedicated AI tutor on the right in real time.',
    tag: 'INTELLIGENT WORKSPACE',
    color: '#a855f7'
  },
  {
    icon: TrendingUp,
    title: 'Concept Mastery Heatmap',
    description: 'Real-time detection of weak topics, predicted percentile calibration, and tailored recommendations that fix knowledge gaps.',
    tag: 'CALIBRATION RADAR',
    color: '#f97316'
  },
  {
    icon: Shield,
    title: 'Official CBT Exam Window',
    description: 'Authentic CDAC and NTA exam simulation interface featuring sectional timers, question palettes, and instant post-exam rank reports.',
    tag: 'REAL SIMULATION',
    color: '#6366f1'
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

/* ──────────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ────────────────────────────────────────────────── */
export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState('landing');
  const [previewExam, setPreviewExam] = useState('afcat');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Interactive Hero Console Demo states
  const [heroConsoleTab, setHeroConsoleTab] = useState<'cbt' | 'quiz' | 'planner' | 'fsrs' | 'mastery'>('cbt');
  const [heroExamFilter, setHeroExamFilter] = useState<'all' | 'defence' | 'engineering' | 'medical' | 'civil' | 'aptitude'>('all');
  const [heroExamSearch, setHeroExamSearch] = useState('');
  const [heroQuizOption, setHeroQuizOption] = useState<string | null>(null);
  const [heroQuizSubmitted, setHeroQuizSubmitted] = useState(false);
  const [heroPlannerHours, setHeroPlannerHours] = useState(4);
  const [heroFlashcardFlipped, setHeroFlashcardFlipped] = useState(false);
  const [heroPromptInput, setHeroPromptInput] = useState('');

  // Auth custom fields
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [authFullName, setAuthFullName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [signupToken, setSignupToken] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpSuccessMsg, setOtpSuccessMsg] = useState<string | null>(null);
  const [passRulesValid, setPassRulesValid] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  });

  // Reset auth error and state fields
  const resetAuthState = () => {
    setErrorMsg(null);
    setOtpError(null);
    setOtpSuccessMsg(null);
    setOtpSent(false);
    setOtpCode('');
    setSignupStep(1);
    setSignupToken(null);
    setAuthPassword('');
    setAuthConfirmPassword('');
  };

  // Run dynamic check for strong password criteria
  useEffect(() => {
    setPassRulesValid({
      length: authPassword.length >= 8,
      upper: /[A-Z]/.test(authPassword),
      lower: /[a-z]/.test(authPassword),
      number: /\d/.test(authPassword),
      special: /[!@#$%^&*()_+\-=\[\]{};':",./<>?]/.test(authPassword)
    });
  }, [authPassword]);

  const handleSignupInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setOtpError(null);
    setOtpSuccessMsg(null);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/signup/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, fullName: authFullName })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to send OTP.');
      }
      setOtpSent(true);
      setOtpSuccessMsg('A 6-digit verification code has been sent to your email.');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setOtpError(null);
    if (otpCode.length !== 6 || !/^\d+$/.test(otpCode)) {
      setOtpError('OTP must be a 6-digit number.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/signup/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, otp: otpCode })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'OTP verification failed.');
      }
      setSignupToken(data.signupToken);
      setSignupStep(2);
      setOtpSent(false);
      setOtpCode('');
      setOtpSuccessMsg('Email verified successfully! Please set up your password.');
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (authPassword !== authConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const isAllValid = Object.values(passRulesValid).every(Boolean);
    if (!isAllValid) {
      setErrorMsg('Please satisfy all password strength requirements.');
      return;
    }

    if (!signupToken) {
      setErrorMsg('Signup session has expired. Please verify your email again.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/signup/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signupToken, password: authPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Signup completion failed.');
      }
      localStorage.setItem('token', data.token);
      setUser({
        name: data.user.fullName,
        email: data.user.email,
        role: data.user.role
      });
      setProfileFullName(data.user.fullName);
      setIsLoggedIn(true);
      setActiveTab('afcat');
      resetAuthState();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg(null);
    setOtpError(null);
    setOtpSuccessMsg(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/signup/resend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to resend OTP.');
      }
      setOtpSuccessMsg('A new OTP has been sent to your email.');
    } catch (err: any) {
      setOtpError(err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail, password: authPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === 'EmailNotVerified') {
          await fetch(`${API_BASE_URL}/api/v1/auth/signup/resend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: authEmail })
          });
          setOtpSent(true);
          setOtpSuccessMsg('Your email is not verified yet. We have sent an OTP. Please check your inbox.');
          setLoading(false);
          return;
        }
        throw new Error(data.message || 'Login failed.');
      }
      localStorage.setItem('token', data.token);
      setUser({
        name: data.user.fullName,
        email: data.user.email,
        role: data.user.role
      });
      setProfileFullName(data.user.fullName);
      setIsLoggedIn(true);
      setActiveTab('afcat');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileFullName, setProfileFullName] = useState('Priya Sharma');
  const [profileGoal, setProfileGoal] = useState(60);
  const [profileLanguage, setProfileLanguage] = useState('en');
  const [profilePhoneNumber, setProfilePhoneNumber] = useState('');
  const [profileTargetExamId, setProfileTargetExamId] = useState('');
  const [profileTargetYear, setProfileTargetYear] = useState<any>('');
  const [profileState, setProfileState] = useState('');
  const [profilePrepStatus, setProfilePrepStatus] = useState('');
  const [profileOnboardingCompleted, setProfileOnboardingCompleted] = useState(true);
  const [examsList, setExamsList] = useState<any[]>([]);

  const openExamWorkspace = (examId: string = 'afcat') => {
    setIsLoggedIn(true);
    setProfileOnboardingCompleted(true);
    setProfileTargetExamId(examId);
    triggerLoadingState(examId);
  };

  // Onboarding Wizard states
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [onboardingCategory, setOnboardingCategory] = useState('');
  const [onboardingExamId, setOnboardingExamId] = useState('');
  const [onboardingYear, setOnboardingYear] = useState('2026');
  const [onboardingLanguage, setOnboardingLanguage] = useState('en');
  const [onboardingState, setOnboardingState] = useState('');
  const [onboardingPrepStatus, setOnboardingPrepStatus] = useState('');
  const [onboardingPhoneNumber, setOnboardingPhoneNumber] = useState('');
  const [onboardingGenerating, setOnboardingGenerating] = useState(false);
  const [profileSyncTrigger, setProfileSyncTrigger] = useState(0);

  // Spaced Repetition / Revision states
  const [dueCards, setDueCards] = useState<any[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Admin section dashboard state
  const [user, setUser] = useState({
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'admin'
  });

  const [adminStats, setAdminStats] = useState({
    totalUsers: 1420,
    activePremium: 382,
    totalRevenue: 3816.18,
    totalTokensUsed: 1452000
  });

  const [adminUsers, setAdminUsers] = useState([
    { id: '1', name: 'Priya Sharma', email: 'priya@example.com', role: 'admin', createdAt: '2026-07-01' },
    { id: '2', name: 'Rahul Verma', email: 'rahul@example.com', role: 'free_learner', createdAt: '2026-07-10' },
    { id: '3', name: 'Amit Singh', email: 'amit@example.com', role: 'free_learner', createdAt: '2026-07-11' },
    { id: '4', name: 'Sneha Patel', email: 'sneha@example.com', role: 'free_learner', createdAt: '2026-07-12' }
  ]);

  const [adminSearch, setAdminSearch] = useState('');

  // OAuth redirect token parsing & Session persistence check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        window.history.replaceState({}, document.title, window.location.pathname);
        setActiveTab('afcat');
      } else {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setIsLoggedIn(true);
        }
      }
    }
  }, []);

  const [dashboardOverview, setDashboardOverview] = useState<any>({
    overallAccuracy: 0,
    averageTimeSeconds: 0,
    quizzesCompleted: 0,
    studyTimeMinutes: 0,
    consistencyRating: 0,
    completionRate: 0
  });

  const [dueCardsCount, setDueCardsCount] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${API_BASE_URL}/api/v1/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.fullName) {
          setProfileFullName(data.fullName);
          setProfileGoal(data.dailyStudyGoalMinutes || 60);
          setProfileLanguage(data.preferredLanguage || 'en');
          setProfilePhoneNumber(data.phoneNumber || '');
          setProfileTargetExamId(data.targetExamId || '');
          setProfileTargetYear(data.targetYear || '');
          setProfileState(data.state || '');
          setProfilePrepStatus(data.prepStatus || '');
          setProfileOnboardingCompleted(data.onboardingCompleted || false);
          setUser(prev => ({
            ...prev,
            name: data.fullName
          }));
        }
      })
      .catch(err => console.log('Backend profile sync offline'));

      fetch(`${API_BASE_URL}/api/v1/exams`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExamsList(data);
        }
      })
      .catch(err => console.log('Failed to fetch exams list.'));

      fetch(`${API_BASE_URL}/api/v1/analytics/overview`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.overallAccuracy !== 'undefined') {
          setDashboardOverview(data);
        }
      })
      .catch(err => console.log('Backend analytics overview offline'));

      fetch(`${API_BASE_URL}/api/v1/analytics/insights`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setDueCardsCount(data.cardsDue || 0);
        }
      })
      .catch(err => console.log('Backend insights offline'));
    }
  }, [isLoggedIn, profileSyncTrigger]);

  useEffect(() => {
    if (activeTab === 'revision' && isLoggedIn) {
      fetch(`${API_BASE_URL}/api/v1/revision/due`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDueCards(data);
          setActiveCardIndex(0);
          setShowAnswer(false);
        }
      })
      .catch(err => console.log('Backend revision sync offline'));
    }
  }, [activeTab, isLoggedIn]);

  // Scroll detection for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerLoadingState = (targetTab: string) => {
    setLoading(true);
    setErrorMsg(null);
    setMobileMenuOpen(false);
    setTimeout(() => {
      setLoading(false);
      setActiveTab(targetTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleSaveProfile = () => {
    fetch(`${API_BASE_URL}/api/v1/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({
        fullName: profileFullName,
        dailyStudyGoalMinutes: profileGoal,
        preferredLanguage: profileLanguage,
        phoneNumber: profilePhoneNumber || null,
        targetExamId: profileTargetExamId || null,
        targetYear: profileTargetYear ? parseInt(profileTargetYear, 10) : null,
        state: profileState || null,
        prepStatus: profilePrepStatus || null,
        onboardingCompleted: profileOnboardingCompleted
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.profile) {
        alert('Profile saved to PostgreSQL database!');
        setProfileFullName(data.profile.fullName);
        setProfileGoal(data.profile.dailyStudyGoalMinutes);
        setProfileLanguage(data.profile.preferredLanguage);
        setProfilePhoneNumber(data.profile.phoneNumber || '');
        setProfileTargetExamId(data.profile.targetExamId || '');
        setProfileTargetYear(data.profile.targetYear || '');
        setProfileState(data.profile.state || '');
        setProfilePrepStatus(data.profile.prepStatus || '');
        setProfileOnboardingCompleted(data.profile.onboardingCompleted || false);
        setProfileSyncTrigger(prev => prev + 1);
        setUser(prev => ({
          ...prev,
          name: data.profile.fullName
        }));
      }
    })
    .catch(err => alert('Failed to save profile configuration.'));
  };

  const handleReviewCard = (cardId: string, rating: number) => {
    fetch(`${API_BASE_URL}/api/v1/revision/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({ cardId, rating })
    })
    .then(res => res.json())
    .then(data => {
      setDueCards(prev => prev.filter(c => c.id !== cardId));
      setShowAnswer(false);
      setDueCardsCount(prev => Math.max(0, prev - 1));
    })
    .catch(err => alert('Failed to log review.'));
  };

  const filteredExams = examCategories.filter(exam => {
    const matchesCategory = heroExamFilter === 'all' || exam.category === heroExamFilter;
    const matchesSearch = exam.name.toLowerCase().includes(heroExamSearch.toLowerCase()) || 
                          exam.tag.toLowerCase().includes(heroExamSearch.toLowerCase()) ||
                          exam.id.toLowerCase().includes(heroExamSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* ────────────────────────────────────────
     LANDING PAGE RENDER
     ──────────────────────────────────────── */
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#080a0f] text-[#f1f5f9] font-sans selection:bg-amber-500/30 selection:text-amber-200">

        {/* ═══════════ STICKY LUXURY NAVIGATION ═══════════ */}
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? 'glass-header py-3.5 shadow-2xl shadow-black/60' 
              : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-slate-950 fill-current" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-display">
                  Tejas
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  v2.4
                </span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
              <a href="#demo" className="hover:text-amber-400 transition-colors">Live Console</a>
              <a href="#exams" className="hover:text-amber-400 transition-colors">Exam Hubs</a>
              <a href="#features" className="hover:text-amber-400 transition-colors">AI Capabilities</a>
              <a href="#testimonials" className="hover:text-amber-400 transition-colors">Success Stories</a>
              <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => { setAuthMode('login'); resetAuthState(); triggerLoadingState('auth'); }}
                className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => { setAuthMode('signup'); resetAuthState(); triggerLoadingState('auth'); }}
                className="group relative px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 rounded-xl hover:from-amber-400 hover:to-yellow-300 transition-all active:scale-95 shadow-glow-amber flex items-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden glass-panel border-t border-white/10 mx-4 mt-3 rounded-2xl p-6 space-y-4 shadow-2xl animate-fadeInUp">
              <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-amber-400">Live Console</a>
              <a href="#exams" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-amber-400">Exam Hubs</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-amber-400">AI Capabilities</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-amber-400">Success Stories</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-slate-300 hover:text-amber-400">Pricing</a>
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button onClick={() => { setMobileMenuOpen(false); setAuthMode('login'); resetAuthState(); triggerLoadingState('auth'); }} className="w-full py-3 text-sm font-semibold text-slate-300 bg-white/5 rounded-xl">Sign In</button>
                <button onClick={() => { setMobileMenuOpen(false); setAuthMode('signup'); resetAuthState(); triggerLoadingState('auth'); }} className="w-full py-3 text-sm font-bold bg-amber-500 text-slate-950 rounded-xl">Get Started Free</button>
              </div>
            </div>
          )}
        </header>

        {/* ═══════════ HERO SECTION (COSMIC OBSIDIAN & AMBIENT GLOW) ═══════════ */}
        <section className="ambient-mesh relative pt-32 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
          {/* Subtle Background Grid & Glow Orbs */}
          <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none"></div>
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-80 right-[15%] w-72 h-72 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Top Announcement Badge */}
            <div className="animate-fadeInUp inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-8 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wide uppercase font-mono">✦ NEXT-GEN AI STUDY OPERATING SYSTEM</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </div>

            {/* Main Headline */}
            <h1 className="animate-fadeInUp delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.04] mb-6 font-display text-white">
              Master Any Exam.<br />
              <span className="text-gradient-amber drop-shadow-[0_0_35px_rgba(245,158,11,0.25)]">
                Faster. Smarter. Guaranteed.
              </span>
            </h1>

            {/* Subheading */}
            <p className="animate-fadeInUp delay-200 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Unifying 120+ Indian competitive examinations, university curriculums, and document intelligence into one cohesive, AI-personalized operating system for 500M learners.
            </p>

            {/* Interactive Prompt / Quick Trigger Bar */}
            <div className="animate-fadeInUp delay-300 max-w-2xl mx-auto mb-10">
              <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 border-white/15 focus-within:border-amber-500/50 shadow-2xl transition-all">
                <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <input 
                    type="text"
                    value={heroPromptInput}
                    onChange={(e) => setHeroPromptInput(e.target.value)}
                    placeholder="Try: Generate a 10-question test on AFCAT Reasoning or UPSC Polity..."
                    className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none py-2"
                  />
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById('demo');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    setHeroConsoleTab('quiz');
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-extrabold text-xs tracking-wider rounded-xl transition-all active:scale-95 shadow-glow-amber whitespace-nowrap"
                >
                  ⚡ Try AI Quiz
                </button>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="animate-fadeInUp delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  resetAuthState();
                  triggerLoadingState('auth');
                }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-3 shadow-glow-amber transition-all active:scale-[0.98] text-base"
              >
                Launch Free Workspace
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('demo');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 transition-all text-base border-white/15"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                Live Interactive Demo
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="animate-fadeInUp delay-500 mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white font-display">50,000+</div>
                <div className="text-xs text-slate-400 mt-1">Active Aspirants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-amber-400 font-display">120+</div>
                <div className="text-xs text-slate-400 mt-1">Exams Supported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white font-display">2.4M+</div>
                <div className="text-xs text-slate-400 mt-1">Quizzes Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-400 font-display">98.4%</div>
                <div className="text-xs text-slate-400 mt-1">Score Calibration</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ LIVE INTERACTIVE CONSOLE DEMO (COOL & SMOOTH!) ═══════════ */}
        <section id="demo" className="px-6 md:px-12 py-16 md:py-24 relative">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider font-mono">
                ✦ LIVE INTERACTIVE EXPERIENCE
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                Try The Tejas Engine Right Now
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                No sign-up required to test our core capabilities. Switch between tools below to experience real-time AI learning.
              </p>
            </div>

            {/* Console Frame */}
            <div className="glass-panel rounded-3xl border border-white/15 p-3 md:p-6 shadow-2xl shadow-black/80">
              
              {/* Console Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-white/10 no-scrollbar">
                {[
                  { id: 'cbt', label: '🎯 CBT Exam Console', desc: 'Simulate Live Test' },
                  { id: 'quiz', label: '⚡ Instant AI Quiz', desc: 'Active Questioning' },
                  { id: 'planner', label: '📅 Adaptive Planner', desc: 'Capacity Rebalance' },
                  { id: 'fsrs', label: '🧠 Spaced Recall (FSRS)', desc: 'Ebbinghaus Decay' },
                  { id: 'mastery', label: '📊 Concept Mastery Radar', desc: 'Readiness Heatmap' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setHeroConsoleTab(tab.id as any)}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 flex flex-col items-start gap-0.5 ${
                      heroConsoleTab === tab.id
                        ? 'bg-amber-500 text-slate-950 shadow-glow-amber scale-[1.02]'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-normal ${heroConsoleTab === tab.id ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                      {tab.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* Console Screen Content */}
              <div className="mt-6 bg-[#0c1018] border border-white/10 rounded-2xl p-6 md:p-8 min-h-[420px] flex flex-col justify-between">

                {/* TAB 1: CBT EXAM CONSOLE */}
                {heroConsoleTab === 'cbt' && (
                  <div className="space-y-6 animate-fadeInUp">
                    {/* Header bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
                      <div>
                        <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">AFCAT 2026 OFFICIAL CBT SIMULATOR</div>
                        <h3 className="text-xl font-bold text-white font-display mt-0.5">Section: Reasoning & Military Aptitude Test</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold">
                          <Clock className="w-3.5 h-3.5 animate-pulse" /> 01:58:42 REMAINING
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">+3.0 / -1.0</span>
                      </div>
                    </div>

                    {/* Question body */}
                    <div className="space-y-4">
                      <div className="text-xs text-slate-400 font-mono">Question 1 of 100 • Multiple Choice Question</div>
                      <p className="text-base text-slate-100 font-medium leading-relaxed">
                        In a certain code language, if <strong>&quot;FIGHTER&quot;</strong> is coded as <strong>&quot;HKIJVGT&quot;</strong>, how will the word <strong>&quot;MIRAGE&quot;</strong> be coded in that same system?
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 pt-2">
                        {[
                          { key: 'A', text: 'OKTCIG' },
                          { key: 'B', text: 'OKTCHG' },
                          { key: 'C', text: 'NKTCIH' },
                          { key: 'D', text: 'PKUDIG' },
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setHeroQuizOption(opt.key)}
                            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all flex items-center gap-3 ${
                              heroQuizOption === opt.key
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                              heroQuizOption === opt.key ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-300'
                            }`}>
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> 1 Answered
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-600 ml-2"></span> 99 Unanswered
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => openExamWorkspace('afcat')}
                          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-glow-amber transition-all"
                        >
                          Launch Full 100-Q CBT Engine →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: INSTANT AI QUIZ GENERATOR */}
                {heroConsoleTab === 'quiz' && (
                  <div className="space-y-6 animate-fadeInUp">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <div>
                        <span className="text-xs font-mono text-sky-400 font-bold uppercase">UPSC CSE • INDIAN POLITY & CONSTITUTION</span>
                        <h3 className="text-lg font-bold text-white font-display">Article 32 & Constitutional Remedies</h3>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 font-bold">
                        AI Generated
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-base text-slate-100 font-medium">
                        Which of the following Writs can be issued against private individuals as well as public bodies?
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { key: 'A', text: 'Habeas Corpus', correct: true },
                          { key: 'B', text: 'Mandamus', correct: false },
                          { key: 'C', text: 'Quo-Warranto', correct: false },
                          { key: 'D', text: 'Certiorari', correct: false },
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => {
                              setHeroQuizOption(opt.key);
                              setHeroQuizSubmitted(true);
                            }}
                            className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between ${
                              heroQuizSubmitted
                                ? opt.correct
                                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                                  : heroQuizOption === opt.key
                                  ? 'bg-red-500/20 border-red-400 text-red-200'
                                  : 'bg-white/5 border-white/10 text-slate-500'
                                : heroQuizOption === opt.key
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                                : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold">{opt.key}</span>
                              <span>{opt.text}</span>
                            </div>
                            {heroQuizSubmitted && opt.correct && <Check className="w-5 h-5 text-emerald-400" />}
                          </button>
                        ))}
                      </div>

                      {heroQuizSubmitted && (
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 animate-fadeInUp">
                          <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4" /> AI Explanation
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong>Habeas Corpus</strong> (literally &quot;to have the body of&quot;) can be issued against both public authorities and private individuals who have unlawfully detained a person. Mandamus and Certiorari only apply to public officials and judicial bodies.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button 
                        onClick={() => {
                          setHeroQuizOption(null);
                          setHeroQuizSubmitted(false);
                        }}
                        className="text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        Reset Question
                      </button>
                      <button 
                        onClick={() => openExamWorkspace('upsc')}
                        className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-amber hover:bg-amber-400 transition-all"
                      >
                        Generate More Quizzes →
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 3: ADAPTIVE STUDY PLANNER */}
                {heroConsoleTab === 'planner' && (
                  <div className="space-y-6 animate-fadeInUp">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <div>
                        <span className="text-xs font-mono text-amber-400 font-bold uppercase">DYNAMIC ROADMAP SCHEDULER</span>
                        <h3 className="text-lg font-bold text-white font-display">Set Daily Time Budget: {heroPlannerHours} Hours</h3>
                      </div>
                      <div className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                        100% Syllabus Coverage in 90 Days
                      </div>
                    </div>

                    <div className="space-y-4">
                      <input 
                        type="range" 
                        min="2" 
                        max="8" 
                        value={heroPlannerHours}
                        onChange={(e) => setHeroPlannerHours(parseInt(e.target.value, 10))}
                        className="w-full accent-amber-500 h-2 bg-white/10 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-400 font-mono">
                        <span>2 Hours/Day (Working Professional)</span>
                        <span>4 Hours/Day (Balanced)</span>
                        <span>8 Hours/Day (Dropper/Full-Time)</span>
                      </div>

                      {/* Weekly calendar preview */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <div key={day} className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                            <div className="text-xs font-mono font-bold text-slate-300">{day}</div>
                            <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-amber-300">
                              {i % 2 === 0 ? 'Polity & GK' : 'Maths & Speed'}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">{heroPlannerHours}h Target</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={() => openExamWorkspace('afcat')}
                        className="px-5 py-2.5 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-glow-amber hover:bg-amber-400 transition-all"
                      >
                        Adopt Personalized Schedule →
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 4: SPACED RECALL (FSRS) */}
                {heroConsoleTab === 'fsrs' && (
                  <div className="space-y-6 animate-fadeInUp">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <div>
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase">SCIENTIFIC MEMORY ENGINE (FSRS)</span>
                        <h3 className="text-lg font-bold text-white font-display">Active Recall Flashcard Deck</h3>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-lg">
                        14 Cards Due Today
                      </span>
                    </div>

                    <div 
                      onClick={() => setHeroFlashcardFlipped(!heroFlashcardFlipped)}
                      className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 cursor-pointer hover:border-amber-400/50 transition-all min-h-[180px] flex flex-col justify-center text-center space-y-3 relative group"
                    >
                      <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                        {heroFlashcardFlipped ? '✦ REVEALED ANSWER' : '✦ CLICK TO FLIP / TEST RECALL'}
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-white">
                        {heroFlashcardFlipped 
                          ? 'Chlorophyll absorbs Light Energy in Blue (430 nm) and Red (660 nm) wavelengths, while reflecting Green light.' 
                          : 'Which wavelengths of visible light are maximally absorbed by Chlorophyll-a in photosynthesis?'}
                      </p>
                      <span className="text-[10px] text-slate-400">Card 1 of 14 • Biology & General Science</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {[
                        { label: 'Again (<1m)', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
                        { label: 'Hard (12h)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
                        { label: 'Good (3d)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                        { label: 'Easy (7d)', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
                      ].map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => setHeroFlashcardFlipped(false)}
                          className={`py-2.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 ${btn.color}`}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: CONCEPT MASTERY RADAR */}
                {heroConsoleTab === 'mastery' && (
                  <div className="space-y-6 animate-fadeInUp">
                    <div className="flex justify-between items-center pb-4 border-b border-white/10">
                      <div>
                        <span className="text-xs font-mono text-purple-400 font-bold uppercase">SYLLABUS MASTERY RADAR</span>
                        <h3 className="text-lg font-bold text-white font-display">Predicted Score: 184 / 300 (Cutoff: 155+)</h3>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg">
                        98.6% Predicted Cutoff Clearance
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { topic: 'Reasoning Logic', score: 94, status: 'Mastered', color: 'text-emerald-400', bar: 'bg-emerald-500' },
                        { topic: 'Numerical Ability', score: 78, status: 'Strong', color: 'text-amber-400', bar: 'bg-amber-500' },
                        { topic: 'English Comprehension', score: 88, status: 'Mastered', color: 'text-emerald-400', bar: 'bg-emerald-500' },
                        { topic: 'Current Affairs & Defense', score: 62, status: 'Needs Practice', color: 'text-rose-400', bar: 'bg-rose-500' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                          <div className="text-xs font-semibold text-slate-300">{item.topic}</div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-2xl font-bold font-display text-white">{item.score}%</span>
                            <span className={`text-[10px] font-bold ${item.color}`}>{item.status}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.bar}`} style={{ width: `${item.score}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Flame className="w-4 h-4" /> AI Recommendation for Today
                        </div>
                        <p className="text-xs text-slate-300">Attempt 15 questions on Indian Air Force Commands & Joint Military Exercises to boost Defense GK by +12 Marks.</p>
                      </div>
                      <button 
                        onClick={() => openExamWorkspace('afcat')}
                        className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-amber whitespace-nowrap"
                      >
                        Start Targeted Drill →
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>

        {/* ═══════════ ALL MAJOR INDIAN EXAMINATIONS (CATEGORY FILTER & SUITES) ═══════════ */}
        <RevealSection>
          <section id="exams" className="px-6 md:px-12 py-20 relative bg-[#090d14] border-y border-white/10">
            <div className="max-w-7xl mx-auto space-y-12">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
                    ✦ FULL EXAMINATION COVERAGE
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                    All Major Indian Examinations
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base max-w-xl">
                    Dedicated CBT environments, curated model test papers, authentic past-year questions, and adaptive study roadmaps for every national target.
                  </p>
                </div>

                {/* Live Search Bar */}
                <div className="w-full md:w-80">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Search exam, category, or tag..."
                      value={heroExamSearch}
                      onChange={(e) => setHeroExamSearch(e.target.value)}
                      className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { id: 'all', label: 'All Exams (9)' },
                  { id: 'defence', label: '⚔️ Defence (AFCAT, CDS, NDA)' },
                  { id: 'engineering', label: '⚛️ Engineering (JEE, GATE)' },
                  { id: 'medical', label: '🩺 Medical (NEET UG)' },
                  { id: 'civil', label: '🏛️ Civil Services (UPSC CSE)' },
                  { id: 'aptitude', label: '📊 Aptitude & MBA (SSC, CAT)' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setHeroExamFilter(pill.id as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      heroExamFilter === pill.id
                        ? 'bg-white text-slate-950 shadow-md font-extrabold'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Exam Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExams.map((exam) => {
                  const Icon = exam.icon;
                  const info = examHubDetails[exam.id];
                  return (
                    <div
                      key={exam.id}
                      onClick={() => openExamWorkspace(exam.id)}
                      className="glass-panel glass-panel-hover p-6 rounded-2xl cursor-pointer group flex flex-col justify-between space-y-6 relative overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${exam.color}20` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: exam.color }} />
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            {exam.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                            {exam.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 font-mono">
                            {exam.candidates} Aspirants • {info?.mocks || 'Full Mock Series'}
                          </p>
                        </div>

                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {info?.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {info?.features.slice(0, 3).map((f, i) => (
                            <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
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

        {/* ═══════════ CORE FEATURES BENTO GRID MATRIX ═══════════ */}
        <RevealSection>
          <section id="features" className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto space-y-16">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
                ✦ ARCHITECTURE & MODULES
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                Engineered for Academic Mastery
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                Six interconnected AI modules working together to transform raw syllabus into deep conceptual retention.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={i} 
                    className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-5 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: feature.color }} />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                          {feature.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {feature.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-amber-400">
                      <span>Explore Module</span>
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
          <section className="px-6 md:px-12 py-20 bg-[#090d14] border-y border-white/10">
            <div className="max-w-6xl mx-auto space-y-16">
              
              <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                  Three Steps from Zero to Ranker
                </h2>
                <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
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
                    <div key={i} className="glass-panel p-8 rounded-3xl space-y-4 text-center relative group">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-glow-amber group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-amber-400" />
                      </div>
                      <div className="text-xs font-mono font-bold text-amber-400 tracking-widest uppercase">STEP {item.step}</div>
                      <h3 className="text-xl font-bold text-white font-display">{item.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>
        </RevealSection>

        {/* ═══════════ TESTIMONIALS / SUCCESS STORIES ═══════════ */}
        <RevealSection>
          <section id="testimonials" className="px-6 md:px-12 py-20 md:py-28 max-w-7xl mx-auto space-y-16">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
                ✦ VERIFIED RANKERS
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                Trusted by Top Aspirants Across India
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
                Real aspirants who transformed their preparation discipline and cleared their dream cutoffs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="glass-panel p-8 rounded-3xl space-y-6 flex flex-col justify-between relative group">
                  <Quote className="w-8 h-8 text-amber-400/20 absolute top-6 right-6" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-sm font-extrabold text-amber-300 font-display">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">{t.name}</div>
                        <div className="text-xs text-amber-400 font-mono font-semibold">{t.role}</div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {t.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </section>
        </RevealSection>

        {/* ═══════════ TRANSPARENT PRICING TIERS ═══════════ */}
        <RevealSection>
          <section id="pricing" className="px-6 md:px-12 py-20 bg-[#090d14] border-t border-white/10">
            <div className="max-w-5xl mx-auto space-y-16">
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider font-mono">
                  ✦ TRANSPARENT MEMBERSHIP
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display">
                  Start Free. Upgrade for Unlimited Power.
                </h2>
                <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
                  Every serious aspirant deserves world-class AI preparation tools at an affordable price.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-stretch">
                
                {/* Free Tier */}
                <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-8">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase">FREE LEARNER</span>
                      <div className="text-5xl font-black text-white font-display mt-2">
                        ₹0 <span className="text-sm font-medium text-slate-400">/ forever</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Essential study tools for getting started.</p>
                    </div>

                    <ul className="space-y-3">
                      {[
                        '3 AI quiz generations daily',
                        'Basic exam syllabus roadmaps',
                        'Past 30-day performance tracking',
                        'Official exam pattern guides',
                        'Community forum access'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-slate-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => {
                      setAuthMode('signup');
                      resetAuthState();
                      triggerLoadingState('auth');
                    }}
                    className="w-full py-4 glass-panel hover:bg-white/10 text-white font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
                  >
                    Start Free Plan
                  </button>
                </div>

                {/* Premium Tier */}
                <div className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-8 border-amber-500/40 relative shadow-glow-amber">
                  <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-extrabold font-mono px-3.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    ✦ HIGHLY RECOMMENDED
                  </div>

                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase">ELITE ASPIRANT PRO</span>
                      <div className="text-5xl font-black text-amber-300 font-display mt-2">
                        ₹499 <span className="text-sm font-medium text-slate-400">/ month</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">For dedicated aspirants targeting top AIR ranks.</p>
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
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-100 font-medium">
                          <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => {
                      alert('Elite Pro checkout simulation successful!');
                      setIsLoggedIn(true);
                      triggerLoadingState('afcat');
                    }}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm rounded-xl transition-all active:scale-[0.98] shadow-glow-amber"
                  >
                    Unlock Elite Membership
                  </button>
                </div>

              </div>

            </div>
          </section>
        </RevealSection>

        {/* ═══════════ FINAL CALL TO ACTION ═══════════ */}
        <RevealSection>
          <section className="px-6 md:px-12 py-20 md:py-28 relative">
            <div className="max-w-5xl mx-auto glass-panel p-10 md:p-16 rounded-[36px] border border-amber-500/30 text-center relative overflow-hidden shadow-2xl shadow-amber-500/10">
              
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-sky-500/15 rounded-full blur-[90px] pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  Ready to Crack Your Target Exam in 2026?
                </h2>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Join over 50,000 aspirants who are preparing with algorithmic precision and daily clarity.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      setAuthMode('signup');
                      resetAuthState();
                      triggerLoadingState('auth');
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-base rounded-2xl shadow-glow-amber transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    Create Free Account
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </section>
        </RevealSection>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="border-t border-white/10 py-16 px-6 md:px-12 bg-[#06080c] text-slate-400">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm">
                  T
                </div>
                <span className="text-xl font-bold text-white font-display">Tejas</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                The unified AI study operating system for competitive exams, university subjects, and document intelligence across India.
              </p>
              <div className="text-xs font-mono text-slate-500 pt-2">
                Built with precision for 500 Million Indian Aspirants.
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">Exams</h4>
              <ul className="space-y-2 text-xs">
                {['AFCAT 2026', 'CDS IMA/OTA', 'NDA & NA', 'JEE Main', 'NEET UG', 'UPSC CSE', 'GATE Engineering', 'CAT MBA'].map((e) => (
                  <li key={e} className="hover:text-amber-400 cursor-pointer transition-colors">{e}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">Platform</h4>
              <ul className="space-y-2 text-xs">
                {['CBT Exam Engine', 'Instant AI Quiz', 'Study Planner', 'FSRS Revision', 'PYQ Paper Vault', 'Research Hub'].map((p) => (
                  <li key={p} className="hover:text-amber-400 cursor-pointer transition-colors">{p}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">Company & Legal</h4>
              <ul className="space-y-2 text-xs">
                {['Privacy Policy', 'Terms of Service', 'Security & Safety', 'Contact Support', 'WhatsApp Helpline'].map((l) => (
                  <li key={l} className="hover:text-amber-400 cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Tejas Learning Technologies. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <span className="text-amber-400">⚡</span> for Bharat
            </p>
          </div>
        </footer>

      </div>
    );
  }

  /* ────────────────────────────────────────
     ONBOARDING WIZARD SCREEN (DARK LUXURY)
     ──────────────────────────────────────── */
  if (isLoggedIn && !profileOnboardingCompleted) {
    const handleOnboardingSubmit = () => {
      setOnboardingGenerating(true);
      
      setTimeout(() => {
        fetch(`${API_BASE_URL}/api/v1/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
          body: JSON.stringify({
            fullName: profileFullName,
            dailyStudyGoalMinutes: onboardingPrepStatus === 'dropper' ? 360 : 120,
            preferredLanguage: onboardingLanguage,
            phoneNumber: onboardingPhoneNumber || null,
            targetExamId: onboardingExamId || null,
            targetYear: parseInt(onboardingYear, 10) || null,
            state: onboardingState || null,
            prepStatus: onboardingPrepStatus || null,
            onboardingCompleted: true
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data && data.profile) {
            setProfileFullName(data.profile.fullName);
            setProfileGoal(data.profile.dailyStudyGoalMinutes);
            setProfileLanguage(data.profile.preferredLanguage);
            setProfilePhoneNumber(data.profile.phoneNumber || '');
            setProfileTargetExamId(data.profile.targetExamId || '');
            setProfileTargetYear(data.profile.targetYear || '');
            setProfileState(data.profile.state || '');
            setProfilePrepStatus(data.profile.prepStatus || '');
            setProfileOnboardingCompleted(true);
            setProfileSyncTrigger(prev => prev + 1);
            setOnboardingGenerating(false);
            setActiveTab('afcat');
            
            if (typeof window !== 'undefined') {
              window.open('https://wa.me/919079144245?text=Hello%20Tejas%20Support!%20I%20just%20completed%20my%20onboarding%20and%20need%20assistance.', '_blank');
            }
          }
        })
        .catch(err => {
          alert('Failed to complete onboarding. Please try again.');
          setOnboardingGenerating(false);
        });
      }, 2500);
    };

    return (
      <div className="min-h-screen bg-[#080a0f] text-[#f1f5f9] flex items-center justify-center p-4 md:p-12 font-sans">
        <div className="max-w-xl w-full glass-panel border border-white/15 p-8 md:p-12 rounded-[32px] shadow-2xl space-y-8 relative overflow-hidden">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-5">
            <span className="text-xl font-bold tracking-tight flex items-center text-white font-display">
              Tejas<span className="w-2.5 h-2.5 rounded-full bg-amber-400 ml-1"></span>
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === onboardingStep 
                      ? 'w-6 bg-amber-400' 
                      : s < onboardingStep 
                        ? 'w-2.5 bg-amber-600' 
                        : 'w-2.5 bg-white/10'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {onboardingStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-white font-display">What is your primary study goal?</h2>
                <p className="text-sm text-slate-400">Select a vertical to customize your AI dashboard and roadmaps.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'civil_services', label: 'UPSC & Civil Services', desc: 'IAS, IPS, State PSCs' },
                  { id: 'engineering', label: 'JEE Engineering', desc: 'IIT JEE & state entrances' },
                  { id: 'medical', label: 'NEET Medical', desc: 'NEET UG & PG' },
                  { id: 'ssc_banking', label: 'SSC & Banking', desc: 'Govt jobs, PO, CGL' },
                  { id: 'state_psc', label: 'State PSC Exams', desc: 'UPPSC, RPSC, BPSC' },
                  { id: 'general', label: 'General / Others', desc: 'College subjects & research' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setOnboardingCategory(cat.id);
                      setOnboardingStep(2);
                    }}
                    className="p-5 border border-white/10 bg-white/5 hover:border-amber-400 hover:bg-amber-500/10 rounded-2xl text-left space-y-2 transition-all group"
                  >
                    <span className="font-bold text-sm block text-white group-hover:text-amber-300 transition-colors">{cat.label}</span>
                    <span className="text-[11px] text-slate-400 block">{cat.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-white font-display">Select your Target Exam</h2>
                <p className="text-sm text-slate-400">This binds the correct syllabus roadmap to your calendar.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Target Examination</label>
                  <select 
                    value={onboardingExamId}
                    onChange={(e) => setOnboardingExamId(e.target.value)}
                    className="w-full p-3.5 bg-[#0f141f] border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select Target Exam</option>
                    {examsList.length > 0 ? (
                      examsList.map((exam) => (
                        <option key={exam.id} value={exam.id}>{exam.name}</option>
                      ))
                    ) : (
                      <>
                        <option value="afcat">AFCAT (Air Force)</option>
                        <option value="cds">CDS (IMA / OTA)</option>
                        <option value="nda">NDA & NA (UPSC)</option>
                        <option value="upsc-cse">UPSC Civil Services</option>
                        <option value="jee-advanced">JEE Advanced (Engineering)</option>
                        <option value="neet-ug">NEET UG (Medical)</option>
                        <option value="gate-cse">GATE Computer Science</option>
                        <option value="ssc-cgl">SSC CGL (Government)</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Target Attempt Year</label>
                  <select 
                    value={onboardingYear}
                    onChange={(e) => setOnboardingYear(e.target.value)}
                    className="w-full p-3.5 bg-[#0f141f] border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setOnboardingStep(1)} className="flex-1 py-3 border border-white/10 text-slate-300 hover:bg-white/5 font-bold rounded-xl transition-all">← Back</button>
                <button 
                  onClick={() => setOnboardingStep(3)} 
                  disabled={!onboardingExamId}
                  className="flex-1 py-3 bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold rounded-xl disabled:opacity-50 transition-all shadow-glow-amber"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-white font-display">Set Your Preferences</h2>
                <p className="text-sm text-slate-400">These values dictate your daily planner limits and learning medium.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Preferred Study Medium</label>
                  <select 
                    value={onboardingLanguage}
                    onChange={(e) => setOnboardingLanguage(e.target.value)}
                    className="w-full p-3.5 bg-[#0f141f] border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    <option value="en">English (Default)</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="hinglish">Hinglish (Bilingual)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Preparation Status</label>
                  <select 
                    value={onboardingPrepStatus}
                    onChange={(e) => setOnboardingPrepStatus(e.target.value)}
                    className="w-full p-3.5 bg-[#0f141f] border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select Status</option>
                    <option value="dropper">Dropper / Full-Time Aspirant</option>
                    <option value="college_student">College Student</option>
                    <option value="school_student">School Student</option>
                    <option value="working_professional">Working Professional</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setOnboardingStep(2)} className="flex-1 py-3 border border-white/10 text-slate-300 hover:bg-white/5 font-bold rounded-xl transition-all">← Back</button>
                <button 
                  onClick={() => setOnboardingStep(4)} 
                  disabled={!onboardingPrepStatus}
                  className="flex-1 py-3 bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold rounded-xl disabled:opacity-50 transition-all shadow-glow-amber"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-white font-display">One Last Thing...</h2>
                <p className="text-sm text-slate-400">Provide details to customize state recommendations.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">State of Residence</label>
                  <select 
                    value={onboardingState}
                    onChange={(e) => setOnboardingState(e.target.value)}
                    className="w-full p-3.5 bg-[#0f141f] border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    <option value="">Select State</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Other">Other Region</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Mobile Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX"
                    value={onboardingPhoneNumber}
                    onChange={(e) => setOnboardingPhoneNumber(e.target.value)}
                    className="w-full p-3.5 bg-[#0f141f] border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setOnboardingStep(3)} className="flex-1 py-3 border border-white/10 text-slate-300 hover:bg-white/5 font-bold rounded-xl transition-all">← Back</button>
                <button 
                  onClick={() => {
                    setOnboardingStep(5);
                    handleOnboardingSubmit();
                  }} 
                  disabled={!onboardingState}
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl disabled:opacity-50 transition-all shadow-glow-amber"
                >
                  Generate My Workspace
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 5 && (
            <div className="text-center py-12 space-y-6 flex flex-col items-center justify-center">
              {onboardingGenerating ? (
                <>
                  <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-display">Personalizing Your Workspace</h3>
                    <p className="text-xs text-slate-400 animate-pulse">AI is compiling roadmaps, custom timetables, and spacing reviews...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/40">
                    <CheckCircle className="w-10 h-10 text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white font-display">Setup Complete!</h3>
                    <p className="text-xs text-slate-400">Your AI Learning Space is ready for launch.</p>
                  </div>
                  <button 
                    onClick={() => setProfileOnboardingCompleted(true)}
                    className="mt-6 px-8 py-3 bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold rounded-xl transition-all shadow-glow-amber"
                  >
                    Enter Workspace
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────
     APP WORKSPACE (DASHBOARD & ALL HUBS)
     ──────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#080a0f] text-[#f1f5f9] font-sans">
      
      {/* LEFT SIDEBAR NAVIGATION (Desktop) */}
      {activeTab !== 'auth' && activeTab !== 'pricing' && (
        <aside className="hidden md:flex w-64 bg-[#0d1117] border-r border-white/10 flex-col justify-between shrink-0 sticky top-0 h-screen">
          <div>
            {/* Logo */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <span className="text-xl font-black tracking-tight flex items-center text-white font-display">
                Tejas<span className="w-2 h-2 rounded-full bg-amber-400 ml-1.5 shadow-glow-amber"></span>
              </span>
              <button onClick={() => triggerLoadingState('landing')} className="text-[11px] text-slate-400 hover:text-amber-400 font-mono">
                ← Home
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
              {(() => {
                const navs = [
                  { id: 'afcat', label: '✈️ AFCAT 2026 Hub', icon: Shield },
                  { id: 'cds', label: '🛡️ CDS (IMA/OTA) Hub', icon: Shield },
                  { id: 'nda', label: '⚔️ NDA & NA Hub', icon: Shield },
                  { id: 'jee_mains', label: '⚛️ JEE Main Hub', icon: Zap },
                  { id: 'neet', label: '🩺 NEET UG Hub', icon: Award },
                  { id: 'upsc', label: '🏛️ UPSC CSE Hub', icon: BookOpen },
                  { id: 'ssc_cgl', label: '📋 SSC CGL Hub', icon: FileText },
                  { id: 'gate', label: '⚡ GATE Engine', icon: Sparkles },
                  { id: 'cat', label: '📊 CAT Engine', icon: TrendingUp },
                  { id: 'dashboard', label: '📊 Dashboard', icon: BookOpen },
                  { id: 'planner', label: '📅 Study Planner', icon: Calendar },
                  { id: 'explorer', label: '🔍 Exam Explorer', icon: Search },
                  { id: 'learning', label: '📚 Learning Hub', icon: BookMarked },
                  { id: 'pdf', label: '📄 PDF Workspace', icon: FileText },
                  { id: 'revision', label: '🧠 Revision (FSRS)', icon: RotateCcw },
                  { id: 'analytics', label: '📈 Analytics', icon: TrendingUp },
                  { id: 'profile', label: '👤 Profile', icon: User },
                ];
                if (user.role === 'admin') {
                  navs.push({ id: 'admin', label: '🔒 Admin Console', icon: Shield });
                }
                return navs.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerLoadingState(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-150 ${
                        isActive 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                });
              })()}
            </nav>
          </div>

          {/* Quick Quiz FAB */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizScore(null);
                triggerLoadingState('quiz-gen');
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-glow-amber transition-all duration-150 active:scale-95 text-xs"
            >
              <Plus className="w-4 h-4" />
              Instant AI Quiz
            </button>
          </div>
        </aside>
      )}

      {/* CORE WORKSPACE CONTENT */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        
        {/* TOP HEADER BAR */}
        {activeTab !== 'auth' && activeTab !== 'pricing' && (
          <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400">Current Target:</span>
              <button 
                onClick={() => triggerLoadingState('afcat')}
                className="px-3.5 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full hover:bg-amber-500/25 transition-all flex items-center gap-1.5 shadow-sm"
              >
                ✈️ AFCAT 2026 (Air Force)
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => triggerLoadingState('pricing')}
                className="text-xs font-bold text-amber-400 hover:underline"
              >
                ✦ Upgrade Pro
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  triggerLoadingState('landing');
                }}
                className="text-xs font-semibold text-slate-400 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </header>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="p-8 space-y-6 flex-1 flex flex-col justify-center">
            <div className="max-w-xl mx-auto w-full space-y-4">
              <div className="h-8 w-48 shimmer-placeholder rounded-xl"></div>
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

            {/* AUTH SCREEN */}
            {activeTab === 'auth' && (
              <div className="min-h-[85vh] flex items-center justify-center py-12">
                <div className="w-full max-w-md glass-panel border border-white/15 p-8 rounded-3xl space-y-6 shadow-2xl shadow-black">
                  
                  {/* Title / Header */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      <span className="text-3xl font-black text-white font-display">Tejas</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-glow-amber"></span>
                    </div>
                    {authMode === 'signup' ? (
                      signupStep === 1 ? (
                        <>
                          <h1 className="text-2xl font-bold text-white font-display">Create Aspirant Account</h1>
                          <p className="text-xs text-slate-400">Verify your email address to unlock your personalized AI prep space.</p>
                        </>
                      ) : (
                        <>
                          <h1 className="text-2xl font-bold text-white font-display">Secure Your Account</h1>
                          <p className="text-xs text-slate-400">Set up a strong password for {authFullName || 'your account'}.</p>
                        </>
                      )
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold text-white font-display">Welcome Back</h1>
                        <p className="text-xs text-slate-400">Sign in to resume your active test sessions and revisions.</p>
                      </>
                    )}
                  </div>

                  {/* Errors / Success Alerts */}
                  {errorMsg && (
                    <div className="p-3.5 bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium rounded-xl flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {otpSuccessMsg && (
                    <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium rounded-xl flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{otpSuccessMsg}</span>
                    </div>
                  )}

                  {/* SIGN UP FLOW */}
                  {authMode === 'signup' ? (
                    signupStep === 1 ? (
                      <form onSubmit={otpSent ? handleSignupVerify : handleSignupInitiate} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              required 
                              disabled={otpSent || loading}
                              placeholder="Priya Sharma" 
                              value={authFullName}
                              onChange={(e) => setAuthFullName(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-sm text-white transition-colors disabled:opacity-50" 
                            />
                            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                          <div className="relative">
                            <input 
                              type="email" 
                              required 
                              disabled={otpSent || loading}
                              placeholder="priya@example.com" 
                              value={authEmail}
                              onChange={(e) => setAuthEmail(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-sm text-white transition-colors disabled:opacity-50" 
                            />
                            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        {otpSent && (
                          <div className="space-y-1 pt-4 border-t border-white/10 animate-fadeInUp">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Code (OTP)</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                required 
                                maxLength={6}
                                placeholder="123456" 
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full px-4 py-3 pl-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-sm text-white text-center tracking-[0.5em] font-mono transition-colors" 
                              />
                              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                            </div>
                            {otpError && (
                              <p className="text-xs font-semibold text-red-400 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {otpError}
                              </p>
                            )}
                            
                            <div className="pt-2 flex justify-between items-center text-xs">
                              <button 
                                type="button" 
                                onClick={handleResendOtp}
                                className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                              >
                                <RefreshCw className="w-3 h-3" /> Resend OTP
                              </button>
                            </div>
                          </div>
                        )}

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold rounded-xl hover:from-amber-400 hover:to-yellow-300 transition-all active:scale-[0.98] disabled:opacity-50 shadow-glow-amber text-sm mt-4"
                        >
                          {loading ? 'Processing...' : otpSent ? 'Verify OTP & Continue' : 'Send Verification OTP'}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleSignupComplete} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Set Password</label>
                          <input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-sm text-white transition-colors" 
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirm Password</label>
                          <input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                            value={authConfirmPassword}
                            onChange={(e) => setAuthConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-sm text-white transition-colors" 
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-glow-amber text-sm"
                        >
                          {loading ? 'Saving...' : 'Complete Registration'}
                        </button>
                      </form>
                    )
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="priya@example.com" 
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-sm text-white transition-colors" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                        <input 
                          type="password" 
                          required 
                          placeholder="••••••••" 
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400 text-sm text-white transition-colors" 
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-glow-amber text-sm"
                      >
                        {loading ? 'Signing in...' : 'Sign In'}
                      </button>
                    </form>
                  )}

                  <div className="text-center pt-2">
                    <button 
                      onClick={() => {
                        setAuthMode(authMode === 'signup' ? 'login' : 'signup');
                        resetAuthState();
                      }}
                      className="text-xs text-amber-400 hover:underline font-semibold"
                    >
                      {authMode === 'signup' ? 'Already have an account? Sign In' : "Don't have an account? Sign Up Free"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* EXAM HUBS */}
            {activeTab === 'afcat' && <AfcatHub />}
            {activeTab === 'cds' && <CdsHub />}
            {activeTab === 'nda' && <NdaHub />}
            {activeTab === 'jee_mains' && <JeeMainsHub />}
            {activeTab === 'neet' && <NeetHub />}
            {activeTab === 'upsc' && <UpscHub />}
            {activeTab === 'ssc_cgl' && <SscCglHub />}
            {activeTab === 'gate' && <GateHub />}
            {activeTab === 'cat' && <CatHub />}

            {/* DASHBOARD SCREEN */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fadeInUp">
                <div className="glass-panel p-6 rounded-3xl border-amber-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
                      <Flame className="w-6 h-6 text-amber-400" /> Welcome, {profileFullName}!
                    </h2>
                    <p className="text-sm text-slate-300">
                      Consistency Streak: <strong>{dashboardOverview.consistencyRating}%</strong> • Daily Target: <strong>{dashboardOverview.studyTimeMinutes}m / {profileGoal}m</strong>
                    </p>
                  </div>
                  <button onClick={() => triggerLoadingState('afcat')} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-amber transition-all">
                    Launch CBT Mock Simulator →
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-white font-display">Active Daily Target Blocks</h3>
                    <div className="space-y-3">
                      {[
                        { title: `Complete daily syllabus topic block (${profileGoal} mins)`, duration: `${profileGoal}m`, done: dashboardOverview.studyTimeMinutes >= profileGoal },
                        { title: `Solve competitive exam practice test (Completed: ${dashboardOverview.quizzesCompleted})`, duration: '25m', done: dashboardOverview.quizzesCompleted > 0 },
                        { title: `Review ${dueCardsCount} due active recall flashcards`, duration: '15m', done: dueCardsCount === 0 }
                      ].map((task, idx) => (
                        <div key={idx} className="p-4 glass-panel rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" checked={task.done} readOnly className="accent-amber-500 w-4 h-4" />
                            <span className={`text-sm ${task.done ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-amber-400 font-bold">{task.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white font-display">Document AI Ingest</h3>
                    <div onClick={() => triggerLoadingState('pdf')} className="border-2 border-dashed border-white/20 p-8 rounded-3xl text-center space-y-3 hover:border-amber-400 transition-colors cursor-pointer glass-panel">
                      <UploadCloud className="w-10 h-10 text-amber-400 mx-auto" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-white">Ingest Study PDF / Notes</p>
                        <p className="text-xs text-slate-400">Click to upload document</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STUDY PLANNER */}
            {activeTab === 'planner' && (
              <div className="space-y-8 animate-fadeInUp">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-white font-display">Adaptive Study Planner</h1>
                  <button onClick={() => alert('Syllabus timeline auto-rebalanced across active calendar!')} className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-amber">
                    Rebalance Schedule
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-3xl space-y-4">
                    <h3 className="text-base font-bold text-white">Daily Capacity Budget</h3>
                    <div className="space-y-3">
                      <input type="range" min="1" max="12" defaultValue="4" className="w-full accent-amber-500" />
                      <div className="text-xs font-mono text-amber-400 font-bold text-right">4.0 Hours / Day</div>
                    </div>
                  </div>
                  <div className="md:col-span-2 glass-panel p-6 rounded-3xl space-y-4">
                    <h3 className="text-base font-bold text-white">Weekly Allocation Grid</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="p-3 bg-white/5 rounded-2xl text-center space-y-1 border border-white/5">
                          <span className="text-xs font-bold text-slate-300 block">{day}</span>
                          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                            Module Drills
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EXAM EXPLORER */}
            {activeTab === 'explorer' && (
              <div className="space-y-6 animate-fadeInUp">
                <h1 className="text-2xl font-bold text-white font-display">Exam Exploration Database</h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {examCategories.map((exam) => (
                    <div key={exam.id} className="glass-panel p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">{exam.badge}</span>
                        <h3 className="text-lg font-bold text-white font-display">{exam.name}</h3>
                        <p className="text-xs text-slate-400">{exam.candidates} Candidates yearly</p>
                      </div>
                      <button 
                        onClick={() => openExamWorkspace(exam.id)}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-amber transition-all"
                      >
                        Launch Examination Workspace →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEARNING HUB */}
            {activeTab === 'learning' && (
              <div className="space-y-8 animate-fadeInUp">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-white font-display">Syllabus Explorer</h1>
                  <button onClick={() => triggerLoadingState('quiz-gen')} className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-glow-amber">
                    + Generate Test
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-panel p-6 rounded-3xl space-y-4">
                    <h3 className="text-xs font-bold font-mono uppercase text-slate-400">Syllabus Hierarchy</h3>
                    <div className="space-y-2 text-sm">
                      <div className="font-bold text-amber-400 flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" /> 1. Indian Constitution & Polity
                      </div>
                      <div className="pl-6 space-y-1.5 text-xs text-slate-300">
                        <div className="text-white font-semibold">1.1 Historical Background</div>
                        <div>1.2 Preamble & Fundamental Rights</div>
                        <div>1.3 Directive Principles & Union Judiciary</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 glass-panel p-8 rounded-3xl space-y-4">
                    <h2 className="text-xl font-bold text-white font-display">1.1 Historical Background (1773 to 1947)</h2>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      The constitutional development in British India commenced systematically with the Regulating Act of 1773, which established the Supreme Court of Calcutta and subordinated Bombay/Madras presidencies. Pitt&apos;s India Act of 1784 established the Board of Control, creating dual control over administration.
                    </p>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">Reference: Official UPSC Syllabus GS Paper 2</span>
                      <button onClick={() => triggerLoadingState('afcat')} className="text-amber-400 font-bold hover:underline">
                        Launch Related CBT Drills →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PDF WORKSPACE */}
            {activeTab === 'pdf' && (
              <div className="grid md:grid-cols-3 gap-6 h-[75vh] animate-fadeInUp">
                <div className="md:col-span-2 glass-panel rounded-3xl flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <span className="text-xs font-mono font-bold text-slate-300">UPSC_Syllabus_2026.pdf (Page 1 of 12)</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white/10 rounded-lg text-xs hover:bg-white/20">Prev</button>
                      <button className="px-3 py-1 bg-white/10 rounded-lg text-xs hover:bg-white/20">Next</button>
                    </div>
                  </div>
                  <div className="flex-1 p-8 flex items-center justify-center text-center">
                    <div className="max-w-md space-y-3">
                      <FileText className="w-16 h-16 text-amber-400 mx-auto" />
                      <h3 className="text-lg font-bold text-white font-display">PDF Document Ingestion Engine</h3>
                      <p className="text-xs text-slate-400">
                        Select any passage in your textbook to trigger contextual explanations, formula derivations, or instant active recall flashcard generation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass-panel rounded-3xl flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-white/10 flex items-center gap-2 bg-white/5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white font-display">AI Document Explainer</span>
                  </div>
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    <div className="p-3 bg-white/5 border border-white/10 text-xs rounded-xl max-w-[90%] text-slate-200">
                      Hello! I have fully indexed this textbook. What concept would you like me to clarify?
                    </div>
                  </div>
                  <div className="p-3 border-t border-white/10 flex gap-2">
                    <input type="text" placeholder="Ask about this document..." className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400" />
                    <button className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-amber">Send</button>
                  </div>
                </div>
              </div>
            )}

            {/* ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8 animate-fadeInUp">
                <h1 className="text-2xl font-bold text-white font-display">Performance Analytics & Concept Mastery</h1>
                <div className="glass-panel p-8 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-white font-display">Concept Mastery Radar (Past 30 Days)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { topic: 'Reasoning Logic', mastery: '94%', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
                      { topic: 'General Knowledge', mastery: '76%', color: 'text-amber-400', bg: 'bg-amber-500/20' },
                      { topic: 'Numerical Ability', mastery: '82%', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
                      { topic: 'English Verbal', mastery: '90%', color: 'text-emerald-400', bg: 'bg-emerald-500/20' }
                    ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-2xl border border-white/10 ${item.bg} space-y-1`}>
                        <div className="text-xs text-slate-300">{item.topic}</div>
                        <div className={`text-2xl font-black font-display ${item.color}`}>{item.mastery}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* REVISION (FSRS) */}
            {activeTab === 'revision' && (
              <div className="max-w-2xl mx-auto space-y-6 animate-fadeInUp">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-white font-display">Active Recall Deck</h1>
                    <p className="text-xs text-slate-400 font-mono">FSRS Spaced Repetition Queue</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full">
                    {dueCards.length} due for review
                  </span>
                </div>

                {dueCards.length === 0 ? (
                  <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
                    <RotateCcw className="w-12 h-12 text-amber-400 mx-auto animate-spin-slow" />
                    <h3 className="text-lg font-bold text-white font-display">All Caught Up!</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      No flashcards due right now. Attempt exam quizzes to automatically generate active recall cards for challenging topics.
                    </p>
                  </div>
                ) : (
                  (() => {
                    const card = dueCards[activeCardIndex] || dueCards[0];
                    return (
                      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[300px] justify-between">
                        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center text-xs text-slate-400 font-mono">
                          <span>Difficulty: {Number(card.difficulty || 4.5).toFixed(1)}/10</span>
                          <span>Repetitions: {card.repetitionCount || 0}</span>
                        </div>

                        <div className="p-8 flex-1 flex flex-col justify-center space-y-6 text-center">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">QUESTION / FRONT</span>
                            <p className="text-lg font-semibold text-white">{card.frontText}</p>
                          </div>

                          {showAnswer && (
                            <div className="pt-6 border-t border-white/10 space-y-2 animate-fadeInUp">
                              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">ANSWER / BACK</span>
                              <p className="text-sm text-slate-200 leading-relaxed">{card.backText}</p>
                            </div>
                          )}
                        </div>

                        <div className="p-6 bg-white/5 border-t border-white/10">
                          {!showAnswer ? (
                            <button
                              onClick={() => setShowAnswer(true)}
                              className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-glow-amber text-xs"
                            >
                              Reveal Answer
                            </button>
                          ) : (
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { label: 'Again', rating: 1, color: 'bg-red-500 hover:bg-red-600' },
                                { label: 'Hard', rating: 2, color: 'bg-amber-500 hover:bg-amber-600' },
                                { label: 'Good', rating: 3, color: 'bg-emerald-500 hover:bg-emerald-600' },
                                { label: 'Easy', rating: 4, color: 'bg-blue-500 hover:bg-blue-600' }
                              ].map((btn) => (
                                <button
                                  key={btn.rating}
                                  onClick={() => handleReviewCard(card.id, btn.rating)}
                                  className={`py-2 px-1 text-[11px] font-bold text-white rounded-xl transition-colors ${btn.color}`}
                                >
                                  {btn.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto glass-panel p-8 rounded-3xl space-y-6 animate-fadeInUp">
                <h1 className="text-2xl font-bold text-white font-display">Aspirant Profile & Preferences</h1>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Full Name</label>
                    <input 
                      type="text" 
                      value={profileFullName} 
                      onChange={(e) => setProfileFullName(e.target.value)} 
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Mobile Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX"
                      value={profilePhoneNumber} 
                      onChange={(e) => setProfilePhoneNumber(e.target.value)} 
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Daily Goal (Minutes)</label>
                      <input 
                        type="number" 
                        value={profileGoal} 
                        onChange={(e) => setProfileGoal(parseInt(e.target.value, 10) || 0)} 
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Target Year</label>
                      <select 
                        value={profileTargetYear} 
                        onChange={(e) => setProfileTargetYear(e.target.value)} 
                        className="w-full p-3 bg-[#0f141f] border border-white/10 rounded-xl text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleSaveProfile} 
                    className="w-full py-3.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-glow-amber text-sm mt-4"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ADMIN CONSOLE */}
            {activeTab === 'admin' && (
              <div className="space-y-8 animate-fadeInUp">
                <h1 className="text-3xl font-bold text-white font-display">System Administration Console</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users', value: adminStats.totalUsers.toLocaleString() },
                    { label: 'Active Premium', value: adminStats.activePremium.toLocaleString() },
                    { label: 'Monthly Revenue', value: `₹${(adminStats.totalRevenue * 80).toFixed(0)}` },
                    { label: 'GenAI Tokens', value: adminStats.totalTokensUsed.toLocaleString() },
                  ].map((kpi, i) => (
                    <div key={i} className="glass-panel p-5 rounded-2xl space-y-1 border-white/10">
                      <span className="text-xs text-slate-400 uppercase font-mono">{kpi.label}</span>
                      <div className="text-2xl font-bold text-white font-display">{kpi.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAV */}
      {activeTab !== 'auth' && activeTab !== 'pricing' && activeTab !== 'landing' && (
        <nav className="md:hidden h-16 border-t border-white/10 bg-[#0d1117]/95 backdrop-blur-md flex items-center justify-around fixed bottom-0 left-0 right-0 z-50">
          {[
            { id: 'afcat', icon: Shield },
            { id: 'dashboard', icon: BookOpen },
            { id: 'explorer', icon: Search },
            { id: 'revision', icon: RotateCcw },
            { id: 'profile', icon: User }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => triggerLoadingState(item.id)}
                className={`p-2.5 rounded-xl transition-all ${
                  isActive ? 'text-amber-400' : 'text-slate-500 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
