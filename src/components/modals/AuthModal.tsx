import React, { useState } from 'react';
import {
  X, Sparkles, LogIn, UserPlus, ShieldCheck, Mail,
  Lock, User, ArrowRight, Loader2
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { bookingService } from '../../services/bookingService';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useBooking();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const reset = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    setIsAuthModalOpen(false);
  };

  const handleModeSwitch = (m: 'login' | 'signup') => {
    setMode(m);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ─── Input & Email Validation ──────────────────────────
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify your password.');
        return;
      }
    }

    setLoading(true);

    if (mode === 'signup') {
      // ─── Sign Up ────────────────────────────────────────
      const { data, error: signUpError } = await bookingService.signUp(cleanEmail, password, name);
      
      if (signUpError) {
        // If rate limit error or already registered error
        if (signUpError.toLowerCase().includes('rate limit')) {
          setError('Too many requests. Please try signing in if you already created an account.');
        } else if (signUpError.toLowerCase().includes('already registered')) {
          setError('An account with this email already exists. Please sign in instead.');
        } else {
          setError(signUpError);
        }
        setLoading(false);
        return;
      }

      // If user was created, auto sign-in to grant immediate session
      if (!data?.session) {
        const { error: autoSignInError } = await bookingService.signIn(cleanEmail, password);
        if (autoSignInError && !autoSignInError.toLowerCase().includes('email not confirmed')) {
          // If email confirmation is still enabled in Supabase dashboard
          setError('Account created! Please sign in with your credentials.');
          setMode('login');
          setLoading(false);
          return;
        }
      }

      setLoading(false);
      handleClose();
    } else {
      // ─── Sign In ────────────────────────────────────────
      const { error: signInError } = await bookingService.signIn(cleanEmail, password);
      if (signInError) {
        if (signInError.toLowerCase().includes('invalid login credentials') || signInError.toLowerCase().includes('wrong')) {
          setError('Incorrect email or password. Please check your credentials.');
        } else if (signInError.toLowerCase().includes('email not confirmed')) {
          setError('Email unconfirmed in Supabase settings. Disable "Confirm Email" in Supabase Auth settings to log in instantly.');
        } else {
          setError(signInError);
        }
        setLoading(false);
        return;
      }
      
      setLoading(false);
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#09121a] border border-[#d4a359]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-[#0c1824] border-b border-[#1b2f42] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d4a359]/10 border border-[#d4a359]/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#d4a359]" />
            </div>
            <div>
              <span className="text-[10px] text-[#d4a359] font-bold uppercase tracking-widest block">
                YACHTWAY ACCOUNT
              </span>
              <h3 className="text-base font-bold text-white font-luxury uppercase tracking-wide">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-[#081018] border border-[#1b2f42] text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* Toggle Mode */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0b1622] border border-[#1b2f42] text-xs font-bold">
            <button
              onClick={() => handleModeSwitch('login')}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-[#d4a359] text-[#0a1219] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => handleModeSwitch('signup')}
              className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'signup'
                  ? 'bg-[#d4a359] text-[#0a1219] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#d4a359]" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Singhania"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359] disabled:opacity-50"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359] disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Password</span>
              </label>
              <input
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359] disabled:opacity-50"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#d4a359]" />
                  <span>Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-[#0e1e2e] border border-[#1b3044] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a359] disabled:opacity-50"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#d4a359] hover:bg-[#caa055] text-[#0a1219] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{mode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Account & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {mode === 'login' ? (
            <p className="text-center text-[10px] text-slate-500 leading-relaxed">
              Don't have an account?{' '}
              <button
                onClick={() => handleModeSwitch('signup')}
                className="text-[#d4a359] hover:underline font-semibold cursor-pointer"
              >
                Register here
              </button>
            </p>
          ) : (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-[#0c1824] border border-[#1b2f42]">
              <ShieldCheck className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Instant access. Your account details and password are verified securely.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
