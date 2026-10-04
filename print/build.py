"""Builds the printable PDFs in public/downloads from HTML templates, with fonts and images embedded.
Run from the repo root: python3 print/build.py  (needs playwright + chromium)."""
import base64, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'downloads'; OUT.mkdir(parents=True, exist_ok=True)

def b64(p, mime): return f'data:{mime};base64,' + base64.b64encode((ROOT / p).read_bytes()).decode()
FONTS = {
    'mont': b64('node_modules/@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2', 'font/woff2'),
    'plex': b64('node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2', 'font/woff2'),
    'plex6': b64('node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2', 'font/woff2'),
}
A = {
    'css': f"""
@font-face{{font-family:M;src:url({FONTS['mont']}) format('woff2');font-weight:100 900}}
@font-face{{font-family:P;src:url({FONTS['plex']}) format('woff2');font-weight:400}}
@font-face{{font-family:P;src:url({FONTS['plex6']}) format('woff2');font-weight:600}}
*{{box-sizing:border-box}} html,body{{margin:0;padding:0}}
body{{font-family:P,Arial,sans-serif;color:#1b2333;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
h1,h2,h3{{font-family:M;color:#14316b;letter-spacing:-0.02em;line-height:1.05;margin:0}}
.navy{{color:#14316b}} .blue{{color:#2c66d0}} .green{{color:#5f9e33}} .red{{color:#a3341f}}
.logo svg{{height:100%;width:auto}}
""",
    'logo': (ROOT / 'public/brand/plastercycle-logo-horizontal.svg').read_text(),
    'logo_rev': (ROOT / 'public/brand/plastercycle-logo-horizontal-reverse.svg').read_text(),
    'bin_open': b64('public/images/3d/side-open.webp', 'image/webp'),
    'bin_closed': b64('public/images/3d/side-closed.webp', 'image/webp'),
    'bin_hook': b64('public/images/3d/hook.webp', 'image/webp'),
    'bin_overview': b64('public/images/3d/overview-open.webp', 'image/webp'),
}
EMAIL = 'ryan@junk.com.au'

def page(body, extra_css='', size='A4'):
    return f"""<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><style>{A['css']}
@page {{ size: {size}; margin: 0 }} {extra_css}</style></head><body>{body}</body></html>"""

# ---------- 1. A3 bin sign ----------
sign_css = """
body{width:297mm;height:420mm;background:#2c66d0;color:#fff;padding:16mm;display:grid;grid-template-rows:auto auto 1fr auto;gap:10mm}
.top{display:flex;justify-content:space-between;align-items:center}
.top .logo{height:26mm}
.band{background:#fff;color:#14316b;border-radius:6mm;padding:10mm 12mm}
.band h1{font-size:46pt;color:#14316b}
.band h1 b{color:#2c66d0}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:8mm}
.col{background:#fff;border-radius:6mm;padding:9mm 10mm;color:#1b2333;display:flex;flex-direction:column}
.col h2{font-size:24pt;display:flex;align-items:center;gap:5mm;margin-bottom:5mm}
.col .mark{display:inline-grid;place-items:center;width:14mm;height:14mm;border-radius:50%;color:#fff;font:800 20pt M}
.in .mark{background:#5f9e33} .out .mark{background:#a3341f}
.col ul{margin:0;padding:0;list-style:none;font-size:18pt;line-height:1.35}
.col li{padding:4.2mm 0;border-bottom:1px solid #e3e7ec}
.col li:last-child{border-bottom:0}
.out li:first-child{font-weight:600;color:#a3341f}
.foot{display:flex;justify-content:space-between;align-items:flex-end;font-size:13pt}
.foot strong{font-family:M;font-size:22pt;display:block;margin-bottom:2mm}
.rule{background:#fff;color:#14316b;border-radius:6mm;padding:6mm 12mm;font:800 26pt M;text-align:center}
"""
sign = f"""
<div class="top"><div class="logo">{A['logo_rev']}</div><div style="font:800 20pt M;text-align:right">PLASTERBOARD<br>ONLY</div></div>
<div class="band"><h1>Plasterboard in.<br><b>Everything else out.</b></h1></div>
<div class="cols">
  <div class="col in"><h2><span class="mark">✓</span>Goes in</h2><ul>
    <li>Plasterboard offcuts and part sheets</li><li>Whole sheets, damaged or surplus</li><li>Standard, fire-rated and moisture-resistant board</li><li>Plaster cornice</li><li>Board from walls and ceilings — clean, and you’re sure it isn’t fibro</li></ul>
    <p style="margin:auto 0 0;font-size:13pt;color:#566074">Pull out screws, nails and timber. Shut the panels when you’re done.</p></div>
  <div class="col out"><h2><span class="mark">✕</span>Stays out</h2><ul>
    <li>Fibro, or any sheet that might contain asbestos</li><li>Foil-backed board, insulation-bonded board</li><li>Board with lead paint</li><li>Tiles, timber, metal, insulation batts, plastic wrap</li><li>Concrete, bricks, soil, general rubbish</li><li>Liquids, paint tins, hazardous waste</li></ul>
    <p style="margin:auto 0 0;font-size:13pt;color:#566074">Not sure? It stays out. Ask the gate.</p></div>
</div>
<div class="rule">One sheet of fibro contaminates the whole bin.</div>
<div class="foot"><div><strong>This bin is collected and recycled by Plastercycle.</strong>plastercycle.com · {EMAIL}</div><div style="text-align:right">Recovered gypsum goes into new plasterboard,<br>cement and soil conditioner.</div></div>
"""

