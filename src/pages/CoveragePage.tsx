import React from 'react';
import { CoverageRadar, COVERAGE_HUBS } from '../components/CoverageRadar';
import { COMPANY_DETAILS } from '../data/company';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Bus, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

interface CoveragePageProps {
  setCurrentTab: (tab: string) => void;
}

export const CoveragePage: React.FC<CoveragePageProps> = ({ setCurrentTab }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* Header & SEO Intro */}
      <section className="relative pt-6 sm:pt-12 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-4">
          <Navigation className="w-3.5 h-3.5" />
          <span>100+ KILOMETRE OPERATIONAL RADIUS</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Coverage Area <span className="text-gradient-sbe">(Mysore + 100 km Radius)</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-3xl mx-auto">
          Rapid deployment infrastructure connecting Thandavpura base with every major industrial estate and highway corridor across Mysuru and surrounding districts.
        </p>

        {/* Verbatim Intro Block as requested */}
        <div className="mt-8 p-6 glass-panel rounded-2xl border border-slate-200 dark:border-white/10 text-left">
          <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed italic">
            “We supply manpower to factories and plants within roughly 100+ kilometres of Mysore city. This includes major industrial belts and towns like <strong className="text-sbe-royal dark:text-sbe-gold font-semibold not-italic">Tandavpura, Hebbal, Hootagalli, Metagalli, Kadakola, Nanjangud</strong> and neighbouring regions where multiple industrial units and labour contractor services are located.”
          </p>
        </div>
      </section>

      {/* Interactive Coverage Radar Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoverageRadar />
      </section>

      {/* Transit Logistics & Turnaround Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10 mb-8">
            <div>
              <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider block font-semibold">
                Regional Logistics Matrix
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-0.5">
                Industrial Cluster Transit Times from Thandavpura Depot
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-sbe-royal dark:text-cyan-400 bg-blue-50 dark:bg-cyan-950/60 border border-blue-200 dark:border-cyan-800/60 px-3 py-1.5 rounded-xl">
              <Bus className="w-4 h-4" />
              <span>Dedicated Company Shuttles &amp; Vans</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500">
                  <th className="py-3 px-4">Industrial Cluster</th>
                  <th className="py-3 px-4">Radial Distance</th>
                  <th className="py-3 px-4">Transit Route / Corridor</th>
                  <th className="py-3 px-4">Dispatch Turnaround</th>
                  <th className="py-3 px-4">Dedicated Shuttle</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {COVERAGE_HUBS.map((hub) => (
                  <tr key={hub.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-sbe-royal dark:text-sbe-gold" />
                      <span>{hub.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">{hub.distanceKm} km</td>
                    <td className="py-3.5 px-4 text-sbe-royal dark:text-cyan-300">
                      {hub.distanceKm < 25 ? 'Mysore-Ooty NH-766 / Ring Road' : 'Express Highway Corridor'}
                    </td>
                    <td className="py-3.5 px-4 text-sbe-royal dark:text-sbe-gold font-bold">{hub.dispatchTime}</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Active Fleet</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => {
                          setCurrentTab('contact');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-xs text-sbe-royal dark:text-sbe-gold hover:underline font-bold"
                      >
                        Enquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Transit Logistics Commitments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-industrial-900 border border-blue-100 dark:border-white/10 flex items-center justify-center text-sbe-royal dark:text-sbe-gold">
              <Bus className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Company-Arranged Transportation
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We eliminate absentee excuses by running scheduled private worker transport shuttles for early morning (05:30) and nocturnal night (21:30) shift rotations.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-industrial-900 border border-blue-100 dark:border-white/10 flex items-center justify-center text-sbe-royal dark:text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Buffer Workers on Standby
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our Thandavpura residential quarters maintain a reserve hot-seat pool of 35+ pre-inducted workers ready to replace any absent personnel within 45 minutes.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-industrial-900 border border-blue-100 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Full Highway Transit Insurance
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All vehicles and staff are covered with group personal accident transit policies, relieving client companies from in-transit liabilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
