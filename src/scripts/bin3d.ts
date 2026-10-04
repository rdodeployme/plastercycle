/**
 * Plastercycle bin — a procedural 3D model built from the fabrication drawing.
 * Units are metres. X runs along the bin (hook end at -X, rear door at +X),
 * Y is up, Z across the width. Everything is generated in code so the model
 * always matches the dimensions in src/data/site.ts.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { ICON_VIEWBOX, ICON_ARROWS_GREEN, ICON_BLUE } from '../data/logoPaths';

export type BinOptions = {
  length: number; width: number; height: number; sill: number; // metres
  autoOpen?: boolean;
  reducedMotion?: boolean;
};

export type BinApi = {
  setPanels(open: boolean): void;
  setDoor(open: boolean): void;
  setDimensions(on: boolean): void;
  view(name: 'quarter' | 'side' | 'hook' | 'rear' | 'inside'): void;
  state(): { panels: boolean; door: boolean; dims: boolean; view: string };
  /** Renders a frame and returns it as a PNG data URL (used for QA and still images). */
  snapshot(): string;
  destroy(): void;
};

const BLUE = 0x2c66d0, BLUE_DEEP = 0x1f50ad, GREY = 0xd6dbe1, STEEL = 0x8d97a8;

function makeMaterials() {
  const blue = new THREE.MeshStandardMaterial({ color: BLUE, metalness: 0.2, roughness: 0.45 });
  const blueDeep = new THREE.MeshStandardMaterial({ color: BLUE_DEEP, metalness: 0.25, roughness: 0.5 });
  const grey = new THREE.MeshStandardMaterial({ color: GREY, metalness: 0.05, roughness: 0.6 });
  const steel = new THREE.MeshStandardMaterial({ color: STEEL, metalness: 0.6, roughness: 0.4 });
  const black = new THREE.MeshStandardMaterial({ color: 0x1b2333, metalness: 0.3, roughness: 0.7 });
  return { blue, blueDeep, grey, steel, black };
}

/** Box with one face in a different material. Face order: +x, -x, +y, -y, +z, -z */
function box(w: number, h: number, d: number, outer: THREE.Material, innerFace: number | null, inner: THREE.Material) {
  const g = new THREE.BoxGeometry(w, h, d);
  const mats = [outer, outer, outer, outer, outer, outer];
  if (innerFace !== null) mats[innerFace] = inner;
  const m = new THREE.Mesh(g, mats);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}

function bar(from: THREE.Vector3, to: THREE.Vector3, r: number, mat: THREE.Material) {
  const dir = new THREE.Vector3().subVectors(to, from);
  const len = dir.length();
  const g = new THREE.CylinderGeometry(r, r, len, 12);
  const m = new THREE.Mesh(g, mat);
  m.castShadow = true;
  m.position.copy(from).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
}

