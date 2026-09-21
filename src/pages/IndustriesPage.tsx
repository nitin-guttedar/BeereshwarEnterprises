import React, { useState, useEffect } from 'react';
import { ClientCompany } from '../data/clients';
import { fetchClients } from '../services/api';
import { 
  Factory, 
  Boxes, 
  Cpu, 
  Truck, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface IndustriesPageProps {
  setCurrentTab: (tab: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ setCurrentTab }) => {
  const [clients, setClients] = useState<ClientCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    fetchClients()
      .then((data) => {
        if (!isCancelled) {
          setClients(data || []);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch clients:', err);
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const industries = [
    {
      id: 'automotive',
      title: 'Automotive & Motorcycle Plants',
      subtitle: 'Kadakola & Nanjangud Two-Wheeler Clusters',
      icon: Factory,
      color: 'text-sbe-royal dark:text-sbe-gold',
      borderColor: 'border-blue-200 dark:border-sbe-gold/40',
      activeHeadcount: '145+ Workers',
      deliverables: [
        {
          name: 'Assembly Line Helpers',
          desc: 'Fast cycle-time support on chassis line, engine mount assist, torque check kitting, and sub-assembly transfer.',
        },
        {
          name: 'Material Movement & Loading',
          desc: 'Internal tugger cart operations, bin handling, parts feeding to robots, and press shop scrap clearance.',
        },
        {
          name: 'Finished Vehicle Yard Handling',
          desc: 'Staging manufactured two-wheelers, protective wrap application, pre-dispatch inspections, and truck ramp loading.',
        },
      ],
      clientExample: 'Two-Wheeler Assembly & Sub-Assembly Supplier, Kadakola Belt',
      shifts: 'Tri-Shift Continuous (24/7)',
    },
    {
      id: 'beverage-fmcg',
      title: 'Beverage & FMCG Plants',
      subtitle: 'Paperboat, Coca-Cola Bottlers & Food Processors',
      icon: Boxes,
      color: 'text-blue-600 dark:text-cyan-400',
      borderColor: 'border-blue-200 dark:border-cyan-500/40',
      activeHeadcount: '210+ Workers',
      deliverables: [
        {
          name: 'Bottle & Pack Handling',
          desc: 'High-speed pre-form loading, empty glass crate depalletizing, shrink-wrap inspection, and capping line assistance.',
        },
        {
          name: 'Line Feeding & Packing Support',
          desc: 'Corrugated box erection, pouch feeding to cartoners, batch code check assistance, and manual bundle sealing.',
        },
        {
          name: 'Warehouse & Dispatch Manpower',
          desc: 'Fast-paced dock pallet stacking, stretch wrapping, container destuffing, and order picking for Southern distribution.',
        },
      ],
      clientExample: 'Hector Beverages (Paperboat), South Bottlers (Coke partner)',
      shifts: 'Morning & Evening High-Velocity Shifts',
    },
    {
      id: 'ancillary-components',
      title: 'Ancillary Manufacturing & Components',
      subtitle: 'Hebbal & Metagalli Precision Machining Units',
      icon: Cpu,
      color: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-500/40',
      activeHeadcount: '65+ Workers',
      deliverables: [
        {
          name: 'Machine Helpers',
          desc: 'Assisting CNC, lathe, and press brake operators with raw metal billet feeding and coolant tray maintenance.',
        },
        {
          name: 'Packing & Inspection Support',
          desc: 'Deburring parts, rust preventive oil coating, visual surface check, and corrugated foam cushion packing.',
        },
        {
          name: 'Store & Inventory Support',
          desc: 'Raw material inward tallying, tool room assistance, WIP bin tagging, and inventory stock counting.',
        },
      ],
      clientExample: 'AutoTech Precision Ancillaries, Metagalli Line Spares',
      shifts: 'General Day & Afternoon Shift',
    },
    {
      id: 'logistics-warehousing',
      title: 'Logistics & Warehouse Operations',
      subtitle: 'Hootagalli & Ring Road Distribution Hubs',
      icon: Truck,
      color: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-500/40',
      activeHeadcount: '54+ Workers',
      deliverables: [
        {
          name: 'Loading/Unloading at Docks',
          desc: 'Heavy manual destuffing of 20ft/40ft trailers, pallet jack operation, and zero-breakage dock offloading.',
        },
        {
          name: 'Stacking & Sorting',
          desc: 'Racking goods by SKU barcodes, master carton palletizing, and damaged pack segregation.',
        },
        {
          name: 'Inward/Outward Management',
          desc: 'Staging consignments for retail distribution, manifest count cross-checking, and dispatch truck securing.',
        },
      ],
      clientExample: 'LogiHub South Logistics Terminal, FMCG Hubs',
      shifts: 'Night Dock Operations & Tri-Shift',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Header */}
      <section className="relative pt-6 sm:pt-12 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>SECTOR-SPECIFIC WORKFORCE CAPABILITIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Industries &amp; <span className="text-gradient-sbe">Key Clients We Serve</span>
        </h1>

        {/* Verbatim Intro */}
        <div className="mt-8 p-6 glass-panel rounded-2xl border border-slate-200 dark:border-white/10 text-left">
          <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed italic">
            “Beereshwar Enterprises supports multiple large companies in and around Mysore with continuous manpower supply. Our workers are deployed in automotive plants, beverage and FMCG units, logistics hubs and allied industries.”
          </p>
        </div>
      </section>

      {/* 4 Industry Breakdown Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {industries.map((ind, index) => (
          <div
            key={ind.id}
            className="glass-panel rounded-3xl p-8 lg:p-10 border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-sm"
          >
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-blue-50 dark:bg-industrial-900 border ${ind.borderColor} flex items-center justify-center ${ind.color}`}>
                  <ind.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    Industry Sector {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {ind.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {ind.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                  <span className="text-slate-500">Deployed:</span> <strong className="text-slate-900 dark:text-white font-bold">{ind.activeHeadcount}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                  <span className="text-slate-500">Roster:</span> <strong className="text-sbe-royal dark:text-sbe-gold font-bold">{ind.shifts}</strong>
                </div>
              </div>
            </div>

            {/* Deliverables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {ind.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-industrial-900/80 border border-slate-200 dark:border-white/5 space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base mb-2">
                      <CheckCircle2 className={`w-4 h-4 ${ind.color} shrink-0`} />
                      <span>{item.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-200/50 dark:border-white/5 text-[11px] font-mono text-slate-500">
                    SOP &amp; Safety Induction Completed
                  </div>
                </div>
              ))}
            </div>

            {/* Client Context Callout */}
            <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-industrial-950/80 border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Award className="w-4 h-4 text-sbe-royal dark:text-sbe-gold" />
                <span>Reference Client Operations: <strong className="text-slate-900 dark:text-white">{ind.clientExample}</strong></span>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-sbe-royal dark:text-sbe-gold hover:underline font-bold flex items-center gap-1"
              >
                <span>Request Workforce for this sector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Key Client Partners Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider">
            Industrial Client Roster
          </span>
          <h2 className="text-3xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Facilities We Keep Running Daily
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Trusted by plant managers, supply chain heads, and production directors in Mysore.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-3 border-sbe-royal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono text-slate-500">Loading client plant facilities...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12 px-4 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">No Client Plants Registered Yet</h4>
            <p className="text-xs text-slate-500 font-mono max-w-md mx-auto">
              Client manufacturing facilities registered by the Administrator in the portal will appear dynamically here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold bg-blue-50 dark:bg-safety-amber/10 px-2 py-0.5 rounded border border-blue-200 dark:border-safety-amber/30 font-bold">
                    {client.logoPlaceholder}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30 font-semibold">
                    {client.contractStatus}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                    {client.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {client.location}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/5 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Workers Assigned:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{client.assignedWorkers} Staff</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sector:</span>
                    <span className="text-sbe-royal dark:text-cyan-300 font-semibold">{client.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Partner Since:</span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{client.deploymentSince}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>On-site supervisor: {client.contactPerson.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
