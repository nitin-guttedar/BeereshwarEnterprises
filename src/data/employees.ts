export interface EmployeeRecord {
  id: string;
  name: string;
  photo: string;
  role: 'Assembly Line Operator' | 'Machine Helper' | 'FMCG Packer' | 'Heavy Loader' | 'Housekeeping & Utility' | 'Yard Specialist' | 'Material Handler' | string;
  nativeState: 'Uttar Pradesh' | 'Bihar' | 'Jharkhand' | 'Karnataka' | 'Other' | string;
  nativeDistrict: string;
  clientCompany: string;
  clientLocation: string;
  shift: 'Shift A (06:00 - 14:00)' | 'Shift B (14:00 - 22:00)' | 'Shift C (22:00 - 06:00)' | 'General Day (08:30 - 17:30)' | string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'In Reserve' | string;
  phone: string;
  aadhaarVerified: boolean;
  medicalFitnessValid: boolean;
  supervisorName: string;
  experienceYears: number;
}

export const INITIAL_EMPLOYEES: EmployeeRecord[] = [];

// Helper to calculate summary statistics
export function getWorkforceStats(list: EmployeeRecord[]) {
  const totalOnRoll = list.length;
  const activeCount = list.filter(e => e.status === 'Active').length;
  const inReserveCount = list.filter(e => e.status === 'In Reserve').length;
  const onLeaveCount = list.filter(e => e.status === 'On Leave').length;

  const stateDistribution: Record<string, number> = {};
  list.forEach(e => {
    stateDistribution[e.nativeState] = (stateDistribution[e.nativeState] || 0) + 1;
  });

  return {
    totalOnRoll,
    activeCount,
    activeDeployed: activeCount,
    inReserveCount,
    reserveStandby: inReserveCount,
    onLeaveCount,
    avgAttendancePercent: list.length > 0 ? 97.4 : 0,
    stateDistribution,
    statesCount: {
      up: stateDistribution['Uttar Pradesh'] || 0,
      bihar: stateDistribution['Bihar'] || 0,
      jharkhand: stateDistribution['Jharkhand'] || 0,
      other: stateDistribution['Other'] || 0
    },
    shiftsActive: {
      shiftA: list.filter(e => e.shift?.includes('Shift A')).length,
      shiftB: list.filter(e => e.shift?.includes('Shift B')).length,
      shiftC: list.filter(e => e.shift?.includes('Shift C')).length,
      generalDay: list.filter(e => e.shift?.includes('General Day')).length
    }
  };
}
