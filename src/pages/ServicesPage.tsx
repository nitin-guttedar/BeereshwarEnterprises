import React, { useState } from 'react';
import { SERVICES_DATA, SEO_KEYWORDS } from '../data/services';
import { COMPANY_DETAILS } from '../data/company';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface ServicesPageProps {
  setCurrentTab: (tab: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setCurrentTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Core Supply', 'Specialized Line', 'Support & Logistics'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-20 pb-16">
      {/* Header & SEO Intro */}
      <section className="relative pt-6 sm:pt-12 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-4">
          <Wrench className="w-3.5 h-3.5" />
          <span>END-TO-END INDUSTRIAL &amp; FACILITY MANAGEMENT SOLUTIONS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Industrial Manpower <span className="text-gradient-sbe">Services in Mysore</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-3xl mx-auto">
          Contract labour, loading/unloading, 5S industrial housekeeping, and factory staffing tailored for manufacturing plants in Mysore, Nanjangud, Hebbal, Hootagalli, Metagalli, and Kadakola.
        </p>

        {/* Verbatim Intro Block as requested */}
        <div className="mt-8 p-6 glass-panel rounded-2xl border border-slate-200 dark:border-white/10 text-left">
          <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed italic">
            “We provide end‑to‑end manpower solutions for factories and plants in Mysore and nearby industrial areas such as <strong className="text-sbe-royal dark:text-sbe-gold font-semibold not-italic">Hebbal, Hootagalli, Metagalli, Nanjangud and Kadakola</strong>, where many labour contractors and manpower suppliers operate for different industries.”
          </p>
        </div>
      </section>

      {/* Category Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5 text-sbe-royal dark:text-sbe-gold" />
            <span>Filter Solutions:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sbe-royal dark:bg-sbe-gold text-white dark:text-industrial-950 shadow-md font-bold'
                    : 'bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-panel glass-panel-hover rounded-3xl p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-sbe-royal dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-cyan-800/50">
                    {service.category}
                  </span>
                  <span className="text-xs font-mono text-slate-700 dark:text-safety-amber bg-slate-100 dark:bg-safety-amber/10 px-2.5 py-1 rounded-md border border-slate-200 dark:border-safety-amber/30 font-bold">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
                  {service.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Key Features Bullets */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                    Service Deliverables:
                  </span>
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Shifts & Industries */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-sbe-royal dark:text-cyan-400" />
                    <span>Shift Coverage: {service.shiftsAvailable.join(' • ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Compliance: {service.complianceGuarantee}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Turnaround: &lt; 24h
                </span>
                <button
                  onClick={() => {
                    setCurrentTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-industrial-900 hover:bg-slate-200 dark:hover:bg-industrial-800 text-sbe-royal dark:text-sbe-gold font-bold text-xs border border-slate-200 dark:border-sbe-gold/40 flex items-center gap-2 group transition-all"
                >
                  <span>Book Manpower</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Keywords & Local Mysore Citations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-industrial-900/90 border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-mono text-sbe-royal dark:text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Mysore Industrial Manpower Search Directory &amp; Keywords</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Our service offerings are structured around real operational demand in Mysuru industrial corridors. We serve major automotive hubs, beverage bottling units, and logistics terminals with dedicated North Indian daily wage labour and contract manpower under <strong>Shree Beereshwara Enterprises</strong>.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {SEO_KEYWORDS.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-sbe-gold/30 text-xs font-mono text-slate-700 dark:text-slate-200"
              >
                ✓ {kw}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <span>GST: {COMPANY_DETAILS.gstin} • Labour Contractor Licence ALC-MY/CL/AC-13023173/2023-24</span>
            <a
              href={`tel:${COMPANY_DETAILS.primaryPhone.replace(/\s+/g, '')}`}
              className="text-sbe-royal dark:text-sbe-gold font-bold flex items-center gap-1 hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Direct Helpline: {COMPANY_DETAILS.primaryPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