# ---------- 2. A4 gate staff guide ----------
gate_css = """
body{width:210mm;height:297mm;padding:14mm 16mm;display:grid;grid-template-rows:auto auto 1fr auto;gap:6mm;background:#fff}
.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2c66d0;padding-bottom:5mm}
.hd .logo{height:16mm}
.hd .tag{font:800 13pt M;color:#2c66d0;text-align:right}
h1{font-size:26pt}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
.box{border:1.5px solid #c5ccd6;border-radius:4mm;padding:6mm 7mm;font-size:10.5pt;line-height:1.4}
.box h2{font-size:14pt;margin-bottom:3mm}
.box ul{margin:0;padding-left:4.5mm} .box li{margin-bottom:1.6mm}
.box.go{border-color:#5f9e33;background:#f3f8ec} .box.stop{border-color:#a3341f;background:#fdf3f1}
.say{background:#14316b;color:#fff;border-radius:4mm;padding:6mm 7mm;font-size:10.5pt}
.say h2{color:#fff;font-size:14pt;margin-bottom:3mm}
.say p{margin:0 0 2.5mm} .say em{color:#8cc54e;font-style:normal;font-weight:600}
.img{display:flex;align-items:center;justify-content:center;background:#f2f4f3;border-radius:4mm;padding:4mm}
.img img{width:100%;height:auto}
.ft{font-size:9.5pt;color:#566074;display:flex;justify-content:space-between;border-top:1px solid #c5ccd6;padding-top:3mm}
"""
gate = f"""
<div class="hd"><div class="logo">{A['logo']}</div><div class="tag">GATE STAFF GUIDE</div></div>
<div><h1>The blue bin takes plasterboard. Only plasterboard.</h1><p style="margin:3mm 0 0;font-size:11pt;color:#566074">Keep this in the gatehouse. It covers the one decision that matters: is that sheet plasterboard, or fibro?</p></div>
<div class="grid">
  <div class="box go"><h2 class="green">Send it to the blue bin</h2><ul>
    <li><b>Paper on both faces</b> — grey or ivory, sometimes with a maker’s name on the back</li>
    <li><b>Chalky white or grey core</b> showing at cut or broken edges</li>
    <li><b>Light for its size</b>; crumbly edges</li>
    <li>Offcuts, part sheets, whole sheets, cornice</li>
    <li>Standard, fire-rated and moisture-resistant board are all fine</li></ul></div>
  <div class="box stop"><h2 class="red">Keep it out</h2><ul>
    <li><b>No paper face</b> — hard, grey, cement-like sheet: treat as fibro, which may contain asbestos</li>
    <li><b>Dimpled or textured back</b></li>
    <li>From eaves, wet areas, sheds or outside walls of an older building</li>
    <li>Foil-backed or insulation-bonded board; lead paint</li>
    <li>Anything that isn’t plasterboard: tiles, timber, metal, batts, rubbish</li></ul></div>
  <div class="say"><h2>What to say</h2>
    <p><em>“Is any of that fibro, or from an older house?”</em> If yes, or they don’t know: <em>“That one can’t go in the blue bin — it goes with asbestos waste.”</em></p>
    <p><em>“Plasterboard goes in through the side panel — lift it, slide the sheets in, shut it after.”</em></p>
    <p><em>“Screws and timber out, please — it’s recycled into gypsum.”</em></p>
    <p style="margin-top:4mm;color:#c3cfe6">Never cut, snap or sand a sheet to check it. Only a lab test confirms asbestos — follow your site’s asbestos procedure for anything doubtful.</p></div>
  <div class="img"><img src="{A['bin_open']}" alt=""></div>
</div>
<div class="ft"><span>Bin full? Tell Plastercycle: {EMAIL} · plastercycle.com</span><span>What goes in: plastercycle.com/what-goes-in</span></div>
"""

