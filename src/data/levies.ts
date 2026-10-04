/**
 * Landfill levies by state for 2026–27, $ per tonne. Checked October 2026.
 * `status`: 'prescribed' = set in regulation; 'anticipated' = published schedule not yet prescribed;
 * 'none' = no state levy (landfill gate fees still apply).
 * Keep in step with facts.ts (fact id 'levy-states').
 */
export type Zone = { id: string; label: string; rate: number; note?: string };
export type StateLevy = {
  code: string; name: string; status: 'prescribed' | 'anticipated' | 'none';
  zones: Zone[]; source: { name: string; url: string }; note?: string;
};

export const LEVIES: StateLevy[] = [
  {
    code: 'VIC', name: 'Victoria', status: 'prescribed',
    zones: [
      { id: 'metro', label: 'Metropolitan and provincial', rate: 177.19 },
      { id: 'rural-ind', label: 'Rural, industrial waste', rate: 155.95, note: 'what a transfer station pays when it sends waste on' },
      { id: 'rural-mun', label: 'Rural, municipal waste', rate: 88.42 },
    ],
    source: { name: 'EPA Victoria — Waste levy (10.26 / 9.03 / 5.12 fee units × $17.27)', url: 'https://www.epa.vic.gov.au/node/43639' },
  },
  {
    code: 'NSW', name: 'New South Wales', status: 'prescribed',
    zones: [
      { id: 'mla', label: 'Metropolitan levy area', rate: 180.20 },
      { id: 'rla', label: 'Regional levy area', rate: 103.80 },
    ],
    source: { name: 'NSW EPA — Waste levy areas and levy rates', url: 'https://www.epa.nsw.gov.au/Your-environment/Waste/waste-levy/levy-regulated-area-and-levy-rates' },
    note: 'Most of regional NSW outside the levy areas has no state levy.',
  },
  {
    code: 'QLD', name: 'Queensland', status: 'prescribed',
    zones: [
      { id: 'metro', label: 'Metropolitan (Level 1)', rate: 135 },
      { id: 'regional', label: 'Regional (Level 2)', rate: 100 },
    ],
    source: { name: 'Queensland Government — Waste levy rates', url: 'https://www.qld.gov.au/environment/circular-economy-waste-reduction/disposal-levy/about/levy-rates' },
    note: 'General waste rate. The levy zone covers 39 of 77 local government areas.',
  },
  {
    code: 'SA', name: 'South Australia', status: 'prescribed',
    zones: [
      { id: 'metro', label: 'Metropolitan Adelaide', rate: 171 },
      { id: 'non-metro', label: 'Non-metropolitan', rate: 85.50 },
    ],
    source: { name: 'EPA South Australia — Waste levy', url: 'https://www.epa.sa.gov.au/business_and_industry/waste-levy' },
  },
  {
    code: 'WA', name: 'Western Australia', status: 'anticipated',
    zones: [{ id: 'metro', label: 'Perth metropolitan region', rate: 90 }],
    source: { name: 'WA Government — Waste levy rate schedule', url: 'https://www.wa.gov.au/service/environment/environment-information-services/waste-levy-rate-schedule' },
    note: '2026–27 rate is the published schedule; $88 is the prescribed 2025–26 rate. Applies to the Perth metropolitan region.',
  },
  {
    code: 'TAS', name: 'Tasmania', status: 'prescribed',
    zones: [{ id: 'state', label: 'Statewide', rate: 70.56 }],
    source: { name: 'NRE Tasmania — The landfill levy (36 fee units from 1 July 2026)', url: 'https://nre.tas.gov.au/environment/waste-and-resource-recovery/landfill-levy' },
  },
  {
    code: 'ACT', name: 'Australian Capital Territory', status: 'none',
    zones: [{ id: 'none', label: 'No state levy — gate fees apply', rate: 0 }],
    source: { name: 'ACT Government — Recycling and waste fees', url: 'https://www.cityservices.act.gov.au/recycling-and-waste/recycling-drop-off-centres/fees' },
  },
  {
    code: 'NT', name: 'Northern Territory', status: 'none',
    zones: [{ id: 'none', label: 'No territory levy — gate fees apply', rate: 0 }],
    source: { name: 'No territory-wide levy; check your facility’s gate fees', url: 'https://nt.gov.au/environment/waste' },
  },
];

/** Victoria metropolitan municipal/industrial levy, $/t — the sourced points only. */
export const VIC_HISTORY: { year: string; rate: number; note?: string }[] = [
  { year: '1992–93', rate: 3, note: 'introduced' },
  { year: '2009–10', rate: 9 },
  { year: '2010–11', rate: 30 },
  { year: '2019–20', rate: 65.90 },
  { year: '2020–21', rate: 85.90, note: 'from 1 Jan 2021; frozen at $65.90 until then' },
  { year: '2021–22', rate: 105.90 },
  { year: '2022–23', rate: 125.90 },
  { year: '2023–24', rate: 129.27 },
  { year: '2024–25', rate: 132.76 },
  { year: '2025–26', rate: 169.79 },
  { year: '2026–27', rate: 177.19 },
];
