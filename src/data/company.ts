export interface StatutoryLicence {
  title: string;
  codeOrNumber: string;
  regDate?: string;
  validUpto?: string;
  authority: string;
  details: string;
  status: 'Active & Verified' | 'Current';
}

export const COMPANY_DETAILS = {
  tradeName: 'Shree Beereshwara Enterprises',
  shortName: 'SBE',
  tagline: 'Professional Manpower. Reliable Service. Total Compliance.',
  subTagline: 'Your Trusted Partner for Industrial Manpower & Facility Services',
  legacyText: 'Malaiah Since : 1999',
  proprietor: 'Mr. Pavan Malaiah',
  establishedYear: 2020,
  legacyYear: 1999,
  gstin: '29EYOPM9514F1ZT',
  constitution: 'Proprietorship',
  liabilityDate: '05-01-2021',
  phones: ['+91 77607 09689', '+91 72592 93127'],
  primaryPhone: '+91 77607 09689',
  secondaryPhone: '+91 72592 93127',
  email: 'shreebeereshwaraent2020@gmail.com',
  address: {
    street: 'Kanakadasara Main Road, Near Ganesha Temple',
    village: 'Thandavpura Village & Post',
    taluk: 'Nanjangud Taluk',
    district: 'Mysuru District – 571302',
    state: 'Karnataka, India',
    full: 'Kanakadasara Main Road, Near Ganesha Temple, Thandavpura Village & Post, Nanjangud Taluk, Mysuru District – 571302, Karnataka, India'
  },
  licences: [
    {
      title: 'Goods & Services Tax (GST)',
      codeOrNumber: '29EYOPM9514F1ZT',
      authority: 'Government of India / Commercial Taxes Karnataka',
      regDate: '05-01-2021',
      details: 'Legal Name: Pavan Malaiah | Trade Name: Shree Beereshwara Enterprises',
      status: 'Active & Verified',
    },
    {
      title: "Employees' Provident Fund (EPFO)",
      codeOrNumber: 'KNMYS2236226000',
      authority: "Employees' Provident Fund Organisation",
      regDate: '01-11-2020',
      details: 'Section: 1(3)(b) | Application No: 10000514728',
      status: 'Active & Verified',
    },
    {
      title: "Employees' State Insurance (ESIC)",
      codeOrNumber: 'Section 1(5) Registered',
      authority: 'ESIC Sub-Regional Office Mysore – 570007',
      details: '150+ Employees Covered under ESI Act, 1948',
      status: 'Active & Verified',
    },
    {
      title: 'Karnataka Contract Labour Licence',
      codeOrNumber: 'ALC-MY/CL/AC-13023173/2023-24',
      validUpto: '01-05-2026',
      authority: 'Assistant Labour Commissioner, Mysore Division',
      details: 'Reg No: ALC-MY/CL/AP-11214486/2023-24 | Authorised: Loading, Unloading Helpers, Housekeeping & Industrial Manpower',
      status: 'Current',
    }
  ] as StatutoryLicence[],
  commercialTerms: [
    'Monthly Billing raised based on agreed man-days & client approved muster rolls',
    'Statutory PF & ESI charged strictly as per prevailing statutory percentages',
    'Salary Disbursement executed directly to worker bank accounts between 7th and 10th of every month',
    'Workers replaced at zero additional cost if found unsatisfactory',
    'Strict client confidentiality maintained across all shop-floor operations',
    'Form V and monthly challan proof submitted alongside every billing cycle'
  ]
};
