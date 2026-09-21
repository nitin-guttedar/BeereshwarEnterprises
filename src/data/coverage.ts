export interface LocationCluster {
  id: string;
  name: string;
  distanceKm: number;
  direction: string;
  x: number; // percentage in radar
  y: number; // percentage in radar
  primaryIndustries: string[];
  activeHeadcount: number;
  dispatchTime: string;
  keyClientsSummary: string;
  description: string;
}

export const COVERAGE_HUBS: LocationCluster[] = [
  {
    id: 'tandavpura',
    name: 'Thandavpura (Central Ops Base)',
    distanceKm: 15,
    direction: 'South',
    x: 52,
    y: 58,
    primaryIndustries: ['Beverage & FMCG', 'Food Processing', 'Agro-Industrial'],
    activeHeadcount: 110,
    dispatchTime: '< 30 Minutes',
    keyClientsSummary: 'Hector Beverages (Paperboat), Agro Processors',
    description: 'Our primary workforce residential quarters and administrative depot. Instant mobilization point for immediate shifts.',
  },
  {
    id: 'nanjangud',
    name: 'Nanjangud Industrial Cluster',
    distanceKm: 23,
    direction: 'South',
    x: 54,
    y: 72,
    primaryIndustries: ['Beverage Bottling', 'Pharma Ancillaries', 'Heavy FMCG'],
    activeHeadcount: 135,
    dispatchTime: '< 45 Minutes',
    keyClientsSummary: 'South Bottlers (Coca-Cola partner), Consumer Goods',
    description: 'Major southern manufacturing hub. We supply continuous tri-shift line operators and heavy loaders.',
  },
  {
    id: 'kadakola',
    name: 'Kadakola Industrial Belt',
    distanceKm: 18,
    direction: 'South-South-West',
    x: 44,
    y: 64,
    primaryIndustries: ['Automotive & Two-Wheeler', 'Assembly Plants', 'Machine Shops'],
    activeHeadcount: 155,
    dispatchTime: '< 35 Minutes',
    keyClientsSummary: 'TVS Motor Supplier assembly lines, Ancillaries',
    description: 'Automotive heart of Mysore. Our workers handle fast assembly cycle times, loading docks, and finished vehicle yards.',
  },
  {
    id: 'hebbal',
    name: 'Hebbal Industrial Estate',
    distanceKm: 9,
    direction: 'North-West',
    x: 36,
    y: 38,
    primaryIndustries: ['Auto Components', 'Electronics Spares', 'Tooling'],
    activeHeadcount: 70,
    dispatchTime: '< 25 Minutes',
    keyClientsSummary: 'Precision engineering units, Machine helpers',
    description: 'Dense manufacturing sector with semi-skilled machine operators and parts sorting personnel.',
  },
  {
    id: 'hootagalli',
    name: 'Hootagalli Industrial Suburb',
    distanceKm: 14,
    direction: 'West',
    x: 28,
    y: 48,
    primaryIndustries: ['Warehousing & Logistics', 'Packaging Lines', 'Distribution'],
    activeHeadcount: 65,
    dispatchTime: '< 35 Minutes',
    keyClientsSummary: 'LogiHub South, FMCG storage terminals',
    description: 'High-velocity material handling, pallet stacking, container destuffing, and 24/7 dock management.',
  },
  {
    id: 'metagalli',
    name: 'Metagalli Industrial Area',
    distanceKm: 6,
    direction: 'North',
    x: 50,
    y: 36,
    primaryIndustries: ['Foundry & Forging', 'Line Operations', 'Utilities'],
    activeHeadcount: 48,
    dispatchTime: '< 20 Minutes',
    keyClientsSummary: 'Metagalli Precision Spares, Line assembly',
    description: 'Immediate city-fringe location with dedicated housekeeping and assembly line helper teams.',
  },
  {
    id: 'mandya',
    name: 'Mandya Highway Corridor',
    distanceKm: 45,
    direction: 'North-East',
    x: 75,
    y: 28,
    primaryIndustries: ['Sugar & Agro-Allied', 'Distilleries', 'Carton Packaging'],
    activeHeadcount: 35,
    dispatchTime: '< 90 Minutes',
    keyClientsSummary: 'Sugar processing & bulk logistics units',
    description: 'Servicing northern expansion zones along the Mysore-Bangalore expressway corridor.',
  },
  {
    id: 'chamarajanagar',
    name: 'Chamarajanagar Industrial Zone',
    distanceKm: 60,
    direction: 'South-East',
    x: 82,
    y: 82,
    primaryIndustries: ['Granite & Stone', 'Textiles', 'General Manufacturing'],
    activeHeadcount: 40,
    dispatchTime: '< 2 Hours',
    keyClientsSummary: 'Export-oriented processing units',
    description: 'Daily transportation coordinated from our Thandavpura hub with dedicated supervisor escort.',
  }
];
