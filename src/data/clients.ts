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
  contractStatus: 'Active' | 'Under Renewal' | 'Scaling Up';
  logoPlaceholder: string;
  deploymentSince: string;
}

export const CLIENTS_DATA: ClientCompany[] = [
  {
    id: 'cli-01',
    name: 'TVS Motor Supplier / Two-Wheeler Assembly',
    industry: 'Automotive & Two-Wheeler',
    location: 'Kadakola Industrial Belt, Mysore',
    assignedWorkers: 145,
    activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)', 'Shift C (22:00 - 06:00)'],
    contactPerson: 'K. Ramesh (Plant Operations Head)',
    contactEmail: 'ramesh.k@tvs-auto-assembly.in',
    contactPhone: '+91 94802 11982',
    contractStatus: 'Active',
    logoPlaceholder: 'TVS-AUTO',
    deploymentSince: '2021',
  },
  {
    id: 'cli-02',
    name: 'Hector Beverages (Paperboat Juices & Beverages)',
    industry: 'Beverage & FMCG',
    location: 'Tandavpura Industrial Area, Mysore',
    assignedWorkers: 98,
    activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)'],
    contactPerson: 'Anjali Sharma (Supply Chain Lead)',
    contactEmail: 'a.sharma@hector-beverages-mys.com',
    contactPhone: '+91 98450 77312',
    contractStatus: 'Active',
    logoPlaceholder: 'PAPERBOAT',
    deploymentSince: '2022',
  },
  {
    id: 'cli-03',
    name: 'South Bottlers (Coca-Cola Bottling Partner)',
    industry: 'Beverage & FMCG Bottling',
    location: 'Nanjangud Industrial Cluster, Mysore',
    assignedWorkers: 112,
    activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)', 'Shift C (22:00 - 06:00)'],
    contactPerson: 'S. N. Mahadev (HR & Plant Admin)',
    contactEmail: 'mahadev.sn@southbottlers.co.in',
    contactPhone: '+91 98801 44520',
    contractStatus: 'Active',
    logoPlaceholder: 'COCA-COLA-PTNR',
    deploymentSince: '2020',
  },
  {
    id: 'cli-04',
    name: 'AutoTech Precision Ancillary Components',
    industry: 'Automotive Components',
    location: 'Hebbal Industrial Estate, Mysore',
    assignedWorkers: 65,
    activeShifts: ['General Day (08:30 - 17:30)', 'Shift B (14:00 - 22:00)'],
    contactPerson: 'Girish Kumar (Factory Manager)',
    contactEmail: 'girish@autotechprecision.com',
    contactPhone: '+91 99014 88319',
    contractStatus: 'Scaling Up',
    logoPlaceholder: 'AUTOTECH',
    deploymentSince: '2023',
  },
  {
    id: 'cli-05',
    name: 'LogiHub South Logistics & Warehouse Terminal',
    industry: 'Warehousing & Logistics',
    location: 'Hootagalli Industrial Suburb, Mysore',
    assignedWorkers: 54,
    activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)', 'Shift C (22:00 - 06:00)'],
    contactPerson: 'Vikram Singh (Dock Logistics Superintendent)',
    contactEmail: 'v.singh@logihub-south.in',
    contactPhone: '+91 97413 55901',
    contractStatus: 'Active',
    logoPlaceholder: 'LOGIHUB',
    deploymentSince: '2022',
  },
  {
    id: 'cli-06',
    name: 'Metagalli Heavy Engineering & Line Parts',
    industry: 'Packaging & Line Operations',
    location: 'Metagalli Industrial Area, Mysore',
    assignedWorkers: 42,
    activeShifts: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)'],
    contactPerson: 'Pradeep Gowda (HR Officer)',
    contactEmail: 'pgowda@metagalliparts.org',
    contactPhone: '+91 94480 33214',
    contractStatus: 'Active',
    logoPlaceholder: 'METAPARTS',
    deploymentSince: '2023',
  }
];
