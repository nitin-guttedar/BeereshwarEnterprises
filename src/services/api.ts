/**
 * API Service for Shree Beereshwara Enterprises
 * Production Backend Endpoint: https://sbebackend.vercel.app/api
 */

export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  'https://sbebackend.vercel.app/api';

/**
 * Get stored JWT authentication headers
 */
export function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('sbe_auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// -------------------------------------------------------------
// Authentication
// -------------------------------------------------------------
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Authentication failed.');
  }
  if (data.token) {
    localStorage.setItem('sbe_auth_token', data.token);
  }
  return data;
}

export async function getCurrentUser() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch user profile.');
  }
  return data;
}

// -------------------------------------------------------------
// Clients Management
// -------------------------------------------------------------
export async function fetchClients() {
  const res = await fetch(`${API_BASE_URL}/clients`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load client companies.');
  }
  return data.clients || [];
}

export async function createClient(clientData: any) {
  const res = await fetch(`${API_BASE_URL}/clients`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(clientData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to register client company.');
  }
  return data.client;
}

export async function updateClient(id: string, updates: any) {
  const res = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update client company.');
  }
  return data.client;
}

export async function deleteClient(id: string) {
  const res = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete client company.');
  }
  return data;
}

export async function regenerateClientPassword(id: string) {
  const res = await fetch(`${API_BASE_URL}/clients/${id}/regenerate-password`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to regenerate password.');
  }
  return data;
}

// -------------------------------------------------------------
// Employees Management
// -------------------------------------------------------------
export async function fetchEmployees(params?: { search?: string; clientCompany?: string; role?: string; status?: string }) {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.clientCompany) query.set('clientCompany', params.clientCompany);
  if (params?.role) query.set('role', params.role);
  if (params?.status) query.set('status', params.status);

  const url = `${API_BASE_URL}/employees${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await fetch(url, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load employees roster.');
  }
  return data.employees || [];
}

export async function fetchEmployeeStats() {
  const res = await fetch(`${API_BASE_URL}/employees/stats`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load employee stats.');
  }
  return data.stats;
}

export async function createEmployee(empData: any) {
  const res = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(empData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to enroll employee.');
  }
  return data.employee;
}

export async function updateEmployee(id: string, updates: any) {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update employee.');
  }
  return data.employee;
}

export async function deleteEmployee(id: string) {
  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete employee.');
  }
  return data;
}

// -------------------------------------------------------------
// Live Shift Attendance
// -------------------------------------------------------------
export async function fetchAttendance() {
  const res = await fetch(`${API_BASE_URL}/attendance`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load attendance records.');
  }
  return data.attendance || {};
}

export async function toggleAttendance(empId: string) {
  const res = await fetch(`${API_BASE_URL}/attendance/toggle`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ empId }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to toggle attendance.');
  }
  return data;
}

// -------------------------------------------------------------
// Inbound Proposals / Requisitions
// -------------------------------------------------------------
export async function submitProposal(proposalData: any) {
  const res = await fetch(`${API_BASE_URL}/proposals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proposalData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit proposal request.');
  }
  return data;
}

export async function fetchProposals() {
  const res = await fetch(`${API_BASE_URL}/proposals`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load proposals.');
  }
  return data.proposals || [];
}

// -------------------------------------------------------------
// Reports & Compliance
// -------------------------------------------------------------
export async function fetchTimesheetReport() {
  const res = await fetch(`${API_BASE_URL}/reports/timesheet`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load timesheet report.');
  }
  return data.timesheet;
}

export async function fetchComplianceReport() {
  const res = await fetch(`${API_BASE_URL}/reports/compliance`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load compliance report.');
  }
  return data.compliance;
}

export async function fetchRosterReport() {
  const res = await fetch(`${API_BASE_URL}/reports/roster`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load roster report.');
  }
  return data;
}
