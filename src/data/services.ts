export interface ManpowerService {
  id: string;
  title: string;
  category: 'Core Supply' | 'Specialized Line' | 'Support & Logistics';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  shiftsAvailable: string[];
  suitableIndustries: string[];
  complianceGuarantee: string;
  badge: string;
}

export const SERVICES_DATA: ManpowerService[] = [
  {
    id: 'industrial-manpower',
    title: 'Industrial Manpower Supply in Mysore',
    category: 'Core Supply',
    shortDesc: 'End-to-end industrial labour supply for factories across Mysore, Tandavpura, and 100+ km radius.',
    fullDesc: 'Comprehensive industrial manpower solutions catering to large assembly plants, continuous manufacturing lines, and process facilities. We supply robust, trained, and disciplined workforces primarily from UP, Bihar, and Jharkhand who are acclimated to intensive shop floor environments.',
    features: [
      'Over 500+ active workforce on roll ready for rapid deployment',
      'Continuous availability for 24/7 tri-shift manufacturing lines',
      'On-site supervisor assigned per unit for daily coordination & roll call',
      'Complete statutory PF, ESI, and safety induction compliance',
    ],
    shiftsAvailable: ['Shift A (06:00 - 14:00)', 'Shift B (14:00 - 22:00)', 'Shift C (22:00 - 06:00)', 'General Day'],
    suitableIndustries: ['Automotive', 'Beverage & FMCG', 'Engineering Spares', 'Packaging'],
    complianceGuarantee: '100% compliant with Karnataka Labour Regulation Act, ESI & PF filed monthly.',
    badge: 'Flagship Solution',
  },
  {
    id: 'contract-labour',
    title: 'Contract Labour for Factories & Plants',
    category: 'Core Supply',
    shortDesc: 'Flexible mid-to-long term contract staffing to scale production volume without increasing permanent payroll.',
    fullDesc: 'Custom contract labour programs designed for motorcycle manufacturers, automotive component makers, and FMCG operations. Allows manufacturing units to flexibly scale operations up or down during peak production surges, model launches, and seasonal shifts.',
    features: [
      'Term contracts from 3 months to multi-year framework agreements',
      'Predictable monthly billing with itemized attendance records',
      'Replacement workforce guarantee within 12 hours for zero production drop',
      'Dedicated contractor compliance ledger provided for corporate audits',
    ],
    shiftsAvailable: ['All 3 Rotating Shifts', 'Day/Night Split'],
    suitableIndustries: ['Automotive & Motorcycle Plants', 'Consumer Goods', 'Metal Ancillary'],
    complianceGuarantee: 'Complete Form V issuance and Contract Labour (Regulation & Abolition) compliance.',
    badge: 'High Demand',
  },
  {
    id: 'daily-wage-labour',
    title: 'Daily Wage Labour Supply for Urgent Requirements',
    category: 'Core Supply',
    shortDesc: 'Rapid turnaround daily workers dispatched within hours for sudden production spikes or replacement.',
    fullDesc: 'Emergency and short-notice daily wage labour supply. When unexpected plant absenteeism strikes or a rush container loading is scheduled, our reserve pool of North Indian workers in Tandavpura is mobilized promptly to ensure zero downtime.',
    features: [
      'Same-day and 24-hour turnaround deployment guarantee',
      'Reserve pool of 80+ pre-vetted workers always on standby in Mysore',
      'Managed transportation arranged directly to client plant gates',
      'Transparent daily attendance logs with digital biometric / supervisor sign-off',
    ],
    shiftsAvailable: ['Instant Callout', 'Any Shift', 'Weekend Overtime'],
    suitableIndustries: ['Logistics Hubs', 'Beverage Bottling', 'Agro-processing', 'Warehouses'],
    complianceGuarantee: 'Daily wage registers maintained with legal minimum wage parity.',
    badge: 'Urgent Dispatch',
  },
  {
    id: 'unskilled-semiskilled',
    title: 'Unskilled & Semi-Skilled Workers',
    category: 'Specialized Line',
    shortDesc: 'Trained helpers, loaders, packers, line operators, and material handlers with shop-floor discipline.',
    fullDesc: 'Carefully evaluated workers categorized into distinct skill bands: Helpers for machine loading, semi-skilled operators for repetitive assembly lines, carton packers, and material handlers. Each worker undergoes basic safety briefing and tool familiarity.',
    features: [
      'Pre-assessed skill categories: Helper, Semi-Skilled, Line Operator',
      'Proven discipline, minimal unnotified absenteeism, and low attrition',
      'Trained in PPE adherence (safety boots, helmets, gloves, earplugs)',
      'Language liaison supervisors bridging Hindi-Kannada shop-floor coordination',
    ],
    shiftsAvailable: ['Shift A', 'Shift B', 'Shift C'],
    suitableIndustries: ['Auto Assembly', 'Bottling & Packaging', 'Carton Making', 'Foundries'],
    complianceGuarantee: 'Medical fitness certs & Aadhaar identity verification for 100% staff.',
    badge: 'Verified Skills',
  },
  {
    id: 'assembly-line-warehouse',
    title: 'Manpower for Assembly Line & Material Handling',
    category: 'Specialized Line',
    shortDesc: 'Precision workers trained for high-speed conveyor belts, parts kitting, and warehouse order dispatch.',
    fullDesc: 'Engineered for lean manufacturing environments. Our assembly line crews assist in sub-assembly fitment, parts feeding, finished goods sorting, palletizing, and dock staging for fast-paced logistics distribution centers.',
    features: [
      'Experience with fast cycle-times on automotive conveyor systems',
      'Heavy lifting capability and ergonomic handling training',
      'Dock loading & unloading with strict adherence to break-free handling',
      'Supervised handover to client shop-floor line engineers',
    ],
    shiftsAvailable: ['All Shifts', 'Continuous Line Overlap'],
    suitableIndustries: ['Two-Wheeler Plants', 'Beverage Canning', 'Warehouse Fulfillment'],
    complianceGuarantee: 'Heavy engineering safety protocol compliance with zero lost-time accident goals.',
    badge: 'Line Ready',
  },
  {
    id: 'housekeeping-utility',
    title: 'Housekeeping & Utility Staff for Factory Premises',
    category: 'Support & Logistics',
    shortDesc: 'Industrial sanitation, shop-floor clean-up, scrap removal, and premises maintenance teams.',
    fullDesc: 'Clean factory environments are mandatory for 5S, ISO audits, and worker safety. Beereshwar provides dedicated utility crews for industrial floor sweeping, coolant spill wiping, metal scrap segregation, and plant hygiene.',
    features: [
      '5S-trained personnel familiar with industrial cleaning equipment',
      'Proper handling of non-hazardous shop-floor scrap and recyclables',
      'Restroom, cafeteria, and shop-floor utility maintenance schedules',
      'Dedicated supervisor monitoring chemical and water conservation',
    ],
    shiftsAvailable: ['Pre-Shift (05:00 - 09:00)', 'Post-Shift', 'Full Day Utility'],
    suitableIndustries: ['Cleanroom Packaging', 'FMCG Plants', 'Engineering Workshops'],
    complianceGuarantee: 'Sanitation standard operating procedures aligned with client EHS standards.',
    badge: 'Factory Hygiene',
  },
  {
    id: 'shift-wise-manpower',
    title: 'Shift-Wise 24/7 Industrial Manpower',
    category: 'Core Supply',
    shortDesc: 'Guaranteed headcount for morning, afternoon, and nocturnal shifts without midnight dropouts.',
    fullDesc: 'Round-the-clock shift staffing where consistency is critical. Our North Indian teams live in organized accommodation clusters near Tandavpura and Nanjangud, enabling reliable transport even for 22:00 night shift turnarounds.',
    features: [
      'Strict shift rotation rosters planned 14 days in advance',
      'Dedicated company-arranged van transit for nocturnal shifts',
      'Zero midnight attendance deficit with reserve hot-seat replacements',
      'Supervisor present across shift handovers for attendance punch sync',
    ],
    shiftsAvailable: ['24/7 Shift Coverage (A / B / C rotations)'],
    suitableIndustries: ['Continuous Chemical / Beverage / Auto Manufacturing'],
    complianceGuarantee: 'Statutory night-shift allowances and safety welfare provisions verified.',
    badge: '24/7 Reliable',
  },
  {
    id: 'short-term-project',
    title: 'Short-Term Project & Seasonal Surge Manpower',
    category: 'Specialized Line',
    shortDesc: 'Ramp-up teams for plant annual maintenance, factory expansions, product launches, and seasonal peaks.',
    fullDesc: 'When plants execute machine overhauls, festive production surges (Diwali, summer beverage spikes), or factory line commissioning, Beereshwar supplies 20 to 150+ workers on rapid notice for periods ranging from 15 days to 6 months.',
    features: [
      'Elastic ramp-up: Onboard 50+ workers within 48 to 72 hours',
      'Pre-screened candidates accustomed to high-tempo overtime operations',
      'Controlled demobilization with zero legal entanglement or retention burdens',
      'Turnkey supervisor support to oversee project-specific timelines',
    ],
    shiftsAvailable: ['Project Driven', 'Overtime Extended Shifts'],
    suitableIndustries: ['Beverage Summer Peaks', 'Auto Festive Surges', 'Plant Overhauls'],
    complianceGuarantee: 'Project-specific contract registrations and end-of-term NOC issuance.',
    badge: 'Elastic Scale',
  }
];

export const SEO_KEYWORDS = [
  "manpower supply in Mysore",
  "labour contractors in Mysuru",
  "industrial manpower suppliers Hebbal",
  "manpower suppliers Hootagalli",
  "contract labour Nanjangud",
  "daily wage labour from North India in Mysore",
  "contract labour for TVS and motorcycle plants in Mysuru",
  "factory workers Tandavpura Mysore",
  "industrial labour contractor Kadakola",
  "packaging helpers FMCG Mysore"
];
