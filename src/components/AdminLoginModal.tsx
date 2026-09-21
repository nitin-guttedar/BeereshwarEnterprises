import React, { useState } from 'react';
import { Shield, Lock, Mail, Key, User, CheckCircle2, AlertCircle, X, Building, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: 'admin' | 'client_hr', userDetails: { name: string; email: string; company?: string }) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client_hr'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFillDemo = (role: 'admin' | 'client_hr') => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'admin') {
      setEmail('admin@sbe.in');
      setPassword('sbe@1999');
    } else {
      setEmail('hr@tvsmotor.com');
      setPassword('tvs@2026');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();

      if (selectedRole === 'admin') {
        if (
          (cleanEmail === 'admin@sbe.in' || cleanEmail === 'admin' || cleanEmail === 'pavan@sbe.in') &&
          (password === 'sbe@1999' || password === 'admin' || password === 'admin123')
        ) {
          onLoginSuccess('admin', {
            name: COMPANY_DETAILS.proprietor,
            email: 'admin@sbe.in',
          });
          onClose();
        } else {
          setErrorMessage('Invalid Administrator credentials. Hint: Click "Fill Admin Demo" below.');
        }
      } else {
        if (
          (cleanEmail === 'hr@tvsmotor.com' || cleanEmail === 'client' || cleanEmail === 'tvs') &&
          (password === 'tvs@2026' || password === 'client' || password === 'client123')
        ) {
          onLoginSuccess('client_hr', {
            name: 'K. Ramesh (TVS Plant Operations)',
            email: 'hr@tvsmotor.com',
            company: 'TVS Motor Supplier / Two-Wheeler Assembly',
          });
          onClose();
        } else {
          setErrorMessage('Invalid Client HR credentials. Hint: Click "Fill Client HR Demo" below.');
        }
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-industrial-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-sbe-royal/20 border border-blue-200 dark:border-sbe-royal/40 flex items-center justify-center mx-auto mb-3 shadow-md">
            <Shield className="w-7 h-7 text-sbe-royal dark:text-sbe-gold" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            Secure Portal Login
          </h3>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
            Shree Beereshwara Enterprises Management Console
          </p>
        </div>

        {/* Role Tab Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 mb-6 text-xs font-mono">
          <button
            type="button"
            onClick={() => handleFillDemo('admin')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'admin'
                ? 'bg-sbe-royal text-white font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Agency Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo('client_hr')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'client_hr'
                ? 'bg-sbe-royal text-white font-bold shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Client HR</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
              {selectedRole === 'admin' ? 'Administrator User ID / Email' : 'Authorized Client HR Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder={selectedRole === 'admin' ? 'admin@sbe.in' : 'hr@tvsmotor.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sbe-royal"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block mb-1.5">
              Access Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sbe-royal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to {selectedRole === 'admin' ? 'Admin Console' : 'Client HR Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick Fill Bar */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-center">
          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-2">
            One-Click Demo Credentials:
          </p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('admin')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-[11px] font-mono text-sbe-royal dark:text-sbe-gold hover:bg-slate-200"
            >
              Fill Admin Demo (sbe@1999)
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('client_hr')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-[11px] font-mono text-blue-600 dark:text-cyan-400 hover:bg-slate-200"
            >
              Fill Client HR (tvs@2026)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
