import React, { useState, useMemo } from 'react';
import { EmployeeRecord, INITIAL_EMPLOYEES } from '../data/employees';
import { EmployeeModal } from '../components/EmployeeModal';
import { COMPANY_DETAILS } from '../data/company';
import { 
  Users, 
  Search, 
  Lock, 
  Unlock, 
  Phone, 
  MapPin, 
  Eye, 
  FileSpreadsheet
} from 'lucide-react';

interface DirectoryPageProps {
  userRole: 'public' | 'client_hr' | 'admin';
  setUserRole: (role: 'public' | 'client_hr' | 'admin') => void;
  setCurrentTab: (tab: string) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  userRole,
  setUserRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeEmployeeModal, setActiveEmployeeModal] = useState<EmployeeRecord | null>(null);

  const isAuthenticated = userRole === 'client_hr' || userRole === 'admin';

  // Extract unique options for filter dropdowns
  const states = ['All', 'Uttar Pradesh', 'Bihar', 'Jharkhand'];
  const roles = [
    'All',
    'Assembly Line Operator',
    'FMCG Packer',
    'Heavy Loader',
    'Machine Helper',
    'Material Handler',
    'Yard Specialist',
    'Housekeeping & Utility',
  ];
  const companies = [
    'All',
    'TVS Motor Supplier / Two-Wheeler Assembly',
    'Hector Beverages (Paperboat Juices & Beverages)',
    'South Bottlers (Coca-Cola Bottling Partner)',
    'AutoTech Precision Ancillary Components',
    'LogiHub South Logistics & Warehouse Terminal',
    'Metagalli Heavy Engineering & Line Parts',
    'Reserve Pool / Hot Standby',
  ];

  // Filtering Logic
  const filteredEmployees = useMemo(() => {
    return INITIAL_EMPLOYEES.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.nativeDistrict.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState = selectedState === 'All' || emp.nativeState === selectedState;
      const matchesRole = selectedRole === 'All' || emp.role === selectedRole;
      const matchesCompany = selectedCompany === 'All' || emp.clientCompany === selectedCompany;
      const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

      return matchesSearch && matchesState && matchesRole && matchesCompany && matchesStatus;
    });
  }, [searchQuery, selectedState, selectedRole, selectedCompany, selectedStatus]);

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Employee ID', 'Name', 'Role', 'Native State', 'Native District', 'Client Company', 'Location', 'Shift', 'Status', 'Phone (Auth)', 'Aadhaar Verified'];
    const rows = filteredEmployees.map((e) => [
      e.id,
      e.name,
      e.role,
      e.nativeState,
      e.nativeDistrict,
      `"${e.clientCompany}"`,
      `"${e.clientLocation}"`,
      `"${e.shift}"`,
      e.status,
      isAuthenticated ? e.phone : 'PROTECTED',
      e.aadhaarVerified ? 'YES' : 'NO'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SBE_Workforce_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header & Auth Status Banner */}
      <section className="relative pt-6 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>500+ VERIFIED WORKFORCE ROSTER • {COMPANY_DETAILS.shortName}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white">
              Employee Directory <span className="text-gradient-sbe">(For Clients &amp; HR)</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
              Browse pre-screened North Indian manpower deployed at your facility. Complete documentation, verified biometric records, and shift rosters.
            </p>
          </div>

          {/* Authentication Badge & One-Click Demo Mode Toggle */}
          <div className="p-4 rounded-2xl bg-white dark:bg-industrial-900/90 border border-slate-200 dark:border-white/10 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="space-y-0.5 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                {isAuthenticated ? (
                  <Unlock className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Lock className="w-4 h-4 text-sbe-royal dark:text-sbe-gold" />
                )}
                <span className="text-slate-600 dark:text-slate-300">Access Mode:</span>
                <strong className={isAuthenticated ? 'text-emerald-600 dark:text-emerald-400 uppercase' : 'text-sbe-royal dark:text-sbe-gold uppercase'}>
                  {isAuthenticated ? `${userRole.replace('_', ' ')} (UNMASKED)` : 'PUBLIC (MASKED)'}
                </strong>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {isAuthenticated
                  ? 'Full contact numbers & compliance IDs visible.'
                  : 'Phone numbers masked for worker privacy.'}
              </p>
            </div>

            <button
              onClick={() => setUserRole(isAuthenticated ? 'public' : 'client_hr')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all shadow-sm ${
                isAuthenticated
                  ? 'bg-slate-100 dark:bg-industrial-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  : 'bg-sbe-royal hover:bg-blue-700 text-white'
              }`}
            >
              {isAuthenticated ? 'Switch to Masked Public' : 'Login as Client HR'}
            </button>
          </div>
        </div>
      </section>

      {/* Workforce High-Level Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 block">Total Roster on Roll</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">520 Workers</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400">97.4% Attendance SLA</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 block">Uttar Pradesh Pool</span>
            <span className="text-2xl font-bold text-sbe-royal dark:text-cyan-400 mt-1 block">240 Workers</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Varanasi, Gorakhpur, Kanpur</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 block">Bihar Pool</span>
            <span className="text-2xl font-bold text-sbe-royal dark:text-sbe-gold mt-1 block">180 Workers</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Patna, Gaya, Muzaffarpur</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-slate-500 dark:text-slate-400 block">Jharkhand &amp; Reserve</span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1 block">100 Workers</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Ranchi, Dhanbad, Bokaro</span>
          </div>
        </div>
      </section>

      {/* Search & Filters Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4">
          {/* Top row: Search input + Export button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by worker name, employee ID (e.g. BE-0102), or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-industrial-800 hover:bg-slate-200 dark:hover:bg-industrial-700 text-slate-900 dark:text-white font-semibold text-xs border border-slate-200 dark:border-white/10 flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Download Roster (CSV/Excel)</span>
            </button>
          </div>

          {/* Filter dropdowns row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div>
              <label className="text-slate-500 dark:text-slate-400 block mb-1">Native State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
              >
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-500 dark:text-slate-400 block mb-1">Skill / Role Category</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-500 dark:text-slate-400 block mb-1">Deployed Client Site</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal truncate"
              >
                {companies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-500 dark:text-slate-400 block mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active Deployed</option>
                <option value="In Reserve">In Reserve Pool</option>
                <option value="On Leave">On Approved Leave</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid View */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>Showing {filteredEmployees.length} registered employee profiles (500+ total in system)</span>
          <span>Click any card for full compliance profile</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((emp) => {
            const maskedPhone = isAuthenticated
              ? emp.phone
              : emp.phone.replace(/(\+91 \d{2})\d{4}(\d{4})/, '$1****$2');

            return (
              <div
                key={emp.id}
                onClick={() => setActiveEmployeeModal(emp)}
                className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10 flex flex-col justify-between cursor-pointer group shadow-sm"
              >
                <div>
                  {/* Top Bar: ID and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-sbe-royal dark:text-sbe-gold bg-blue-50 dark:bg-safety-amber/10 px-2 py-0.5 rounded border border-blue-200 dark:border-safety-amber/30 font-bold">
                      {emp.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        emp.status === 'Active'
                          ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                          : emp.status === 'In Reserve'
                          ? 'bg-blue-50 dark:bg-cyan-500/15 text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-cyan-500/30'
                          : 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                      }`}
                    >
                      {emp.status}
                    </span>
                  </div>

                  {/* Worker Photo & Name */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={emp.photo}
                      alt={emp.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-white/10 group-hover:border-sbe-royal dark:group-hover:border-sbe-gold transition-colors"
                    />
                    <div>
                      <h4 className="text-base font-bold font-display text-slate-900 dark:text-white group-hover:text-sbe-royal dark:group-hover:text-sbe-gold transition-colors">
                        {emp.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {emp.role}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-sbe-royal dark:text-cyan-400 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{emp.nativeDistrict}, {emp.nativeState}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company & Shift info */}
                  <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-industrial-900/90 border border-slate-100 dark:border-white/5 text-xs font-mono mb-3">
                    <div className="text-slate-700 dark:text-slate-300 truncate" title={emp.clientCompany}>
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px]">CURRENT ASSIGNMENT:</span>
                      <strong className="text-slate-900 dark:text-white">{emp.clientCompany}</strong>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Shift: {emp.shift.split(' ')[0]} {emp.shift.split(' ')[1]}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Phone (masked/unmasked) & View prompt */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{maskedPhone}</span>
                  </div>
                  <Eye className="w-4 h-4 text-slate-400 group-hover:text-sbe-royal dark:group-hover:text-sbe-gold transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Profile Detail Modal */}
      <EmployeeModal
        employee={activeEmployeeModal}
        isOpen={!!activeEmployeeModal}
        onClose={() => setActiveEmployeeModal(null)}
        isAuthenticatedClient={isAuthenticated}
      />
    </div>
  );
};
