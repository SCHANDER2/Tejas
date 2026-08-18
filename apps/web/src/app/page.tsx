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
   EXAM CARD DATA
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
    color: '#FAA114'
  },
  cds: {
    badge: '🛡️ CDS PREPARATION HUB',
    title: 'Combined Defence Services (IMA / OTA / AFA)',
    description: 'Access complete general knowledge maps, english vocabulary boosters, full-length OTA mock tests, and historical papers structured to simulate the actual UPSC CDAC exam environment.',
    mocks: '12 Mocks',
    features: ['GK Question Bank', 'English Vocab Boosters', 'OTA Mock Tests', 'FSRS Spaced Repetition', 'CDS Performance Ranker'],
    emoji: '🛡️',
    color: '#22C55E'
  },
  nda: {
    badge: '⚔️ NDA & NA PREPARATION PLATFORM',
    title: 'National Defence Academy & Naval Academy',
    description: 'Syllabus alignment for UPSC NDA Mathematics and General Ability Test. Train with dynamic formula cheatsheets, topic practice drills, and full-length CBT model papers.',
    mocks: '10 Mocks',
    features: ['Maths Concepts Explorer', 'GAT Practice Drills', 'Formula Cheatsheets', 'Daily Flashcards', 'Performance Tracker'],
    emoji: '⚔️',
    color: '#FAA114'
  },
  jee_mains: {
    badge: '⚛️ JEE MAIN & ADVANCED CORE ENGINE',
    title: 'Joint Entrance Examination',
    description: 'Master engineering physics, complex chemistry reaction pipelines, and logic-heavy mathematics matrices. Access step-by-step video solvers and AI-guided micro challenges.',
    mocks: '20 Mocks',
    features: ['Numerical Solvers', 'Mock Test Engine', 'Physics Visualizers', 'IIT Syllabus Mapping', 'Chapter-wise Quizzes'],
    emoji: '⚛️',
    color: '#3B82F6'
  },
  neet: {
    badge: '🩺 NEET UG MEDICAL CORE ENGINE',
    title: 'National Eligibility cum Entrance Test',
    description: 'NCERT biology interactive mapping, high-yield organic/inorganic chemistry formula builders, and physics conceptual drills designed to scale active recall.',
    mocks: '18 Mocks',
    features: ['NCERT Map Engine', 'Biology Flashcards', 'Chemistry Drills', 'Weak-Topic Focus', 'CBT Test Simulator'],
    emoji: '🩺',
    color: '#22C55E'
  },
  upsc: {
    badge: '🏛️ UPSC CIVIL SERVICES EXAM HUB',
    title: 'UPSC CSE (IAS / IPS / IFS)',
    description: 'Deep Indian Polity analysis, modern history visual timelines, and weekly current affairs summaries. Practice mains answer generation with instant AI logic feedback.',
    mocks: '10 Mocks',
    features: ['Polity Timelines', 'Mains Answer Generator', 'CSAT Practice Portal', 'Current Affairs Hub', 'Syllabus Accordion'],
    emoji: '🏛️',
    color: '#A855F7'
  },
  ssc_cgl: {
    badge: '📋 SSC CGL TIER 1 & 2 ENGINE',
    title: 'Staff Selection Commission CGL',
    description: 'Optimize quantitative aptitude speed, logical reasoning sequence solving, and general awareness memory logs. Take daily speed-math sprints and reasoning logical sequence drills.',
    mocks: '25 Mocks',
    features: ['Speed Math Drills', 'Reasoning Sprints', 'General Awareness Logs', 'Tier 2 Simulators', 'Syllabus Tracker'],
    emoji: '📋',
    color: '#F97316'
  },
  gate: {
    badge: '⚡ GATE ENGINEERING ENGINE',
    title: 'Graduate Aptitude Test in Engineering',
    description: 'Subject-specific core engineering workflows, aptitude shortcuts, and previous-year numerical answer type questions with immediate step explanations.',
    mocks: '15 Mocks',
    features: ['Numerical Answers (NAT)', 'Aptitude Shortcuts', 'Core Topic Workspaces', 'Formula Sheets', 'Dynamic Assessments'],
    emoji: '⚡',
    color: '#6366F1'
  },
  cat: {
    badge: '📊 CAT MBA ENTRANCE PLATFORM',
    title: 'Common Admission Test (IIMs)',
    description: 'High-difficulty Data Interpretation & Logical Reasoning (DILR) caselets, Quantitative Aptitude practice sets, and Verbal Ability reading comprehensions.',
    mocks: '12 Mocks',
    features: ['DILR Caselets', 'QA Speed Booster', 'VARC Comprehensions', 'Percentile Predictor', 'Adaptive Practice Sets'],
    emoji: '📊',
    color: '#EC4899'
  }
};

