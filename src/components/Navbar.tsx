import React, { useState, useRef, useEffect } from 'react';
import { Phone, Shield, Menu, X, ChevronDown, ChevronRight, Sun, Moon, LogOut, Lock, Building, Layers, Users, MapPin, BookOpen, FileCheck } from 'lucide-react';
import { SBELogo } from './SBELogo';
import { COMPANY_DETAILS } from '../data/company';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: 'public' | 'client_hr' | 'admin';
  setUserRole: (role: 'public' | 'client_hr' | 'admin') => void;
  authSession: { name: string; email: string; company?: string } | null;
  onLogout: () => void;
  onOpenLoginModal: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  authSession,
  onLogout,
  onOpenLoginModal,
  theme,
  setTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const servicesSubItems = [
    {
      id: 'services',
      title: 'Core Services Portfolio',
      desc: 'Contract labour, loading/unloading, 5S housekeeping',
      icon: Layers,
    },
    {
      id: 'industries',
      title: 'Industries & Clients',
      desc: 'Automotive, beverage bottling, FMCG, logistics',
      icon: Building,
    },
    {
      id: 'coverage',
      title: 'Coverage Area (100+ km)',
      desc: 'Thandavpura, Nanjangud, Kadakola, Hebbal radius',
      icon: MapPin,
    },
    {
      id: 'directory',
      title: 'Employee Directory (500+)',
      desc: 'Verified North Indian workforce roster & skills',
      icon: Users,
    },
    {
      id: 'blog',
      title: 'Insights & Blog',
      desc: 'Labour compliance, automotive ops & guidance',
      icon: BookOpen,
    },
    {
      id: 'contact',
      title: 'Statutory Licences & Proposal',
      desc: 'GST, EPFO, ESIC, Karnataka Labour Licence',
      icon: FileCheck,
    },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServicesActive = ['services', 'industries', 'coverage', 'directory', 'blog'].includes(currentTab);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-industrial-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-colors">
      {/* Top Hotline Strip */}
      <div className="bg-slate-100 dark:bg-industrial-900 border-b border-slate-200 dark:border-white/5 py-1.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-800 dark:text-white truncate">
              {COMPANY_DETAILS.tradeName} ({COMPANY_DETAILS.legacyText})
            </span>
            <span className="hidden md:inline text-slate-500 dark:text-slate-400">• GST: {COMPANY_DETAILS.gstin}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_DETAILS.primaryPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-sbe-royal dark:text-sbe-gold hover:underline font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Helpline:</span>
              <span>{COMPANY_DETAILS.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo on Left */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center text-left cursor-pointer focus:outline-none shrink-0"
        >
          <SBELogo size="md" />
        </button>

        {/* 4 Essential Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'home'
                ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold font-bold shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            Home
          </button>

          {/* 2. About Us */}
          <button
            onClick={() => handleNavClick('about')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'about'
                ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold font-bold shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            About Us
          </button>

          {/* 3. Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                isServicesActive
                  ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold font-bold shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <span>Services</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-sbe-royal dark:text-sbe-gold' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div 
                className="absolute left-0 mt-1 w-80 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-2xl p-2 z-50 animate-fadeIn"
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 mb-1">
                  Solutions &amp; Operational Modules
                </div>
                {servicesSubItems.map((item) => {
                  const isSubActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 group ${
                        isSubActive
                          ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold'
                          : 'hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-industrial-800 border border-slate-200 dark:border-white/5 flex items-center justify-center shrink-0 text-sbe-royal dark:text-sbe-gold group-hover:scale-105 transition-transform">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold font-display group-hover:text-sbe-royal dark:group-hover:text-sbe-gold transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Contact Us */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'contact'
                ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold font-bold shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Right Action Controls: Theme Toggle & Admin Authenticated Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Dark / Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark and light theme"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-industrial-800 transition-colors shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-sbe-gold animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-sbe-royal" />
            )}
          </button>

          {/* Admin Login / Session Status */}
          {authSession ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-industrial-800 border border-blue-200 dark:border-white/10 text-xs font-mono text-sbe-royal dark:text-sbe-gold font-bold"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{userRole === 'admin' ? `${authSession.name} (Admin)` : `${authSession.company || authSession.name} (Client HR)`}</span>
              </button>

              <button
                onClick={onLogout}
                title="Log Out Session"
                className="p-2 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-slate-500 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-sbe-gold" /> : <Moon className="w-4 h-4 text-sbe-royal" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-industrial-950 border-b border-slate-200 dark:border-white/10 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentTab === 'home'
                ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span>Home</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>

          {/* 2. About Us */}
          <button
            onClick={() => handleNavClick('about')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentTab === 'about'
                ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span>About Us</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>

          {/* 3. Services Accordion */}
          <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full text-left px-4 py-3 text-sm font-semibold flex items-center justify-between bg-slate-50 dark:bg-industrial-900 text-slate-800 dark:text-white"
            >
              <span>Services &amp; Operations</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-sbe-royal' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className="p-2 space-y-1 bg-white dark:bg-industrial-950">
                {servicesSubItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left p-2 rounded-xl text-xs flex items-center gap-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    <item.icon className="w-3.5 h-3.5 text-sbe-royal dark:text-sbe-gold" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Contact Us */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
              currentTab === 'contact'
                ? 'bg-blue-50 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span>Contact Us</span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </button>

          {/* Admin Login button in Mobile */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10">
            {authSession ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-industrial-900">
                <span className="text-xs font-mono font-bold text-sbe-royal dark:text-sbe-gold truncate">
                  {userRole === 'admin' ? `${authSession.name} (Admin)` : `${authSession.company || authSession.name} (Client HR)`}
                </span>
                <button
                  onClick={onLogout}
                  className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full py-3 rounded-xl bg-sbe-royal text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Admin Login (Credentials Required)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
