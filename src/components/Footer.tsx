import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { SEO_KEYWORDS } from '../data/services';
import { COMPANY_DETAILS } from '../data/company';
import { SBELogo } from './SBELogo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-industrial-950 border-t border-slate-200 dark:border-white/10 pt-16 pb-12 text-slate-600 dark:text-slate-400 text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="glass-panel rounded-3xl p-8 mb-16 border border-sbe-royal/30 dark:border-sbe-gold/30 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-safety-amber/10 border border-blue-200 dark:border-safety-amber/30 text-sbe-royal dark:text-safety-amber text-xs font-mono font-semibold uppercase">
              {COMPANY_DETAILS.tagline}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Need Manpower Deployed This Week?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl text-sm leading-relaxed">
              Connect directly with Proprietor <strong className="text-slate-900 dark:text-white">{COMPANY_DETAILS.proprietor}</strong> and our operations desk. Deployment plans and available worker rosters dispatched within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a
              href={`tel:${COMPANY_DETAILS.primaryPhone.replace(/\s+/g, '')}`}
              className="px-6 py-3.5 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {COMPANY_DETAILS.primaryPhone}</span>
            </a>
            <button
              onClick={() => {
                setCurrentTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-industrial-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-industrial-800 transition-all text-center"
            >
              Request Plant Proposal
            </button>
          </div>
        </div>

        {/* 5 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1 & 2: About & Legal Profile */}
          <div className="lg:col-span-2 space-y-4">
            <SBELogo size="lg" />

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pt-2">
              <strong>Shree Beereshwara Enterprises (SBE)</strong> is a registered labour contractor and facility management company promoted by <strong>Mr. Pavan Malaiah</strong>. With 500+ workers on roll and legacy since 1999, we specialize in contract labour, loading/unloading, and 5S housekeeping across Mysore, Thandavpura, and Nanjangud.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sbe-royal dark:text-sbe-gold shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:underline">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{COMPANY_DETAILS.phones.join(' / ')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] font-bold text-sbe-royal dark:text-sbe-gold pt-1">
                <Award className="w-4 h-4 shrink-0" />
                <span>GSTIN: {COMPANY_DETAILS.gstin} | Established: {COMPANY_DETAILS.establishedYear}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services Quick Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-bold font-display text-sm tracking-wider uppercase">
              Services Portfolio
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Contract Manpower Supply',
                'Loading, Unloading & Packing',
                'Housekeeping & Sanitisation',
                'Gardening & Outdoor Maintenance',
                'Payroll & Statutory Compliance',
                'Assembly Line Operators',
                'Machine Helpers & 5S Staff',
                'Shift-Wise 24/7 Deployment'
              ].map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setCurrentTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-sbe-royal dark:hover:text-sbe-gold transition-colors text-left flex items-center gap-1 group"
                  >
                    <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">›</span>
                    <span>{s}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Coverage Hubs */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-bold font-display text-sm tracking-wider uppercase">
              Coverage Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Thandavpura Village (HQ)',
                'Kadakola TVS Belt',
                'Nanjangud Industrial Cluster',
                'Hebbal Industrial Estate',
                'Hootagalli Logistics Suburb',
                'Metagalli Engineering Belt',
                'Mandya Highway Hub (45 km)',
                'Chamarajanagar Zone (60 km)'
              ].map((c, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setCurrentTab('coverage');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-sbe-royal dark:hover:text-cyan-400 transition-colors text-left flex items-center gap-1 group"
                  >
                    <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">›</span>
                    <span>{c}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Compliance & Portal */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-bold font-display text-sm tracking-wider uppercase">
              Compliance Dossier
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Registrations</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  EPFO Code: KNMYS2236226000 • ESIC Sec 1(5) • Licence ALC-MY/CL/AC-13023173/2023-24 (Valid to 2026).
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentTab('directory');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2 px-3 rounded-xl bg-white dark:bg-industrial-900 hover:bg-slate-50 dark:hover:bg-industrial-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold flex items-center justify-between text-xs"
              >
                <span>Client HR Directory</span>
                <span className="text-sbe-royal dark:text-sbe-gold font-bold">›</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2 px-3 rounded-xl bg-white dark:bg-industrial-900 hover:bg-slate-50 dark:hover:bg-industrial-800 border border-slate-200 dark:border-white/10 text-sbe-royal dark:text-sbe-gold font-bold flex items-center justify-between text-xs font-mono"
              >
                <span>Admin Login Portal</span>
                <span className="text-sbe-royal dark:text-sbe-gold font-bold">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="pt-8 pb-10 border-t border-slate-200 dark:border-white/10">
          <p className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider">
            Industrial Labour Directory Index • Mysuru Regional Services
          </p>
          <div className="flex flex-wrap gap-2">
            {SEO_KEYWORDS.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-industrial-900/60 border border-slate-200 dark:border-white/5 text-[11px] text-slate-500 dark:text-slate-400 font-mono"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Shree Beereshwara Enterprises (SBE). Proprietor: Pavan Malaiah. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Total Statutory Labour Compliance
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
