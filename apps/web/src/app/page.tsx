'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  RefreshCw
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
      { threshold: 0.15 }
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
          const duration = 1500;
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
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#262a2b]" style={{ fontFamily: 'Outfit' }}>
        {count}{suffix}
      </div>
      <div className="text-sm text-[#786e67] mt-2 font-medium">{label}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   EXAM CARD DATA
   ────────────────────────────────────────────────── */
const examCategories = [
  { name: 'UPSC Civil Services', icon: Shield, candidates: '12L+', color: '#faa114' },
  { name: 'JEE Main & Advanced', icon: Zap, candidates: '25L+', color: '#786e67' },
  { name: 'NEET UG', icon: GraduationCap, candidates: '20L+', color: '#faa114' },
  { name: 'GATE Engineering', icon: Brain, candidates: '9L+', color: '#786e67' },
  { name: 'SSC CGL/CHSL', icon: Target, candidates: '30L+', color: '#faa114' },
  { name: 'Banking PO/Clerk', icon: BarChart3, candidates: '15L+', color: '#786e67' },
  { name: 'State PSC', icon: BookMarked, candidates: '8L+', color: '#faa114' },
  { name: 'Defence (NDA/CDS)', icon: Shield, candidates: '5L+', color: '#786e67' },
];

const features = [
  {
    icon: Sparkles,
    title: 'AI Quiz Engine',
    description: 'Paste a topic, upload a PDF, or share a YouTube link — AI generates instant quizzes with explanations.',
    tag: 'CORE FEATURE',
  },
  {
    icon: Calendar,
    title: 'Smart Study Planner',
    description: 'Personalized daily roadmaps that auto-adjust when you miss sessions or improve accuracy.',
    tag: 'AI POWERED',
  },
  {
    icon: TrendingUp,
    title: 'Deep Analytics',
    description: 'Concept mastery heatmaps, predicted percentiles, weak-topic detection, and AI-driven study recommendations.',
    tag: 'INSIGHTS',
  },
  {
    icon: FileText,
    title: 'PDF & Research Hub',
    description: 'Split-pane workspace: read documents on the left, chat with AI about them on the right.',
    tag: 'WORKSPACE',
  },
  {
    icon: RotateCcw,
    title: 'Spaced Repetition',
    description: 'Automatic revision scheduling based on the FSRS algorithm — never forget what you\'ve learned.',
    tag: 'RETENTION',
  },
  {
    icon: Brain,
    title: 'Adaptive Learning',
    description: 'AI identifies your weak areas and generates targeted practice to strengthen them systematically.',
    tag: 'PERSONALIZED',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'UPSC CSE 2025 — AIR 47',
    quote: 'Tejas changed how I prepare. The AI study planner alone saved me 2 hours daily by eliminating guesswork.',
    avatar: 'PS',
  },
  {
    name: 'Arjun Menon',
    role: 'JEE Advanced — 99.4%ile',
    quote: 'The instant quiz generator from my PDFs is incredible. I can test myself on any chapter in seconds.',
    avatar: 'AM',
  },
  {
    name: 'Kavitha R.',
    role: 'NEET UG — 680/720',
    quote: 'The spaced repetition system helped me retain Biology concepts I kept forgetting. Game changer.',
    avatar: 'KR',
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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      setActiveTab('dashboard');
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
          // Send OTP and transition to OTP verification page
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
      setActiveTab('dashboard');
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

  // Ingestion state
  const [uploadedFiles] = useState([
    { name: 'UPSC_Syllabus_2026.pdf', size: '2.4 MB', status: 'Completed' },
    { name: 'Physics_Electromagnetism.pdf', size: '4.8 MB', status: 'Completed' }
  ]);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileFullName, setProfileFullName] = useState('Priya Sharma');
  const [profileGoal, setProfileGoal] = useState(60);
  const [profileLanguage, setProfileLanguage] = useState('en');

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
        // Clear query parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        setActiveTab('dashboard');
      } else {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setIsLoggedIn(true);
        }
      }
    }
  }, []);

  // Sync profile data with database on login
  const [dashboardOverview, setDashboardOverview] = useState<any>({
    overallAccuracy: 0,
    averageTimeSeconds: 0,
    quizzesCompleted: 0,
    studyTimeMinutes: 0,
    consistencyRating: 0,
    completionRate: 0
  });

  const [dueCardsCount, setDueCardsCount] = useState(0);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://localhost:3001/api/v1/profile', {
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
          setUser(prev => ({
            ...prev,
            name: data.fullName
          }));
        }
      })
      .catch(err => console.log('Backend profile sync offline'));

      // Fetch dashboard overview stats
      fetch('http://localhost:3001/api/v1/analytics/overview', {
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

      // Fetch AI recommendations & insights
      fetch('http://localhost:3001/api/v1/analytics/insights', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setDueCardsCount(data.cardsDue || 0);
          setRecommendations(data.suggestions || []);
        }
      })
      .catch(err => console.log('Backend insights offline'));
    }
  }, [isLoggedIn]);

  // Load stats and users from backend on component mount / tab switch
  useEffect(() => {
    if (activeTab === 'admin' && isLoggedIn) {
      // Fetch stats
      fetch('http://localhost:3001/api/v1/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.kpis) {
          setAdminStats(data.kpis);
        }
      })
      .catch(err => console.log('Using local mock admin stats (backend offline)'));

      // Fetch users
      fetch('http://localhost:3001/api/v1/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAdminUsers(data.map((u: any) => ({
            id: u.id,
            name: u.profile?.fullName || 'N/A',
            email: u.email,
            role: u.role,
            createdAt: new Date(u.createdAt).toISOString().split('T')[0]
          })));
        }
      })
      .catch(err => console.log('Using local mock admin users (backend offline)'));
    }

    if (activeTab === 'revision' && isLoggedIn) {
      fetch('http://localhost:3001/api/v1/revision/due', {
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
    }, 800);
  };

  const handleSaveProfile = () => {
    fetch('http://localhost:3001/api/v1/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({
        fullName: profileFullName,
        dailyStudyGoalMinutes: profileGoal,
        preferredLanguage: profileLanguage
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.profile) {
        alert('Profile saved to PostgreSQL!');
        setProfileFullName(data.profile.fullName);
        setProfileGoal(data.profile.dailyStudyGoalMinutes);
        setProfileLanguage(data.profile.preferredLanguage);
        setUser(prev => ({
          ...prev,
          name: data.profile.fullName
        }));
      }
    })
    .catch(err => alert('Failed to save profile configuration.'));
  };

  const handleReviewCard = (cardId: string, rating: number) => {
    fetch('http://localhost:3001/api/v1/revision/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({ cardId, rating })
    })
    .then(res => res.json())
    .then(data => {
      // Remove card from queue
      setDueCards(prev => prev.filter(c => c.id !== cardId));
      setShowAnswer(false);
      // Decrement the cardsDueCount
      setDueCardsCount(prev => Math.max(0, prev - 1));
    })
    .catch(err => alert('Failed to log review.'));
  };

  /* ────────────────────────────────────────
     LANDING PAGE RENDER
     ──────────────────────────────────────── */
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen bg-[#fcfcfb] text-[#262a2b]">

        {/* ═══════════ STICKY NAVIGATION ═══════════ */}
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
              ? 'glass shadow-sm' 
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Outfit' }}>
                Tejas
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#faa114] animate-pulse"></span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-[#786e67] hover:text-[#262a2b] transition-colors">Features</a>
              <a href="#exams" className="text-sm font-medium text-[#786e67] hover:text-[#262a2b] transition-colors">Exams</a>
              <a href="#testimonials" className="text-sm font-medium text-[#786e67] hover:text-[#262a2b] transition-colors">Stories</a>
              <a href="#pricing" className="text-sm font-medium text-[#786e67] hover:text-[#262a2b] transition-colors">Pricing</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={() => { setAuthMode('login'); resetAuthState(); triggerLoadingState('auth'); }}
                className="px-5 py-2.5 text-sm font-semibold text-[#786e67] hover:text-[#262a2b] transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => { setAuthMode('signup'); resetAuthState(); triggerLoadingState('auth'); }}
                className="px-6 py-2.5 text-sm font-semibold bg-[#262a2b] text-[#fcfcfb] rounded-xl hover:bg-[#262a2b]/90 transition-all active:scale-[0.97] shadow-sm"
              >
                Get Started Free
              </button>
            </div>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu overlay */}
          {mobileMenuOpen && (
            <div className="md:hidden glass border-t border-[#dbd7c7]">
              <div className="px-6 py-6 space-y-4">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#786e67]">Features</a>
                <a href="#exams" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#786e67]">Exams</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#786e67]">Stories</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-medium text-[#786e67]">Pricing</a>
                <div className="pt-4 border-t border-[#dbd7c7] space-y-3">
                  <button onClick={() => { setMobileMenuOpen(false); setAuthMode('login'); resetAuthState(); triggerLoadingState('auth'); }} className="w-full py-3 text-sm font-semibold text-[#786e67]">Sign In</button>
                  <button onClick={() => { setMobileMenuOpen(false); setAuthMode('signup'); resetAuthState(); triggerLoadingState('auth'); }} className="w-full py-3 text-sm font-semibold bg-[#262a2b] text-[#fcfcfb] rounded-xl">Get Started Free</button>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* ═══════════ HERO SECTION ═══════════ */}
        <section className="ambient-gradient relative pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-12 overflow-hidden">
          {/* Decorative floating elements */}
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#faa114]/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
          <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-[#786e67]/5 rounded-full blur-3xl animate-float-delayed pointer-events-none"></div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-2 bg-[#faa114]/10 border border-[#faa114]/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-[#faa114]" />
              <span className="text-xs font-semibold text-[#786e67] tracking-wide uppercase">AI-Powered Learning Platform for India</span>
            </div>

            {/* Main heading */}
            <h1 className="animate-fadeInUp delay-100 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6" style={{ fontFamily: 'Outfit' }}>
              One Platform.<br />
              <span className="gradient-text">Every Exam.</span><br />
              Infinite Mastery.
            </h1>

            {/* Subheading */}
            <p className="animate-fadeInUp delay-200 text-lg md:text-xl text-[#786e67] max-w-2xl mx-auto mb-10 leading-relaxed">
              Unifying competitive exams, university subjects, and document intelligence into one cohesive, AI-personalized learning workspace.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fadeInUp delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => {
                  setAuthMode('signup');
                  resetAuthState();
                  triggerLoadingState('auth');
                }}
                className="group px-8 py-4 bg-[#faa114] hover:bg-[#e8940f] text-[#262a2b] font-bold rounded-2xl flex items-center gap-3 shadow-lg shadow-[#faa114]/20 transition-all active:scale-[0.97] animate-pulse-glow text-base"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('features');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-[#dbd7c7] hover:border-[#786e67] text-[#786e67] hover:text-[#262a2b] font-semibold rounded-2xl flex items-center gap-2 transition-all text-base"
              >
                <Play className="w-4 h-4" />
                See How It Works
              </button>
            </div>

            {/* Social proof strip */}
            <div className="animate-fadeInUp delay-500 mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#b3aa9e]">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['PS', 'AM', 'KR', 'VN'].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#dbd7c7] border-2 border-[#fcfcfb] flex items-center justify-center text-[10px] font-bold text-[#786e67]">
                      {initials}
                    </div>
                  ))}
                </div>
                <span className="font-medium">50,000+ learners joined</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-[#dbd7c7]"></div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#faa114] text-[#faa114]" />
                ))}
                <span className="ml-1 font-medium">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ PRODUCT PREVIEW / DASHBOARD MOCKUP ═══════════ */}
        <RevealSection>
          <section className="px-6 md:px-12 -mt-8">
            <div className="max-w-6xl mx-auto">
              <div className="bg-[#262a2b] rounded-3xl p-3 md:p-4 shadow-2xl shadow-[#262a2b]/20">
                <div className="bg-[#fcfcfb] rounded-2xl overflow-hidden">
                  {/* Mock toolbar */}
                  <div className="h-10 bg-[#f5f4f0] border-b border-[#dbd7c7] flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#dbd7c7]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#dbd7c7]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#dbd7c7]"></div>
                    <div className="flex-1 flex justify-center">
                      <div className="px-4 py-1 bg-white/50 border border-[#dbd7c7] rounded-lg text-[10px] text-[#b3aa9e]">
                        tejas.app/dashboard
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock dashboard content */}
                  <div className="flex">
                    {/* Sidebar mock */}
                    <div className="hidden md:block w-52 border-r border-[#dbd7c7] p-4 space-y-2 bg-[#fcfcfb]">
                      <div className="flex items-center gap-2 px-3 py-2">
                        <span className="text-sm font-bold" style={{ fontFamily: 'Outfit' }}>Tejas</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#faa114]"></span>
                      </div>
                      {['Dashboard', 'Study Planner', 'Exam Explorer', 'Quiz Engine', 'Analytics', 'Revision'].map((item, i) => (
                        <div key={i} className={`px-3 py-2 rounded-lg text-xs font-medium ${i === 0 ? 'bg-[#dbd7c7]/50 text-[#262a2b] border-l-2 border-[#faa114]' : 'text-[#b3aa9e]'}`}>
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Main content mock */}
                    <div className="flex-1 p-6 space-y-4">
                      {/* Welcome banner */}
                      <div className="bg-[#faa114]/5 border border-[#faa114]/10 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold">Good Morning, Aspirant! 🔥</div>
                          <div className="text-[10px] text-[#786e67]">Streak: 12 Days • UPSC CSE 2026</div>
                        </div>
                        <div className="text-xs font-bold text-[#faa114]">96.4% Predicted</div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {/* Stats cards */}
                        {[
                          { label: 'Concepts Mastered', value: '247', color: '#faa114' },
                          { label: 'Quizzes Completed', value: '89', color: '#786e67' },
                          { label: 'Study Hours', value: '156h', color: '#262a2b' },
                        ].map((stat, i) => (
                          <div key={i} className="bg-white border border-[#dbd7c7] rounded-xl p-3 text-center">
                            <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                            <div className="text-[9px] text-[#b3aa9e] mt-0.5">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Mastery heatmap preview */}
                      <div className="bg-white border border-[#dbd7c7] rounded-xl p-4">
                        <div className="text-xs font-bold mb-3">Concept Mastery Map</div>
                        <div className="grid grid-cols-8 gap-1.5">
                          {[
                            '#faa114', '#faa114', '#786e67', '#dbd7c7', '#faa114', '#262a2b', '#786e67', '#faa114',
                            '#786e67', '#dbd7c7', '#faa114', '#faa114', '#786e67', '#faa114', '#dbd7c7', '#786e67',
                          ].map((color, i) => (
                            <div key={i} className="h-6 rounded" style={{ backgroundColor: color, opacity: 0.85 }}></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ STATS BAR ═══════════ */}
        <RevealSection>
          <section className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <AnimatedCounter end={50} suffix="K+" label="Active Learners" />
              <AnimatedCounter end={120} suffix="+" label="Exams Supported" />
              <AnimatedCounter end={2} suffix="M+" label="Quizzes Generated" />
              <AnimatedCounter end={97} suffix="%" label="User Satisfaction" />
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ EXAM EXPLORER SLIDER ═══════════ */}
        <RevealSection>
          <section id="exams" className="py-16 md:py-24 px-6 md:px-12 bg-[#f9f8f5]">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#faa114]/10 border border-[#faa114]/20 rounded-full mb-4">
                  <Target className="w-3.5 h-3.5 text-[#faa114]" />
                  <span className="text-xs font-semibold text-[#786e67] tracking-wide uppercase">Every Exam, One Platform</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit' }}>
                  All Major Indian Examinations
                </h2>
                <p className="text-base text-[#786e67] max-w-lg mx-auto">
                  From UPSC to JEE, NEET to Banking — complete syllabus coverage with AI-generated study paths.
                </p>
              </div>

              <div className="exam-slider pb-4">
                {examCategories.map((exam, i) => {
                  const Icon = exam.icon;
                  return (
                    <div key={i} className="min-w-[260px] md:min-w-[280px] bg-[#fcfcfb] border border-[#dbd7c7] rounded-2xl p-6 card-hover cursor-pointer group">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ backgroundColor: `${exam.color}15` }}>
                        <Icon className="w-6 h-6" style={{ color: exam.color }} />
                      </div>
                      <h3 className="text-base font-bold mb-1">{exam.name}</h3>
                      <p className="text-xs text-[#b3aa9e] mb-4">{exam.candidates} aspirants yearly</p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#faa114] group-hover:gap-2 transition-all">
                        Explore Syllabus <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ CORE FEATURES GRID ═══════════ */}
        <RevealSection>
          <section id="features" className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#faa114]/10 border border-[#faa114]/20 rounded-full mb-4">
                  <Zap className="w-3.5 h-3.5 text-[#faa114]" />
                  <span className="text-xs font-semibold text-[#786e67] tracking-wide uppercase">Powered by AI</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit' }}>
                  Everything You Need to Excel
                </h2>
                <p className="text-base text-[#786e67] max-w-lg mx-auto">
                  Six powerful modules working together to transform how India learns and prepares.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="group bg-[#fcfcfb] border border-[#dbd7c7] rounded-2xl p-8 card-hover relative overflow-hidden">
                      {/* Subtle corner accent */}
                      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#faa114]/5 group-hover:bg-[#faa114]/10 transition-colors"></div>
                      
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#dbd7c7]/40 rounded-md mb-5">
                          <span className="text-[10px] font-bold text-[#786e67] tracking-wider">{feature.tag}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-[#faa114]/10 flex items-center justify-center mb-5 group-hover:bg-[#faa114]/20 transition-colors">
                          <Icon className="w-6 h-6 text-[#faa114]" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-sm text-[#786e67] leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <RevealSection>
          <section className="py-20 md:py-28 px-6 md:px-12 bg-[#f9f8f5]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit' }}>
                  Three Steps to Mastery
                </h2>
                <p className="text-base text-[#786e67] max-w-md mx-auto">
                  From sign-up to exam-ready in a streamlined AI-powered workflow.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Choose Your Target',
                    description: 'Select your exam or academic subject. AI maps the complete syllabus and creates your personalized roadmap.',
                    icon: Target,
                  },
                  {
                    step: '02',
                    title: 'Learn & Practice',
                    description: 'Study with AI-generated quizzes, read PDFs with an AI explainer, and follow your adaptive daily plan.',
                    icon: Brain,
                  },
                  {
                    step: '03',
                    title: 'Track & Master',
                    description: 'Monitor mastery with analytics heatmaps, get AI revision schedules, and receive predicted scores.',
                    icon: Award,
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="relative">
                      {i < 2 && (
                        <div className="hidden md:block absolute top-14 left-full w-full h-px bg-gradient-to-r from-[#dbd7c7] to-transparent -translate-x-4 z-0"></div>
                      )}
                      <div className="relative z-10 text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#fcfcfb] border border-[#dbd7c7] flex items-center justify-center mb-6 shadow-sm">
                          <Icon className="w-7 h-7 text-[#faa114]" />
                        </div>
                        <div className="text-xs font-bold text-[#faa114] tracking-widest mb-2">STEP {item.step}</div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-sm text-[#786e67] leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <RevealSection>
          <section id="testimonials" className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#faa114]/10 border border-[#faa114]/20 rounded-full mb-4">
                  <Users className="w-3.5 h-3.5 text-[#faa114]" />
                  <span className="text-xs font-semibold text-[#786e67] tracking-wide uppercase">Success Stories</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit' }}>
                  Loved by Top Rankers
                </h2>
                <p className="text-base text-[#786e67] max-w-md mx-auto">
                  Hear from aspirants who cracked their dream exams with Tejas.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <div key={i} className="bg-[#fcfcfb] border border-[#dbd7c7] rounded-2xl p-8 card-hover relative">
                    <Quote className="w-8 h-8 text-[#faa114]/20 absolute top-6 right-6" />
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#faa114]/10 flex items-center justify-center text-sm font-bold text-[#faa114]">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{t.name}</div>
                        <div className="text-xs text-[#faa114] font-semibold">{t.role}</div>
                      </div>
                    </div>
                    <p className="text-sm text-[#786e67] leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex gap-0.5 mt-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-[#faa114] text-[#faa114]" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ PRICING ═══════════ */}
        <RevealSection>
          <section id="pricing" className="py-20 md:py-28 px-6 md:px-12 bg-[#f9f8f5]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#faa114]/10 border border-[#faa114]/20 rounded-full mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#faa114]" />
                  <span className="text-xs font-semibold text-[#786e67] tracking-wide uppercase">Simple Pricing</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: 'Outfit' }}>
                  Plans That Grow With You
                </h2>
                <p className="text-base text-[#786e67] max-w-md mx-auto">
                  Start free, upgrade when you need unlimited AI power.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Free */}
                <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-8 md:p-10 rounded-3xl flex flex-col justify-between card-hover">
                  <div>
                    <h3 className="text-lg font-bold text-[#786e67] mb-2">Free Learner</h3>
                    <div className="text-5xl font-bold mb-1" style={{ fontFamily: 'Outfit' }}>
                      ₹0<span className="text-base font-medium text-[#b3aa9e] ml-1">/ month</span>
                    </div>
                    <p className="text-xs text-[#b3aa9e] mb-8">Perfect for getting started</p>
                    <ul className="space-y-3">
                      {[
                        '3 AI quiz tokens daily',
                        'Basic syllabus roadmap',
                        'Performance history',
                        'Community access',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-[#786e67]">
                          <CheckCircle className="w-4 h-4 text-[#faa114] flex-shrink-0" />
                          {item}
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
                    className="mt-10 w-full py-3.5 border border-[#dbd7c7] hover:border-[#786e67] text-[#262a2b] font-semibold rounded-xl transition-all active:scale-[0.97]"
                  >
                    Start Free
                  </button>
                </div>

                {/* Premium */}
                <div className="bg-[#fcfcfb] border-2 border-[#faa114] p-8 md:p-10 rounded-3xl flex flex-col justify-between card-hover relative overflow-hidden">
                  <div className="absolute -top-px -right-px">
                    <div className="bg-[#faa114] text-[#262a2b] text-[10px] font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl tracking-wide">
                      RECOMMENDED
                    </div>
                  </div>

                  {/* Subtle gradient accent */}
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#faa114]/5 rounded-full blur-3xl"></div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-[#faa114] mb-2">Elite Premium</h3>
                    <div className="text-5xl font-bold mb-1" style={{ fontFamily: 'Outfit' }}>
                      ₹499<span className="text-base font-medium text-[#b3aa9e] ml-1">/ month</span>
                    </div>
                    <p className="text-xs text-[#b3aa9e] mb-8">For serious aspirants</p>
                    <ul className="space-y-3">
                      {[
                        'Unlimited AI quiz generation',
                        'PDF & YouTube ingestion',
                        'Advanced analytics & prediction',
                        'Spaced repetition auto-sync',
                        'Priority AI processing',
                        'Personalized AI mentor',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-[#786e67]">
                          <CheckCircle className="w-4 h-4 text-[#faa114] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Elite plan mock checkout successful!');
                      setIsLoggedIn(true);
                      triggerLoadingState('dashboard');
                    }}
                    className="relative z-10 mt-10 w-full py-3.5 bg-[#faa114] hover:bg-[#e8940f] text-[#262a2b] font-bold rounded-xl transition-all active:scale-[0.97] shadow-lg shadow-[#faa114]/20"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ FINAL CTA SECTION ═══════════ */}
        <RevealSection>
          <section className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-[#262a2b] rounded-3xl p-12 md:p-16 relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#faa114]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#faa114]/5 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#fcfcfb] mb-4 tracking-tight" style={{ fontFamily: 'Outfit' }}>
                    Ready to Transform Your Preparation?
                  </h2>
                  <p className="text-base text-[#b3aa9e] max-w-md mx-auto mb-8">
                    Join 50,000+ aspirants who are already studying smarter, not harder.
                  </p>
                  <button 
                    onClick={() => {
                      setAuthMode('signup');
                      resetAuthState();
                      triggerLoadingState('auth');
                    }}
                    className="px-10 py-4 bg-[#faa114] hover:bg-[#e8940f] text-[#262a2b] font-bold rounded-2xl shadow-lg shadow-[#faa114]/30 transition-all active:scale-[0.97] text-base"
                  >
                    Get Started — It&apos;s Free
                  </button>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="border-t border-[#dbd7c7] py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="text-xl font-bold" style={{ fontFamily: 'Outfit' }}>Tejas</span>
                <span className="w-2 h-2 rounded-full bg-[#faa114]"></span>
              </div>
              <p className="text-xs text-[#786e67] leading-relaxed max-w-xs">
                The AI-powered learning operating system for 500 million Indian learners.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#b3aa9e] mb-4">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Exams', 'API'].map((item) => (
                  <li key={item} className="text-sm text-[#786e67] hover:text-[#262a2b] cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#b3aa9e] mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item} className="text-sm text-[#786e67] hover:text-[#262a2b] cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#b3aa9e] mb-4">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms', 'Security', 'Cookies'].map((item) => (
                  <li key={item} className="text-sm text-[#786e67] hover:text-[#262a2b] cursor-pointer transition-colors">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#dbd7c7] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#b3aa9e]">© 2026 Tejas. All rights reserved.</p>
            <p className="text-xs text-[#b3aa9e]">Made with 🔥 for Indian Learners</p>
          </div>
        </footer>
      </div>
    );
  }

  /* ────────────────────────────────────────
     APP WORKSPACE (Dashboard, etc.)
     ──────────────────────────────────────── */
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fcfcfb] text-[#262a2b] font-sans">
      
      {/* LEFT SIDEBAR NAVIGATION (Desktop) */}
      {activeTab !== 'auth' && activeTab !== 'pricing' && (
        <aside className="hidden md:flex w-64 bg-[#fcfcfb] border-r border-[#dbd7c7] flex-col justify-between shrink-0 sticky top-0 h-screen">
          <div>
            {/* Logo */}
            <div className="p-6 border-b border-[#dbd7c7] flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight flex items-center" style={{ fontFamily: 'Outfit' }}>
                Tejas<span className="w-2 h-2 rounded-full bg-[#faa114] ml-1"></span>
              </span>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {(() => {
                const navs = [
                  { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
                  { id: 'planner', label: 'Study Planner', icon: Calendar },
                  { id: 'explorer', label: 'Exam Explorer', icon: Search },
                  { id: 'learning', label: 'Learning Hub', icon: BookMarked },
                  { id: 'pdf', label: 'PDF Workspace', icon: FileText },
                  { id: 'revision', label: 'Revision Cards', icon: RotateCcw },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'profile', label: 'Profile', icon: User },
                ];
                if (user.role === 'admin') {
                  navs.push({ id: 'admin', label: 'Admin Console', icon: Shield });
                }
                return navs.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerLoadingState(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-[#dbd7c7]/50 text-[#262a2b] border-l-4 border-[#faa114]' 
                          : 'text-[#786e67] hover:bg-[#dbd7c7]/30 hover:text-[#262a2b]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                });
              })()}
            </nav>
          </div>

          {/* Quick Quiz FAB */}
          <div className="p-4 border-t border-[#dbd7c7]">
            <button
              onClick={() => {
                setQuizStarted(false);
                setQuizScore(null);
                triggerLoadingState('quiz-gen');
              }}
              className="w-full py-3 px-4 bg-[#faa114] hover:bg-[#e8940f] text-[#262a2b] font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all duration-150 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Instant Quiz
            </button>
          </div>
        </aside>
      )}

      {/* CORE WORKSPACE CONTENT */}
      <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        
        {/* TOP HEADER BAR */}
        {activeTab !== 'auth' && activeTab !== 'pricing' && (
          <header className="h-16 border-b border-[#dbd7c7] px-6 flex items-center justify-between bg-[#fcfcfb]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#786e67]">Target:</span>
              <span className="px-3 py-1 bg-[#dbd7c7]/50 text-xs font-semibold rounded-full text-[#262a2b]">UPSC CSE 2026</span>
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
                className="text-xs font-semibold text-[#786e67] hover:text-[#262a2b]"
              >
                Logout
              </button>
            </div>
          </header>
        )}

        {/* LOADING STATE */}
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

            {/* AUTH SCREEN */}
            {activeTab === 'auth' && (
              <div className="min-h-[80vh] flex items-center justify-center py-12">
                <div className="w-full max-w-md bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6 shadow-lg shadow-[#262a2b]/5">
                  
                  {/* Title / Header */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      <span className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Tejas</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#faa114]"></span>
                    </div>
                    {authMode === 'signup' ? (
                      signupStep === 1 ? (
                        <>
                          <h1 className="text-2xl font-bold">Create Account</h1>
                          <p className="text-sm text-[#786e67]">Verify your email address to get started.</p>
                        </>
                      ) : (
                        <>
                          <h1 className="text-2xl font-bold">Secure Your Account</h1>
                          <p className="text-sm text-[#786e67]">Set up a strong password for {authFullName || 'your account'}.</p>
                        </>
                      )
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                        <p className="text-sm text-[#786e67]">Sign in to continue your exam preparation.</p>
                      </>
                    )}
                  </div>

                  {/* Errors / Success Alerts */}
                  {errorMsg && (
                    <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {otpSuccessMsg && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-xl flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{otpSuccessMsg}</span>
                    </div>
                  )}

                  {/* SIGN UP FLOW */}
                  {authMode === 'signup' ? (
                    signupStep === 1 ? (
                      /* Sign Up Step 1: Verify Email */
                      <form onSubmit={otpSent ? handleSignupVerify : handleSignupInitiate} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#786e67] uppercase tracking-wider">Full Name</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              required 
                              disabled={otpSent || loading}
                              placeholder="Priya Sharma" 
                              value={authFullName}
                              onChange={(e) => setAuthFullName(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm transition-colors disabled:opacity-70" 
                            />
                            <User className="w-4 h-4 text-[#786e67] absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#786e67] uppercase tracking-wider">Email Address</label>
                          <div className="relative">
                            <input 
                              type="email" 
                              required 
                              disabled={otpSent || loading}
                              placeholder="priya@example.com" 
                              value={authEmail}
                              onChange={(e) => setAuthEmail(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm transition-colors disabled:opacity-70" 
                            />
                            <Mail className="w-4 h-4 text-[#786e67] absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        {/* OTP Verification on same page */}
                        {otpSent && (
                          <div className="space-y-1 pt-4 border-t border-[#dbd7c7] animate-fadeInUp">
                            <label className="text-xs font-bold text-[#786e67] uppercase tracking-wider">Verification Code (OTP)</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                required 
                                maxLength={6}
                                placeholder="123456" 
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full px-4 py-3 pl-10 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm text-center tracking-[0.5em] font-mono transition-colors" 
                              />
                              <Lock className="w-4 h-4 text-[#786e67] absolute left-3.5 top-3.5" />
                            </div>
                            {otpError && (
                              <p className="text-xs font-semibold text-red-500 mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> {otpError}
                              </p>
                            )}
                            
                            <div className="pt-2 flex justify-between items-center text-xs">
                              <button 
                                type="button" 
                                onClick={handleResendOtp}
                                className="text-[#faa114] hover:underline font-semibold flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer"
                              >
                                <RefreshCw className="w-3 h-3" /> Resend OTP
                              </button>
                              <button 
                                type="button" 
                                onClick={resetAuthState}
                                className="text-[#786e67] hover:text-[#262a2b] hover:underline bg-transparent border-none p-0 cursor-pointer"
                              >
                                Edit details
                              </button>
                            </div>
                          </div>
                        )}

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full py-3 bg-[#262a2b] hover:bg-[#262a2b]/95 text-[#fcfcfb] font-semibold rounded-xl transition-all active:scale-[0.97] disabled:opacity-50"
                        >
                          {loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send Verification OTP'}
                        </button>
                      </form>
                    ) : (
                      /* Sign Up Step 2: Set Password */
                      <form onSubmit={handleSignupComplete} className="space-y-4 animate-fadeInUp">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#786e67] uppercase tracking-wider">Password</label>
                          <div className="relative">
                            <input 
                              type="password" 
                              required 
                              placeholder="••••••••" 
                              value={authPassword}
                              onChange={(e) => setAuthPassword(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm transition-colors" 
                            />
                            <Lock className="w-4 h-4 text-[#786e67] absolute left-3.5 top-3.5" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-[#786e67] uppercase tracking-wider">Confirm Password</label>
                          <div className="relative">
                            <input 
                              type="password" 
                              required 
                              placeholder="••••••••" 
                              value={authConfirmPassword}
                              onChange={(e) => setAuthConfirmPassword(e.target.value)}
                              className="w-full px-4 py-3 pl-10 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm transition-colors" 
                            />
                            <Lock className="w-4 h-4 text-[#786e67] absolute left-3.5 top-3.5" />
                          </div>
                          {authConfirmPassword && (
                            <p className={`text-[10px] font-semibold mt-1 flex items-center gap-1 ${authPassword === authConfirmPassword ? 'text-[#10b981]' : 'text-red-500'}`}>
                              {authPassword === authConfirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </p>
                          )}
                        </div>

                        {/* Password rules dynamic display */}
                        <div className="mt-2 space-y-1.5 p-3.5 bg-[#f9f8f5] border border-[#dbd7c7] rounded-xl text-xs">
                          <p className="font-bold text-[#786e67] mb-1 uppercase tracking-wider text-[9px]">Password Strength Checklist:</p>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${passRulesValid.length ? 'bg-[#10b981]' : 'bg-amber-500'}`} />
                              <span className={`text-[10px] ${passRulesValid.length ? 'text-[#10b981] font-medium' : 'text-[#786e67]'}`}>Min 8 characters</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${passRulesValid.upper ? 'bg-[#10b981]' : 'bg-amber-500'}`} />
                              <span className={`text-[10px] ${passRulesValid.upper ? 'text-[#10b981] font-medium' : 'text-[#786e67]'}`}>Uppercase letter</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${passRulesValid.lower ? 'bg-[#10b981]' : 'bg-amber-500'}`} />
                              <span className={`text-[10px] ${passRulesValid.lower ? 'text-[#10b981] font-medium' : 'text-[#786e67]'}`}>Lowercase letter</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${passRulesValid.number ? 'bg-[#10b981]' : 'bg-amber-500'}`} />
                              <span className={`text-[10px] ${passRulesValid.number ? 'text-[#10b981] font-medium' : 'text-[#786e67]'}`}>At least 1 number</span>
                            </div>
                            <div className="col-span-2 flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${passRulesValid.special ? 'bg-[#10b981]' : 'bg-amber-500'}`} />
                              <span className={`text-[10px] ${passRulesValid.special ? 'text-[#10b981] font-medium' : 'text-[#786e67]'}`}>Special character (!@#$%)</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          disabled={loading}
                          className="w-full py-3 bg-[#262a2b] hover:bg-[#262a2b]/95 text-[#fcfcfb] font-semibold rounded-xl transition-all active:scale-[0.97] disabled:opacity-50"
                        >
                          {loading ? 'Completing Sign Up...' : 'Complete Sign Up'}
                        </button>
                        
                        <div className="text-center">
                          <button 
                            type="button" 
                            onClick={resetAuthState}
                            className="text-xs text-[#786e67] hover:text-[#262a2b] hover:underline bg-transparent border-none p-0 cursor-pointer"
                          >
                            ← Start over
                          </button>
                        </div>
                      </form>
                    )
                  ) : (
                    /* LOGIN FLOW */
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#786e67] uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            required 
                            placeholder="priya@example.com" 
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            className="w-full px-4 py-3 pl-10 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm transition-colors" 
                          />
                          <Mail className="w-4 h-4 text-[#786e67] absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-[#786e67] uppercase tracking-wider">Password</label>
                        <div className="relative">
                          <input 
                            type="password" 
                            required 
                            placeholder="••••••••" 
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className="w-full px-4 py-3 pl-10 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm transition-colors" 
                          />
                          <Lock className="w-4 h-4 text-[#786e67] absolute left-3.5 top-3.5" />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 bg-[#262a2b] hover:bg-[#262a2b]/95 text-[#fcfcfb] font-semibold rounded-xl transition-all active:scale-[0.97] disabled:opacity-50"
                      >
                        {loading ? 'Logging In...' : 'Log In'}
                      </button>
                    </form>
                  )}

                  {/* Toggle Link between Login/Signup */}
                  {(!otpSent && signupStep === 1) && (
                    <p className="text-xs text-center text-[#786e67]">
                      {authMode === 'signup' ? (
                        <>
                          Already have an account?{' '}
                          <button 
                            type="button"
                            onClick={() => { setAuthMode('login'); resetAuthState(); }} 
                            className="text-[#faa114] hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
                          >
                            Log in
                          </button>
                        </>
                      ) : (
                        <>
                          Don&apos;t have an account?{' '}
                          <button 
                            type="button"
                            onClick={() => { setAuthMode('signup'); resetAuthState(); }} 
                            className="text-[#faa114] hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer"
                          >
                            Sign up
                          </button>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* PRICING SCREEN */}
            {activeTab === 'pricing' && (
              <div className="max-w-4xl mx-auto space-y-8 py-8">
                <div className="text-center space-y-2">
                  <button onClick={() => triggerLoadingState('dashboard')} className="text-xs font-semibold text-[#786e67] hover:text-[#262a2b] mb-4 inline-block">← Back to Dashboard</button>
                  <h1 className="text-3xl font-bold" style={{ fontFamily: 'Outfit' }}>Simple, Transparent Plans</h1>
                  <p className="text-sm text-[#786e67]">Upgrade to unlock unlimited daily AI generation tokens.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 pt-6">
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl flex flex-col justify-between card-hover">
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-[#786e67]">Free Learner</h2>
                      <div className="text-4xl font-bold" style={{ fontFamily: 'Outfit' }}>₹0<span className="text-sm font-medium text-[#b3aa9e]"> / month</span></div>
                      <ul className="space-y-2 text-sm text-[#786e67]">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> 3 AI quiz tokens daily</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Basic syllabus roadmap</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Performance tracking history</li>
                      </ul>
                    </div>
                    <button onClick={() => triggerLoadingState('dashboard')} className="mt-8 w-full py-3 border border-[#dbd7c7] text-[#262a2b] font-semibold rounded-xl hover:bg-[#dbd7c7]/50 transition-all active:scale-[0.97]">
                      Current Active Plan
                    </button>
                  </div>
                  <div className="bg-[#fcfcfb] border-2 border-[#faa114] p-8 rounded-3xl flex flex-col justify-between relative card-hover">
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#faa114] text-[#262a2b] text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</div>
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-[#faa114]">Elite Premium</h2>
                      <div className="text-4xl font-bold" style={{ fontFamily: 'Outfit' }}>₹499<span className="text-sm font-medium text-[#b3aa9e]"> / month</span></div>
                      <ul className="space-y-2 text-sm text-[#786e67]">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Unlimited AI quiz generations</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> PDF & YouTube ingestion</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Advanced analytics & prediction</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#faa114]" /> Spaced repetition auto-sync</li>
                      </ul>
                    </div>
                    <button onClick={() => { alert('Elite plan mock checkout successful!'); triggerLoadingState('dashboard'); }} className="mt-8 w-full py-3 bg-[#faa114] text-[#262a2b] font-bold rounded-xl hover:bg-[#e8940f] transition-all active:scale-[0.97]">
                      Upgrade Workspace
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Streak Banner */}
                <div className="bg-gradient-to-r from-[#faa114]/10 to-[#faa114]/5 border border-[#faa114]/20 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: 'Outfit' }}>
                      <Flame className="w-6 h-6 text-[#faa114]" /> Consistency Rating: {dashboardOverview.consistencyRating}% (Past 30 Days)
                    </h2>
                    <p className="text-sm text-[#786e67]">
                      Daily Target: {dashboardOverview.studyTimeMinutes} min completed / {profileGoal} min goal.
                    </p>
                  </div>
                  <button onClick={() => triggerLoadingState('planner')} className="px-4 py-2 text-xs font-semibold bg-[#262a2b] text-[#fcfcfb] rounded-xl hover:bg-[#262a2b]/95 transition-all active:scale-[0.97]">
                    View Plan Calendar
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Daily Tasks */}
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>Today&apos;s Targets</h3>
                    <div className="space-y-3">
                      {[
                        { title: `Read and study primary topics: target ${profileGoal} minutes`, duration: `${profileGoal}m`, done: dashboardOverview.studyTimeMinutes >= profileGoal },
                        { title: `Attempt competitive exam practice quizzes (Completed: ${dashboardOverview.quizzesCompleted})`, duration: '20m', done: dashboardOverview.quizzesCompleted > 0 },
                        { title: `Review ${dueCardsCount} due spaced repetition flashcards`, duration: '15m', done: dueCardsCount === 0 }
                      ].map((task, idx) => (
                        <div key={idx} className="p-4 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl flex items-center justify-between hover:border-[#786e67] transition-colors">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" checked={task.done} readOnly className="accent-[#faa114] w-4 h-4" />
                            <span className={`text-sm ${task.done ? 'line-through text-[#b3aa9e]' : 'text-[#262a2b] font-medium'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className="text-xs text-[#786e67] font-medium">{task.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upload zone */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>Quick Ingest</h3>
                    <div onClick={() => triggerLoadingState('pdf')} className="border-2 border-dashed border-[#dbd7c7] p-8 rounded-2xl text-center space-y-4 hover:border-[#faa114] transition-colors cursor-pointer bg-[#fcfcfb]">
                      <UploadCloud className="w-10 h-10 text-[#786e67] mx-auto" />
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">Upload PDF textbook</p>
                        <p className="text-xs text-[#b3aa9e]">Drag & drop or click</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STUDY PLANNER */}
            {activeTab === 'planner' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Study Planner</h1>
                  <button onClick={() => { alert('Timeline rebalancing request dispatched.'); triggerLoadingState('planner'); }} className="px-4 py-2 border border-[#dbd7c7] hover:bg-[#dbd7c7]/50 text-xs font-semibold rounded-xl transition-all">
                    Reschedule / Rebalance
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-2xl space-y-4">
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>Configuration</h3>
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
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>Weekly Timeline</h3>
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

            {/* EXAM EXPLORER */}
            {activeTab === 'explorer' && (
              <div className="space-y-6">
                <div className="max-w-md space-y-1">
                  <label className="text-xs font-semibold text-[#786e67]">Search Examinations Database</label>
                  <div className="relative">
                    <input type="text" placeholder="Search UPSC, GATE, Banking..." className="w-full pl-10 pr-4 py-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl focus:outline-none focus:border-[#faa114] text-sm transition-colors" />
                    <Search className="w-4 h-4 text-[#786e67] absolute left-3 top-3.5" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {['UPSC Civil Services', 'JEE Advanced', 'NEET UG', 'GATE CSE', 'SBI PO'].map((exam) => (
                    <div key={exam} className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-2xl space-y-4 flex flex-col justify-between card-hover">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">{exam}</h3>
                        <p className="text-xs text-[#786e67]">Syllabus structure v1.2</p>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <button onClick={() => triggerLoadingState('learning')} className="flex-1 py-2 bg-[#dbd7c7] hover:bg-[#dbd7c7]/80 text-xs font-semibold rounded-xl text-center transition-colors">View Syllabus</button>
                        <button onClick={() => { alert(`Enrolled in ${exam}.`); triggerLoadingState('dashboard'); }} className="flex-1 py-2 bg-[#faa114] text-xs font-semibold rounded-xl text-center hover:bg-[#e8940f] transition-colors">Enroll</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* LEARNING HUB */}
            {activeTab === 'learning' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Syllabus Explorer</h1>
                  <button onClick={() => triggerLoadingState('quiz-gen')} className="px-4 py-2 bg-[#faa114] text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-[#e8940f] transition-colors">
                    <Plus className="w-4 h-4" /> Test Me
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-2xl space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#786e67]">Syllabus Tree</h3>
                    <div className="space-y-2 text-sm">
                      <div className="font-semibold text-[#faa114] cursor-pointer flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" /> 1. Indian Constitution
                      </div>
                      <div className="pl-6 space-y-1 text-[#786e67]">
                        <div className="cursor-pointer font-medium text-[#262a2b] hover:text-[#faa114] transition-colors">1.1 Historical Background</div>
                        <div className="cursor-pointer hover:text-[#faa114] transition-colors">1.2 Salient Features</div>
                        <div className="cursor-pointer hover:text-[#faa114] transition-colors">1.3 Preamble & Union</div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-2xl space-y-4">
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'Outfit' }}>1.1 Historical Background</h2>
                    <p className="text-sm text-[#786e67] leading-relaxed">
                      The Indian Constitution has its roots in several historical developments during British rule. 
                      Significant landmarks include the Regulating Act of 1773, Pitt&apos;s India Act of 1784, and the 
                      Charter Acts which consolidated administrative authority under the East India Company...
                    </p>
                    <div className="pt-6 border-t border-[#dbd7c7] flex justify-between items-center">
                      <span className="text-xs text-[#b3aa9e]">Reference: Laxmikanth Chapter 1</span>
                      <button onClick={() => triggerLoadingState('pdf')} className="text-xs font-semibold text-[#faa114] hover:underline">
                        Read Reference PDF →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PDF WORKSPACE */}
            {activeTab === 'pdf' && (
              <div className="grid md:grid-cols-3 gap-6 h-[75vh]">
                <div className="md:col-span-2 border border-[#dbd7c7] rounded-3xl bg-[#dbd7c7]/10 flex flex-col justify-between overflow-hidden">
                  <div className="p-4 border-b border-[#dbd7c7] flex justify-between items-center bg-[#fcfcfb]">
                    <span className="text-sm font-semibold">UPSC_Syllabus_2026.pdf (Page 1 of 12)</span>
                    <div className="flex gap-2">
                      <button className="px-2 py-1 bg-[#dbd7c7] rounded-lg text-xs hover:bg-[#dbd7c7]/80 transition-colors">Prev</button>
                      <button className="px-2 py-1 bg-[#dbd7c7] rounded-lg text-xs hover:bg-[#dbd7c7]/80 transition-colors">Next</button>
                    </div>
                  </div>
                  <div className="flex-1 p-8 flex items-center justify-center text-center">
                    <div className="max-w-md space-y-4">
                      <FileText className="w-16 h-16 text-[#b3aa9e] mx-auto" />
                      <h3 className="text-lg font-bold">Indian Constitution Overview</h3>
                      <p className="text-xs text-[#786e67]">
                        Select text to trigger context annotations or ask questions to the AI panel.
                      </p>
                    </div>
                  </div>
                </div>
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
                    <input type="text" placeholder="Ask about this document..." className="flex-1 px-3 py-2 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-xs focus:outline-none focus:border-[#faa114] transition-colors" />
                    <button className="px-3 py-2 bg-[#faa114] text-xs font-bold rounded-xl hover:bg-[#e8940f] transition-colors">Send</button>
                  </div>
                </div>
              </div>
            )}

            {/* ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Performance Analytics</h1>
                <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-6 rounded-3xl space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>Concept Mastery Heatmap</h3>
                    <p className="text-xs text-[#786e67]">Mastery calculations from latest assessments.</p>
                  </div>
                  <div className="grid grid-cols-8 gap-2 max-w-lg">
                    {[
                      { topic: 'Polity', mastery: '#faa114' },
                      { topic: 'History', mastery: '#786e67' },
                      { topic: 'Geography', mastery: '#dbd7c7' },
                      { topic: 'Economics', mastery: '#262a2b' },
                      { topic: 'Science', mastery: '#faa114' },
                      { topic: 'Current', mastery: '#dbd7c7' },
                      { topic: 'Environ', mastery: '#786e67' },
                      { topic: 'Aptitude', mastery: '#262a2b' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ backgroundColor: item.mastery }} className="h-12 rounded-xl flex items-center justify-center text-[10px] font-bold text-[#fcfcfb] cursor-pointer hover:scale-105 transition-transform" title={`${item.topic} Mastery`}>
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

            {/* QUIZ GENERATOR */}
            {activeTab === 'quiz-gen' && (
              <div className="max-w-2xl mx-auto space-y-8">
                {!quizStarted ? (
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6 shadow-sm">
                    <div className="text-center space-y-2">
                      <Sparkles className="w-12 h-12 text-[#faa114] mx-auto" />
                      <h1 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Instant Quiz Generator</h1>
                      <p className="text-sm text-[#786e67]">Generate personalized question sets from your files.</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-[#786e67]">Select Source</label>
                        <select className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm">
                          <option>UPSC_Syllabus_2026.pdf</option>
                          <option>Physics_Electromagnetism.pdf</option>
                          <option>Chapter 1.1 Historical Background</option>
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
                          <label className="text-xs font-semibold text-[#786e67]">Questions</label>
                          <input type="number" defaultValue="5" className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm" />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setQuizStarted(true)} className="w-full py-4 bg-[#faa114] text-[#262a2b] font-bold rounded-xl hover:bg-[#e8940f] transition-all active:scale-[0.97]">
                      Generate AI Quiz
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="h-1.5 w-full bg-[#dbd7c7] rounded-full overflow-hidden">
                      <div className="h-full bg-[#faa114] rounded-full animate-fill" style={{ width: '40%' }}></div>
                    </div>
                    <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-[#786e67]">Question 1 of 2 (Federalism)</span>
                        <h2 className="text-xl font-bold" style={{ fontFamily: 'Outfit' }}>
                          Which act first initiated administrative centralization under the East India Company?
                        </h2>
                      </div>
                      <div className="space-y-3">
                        {[
                          { key: 'A', text: 'Regulating Act of 1773' },
                          { key: 'B', text: "Pitt's India Act of 1784" },
                          { key: 'C', text: 'Charter Act of 1833' },
                          { key: 'D', text: 'Government of India Act of 1858' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            onClick={() => setSelectedOption(opt.key)}
                            className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                              selectedOption === opt.key 
                                ? 'border-[#faa114] bg-[#faa114]/5 font-semibold' 
                                : 'border-[#dbd7c7] hover:border-[#786e67]'
                            }`}
                          >
                            <span className="font-bold mr-2 text-[#786e67]">{opt.key}.</span> {opt.text}
                          </button>
                        ))}
                      </div>
                      <div className="pt-6 border-t border-[#dbd7c7] flex justify-between">
                        <button onClick={() => setQuizStarted(false)} className="px-4 py-2 border border-[#dbd7c7] text-xs font-semibold rounded-xl hover:bg-[#dbd7c7]/50 transition-colors">Cancel</button>
                        <button 
                          onClick={() => setQuizScore(selectedOption === 'A' ? 100 : 0)}
                          className="px-6 py-2 bg-[#262a2b] text-[#fcfcfb] text-xs font-bold rounded-xl disabled:opacity-50 transition-all active:scale-[0.97]"
                          disabled={!selectedOption}
                        >
                          Submit Response
                        </button>
                      </div>
                    </div>

                    {quizScore !== null && (
                      <div className="bg-[#fcfcfb] border-2 border-[#faa114] p-6 rounded-3xl space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-[#faa114]" />
                          <h3 className="font-bold text-lg">
                            {quizScore === 100 ? 'Correct Response! (+100%)' : 'Incorrect Response. (+0%)'}
                          </h3>
                        </div>
                        <p className="text-sm text-[#786e67]">
                          <strong>Explanation:</strong> The Regulating Act of 1773 was the first step by the British Government to control the East India Company in India. It laid the foundations of central administration.
                        </p>
                        <button onClick={() => { setQuizStarted(false); setQuizScore(null); setSelectedOption(null); }} className="px-4 py-2 bg-[#faa114] text-xs font-bold rounded-xl hover:bg-[#e8940f] transition-colors">
                          Back to Generator
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* REVISION MODULE */}
            {activeTab === 'revision' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Revision Cards</h1>
                    <p className="text-xs text-[#786e67]">FSRS algorithm spaced repetition queue.</p>
                  </div>
                  <span className="px-3 py-1 bg-[#dbd7c7]/50 text-xs font-semibold rounded-full text-[#262a2b]">
                    {dueCards.length} due today
                  </span>
                </div>

                {dueCards.length === 0 ? (
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] p-12 rounded-3xl text-center space-y-4 shadow-sm">
                    <RotateCcw className="w-12 h-12 text-[#b3aa9e] mx-auto animate-spin-slow" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'Outfit' }}>All Caught Up!</h3>
                      <p className="text-sm text-[#786e67] max-w-sm mx-auto">
                        No flashcards are due for review. Take exam quizzes to auto-populate cards for topics you find challenging.
                      </p>
                    </div>
                  </div>
                ) : (
                  (() => {
                    const card = dueCards[activeCardIndex] || dueCards[0];
                    return (
                      <div className="bg-[#fcfcfb] border border-[#dbd7c7] rounded-3xl overflow-hidden shadow-sm flex flex-col min-h-[300px] justify-between">
                        {/* Header metadata */}
                        <div className="p-4 bg-[#f5f4f0] border-b border-[#dbd7c7] flex justify-between items-center text-xs text-[#786e67]">
                          <span>Difficulty: {Number(card.difficulty).toFixed(1)}/10</span>
                          <span>Repetitions: {card.repetitionCount}</span>
                        </div>

                        {/* Front / Back text */}
                        <div className="p-8 flex-1 flex flex-col justify-center space-y-6">
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-[#faa114] uppercase tracking-wider">QUESTION / FRONT</span>
                            <p className="text-base font-medium text-[#262a2b]">{card.frontText}</p>
                          </div>

                          {showAnswer && (
                            <div className="pt-6 border-t border-[#dbd7c7] space-y-2 animate-fadeInUp">
                              <span className="text-[10px] font-bold text-[#faa114] uppercase tracking-wider">ANSWER / BACK</span>
                              <p className="text-sm text-[#786e67] leading-relaxed">{card.backText}</p>
                            </div>
                          )}
                        </div>

                        {/* Actions footer */}
                        <div className="p-6 bg-[#f5f4f0] border-t border-[#dbd7c7]">
                          {!showAnswer ? (
                            <button
                              onClick={() => setShowAnswer(true)}
                              className="w-full py-3 bg-[#faa114] text-[#262a2b] font-bold rounded-xl hover:bg-[#e8940f] transition-all active:scale-[0.97]"
                            >
                              Reveal Answer
                            </button>
                          ) : (
                            <div className="space-y-4">
                              <div className="grid grid-cols-4 gap-2">
                                {[
                                  { label: 'Again', rating: 1, color: 'bg-red-500 hover:bg-red-600' },
                                  { label: 'Hard', rating: 2, color: 'bg-orange-500 hover:bg-orange-600' },
                                  { label: 'Good', rating: 3, color: 'bg-emerald-500 hover:bg-emerald-600' },
                                  { label: 'Easy', rating: 4, color: 'bg-blue-500 hover:bg-blue-600' }
                                ].map((btn) => (
                                  <button
                                    key={btn.rating}
                                    onClick={() => handleReviewCard(card.id, btn.rating)}
                                    className={`py-2 px-1 text-[11px] font-bold text-white rounded-lg transition-colors ${btn.color}`}
                                  >
                                    {btn.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div className="max-w-xl mx-auto bg-[#fcfcfb] border border-[#dbd7c7] p-8 rounded-3xl space-y-6 shadow-sm">
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>User Settings</h1>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#786e67]">Full Name</label>
                    <input 
                      type="text" 
                      value={profileFullName} 
                      onChange={(e) => setProfileFullName(e.target.value)} 
                      className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm focus:border-[#faa114] focus:outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#786e67]">Daily Target Goal (Minutes)</label>
                    <input 
                      type="number" 
                      value={profileGoal} 
                      onChange={(e) => setProfileGoal(parseInt(e.target.value, 10) || 0)} 
                      className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm focus:border-[#faa114] focus:outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#786e67]">Preferred Language</label>
                    <select 
                      value={profileLanguage} 
                      onChange={(e) => setProfileLanguage(e.target.value)} 
                      className="w-full p-3 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-sm focus:border-[#faa114] focus:outline-none transition-colors"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi (हिन्दी)</option>
                      <option value="te">Telugu (తెలుగు)</option>
                      <option value="ta">Tamil (தமிழ்)</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleSaveProfile} 
                    className="w-full py-3 bg-[#faa114] text-[#262a2b] font-bold rounded-xl hover:bg-[#e8940f] transition-all active:scale-[0.97]"
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            )}

            {/* ADMIN CONSOLE */}
            {activeTab === 'admin' && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Outfit' }}>Admin Management Console</h1>
                    <p className="text-sm text-[#786e67]">Monitor user activity, manage roles, and review AI analytics.</p>
                  </div>
                  <button 
                    onClick={() => {
                      alert('Refreshing platform diagnostics...');
                      triggerLoadingState('admin');
                    }}
                    className="px-4 py-2 bg-[#faa114] hover:bg-[#e8940f] text-[#262a2b] font-semibold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Refresh Diagnostics
                  </button>
                </div>

                {/* KPI STATS CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { label: 'Total Registered Users', value: adminStats.totalUsers.toLocaleString(), change: '+12% this month', color: 'border-l-4 border-blue-500' },
                    { label: 'Active Premium Subscribers', value: adminStats.activePremium.toLocaleString(), change: '+18% this month', color: 'border-l-4 border-emerald-500' },
                    { label: 'Calculated Monthly Revenue', value: `₹${(adminStats.totalRevenue * 80).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, change: '+22.4% ARR growth', color: 'border-l-4 border-amber-500' },
                    { label: 'GenAI Token Consumptions', value: adminStats.totalTokensUsed.toLocaleString(), change: '99.4% success boundaries', color: 'border-l-4 border-indigo-500' },
                  ].map((card, i) => (
                    <div key={i} className={`bg-[#fcfcfb] border border-[#dbd7c7] p-5 rounded-2xl shadow-sm space-y-2 card-hover ${card.color}`}>
                      <span className="text-xs font-semibold text-[#b3aa9e] uppercase tracking-wide">{card.label}</span>
                      <div className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: 'Outfit' }}>{card.value}</div>
                      <span className="text-[10px] font-semibold text-[#786e67] block">{card.change}</span>
                    </div>
                  ))}
                </div>

                {/* USER MANAGEMENT & AI LOGS GROUP */}
                <div className="grid xl:grid-cols-3 gap-8">
                  {/* User Management */}
                  <div className="xl:col-span-2 bg-[#fcfcfb] border border-[#dbd7c7] rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex justify-between items-center gap-4 border-b border-[#dbd7c7] pb-4">
                      <h3 className="font-bold text-lg" style={{ fontFamily: 'Outfit' }}>User Account Directory</h3>
                      <input 
                        type="text"
                        placeholder="Search user email..."
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        className="px-3 py-1.5 bg-[#fcfcfb] border border-[#dbd7c7] rounded-xl text-xs focus:outline-none focus:border-[#faa114] w-48 md:w-64"
                      />
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-[#dbd7c7] text-[#786e67] font-semibold">
                            <th className="pb-3 pr-4">User Name</th>
                            <th className="pb-3 pr-4">Email Address</th>
                            <th className="pb-3 pr-4">Joined Date</th>
                            <th className="pb-3 pr-4">Account Role</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminUsers
                            .filter(u => u.email.toLowerCase().includes(adminSearch.toLowerCase()))
                            .map((userRow) => (
                              <tr key={userRow.id} className="border-b border-[#dbd7c7]/50 hover:bg-[#dbd7c7]/10 transition-colors">
                                <td className="py-3 font-semibold pr-4">{userRow.name}</td>
                                <td className="py-3 pr-4 text-[#786e67]">{userRow.email}</td>
                                <td className="py-3 pr-4">{userRow.createdAt}</td>
                                <td className="py-3 pr-4">
                                  <select 
                                    value={userRow.role}
                                    onChange={(e) => {
                                      const newRole = e.target.value;
                                      // Local UI state update
                                      setAdminUsers(adminUsers.map(u => u.id === userRow.id ? { ...u, role: newRole } : u));
                                      
                                      // Backend REST Call
                                      fetch(`http://localhost:3001/api/v1/admin/users/${userRow.id}/role`, {
                                        method: 'PUT',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                                        },
                                        body: JSON.stringify({ role: newRole })
                                      })
                                      .then(res => res.json())
                                      .then(() => alert(`Successfully changed user role to ${newRole}`))
                                      .catch(() => console.log('Mock role update completed on client state.'));
                                    }}
                                    className="bg-transparent border border-[#dbd7c7] rounded px-1.5 py-0.5 font-medium focus:border-[#faa114] focus:outline-none"
                                  >
                                    <option value="free_learner">Free Learner</option>
                                    <option value="premium">Premium</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                </td>
                                <td className="py-3 text-right">
                                  <button 
                                    onClick={() => {
                                      if (confirm(`Are you absolutely sure you want to delete user ${userRow.email}?`)) {
                                        // Local UI update
                                        setAdminUsers(adminUsers.filter(u => u.id !== userRow.id));
                                        
                                        // Backend REST Call
                                        fetch(`http://localhost:3001/api/v1/admin/users/${userRow.id}`, {
                                          method: 'DELETE',
                                          headers: {
                                            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                                          }
                                        })
                                        .then(res => res.json())
                                        .then(() => alert('User successfully deleted.'))
                                        .catch(() => console.log('Mock delete completed on client state.'));
                                      }
                                    }}
                                    className="text-red-500 hover:text-red-700 font-semibold hover:underline"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* AI Logs & Monitoring */}
                  <div className="bg-[#fcfcfb] border border-[#dbd7c7] rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="border-b border-[#dbd7c7] pb-4">
                      <h3 className="font-bold text-lg" style={{ fontFamily: 'Outfit' }}>AI Operations Log</h3>
                      <p className="text-[10px] text-[#786e67]">Real-time completion benchmarks and prompt thresholds.</p>
                    </div>

                    <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2 pt-2">
                      {[
                        { action: 'quiz.generate', model: 'gemini-1.5-flash', latency: '680ms', tokens: '4,281', status: 'Success', color: 'bg-emerald-500' },
                        { action: 'document.summary', model: 'gpt-4o-mini', latency: '1.2s', tokens: '8,420', status: 'Success', color: 'bg-emerald-500' },
                        { action: 'fsrs.recalculate', model: 'Heuristic-Engine', latency: '12ms', tokens: 'N/A', status: 'Success', color: 'bg-emerald-500' },
                        { action: 'pdf.ocr_extract', model: 'PyPDF-Local', latency: '340ms', tokens: 'N/A', status: 'Success', color: 'bg-emerald-500' },
                        { action: 'quiz.generate', model: 'gemini-1.5-flash', latency: '—', tokens: '—', status: 'Failed (Rate Limit)', color: 'bg-red-500' }
                      ].map((log, index) => (
                        <div key={index} className="flex justify-between items-start gap-4 text-xs border-b border-[#dbd7c7]/30 pb-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${log.color}`}></span>
                              <span className="font-bold font-mono text-[10px] uppercase">{log.action}</span>
                            </div>
                            <div className="text-[10px] text-[#786e67]">{log.model}</div>
                          </div>
                          <div className="text-right text-[10px] font-semibold space-y-0.5">
                            <div>{log.latency} latency</div>
                            <div className="text-[#b3aa9e]">{log.tokens} tokens</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#262a2b] rounded-2xl p-4 text-[#fcfcfb] space-y-2 mt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold">AI Pipeline Health</span>
                        <span className="text-[#faa114] font-bold">99.4% OK</span>
                      </div>
                      <div className="w-full bg-[#dbd7c7]/20 rounded-full h-1.5">
                        <div className="bg-[#faa114] h-1.5 rounded-full" style={{ width: '99.4%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAV */}
      {activeTab !== 'auth' && activeTab !== 'pricing' && activeTab !== 'landing' && (
        <nav className="md:hidden h-16 border-t border-[#dbd7c7] bg-[#fcfcfb]/90 backdrop-blur-md flex items-center justify-around fixed bottom-0 left-0 right-0 z-50">
          {(() => {
            const items = [
              { id: 'dashboard', icon: BookOpen },
              { id: 'explorer', icon: Search },
              { id: 'quiz-gen', icon: Plus },
              { id: 'revision', icon: RotateCcw },
              { id: 'profile', icon: User }
            ];
            if (user.role === 'admin') {
              items.push({ id: 'admin', icon: Shield });
            }
            return items.map((item) => {
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
                <Icon className={`w-6 h-6 ${item.id === 'quiz-gen' && !isActive ? 'bg-[#faa114] text-[#262a2b] rounded-full p-1 w-8 h-8' : ''}`} />
              </button>
            );
          });
        })()}
      </nav>
      )}
    </div>
  );
}