# ---------- 3. A4 site flyer ----------
flyer_css = """
body{width:210mm;height:297mm;background:#2c66d0;color:#fff;padding:14mm 16mm;display:grid;grid-template-rows:auto 1fr auto auto;gap:6mm}
.hd{display:flex;justify-content:space-between;align-items:center}
.hd .logo{height:16mm}
.hero{display:grid;grid-template-rows:auto auto 1fr;gap:5mm}
.hero h1{color:#fff;font-size:40pt}
.hero h1 b{color:#8cc54e}
.hero p{font-size:13pt;margin:0;max-width:150mm;color:#e3ebfb}
.hero .img{display:flex;align-items:flex-end;justify-content:center}
.hero img{width:100%;max-height:80mm;object-fit:contain}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:4mm}
.step{background:#fff;color:#1b2333;border-radius:4mm;padding:5mm;font-size:10pt;line-height:1.35}
.step b{display:block;font:800 13pt M;color:#14316b;margin-bottom:2mm}
.step span{display:inline-grid;place-items:center;width:7mm;height:7mm;border-radius:50%;background:#2c66d0;color:#fff;font:800 9pt M;margin-bottom:2mm}
.ft{display:flex;justify-content:space-between;align-items:center;font-size:10pt;color:#e3ebfb;border-top:1px solid rgba(255,255,255,.35);padding-top:4mm}
.ft b{font:800 13pt M;color:#fff}
"""
flyer = f"""
<div class="hd"><div class="logo">{A['logo_rev']}</div><div style="font:800 12pt M;text-align:right">THE BLUE BIN<br>ON THIS SITE</div></div>
<div class="hero"><h1>Offcuts go in the <b>blue bin.</b></h1><p>Every sheet of plasterboard that goes in here is recycled into gypsum instead of being buried. It only works if plasterboard is the only thing in it.</p><div class="img"><img src="{A['bin_open']}" alt=""></div></div>
<div class="steps">
  <div class="step"><span>1</span><b>Lift the panel</b>It’s hinged at the top and held up by a strut.</div>
  <div class="step"><span>2</span><b>Slide the board in</b>Offcuts, part sheets, whole sheets, cornice. Break big sheets to fit more.</div>
  <div class="step"><span>3</span><b>Screws and timber out</b>No batts, no foil-backed board, no rubbish. Nothing that isn’t plasterboard.</div>
  <div class="step"><span>4</span><b>Shut it at knock-off</b>Keeps the rain out. Full? Tell the site manager.</div>
</div>
<div class="ft"><div><b>Never fibro.</b> Any sheet that might contain asbestos goes with asbestos waste, not here.</div><div style="text-align:right">plastercycle.com<br>{EMAIL}</div></div>
"""

