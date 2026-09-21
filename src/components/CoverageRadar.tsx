import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Shield, Users, ChevronRight } from 'lucide-react';

import { COVERAGE_HUBS, LocationCluster } from '../data/coverage';

export const CoverageRadar: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<LocationCluster>(COVERAGE_HUBS[0]);
  const [filterRadius, setFilterRadius] = useState<number>(100);

  return (
    <div className="w-full glass-panel rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-sm">
      {/* Header telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-2 uppercase tracking-wider">
            <Navigation className="w-3.5 h-3.5 animate-spin" />
            <span>Operational Radius Telemetry</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Mysore &amp; 100+ km Industrial Grid
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Dedicated worker shuttles &amp; supervisor networks stationed for zero-delay shift handovers.
          </p>
        </div>

        {/* Radius toggle */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-industrial-900 p-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono">
          <span className="text-slate-500 dark:text-slate-400 px-2 font-medium">Radius:</span>
          {[25, 50, 100].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRadius(r)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterRadius === r
                  ? 'bg-sbe-royal text-white dark:bg-sbe-gold dark:text-industrial-950 shadow-md font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/5'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Radar Screen & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Visualizer */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[460px] aspect-square rounded-full bg-slate-900 dark:bg-industrial-900/90 border-2 border-sbe-royal/40 dark:border-sbe-gold/30 p-4 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Concentric distance rings */}
            <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/20" />
            <div className="absolute inset-16 rounded-full border border-dashed border-cyan-500/25" />
            <div className="absolute inset-28 rounded-full border border-dashed border-blue-500/30" />
            <div className="absolute inset-40 rounded-full border border-dashed border-blue-500/40" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />

            {/* Rotating radar sweep beam */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none animate-[spin_8s_linear_infinite]">
              <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tr from-sbe-royal/30 dark:from-sbe-gold/25 to-transparent" />
            </div>

            {/* Distance Markers Labels */}
            <span className="absolute top-2 right-1/2 translate-x-1/2 text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
              100 KM BOUNDARY
            </span>
            <span className="absolute top-14 right-1/2 translate-x-1/2 text-[9px] font-mono text-slate-400">
              50 KM
            </span>
            <span className="absolute top-26 right-1/2 translate-x-1/2 text-[9px] font-mono text-slate-400">
              25 KM
            </span>

            {/* Mysore Center Epicenter */}
            <div className="relative z-20 flex flex-col items-center pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-sbe-gold shadow-[0_0_15px_#F59E0B] border-2 border-white animate-pulse" />
              <span className="text-[11px] font-bold font-mono text-sbe-gold mt-1 bg-slate-950/90 px-2 py-0.5 rounded border border-sbe-gold/40 shadow-lg">
                THANDAVPURA HQ
              </span>
            </div>

            {/* Hub markers positioned around the radar */}
            {COVERAGE_HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              const isVisible = hub.distanceKm <= filterRadius;

              if (!isVisible) return null;

              return (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  style={{ top: `${hub.y}%`, left: `${hub.x}%` }}
                  className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                    isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                  }`}
                  title={`${hub.name} (${hub.distanceKm} km)`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`w-3 h-3 rounded-full transition-all ${
                        isSelected
                          ? 'bg-sbe-gold ring-4 ring-sbe-gold/30 shadow-[0_0_15px_#F59E0B]'
                          : 'bg-cyan-400 ring-2 ring-cyan-400/30'
                      }`}
                    />
                    <span
                      className={`absolute left-4 whitespace-nowrap text-[10px] font-mono font-bold px-2 py-0.5 rounded-md transition-all pointer-events-none ${
                        isSelected
                          ? 'bg-sbe-gold text-slate-950 opacity-100 shadow-md scale-100'
                          : 'bg-slate-950/80 text-slate-200 border border-white/10 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {hub.name.split(' ')[0]} ({hub.distanceKm}k)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Hub Detail Card */}
        <div className="lg:col-span-5 bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 relative shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
            <span className="flex items-center gap-1.5 text-sbe-royal dark:text-sbe-gold font-bold">
              <MapPin className="w-4 h-4" />
              {selectedHub.distanceKm} KM FROM THANDAVPURA HQ
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-industrial-800 border border-slate-200 dark:border-white/10">
              Sector: {selectedHub.direction}
            </span>
          </div>

          <h4 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
            {selectedHub.name}
          </h4>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
            {selectedHub.description}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-1">
                <Users className="w-3.5 h-3.5 text-sbe-royal dark:text-cyan-400" />
                <span>Active Deployed</span>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{selectedHub.activeHeadcount}+ Staff</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-sbe-royal dark:text-sbe-gold" />
                <span>Dispatch SLA</span>
              </div>
              <p className="text-lg font-bold text-sbe-royal dark:text-sbe-gold">{selectedHub.dispatchTime}</p>
            </div>
          </div>

          <div className="space-y-3 text-xs mb-6 font-mono">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Supported Sector Types:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedHub.primaryIndustries.map((ind, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-industrial-800 text-slate-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/20 font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Anchor Facilities &amp; Plants:</span>
              <p className="text-slate-800 dark:text-slate-200 font-medium">{selectedHub.keyClientsSummary}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-sbe-royal/20 border border-blue-200 dark:border-sbe-royal/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-mono">
              <Shield className="w-4 h-4 text-sbe-royal dark:text-sbe-gold" />
              <span>Dedicated worker transit van assigned</span>
            </div>
            <a
              href="#requisition-calculator"
              className="text-sbe-royal dark:text-sbe-gold hover:underline font-bold flex items-center gap-0.5"
            >
              Enquire <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