const features = [
  {
    icon: Sparkles,
    title: 'AI Instant Quiz Engine',
    description: 'Paste any topic, upload a textbook PDF, or drop a YouTube link — generates authentic exam-pattern questions with instant step explanations.',
    tag: 'GENAI ENGINE',
    color: '#FAA114'
  },
  {
    icon: Calendar,
    title: 'Adaptive Capacity Planner',
    description: 'Personalized daily study schedules that auto-rebalance when you miss sessions or when your target exam date draws closer.',
    tag: 'DYNAMIC SCHEDULER',
    color: '#3B82F6'
  },
  {
    icon: RotateCcw,
    title: 'FSRS Spaced Repetition',
    description: 'Scientific active recall scheduling based on the Free Spaced Repetition Scheduler algorithm — eliminates forgetfulness forever.',
    tag: 'RETENTION ALGORITHM',
    color: '#22C55E'
  },
  {
    icon: FileText,
    title: 'Split-Pane Research Hub',
    description: 'Read document PDFs on the left, highlight complex formulas, and chat with your dedicated AI tutor on the right in real time.',
    tag: 'INTELLIGENT WORKSPACE',
    color: '#A855F7'
  },
  {
    icon: TrendingUp,
    title: 'Concept Mastery Heatmap',
    description: 'Real-time detection of weak topics, predicted percentile calibration, and tailored recommendations that fix knowledge gaps.',
    tag: 'CALIBRATION RADAR',
    color: '#F97316'
  },
  {
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
        alert('Profile saved to database!');
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
     LANDING PAGE RENDER (EXACT DESIGN MATCH)
     ──────────────────────────────────────── */
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#FAFAF8] text-[#1A1D1E] font-sans selection:bg-[#FAA114]/30 selection:text-[#1A1D1E]">

        {/* ═══════════ STICKY NAVIGATION BAR ═══════════ */}
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? 'glass-header py-3.5 shadow-sm' 
              : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1A1D1E] text-[#FAFAF8] flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-extrabold tracking-tight text-[#1A1D1E] font-display">
                  Tejas
                </span>
                <span className="w-2 h-2 rounded-full bg-[#FAA114]"></span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#66625D]">
              <a href="#demo" className="hover:text-[#1A1D1E] transition-colors">Live Console</a>
              <a href="#exams" className="hover:text-[#1A1D1E] transition-colors">Exam Hubs</a>
              <a href="#features" className="hover:text-[#1A1D1E] transition-colors">AI Capabilities</a>
              <a href="#testimonials" className="hover:text-[#1A1D1E] transition-colors">Success Stories</a>
              <a href="#pricing" className="hover:text-[#1A1D1E] transition-colors">Pricing</a>
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => { setAuthMode('login'); resetAuthState(); triggerLoadingState('auth'); }}
                className="px-5 py-2.5 text-sm font-bold text-[#1A1D1E] hover:bg-[#E5E2D9]/50 rounded-xl transition-all"
              >
                Sign In
              </button>
              <button 
                onClick={() => { setAuthMode('signup'); resetAuthState(); triggerLoadingState('auth'); }}
                className="px-6 py-2.5 text-sm font-bold bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] rounded-xl transition-all active:scale-95 shadow-sm flex items-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1D1E] hover:bg-[#E5E2D9]/50 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#FAFAF8] border-t border-[#E5E2D9] mx-4 mt-3 rounded-2xl p-6 space-y-4 shadow-xl animate-fadeInUp">
              <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#66625D] hover:text-[#1A1D1E]">Live Console</a>
              <a href="#exams" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#66625D] hover:text-[#1A1D1E]">Exam Hubs</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#66625D] hover:text-[#1A1D1E]">AI Capabilities</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#66625D] hover:text-[#1A1D1E]">Success Stories</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold text-[#66625D] hover:text-[#1A1D1E]">Pricing</a>
              <div className="pt-4 border-t border-[#E5E2D9] space-y-3">
                <button onClick={() => { setMobileMenuOpen(false); setAuthMode('login'); resetAuthState(); triggerLoadingState('auth'); }} className="w-full py-3 text-sm font-bold text-[#1A1D1E] bg-[#E5E2D9]/50 rounded-xl">Sign In</button>
                <button onClick={() => { setMobileMenuOpen(false); setAuthMode('signup'); resetAuthState(); triggerLoadingState('auth'); }} className="w-full py-3 text-sm font-bold bg-[#FAA114] text-[#1A1D1E] rounded-xl">Get Started Free</button>
              </div>
            </div>
          )}
        </header>

        {/* ═══════════ HERO SECTION (WARM ALABASTER CREAM & GOLD) ═══════════ */}
        <section className="ambient-mesh relative pt-32 md:pt-44 pb-20 md:pb-24 px-6 md:px-12 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            
            {/* Pill Badge */}
            <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF3E6] border border-[#E8D5B7] text-[#C88410] mb-8 text-xs font-mono font-bold tracking-wider uppercase">
              <span>✦ NEXT-GEN AI STUDY OPERATING SYSTEM</span>
            </div>

            {/* Main Headline */}
            <h1 className="animate-fadeInUp delay-100 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.06] mb-6 font-display text-[#1A1D1E]">
              One Platform.<br />
              <span className="text-[#FAA114]">Every Exam.</span><br />
              Infinite Mastery.
            </h1>

            {/* Subheading */}
            <p className="animate-fadeInUp delay-200 text-base md:text-lg text-[#66625D] max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Unifying competitive exams, university subjects, and document intelligence into one cohesive, personalized AI workspace for 500 million Indian learners.
            </p>

            {/* Action Buttons */}
            <div className="animate-fadeInUp delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  resetAuthState();
                  triggerLoadingState('auth');
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black rounded-xl flex items-center justify-center gap-3 shadow-md transition-all active:scale-[0.98] text-base"
              >
                Start Free Workspace
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('demo');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F5F4F0] text-[#1A1D1E] font-bold rounded-xl flex items-center justify-center gap-2.5 transition-all text-base border border-[#E5E2D9] shadow-sm"
              >
                Simulate Live CBT Exam 🚀
              </button>
            </div>

            {/* Trust Metrics Bar */}
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

        {/* ═══════════ HERO DEMO CONSOLE CARD (DARK CHARCOAL #262A2B) ═══════════ */}
        <section id="demo" className="px-6 md:px-12 py-12 md:py-20 relative">
          <div className="max-w-5xl mx-auto">
            
            <div className="dark-container p-8 md:p-12 space-y-8 shadow-2xl relative overflow-hidden">
              
              {/* Header */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAA114]/20 border border-[#FAA114]/40 text-[#FAA114] text-xs font-mono font-bold uppercase tracking-wider">
                  <span>✦ AFCAT 2026 MENTOR EDITION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display">
                  Preparing for Air Force Common Admission Test (AFCAT)?
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
                  Complete mentor-led AFCAT hub featuring comprehensive syllabus roadmaps, 15 full-length model papers, authentic PYQ PDFs (2018-2025), subject video playlists, and official AFCAT CBT quiz simulations.
                </p>
              </div>

              {/* Colored Pill Tags */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { name: 'Topic Tests', bg: 'bg-[#EAB308]', text: 'text-slate-950' },
                  { name: 'Full Mocks', bg: 'bg-[#22C55E]', text: 'text-slate-950' },
                  { name: 'PYQ Papers', bg: 'bg-[#F97316]', text: 'text-slate-950' },
                  { name: 'Daily Goals', bg: 'bg-[#3B82F6]', text: 'text-white' },
                  { name: 'AI Revision Plan', bg: 'bg-[#14B8A6]', text: 'text-slate-950' },
                  { name: 'AI Explainer', bg: 'bg-[#A855F7]', text: 'text-white' },
                  { name: 'Sectional Limits', bg: 'bg-[#EF4444]', text: 'text-white' },
                  { name: 'Readiness Report', bg: 'bg-[#8B5CF6]', text: 'text-white' },
                ].map((tag, i) => (
                  <button 
                    key={i} 
                    onClick={() => openExamWorkspace('afcat')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all hover:scale-105 shadow-sm ${tag.bg} ${tag.text}`}
                  >
                    ✓ {tag.name}
                  </button>
                ))}
              </div>

              {/* Readiness Assessment Inner Gauge Box */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-4xl font-black text-[#FAA114] font-display">98.4% READY</div>
                  <div className="text-xs text-slate-300 font-semibold uppercase tracking-wide">Readiness Assessment Score</div>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">8 / 8 Completed</span>
                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10">15 Mocks</span>
                  <button 
                    onClick={() => openExamWorkspace('afcat')}
                    className="px-5 py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-xs rounded-xl shadow-md transition-all"
                  >
                    Launch AFCAT Engine →
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ═══════════ ALL MAJOR INDIAN EXAMINATIONS SECTION ═══════════ */}
        <RevealSection>
          <section id="exams" className="px-6 md:px-12 py-20 relative bg-[#F5F4F0] border-y border-[#E5E2D9]">
            <div className="max-w-7xl mx-auto space-y-12">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                  <div className="pill-badge">
                    <span>✦ FULL EXAMINATION SUITES</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1A1D1E] font-display">
                    All Major Indian Examinations
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
                        ? 'bg-[#1A1D1E] text-[#FAFAF8] shadow-sm'
                        : 'bg-white text-[#66625D] hover:text-[#1A1D1E] border border-[#E5E2D9]'
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
                    className="light-card light-card-hover p-8 rounded-3xl space-y-5 flex flex-col justify-between group"
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

        {/* ═══════════ TESTIMONIALS / LOVED BY TOP RANKERS ═══════════ */}
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

        {/* ═══════════ TRANSPARENT PRICING TIERS ═══════════ */}
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
                
                {/* Free Tier */}
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
                    onClick={() => {
                      setAuthMode('signup');
                      resetAuthState();
                      triggerLoadingState('auth');
                    }}
                    className="w-full py-4 border border-[#E5E2D9] hover:bg-[#F5F4F0] text-[#1A1D1E] font-bold text-sm rounded-xl transition-all active:scale-[0.98]"
                  >
                    Current Active Plan
                  </button>
                </div>

                {/* Premium Tier */}
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
                    onClick={() => {
                      alert('Elite Pro checkout simulation successful!');
                      setIsLoggedIn(true);
                      triggerLoadingState('afcat');
                    }}
                    className="w-full py-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-black text-sm rounded-xl transition-all active:scale-[0.98] shadow-sm"
                  >
                    Upgrade Workspace
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
                    onClick={() => {
                      setAuthMode('signup');
                      resetAuthState();
                      triggerLoadingState('auth');
                    }}
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
     ONBOARDING WIZARD SCREEN
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
          }
        })
        .catch(err => {
          alert('Failed to complete onboarding. Please try again.');
          setOnboardingGenerating(false);
        });
      }, 2500);
    };

    return (
      <div className="min-h-screen bg-[#FAFAF8] text-[#1A1D1E] flex items-center justify-center p-4 md:p-12 font-sans">
        <div className="max-w-xl w-full light-card p-8 md:p-12 rounded-3xl shadow-xl space-y-8 relative overflow-hidden">
          
          <div className="flex justify-between items-center border-b border-[#E5E2D9] pb-5">
            <span className="text-xl font-bold tracking-tight flex items-center text-[#1A1D1E] font-display">
              Tejas<span className="w-2.5 h-2.5 rounded-full bg-[#FAA114] ml-1"></span>
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === onboardingStep 
                      ? 'w-6 bg-[#FAA114]' 
                      : s < onboardingStep 
                        ? 'w-2.5 bg-[#FAA114]/40' 
                        : 'w-2.5 bg-[#E5E2D9]'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {onboardingStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-[#1A1D1E] font-display">What is your primary study goal?</h2>
                <p className="text-sm text-[#66625D]">Select a vertical to customize your AI dashboard and roadmaps.</p>
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
                    className="p-5 border border-[#E5E2D9] bg-white hover:border-[#FAA114] hover:bg-[#FAF3E6] rounded-2xl text-left space-y-2 transition-all group"
                  >
                    <span className="font-bold text-sm block text-[#1A1D1E] group-hover:text-[#C88410] transition-colors">{cat.label}</span>
                    <span className="text-[11px] text-[#66625D] block">{cat.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-[#1A1D1E] font-display">Select your Target Exam</h2>
                <p className="text-sm text-[#66625D]">This binds the correct syllabus roadmap to your calendar.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#66625D]">Target Examination</label>
                  <select 
                    value={onboardingExamId}
                    onChange={(e) => setOnboardingExamId(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none transition-colors"
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
                  <label className="text-xs font-semibold text-[#66625D]">Target Attempt Year</label>
                  <select 
                    value={onboardingYear}
                    onChange={(e) => setOnboardingYear(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none transition-colors"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setOnboardingStep(1)} className="flex-1 py-3 border border-[#E5E2D9] text-[#1A1D1E] hover:bg-[#F5F4F0] font-bold rounded-xl transition-all">← Back</button>
                <button 
                  onClick={() => setOnboardingStep(3)} 
                  disabled={!onboardingExamId}
                  className="flex-1 py-3 bg-[#FAA114] text-[#1A1D1E] hover:bg-[#E8940F] font-bold rounded-xl disabled:opacity-50 transition-all shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-[#1A1D1E] font-display">Set Your Preferences</h2>
                <p className="text-sm text-[#66625D]">These values dictate your daily planner limits and learning medium.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#66625D]">Preferred Study Medium</label>
                  <select 
                    value={onboardingLanguage}
                    onChange={(e) => setOnboardingLanguage(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none transition-colors"
                  >
                    <option value="en">English (Default)</option>
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="hinglish">Hinglish (Bilingual)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#66625D]">Preparation Status</label>
                  <select 
                    value={onboardingPrepStatus}
                    onChange={(e) => setOnboardingPrepStatus(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none transition-colors"
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
                <button onClick={() => setOnboardingStep(2)} className="flex-1 py-3 border border-[#E5E2D9] text-[#1A1D1E] hover:bg-[#F5F4F0] font-bold rounded-xl transition-all">← Back</button>
                <button 
                  onClick={() => setOnboardingStep(4)} 
                  disabled={!onboardingPrepStatus}
                  className="flex-1 py-3 bg-[#FAA114] text-[#1A1D1E] hover:bg-[#E8940F] font-bold rounded-xl disabled:opacity-50 transition-all shadow-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {onboardingStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-[#1A1D1E] font-display">One Last Thing...</h2>
                <p className="text-sm text-[#66625D]">Provide details to customize state recommendations.</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#66625D]">State of Residence</label>
                  <select 
                    value={onboardingState}
                    onChange={(e) => setOnboardingState(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none transition-colors"
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
                  <label className="text-xs font-semibold text-[#66625D]">Mobile Number (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="+91 XXXXX XXXXX"
                    value={onboardingPhoneNumber}
                    onChange={(e) => setOnboardingPhoneNumber(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setOnboardingStep(3)} className="flex-1 py-3 border border-[#E5E2D9] text-[#1A1D1E] hover:bg-[#F5F4F0] font-bold rounded-xl transition-all">← Back</button>
                <button 
                  onClick={() => {
                    setOnboardingStep(5);
                    handleOnboardingSubmit();
                  }} 
                  disabled={!onboardingState}
                  className="flex-1 py-3 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold rounded-xl disabled:opacity-50 transition-all shadow-sm"
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
                  <div className="w-16 h-16 border-4 border-[#FAA114] border-t-transparent rounded-full animate-spin"></div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1A1D1E] font-display">Personalizing Your Workspace</h3>
                    <p className="text-xs text-[#66625D] animate-pulse">AI is compiling roadmaps, custom timetables, and spacing reviews...</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-[#FAF3E6] rounded-full flex items-center justify-center border border-[#E8D5B7]">
                    <CheckCircle className="w-10 h-10 text-[#FAA114]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#1A1D1E] font-display">Setup Complete!</h3>
                    <p className="text-xs text-[#66625D]">Your AI Learning Space is ready for launch.</p>
                  </div>
                  <button 
                    onClick={() => setProfileOnboardingCompleted(true)}
                    className="mt-6 px-8 py-3 bg-[#FAA114] text-[#1A1D1E] hover:bg-[#E8940F] font-bold rounded-xl transition-all shadow-sm"
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAF8] text-[#1A1D1E] font-sans">
      
      {/* LEFT SIDEBAR NAVIGATION (Desktop) */}
      {activeTab !== 'auth' && activeTab !== 'pricing' && (
        <aside className="hidden md:flex w-64 bg-[#FFFFFF] border-r border-[#E5E2D9] flex-col justify-between shrink-0 sticky top-0 h-screen">
          <div>
            {/* Logo */}
            <div className="p-6 border-b border-[#E5E2D9] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#1A1D1E] font-display">Tejas</span>
                <span className="w-2 h-2 rounded-full bg-[#FAA114]"></span>
              </div>
              <button onClick={() => triggerLoadingState('landing')} className="text-[11px] text-[#FAA114] hover:underline font-mono">
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
                          ? 'bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7] font-bold' 
                          : 'text-[#66625D] hover:bg-[#F5F4F0] hover:text-[#1A1D1E]'
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
          <div className="p-4 border-t border-[#E5E2D9]">
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizScore(null);
                triggerLoadingState('quiz-gen');
              }}
              className="w-full py-3 px-4 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-95 text-xs"
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
          <header className="h-16 border-b border-[#E5E2D9] px-6 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#66625D]">Current Target:</span>
              <button 
                onClick={() => triggerLoadingState('afcat')}
                className="px-3.5 py-1 bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7] text-xs font-bold rounded-full hover:bg-[#F5E8D0] transition-all flex items-center gap-1.5 shadow-sm"
              >
                ✈️ AFCAT 2026 (Air Force)
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => triggerLoadingState('pricing')}
                className="text-xs font-bold text-[#FAA114] hover:underline"
              >
                ✦ Upgrade Pro
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  triggerLoadingState('landing');
                }}
                className="text-xs font-semibold text-[#66625D] hover:text-[#1A1D1E]"
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
                <div className="w-full max-w-md light-card p-8 rounded-3xl space-y-6 shadow-xl border border-[#E5E2D9]">
                  
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <span className="text-3xl font-black text-[#1A1D1E] font-display">Tejas</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FAA114]"></span>
                    </div>
                    {authMode === 'signup' ? (
                      signupStep === 1 ? (
                        <>
                          <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Create Aspirant Account</h1>
                          <p className="text-xs text-[#66625D]">Verify your email address to unlock your personalized AI prep space.</p>
                        </>
                      ) : (
                        <>
                          <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Secure Your Account</h1>
                          <p className="text-xs text-[#66625D]">Set up a strong password for {authFullName || 'your account'}.</p>
                        </>
                      )
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Welcome Back</h1>
                        <p className="text-xs text-[#66625D]">Sign in to resume your active test sessions and revisions.</p>
                      </>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {otpSuccessMsg && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{otpSuccessMsg}</span>
                    </div>
                  )}

                  {/* SIGN UP FLOW */}
                  {authMode === 'signup' ? (
                    signupStep === 1 ? (
                      <form onSubmit={otpSent ? handleSignupVerify : handleSignupInitiate} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#66625D] uppercase tracking-wider">Full Name</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              required 
                              disabled={otpSent || loading}
                              placeholder="Priya Sharma" 
                              value={authFullName}
                              onChange={(e) => setAuthFullName(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#FAA114] text-sm text-[#1A1D1E] transition-colors disabled:opacity-50" 
                            />
                            <User className="w-4 h-4 text-[#66625D] absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#66625D] uppercase tracking-wider">Email Address</label>
                          <div className="relative">
                            <input 
                              type="email" 
                              required 
                              disabled={otpSent || loading}
                              placeholder="priya@example.com" 
                              value={authEmail}
                              onChange={(e) => setAuthEmail(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#FAA114] text-sm text-[#1A1D1E] transition-colors disabled:opacity-50" 
                            />
                            <Mail className="w-4 h-4 text-[#66625D] absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        {otpSent && (
                          <div className="space-y-1 pt-4 border-t border-[#E5E2D9] animate-fadeInUp">
                            <label className="text-xs font-bold text-[#66625D] uppercase tracking-wider">Verification Code (OTP)</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                required 
                                maxLength={6}
                                placeholder="123456" 
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full px-4 py-3 pl-10 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#FAA114] text-sm text-[#1A1D1E] text-center tracking-[0.5em] font-mono transition-colors" 
                              />
                              <Lock className="w-4 h-4 text-[#66625D] absolute left-3.5 top-3.5" />
                            </div>
                            {otpError && (
                              <p className="text-xs font-semibold text-red-600 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {otpError}
                              </p>
                            )}
                            
                            <div className="pt-2 flex justify-between items-center text-xs">
                              <button 
                                type="button" 
                                onClick={handleResendOtp}
                                className="text-[#FAA114] hover:underline font-semibold flex items-center gap-1"
                              >
                                <RefreshCw className="w-3 h-3" /> Resend OTP
                              </button>
                            </div>
                          </div>
                        )}

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 shadow-sm text-sm mt-4"
                        >
                          {loading ? 'Processing...' : otpSent ? 'Verify OTP & Continue' : 'Send Verification OTP'}
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleSignupComplete} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#66625D] uppercase tracking-wider">Set Password</label>
                          <input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#FAA114] text-sm text-[#1A1D1E] transition-colors" 
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#66625D] uppercase tracking-wider">Confirm Password</label>
                          <input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                            value={authConfirmPassword}
                            onChange={(e) => setAuthConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#FAA114] text-sm text-[#1A1D1E] transition-colors" 
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full py-3.5 bg-[#FAA114] text-[#1A1D1E] font-bold rounded-xl hover:bg-[#E8940F] transition-all shadow-sm text-sm"
                        >
                          {loading ? 'Saving...' : 'Complete Registration'}
                        </button>
                      </form>
                    )
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#66625D] uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="priya@example.com" 
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#FAA114] text-sm text-[#1A1D1E] transition-colors" 
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#66625D] uppercase tracking-wider">Password</label>
                        <input 
                          type="password" 
                          required 
                          placeholder="••••••••" 
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-[#E5E2D9] rounded-xl focus:outline-none focus:border-[#FAA114] text-sm text-[#1A1D1E] transition-colors" 
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold rounded-xl transition-all shadow-sm text-sm"
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
                      className="text-xs text-[#FAA114] hover:underline font-semibold"
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
                <div className="light-card p-6 rounded-3xl border-[#E5E2D9] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-[#1A1D1E] font-display flex items-center gap-2">
                      <Flame className="w-6 h-6 text-[#FAA114]" /> Welcome, {profileFullName}!
                    </h2>
                    <p className="text-sm text-[#66625D]">
                      Consistency Streak: <strong>{dashboardOverview.consistencyRating}%</strong> • Daily Target: <strong>{dashboardOverview.studyTimeMinutes}m / {profileGoal}m</strong>
                    </p>
                  </div>
                  <button onClick={() => triggerLoadingState('afcat')} className="px-5 py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold text-xs rounded-xl shadow-sm transition-all">
                    Launch CBT Mock Simulator →
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-[#1A1D1E] font-display">Active Daily Target Blocks</h3>
                    <div className="space-y-3">
                      {[
                        { title: `Complete daily syllabus topic block (${profileGoal} mins)`, duration: `${profileGoal}m`, done: dashboardOverview.studyTimeMinutes >= profileGoal },
                        { title: `Solve competitive exam practice test (Completed: ${dashboardOverview.quizzesCompleted})`, duration: '25m', done: dashboardOverview.quizzesCompleted > 0 },
                        { title: `Review ${dueCardsCount} due active recall flashcards`, duration: '15m', done: dueCardsCount === 0 }
                      ].map((task, idx) => (
                        <div key={idx} className="p-4 light-card rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" checked={task.done} readOnly className="accent-[#FAA114] w-4 h-4" />
                            <span className={`text-sm ${task.done ? 'line-through text-[#94A3B8]' : 'text-[#1A1D1E] font-medium'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-[#FAA114] font-bold">{task.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#1A1D1E] font-display">Document AI Ingest</h3>
                    <div onClick={() => triggerLoadingState('pdf')} className="border-2 border-dashed border-[#E5E2D9] p-8 rounded-3xl text-center space-y-3 hover:border-[#FAA114] transition-colors cursor-pointer bg-white">
                      <UploadCloud className="w-10 h-10 text-[#FAA114] mx-auto" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-[#1A1D1E]">Ingest Study PDF / Notes</p>
                        <p className="text-xs text-[#66625D]">Click to upload document</p>
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
                  <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Adaptive Study Planner</h1>
                  <button onClick={() => alert('Syllabus timeline auto-rebalanced across active calendar!')} className="px-4 py-2 bg-[#FAA114] text-[#1A1D1E] font-bold text-xs rounded-xl shadow-sm">
                    Rebalance Schedule
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="light-card p-6 rounded-3xl space-y-4">
                    <h3 className="text-base font-bold text-[#1A1D1E]">Daily Capacity Budget</h3>
                    <div className="space-y-3">
                      <input type="range" min="1" max="12" defaultValue="4" className="w-full accent-[#FAA114]" />
                      <div className="text-xs font-mono text-[#FAA114] font-bold text-right">4.0 Hours / Day</div>
                    </div>
                  </div>
                  <div className="md:col-span-2 light-card p-6 rounded-3xl space-y-4">
                    <h3 className="text-base font-bold text-[#1A1D1E]">Weekly Allocation Grid</h3>
                    <div className="grid grid-cols-7 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="p-3 bg-[#F5F4F0] rounded-2xl text-center space-y-1 border border-[#E5E2D9]">
                          <span className="text-xs font-bold text-[#1A1D1E] block">{day}</span>
                          <div className="p-1.5 rounded-lg bg-[#FAF3E6] text-[#C88410] text-[10px] font-bold">
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
                <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Exam Exploration Database</h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {examCategories.map((exam) => (
                    <div key={exam.id} className="light-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold text-[#FAA114] uppercase">{exam.badge}</span>
                        <h3 className="text-lg font-bold text-[#1A1D1E] font-display">{exam.name}</h3>
                        <p className="text-xs text-[#66625D]">{exam.candidates} Candidates yearly</p>
                      </div>
                      <button 
                        onClick={() => openExamWorkspace(exam.id)}
                        className="w-full py-2.5 bg-[#FAA114] hover:bg-[#E8940F] text-[#1A1D1E] font-bold text-xs rounded-xl shadow-sm transition-all"
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
                  <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Syllabus Explorer</h1>
                  <button onClick={() => triggerLoadingState('quiz-gen')} className="px-4 py-2 bg-[#FAA114] text-[#1A1D1E] text-xs font-bold rounded-xl shadow-sm">
                    + Generate Test
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="light-card p-6 rounded-3xl space-y-4">
                    <h3 className="text-xs font-bold font-mono uppercase text-[#66625D]">Syllabus Hierarchy</h3>
                    <div className="space-y-2 text-sm">
                      <div className="font-bold text-[#FAA114] flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" /> 1. Indian Constitution & Polity
                      </div>
                      <div className="pl-6 space-y-1.5 text-xs text-[#66625D]">
                        <div className="text-[#1A1D1E] font-semibold">1.1 Historical Background</div>
                        <div>1.2 Preamble & Fundamental Rights</div>
                        <div>1.3 Directive Principles & Union Judiciary</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 light-card p-8 rounded-3xl space-y-4">
                    <h2 className="text-xl font-bold text-[#1A1D1E] font-display">1.1 Historical Background (1773 to 1947)</h2>
                    <p className="text-sm text-[#66625D] leading-relaxed">
                      The constitutional development in British India commenced systematically with the Regulating Act of 1773, which established the Supreme Court of Calcutta and subordinated Bombay/Madras presidencies. Pitt&apos;s India Act of 1784 established the Board of Control, creating dual control over administration.
                    </p>
                    <div className="pt-4 border-t border-[#E5E2D9] flex justify-between items-center text-xs">
                      <span className="text-[#66625D] font-mono">Reference: Official UPSC Syllabus GS Paper 2</span>
                      <button onClick={() => triggerLoadingState('afcat')} className="text-[#FAA114] font-bold hover:underline">
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
                <div className="md:col-span-2 light-card rounded-3xl flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-[#E5E2D9] flex justify-between items-center bg-[#F5F4F0]">
                    <span className="text-xs font-mono font-bold text-[#1A1D1E]">UPSC_Syllabus_2026.pdf (Page 1 of 12)</span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white border border-[#E5E2D9] rounded-lg text-xs hover:bg-[#F5F4F0]">Prev</button>
                      <button className="px-3 py-1 bg-white border border-[#E5E2D9] rounded-lg text-xs hover:bg-[#F5F4F0]">Next</button>
                    </div>
                  </div>
                  <div className="flex-1 p-8 flex items-center justify-center text-center">
                    <div className="max-w-md space-y-3">
                      <FileText className="w-16 h-16 text-[#FAA114] mx-auto" />
                      <h3 className="text-lg font-bold text-[#1A1D1E] font-display">PDF Document Ingestion Engine</h3>
                      <p className="text-xs text-[#66625D]">
                        Select any passage in your textbook to trigger contextual explanations, formula derivations, or instant active recall flashcard generation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="light-card rounded-3xl flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-[#E5E2D9] flex items-center gap-2 bg-[#F5F4F0]">
                    <Sparkles className="w-4 h-4 text-[#FAA114]" />
                    <span className="text-xs font-bold text-[#1A1D1E] font-display">AI Document Explainer</span>
                  </div>
                  <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                    <div className="p-3 bg-[#F5F4F0] border border-[#E5E2D9] text-xs rounded-xl max-w-[90%] text-[#1A1D1E]">
                      Hello! I have fully indexed this textbook. What concept would you like me to clarify?
                    </div>
                  </div>
                  <div className="p-3 border-t border-[#E5E2D9] flex gap-2">
                    <input type="text" placeholder="Ask about this document..." className="flex-1 px-3 py-2 bg-white border border-[#E5E2D9] rounded-xl text-xs text-[#1A1D1E] focus:outline-none focus:border-[#FAA114]" />
                    <button className="px-4 py-2 bg-[#FAA114] text-[#1A1D1E] font-bold text-xs rounded-xl shadow-sm">Send</button>
                  </div>
                </div>
              </div>
            )}

            {/* ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8 animate-fadeInUp">
                <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Performance Analytics & Concept Mastery</h1>
                <div className="light-card p-8 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-[#1A1D1E] font-display">Concept Mastery Radar (Past 30 Days)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { topic: 'Reasoning Logic', mastery: '94%', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
                      { topic: 'General Knowledge', mastery: '76%', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
                      { topic: 'Numerical Ability', mastery: '82%', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
                      { topic: 'English Verbal', mastery: '90%', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' }
                    ].map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-2xl border ${item.bg} space-y-1`}>
                        <div className="text-xs text-[#66625D]">{item.topic}</div>
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
                    <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Active Recall Deck</h1>
                    <p className="text-xs text-[#66625D] font-mono">FSRS Spaced Repetition Queue</p>
                  </div>
                  <span className="px-3 py-1 bg-[#FAF3E6] text-[#C88410] border border-[#E8D5B7] text-xs font-bold rounded-full">
                    {dueCards.length} due for review
                  </span>
                </div>

                {dueCards.length === 0 ? (
                  <div className="light-card p-12 rounded-3xl text-center space-y-4">
                    <RotateCcw className="w-12 h-12 text-[#FAA114] mx-auto animate-spin-slow" />
                    <h3 className="text-lg font-bold text-[#1A1D1E] font-display">All Caught Up!</h3>
                    <p className="text-xs text-[#66625D] max-w-sm mx-auto">
                      No flashcards due right now. Attempt exam quizzes to automatically generate active recall cards for challenging topics.
                    </p>
                  </div>
                ) : (
                  (() => {
                    const card = dueCards[activeCardIndex] || dueCards[0];
                    return (
                      <div className="light-card rounded-3xl overflow-hidden shadow-md flex flex-col min-h-[300px] justify-between">
                        <div className="p-4 bg-[#F5F4F0] border-b border-[#E5E2D9] flex justify-between items-center text-xs text-[#66625D] font-mono">
                          <span>Difficulty: {Number(card.difficulty || 4.5).toFixed(1)}/10</span>
                          <span>Repetitions: {card.repetitionCount || 0}</span>
                        </div>

                        <div className="p-8 flex-1 flex flex-col justify-center space-y-6 text-center">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-[#FAA114] uppercase tracking-wider">QUESTION / FRONT</span>
                            <p className="text-lg font-semibold text-[#1A1D1E]">{card.frontText}</p>
                          </div>

                          {showAnswer && (
                            <div className="pt-6 border-t border-[#E5E2D9] space-y-2 animate-fadeInUp">
                              <span className="text-[10px] font-mono font-bold text-[#22C55E] uppercase tracking-wider">ANSWER / BACK</span>
                              <p className="text-sm text-[#66625D] leading-relaxed">{card.backText}</p>
                            </div>
                          )}
                        </div>

                        <div className="p-6 bg-[#F5F4F0] border-t border-[#E5E2D9]">
                          {!showAnswer ? (
                            <button
                              onClick={() => setShowAnswer(true)}
                              className="w-full py-3 bg-[#FAA114] text-[#1A1D1E] font-bold rounded-xl hover:bg-[#E8940F] transition-all shadow-sm text-xs"
                            >
                              Reveal Answer
                            </button>
                          ) : (
                            <div className="grid grid-cols-4 gap-2">
                              {[
                                { label: 'Again', rating: 1, color: 'bg-red-500 hover:bg-red-600 text-white' },
                                { label: 'Hard', rating: 2, color: 'bg-amber-500 hover:bg-amber-600 text-slate-950' },
                                { label: 'Good', rating: 3, color: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
                                { label: 'Easy', rating: 4, color: 'bg-blue-500 hover:bg-blue-600 text-white' }
                              ].map((btn) => (
                                <button
                                  key={btn.rating}
                                  onClick={() => handleReviewCard(card.id, btn.rating)}
                                  className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-colors ${btn.color}`}
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
              <div className="max-w-xl mx-auto light-card p-8 rounded-3xl space-y-6 animate-fadeInUp">
                <h1 className="text-2xl font-bold text-[#1A1D1E] font-display">Aspirant Profile & Preferences</h1>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#66625D]">Full Name</label>
                    <input 
                      type="text" 
                      value={profileFullName} 
                      onChange={(e) => setProfileFullName(e.target.value)} 
                      className="w-full p-3 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#66625D]">Mobile Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX"
                      value={profilePhoneNumber} 
                      onChange={(e) => setProfilePhoneNumber(e.target.value)} 
                      className="w-full p-3 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#66625D]">Daily Goal (Minutes)</label>
                      <input 
                        type="number" 
                        value={profileGoal} 
                        onChange={(e) => setProfileGoal(parseInt(e.target.value, 10) || 0)} 
                        className="w-full p-3 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#66625D]">Target Year</label>
                      <select 
                        value={profileTargetYear} 
                        onChange={(e) => setProfileTargetYear(e.target.value)} 
                        className="w-full p-3 bg-white border border-[#E5E2D9] rounded-xl text-sm text-[#1A1D1E] focus:border-[#FAA114] focus:outline-none"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleSaveProfile} 
                    className="w-full py-3.5 bg-[#FAA114] text-[#1A1D1E] font-bold rounded-xl hover:bg-[#E8940F] transition-all shadow-sm text-sm mt-4"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* ADMIN CONSOLE */}
            {activeTab === 'admin' && (
              <div className="space-y-8 animate-fadeInUp">
                <h1 className="text-3xl font-bold text-[#1A1D1E] font-display">System Administration Console</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), color: 'border-l-4 border-blue-500' },
                    { label: 'Active Premium', value: adminStats.activePremium.toLocaleString(), color: 'border-l-4 border-emerald-500' },
                    { label: 'Monthly Revenue', value: `₹${(adminStats.totalRevenue * 80).toFixed(0)}`, color: 'border-l-4 border-amber-500' },
                    { label: 'GenAI Tokens', value: adminStats.totalTokensUsed.toLocaleString(), color: 'border-l-4 border-indigo-500' },
                  ].map((kpi, i) => (
                    <div key={i} className={`light-card p-5 rounded-2xl space-y-1 ${kpi.color}`}>
                      <span className="text-xs text-[#66625D] uppercase font-mono">{kpi.label}</span>
                      <div className="text-2xl font-bold text-[#1A1D1E] font-display">{kpi.value}</div>
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
        <nav className="md:hidden h-16 border-t border-[#E5E2D9] bg-white/95 backdrop-blur-md flex items-center justify-around fixed bottom-0 left-0 right-0 z-50">
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
                  isActive ? 'text-[#FAA114]' : 'text-[#66625D] hover:text-[#1A1D1E]'
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