/** Livery texture drawn on a canvas: the logo lockup, white on the bin's blue. */
async function liveryTexture(kind: 'logo' | 'words', ratio: number): Promise<THREE.CanvasTexture> {
  const W = 2048, H = Math.round(W / ratio);
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#2c66d0'; ctx.fillRect(0, 0, W, H);
  // faint panel seam
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(0, H * 0.5 - 2, W, 3);
  try { await (document as any).fonts?.load('800 100px "Montserrat Variable"'); } catch { /* fallback font */ }
  const font = (document as any).fonts?.check?.('800 100px "Montserrat Variable"') ? '"Montserrat Variable"' : 'Montserrat, Arial, sans-serif';
  if (kind === 'logo') {
    // icon
    const [vx, vy, vw, vh] = ICON_VIEWBOX.split(' ').map(Number);
    const iconH = H * 0.5, s = iconH / vh, ix = W * 0.08, iy = (H - iconH) / 2;
    ctx.save(); ctx.translate(ix, iy); ctx.scale(s, s); ctx.translate(-vx, -vy);
    ctx.fillStyle = '#8CC54E'; ctx.fill(new Path2D(ICON_ARROWS_GREEN));
    ctx.fillStyle = '#ffffff'; ctx.fill(new Path2D(ICON_BLUE));
    ctx.restore();
    const tx = ix + vw * s + W * 0.03;
    ctx.textBaseline = 'alphabetic';
    // size the wordmark to the room left on the panel
    let size = Math.round(H * 0.3);
    ctx.font = `800 ${size}px ${font}`;
    let wordW = ctx.measureText('Plastercycle').width;
    const room = W * 0.95 - tx;
    if (wordW > room) { size = Math.floor(size * room / wordW); ctx.font = `800 ${size}px ${font}`; wordW = ctx.measureText('Plastercycle').width; }
    const base = H * 0.5;
    ctx.fillStyle = '#ffffff'; ctx.fillText('Plaster', tx, base);
    const w1 = ctx.measureText('Plaster').width;
    ctx.fillStyle = '#8CC54E'; ctx.fillText('cycle', tx + w1, base);
    const subSize = Math.round(size * 0.27);
    ctx.font = `700 ${subSize}px ${font}`;
    ctx.fillStyle = '#ffffff';
    const sub = 'PLASTERBOARD RECYCLING'; const track = subSize * 0.28;
    let subW = 0; for (const ch of sub) subW += ctx.measureText(ch).width + track;
    const scaleSub = Math.min(1, wordW / subW);
    let x = tx + 2;
    for (const ch of sub) { ctx.fillText(ch, x, base + subSize * 1.5); x += (ctx.measureText(ch).width + track) * scaleSub; }
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(W * 0.08, H * 0.2, 3, H * 0.6);
    const lines = ['RECOVER', 'RECYCLE', 'REBUILD'];
    ctx.font = `800 ${Math.round(H * 0.15)}px ${font}`;
    lines.forEach((t, i) => { ctx.fillStyle = i === 2 ? '#8CC54E' : '#ffffff'; ctx.fillText(t, W * 0.12, H * (0.36 + i * 0.2)); });
    ctx.fillStyle = '#8CC54E'; ctx.fillRect(W * 0.12, H * 0.84, W * 0.16, H * 0.03);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

export async function mountBin(el: HTMLElement, opts: BinOptions): Promise<BinApi> {
  const { length: L, width: W, height: H, sill } = opts;
  const M = makeMaterials();
  const scene = new THREE.Scene();

  // ---------- geometry ----------
  const bin = new THREE.Group();
  const floorY = 0.2, t = 0.06, roofY = H - 0.1;
  const halfL = L / 2, halfW = W / 2;

  // floor (top face grey)
  const floor = box(L, 0.08, W, M.blue, 2, M.grey); floor.position.set(0, floorY + 0.04, 0); bin.add(floor);
  // roof slab (bottom face grey) + ridge
  const roof = box(L, 0.08, W, M.blue, 3, M.grey); roof.position.set(0, roofY + 0.04, 0); bin.add(roof);
  const ridge = box(L - 0.2, 0.06, 0.12, M.blueDeep, null, M.blue); ridge.position.set(0, roofY + 0.11, 0); bin.add(ridge);
  for (const z of [-halfW * 0.5, halfW * 0.5]) {
    const r = box(L - 0.2, 0.03, 0.08, M.blueDeep, null, M.blue); r.position.set(0, roofY + 0.095, z); bin.add(r);
  }
  // lower side walls (inner face grey)
  const lowH = sill - floorY;
  for (const s of [1, -1]) {
    const wall = box(L, lowH, t, M.blue, s > 0 ? 5 : 4, M.grey);
    wall.position.set(0, floorY + lowH / 2, s * (halfW - t / 2)); bin.add(wall);
    // seams on the lower wall
    for (const x of [-halfL * 0.5, 0, halfL * 0.5]) {
      const seam = box(0.05, lowH - 0.1, 0.03, M.blueDeep, null, M.blue); seam.position.set(x, floorY + lowH / 2, s * (halfW + 0.005)); bin.add(seam);
    }
    // bottom rail and sill rail
    const brail = box(L, 0.08, 0.1, M.blueDeep, null, M.blue); brail.position.set(0, floorY + 0.04, s * (halfW - 0.02)); bin.add(brail);
    const srail = box(L, 0.06, 0.1, M.blueDeep, null, M.blue); srail.position.set(0, sill + 0.03, s * (halfW - 0.02)); bin.add(srail);
    // top rail
    const trail = box(L, 0.08, 0.1, M.blueDeep, null, M.blue); trail.position.set(0, roofY - 0.04, s * (halfW - 0.02)); bin.add(trail);
  }
  // hook-end wall (inner face +x grey) and A-frame
  const front = box(t, H - floorY - 0.1, W, M.blue, 0, M.grey); front.position.set(-halfL + t / 2, floorY + (H - floorY - 0.1) / 2, 0); bin.add(front);
  const apex = new THREE.Vector3(-halfL - 0.12, 1.62, 0);
  for (const z of [-0.95, 0.95]) bin.add(bar(new THREE.Vector3(-halfL - 0.1, floorY + 0.15, z), apex, 0.05, M.blue));
  bin.add(bar(new THREE.Vector3(-halfL - 0.12, 1.62, 0), new THREE.Vector3(-halfL - 0.12, 1.42, 0), 0.055, M.blue));
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.035, 10, 18, Math.PI), M.steel);
  hook.position.set(-halfL - 0.12, 1.62, 0); hook.rotation.y = Math.PI / 2; hook.castShadow = true; bin.add(hook);
  // corner posts
  for (const x of [-halfL + 0.06, halfL - 0.06]) for (const z of [-halfW + 0.06, halfW - 0.06]) {
    const p = box(0.12, H - floorY, 0.12, M.blueDeep, null, M.blue); p.position.set(x, floorY + (H - floorY) / 2, z); bin.add(p);
  }
  // mid posts between the two panels (one per side), stop at the sill to leave the opening clear
  for (const s of [1, -1]) {
    const p = box(0.1, H - floorY, 0.08, M.blueDeep, null, M.blue); p.position.set(0, floorY + (H - floorY) / 2, s * (halfW - 0.04)); bin.add(p);
  }
  // skids and rollers
  for (const z of [-0.8, 0.8]) {
    const sk = box(L - 0.4, 0.12, 0.12, M.blueDeep, null, M.blue); sk.position.set(0, 0.1, z); bin.add(sk);
  }
  for (const z of [-0.85, 0.85]) {
    const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.14, 18), M.black);
    roller.rotation.x = Math.PI / 2; roller.position.set(halfL - 0.4, 0.16, z); roller.castShadow = true; bin.add(roller);
  }

  // side panels: two per side, hinged at the top rail
  const panelH = roofY - sill - 0.08, panelL = L / 2 - 0.12;
  const panels: THREE.Group[] = [];
  const panelDir: number[] = [];
  const ratio = panelL / panelH;
  const [texLogo, texWords] = await Promise.all([liveryTexture('logo', ratio), liveryTexture('words', ratio)]);
  for (const s of [1, -1]) {
    for (const k of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(k * (L / 4), roofY - 0.08, s * (halfW - t / 2));
      const outerIdx = s > 0 ? 4 : 5, innerIdx = s > 0 ? 5 : 4;
      // the panel nearer the hook end carries the logo on the +Z side; the rear one on the -Z side, so each side reads logo-first from its viewer's left
      const logoHere = (s > 0 && k < 0) || (s < 0 && k > 0);
      const faceMat = new THREE.MeshStandardMaterial({ map: logoHere ? texLogo : texWords, metalness: 0.2, roughness: 0.45 });
      const g = new THREE.BoxGeometry(panelL, panelH, t);
      const mats: THREE.Material[] = [M.blue, M.blue, M.blue, M.blue, M.blue, M.blue];
      mats[outerIdx] = faceMat; mats[innerIdx] = M.grey;
      const mesh = new THREE.Mesh(g, mats); mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.position.set(0, -panelH / 2, 0);
      pivot.add(mesh);
      // hinge knuckles + latch
      for (const hx of [-panelL * 0.4, 0, panelL * 0.4]) {
        const h = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.16, 10), M.steel);
        h.rotation.z = Math.PI / 2; h.position.set(hx, 0, s * 0.03); pivot.add(h);
      }
      const latch = box(0.12, 0.08, 0.04, M.steel, null, M.steel); latch.position.set(0, -panelH + 0.06, s * 0.04); pivot.add(latch);
      bin.add(pivot); panels.push(pivot); panelDir.push(s);
    }
  }
  // rear door: full width, hinged on the -Z corner, swings outward
  const doorPivot = new THREE.Group();
  doorPivot.position.set(halfL - t / 2, 0, -halfW + 0.06);
  const doorH = H - floorY - 0.14, doorW = W - 0.12;
  const door = box(t, doorH, doorW, M.blue, 1, M.grey);
  door.position.set(0, floorY + 0.02 + doorH / 2, doorW / 2); doorPivot.add(door);
  for (const y of [floorY + 0.5, floorY + doorH / 2, floorY + doorH - 0.4]) {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.18, 10), M.steel); h.position.set(0.02, y, 0.02); doorPivot.add(h);
  }
  const handle = box(0.05, 0.3, 0.06, M.steel, null, M.steel); handle.position.set(0.05, floorY + 1.0, doorW - 0.25); doorPivot.add(handle);
  const doorSeam1 = box(0.02, 0.03, doorW - 0.3, M.blueDeep, null, M.blue); doorSeam1.position.set(0.04, floorY + doorH * 0.36, doorW / 2); doorPivot.add(doorSeam1);
  const doorSeam2 = doorSeam1.clone(); doorSeam2.position.y = floorY + doorH * 0.68; doorPivot.add(doorSeam2);
  bin.add(doorPivot);

  scene.add(bin);

  // ground: receives the shadow only
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.16 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

  // ---------- dimension overlay ----------
  const dims = new THREE.Group();
  const dimMat = new THREE.LineBasicMaterial({ color: 0x8d97a8 });
  const seg = (a: number[], b: number[]) => {
    const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)]);
    return new THREE.Line(g, dimMat);
  };
  const label = (text: string, pos: number[]) => {
    const d = document.createElement('div'); d.className = 'bin3d__label'; d.textContent = text;
    const o = new CSS2DObject(d); o.position.set(pos[0], pos[1], pos[2]); return o;
  };
  const fmt = (m: number) => Math.round(m * 1000).toLocaleString('en-AU') + ' mm';
  const yTop = H + 0.35, zOut = halfW + 0.45, xOut = halfL + 0.55;
  dims.add(seg([-halfL, yTop, zOut], [halfL, yTop, zOut]), seg([-halfL, yTop - 0.12, zOut], [-halfL, yTop + 0.12, zOut]), seg([halfL, yTop - 0.12, zOut], [halfL, yTop + 0.12, zOut]));
  dims.add(label(fmt(L), [0, yTop + 0.12, zOut]));
  dims.add(seg([xOut, 0.02, -halfW], [xOut, 0.02, halfW]), seg([xOut - 0.12, 0.02, -halfW], [xOut + 0.12, 0.02, -halfW]), seg([xOut - 0.12, 0.02, halfW], [xOut + 0.12, 0.02, halfW]));
  dims.add(label(fmt(W), [xOut + 0.15, 0.02, 0]));
  dims.add(seg([-halfL - 0.5, 0, zOut], [-halfL - 0.5, H, zOut]), seg([-halfL - 0.62, 0, zOut], [-halfL - 0.38, 0, zOut]), seg([-halfL - 0.62, H, zOut], [-halfL - 0.38, H, zOut]));
  dims.add(label(fmt(H), [-halfL - 0.5, H / 2, zOut + 0.1]));
  dims.add(seg([halfL + 0.2, 0, zOut], [halfL + 0.2, sill, zOut]), seg([halfL + 0.08, sill, zOut], [halfL + 0.32, sill, zOut]));
  dims.add(label(fmt(sill) + ' sill', [halfL + 0.2, sill + 0.14, zOut + 0.1]));
  dims.visible = false; scene.add(dims);

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfd6de, 1.1));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(-6, 9, 7); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -8; sun.shadow.camera.right = 8; sun.shadow.camera.top = 8; sun.shadow.camera.bottom = -8;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 30; sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xdfe9ff, 0.6); fill.position.set(7, 4, -6); scene.add(fill);

  // ---------- renderer, camera, controls ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.domElement.className = 'bin3d__canvas';
  el.appendChild(renderer.domElement);
  const labels = new CSS2DRenderer(); labels.domElement.className = 'bin3d__labels'; el.appendChild(labels.domElement);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const target = new THREE.Vector3(0, 1.05, 0);
  const VIEWS: Record<string, [number, number, number]> = {
    quarter: [-4.9, 2.35, 6.7], side: [0, 1.6, 8.6], hook: [-8.8, 1.9, 0.01], rear: [8.8, 1.9, 0.01], inside: [6.6, 1.5, 0.8],
  };
  camera.position.set(...VIEWS.quarter);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(target); controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.enablePan = false; controls.minDistance = 4; controls.maxDistance = 18;
  controls.maxPolarAngle = Math.PI / 2 - 0.03; controls.minPolarAngle = 0.25;
  // let one finger scroll the page; drag sideways to rotate, pinch to zoom
  renderer.domElement.style.touchAction = 'pan-y';
  controls.update();

  // ---------- animation state ----------
  const st = { panels: 0, door: 0, panelsOpen: false, doorOpen: false, dims: false, view: 'quarter' };
  const PANEL_OPEN = THREE.MathUtils.degToRad(82), DOOR_OPEN = THREE.MathUtils.degToRad(105);
  let camFrom = camera.position.clone(), camTo = camera.position.clone(), camT = 1, tgtFrom = target.clone(), tgtTo = target.clone();
  const sphFrom = new THREE.Spherical(), sphTo = new THREE.Spherical();
  const ease = (x: number) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const motion = !opts.reducedMotion;
  let dirty = true, raf = 0, visible = true, last = performance.now();

  const apply = () => {
    panels.forEach((p, i) => { p.rotation.x = -panelDir[i] * st.panels * PANEL_OPEN; });
    doorPivot.rotation.y = -st.door * DOOR_OPEN;
  };
  const tick = (now: number) => {
    raf = 0;
    const dt = Math.min(0.25, (now - last) / 1000); last = now;
    let moving = false;
    const goal = st.panelsOpen ? 1 : 0, dgoal = st.doorOpen ? 1 : 0;
    const rate = motion ? dt * 1.6 : 1;
    if (st.panels !== goal) { st.panels += Math.sign(goal - st.panels) * Math.min(Math.abs(goal - st.panels), rate); moving = true; }
    if (st.door !== dgoal) { st.door += Math.sign(dgoal - st.door) * Math.min(Math.abs(dgoal - st.door), rate); moving = true; }
    if (camT < 1) {
      camT = Math.min(1, camT + (motion ? dt / 0.8 : 1)); const e = ease(camT);
      // swing around the bin rather than through it: interpolate in spherical coordinates about the target
      controls.target.lerpVectors(tgtFrom, tgtTo, e);
      const a = sphFrom, b = sphTo;
      let dTheta = b.theta - a.theta; if (dTheta > Math.PI) dTheta -= 2 * Math.PI; if (dTheta < -Math.PI) dTheta += 2 * Math.PI;
      const sph = new THREE.Spherical(a.radius + (b.radius - a.radius) * e, a.phi + (b.phi - a.phi) * e, a.theta + dTheta * e);
      camera.position.setFromSpherical(sph).add(controls.target); moving = true;
    }
    if (moving) apply();
    const changed = controls.update();
    if (moving || changed || dirty) { renderer.render(scene, camera); labels.render(scene, camera); dirty = false; }
    if ((moving || changed) && visible) raf = requestAnimationFrame(tick);
  };
  const kick = () => { dirty = true; if (!raf && visible) raf = requestAnimationFrame(tick); };
  controls.addEventListener('change', kick);
  controls.addEventListener('start', kick);

  // frame the bin: the views are tuned for a wide stage (~16:8.5); on a narrower stage pull the
  // camera back so the same width of bin stays in shot
  const fit = () => Math.max(1, 1.8 / (el.clientWidth / Math.max(1, el.clientHeight)));
  let lastFit = 0;
  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h, false); labels.setSize(w, h);
    const f = fit(); controls.minDistance = 4 * f; controls.maxDistance = 18 * f;
    if (Math.abs(f - lastFit) > 0.05) {
      // stage shape changed (first layout, rotation): re-frame the current view without animating
      lastFit = f;
      const v = VIEWS[st.view as keyof typeof VIEWS] ?? VIEWS.quarter;
      const tgt = st.view === 'inside' ? new THREE.Vector3(-1, 1.0, 0) : target;
      camera.position.set(...v); if (st.view !== 'inside') camera.position.multiplyScalar(f);
      controls.target.copy(tgt); camT = 1;
    }
    kick();
  };
  const ro = new ResizeObserver(resize); ro.observe(el); resize();
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { threshold: 0.05 });
  io.observe(el);

  const goView = (name: keyof typeof VIEWS) => {
    camFrom.copy(camera.position); tgtFrom.copy(controls.target);
    camTo.set(...VIEWS[name]);
    if (name !== 'inside') camTo.multiplyScalar(fit());
    tgtTo.copy(name === 'inside' ? new THREE.Vector3(-1, 1.0, 0) : target);
    sphFrom.setFromVector3(new THREE.Vector3().subVectors(camFrom, tgtFrom));
    sphTo.setFromVector3(new THREE.Vector3().subVectors(camTo, tgtTo));
    camT = 0; st.view = name; kick();
  };

  apply();
  kick();
  if (opts.autoOpen && motion) setTimeout(() => { st.panelsOpen = true; kick(); el.dispatchEvent(new CustomEvent('bin3d:state')); }, 500);
  else if (opts.autoOpen) { st.panelsOpen = true; st.panels = 1; apply(); kick(); }

  return {
    setPanels(open) { st.panelsOpen = open; kick(); },
    setDoor(open) { st.doorOpen = open; kick(); },
    setDimensions(on) { st.dims = on; dims.visible = on; kick(); },
    view(name) {
      if (name === 'inside') { st.doorOpen = true; st.panelsOpen = true; }
      goView(name);
    },
    state() { return { panels: st.panelsOpen, door: st.doorOpen, dims: st.dims, view: st.view, _cam: camera.position.toArray(), _visible: visible, _raf: raf, _camT: camT, _p: st.panels } as any; },
    snapshot() { controls.update(); renderer.render(scene, camera); return renderer.domElement.toDataURL('image/png'); },
    destroy() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); controls.dispose(); renderer.dispose(); el.innerHTML = ''; },
  };
}
