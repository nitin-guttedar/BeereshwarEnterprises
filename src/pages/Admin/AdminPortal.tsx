import React, { useState } from 'react';
import { EmployeeRecord, INITIAL_EMPLOYEES, getWorkforceStats } from '../../data/employees';
import { CLIENTS_DATA, ClientCompany } from '../../data/clients';
import { COMPANY_DETAILS } from '../../data/company';
import { 
  Shield, 
  Users, 
  Building2, 
  CalendarCheck, 
  FileText, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  UserCheck, 
  Lock, 
  LogOut,
  FileSpreadsheet,
  Download,
  KeyRound,
  Copy,
  RefreshCw,
  Key
} from 'lucide-react';

interface AdminPortalProps {
  userRole: 'public' | 'client_hr' | 'admin';
  setUserRole: (role: 'public' | 'client_hr' | 'admin') => void;
  setCurrentTab: (tab: string) => void;
  authSession: { name: string; email: string; company?: string } | null;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  userRole,
  setUserRole,
  authSession,
  onLogout,
  onOpenLoginModal,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'employees' | 'clients' | 'attendance' | 'reports'>('dashboard');
  const [employees, setEmployees] = useState<EmployeeRecord[]>(INITIAL_EMPLOYEES);
  const [clients, setClients] = useState<ClientCompany[]>(CLIENTS_DATA);
  const [employeeSearch, setEmployeeSearch] = useState('');

