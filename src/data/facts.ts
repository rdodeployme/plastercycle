/**
 * Every figure the site uses, with where it came from.
 * `kind`: 'reported' = stated by the source; 'derived' = our arithmetic on reported figures.
 * Pages link to /facts/#<id>. Checked October 2026.
 */
export type Fact = {
  id: string;
  title: string;
  statement: string;
  kind: 'reported' | 'derived';
  sources: { name: string; url: string }[];
};

export const LEVY = {
  feeUnit2026: 17.27,
  metroUnits: 10.26,
  ruralIndustrialUnits: 9.03,
  metro2025: 169.79,
};
export const LEVY_METRO = Math.round(LEVY.metroUnits * LEVY.feeUnit2026 * 100) / 100; // 177.19
export const LEVY_RURAL = Math.round(LEVY.ruralIndustrialUnits * LEVY.feeUnit2026 * 100) / 100; // 155.95

export const FACTS: Fact[] = [
  {
    id: 'produced',
    title: 'Plasterboard made in Australia',
    statement: 'Around 1 million tonnes of plasterboard is produced in Australia every year.',
    kind: 'reported',
    sources: [
      { name: 'ReGyp — Plasterboard recycling in Australia', url: 'https://regyp.com.au/plasterboard-recycling/' },
      { name: 'EcoGypsum — FAQs', url: 'https://ecogypsum.com.au/faqs/' },
    ],
  },
  {
    id: 'landfilled',
    title: 'Construction plasterboard sent to landfill',
    statement:
      'The Gypsum Board Manufacturers Association of Australia estimates more than 100,000 tonnes of plasterboard waste from construction is landfilled every year. Board removed in renovation and demolition is on top of this.',
    kind: 'reported',
    sources: [{ name: 'ReGyp — Why recycle (citing the GBMA)', url: 'https://regyp.com.au/why-recycle/' }],
  },
  {
    id: 'waste-factor',
    title: 'How much board becomes waste on site',
    statement: 'Builders’ rule of thumb: 5–20% of the plasterboard ordered for a job ends up as waste.',
    kind: 'reported',
    sources: [
      {
        name: 'City of Parramatta — Waste Management Plan template',
        url: 'https://apps.planningportal.nsw.gov.au/prweb/PRRestService/DocMgmt/v1/PublicDocuments/DATA-WORKATTACH-FILE%20PEC-DPE-EP-WORK%20PAN-524858!20250403T003216.705%20GMT',
      },
    ],
  },
  {
    id: 'albury',
    title: 'One regional example',
    statement:
      'Albury and Federation councils estimated around 1,000 tonnes a year of plasterboard offcuts from local builders was going to landfill.',
    kind: 'reported',
    sources: [
      { name: 'AlburyCity — Building waste into farmers’ gold (Dec 2021)', url: 'https://alburycity.nsw.gov.au/news/2021/dec/building-waste-into-farmers-gold' },
    ],
  },
  {
    id: 'harbour-bridge',
    title: 'The comparison',
    statement:
      'The Sydney Harbour Bridge’s steelwork weighs 52,800 tonnes. 100,000 tonnes of plasterboard is about 1.9 times that, every year.',
    kind: 'derived',
    sources: [{ name: 'Sydney Harbour Bridge — Wikipedia', url: 'https://en.wikipedia.org/wiki/Sydney_Harbour_Bridge' }],
  },
  {
    id: 'composition',
    title: 'What plasterboard is made of',
    statement:
      'Gypsum (calcium sulphate dihydrate) makes up around 94% of plasterboard. Most of the rest is the paper liner, around 6%.',
    kind: 'reported',
    sources: [
      { name: 'News of the Area — Aus Blue Bins Midcoast (Mar 2024)', url: 'https://newsofthearea.com.au/?p=134259' },
      { name: '1300Rubbish — Gyprock recycling', url: 'https://www.1300rubbish.com.au/services/gyprock-recycling/' },
    ],
  },
  {
    id: 'hard-boards',
    title: 'Boards that can’t easily be recycled',
    statement: 'Foil-backed and insulation-bonded plasterboard are difficult to recycle with current technology.',
    kind: 'reported',
    sources: [
      { name: 'NI Business Info — Recycling plasterboard and gypsum', url: 'https://www.nibusinessinfo.co.uk/content/recycling-plasterboard-and-gypsum-construction-projects' },
    ],
  },
  {
    id: 'types',
    title: 'Board types that can be recycled',
    statement:
      'Most plasterboard can be recycled, including standard, fire-rated and moisture-resistant types, as long as it is clean and kept separate. Recyclers do not accept board containing asbestos or lead paint.',
    kind: 'reported',
    sources: [{ name: 'EcoGypsum — FAQs', url: 'https://ecogypsum.com.au/faqs/' }],
  },
  {
    id: 'fibro',
    title: 'Fibro and asbestos',
    statement: 'Fibro products made before 1987 contained around 15% asbestos.',
    kind: 'reported',
    sources: [{ name: 'Recycling Near You — Asbestos', url: 'https://recyclingnearyou.com.au/asbestos/' }],
  },
  {
    id: 'h2s',
    title: 'Why gypsum and landfill don’t mix',
    statement:
      'Gypsum buried with biodegradable waste can produce hydrogen sulphide, a toxic, foul-smelling gas. Under EU rules, gypsum-based waste may only go into landfill cells that take no biodegradable waste.',
    kind: 'reported',
    sources: [
      {
        name: 'SEPA — Disposal of gypsum wastes in non-hazardous landfills',
        url: 'https://beta.sepa.scot/media/ymzowi3i/ind-lf-g-005-the-disposal-of-waste-of-gypsum-wastes-in-non-hazardous-waste-landfills.docx',
      },
    ],
  },
  {
    id: 'uses',
    title: 'What recycled gypsum becomes',
    statement:
      'Gypsum recovered from plasterboard is used to make new plasterboard, in cement and concrete manufacture, and as a soil conditioner. Regulators advise against using it as animal bedding.',
    kind: 'reported',
    sources: [
      { name: 'SEPA — End-of-waste criteria for gypsum from waste plasterboard', url: 'https://beta.sepa.scot/media/e0fjcfgk/was-g-def-09-gypsum-from-waste-plasterboard.docx' },
      { name: 'Roy Hatfield — Plasterboard recycling', url: 'https://royhatfield.com/what-we-do/recycling/cost-effective-plasterboard-recyling/' },
    ],
  },
  {
    id: 'recycled-content',
    title: 'Recycled gypsum in new board',
    statement:
      'Gyprock HD, made in Australia, is formulated with 10% recycled content. In France, Placo is working towards using up to 30% recycled material in its plasterboard.',
    kind: 'reported',
    sources: [
      { name: 'Architecture & Design — Gyprock HD', url: 'https://architectureanddesign.com.au/editorial/product-news/CSR-Gyprock-adds-new-speciality-plasterboard' },
      { name: 'Global Gypsum — Placo and Serfim Recyclage', url: 'https://globalgypsum.com/news/1945-placo-and-serfim-recyclage-promotes-plaster-recycling-plant-at-quincy-voisins' },
    ],
  },
  {
    id: 'soil',
    title: 'Gypsum on farms',
    statement: 'Gypsum is used in agriculture to break up and improve clay soils.',
    kind: 'reported',
    sources: [
      { name: 'Border Mail — Waste plaster to be recycled for farmers', url: 'https://www.bordermail.com.au/story/7689604/waste-plaster-from-border-builders-to-be-recycled-for-farmers' },
      { name: 'EcoGypsum — FAQs', url: 'https://ecogypsum.com.au/faqs/' },
    ],
  },
  {
    id: 'levy',
    title: 'Victoria’s landfill levy',
    statement: `For 2026–27 the Victorian waste levy is 10.26 fee units a tonne in metropolitan areas and 9.03 fee units a tonne for rural industrial waste. A fee unit is $${LEVY.feeUnit2026} for 2026–27, so that is about $${LEVY_METRO.toFixed(2)} and $${LEVY_RURAL.toFixed(2)} a tonne. In 2025–26 the metropolitan rate was $${LEVY.metro2025}. Waste a transfer station sends on to landfill is classed as industrial waste.`,
    kind: 'derived',
    sources: [
      { name: 'EPA Victoria — Waste levy', url: 'https://www.epa.vic.gov.au/node/43639' },
      { name: 'Victorian Government — Fee unit value from 1 July 2026', url: 'https://www.vic.gov.au/notice-under-section-6-fixing-value-fee-unit-and-penalty-unit-5' },
    ],
  },
  {
    id: 'density',
    title: 'How much a load of plasterboard weighs',
    statement:
      'An 8 m³ skip of unchipped plasterboard weighs about 1.6 tonnes (about 0.2 t/m³); chipped, about 2.1 tonnes. On that basis a full Plastercycle bin holds roughly 6–8 tonnes. This is an estimate — real loads will be weighed.',
    kind: 'derived',
    sources: [{ name: 'Starke Arvid — Plasterboard chipper product sheet', url: 'https://sitebox.ltd.uk/docs/starkearvid_37000/Plasterboard%20Chipper.pdf' }],
  },
  {
    id: 'levy-states',
    title: 'Landfill levies around Australia, 2026–27',
    statement:
      'Per tonne: Victoria $177.19 metro ($155.95 rural industrial, $88.42 rural municipal); NSW $180.20 in the metropolitan levy area and $103.80 regional; Queensland $135 metro and $100 regional (general waste); South Australia $171 metro and $85.50 non-metro; Western Australia $90 in the Perth metropolitan region (published schedule; $88 prescribed for 2025–26); Tasmania $70.56 statewide. The ACT and Northern Territory have no state levy, though landfill gate fees still apply.',
    kind: 'reported',
    sources: [
      { name: 'EPA Victoria — Waste levy', url: 'https://www.epa.vic.gov.au/node/43639' },
      { name: 'NSW EPA — Waste levy areas and levy rates', url: 'https://www.epa.nsw.gov.au/Your-environment/Waste/waste-levy/levy-regulated-area-and-levy-rates' },
      { name: 'Queensland Government — Waste levy rates', url: 'https://www.qld.gov.au/environment/circular-economy-waste-reduction/disposal-levy/about/levy-rates' },
      { name: 'EPA South Australia — Waste levy', url: 'https://www.epa.sa.gov.au/business_and_industry/waste-levy' },
      { name: 'WA Government — Waste levy rate schedule', url: 'https://www.wa.gov.au/service/environment/environment-information-services/waste-levy-rate-schedule' },
      { name: 'NRE Tasmania — The landfill levy', url: 'https://nre.tas.gov.au/environment/waste-and-resource-recovery/landfill-levy' },
    ],
  },
  {
    id: 'levy-history',
    title: 'How Victoria’s levy has climbed',
    statement:
      'The Victorian landfill levy started at $3 a tonne in 1992. It was $9 in 2009–10 and rose to $30 in 2010–11. It was $65.90 in 2019–20, $105.90 in 2021–22, $125.90 in 2022–23, $129.27 in 2023–24, $132.76 in 2024–25, $169.79 in 2025–26 and is $177.19 in 2026–27 (metropolitan municipal and industrial waste).',
    kind: 'reported',
    sources: [
      { name: 'Environment Victoria — New landfill levies (2010)', url: 'https://www.sustainabilitymatters.net.au/content/waste/news/new-landfill-levies-will-boost-recycling-and-ease-landfill-burden-48148413' },
      { name: 'VLGA — Landfill levy rate rises deferred (2020)', url: 'https://www.vlga.org.au/sites/default/files/LANDFILL%20LEVY%20RATE%20RISES%20DEFERRED.pdf' },
      { name: 'Cleanaway — The Victorian waste levy 2025', url: 'https://www.cleanaway.com.au/sustainable-future/vic-levy-ready25' },
      { name: 'EPA Victoria — Waste levy', url: 'https://www.epa.vic.gov.au/node/43639' },
    ],
  },
  {
    id: 'sheet-weight',
    title: 'What a sheet weighs',
    statement:
      'A 10 mm lightweight board is about 5.9 kg/m²; plasterboard generally runs 600–1,000 kg/m³, so 10 mm board is roughly 6–10 kg/m². We use 6.5 kg/m² as a working figure, so a standard 2,400 × 1,200 mm sheet (2.88 m²) is about 19 kg.',
    kind: 'derived',
    sources: [
      { name: 'One Click LCA — Knauf Sheetrock One 10 mm (5.9 kg/m²)', url: 'https://materials.oneclicklca.com/en/material/gypsum-plasterboard/6740c6aa196fd92820d1bd3f' },
      { name: 'British Gypsum — plasterboard density 600–1,000 kg/m³', url: 'https://www.british-gypsum.com/technical-support/self-help-tools/faqs/what-density-gyproc-plasterboards' },
    ],
  },
  {
    id: 'line-of-bins',
    title: 'A year of plasterboard, in bins',
    statement:
      'At about 7 tonnes a bin, 100,000 tonnes is roughly 14,300 bin loads. Parked end to end at 6.3 m each, that is about 90 km of bins — further than the 70 km from Melbourne to Geelong.',
    kind: 'derived',
    sources: [
      { name: 'CSIRO — Geelong is 70 km south-west of Melbourne', url: 'https://www.csiro.au/en/about/facilities-collections/acdp/about-acdp/visitor-information' },
      { name: 'Starke Arvid — plasterboard chipper product sheet (density basis)', url: 'https://sitebox.ltd.uk/docs/starkearvid_37000/Plasterboard%20Chipper.pdf' },
    ],
  },
  {
    id: 'mcg',
    title: 'A year of plasterboard, on the MCG',
    statement:
      'Stacked as sheets at about 700 kg/m³, 100,000 tonnes is roughly 143,000 m³. The MCG playing field is about 174 × 149 m, so around 20,000 m² — enough to bury the entire field about 7 m deep in plasterboard.',
    kind: 'derived',
    sources: [
      { name: 'Melbourne Cricket Ground — Wikipedia (field 174 m × 149 m)', url: 'https://en.wikipedia.org/wiki/Melbourne_Cricket_Ground' },
      { name: 'British Gypsum — plasterboard density 600–1,000 kg/m³', url: 'https://www.british-gypsum.com/technical-support/self-help-tools/faqs/what-density-gyproc-plasterboards' },
    ],
  },
  {
    id: 'gypsum-cycle',
    title: 'Why gypsum can be recycled again and again',
    statement:
      'Gypsum is calcium sulphate dihydrate (CaSO₄·2H₂O). Heating drives off most of the water to make plaster; adding water back sets it hard again. Because the reaction is reversible, recovered gypsum can go round the loop repeatedly.',
    kind: 'reported',
    sources: [
      { name: 'Life cycle energy and material flow implications of gypsum plasterboard recycling in the EU', url: 'https://eta-publications.lbl.gov/publications/life-cycle-energy-and-material-flow' },
    ],
  },
];

export const factById = (id: string) => FACTS.find((f) => f.id === id);
