import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/company';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  Users,
  Award,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    designation: '',
    phone: '',
    email: '',
    plantLocation: 'Thandavpura / Nanjangud',
    serviceNeeded: 'Contract Manpower Supply (Skilled & Unskilled)',
    manpowerNeeded: '20-50 Workers',
    shiftStructure: '2 Shifts (A & B)',
    urgency: 'Immediate (Within 24-48 Hours)',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.phone || !formData.contactPerson) {
      alert('Please fill out the required fields.');
      return;
    }

    setIsSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="relative pt-6 sm:pt-12 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-4">
          <Phone className="w-3.5 h-3.5" />
          <span>OFFICIAL SBE DISPATCH &amp; COMMERCIAL PROPOSAL DESK</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Contact &amp; <span className="text-gradient-sbe">Formal Proposal Requisition</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Need manpower or facility services deployed this week? Connect directly with our Thandavpura administrative office or submit your requirements for an official commercial proposal.
        </p>
      </section>

      {/* Main Grid: Form and Official Contact Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Official Registered Coordinates from PDF */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Registered Office Details
                </h3>
                <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold font-bold">
                  {COMPANY_DETAILS.shortName}
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                {/* Official Address */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/5">
                  <MapPin className="w-5 h-5 text-sbe-royal dark:text-sbe-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5">REGISTERED OFFICE ADDRESS</span>
                    <strong className="text-slate-900 dark:text-white text-sm block">Shree Beereshwara Enterprises</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-relaxed block mt-1">
                      {COMPANY_DETAILS.address.street}, {COMPANY_DETAILS.address.village}, {COMPANY_DETAILS.address.taluk}, {COMPANY_DETAILS.address.district}, {COMPANY_DETAILS.address.state}.
                    </span>
                  </div>
                </div>

                {/* Direct Phone Numbers */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/5">
                  <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5">OFFICIAL PHONE NUMBERS</span>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <a href="tel:+917760709689" className="text-sbe-royal dark:text-sbe-gold font-bold text-base hover:underline">
                        +91 77607 09689
                      </a>
                      <a href="tel:+917259293127" className="text-slate-800 dark:text-slate-200 font-bold text-sm hover:underline">
                        +91 72592 93127
                      </a>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] mt-1">
                      Proprietor: {COMPANY_DETAILS.proprietor}
                    </span>
                  </div>
                </div>

                {/* Official Email */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/5">
                  <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block mb-0.5">OFFICIAL CORRESPONDENCE EMAIL</span>
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-900 dark:text-white font-bold text-sm block hover:underline">
                      {COMPANY_DETAILS.email}
                    </a>
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px] mt-0.5">
                      For formal tender proposals, Form V issuance &amp; billing queries
                    </span>
                  </div>
                </div>

                {/* Statutory Registration Badges */}
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-sbe-royal/20 border border-blue-200 dark:border-sbe-royal/40 space-y-1 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 text-sbe-royal dark:text-sbe-gold font-bold">
                    <Award className="w-4 h-4" />
                    <span>GSTIN: {COMPANY_DETAILS.gstin}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Karnataka Contract Labour Licence ALC-MY/CL/AC-13023173/2023-24 (Valid to 01-05-2026)
                  </p>
                </div>
              </div>
            </div>

            {/* SLA Guarantee Box */}
            <div className="p-6 glass-panel rounded-3xl border border-slate-200 dark:border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Cost Replacement Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sbe-royal dark:text-cyan-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Salary Disbursement between 7th &amp; 10th</span>
              </div>
              <div className="flex items-center gap-2 text-sbe-royal dark:text-sbe-gold font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Strict Client Shop-Floor Confidentiality</span>
              </div>
            </div>
          </div>

          {/* Right Column: Formal Proposal Request Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/10">
                <div>
                  <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    Request Proposal &amp; Workforce Deployment
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                    Official rate structure, man-day billing matrix &amp; worker rosters provided within 24 hours.
                  </p>
                </div>
                <FileCheck className="w-6 h-6 text-sbe-royal dark:text-sbe-gold" />
              </div>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">Proposal Request Logged!</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900 dark:text-white">{formData.contactPerson}</strong> from <strong className="text-slate-900 dark:text-white">{formData.companyName}</strong>. Pavan Malaiah and the SBE operations desk will contact you at <span className="text-sbe-royal dark:text-sbe-gold font-mono font-bold">{formData.phone}</span> with our formal commercial proposal.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-industrial-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-industrial-700 text-xs font-semibold mt-4"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Company / Plant Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. TVS Supplier / Beverage Unit"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">HR / Plant Manager Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Mobile / Direct Phone *</label>
                      <input
                        type="tel"
                        placeholder="+91 98450 XXXXX"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Corporate Email Address</label>
                      <input
                        type="email"
                        placeholder="hr@yourcompany.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Service Scope Required</label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      >
                        <option>Contract Manpower Supply (Skilled &amp; Unskilled)</option>
                        <option>Loading, Unloading &amp; Packing Services</option>
                        <option>Housekeeping &amp; Sanitisation (5S Audit)</option>
                        <option>Gardening &amp; Outdoor Maintenance</option>
                        <option>Assembly Line &amp; Machine Helpers</option>
                        <option>Complete Facility Management</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Facility Cluster</label>
                      <select
                        value={formData.plantLocation}
                        onChange={(e) => setFormData({ ...formData, plantLocation: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      >
                        <option>Thandavpura / Nanjangud Heavy Area</option>
                        <option>Kadakola (TVS Belt)</option>
                        <option>Hebbal Industrial Estate</option>
                        <option>Hootagalli Logistics Zone</option>
                        <option>Metagalli Spares Area</option>
                        <option>Surrounding Mysore (up to 100 km)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Required Workforce Size</label>
                      <select
                        value={formData.manpowerNeeded}
                        onChange={(e) => setFormData({ ...formData, manpowerNeeded: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      >
                        <option>5 - 15 Workers (Pilot Deployment)</option>
                        <option>20 - 50 Workers (Assembly Line)</option>
                        <option>50 - 100 Workers (Full Plant Operations)</option>
                        <option>100+ Workers (Mega Surge)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Deployment Urgency</label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal"
                      >
                        <option>Immediate (Within 24-48 Hours)</option>
                        <option>Next Week (Shift Roster Preparation)</option>
                        <option>Upcoming Month (Term Contract Tender)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-500 dark:text-slate-400 block mb-1">Shop Floor Operations Notes</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Need 25 packing line helpers for beverage plant in Nanjangud, 2 shifts, PPE provided..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-sbe-royal resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Proposal Request (24h Turnaround)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
