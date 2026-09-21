import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { CoveragePage } from './pages/CoveragePage';
import { DirectoryPage } from './pages/DirectoryPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPortal } from './pages/Admin/AdminPortal';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Auth Session State
  const [authSession, setAuthSession] = useState<{ name: string; email: string; company?: string } | null>(() => {
    const saved = localStorage.getItem('sbe_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [userRole, setUserRole] = useState<'public' | 'client_hr' | 'admin'>(() => {
    const savedRole = localStorage.getItem('sbe_role');
    if (savedRole === 'admin' || savedRole === 'client_hr') {
      return savedRole;
    }
    return 'public';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('sbe_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Apply theme to html root element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('sbe_theme', theme);
  }, [theme]);

  const handleLoginSuccess = (
    role: 'admin' | 'client_hr',
    userDetails: { name: string; email: string; company?: string }
  ) => {
    setUserRole(role);
    setAuthSession(userDetails);
    localStorage.setItem('sbe_role', role);
    localStorage.setItem('sbe_auth', JSON.stringify(userDetails));
    setCurrentTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUserRole('public');
    setAuthSession(null);
    localStorage.removeItem('sbe_role');
    localStorage.removeItem('sbe_auth');
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to top when changing tab
  const handleTabChange = (tab: string) => {
    // If user tries to open admin without session, trigger login modal!
    if (tab === 'admin' && !authSession) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync title tags dynamically for optimal SEO & SBE brand
  useEffect(() => {
    const titles: { [key: string]: string } = {
      home: 'Shree Beereshwara Enterprises (SBE) – Industrial Manpower Supply in Mysore & 100 km Surroundings',
      about: 'About Us – Shree Beereshwara Enterprises | Proprietor: Pavan Malaiah (Since 1999)',
      services: 'Manpower & Facility Services in Mysore – Contract Labour, Loading/Unloading, Housekeeping',
      industries: 'Industries & Clients We Serve – Automotive, Beverage, FMCG & Logistics',
      coverage: 'Coverage Area (Mysore + 100 km) – Thandavpura, Nanjangud, Kadakola, Hebbal',
      directory: 'Employee Directory (For Clients) – 500+ Verified Workforce Roster',
      blog: 'Industrial Labour Insights – Shree Beereshwara Enterprises Knowledge Hub',
      contact: 'Contact & Commercial Proposal – Shree Beereshwara Enterprises',
      admin: 'Admin & Client HR Portal – Shree Beereshwara Enterprises',
    };

    if (titles[currentTab]) {
      document.title = titles[currentTab];
    }
  }, [currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-industrial-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-sbe-royal selection:text-white transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        userRole={userRole}
        setUserRole={setUserRole}
        authSession={authSession}
        onLogout={handleLogout}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {currentTab === 'home' && <Home setCurrentTab={handleTabChange} />}
        {currentTab === 'about' && <About setCurrentTab={handleTabChange} />}
        {currentTab === 'services' && <ServicesPage setCurrentTab={handleTabChange} />}
        {currentTab === 'industries' && <IndustriesPage setCurrentTab={handleTabChange} />}
        {currentTab === 'coverage' && <CoveragePage setCurrentTab={handleTabChange} />}
        {currentTab === 'directory' && (
          <DirectoryPage
            userRole={userRole}
            setUserRole={setUserRole}
            setCurrentTab={handleTabChange}
          />
        )}
        {currentTab === 'blog' && <BlogPage />}
        {currentTab === 'contact' && <ContactPage />}
        {currentTab === 'admin' && (
          <AdminPortal
            userRole={userRole}
            setUserRole={setUserRole}
            setCurrentTab={handleTabChange}
            authSession={authSession}
            onLogout={handleLogout}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
          />
        )}
      </main>

      {/* Industrial Footer */}
      <Footer setCurrentTab={handleTabChange} />

      {/* Secure Admin & Client HR Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
