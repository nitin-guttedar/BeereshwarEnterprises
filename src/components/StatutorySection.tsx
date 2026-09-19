import React, { useState } from 'react';
import { COMPANY_DETAILS, StatutoryLicence } from '../data/company';
import { 
  ShieldCheck, 
  FileText, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  Download, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const StatutorySection: React.FC = () => {
  const [selectedLicence, setSelectedLicence] = useState<StatutoryLicence>(COMPANY_DETAILS.licences[0]);
  const [showProposalLetter, setShowProposalLetter] = useState(false);

  return (
    <div className="w-full glass-panel rounded-3xl p-6 lg:p-10 border border-slate-200 dark:border-white/10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-500/30 text-xs font-mono text-sbe-royal dark:text-blue-400 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% AUDIT-READY COMPLIANCE DOSSIER</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            Statutory Registrations &amp; Licences
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-mono">
            All registrations are current, verified, and active. Complete adherence to Karnataka Labour Regulations, EPF, ESIC &amp; GST laws.
          </p>
        </div>

        <button
          onClick={() => setShowProposalLetter(true)}
          className="px-5 py-2.5 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
        >
          <FileText className="w-4 h-4" />
          <span>View Formal Proposal Letter</span>
        </button>
      </div>

      {/* Grid of 4 Licences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMPANY_DETAILS.licences.map((lic, idx) => {
          const isSelected = selectedLicence.title === lic.title;
          return (
            <div
              key={idx}
              onClick={() => setSelectedLicence(lic)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/80 dark:bg-sbe-navy/80 border-sbe-royal dark:border-sbe-gold shadow-md'
                  : 'bg-white dark:bg-industrial-900/60 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                    {lic.status}
                  </span>
                  <Award className={`w-4 h-4 ${isSelected ? 'text-sbe-royal dark:text-sbe-gold' : 'text-slate-400'}`} />
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {lic.title}
                </h4>

                <p className="text-xs font-mono font-bold text-sbe-royal dark:text-sbe-gold mt-1 break-all">
                  {lic.codeOrNumber}
                </p>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                  {lic.details}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-white/5 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>{lic.validUpto ? `Valid: ${lic.validUpto}` : lic.regDate ? `Reg: ${lic.regDate}` : 'Active'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Commercial & Operational Terms Strip */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-sbe-royal dark:text-sbe-gold uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Commercial &amp; Operational Commitments (As per SBE Service Terms)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Proprietor: {COMPANY_DETAILS.proprietor}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
          {COMPANY_DETAILS.commercialTerms.map((term, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-industrial-950 border border-slate-200/60 dark:border-white/5">
              <span className="text-sbe-royal dark:text-sbe-gold font-bold">›</span>
              <span className="leading-snug">{term}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formal Proposal Letter Modal */}
      {showProposalLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-industrial-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel rounded-3xl border border-slate-300 dark:border-white/20 p-6 sm:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <img src="/sbe-logo.jpg" alt="SBE Logo" className="w-12 h-12 rounded-xl object-contain bg-white p-1 border" />
                <div>
                  <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                    FORMAL PROPOSAL LETTER
                  </h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Shree Beereshwara Enterprises | GST: {COMPANY_DETAILS.gstin}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowProposalLetter(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-industrial-900 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                <p><strong>To:</strong> The HR Manager / Plant Operations Head</p>
                <p><strong>Subject:</strong> Proposal for Labour and Facility Management Services</p>
              </div>

              <p>Dear Sir/Madam,</p>

              <p>
                Shree Beereshwara Enterprises thanks you for the opportunity to present our proposal for providing contract workers and facility management services to your esteemed organisation.
              </p>

              <p>
                This proposal is indicative and based on our current understanding of your requirements. The commercial and operational details can be finalised after further discussion and mutual agreement on scope, deployment model and service methodology.
              </p>

              <p className="p-4 rounded-xl bg-blue-50 dark:bg-industrial-900 border-l-4 border-sbe-royal dark:border-sbe-gold text-slate-900 dark:text-slate-200 font-medium">
                “Shree Beereshwara Enterprises is a registered labour contractor based in Nanjangud, Mysuru. We specialise in industrial manpower supply, housekeeping, loading &amp; unloading, gardening and allied facility services. Our focus is on disciplined, reliable workforce backed by strong supervision and full statutory compliance.”
              </p>

              <p>
                We look forward to partnering with your organisation and supporting smooth, efficient and compliant operations.
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-end font-mono text-xs">
                <div>
                  <p className="text-slate-500">Yours faithfully,</p>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-1">For Shree Beereshwara Enterprises</p>
                  <p className="text-sbe-royal dark:text-sbe-gold font-bold">Authorized Signatory / Proprietor</p>
                  <p className="text-[11px] text-slate-400">Pavan Malaiah</p>
                </div>

                <div className="text-right text-[11px] text-slate-500">
                  <p>GST: {COMPANY_DETAILS.gstin}</p>
                  <p>Ph: {COMPANY_DETAILS.primaryPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