# ---------- 4. Council leave-behind, two A4 pages ----------
council_css = """
body{background:#fff}
.pg{width:210mm;height:297mm;padding:14mm 16mm;page-break-after:always;display:grid;grid-template-rows:auto 1fr auto;gap:6mm;position:relative}
.pg:last-child{page-break-after:auto}
.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #2c66d0;padding-bottom:4mm}
.hd .logo{height:14mm} .hd .tag{font:800 11pt M;color:#2c66d0;text-align:right}
h1{font-size:28pt;margin-bottom:3mm} h2{font-size:15pt;margin-bottom:2.5mm}
p{font-size:10.5pt;line-height:1.45;margin:0 0 3mm}
.two{display:grid;grid-template-columns:1.1fr 1fr;gap:8mm;align-items:start}
.img{background:#f2f4f3;border-radius:4mm;padding:5mm;display:flex;align-items:center;justify-content:center}
.img img{width:100%;height:auto}
.big{font:800 30pt M;color:#2c66d0;letter-spacing:-0.03em;line-height:1}
.kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm;margin:3mm 0 5mm}
.kpi div{background:#f2f4f3;border-radius:3mm;padding:4mm 5mm}
.kpi b{display:block;font:800 18pt M;color:#14316b} .kpi span{font-size:9.5pt;color:#566074}
table{width:100%;border-collapse:collapse;font-size:10pt} th,td{text-align:left;padding:2.2mm 2.5mm;border-bottom:1px solid #e3e7ec;vertical-align:top} th{font-size:9pt;color:#566074;font-weight:600}
td.n{text-align:right;font:700 10.5pt M;color:#14316b;white-space:nowrap}
.spec{display:grid;grid-template-columns:1fr 1fr;gap:2mm 6mm;font-size:10pt}
.spec div{display:flex;justify-content:space-between;border-bottom:1px solid #e3e7ec;padding:1.6mm 0} .spec b{color:#14316b}
.ol{padding-left:5mm;font-size:10.5pt;line-height:1.45;margin:0} .ol li{margin-bottom:2mm}
.ft{font-size:9pt;color:#566074;display:flex;justify-content:space-between;border-top:1px solid #c5ccd6;padding-top:3mm}
.src{font-size:8.5pt;color:#8d97a8;line-height:1.35}
.cta{background:#14316b;color:#fff;border-radius:4mm;padding:6mm 7mm}
.cta h2{color:#fff} .cta p{color:#e3ebfb} .cta b{color:#8cc54e}
"""
council = f"""
<div class="pg">
  <div class="hd"><div class="logo">{A['logo']}</div><div class="tag">FOR COUNCILS AND<br>TRANSFER STATIONS</div></div>
  <div>
    <h1>Plasterboard is costing you by the tonne.</h1>
    <div class="two">
      <div>
        <p>Every tonne of plasterboard that leaves a Victorian transfer station for a metropolitan landfill carries <b>$177.19</b> of state levy in 2026–27, before the gate fee. New South Wales charges $180.20, Queensland $135, South Australia $171. The levy only moves one way.</p>
        <p>Plastercycle puts an enclosed, hook-lift bin by your gate. Plasterboard goes in through the side, stays dry, and leaves your site as a recyclable — collected on our trucks and processed back into gypsum and paper.</p>
        <div class="kpi"><div><b>~94%</b><span>of a sheet is gypsum</span></div><div><b>6–8 t</b><span>in a full bin (estimate)</span></div><div><b>$1,240</b><span>levy avoided per full bin, metro Vic</span></div></div>
        <h2>What it saves</h2>
        <table><tr><th>Plasterboard a year</th><th>Full bins</th><th>Levy avoided, metro Vic</th></tr>
          <tr><td>100 t</td><td>about 15</td><td class="n">$17,719</td></tr>
          <tr><td>250 t</td><td>about 36</td><td class="n">$44,298</td></tr>
          <tr><td>500 t</td><td>about 72</td><td class="n">$88,595</td></tr>
          <tr><td>1,000 t</td><td>about 143</td><td class="n">$177,190</td></tr></table>
        <p style="font-size:9.5pt;color:#566074;margin-top:2mm">Levy only; gate fees are on top. Your own figures: plastercycle.com/councils</p>
      </div>
      <div>
        <div class="img"><img src="{A['bin_overview']}" alt=""></div>
        <h2 style="margin-top:5mm">Why a dedicated bin</h2>
        <p>Buried with biodegradable waste, gypsum can produce hydrogen sulphide; in Europe it may only go into cells that take no biodegradable waste. Kept separate, clean and dry, it is one of the most recoverable materials you take in: recovered gypsum goes into new plasterboard, cement and soil conditioner.</p>
        <p>Builders and renovators already arrive with loads that are mostly board. A bin by the gate lets them drop it straight in.</p>
      </div>
    </div>
  </div>
  <div class="ft"><span>plastercycle.com · {EMAIL}</span><span>Page 1 of 2</span></div>
</div>
<div class="pg">
  <div class="hd"><div class="logo">{A['logo']}</div><div class="tag">THE BIN AND<br>WHAT A TRIAL INVOLVES</div></div>
  <div>
    <div class="two">
      <div>
        <h2>The bin</h2>
        <div class="spec">
          <div><span>Overall length</span><b>6,300 mm</b></div><div><span>Overall width</span><b>2,450 mm</b></div>
          <div><span>Overall height</span><b>2,400 mm</b></div><div><span>Loading opening</span><b>from about 1,000 mm</b></div>
          <div><span>Side panels</span><b>two per side, top-hinged</b></div><div><span>Rear door</span><b>full width, full height</b></div>
          <div><span>Roof</span><b>enclosed, weatherproof</b></div><div><span>Inside</span><b>fully sheeted, smooth</b></div>
          <div><span>Volume</span><b>about 37 m³</b></div><div><span>Lifting</span><b>hook-lift</b></div>
        </div>
        <h2 style="margin-top:6mm">What goes in</h2>
        <p>Plasterboard offcuts, part and whole sheets, cornice; standard, fire-rated and moisture-resistant board. Clean and separate.</p>
        <h2>What stays out</h2>
        <p>Fibro or anything that might contain asbestos; foil-backed and insulation-bonded board; lead paint; tiles, timber, metal, batts, plastic; general rubbish and hazardous waste. A printable bin sign and a one-page gate staff guide are at plastercycle.com/resources.</p>
      </div>
      <div>
        <div class="img" style="margin-bottom:5mm"><img src="{A['bin_hook']}" alt="" style="max-height:60mm;width:auto"></div>
        <h2>What a trial involves</h2>
        <ol class="ol">
          <li><b>A spot by the gate.</b> Flat, firm ground for a 6.3 × 2.45 m bin, with room in front of the hook end for a truck to reverse up. We walk it with you before the first drop.</li>
          <li><b>Signage and the gate guide.</b> The bin sign goes on the bin; the guide goes in the gatehouse. Residents bring plasterboard separately; staff keep fibro out.</li>
          <li><b>A call when it’s full.</b> We collect the full bin and leave an empty one. Loads are weighed, so you know what left your site.</li>
          <li><b>Review after the first loads.</b> Tonnes, bin cycle, what came through the gate — and whether a second bin or a schedule makes sense.</li>
        </ol>
        <div class="cta" style="margin-top:6mm"><h2>Next step</h2><p>Tell us where the bin would go and roughly how much board you see. We’ll come back with a plan and a quote. <b>plastercycle.com/book</b> · {EMAIL}</p></div>
      </div>
    </div>
    <p class="src" style="margin-top:6mm">Sources: EPA Victoria waste levy (10.26 fee units × $17.27 for 2026–27); NSW EPA, Queensland Government and EPA SA levy pages; Gypsum Board Manufacturers Association estimate via ReGyp; SEPA guidance on gypsum in landfill; British Gypsum and One Click LCA for board density. Full list with links at plastercycle.com/facts. Bin weights are estimates until loads are weighed.</p>
  </div>
  <div class="ft"><span>plastercycle.com · {EMAIL}</span><span>Page 2 of 2</span></div>
</div>
"""

jobs = [
  ('plastercycle-bin-sign-a3.pdf', page(sign, sign_css, 'A3'), 'A3'),
  ('plastercycle-gate-guide-a4.pdf', page(gate, gate_css), 'A4'),
  ('plastercycle-site-flyer-a4.pdf', page(flyer, flyer_css), 'A4'),
  ('plastercycle-for-councils.pdf', page(council, council_css), 'A4'),
]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    for name, html, fmt in jobs:
        pg.set_content(html, wait_until='load'); pg.wait_for_timeout(400)
        pg.pdf(path=str(OUT / name), format=fmt, print_background=True, prefer_css_page_size=True)
        print(name, (OUT / name).stat().st_size // 1024, 'KB')
    b.close()