  // Add Employee Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<EmployeeRecord>>({
    name: '',
    role: 'Assembly Line Operator',
    nativeState: 'Uttar Pradesh',
    nativeDistrict: '',
    clientCompany: 'TVS Motor Supplier / Two-Wheeler Assembly',
    clientLocation: 'Kadakola Belt, Mysore',
    shift: 'Shift A (06:00 - 14:00)',
    phone: '+91 9',
    status: 'Active',
    experienceYears: 2,
    aadhaarVerified: true,
    medicalFitnessValid: true,
    supervisorName: 'M. Ramesh',
  });

  // Helper to generate a strong 16-character password
  const generateStrongPassword = (length = 16) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=[]{}|';
    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  // Add Client Modal State
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [copiedPasswordId, setCopiedPasswordId] = useState<string | null>(null);
  const [newClient, setNewClient] = useState<Partial<ClientCompany & { password?: string }>>({
    name: '',
    industry: 'Automotive & Two-Wheeler',
    location: '',
    assignedWorkers: 20,
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    contractStatus: 'Active',
    logoPlaceholder: 'NEW-PLANT',
    deploymentSince: '2026',
    password: generateStrongPassword(16),
    activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)'],
  });

  // Attendance simulation state
  const [attendanceRecords, setAttendanceRecords] = useState<{ [id: string]: 'Present' | 'Absent' | 'Shift Swapped' }>({
    'BE-0101': 'Present',
    'BE-0102': 'Present',
    'BE-0103': 'Present',
    'BE-0104': 'Present',
    'BE-0105': 'Present',
    'BE-0106': 'Present',
    'BE-0107': 'Present',
    'BE-0108': 'Shift Swapped',
    'BE-0109': 'Present',
    'BE-0110': 'Absent',
    'BE-0111': 'Present',
    'BE-0112': 'Present',
  });

  // If not authenticated, require login!
  if (!authSession) {
    return (
      <div className="max-w-xl mx-auto my-16 px-4">
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-sbe-royal/20 border border-blue-200 dark:border-sbe-royal/40 flex items-center justify-center mx-auto text-sbe-royal dark:text-sbe-gold shadow-md">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              Restricted Admin &amp; Client HR Area
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              This administrative portal contains confidential manpower deployment rosters, roll-call punch records, and statutory compliance data. Please log in with your credentials to access.
            </p>
          </div>
          <button
            onClick={onOpenLoginModal}
            className="w-full py-3.5 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Sign In with Credentials</span>
          </button>
        </div>
      </div>
    );
  }

  // Client HR can only see their assigned company (e.g. TVS Motor)
  const isClientHR = userRole === 'client_hr';
  const clientHRCompany = 'TVS Motor Supplier / Two-Wheeler Assembly';

  const visibleEmployees = isClientHR
    ? employees.filter((e) => e.clientCompany === clientHRCompany)
    : employees;

  const searchedEmployees = visibleEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      e.id.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      e.role.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.phone) {
      alert('Please fill out employee name and phone number.');
      return;
    }

    const nextIdNum = employees.length + 101;
    const created: EmployeeRecord = {
      id: `BE-0${nextIdNum}`,
      name: newEmployee.name || 'Worker Name',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: (newEmployee.role as any) || 'Machine Helper',
      nativeState: (newEmployee.nativeState as any) || 'Uttar Pradesh',
      nativeDistrict: newEmployee.nativeDistrict || 'Varanasi',
      clientCompany: newEmployee.clientCompany || 'Thandavpura Base Camp',
      clientLocation: newEmployee.clientLocation || 'Mysore',
      shift: (newEmployee.shift as any) || 'Shift A (06:00 - 14:00)',
      joiningDate: new Date().toISOString().slice(0, 10),
      status: (newEmployee.status as any) || 'Active',
      phone: newEmployee.phone || '+91 94801 00000',
      aadhaarVerified: !!newEmployee.aadhaarVerified,
      medicalFitnessValid: !!newEmployee.medicalFitnessValid,
      supervisorName: newEmployee.supervisorName || 'Site Supervisor',
      experienceYears: Number(newEmployee.experienceYears) || 1,
    };

    setEmployees([created, ...employees]);
    setIsAddModalOpen(false);
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.contactPerson) {
      alert('Please fill out client company name and contact person.');
      return;
    }

    const generatedPass = newClient.password || generateStrongPassword(16);
    const created: ClientCompany = {
      id: `cli-0${clients.length + 1}`,
      name: newClient.name || '',
      industry: newClient.industry || 'General Industrial',
      location: newClient.location || 'Mysore Industrial Belt',
      assignedWorkers: Number(newClient.assignedWorkers) || 15,
      activeShifts: newClient.activeShifts || ['Shift A (06:00 - 14:00)'],
      contactPerson: newClient.contactPerson || '',
      contactEmail: newClient.contactEmail || `hr@${(newClient.name || 'client').toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      contactPhone: newClient.contactPhone || '+91 98450 00000',
      contractStatus: 'Active',
      logoPlaceholder: (newClient.name || 'NEW').slice(0, 6).toUpperCase(),
      deploymentSince: '2026',
      password: generatedPass,
    };

    setClients([...clients, created]);
    setIsAddClientModalOpen(false);
    // Reset form with new generated password for next time
    setNewClient({
      name: '',
      industry: 'Automotive & Two-Wheeler',
      location: '',
      assignedWorkers: 20,
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      contractStatus: 'Active',
      logoPlaceholder: 'NEW-PLANT',
      deploymentSince: '2026',
      password: generateStrongPassword(16),
      activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)'],
    });
  };

  const toggleAttendance = (empId: string) => {
    setAttendanceRecords((prev) => {
      const current = prev[empId] || 'Present';
      const next = current === 'Present' ? 'Absent' : current === 'Absent' ? 'Shift Swapped' : 'Present';
      return { ...prev, [empId]: next };
    });
  };

  const stats = getWorkforceStats(employees);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner with Authenticated Session Status */}
      <section className="pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-slate-200 dark:border-white/20 shadow-md flex items-center justify-center shrink-0">
              <img src="/sbe-logo.jpg" alt="SBE" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Shree Beereshwara Enterprises (SBE)
                </h1>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 dark:bg-sbe-royal/40 text-sbe-royal dark:text-sbe-gold border border-blue-200 dark:border-sbe-gold/40 uppercase">
                  {userRole.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Authenticated: <strong className="text-slate-800 dark:text-slate-200">{authSession.name}</strong> ({authSession.email})
              </p>
            </div>
          </div>

          {/* Role Switcher & Logout */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-industrial-900 p-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-mono">
              <button
                onClick={() => setUserRole('admin')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  userRole === 'admin'
                    ? 'bg-sbe-royal text-white font-bold shadow'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setUserRole('client_hr')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  userRole === 'client_hr'
                    ? 'bg-sbe-royal text-white font-bold shadow'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Client HR
              </button>
            </div>

            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40 text-xs font-bold font-mono flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Admin Module Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-white/10">
          {[
            { id: 'dashboard', label: 'Overview & Deployment', icon: CalendarCheck },
            { id: 'employees', label: 'Employee Management', icon: Users },
            ...(!isClientHR ? [{ id: 'clients', label: 'Client Companies', icon: Building2 }] : []),
            { id: 'attendance', label: 'Live Shift Roll-Call', icon: UserCheck },
            { id: 'reports', label: 'Reports & Compliance Audit', icon: FileText },
          ].map((tab) => {
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-sbe-royal text-white shadow-md font-bold'
                    : 'bg-white dark:bg-industrial-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeAdminTab === 'dashboard' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block">Total Active Headcount</span>
              <span className="text-3xl font-black text-slate-900 dark:text-white mt-1 block">
                {isClientHR ? '145 Workers' : `${stats.totalOnRoll} on Roll`}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-semibold">
                {isClientHR ? 'Assigned across 3 shifts at TVS Plant' : '485 Deployed + 35 in Reserve'}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block">Today's Attendance Rate</span>
              <span className="text-3xl font-black text-sbe-royal dark:text-sbe-gold mt-1 block">97.8%</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                All 3 shifts supervisor roll-call verified
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block">Reserve Hot Standby Pool</span>
              <span className="text-3xl font-black text-emerald-600 dark:text-cyan-400 mt-1 block">35 Personnel</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Ready at Thandavpura depot (&lt; 45m dispatch)
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 block">Compliance Audit Score</span>
              <span className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-1 block">100%</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">
                EPF, ESIC, Form V current through this month
              </span>
            </div>
          </div>

          {/* Shift Breakdown and Client Quotas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Active Shift Deployment Matrix
                </h3>
                <span className="text-xs font-mono text-sbe-royal dark:text-cyan-400 font-semibold">Live 24h cycle</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: 'Shift A (06:00 - 14:00)', count: isClientHR ? 65 : 210, color: 'bg-emerald-500' },
                  { name: 'Shift B (14:00 - 22:00)', count: isClientHR ? 55 : 185, color: 'bg-amber-500' },
                  { name: 'Shift C (22:00 - 06:00 Nocturnal)', count: isClientHR ? 25 : 90, color: 'bg-blue-500' },
                  { name: 'General Day Utility (08:30 - 17:30)', count: isClientHR ? 0 : 35, color: 'bg-purple-500' },
                ].map((shift, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300 font-semibold">{shift.name}</span>
                      <strong className="text-slate-900 dark:text-white">{shift.count} Workers</strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-industrial-800 rounded-full overflow-hidden">
                      <div className={`h-full ${shift.color}`} style={{ width: `${(shift.count / 210) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {isClientHR ? 'TVS Plant Deployment Status' : 'Workforce per Client Facility'}
                </h3>
                <span className="text-xs font-mono text-slate-500">Thandavpura Hub</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {(isClientHR ? clients.filter(c => c.name.includes('TVS')) : clients).map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold">{c.name}</p>
                      <p className="text-[11px] text-slate-500">{c.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sbe-royal dark:text-sbe-gold font-bold text-sm block">
                        {c.assignedWorkers} Workers
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{c.contractStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: EMPLOYEES MANAGEMENT */}
      {activeAdminTab === 'employees' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search workers by ID or Name..."
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
                />
              </div>

              {!isClientHR && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Enroll Worker</span>
                </button>
              )}
            </div>

            {/* Workers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500">
                    <th className="py-3 px-3">Emp ID</th>
                    <th className="py-3 px-3">Worker Name</th>
                    <th className="py-3 px-3">Role / Skill</th>
                    <th className="py-3 px-3">Native Origin</th>
                    <th className="py-3 px-3">Current Assignment</th>
                    <th className="py-3 px-3">Shift</th>
                    <th className="py-3 px-3">Phone</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {searchedEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-bold text-sbe-royal dark:text-sbe-gold">{emp.id}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{emp.name}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{emp.role}</td>
                      <td className="py-3 px-3 text-slate-600 dark:text-cyan-300">{emp.nativeDistrict}, {emp.nativeState}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300 max-w-[180px] truncate" title={emp.clientCompany}>
                        {emp.clientCompany}
                      </td>
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{emp.shift.split(' ')[0]}</td>
                      <td className="py-3 px-3 text-slate-800 dark:text-slate-200 font-semibold">{emp.phone}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] border ${
                            emp.status === 'Active'
                              ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/40'
                              : 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/40'
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            const updated = employees.map(e => e.id === emp.id ? { ...e, status: e.status === 'Active' ? 'In Reserve' : 'Active' } : e);
                            setEmployees(updated as any);
                          }}
                          className="text-[11px] text-sbe-royal dark:text-cyan-400 hover:underline font-semibold"
                        >
                          Toggle Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: CLIENT COMPANIES MANAGEMENT */}
      {activeAdminTab === 'clients' && !isClientHR && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">Client Company Roster</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Manage mapped contracts, allocated workforce quotas, and site coordinators.</p>
              </div>
              <button
                onClick={() => setIsAddClientModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client Plant</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {clients.map((cli) => (
                <div key={cli.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold font-bold">
                      {cli.logoPlaceholder}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">{cli.contractStatus}</span>
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">{cli.name}</h4>
                    <p className="text-slate-500 text-[11px]">{cli.location}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/5 space-y-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>Assigned Quota:</span>
                      <strong className="text-slate-900 dark:text-white">{cli.assignedWorkers} Workers</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Key Contact:</span>
                      <span className="text-slate-800 dark:text-slate-200">{cli.contactPerson.split(' ')[0]}</span>
                    </div>
                    {/* Client HR Login Credentials Display */}
                    <div className="pt-2 mt-2 border-t border-slate-100 dark:border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Key className="w-3 h-3 text-sbe-royal dark:text-sbe-gold" />
                          <span>HR Access:</span>
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 truncate max-w-[140px] font-mono">
                          {cli.contactEmail}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-100 dark:bg-industrial-950 px-2 py-1 rounded text-[10px] font-mono">
                        <span className="text-slate-500">Pass:</span>
                        <span className="text-sbe-royal dark:text-cyan-300 font-bold tracking-wider">
                          {cli.password || 'Tvs@SBE#2026!9'}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(cli.password || 'Tvs@SBE#2026!9');
                            setCopiedPasswordId(cli.id);
                            setTimeout(() => setCopiedPasswordId(null), 2000);
                          }}
                          className="text-slate-500 hover:text-sbe-royal dark:hover:text-white ml-1 p-0.5"
                          title="Copy Password"
                        >
                          {copiedPasswordId === cli.id ? (
                            <span className="text-emerald-500 font-bold">Copied!</span>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: ATTENDANCE & ROLL CALL SIMULATOR */}
      {activeAdminTab === 'attendance' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white">Daily Shift Roll Call &amp; Punch-In Verification</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Simulate biometric shop-floor punch and supervisor roll call sign-off.</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Present
                </span>
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Shift Swapped
                </span>
                <span className="text-red-600 dark:text-red-400 flex items-center gap-1 font-semibold">
                  <XCircle className="w-3.5 h-3.5" /> Absent (Auto-Replaced)
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500">
                    <th className="py-3 px-3">Emp ID</th>
                    <th className="py-3 px-3">Worker Name</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Plant Facility</th>
                    <th className="py-3 px-3">Today's Shift</th>
                    <th className="py-3 px-3">Roll-Call Status</th>
                    <th className="py-3 px-3 text-right">Click to Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {searchedEmployees.slice(0, 12).map((emp) => {
                    const status = attendanceRecords[emp.id] || 'Present';
                    return (
                      <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold text-sbe-royal dark:text-sbe-gold">{emp.id}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{emp.name}</td>
                        <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{emp.role}</td>
                        <td className="py-3 px-3 text-slate-500 truncate max-w-[150px]">{emp.clientCompany}</td>
                        <td className="py-3 px-3 text-sbe-royal dark:text-cyan-300 font-semibold">{emp.shift.split(' ')[0]}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                              status === 'Present'
                                ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                                : status === 'Shift Swapped'
                                ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                                : 'bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/30'
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => toggleAttendance(emp.id)}
                            className="px-2.5 py-1 rounded bg-slate-100 dark:bg-industrial-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-[10px] font-bold"
                          >
                            Change Status
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: REPORTS & COMPLIANCE AUDITS */}
      {activeAdminTab === 'reports' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-sbe-royal dark:text-sbe-gold font-bold">
                <FileSpreadsheet className="w-5 h-5" />
                <span>Monthly Billing Timesheet</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                Itemized worker shift hours, overtime logs, and daily wage muster roll ready for plant accounts approval.
              </p>
              <button
                onClick={() => alert('Downloaded Monthly Timesheet CSV for billing audit.')}
                className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 hover:bg-slate-100 text-slate-900 dark:text-white font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Timesheet (.CSV)</span>
              </button>
            </div>

            <div className="bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-sbe-royal dark:text-cyan-400 font-bold">
                <Shield className="w-5 h-5" />
                <span>Statutory EPF/ESIC Compliance</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                Monthly challan deposit receipts, Form V registrations, and Karnataka labour welfare audit documentation.
              </p>
              <button
                onClick={() => alert('Downloaded Statutory Labour Compliance Docket.')}
                className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 hover:bg-slate-100 text-slate-900 dark:text-white font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Compliance Docket (.PDF)</span>
              </button>
            </div>

            <div className="bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Worker Biometric Identity Roster</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                Complete directory with police verification tokens, native address proofs, and photo identity cards.
              </p>
              <button
                onClick={() => alert('Downloaded Biometric Identity Directory.')}
                className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 hover:bg-slate-100 text-slate-900 dark:text-white font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download ID Verification (.PDF)</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-industrial-900 rounded-3xl border border-slate-200 dark:border-white/20 p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Enroll New Industrial Worker</h3>
            <form onSubmit={handleAddEmployee} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-500 block mb-1">Worker Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rameshwar Sah"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-1">Native State</label>
                  <select
                    value={newEmployee.nativeState}
                    onChange={(e) => setNewEmployee({ ...newEmployee, nativeState: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  >
                    <option>Uttar Pradesh</option>
                    <option>Bihar</option>
                    <option>Jharkhand</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Native District</label>
                  <input
                    type="text"
                    placeholder="e.g. Gorakhpur"
                    value={newEmployee.nativeDistrict}
                    onChange={(e) => setNewEmployee({ ...newEmployee, nativeDistrict: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-1">Role / Skill Category</label>
                  <select
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  >
                    <option>Assembly Line Operator</option>
                    <option>Machine Helper</option>
                    <option>FMCG Packer</option>
                    <option>Heavy Loader</option>
                    <option>Material Handler</option>
                    <option>Yard Specialist</option>
                    <option>Housekeeping &amp; Utility</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9XXXX XXXXX"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Assign to Client Plant</label>
                <select
                  value={newEmployee.clientCompany}
                  onChange={(e) => setNewEmployee({ ...newEmployee, clientCompany: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                  <option value="Reserve Pool / Hot Standby">Reserve Pool / Hot Standby (Thandavpura)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sbe-royal text-white font-bold shadow"
                >
                  Save &amp; Enroll Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-industrial-900 rounded-3xl border border-slate-200 dark:border-white/20 p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">Add New Industrial Client Facility</h3>
            <form onSubmit={handleAddClient} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-slate-500 block mb-1">Plant / Corporate Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Auto Spares Mysore"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-1">Industrial Cluster</label>
                  <input
                    type="text"
                    placeholder="e.g. Kadakola Belt"
                    value={newClient.location}
                    onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Allocated Headcount</label>
                  <input
                    type="number"
                    value={newClient.assignedWorkers}
                    onChange={(e) => setNewClient({ ...newClient, assignedWorkers: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-1">Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="Plant HR Head"
                    value={newClient.contactPerson}
                    onChange={(e) => setNewClient({ ...newClient, contactPerson: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Contact Mobile</label>
                  <input
                    type="tel"
                    placeholder="+91 9XXXX XXXXX"
                    value={newClient.contactPhone}
                    onChange={(e) => setNewClient({ ...newClient, contactPhone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Client HR Email (Portal Login ID)</label>
                <input
                  type="email"
                  placeholder="e.g. hr@clientplant.com"
                  value={newClient.contactEmail}
                  onChange={(e) => setNewClient({ ...newClient, contactEmail: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 rounded-xl p-2 text-slate-900 dark:text-white"
                />
              </div>

              {/* Generated Strong Password Section */}
              <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-industrial-950 border border-blue-200 dark:border-sbe-royal/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sbe-royal dark:text-sbe-gold font-bold flex items-center gap-1.5 text-xs">
                    <Key className="w-3.5 h-3.5" />
                    <span>Auto-Generated Strong Password</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setNewClient({ ...newClient, password: generateStrongPassword(16) })}
                    className="text-[11px] text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Regenerate</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={newClient.password || ''}
                    className="flex-1 bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newClient.password) {
                        navigator.clipboard.writeText(newClient.password);
                        setCopiedPasswordId('new-client');
                        setTimeout(() => setCopiedPasswordId(null), 2000);
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-sbe-royal text-white text-xs font-semibold flex items-center gap-1 shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedPasswordId === 'new-client' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Cryptographically secure 16-character password with letters, numbers, and symbols. Saved to backend for client HR access.
                </p>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-industrial-950 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sbe-royal text-white font-bold shadow"
                >
                  Register Client Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
