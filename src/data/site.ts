/** Prefix internal paths with the deploy base (GitHub Pages serves the site under /<repo>/). */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (p: string) => (p.startsWith('/') ? BASE + p : p);

/** Enquiries: the form opens the visitor's email app addressed here. */
export const ENQUIRY_EMAIL = 'nigel@recycle.au';

/** Site contact (Richard call, 5 Oct 2026). Shown in the footer and on the Book a bin page. */
export const CONTACT = {
  name: 'Nigel Taylor',
  role: 'CEO, Recycle',
  email: ENQUIRY_EMAIL,
  phone: '0427 888 222',
  tel: '+61427888222',
};

export const SITE = {
  name: 'Plastercycle',
  domain: 'plastercycle.com',
  tagline: 'Plasterboard recycling',
  description:
    'Plastercycle drops an enclosed, weatherproof bin at councils, transfer stations and building sites, collects it on a hook-lift truck and sends the plasterboard to be recycled into gypsum.',
};

/** Richard Furnari's statement (Richard call, 5 Oct 2026). Shown on the home page after the "Put a bin where the plasterboard turns up" band. */
export const STATEMENT = {
  quote: 'Landfill transfers the problem of waste from one location to another, from one point in time to another, and ultimately from one generation to the next. Recycling transforms it.',
  highlight: 'Recycling transforms it.',
  by: 'Richard Furnari',
};

export const NAV = [
  { href: '/how-it-works/', label: 'How it works' },
  { href: '/the-bin/', label: 'The bin' },
  { href: '/councils/', label: 'Councils' },
  { href: '/builders/', label: 'Builders' },
  { href: '/what-goes-in/', label: 'What goes in' },
  { href: '/the-journey/', label: 'The journey' },
  { href: '/resources/', label: 'Resources' },
];

export const FOOTER_EXTRA = [
  { href: '/where-it-goes/', label: 'Where it goes' },
  { href: '/levy/', label: 'The landfill levy' },
  { href: '/faq/', label: 'Questions' },
  { href: '/brand/', label: 'Brand and logo' },
  { href: '/facts/', label: 'Facts and sources' },
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

/** Downloadable resources (built into public/downloads by scripts in /print). */
export const DOWNLOADS = [
  { file: '/downloads/plastercycle-bin-sign-a3.pdf', title: 'Bin sign (A3)', blurb: 'Plasterboard only — what goes in and what stays out. Laminate it and fix it to the bin.', who: 'Transfer stations, sites' },
  { file: '/downloads/plastercycle-gate-guide-a4.pdf', title: 'Gate staff guide (A4)', blurb: 'One page for the person at the gate: how to spot plasterboard, what to turn away, and what to say.', who: 'Transfer stations' },
  { file: '/downloads/plastercycle-site-flyer-a4.pdf', title: 'Site flyer (A4)', blurb: 'For the lunchroom wall: what the blue bin is for and how to use it.', who: 'Builders, sites' },
  { file: '/downloads/plastercycle-for-councils.pdf', title: 'Plastercycle for councils (A4)', blurb: 'A two-page leave-behind: the bin, the levy case and what a trial involves.', who: 'Councils' },
];
