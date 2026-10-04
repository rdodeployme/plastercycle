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
];

export const factById = (id: string) => FACTS.find((f) => f.id === id);
