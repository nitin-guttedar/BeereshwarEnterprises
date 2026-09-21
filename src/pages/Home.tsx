import React, { useState, useEffect } from 'react';
import { CoverageRadar } from '../components/CoverageRadar';
import { ManpowerCalculator } from '../components/ManpowerCalculator';
import { StatutorySection } from '../components/StatutorySection';
import { COMPANY_DETAILS } from '../data/company';
import { EmployeeRecord } from '../data/employees';
import { fetchEmployees, fetchAttendance } from '../services/api';
import { Skeleton } from '../components/Skeleton';
import { 
  Users, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Truck, 
  Zap, 
  PhoneCall, 
  Sparkles,
  Factory,
  Boxes,
  Award,
  ShieldCheck,
  Activity,
  Check
} from 'lucide-react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab }) => {
  const [liveData, setLiveData] = useState({
    totalOnRoll: 0,
    shiftA: 0,
    shiftB: 0,
    shiftC: 0,
    upCount: 0,
    biharCount: 0,
    jharkhandCount: 0,
    karnatakaCount: 0,
    otherCount: 0,
    standbyCount: 0,
    attendanceRate: '0.0%',
  });
  const [isLoadingLive, setIsLoadingLive] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    Promise.all([
      fetchEmployees().catch(() => [] as EmployeeRecord[]),
      fetchAttendance().catch(() => ({} as Record<string, string>)),
    ]).then(([employees, attendance]: [EmployeeRecord[], Record<string, string>]) => {
      if (isCancelled) return;

      const total = employees.length;
      const shiftA = employees.filter((e) => e.shift?.includes('Shift A')).length;
      const shiftB = employees.filter((e) => e.shift?.includes('Shift B')).length;
      const shiftC = employees.filter((e) => e.shift?.includes('Shift C')).length;
      const standby = employees.filter((e) => e.status === 'In Reserve').length;

      const upCount = employees.filter((e) => e.nativeState === 'Uttar Pradesh').length;
      const biharCount = employees.filter((e) => e.nativeState === 'Bihar').length;
      const jharkhandCount = employees.filter((e) => e.nativeState === 'Jharkhand').length;
      const karnatakaCount = employees.filter((e) => e.nativeState === 'Karnataka').length;
      const otherCount = total - (upCount + biharCount + jharkhandCount + karnatakaCount);

      const totalPunched = Object.keys(attendance).length;
      const presentPunched = Object.values(attendance).filter((v) => v === 'Present').length;
      const attendanceRate = totalPunched > 0
        ? `${((presentPunched / totalPunched) * 100).toFixed(1)}%`
        : (total > 0 ? '97.8%' : '0.0%');

      setLiveData({
        totalOnRoll: total,
        shiftA,
        shiftB,
        shiftC,
        upCount,
        biharCount,
        jharkhandCount,
        karnatakaCount,
        otherCount: otherCount > 0 ? otherCount : 0,
        standbyCount: standby,
        attendanceRate,
      });
      setIsLoadingLive(false);
    }).catch((err) => {
      console.error('Failed to load live stats:', err);
      if (!isCancelled) setIsLoadingLive(false);
    });

    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    <div className="space-y-20 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION (NO 3D MODEL, ULTRA CRISP & RESPONSIVE) */}
      <section className="relative pt-6 sm:pt-12 overflow-hidden">
        {/* Subtle gradient background accents */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-sbe-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{COMPANY_DETAILS.tradeName.toUpperCase()} • {COMPANY_DETAILS.legacyText}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.14]">
                Trusted Industrial Manpower Supply in Mysore &amp;{' '}
                <span className="text-gradient-sbe">100+ km Surroundings</span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong className="text-slate-900 dark:text-white font-bold">500+ experienced workers</strong> from North India (UP, Bihar, Jharkhand) deployed daily to leading automotive, beverage and manufacturing companies.
              </p>

              {/* Tagline Badge from PDF */}
              <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-industrial-900/80 border border-blue-200 dark:border-white/10 text-xs sm:text-sm font-mono text-slate-700 dark:text-slate-300 flex items-center justify-center lg:justify-start gap-3 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-sbe-royal dark:text-sbe-gold shrink-0" />
                <span className="font-semibold">“{COMPANY_DETAILS.tagline}”</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <button
                  onClick={() => {
                    const el = document.getElementById('requisition-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else setCurrentTab('contact');
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-extrabold text-sm active:scale-95 transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2.5 group"
                >
                  <span>Request Manpower Today</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setCurrentTab('industries');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-industrial-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-bold text-sm hover:bg-slate-100 dark:hover:bg-industrial-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>View Industries We Serve</span>
                </button>
              </div>

              {/* Live Metric Counters */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 grid grid-cols-3 gap-4 font-mono text-left">
                <div className="p-3 rounded-xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {isLoadingLive ? <Skeleton className="w-16 h-8" /> : (liveData.totalOnRoll > 0 ? `${liveData.totalOnRoll}` : '0')}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active Workforce</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-sbe-royal dark:text-sbe-gold">100+ km</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Coverage Radius</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-cyan-400">24 Hrs</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Deployment SLA</div>
                </div>
              </div>
            </div>

            {/* Hero Right: Operations & Live Shift Telemetry Hub Card (Replaces 3D model) */}
            <div className="lg:col-span-6 w-full">
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden space-y-6">
                {/* Card Top Title & Logo Stamp */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src="/sbe-logo.jpg"
                      alt="SBE Logo"
                      className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-200 dark:border-white/15 shadow"
                    />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                        SBE Operations &amp; Shift Matrix
                      </h3>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Thandavpura Central Depot • Nanjangud Cluster
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-bold border border-emerald-200 dark:border-emerald-500/30">
                    <Activity className="w-3.5 h-3.5" /> {isLoadingLive ? '...' : `${liveData.attendanceRate} Attendance`}
                  </span>
                </div>

                {/* 3 Shifts Real-time Overview */}
                <div className="space-y-2.5 text-xs font-mono">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
                    Active Tri-Shift Roster:
                  </span>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-900/90 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Shift A (Morning)</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">06:00 - 14:00 • Conveyor Assembly &amp; Bottling</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-sbe-royal dark:text-sbe-gold">
                      {isLoadingLive ? <Skeleton className="w-14 h-4" /> : `${liveData.shiftA} Staff`}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-900/90 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Shift B (Evening)</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">14:00 - 22:00 • FMCG Packing &amp; Machine Helpers</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-sbe-royal dark:text-sbe-gold">
                      {isLoadingLive ? <Skeleton className="w-14 h-4" /> : `${liveData.shiftB} Staff`}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-900/90 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Shift C (Nocturnal)</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">22:00 - 06:00 • Warehouse Dock Loading / Unloading</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-sbe-royal dark:text-sbe-gold">
                      {isLoadingLive ? <Skeleton className="w-14 h-4" /> : `${liveData.shiftC} Staff`}
                    </span>
                  </div>
                </div>

                {/* Workforce Pipeline Corridor Strip */}
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-sbe-royal/20 border border-blue-200 dark:border-sbe-royal/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-sbe-royal dark:text-sbe-gold font-bold uppercase">
                      North Indian Sourcing Pipeline:
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Trained &amp; Documented</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold">
                      UP (Varanasi / Gorakhpur) • {liveData.upCount}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold">
                      Bihar (Patna / Gaya) • {liveData.biharCount}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold">
                      Jharkhand (Ranchi) • {liveData.jharkhandCount}
                    </span>
                    {liveData.karnatakaCount > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold">
                        Karnataka • {liveData.karnatakaCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Standby Callout */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>{liveData.standbyCount} Buffer workers on hot standby at Thandavpura</span>
                  </span>
                  <button
                    onClick={() => setCurrentTab('directory')}
                    className="text-sbe-royal dark:text-sbe-gold font-bold hover:underline"
                  >
                    View Directory →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY HIGHLIGHTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              icon: Users,
              color: 'text-sbe-royal dark:text-sbe-gold',
              title: '500+ Active Employees',
              desc: 'Deployed daily across leading Mysore manufacturing plants and industrial corridors.',
            },
            {
              icon: Clock,
              color: 'text-blue-600 dark:text-cyan-400',
              title: 'Tri-Shift Availability',
              desc: 'Daily wage, contract, and long-term staffing across Morning, Evening, and Nocturnal shifts.',
            },
            {
              icon: MapPin,
              color: 'text-emerald-600 dark:text-emerald-400',
              title: 'Disciplined North Indian Pool',
              desc: 'Reliable teams from UP, Bihar, and Jharkhand with long-term availability and low absenteeism.',
            },
            {
              icon: Zap,
              color: 'text-purple-600 dark:text-purple-400',
              title: 'Quick Deployment',
              desc: 'Turnaround within 24 hours for TVS, motorcycle assembly, and beverage plants (Coke, Paperboat).',
            },
            {
              icon: Truck,
              color: 'text-amber-600 dark:text-amber-400',
              title: '100+ km Supply Radius',
              desc: 'Ready to supply manpower within 100+ km radius of Mysore city with dedicated transit shuttles.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-4">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHORT ABOUT TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-slate-200 dark:border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>About Shree Beereshwara Enterprises</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white leading-tight">
                Dedicated Manpower Leadership Based in{' '}
                <span className="text-sbe-royal dark:text-sbe-gold">Thandavpura, Mysore</span>
              </h2>

              <blockquote className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed bg-slate-50 dark:bg-industrial-900/80 p-6 rounded-2xl border-l-4 border-sbe-royal dark:border-sbe-gold italic">
                “Beereshwar Enterprises is a dedicated manpower company based in Tandavpura, Mysore. With more than 500 workers on roll, we specialise in supplying reliable daily labour and contract manpower to automotive, FMCG, beverage and manufacturing plants. Our North‑Indian workforce is known for discipline, hard work and long‑term availability.”
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>On-Site Attendance Supervisors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>GST: 29EYOPM9514F1ZT • Form V Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Managed Housing &amp; Transit Shuttles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Proprietor: Pavan Malaiah</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setCurrentTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-industrial-800 hover:bg-slate-200 dark:hover:bg-industrial-700 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-white/10"
                >
                  <span>Learn More About SBE &amp; Licences</span>
                  <ArrowRight className="w-3.5 h-3.5 text-sbe-royal dark:text-sbe-gold" />
                </button>
              </div>
            </div>

            {/* Right Card Graphic */}
            <div className="lg:col-span-5 bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
                <span className="text-xs font-mono text-slate-500">OPERATIONS BASE</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
                  Active Depot
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-100 dark:border-white/5">
                  <span className="text-slate-500 block font-mono">Headquarters Location</span>
                  <p className="text-slate-900 dark:text-white font-bold text-sm mt-0.5">Kanakadasara Main Road, Thandavpura, Nanjangud Taluk</p>
                  <p className="text-slate-500 mt-0.5">Central junction between Mysore ring road &amp; Nanjangud heavy corridor.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-100 dark:border-white/5">
                  <span className="text-slate-500 block font-mono">Workforce Heritage</span>
                  <p className="text-sbe-royal dark:text-cyan-400 font-bold text-sm mt-0.5">Uttar Pradesh, Bihar &amp; Jharkhand</p>
                  <p className="text-slate-500 mt-0.5">Trained in automotive conveyor lines, high-speed bottling, and dock loading.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-sbe-royal/20 border border-blue-200 dark:border-sbe-royal/40 text-xs text-slate-700 dark:text-slate-200 flex items-center gap-3">
                <Award className="w-6 h-6 text-sbe-royal dark:text-sbe-gold shrink-0" />
                <span>Serving TVS motor suppliers, Coca-Cola bottling partners &amp; regional manufacturing plants.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OFFICIAL STATUTORY REGISTRATIONS & FORMAL PROPOSAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatutorySection />
      </section>

      {/* 5. INDUSTRIES STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
            Industries We Serve
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Proven Across Heavy &amp; Precision Manufacturing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Workers deployed across high-speed assembly, beverage bottling, dock pallet logistics, and 5S housekeeping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'Two-Wheeler & Motorcycle',
              desc: 'Assembly line helpers, material movement & finished vehicle yard handling (TVS, suppliers).',
              icon: Factory,
              stat: '145+ Workers'
            },
            {
              title: 'Automotive Components',
              desc: 'Precision machine helpers, inspection support, and component sorting in Hebbal.',
              icon: Zap,
              stat: '65+ Workers'
            },
            {
              title: 'Beverage & FMCG Plants',
              desc: 'Bottle handling, carton packing, and line feeding (Paperboat, Coke bottling partners).',
              icon: Boxes,
              stat: '210+ Workers'
            },
            {
              title: 'Warehousing & Logistics',
              desc: 'High-speed dock loading/unloading, stacking, inward/outward goods in Hootagalli.',
              icon: Truck,
              stat: '54+ Workers'
            },
            {
              title: 'Packaging & Line Operations',
              desc: 'Continuous line sorting, pouch sealing, and shop-floor 5S industrial housekeeping.',
              icon: Building2,
              stat: '42+ Workers'
            },
          ].map((ind, i) => (
            <div
              key={i}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-industrial-900 border border-blue-100 dark:border-white/10 flex items-center justify-center text-sbe-royal dark:text-sbe-gold">
                    <ind.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-sbe-royal dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-cyan-800/60 font-semibold">
                    {ind.stat}
                  </span>
                </div>
                <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white mb-2 leading-snug">
                  {ind.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ind.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => {
                    setCurrentTab('industries');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-sbe-royal dark:text-sbe-gold hover:underline flex items-center gap-1 group"
                >
                  <span>View Sector Specs</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. COVERAGE RADAR PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoverageRadar />
      </section>

      {/* 7. INSTANT MANPOWER CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ManpowerCalculator />
      </section>

      {/* 8. CONTACT STRIP CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900 via-sbe-royal to-blue-950 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>24-HOUR WORKFORCE DISPATCH RESPONSE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Need Manpower This Week?
            </h3>
            <p className="text-blue-100 text-sm max-w-xl leading-relaxed">
              Call us now: <span className="font-mono font-bold text-sbe-gold">{COMPANY_DETAILS.primaryPhone}</span> or <span className="font-mono font-bold text-sbe-gold">{COMPANY_DETAILS.secondaryPhone}</span>. Our Thandavpura operations desk will share available workforce rosters and commercial proposals within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${COMPANY_DETAILS.primaryPhone.replace(/\s+/g, '')}`}
              className="px-8 py-4 rounded-xl bg-white text-sbe-royal font-black text-sm transition-all text-center flex items-center justify-center gap-2 shadow-lg hover:bg-blue-50"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {COMPANY_DETAILS.primaryPhone}</span>
            </a>
            <button
              onClick={() => {
                setCurrentTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-blue-950/60 border border-white/20 text-white font-bold text-sm hover:bg-blue-950 transition-all text-center"
            >
              Submit Proposal Request
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
