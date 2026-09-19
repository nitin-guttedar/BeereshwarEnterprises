import React from 'react';
import { COMPANY_DETAILS } from '../data/company';
import { StatutorySection } from '../components/StatutorySection';
import { 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  Clock, 
  Users, 
  FileText, 
  TrendingUp, 
  Award, 
  Home as HomeIcon,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';

interface AboutProps {
  setCurrentTab: (tab: string) => void;
}

export const About: React.FC<AboutProps> = ({ setCurrentTab }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* Page Header */}
      <section className="relative pt-6 sm:pt-12 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>REGISTERED LABOUR CONTRACTOR • {COMPANY_DETAILS.legacyText}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          About <span className="text-gradient-sbe">{COMPANY_DETAILS.tradeName}</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Promoted by <strong className="text-slate-900 dark:text-white">{COMPANY_DETAILS.proprietor}</strong>, providing organized contract manpower solutions to industries in and around Nanjangud, Thandavpura, and Mysuru.
        </p>
      </section>

      {/* SECTION 1: WHO WE ARE (VERBATIM FROM PDF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 lg:p-12 border border-slate-200 dark:border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
                <span>Enterprise Profile</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Who We Are
              </h2>

              <div className="text-slate-700 dark:text-slate-300 text-base leading-relaxed space-y-4">
                <blockquote className="bg-slate-50 dark:bg-industrial-900/80 p-6 rounded-2xl border-l-4 border-sbe-royal dark:border-sbe-gold italic text-slate-900 dark:text-slate-100 font-medium">
                  “Shree Beereshwara Enterprises is a registered proprietorship firm promoted by Mr. Pavan Malaiah, providing organised contract manpower solutions to industries in and around Nanjangud and Mysuru. The firm supplies skilled and unskilled workers for shop-floor operations, material handling, housekeeping, and other support activities. We manage payroll, PF, ESI and labour-law compliance for all deployed employees, allowing clients to focus on core operations.”
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Backed by our 500+ strong workforce pipeline primarily from Uttar Pradesh, Bihar, and Jharkhand, our teams are acclimated to automotive assembly cycle times, 5S manufacturing compliance, and 24/7 tri-shift rotations.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 block">Workforce Strength</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">500+ Workers</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 block">Proprietor</span>
                  <span className="text-xl font-bold text-sbe-royal dark:text-cyan-400">Pavan Malaiah</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 block">GSTIN</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-sbe-gold truncate block">{COMPANY_DETAILS.gstin}</span>
                </div>
              </div>
            </div>

            {/* Visual Infrastructure Stack */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-sbe-royal dark:text-cyan-400 font-mono text-xs font-bold uppercase">
                  <HomeIcon className="w-4 h-4" />
                  <span>Managed Residential Quarters &amp; Shuttles</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  We manage company-arranged worker accommodation and transit shuttles around Thandavpura and Nanjangud, ensuring punctual reporting for morning (06:00), evening (14:00), and night (22:00) shifts.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-sbe-royal dark:text-sbe-gold font-mono text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Total Compliance Shield</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Karnataka Contract Labour Licence (ALC-MY/CL/AC-13023173/2023-24), EPFO Code (KNMYS2236226000), and ESIC coverage ensure complete statutory protection for your plant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: VISION, MISSION & VALUES (VERBATIM FROM PDF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
            Enterprise Pillars
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Vision, Mission &amp; Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="glass-panel rounded-3xl p-8 lg:p-10 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-sbe-royal/20 border border-blue-200 dark:border-sbe-royal/40 text-sbe-royal dark:text-blue-400 flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <div className="text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
                Strategic Horizon
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed bg-slate-50 dark:bg-industrial-900/60 p-6 rounded-2xl border-l-4 border-sbe-royal dark:border-sbe-gold font-medium">
                “To be the preferred manpower partner for leading industries in Karnataka, recognised for reliability, compliance and service quality.”
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="glass-panel rounded-3xl p-8 lg:p-10 border border-slate-200 dark:border-white/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-sbe-royal dark:text-cyan-400 flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <div className="text-xs font-mono text-sbe-royal dark:text-cyan-400 uppercase tracking-wider">
                Daily Operational Mandate
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                Our Mission
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-industrial-900/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Deploy well-screened and trained manpower for client needs.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-industrial-900/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Maintain 100% compliance with PF, ESI, GST and labour regulations.</span>
                </li>
                <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-industrial-900/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Provide responsive on-site support that minimises shop-floor disruptions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5 Core Values from PDF */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Ethical Labour Standards • Core Values</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: 'Integrity',
                desc: 'Transparent and honest dealings in daily muster rolls, hours, and billing.',
              },
              {
                title: 'Reliability',
                desc: 'Assured continuity and timely replacements within hours if required.',
              },
              {
                title: 'Compliance',
                desc: 'Full adherence to statutory requirements, monthly PF/ESI challans, and GST.',
              },
              {
                title: 'Customer Focus',
                desc: 'Flexible, client-centric solutions tuned to factory production shifts.',
              },
              {
                title: 'Respect for People',
                desc: 'Fair wages, safe shop-floor conditions, and dignifying worker welfare.',
              },
            ].map((val, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 space-y-2">
                <span className="text-xs font-mono font-bold text-sbe-royal dark:text-sbe-gold">
                  0{idx + 1}. {val.title}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: OFFICIAL STATUTORY LICENCES & PROPOSAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatutorySection />
      </section>

      {/* SECTION 4: WHY CLIENTS TRUST US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
            Operational Assurance
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Why Clients Choose Shree Beereshwara Enterprises
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            The four operational pillars that distinguish SBE across Mysore and Nanjangud manufacturing belts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Clock,
              title: 'Continuous Tri-Shift Availability',
              desc: 'Round-the-clock staffing for Shift A (06:00 - 14:00), Shift B (14:00 - 22:00), and Shift C Nocturnal. Workers live near the plants for 100% attendance.',
              tag: '24/7 Availability'
            },
            {
              icon: Users,
              title: 'Strong Supervisor Team at Sites',
              desc: 'Dedicated on-site supervisors handle daily roll calls, enforce PPE and 5S protocols, coordinate shift handovers, and resolve grievances.',
              tag: 'On-Ground Supervision'
            },
            {
              icon: FileText,
              title: 'Transparent Payment & Compliance',
              desc: 'Prompt salary disbursement between 7th and 10th of every month, verified PF/ESI filings, and itemized transparent monthly invoices.',
              tag: 'Full Transparency'
            },
            {
              icon: TrendingUp,
              title: 'Elastic Ramp Up / Down Capacity',
              desc: 'Ramp up 20 to 100+ workers for seasonal spikes (festive demand, beverage peaks) and scale down seamlessly without contractual complications.',
              tag: 'Elastic Scale'
            },
          ].map((col, i) => (
            <div
              key={i}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-industrial-900 border border-blue-100 dark:border-white/10 flex items-center justify-center text-sbe-royal dark:text-sbe-gold mb-4">
                  <col.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-sbe-royal dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-cyan-800/50 uppercase">
                  {col.tag}
                </span>
                <h4 className="text-base font-bold font-display text-slate-900 dark:text-white mt-3 mb-2">
                  {col.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {col.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
