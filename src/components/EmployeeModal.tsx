import React from 'react';
import { EmployeeRecord } from '../data/employees';
import { X, ShieldCheck, MapPin, Calendar, Phone, Award, Building, UserCheck } from 'lucide-react';

interface EmployeeModalProps {
  employee: EmployeeRecord | null;
  isOpen: boolean;
  onClose: () => void;
  isAuthenticatedClient?: boolean;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  employee,
  isOpen,
  onClose,
  isAuthenticatedClient = false,
}) => {
  if (!isOpen || !employee) return null;

  // Mask phone if not authenticated
  const displayPhone = isAuthenticatedClient
    ? employee.phone
    : employee.phone.replace(/(\+91 \d{2})\d{4}(\d{4})/, '$1****$2');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-industrial-900 rounded-3xl border border-slate-200 dark:border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-industrial-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Worker Header Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <div className="relative">
            <img
              src={employee.photo}
              alt={employee.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-sbe-royal dark:border-sbe-gold shadow-lg"
            />
            <span
              className={`absolute -bottom-1.5 -right-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                employee.status === 'Active'
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                  : employee.status === 'In Reserve'
                  ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40'
                  : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
              }`}
            >
              {employee.status}
            </span>
          </div>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-xs font-mono text-sbe-royal dark:text-sbe-gold bg-blue-50 dark:bg-industrial-800 px-2 py-0.5 rounded border border-blue-200 dark:border-sbe-gold/30 font-bold">
                {employee.id}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Exp: {employee.experienceYears} Years
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {employee.name}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium mt-0.5">
              {employee.role}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-sbe-royal dark:text-cyan-400" />
              <span>
                {employee.nativeDistrict}, {employee.nativeState}
              </span>
            </div>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono mb-6">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
              <Building className="w-3.5 h-3.5 text-sbe-royal dark:text-sbe-gold" />
              <span>Current Deployment Site</span>
            </div>
            <p className="text-slate-900 dark:text-white font-semibold">{employee.clientCompany}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{employee.clientLocation}</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Shift Roster &amp; Joining</span>
            </div>
            <p className="text-slate-900 dark:text-white font-semibold">{employee.shift}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Joined: {employee.joiningDate}</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Assigned Site Supervisor</span>
            </div>
            <p className="text-slate-900 dark:text-white font-semibold">{employee.supervisorName}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Daily Roll Call Verified</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
              <Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Contact Coordinates</span>
            </div>
            <p className="text-slate-900 dark:text-white font-semibold">{displayPhone}</p>
            {!isAuthenticatedClient && (
              <p className="text-[10px] text-sbe-royal dark:text-sbe-gold mt-0.5 font-bold">Masked (Login as Client HR to unmask)</p>
            )}
          </div>
        </div>

        {/* Verification Badges */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> Aadhaar Biometrics
            </span>
            <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-medium">
              <Award className="w-4 h-4" /> Medical Fitness
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Beereshwar Roll ID: BE-{employee.id.slice(-4)}
          </span>
        </div>
      </div>
    </div>
  );
};
