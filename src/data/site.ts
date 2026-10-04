/** Prefix internal paths with the deploy base (GitHub Pages serves the site under /<repo>/). */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (p: string) => (p.startsWith('/') ? BASE + p : p);

/** Enquiries: the form opens the visitor's email app addressed here. */
export const ENQUIRY_EMAIL = 'ryan@junk.com.au';

export const SITE = {
  name: 'Plastercycle',
  domain: 'plastercycle.com',
  tagline: 'Plasterboard recycling',
  description:
    'Plastercycle drops an enclosed, weatherproof bin at councils, transfer stations and building sites, collects it on a hook-lift truck and sends the plasterboard to be recycled into gypsum.',
};

export const NAV = [
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/the-bin/', label: 'The bin' },
  { href: '/councils/', label: 'Councils & transfer stations' },
  { href: '/what-goes-in/', label: 'What goes in' },
  { href: '/where-it-goes/', label: 'Where it goes' },
];

export const CTA = { href: '/book/', label: 'Book a bin' };

/** The bin, from the supplied fabrication concept. Millimetres unless stated. */
export const BIN = {
  length: 6300,
  width: 2450,
  height: 2400,
  sill: 1000,
  volume: 37, // m³, overall envelope as stated on the concept drawing
};
