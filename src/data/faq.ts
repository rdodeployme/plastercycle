/** Every question on the site, in one place, so the FAQ page and its structured data stay in step. Answers are plain text for JSON-LD; `html` adds links for the page. */
export type QA = { q: string; a: string; html?: string; group: string };

export const FAQ: QA[] = [
  // The service
  { group: 'The service', q: 'Who is the bin for?', a: 'Council transfer stations and resource recovery centres first, plus depots and building sites that produce a lot of plasterboard offcuts.' },
  { group: 'The service', q: 'How does it work?', a: 'We drop an enclosed hook-lift bin, you fill it through the side panels with plasterboard only, and when it’s full we collect it and bring an empty one. The board is processed back into gypsum and paper.' },
  { group: 'The service', q: 'What does it cost?', a: 'It depends on where you are and how quickly the bin fills. Tell us about your site and we’ll quote. Our calculator shows the landfill levy the board no longer attracts, so you can compare like with like.' },
  { group: 'The service', q: 'How do we tell you it’s full?', a: 'Get in touch and we’ll book the collection. If you fill bins regularly, we can talk about a set schedule.', html: 'Get in touch and we’ll book the collection. If you fill bins regularly, we can talk about a set schedule. <a href="BOOK">Start here</a>.' },
  { group: 'The service', q: 'Can we run a trial first?', a: 'Ask us. Tell us about your site and how much board you see, and we’ll work out a sensible starting point.' },
  // The bin
  { group: 'The bin', q: 'How big is it?', a: '6,300 mm long, 2,450 mm wide and 2,400 mm high — about 37 cubic metres overall. The loading opening starts about a metre off the ground.' },
  { group: 'The bin', q: 'How much space does it need?', a: 'The bin’s own footprint plus clear, firm ground in front of the hook end so a hook-lift truck can reverse up, drop it and pick it up. We’ll talk through access with you before the first drop.' },
  { group: 'The bin', q: 'Why is it enclosed?', a: 'Rain makes plasterboard heavier to haul, and an open skip fills with other people’s rubbish. A roof, a solid door and panels that shut keep the load as plasterboard until it’s tipped.' },
  { group: 'The bin', q: 'Do we need to break the sheets up?', a: 'No. Slide sheets in whole if they fit through the opening, or break them up. Broken board packs tighter, so each load holds more.' },
  { group: 'The bin', q: 'How much does a full bin weigh?', a: 'Our estimate is 6 to 8 tonnes, based on the typical density of loose plasterboard. Real loads are weighed.' },
  // What goes in
  { group: 'What goes in', q: 'What can go in the bin?', a: 'Plasterboard offcuts and part sheets, damaged or surplus whole sheets, standard, fire-rated and moisture-resistant board, and plaster cornice. Clean, separated board is what makes it recyclable.' },
  { group: 'What goes in', q: 'What must stay out?', a: 'Fibro or anything that might contain asbestos, foil-backed and insulation-bonded board, board with lead paint, tiles, timber, metal, insulation batts, plastic wrap, concrete, bricks, soil, general rubbish, liquids, paint tins and hazardous waste.' },
  { group: 'What goes in', q: 'How do I tell plasterboard from fibro?', a: 'Plasterboard has a paper face on both sides and a chalky core at the edges. Fibro is a thin, hard, cement-like sheet with no paper, often dimpled on the back. If you’re not sure, it stays out — don’t cut or snap a sheet to check.', html: 'Plasterboard has a paper face on both sides and a chalky core at the edges. Fibro is a thin, hard, cement-like sheet with no paper, often dimpled on the back. If you’re not sure, it stays out — don’t cut or snap a sheet to check. <a href="WHATGOESIN">The identification guide</a>.' },
  { group: 'What goes in', q: 'Can the public use it?', a: 'Yes, at a staffed transfer station. Someone should check loads at the gate, because older fibro sheeting can look like plasterboard and must never go in.' },
  // Where it goes
  { group: 'Where it goes', q: 'What happens to the plasterboard?', a: 'It is processed to separate the paper liner from the gypsum core. The gypsum is ground to a powder and used in new plasterboard, in cement and concrete, and as a soil conditioner. The paper is recycled.' },
  { group: 'Where it goes', q: 'Why not just landfill it?', a: 'Buried with biodegradable waste, gypsum can produce hydrogen sulphide, a toxic gas. It also wastes a mineral that can be recycled again and again. And every tonne landfilled attracts the state levy.' },
  // The levy
  { group: 'The levy', q: 'Does the landfill levy really apply to plasterboard?', a: 'Yes. Plasterboard sent to landfill is charged the levy by the tonne like any other waste. When a transfer station sends it on, it’s classed as industrial waste.' },
  { group: 'The levy', q: 'Where do the levy figures come from?', a: 'From each state’s environment regulator: EPA Victoria, NSW EPA, the Queensland Government, EPA South Australia, the WA Government’s rate schedule and NRE Tasmania. They’re listed with links on the levy page and the facts page.', html: 'From each state’s environment regulator. They’re listed with links on <a href="LEVY">the levy page</a> and <a href="FACTS">the facts page</a>.' },
  { group: 'The levy', q: 'We’re not in Victoria. Does this still work?', a: 'Every state except the territories has a levy, and every landfill has a gate fee. Pick your state in the calculator, add your gate fee, and the maths is the same.' },
];
