import React, { useState } from 'react';
import { Calculator, Users, Clock, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ManpowerCalculatorProps {
  onSuccessSubmit?: (details: any) => void;
}

export const ManpowerCalculator: React.FC<ManpowerCalculatorProps> = ({ onSuccessSubmit }) => {
  const [workersCount, setWorkersCount] = useState<number>(25);
  const [industry, setIndustry] = useState<string>('Automotive & Two-Wheeler');
  const [shiftRequirement, setShiftRequirement] = useState<string>('2 Shifts (A & B)');
  const [duration, setDuration] = useState<string>('Long-term Annual Contract');
  const [location, setLocation] = useState<string>('Thandavpura / Nanjangud');
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Rate estimation engine
  const baseRatePerWorkerShift = 620; // Estimated benchmark daily cost for industrial labor in Mysore region
  const shiftMultiplier = shiftRequirement.includes('3 Shifts') ? 3 : shiftRequirement.includes('2 Shifts') ? 2 : 1;
  const estimatedDailyTotal = workersCount * baseRatePerWorkerShift * (shiftMultiplier === 3 ? 1.05 : 1);
  const estimatedMonthlyTotal = estimatedDailyTotal * 26;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !phone || !contactName) {
      alert('Please fill out company name, contact person, and phone number.');
      return;
    }

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (err) {}

    try {
      const { submitProposal } = await import('../services/api');
      await submitProposal({
        companyName,
        contactName,
        phone,
        location,
        industry,
        manpowerCount: workersCount,
        roleRequirement: `Calculated Requisition (${industry})`,
        shiftsRequired: shiftRequirement,
        notes: `Contract Duration: ${duration} | Estimated Monthly: ₹${estimatedMonthlyTotal.toLocaleString('en-IN')}`,
      });
    } catch (err) {
      console.error('Failed to sync calculator requisition with backend:', err);
    }

    if (onSuccessSubmit) {
      onSuccessSubmit({
        companyName,
        contactName,
        phone,
        workersCount,
        industry,
        shiftRequirement,
        location,
        estimatedMonthlyTotal
      });
    }
  };

  return (
    <div id="requisition-calculator" className="w-full glass-panel rounded-3xl p-6 lg:p-10 border border-slate-200 dark:border-white/10 relative shadow-sm">
      <div className="flex items-center gap-2.5 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-3 uppercase tracking-wider">
        <Calculator className="w-4 h-4" />
        <span>Interactive Manpower Estimator &amp; Quick Requisition</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Instant Workforce Sizing &amp; Deployment Plan
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Calculate requirement metrics for your facility and receive a supervisor-backed deployment schedule within 24 hours.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-sbe-royal dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/60 border border-blue-200 dark:border-cyan-800/60 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          <span>SLA: 24h Deployment Plan Turnaround</span>
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-white dark:bg-industrial-900 border border-emerald-500/40 rounded-3xl p-8 text-center max-w-xl mx-auto shadow-lg animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Requisition Request Received!</h4>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">
            Thank you, <span className="font-bold text-slate-900 dark:text-white">{contactName}</span> from{' '}
            <span className="font-bold text-slate-900 dark:text-white">{companyName}</span>. Pavan Malaiah and the SBE deployment desk will contact you at{' '}
            <span className="text-sbe-royal dark:text-sbe-gold font-mono font-bold">{phone}</span> with worker profiles and transport logistics.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 font-mono text-xs text-left mb-6 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Manpower:</span>
              <span className="text-slate-900 dark:text-white font-bold">{workersCount} Workers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shift Configuration:</span>
              <span className="text-slate-900 dark:text-white font-bold">{shiftRequirement}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Location:</span>
              <span className="text-slate-900 dark:text-white font-bold">{location}</span>
            </div>
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-industrial-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-xs font-semibold"
          >
            Calculate Another Requirement
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Worker Count Slider */}
            <div>
              <div className="flex justify-between items-center mb-2 text-sm">
                <label className="text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-sbe-royal dark:text-sbe-gold" />
                  Required Number of Workers
                </label>
                <span className="text-2xl font-bold font-mono text-sbe-royal dark:text-sbe-gold">
                  {workersCount} <span className="text-xs font-normal text-slate-500">Personnel</span>
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={workersCount}
                onChange={(e) => setWorkersCount(parseInt(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-industrial-800 rounded-lg appearance-none cursor-pointer accent-sbe-royal dark:accent-sbe-gold"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>5 Workers (Small Unit)</span>
                <span>50 Workers (Plant Line)</span>
                <span>100+ Workers (Mega Plant)</span>
                <span>200+</span>
              </div>
            </div>

            {/* Select Industry & Shift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1.5 font-medium">Industry Sector</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                >
                  <option>Automotive &amp; Two-Wheeler</option>
                  <option>Beverage &amp; FMCG (Paperboat, Coke, etc.)</option>
                  <option>Warehousing &amp; Logistics</option>
                  <option>Precision Ancillary &amp; Machining</option>
                  <option>General Industrial / Housekeeping</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1.5 font-medium">Shift Structure</label>
                <select
                  value={shiftRequirement}
                  onChange={(e) => setShiftRequirement(e.target.value)}
                  className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                >
                  <option>Single Shift (General Day)</option>
                  <option>2 Shifts (A &amp; B - 16 hrs)</option>
                  <option>3 Continuous Shifts (24/7 Tri-Shift)</option>
                </select>
              </div>
            </div>

            {/* Location & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1.5 font-medium">Deployment Cluster</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                >
                  <option>Thandavpura (Central SBE Base)</option>
                  <option>Kadakola / TVS Belt</option>
                  <option>Nanjangud Industrial Cluster</option>
                  <option>Hebbal Industrial Area</option>
                  <option>Hootagalli Logistics Zone</option>
                  <option>Metagalli Spares Hub</option>
                  <option>Surrounding Mysore (up to 100 km)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-600 dark:text-slate-400 block mb-1.5 font-medium">Contract Term</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                >
                  <option>Daily Wage / Immediate Emergency</option>
                  <option>Short-Term (1 - 3 Months)</option>
                  <option>Long-term Annual Contract</option>
                </select>
              </div>
            </div>

            {/* Plant contact details */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/10">
              <label className="text-xs text-slate-800 dark:text-slate-200 block mb-2 font-semibold font-mono">
                Your Contact Information (For Deployment Schedule &amp; Rate Card)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                />
                <input
                  type="text"
                  placeholder="HR / Plant Manager"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                />
                <input
                  type="tel"
                  placeholder="Official Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Summary Card */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 mb-4">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">ESTIMATED DISPATCH MATRIX</span>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
                  Ready to Deploy
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs mb-6">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Workforce Strength:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{workersCount} Workers</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Workforce Origin:</span>
                  <span className="text-sbe-royal dark:text-cyan-300 font-medium">North India (UP, Bihar, Jharkhand)</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">On-Site Supervision:</span>
                  <span className="text-sbe-royal dark:text-sbe-gold font-medium">
                    {workersCount >= 30 ? 'Dedicated Full-Time Supervisor' : 'Shared Sector Supervisor'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Statutory Compliance:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">PF, ESI, Safety Induction Included</span>
                </div>
              </div>

              {/* Estimate Callout */}
              <div className="p-4 rounded-2xl bg-white dark:bg-industrial-950 border border-blue-200 dark:border-sbe-gold/30 mb-6 shadow-sm">
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                  Estimated Monthly Billing Range (26 Working Days)
                </div>
                <div className="text-2xl font-bold font-mono text-sbe-royal dark:text-sbe-gold">
                  ₹{(estimatedMonthlyTotal * 0.95 / 100000).toFixed(2)}L – ₹{(estimatedMonthlyTotal * 1.08 / 100000).toFixed(2)}L
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  *Official proposal shared post site audit. Includes service charges &amp; compliance fees.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Requisition &amp; Request Callback</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
