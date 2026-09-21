export interface ClientCompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  assignedWorkers: number;
  activeShifts: string[];
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  contractStatus: 'Active' | 'Under Renewal' | 'Scaling Up' | string;
  logoPlaceholder: string;
  deploymentSince: string;
  password?: string;
}

export const CLIENTS_DATA: ClientCompany[] = [];
