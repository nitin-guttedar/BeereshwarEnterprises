import React, { useState, useEffect } from 'react';
import { EmployeeRecord } from '../../data/employees';
import { ClientCompany } from '../../data/clients';
import { 
  fetchClients, 
  createClient, 
  regenerateClientPassword,
  fetchEmployees, 
  createEmployee, 
  updateEmployee, 
  fetchAttendance, 
  toggleAttendance as apiToggleAttendance 
} from '../../services/api';
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
  Key,
  Loader2,
  AlertCircle,
  X
} from 'lucide-react';
import { Skeleton, MetricCardSkeleton, ClientCardSkeleton } from '../../components/Skeleton';

// Helper to generate a strong 16-character password
const generateStrongPassword = (length = 16) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=[]{}|';
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

interface AdminPortalProps {
  userRole: 'public' | 'client_hr' | 'admin';
  setUserRole?: (role: 'public' | 'client_hr' | 'admin') => void;
  setCurrentTab: (tab: string) => void;
  authSession: { name: string; email: string; company?: string } | null;
  onLogout: () => void;
  onOpenLoginModal: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  userRole,
  authSession,
  onLogout,
  onOpenLoginModal,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'employees' | 'clients' | 'attendance' | 'reports'>('dashboard');
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [clients, setClients] = useState<ClientCompany[]>([]);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [pendingActions, setPendingActions] = useState<{ [key: string]: boolean }>({});
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Add Employee Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<EmployeeRecord>>({
    name: '',
    role: 'Assembly Line Operator',
    nativeState: 'Karnataka',
    nativeDistrict: 'Mysore',
    clientCompany: 'Thandavpura Base Camp',
    clientLocation: 'Kadakola Belt, Mysore',
    shift: 'Shift A (06:00 - 14:00)',
    phone: '+91 9',
    status: 'Active',
    experienceYears: 2,
    aadhaarVerified: true,
    medicalFitnessValid: true,
    supervisorName: 'M. Ramesh',
  });

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
    password: '',
    activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)'],
  });

  const openAddClientModal = () => {
    setNewClient(prev => ({
      ...prev,
      password: prev.password || generateStrongPassword(16),
    }));
    setIsAddClientModalOpen(true);
  };

  // Attendance simulation state
  const [attendanceRecords, setAttendanceRecords] = useState<{ [id: string]: 'Present' | 'Absent' | 'Shift Swapped' }>({});

  // Initial load from backend
  useEffect(() => {
    if (!authSession) return;
    let isCancelled = false;

    Promise.all([
      fetchClients().catch(() => []),
      fetchEmployees().catch(() => []),
      fetchAttendance().catch(() => ({})),
    ]).then(([clientsData, employeesData, attendanceData]) => {
      if (!isCancelled) {
        setClients(clientsData || []);
        setEmployees(employeesData || []);
        setAttendanceRecords(attendanceData || {});
        setIsLoadingData(false);
      }
    }).catch((err) => {
      console.error('Failed to load data from backend:', err);
      if (!isCancelled) {
        setIsLoadingData(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [authSession]);

  // Manual refresh handler for "Sync Backend" button
  const handleRefreshData = async () => {
    if (!authSession || isSyncing) return;
    setIsSyncing(true);

    try {
      const [clientsData, employeesData, attendanceData] = await Promise.all([
        fetchClients().catch(() => []),
        fetchEmployees().catch(() => []),
        fetchAttendance().catch(() => ({})),
      ]);
      setClients(clientsData || []);
      setEmployees(employeesData || []);
      setAttendanceRecords(attendanceData || {});
      setBanner({ type: 'success', message: 'Backend data successfully refreshed!' });
      setTimeout(() => setBanner(null), 4000);
    } catch (err: any) {
      console.error('Failed to sync backend:', err);
      setBanner({ type: 'error', message: 'Failed to sync with backend: ' + (err?.message || 'Network error') });
    } finally {
      setIsSyncing(false);
    }
  };

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
  const clientHRCompany = authSession?.company || 'TVS Motor Supplier / Two-Wheeler Assembly';

  const visibleEmployees = isClientHR
    ? employees.filter((e) => e.clientCompany === clientHRCompany)
    : employees;

  const searchedEmployees = visibleEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      e.id.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      e.role.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  // Dynamic Headcount & SLA Calculations:
  const totalOnRoll = visibleEmployees.length;
  const deployedCount = visibleEmployees.filter((e) => e.status === 'Active').length;
  const reserveCount = visibleEmployees.filter((e) => e.status === 'In Reserve').length;

  // Dynamic Attendance Rate:
  const punchedEmployees = visibleEmployees.filter((e) => attendanceRecords[e.id]);
  const presentEmployees = visibleEmployees.filter(
    (e) => attendanceRecords[e.id] === 'Present' || attendanceRecords[e.id] === 'Shift Swapped'
  );
  const attendanceRate = punchedEmployees.length > 0
    ? `${((presentEmployees.length / punchedEmployees.length) * 100).toFixed(1)}%`
    : (visibleEmployees.length > 0 ? '100.0%' : '0.0%');

  // Dynamic Compliance Score:
  const compliantWorkers = visibleEmployees.filter((e) => e.aadhaarVerified && e.medicalFitnessValid).length;
  const complianceScore = visibleEmployees.length > 0
    ? `${Math.round((compliantWorkers / visibleEmployees.length) * 100)}%`
    : '0%';

  // Dynamic Shift Breakdown:
  const shiftACount = visibleEmployees.filter((e) => (e.shift || '').toLowerCase().includes('shift a')).length;
  const shiftBCount = visibleEmployees.filter((e) => (e.shift || '').toLowerCase().includes('shift b')).length;
  const shiftCCount = visibleEmployees.filter((e) => (e.shift || '').toLowerCase().includes('shift c')).length;
  const shiftGenCount = visibleEmployees.filter((e) => (e.shift || '').toLowerCase().includes('general')).length;
  const maxShiftCount = Math.max(shiftACount, shiftBCount, shiftCCount, shiftGenCount, 1);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingActions['add-employee']) return; // Idempotency check

    if (!newEmployee.name || !newEmployee.phone) {
      setBanner({ type: 'error', message: 'Please fill out employee name and phone number.' });
      return;
    }

    setPendingActions((prev) => ({ ...prev, 'add-employee': true }));

    try {
      const created = await createEmployee({
        name: newEmployee.name,
        role: newEmployee.role || 'Machine Helper',
        nativeState: newEmployee.nativeState || 'Karnataka',
        nativeDistrict: newEmployee.nativeDistrict || 'Mysore',
        clientCompany: newEmployee.clientCompany || (clients[0]?.name || 'Base Camp / Pool'),
        clientLocation: newEmployee.clientLocation || 'Mysore',
        shift: newEmployee.shift || 'Shift A (06:00 - 14:00)',
        status: newEmployee.status || 'Active',
        phone: newEmployee.phone,
        aadhaarVerified: !!newEmployee.aadhaarVerified,
        medicalFitnessValid: !!newEmployee.medicalFitnessValid,
        supervisorName: newEmployee.supervisorName || 'Site Supervisor',
        experienceYears: Number(newEmployee.experienceYears) || 1,
      });

      setEmployees((prev) => [created, ...prev]);
      setAttendanceRecords((prev) => ({ ...prev, [created.id]: 'Present' }));
      setIsAddModalOpen(false);
      setBanner({ type: 'success', message: `Worker ${created.name} (${created.id}) successfully enrolled in backend!` });
      setTimeout(() => setBanner(null), 4000);

      setNewEmployee({
        name: '',
        role: 'Assembly Line Operator',
        nativeState: 'Karnataka',
        nativeDistrict: 'Mysore',
        clientCompany: clients[0]?.name || 'Base Camp / Pool',
        clientLocation: 'Kadakola Belt, Mysore',
        shift: 'Shift A (06:00 - 14:00)',
        phone: '+91 9',
        status: 'Active',
        experienceYears: 2,
        aadhaarVerified: true,
        medicalFitnessValid: true,
        supervisorName: 'M. Ramesh',
      });
    } catch (err: any) {
      setBanner({ type: 'error', message: 'Failed to enroll worker: ' + (err?.message || 'Server error') });
    } finally {
      setPendingActions((prev) => ({ ...prev, 'add-employee': false }));
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingActions['add-client']) return; // Idempotency check

    if (!newClient.name || !newClient.contactPerson) {
      setBanner({ type: 'error', message: 'Please fill out client company name and contact person.' });
      return;
    }

    const generatedPass = newClient.password || generateStrongPassword(16);
    setPendingActions((prev) => ({ ...prev, 'add-client': true }));

    try {
      const created = await createClient({
        name: newClient.name,
        industry: newClient.industry || 'General Industrial',
        location: newClient.location || 'Mysore Industrial Belt',
        assignedWorkers: Number(newClient.assignedWorkers) || 15,
        activeShifts: newClient.activeShifts || ['Shift A (06:00 - 14:00)'],
        contactPerson: newClient.contactPerson,
        contactEmail: newClient.contactEmail || `hr@${newClient.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        contactPhone: newClient.contactPhone || '+91 98450 00000',
        contractStatus: 'Active',
        password: generatedPass,
      });

      setClients((prev) => [...prev, created]);
      setIsAddClientModalOpen(false);
      setBanner({ type: 'success', message: `Client plant ${created.name} successfully registered in backend!` });
      setTimeout(() => setBanner(null), 4000);

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
    } catch (err: any) {
      setBanner({ type: 'error', message: 'Failed to create client: ' + (err?.message || 'Server error') });
    } finally {
      setPendingActions((prev) => ({ ...prev, 'add-client': false }));
    }
  };

  const toggleAttendance = async (empId: string) => {
    const actionKey = `att-${empId}`;
    if (pendingActions[actionKey]) return; // Idempotency check

    setPendingActions((prev) => ({ ...prev, [actionKey]: true }));
    const current = attendanceRecords[empId] || 'Present';
    const next = current === 'Present' ? 'Absent' : current === 'Absent' ? 'Shift Swapped' : 'Present';
    setAttendanceRecords((prev) => ({ ...prev, [empId]: next }));

    try {
      await apiToggleAttendance(empId);
    } catch (err: any) {
      console.error('Failed to sync attendance toggle:', err);
      setBanner({ type: 'error', message: `Failed to sync attendance for ${empId}: ${err?.message || 'Network error'}` });
      setAttendanceRecords((prev) => ({ ...prev, [empId]: current }));
    } finally {
      setPendingActions((prev) => ({ ...prev, [actionKey]: false }));
    }
  };

  const toggleEmployeeStatus = async (emp: EmployeeRecord) => {
    const actionKey = `status-${emp.id}`;
    if (pendingActions[actionKey]) return; // Idempotency check

    setPendingActions((prev) => ({ ...prev, [actionKey]: true }));
    const nextStatus = emp.status === 'Active' ? 'In Reserve' : 'Active';

    // Optimistic update
    setEmployees((prev) => prev.map((e) => (e.id === emp.id ? { ...e, status: nextStatus } : e)));

    try {
      await updateEmployee(emp.id, { status: nextStatus });
    } catch (err: any) {
      console.error('Error updating worker status:', err);
      setBanner({ type: 'error', message: `Failed to update status for ${emp.id}: ${err?.message || 'Network error'}` });
      setEmployees((prev) => prev.map((e) => (e.id === emp.id ? { ...e, status: emp.status } : e)));
    } finally {
      setPendingActions((prev) => ({ ...prev, [actionKey]: false }));
    }
  };

  const handleRegeneratePassword = async (cliId: string) => {
    const actionKey = `regen-${cliId}`;
    if (pendingActions[actionKey]) return; // Idempotency check

    setPendingActions((prev) => ({ ...prev, [actionKey]: true }));

    try {
      const res = await regenerateClientPassword(cliId);
      if (res && res.newPassword) {
        setClients((prev) => prev.map((c) => (c.id === cliId ? { ...c, password: res.newPassword } : c)));
        setBanner({ type: 'success', message: 'Client portal password successfully updated!' });
        setTimeout(() => setBanner(null), 3000);
      }
    } catch (err: any) {
      console.error('Failed to regenerate password:', err);
      setBanner({ type: 'error', message: 'Failed to regenerate password: ' + (err?.message || 'Server error') });
    } finally {
      setPendingActions((prev) => ({ ...prev, [actionKey]: false }));
    }
  };

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
                  {userRole === 'admin' ? 'SBE Central Administrator Console' : `${authSession.company || 'Client Facility'} – HR Portal`}
                </h1>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border uppercase ${
                  userRole === 'admin'
                    ? 'bg-blue-100 dark:bg-sbe-royal/40 text-sbe-royal dark:text-sbe-gold border-blue-200 dark:border-sbe-gold/40'
                    : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                }`}>
                  {userRole === 'admin' ? 'Agency Admin' : 'Client HR'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Authenticated: <strong className="text-slate-800 dark:text-slate-200">{authSession.name}</strong> ({authSession.email})
                {userRole === 'client_hr' && authSession.company && (
                  <span> • Plant: <strong className="text-emerald-600 dark:text-emerald-400">{authSession.company}</strong></span>
                )}
              </p>
            </div>
          </div>

          {/* Sync Data, Authenticated Badge & Logout */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRefreshData}
              disabled={isSyncing}
              title="Sync live data from backend"
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-industrial-900 hover:bg-slate-200 dark:hover:bg-industrial-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-bold font-mono flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sbe-royal dark:text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Backend'}</span>
            </button>

            {/* Authenticated Role Tag (Strict Role Isolation - No Switcher) */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/10 text-xs font-mono">
              {userRole === 'admin' ? (
                <span className="flex items-center gap-1.5 text-sbe-royal dark:text-sbe-gold font-bold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Access</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{authSession.company || 'Client HR'}</span>
                </span>
              )}
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

        {/* User Alert / Notification Banner */}
        {banner && (
          <div className={`mt-4 p-4 rounded-2xl text-xs font-mono flex items-center justify-between shadow-sm animate-fadeIn ${
            banner.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300'
              : 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300'
          }`}>
            <div className="flex items-center gap-2">
              {banner.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              )}
              <span>{banner.message}</span>
            </div>
            <button onClick={() => setBanner(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
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
          {/* Key Metric Cards - Dynamic from backend with modern shimmers */}
          {isLoadingData ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
              <MetricCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 block">Total Active Headcount</span>
                <span className="text-3xl font-black text-slate-900 dark:text-white mt-1 block">
                  {isClientHR ? `${deployedCount} Workers` : `${totalOnRoll} on Roll`}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block font-semibold">
                  {isClientHR ? `Assigned across active shifts at ${clientHRCompany}` : `${deployedCount} Deployed + ${reserveCount} in Reserve`}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 block">Today's Attendance Rate</span>
                <span className="text-3xl font-black text-sbe-royal dark:text-sbe-gold mt-1 block">
                  {attendanceRate}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {totalOnRoll > 0 ? 'All 3 shifts supervisor roll-call verified' : 'No active shift roll-call recorded'}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 block">Reserve Hot Standby Pool</span>
                <span className="text-3xl font-black text-emerald-600 dark:text-cyan-400 mt-1 block">
                  {reserveCount} Personnel
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {reserveCount > 0 ? 'Ready at Thandavpura depot (< 45m dispatch)' : 'No personnel in reserve pool'}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm">
                <span className="text-slate-500 dark:text-slate-400 block">Compliance Audit Score</span>
                <span className="text-3xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
                  {complianceScore}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">
                  {compliantWorkers > 0 ? 'EPF, ESIC, Form V current through this month' : 'No compliance records verified'}
                </span>
              </div>
            </div>
          )}

          {/* Shift Breakdown and Client Quotas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Active Shift Deployment Matrix
                </h3>
                <span className="text-xs font-mono text-sbe-royal dark:text-cyan-400 font-semibold">Live 24h cycle</span>
              </div>

              {isLoadingData ? (
                <div className="space-y-3 font-mono text-xs">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="w-36 h-4" />
                        <Skeleton className="w-16 h-4" />
                      </div>
                      <Skeleton className="w-full h-1.5 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {[
                    { name: 'Shift A (06:00 - 14:00)', count: shiftACount, color: 'bg-emerald-500', subtitle: 'Conveyor Assembly & Bottling' },
                    { name: 'Shift B (14:00 - 22:00)', count: shiftBCount, color: 'bg-amber-500', subtitle: 'FMCG Packing & Machine Helpers' },
                    { name: 'Shift C (22:00 - 06:00 Nocturnal)', count: shiftCCount, color: 'bg-blue-500', subtitle: 'Warehouse Dock Loading / Unloading' },
                    { name: 'General Day Utility (08:30 - 17:30)', count: shiftGenCount, color: 'bg-purple-500', subtitle: 'Facility Maintenance & Yard Support' },
                  ].map((shift, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-slate-700 dark:text-slate-300 font-semibold block">{shift.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{shift.subtitle}</span>
                        </div>
                        <strong className="text-slate-900 dark:text-white font-bold">{shift.count} Workers</strong>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-industrial-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${shift.color} transition-all duration-500`}
                          style={{ width: `${shift.count > 0 ? (shift.count / maxShiftCount) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-industrial-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  {isClientHR ? 'TVS Plant Deployment Status' : 'Workforce per Client Facility'}
                </h3>
                <span className="text-xs font-mono text-slate-500">Thandavpura Hub</span>
              </div>

              {isLoadingData ? (
                <div className="space-y-2.5 font-mono text-xs">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                      <div className="space-y-1">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-24 h-3" />
                      </div>
                      <Skeleton className="w-20 h-5" />
                    </div>
                  ))}
                </div>
              ) : clients.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-slate-500 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                  No client facilities mapped yet (0 facilities).
                </div>
              ) : (
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
              )}
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

            {/* Workers Table or Empty State or Skeleton */}
            {isLoadingData ? (
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
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <tr key={n}>
                        <td className="py-3 px-3"><Skeleton className="w-16 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-28 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-24 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-28 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-32 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-16 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-24 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-16 h-4" /></td>
                        <td className="py-3 px-3 text-right"><Skeleton className="w-20 h-4 ml-auto" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : searchedEmployees.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl space-y-3">
                <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No workers currently enrolled in roster.</p>
                <p className="text-xs text-slate-500 font-mono">Use the "Enroll Worker" button to register your workforce employees.</p>
                {!isClientHR && (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="mt-3 px-4 py-2 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Enroll First Worker</span>
                  </button>
                )}
              </div>
            ) : (
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
                        <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{(emp.shift || '').split(' ')[0]}</td>
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
                            disabled={!!pendingActions[`status-${emp.id}`]}
                            onClick={() => toggleEmployeeStatus(emp)}
                            className="text-[11px] text-sbe-royal dark:text-cyan-400 hover:underline font-semibold disabled:opacity-50 inline-flex items-center gap-1"
                          >
                            {pendingActions[`status-${emp.id}`] ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Updating...</span>
                              </>
                            ) : (
                              <span>Toggle Status</span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                onClick={openAddClientModal}
                className="px-4 py-2 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Client Plant</span>
              </button>
            </div>

            {/* Clients Grid or Empty State or Skeletons */}
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ClientCardSkeleton />
                <ClientCardSkeleton />
                <ClientCardSkeleton />
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl space-y-3">
                <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No client plants registered yet.</p>
                <p className="text-xs text-slate-500 font-mono">Click "Add Client Plant" to register your first partner factory.</p>
                <button
                  onClick={openAddClientModal}
                  className="mt-3 px-4 py-2 rounded-xl bg-sbe-royal hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Client Plant</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                {clients.map((cli) => (
                  <div key={cli.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-slate-200 dark:border-white/5 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-blue-100 dark:bg-industrial-800 text-sbe-royal dark:text-sbe-gold font-bold">
                        {cli.logoPlaceholder || (cli.name || 'PLANT').slice(0, 6).toUpperCase()}
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
                          <div className="flex items-center gap-1">
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
                            <button
                              type="button"
                              disabled={!!pendingActions[`regen-${cli.id}`]}
                              onClick={() => handleRegeneratePassword(cli.id)}
                              className="text-slate-500 hover:text-sbe-royal dark:hover:text-white p-0.5 disabled:opacity-50"
                              title="Regenerate Strong Password"
                            >
                              {pendingActions[`regen-${cli.id}`] ? (
                                <Loader2 className="w-3 h-3 animate-spin text-sbe-royal dark:text-sbe-gold" />
                              ) : (
                                <RefreshCw className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

            {/* Attendance Table or Skeletons */}
            {isLoadingData ? (
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
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <tr key={n}>
                        <td className="py-3 px-3"><Skeleton className="w-16 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-28 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-24 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-32 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-16 h-4" /></td>
                        <td className="py-3 px-3"><Skeleton className="w-20 h-5" /></td>
                        <td className="py-3 px-3 text-right"><Skeleton className="w-20 h-6 ml-auto" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : searchedEmployees.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl space-y-3">
                <UserCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No workers available for roll-call.</p>
                <p className="text-xs text-slate-500 font-mono">Enroll workers to monitor shift biometric punch-ins.</p>
              </div>
            ) : (
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
                    {searchedEmployees.slice(0, 15).map((emp) => {
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
                              disabled={!!pendingActions[`att-${emp.id}`]}
                              onClick={() => toggleAttendance(emp.id)}
                              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-industrial-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-[10px] font-bold disabled:opacity-50 inline-flex items-center gap-1"
                            >
                              {pendingActions[`att-${emp.id}`] ? (
                                <>
                                  <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                  <span>Saving...</span>
                                </>
                              ) : (
                                <span>Change Status</span>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
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
                    <option>Karnataka</option>
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
                  disabled={!!pendingActions['add-employee']}
                  className="flex-1 py-2.5 rounded-xl bg-sbe-royal text-white font-bold shadow disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {pendingActions['add-employee'] ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enrolling Worker...</span>
                    </>
                  ) : (
                    <span>Save &amp; Enroll Worker</span>
                  )}
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
                  disabled={!!pendingActions['add-client']}
                  className="flex-1 py-2.5 rounded-xl bg-sbe-royal text-white font-bold shadow disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {pendingActions['add-client'] ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering Plant...</span>
                    </>
                  ) : (
                    <span>Register Client Facility</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
