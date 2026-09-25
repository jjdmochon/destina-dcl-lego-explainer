// DESTINA · Dynamic Chemical Labelling explainer — brick-built isometric 3D, keyed to useComposition().T
const VW = 1920, VH = 1080;
const COL = {
  blue: '#0039CA', blueD: '#002b9b', action: '#0056ff', tint: '#86a5f3', ink: '#111111', muted: '#5a5a5a',
  red: '#FB1414', yellow: '#FFC21A', green: '#16a34a',
  bead: '#3a4670', beadOther: '#9aa6c4', peg: '#b3bccf',
  rna: '#c3cde6', rnaBase: '#e3e8f4', rnaG: '#9fb2e6',
  sa: '#eef1f6', pe: '#ff7a2e',
  floor: '#e5ecfb', plate: '#f7f9fd', well: '#d3dcf0', serum: '#efd58a',
  white: '#f4f6fb', dark: '#222b44', glass: '#c9d9ff',
  teal: '#0d9488', rna451: '#bfe0db', rna451Base: '#e1f1ee', rna451G: '#8fcfc6', baseA: '#7c3aed',
};
const R_BEAD = 3.2, Z0 = 6.8, LH = 1.2, NP = 8, NM = 10, POCK = 3;
const zk = k => Z0 + k * LH;
const ZP = zk(POCK);

const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const tri = (T, c, w) => cl(1 - Math.abs(T - c) / w);
const fadeIO = (T, a, b, f = 0.35) => Math.min(cl((T - a) / f), cl((b - T) / f));
const MOTION = {
  enter: (T, a, b) => Easing.easeOutCubic(cl((T - a) / (b - a))),
  move: (T, a, b) => Easing.easeInOutCubic(cl((T - a) / (b - a))),
  pop: (T, a, b) => Easing.easeOutBack(cl((T - a) / (b - a))),
};

const _rgb = {};
function rgb(c) { if (_rgb[c]) return _rgb[c]; const h = c.replace('#', ''); return (_rgb[c] = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16))); }
function sh(c, f) { const m = v => Math.round(cl(f <= 1 ? v * f : v + (255 - v) * (f - 1), 0, 255)); const [r, g, b] = rgb(c); return `rgb(${m(r)},${m(g)},${m(b)})`; }
function mixc(a, b, t) { const A = rgb(a), B = rgb(b); return '#' + [0, 1, 2].map(i => Math.round(lerp(A[i], B[i], t)).toString(16).padStart(2, '0')).join(''); }
const lerpM = (a, b, e) => ({ x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), z: lerp(a.z, b.z, e), a: lerp(a.a, b.a, e) });

function K(t, tx, ty, tz, u, yaw, cx = VW / 2, cy = VH * 0.5) { return { t, tx, ty, tz, u, yaw, cx, cy }; }
function camAt(T, keys) {
  if (T <= keys[0].t) return { ...keys[0] };
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (T < b.t) { const e = MOTION.move(T, a.t, b.t); const o = {}; for (const k in b) if (k !== 't') o[k] = lerp(a[k], b[k], e); return o; }
  }
  return { ...keys[keys.length - 1] };
}
function makeCam(o) {
  const phi = 0.56, ca = Math.cos(o.yaw), sa = Math.sin(o.yaw), sp = Math.sin(phi), cp = Math.cos(phi);
  const { u, tx, ty, tz, cx, cy } = o;
  return {
    u, sp, cp,
    p(x, y, z) { const dx = x - tx, dy = y - ty, dz = z - tz; const X = dx * ca - dy * sa, Y = dx * sa + dy * ca; return [cx + X * u, cy - (dz * cp + Y * sp) * u, Y * cp - dz * sp]; },
    rn(nx, ny) { return [nx * ca - ny * sa, nx * sa + ny * ca]; },
  };
}
const pts = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

class Bld {
  constructor(cam, pre) { this.cam = cam; this.pre = pre; this.items = []; this.grads = {}; this.glows = {}; this.anchors = {}; this.n = 0; }
  add(d, el) { this.items.push([d, this.n++, el]); }
  X(M, x, y, z) { if (!M) return [x, y, z]; const a = M.a || 0, c = Math.cos(a), s = Math.sin(a); return [M.x + x * c - y * s, M.y + x * s + y * c, (M.z || 0) + z]; }
  P(M, x, y, z) { const w = this.X(M, x, y, z); return this.cam.p(w[0], w[1], w[2]); }
  anchor(name, x, y, z, M) { this.anchors[name] = this.P(M, x, y, z); }
  gid(col) { return this.grads[col] || (this.grads[col] = this.pre + 'g' + Object.keys(this.grads).length); }
  lid(col) { return this.glows[col] || (this.glows[col] = this.pre + 'l' + Object.keys(this.glows).length); }
  stud(p, col, key, r = 0.3) {
    const { u, sp, cp } = this.cam; const rx = r * u, ry = rx * sp, h = 0.2 * u * cp;
    return (
      <g key={key}>
        <path d={`M${p[0] - rx},${p[1]} A${rx},${ry} 0 0 0 ${p[0] + rx},${p[1]} L${p[0] + rx},${p[1] - h} L${p[0] - rx},${p[1] - h} Z`} fill={sh(col, 0.74)} />
        <ellipse cx={p[0]} cy={p[1] - h} rx={rx} ry={ry} fill={sh(col, 1.12)} stroke={sh(col, 0.78)} strokeWidth="0.8" />
      </g>
    );
  }
  box(x, y, z, w, d, h, col, o = {}) {
    if ((o.op ?? 1) <= 0.01) return;
    const M = o.M, P = (a, b, c) => this.P(M, a, b, c);
    const x1 = x + w, y1 = y + d, z1 = z + h;
    const B = [P(x, y, z), P(x1, y, z), P(x1, y1, z), P(x, y1, z)], U = [P(x, y, z1), P(x1, y, z1), P(x1, y1, z1), P(x, y1, z1)];
    const a = (M && M.a) || 0, c = Math.cos(a), s = Math.sin(a);
    const N = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    const stroke = sh(col, 0.62), parts = [];
    for (let i = 0; i < 4; i++) {
      const n = N[i], r = this.cam.rn(n[0] * c - n[1] * s, n[0] * s + n[1] * c);
      if (r[1] > -0.01) continue;
      const j = (i + 1) % 4;
      parts.push(<polygon key={'s' + i} points={pts([B[i], B[j], U[j], U[i]])} fill={sh(col, 0.8 - 0.15 * r[0])} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />);
    }
    parts.push(<polygon key="t" points={pts(U)} fill={sh(col, 1.07)} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />);
    if (o.studs !== false) {
      const st = [];
      for (let i = 0; i < Math.round(w); i++) for (let j = 0; j < Math.round(d); j++) st.push(P(x + i + 0.5, y + j + 0.5, z1));
      st.sort((m, n) => n[2] - m[2]).forEach((p, k) => parts.push(this.stud(p, col, 'u' + k)));
    }
    const cc = P(x + w / 2, y + d / 2, z + h / 2);
    this.add(cc[2] + (o.bias || 0), <g key={this.n} opacity={o.op ?? 1}>{parts}</g>);
  }
  cyl(x, y, z, r, h, col, o = {}) {
    if ((o.op ?? 1) <= 0.01) return;
    const p0 = this.P(o.M, x, y, z), p1 = this.P(o.M, x, y, z + h); const { u, sp } = this.cam; const rx = r * u, ry = rx * sp;
    const parts = [
      <path key="b" d={`M${p0[0] - rx},${p0[1]} A${rx},${ry} 0 0 0 ${p0[0] + rx},${p0[1]} L${p1[0] + rx},${p1[1]} L${p1[0] - rx},${p1[1]} Z`} fill={`url(#${this.gid(col)})`} stroke={sh(col, 0.62)} strokeWidth="1" />,
      <ellipse key="t" cx={p1[0]} cy={p1[1]} rx={rx} ry={ry} fill={sh(col, 1.07)} stroke={sh(col, 0.62)} strokeWidth="1" />,
    ];
    if (o.stud) parts.push(this.stud(p1, col, 's', o.studR || 0.3));
    const cc = this.P(o.M, x, y, z + h / 2);
    this.add(cc[2] + (o.bias || 0), <g key={this.n} opacity={o.op ?? 1}>{parts}</g>);
  }
  glow(x, y, z, r, col, op, o = {}) {
    if (op <= 0.01) return;
    const p = this.P(o.M, x, y, z);
    this.add(p[2] + (o.bias ?? -2), <circle key={this.n} cx={p[0]} cy={p[1]} r={r * this.cam.u} fill={`url(#${this.lid(col)})`} opacity={op} />);
  }
  beam(a, b, col, op) {
    if (op <= 0.01) return;
    const A = this.cam.p(...a), B = this.cam.p(...b), u = this.cam.u;
    const mid = this.cam.p((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    this.add(mid[2] - 0.5, (
      <g key={this.n} opacity={op} strokeLinecap="round">
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={col} strokeOpacity="0.18" strokeWidth={u * 0.6} />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={col} strokeOpacity="0.35" strokeWidth={u * 0.22} />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={mixc(col, '#ffffff', 0.45)} strokeWidth={Math.max(2, u * 0.06)} />
      </g>
    ));
  }
  shadow(x, y, r, op) {
    if (op <= 0.01) return;
    const p = this.cam.p(x, y, 0), u = this.cam.u;
    this.add(5e6, <ellipse key={this.n} cx={p[0]} cy={p[1]} rx={r * u} ry={r * u * this.cam.sp} fill="#0b2a8a" opacity={op} />);
  }
  floor(x0, y0, w, d, col) {
    this.box(x0, y0, -0.6, w, d, 0.6, col, { studs: false, bias: 1e7 });
    const { u, sp, cp } = this.cam; const rx = 0.3 * u, ry = rx * sp, h = 0.2 * u * cp;
    if (rx < 3) return;
    const st = [], side = sh(col, 0.86), top = sh(col, 1.05), line = sh(col, 0.9);
    for (let i = 0; i < w; i++) for (let j = 0; j < d; j++) {
      const p = this.cam.p(x0 + i + 0.5, y0 + j + 0.5, 0);
      if (p[0] < -rx || p[0] > VW + rx || p[1] < -rx || p[1] > VH + rx) continue;
      st.push(p);
    }
    st.sort((m, n) => n[2] - m[2]);
    this.add(1e7 - 1, (
      <g key={this.n}>
        <path d={st.map(p => `M${p[0] - rx},${p[1]} A${rx},${ry} 0 0 0 ${p[0] + rx},${p[1]} L${p[0] + rx},${p[1] - h} L${p[0] - rx},${p[1] - h} Z`).join('')} fill={side} />
        <path d={st.map(p => `M${p[0] - rx},${p[1] - h} a${rx},${ry} 0 1 0 ${2 * rx},0 a${rx},${ry} 0 1 0 ${-2 * rx},0 Z`).join('')} fill={top} stroke={line} strokeWidth="0.8" />
      </g>
    ));
  }
  render() {
    this.items.sort((a, b) => b[0] - a[0] || a[1] - b[1]);
    return (
      <svg width={VW} height={VH} viewBox={`0 0 ${VW} ${VH}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          {Object.entries(this.grads).map(([col, id]) => (
            <linearGradient key={id} id={id} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={sh(col, 0.97)} /><stop offset="0.4" stopColor={sh(col, 0.87)} /><stop offset="1" stopColor={sh(col, 0.6)} />
            </linearGradient>
          ))}
          {Object.entries(this.glows).map(([col, id]) => (
            <radialGradient key={id} id={id}>
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" /><stop offset="0.22" stopColor={col} stopOpacity="0.8" /><stop offset="1" stopColor={col} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>
        {this.items.map(i => i[2])}
      </svg>
    );
  }
}

/* ---------- brick models ---------- */
function bead(b, x, y, z0, R, band, o = {}) {
  const n = o.n || 8, t = (2 * R) / n;
  for (let i = 0; i < n; i++) {
    const c = (2 * (i + 0.5)) / n - 1, r = R * Math.sqrt(1 - c * c);
    const col = i === n / 2 - 1 || i === n / 2 ? band : o.core || COL.bead;
    b.cyl(x, y, z0 + i * t, r, t, col, { op: o.op, stud: o.stud && i === n - 1 });
  }
}
function probe(b, bx, by, lev) {
  const L0 = lev(-1);
  if (L0) b.cyl(bx, by, 6.4 + L0.dz, 0.42, 0.4, COL.peg, { op: L0.op });
  for (let k = 0; k < NP; k++) {
    const L = lev(k); if (!L) continue;
    b.box(bx - 0.5, by - 0.5, zk(k) + L.dz, 1, 1, LH, COL.blue, { op: L.op });
    if (k !== POCK) b.box(bx + 0.5, by - 0.5, zk(k) + L.dz, 1, 1, LH, COL.tint, { op: L.op });
  }
}
const built = () => ({ dz: 0, op: 1 });
function smartC(b, M, op) {
  b.box(0, 0, 0, 1, 1, LH, COL.red, { M, op });
  b.box(0, -3, 0.4, 1, 3, 0.4, COL.peg, { M, op });
  b.cyl(0.5, -3.5, 0.1, 0.5, 0.9, COL.yellow, { M, op, stud: true });
}
function saPE(b, M, op, glow) {
  [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]].forEach(([dx, dy]) => b.cyl(dx, dy, 0, 0.5, 1.2, COL.sa, { M, op }));
  b.box(-1, -1, 1.2, 2, 2, 1.2, COL.pe, { M, op });
  b.glow(0, 0, 1.8, 3.4, COL.pe, glow, { M, bias: -6 });
}

/* ---------- overlays ---------- */
const PILL = {
  position: 'absolute', whiteSpace: 'nowrap', background: '#ffffff', borderRadius: 999, padding: '10px 22px',
  border: '1px solid rgba(0,57,202,0.15)', boxShadow: '0 8px 24px rgba(0,57,202,0.14), 0 1px 2px rgba(0,0,0,0.06)',
  font: '600 26px Inter, system-ui, sans-serif', color: COL.ink, letterSpacing: '-0.01em',
};
function Callouts({ items, on }) {
  const vis = on ? items.filter(c => c.o > 0.01 && c.a) : [];
  return (
    <React.Fragment>
      <svg width={VW} height={VH} style={{ position: 'absolute', inset: 0 }}>
        {vis.map((c, k) => (
          <g key={k} opacity={c.o}>
            <line x1={c.a[0]} y1={c.a[1]} x2={c.a[0] + c.dx} y2={c.a[1] + c.dy} stroke={COL.blue} strokeWidth="2" />
            <circle cx={c.a[0]} cy={c.a[1]} r="6" fill={COL.blue} stroke="#fff" strokeWidth="3" />
          </g>
        ))}
      </svg>
      {vis.map((c, k) => (
        <div key={k} style={{ ...PILL, left: c.a[0] + c.dx, top: c.a[1] + c.dy, opacity: c.o, transform: `translate(${c.dx < 0 ? '-100%' : '0'}, -50%) translateY(${(1 - c.o) * 10}px)` }}>
          {c.text}{c.sub && <span style={{ fontWeight: 400, color: COL.muted, marginLeft: 10 }}>{c.sub}</span>}
        </div>
      ))}
    </React.Fragment>
  );
}

/* ---------- world 1: plate + instrument ---------- */
function PlateWorld({ T, C, tw }) {
  if (!((T >= C.Title - 0.3 && T < C.Bead) || (T >= C.Instrument && T < C.Read))) return null;
  const I0 = C.Instrument, S0 = C.Sample, T0 = C.Title;
  const keys = [
    K(T0, 0, 0, 0.6, 54, 0.6, VW * 0.77), K(S0, 0, 0, 0.6, 62, 0.72, VW * 0.64), K(S0 + 3.7, 0.5, -0.5, 1, 74, 0.8, VW * 0.5),
    K(C.Bead, 2.5, -1.5, 1.3, 1100, 0.84, VW * 0.5), K(I0, 3, 0, 1.5, 54, 0.62, VW * 0.5), K(I0 + 2.8, 10, 0, 2.6, 42, 0.55, VW * 0.5),
    K(C.Read, 13.2, 0, 2.8, 150, 0.5, VW * 0.5),
  ];
  const k = camAt(T, keys); if (tw.orbit) k.yaw += 0.01 * (T - T0);
  const b = new Bld(makeCam(k), 'p');
  if (T < C.Bead) b.floor(-8, -6, 16, 12, COL.floor); else b.floor(-9, -7, 34, 14, COL.floor);
  const inst = T >= I0;
  const lift = inst ? MOTION.move(T, I0 + 0.4, I0 + 1.2) * 2.2 : 0;
  const slide = inst ? MOTION.move(T, I0 + 1.2, I0 + 4.4) * 19 : 0;
  const drop = (1 - MOTION.pop(T, T0 + 0.2, T0 + 1.3)) * 9;
  const x0 = -6 + slide, pz = lift + drop, X0 = 13;
  const vw = Math.min(12, X0 - x0);
  if (vw > 0.05) {
    b.box(x0, -4, pz, vw, 8, 1.2, COL.plate, { studs: false, op: cl((T - T0 + 0.2) / 0.3), bias: 50 });
    for (let i = 0; i < 12; i++) {
      const cx = x0 + i + 0.5; if (cx > X0 - 0.4) continue;
      const fill = cl((T - (S0 + 0.9 + i * 0.29)) / 0.25);
      for (let j = 0; j < 8; j++) {
        const e = MOTION.pop(T, T0 + 0.9 + (i + j) * 0.035, T0 + 1.25 + (i + j) * 0.035);
        b.cyl(cx, -3.5 + j, pz + 1.2 + (1 - e) * 1.5, 0.36, 0.14, mixc(COL.well, COL.serum, fill), { op: cl(e) });
      }
    }
  }
  if (T >= S0 && T < C.Bead) {
    const e1 = MOTION.enter(T, S0 + 0.1, S0 + 0.8), e2 = MOTION.move(T, S0 + 4.2, S0 + 4.9);
    const u = cl((T - (S0 + 0.9)) / (11 * 0.29)), px = -5.5 + 11 * u;
    const dip = u > 0 && u < 1 ? 0.35 * (0.5 + 0.5 * Math.cos(2 * Math.PI * ((px + 5.5) % 1))) : 0;
    const M = { x: px, y: 0, z: 1.6 + 9 * (1 - e1) + 9 * e2 - dip, a: 0 };
    for (let j = 0; j < 8; j++) b.cyl(0, -3.5 + j, 0, 0.2, 1.9, '#dfe6f4', { M, op: 0.95 });
    b.box(-0.5, -4.2, 1.9, 1, 8.4, 1.2, COL.white, { M, studs: false });
    b.box(-0.6, -1, 3.1, 1.2, 2, 4, '#e3e8f3', { M, studs: false });
    b.box(-0.4, -0.4, 7.1, 0.8, 0.8, 0.6, COL.blue, { M, studs: false });
  }
  if (inst) {
    b.box(13, -4.5, 0, 9, 9, 8.4, COL.white, { studs: false });
    b.box(13, -4.5, 8.4, 9, 9, 0.4, '#dfe4ef');
    b.box(15.4, -4.8, 3.8, 5.2, 0.3, 3.6, '#18213a', { studs: false });
    b.box(15.8, -4.9, 4.2, 4.4, 0.1, 2.8, '#1e3f9e', { studs: false, bias: -1 });
    b.box(13, -4.7, 1.0, 9, 0.2, 0.4, COL.blue, { studs: false });
    b.box(12.9, -4.3, 1.9, 0.12, 8.6, 1.8, '#1a2032', { studs: false });
    b.box(11.2, -4.2, 1.8, 1.8, 8.4, 0.4, '#2b3350', { studs: false });
    b.anchor('inst', 17.5, 0, 8.8);
  }
  const calls = [{ a: b.anchors.inst, dx: 160, dy: -110, text: 'Luminex xMAP INTELLIFLEX', o: fadeIO(T, I0 + 1.2, C.Read - 0.3) }];
  return <div style={{ position: 'absolute', inset: 0 }}>{b.render()}<Callouts items={calls} on={tw.callouts} /></div>;
}

/* ---------- world 2: molecules on beads ---------- */
const BD = {
  A: { x: 0, y: 0, band: COL.action },   // region 122, captures miR-122 (G opposite blank)
  F: { x: -11, y: 9, band: COL.teal },   // region 451, captures miR-451
  M: { x: 14, y: -5, band: COL.action }, // region 122, related strand with A opposite blank
  N: { x: 3, y: 16, band: COL.action },  // region 122, nothing captured
};
function mirna(b, bx, by, ox, oz, op, o = {}) {
  for (let k = 0; k < NM; k++) {
    b.box(bx + 1.5 + ox, by - 0.5, zk(k) + oz, 1, 1, LH, k === POCK ? (o.pock || COL.rnaG) : (o.base || COL.rnaBase), { op });
    b.box(bx + 2.5 + ox, by - 0.5, zk(k) + oz, 1, 1, LH, o.back || COL.rna, { op });
  }
  if (o.bump) b.box(bx + 1.1 + ox, by - 0.3, zk(POCK) + oz + 0.3, 0.4, 0.6, 0.6, o.pock, { op, studs: false });
}
function dockPath(T, free, bead, t0, t1, t2) {
  const pre = { x: bead.x + 0.5, y: bead.y - 3.5, z: ZP, a: 0 };
  if (T < t1) return lerpM(free, pre, MOTION.move(T, t0, t1));
  const s = 3 * (1 - MOTION.enter(T, t1, t2));
  return { x: bead.x + 0.5, y: bead.y - 0.5 - s, z: ZP, a: 0 };
}

function MolWorld({ T, C, tw }) {
  if (!((T >= C.Bead && T < C.Instrument) || T >= C.Close)) return null;
  const B0 = C.Bead, C0 = C.Capture, L0 = C.Label, S0 = C.SingleBase, I0 = C.Illuminate, E0 = C.Close;
  const { A, F, M, N } = BD;
  const keys = [
    K(B0, 0, 0, 3.5, 66, 0.35), K(B0 + 2.2, 0.5, 0, 6.5, 52, 0.42), K(B0 + 6.8, 1, 0, 11, 42, 0.5),
    K(C0 + 1.4, 1.5, 3, 8.5, 27, 0.55), K(C0 + 4.0, 1.5, 3, 8.5, 28, 0.58), K(C0 + 6.6, 1, -0.5, ZP + 0.6, 92, 0.6), K(C0 + 8.9, 1, -0.5, ZP + 0.6, 96, 0.6),
    K(L0 + 0.8, 0, -2.5, ZP + 1.6, 58, 0.5), K(L0 + 3.2, 0.8, -1.6, ZP + 0.5, 88, 0.5), K(L0 + 6.6, 1, -1, ZP + 0.5, 104, 0.55), K(L0 + 9.8, 1, -1.5, ZP + 0.5, 90, 0.6),
    K(S0 + 1.8, 7, -2.5, 9, 38, 0.55), K(S0 + 3.0, M.x + 1.2, M.y - 2, ZP + 0.4, 88, 0.62), K(S0 + 7.0, M.x + 1.2, M.y - 2, ZP + 0.4, 84, 0.66), K(S0 + 8.9, 1, -2, ZP + 1.6, 66, 0.5),
    K(I0 + 2.4, 1, -3, ZP + 1.8, 72, 0.55), K(I0 + 4.4, 1.5, 3, 8.5, 27, 0.6), K(I0 + 7, 1.5, 3, 8.5, 26, 0.64),
    K(E0, 1, -1.5, 10.5, 44, 0.75, VW * 0.3), K(E0 + 6, 1, -1.5, 10.5, 47, 1.05, VW * 0.3),
  ];
  const k = camAt(T, keys); if (tw.orbit) k.yaw += 0.01 * (T < E0 ? T - B0 : T - E0);
  const b = new Bld(makeCam(k), 'm');
  b.floor(-16, -12, 36, 30, COL.floor);

  const dropA = (1 - MOTION.pop(T, B0 + 0.1, B0 + 1.0)) * 8;
  b.shadow(0, 0, 3.4, 0.16 * cl(1 - dropA / 8));
  bead(b, 0, 0, dropA, R_BEAD, A.band);
  const levA = kk => { const t0 = kk < 0 ? B0 + 1.2 : B0 + 1.5 + kk * 0.28; if (T < t0) return null; return { dz: (1 - MOTION.enter(T, t0, t0 + 0.4)) * 3, op: cl((T - t0) / 0.15) }; };
  probe(b, 0, 0, levA);
  [[F, 0.5], [M, 0.7], [N, 0.9]].forEach(([bd, d]) => {
    const dz = (1 - MOTION.pop(T, B0 + d, B0 + d + 1)) * 10;
    b.shadow(bd.x, bd.y, 3.4, 0.16 * cl(1 - dz / 10));
    bead(b, bd.x, bd.y, dz, R_BEAD, bd.band);
    probe(b, bd.x, bd.y, () => ({ dz, op: 1 }));
  });
  b.anchor('bead', -2.6, 0, 5.2); b.anchor('probe', -0.5, 0, zk(6) + 0.6); b.anchor('blank', 1, -0.5, ZP + 0.6);
  const ghost = (bd, a, z) => b.box(bd.x + 0.5, bd.y - 0.5, ZP, 1, 1, LH, COL.blue, { op: 0.2 * fadeIO(T, a, z) * (0.75 + 0.25 * Math.sin(T * 5)), studs: false });
  ghost(A, B0 + 4.3, L0 + 3.9); ghost(M, S0 + 0.8, S0 + 8.4);

  // capture: miR-122 on A, miR-451 on F, a related strand (A opposite the blank) on M
  if (T >= C0) {
    const strand = (bd, t0, o) => { const e = MOTION.move(T, t0, t0 + 2.9); mirna(b, bd.x, bd.y, 4 * (1 - e), 12 * (1 - e), cl((T - t0 + 0.5) / 0.4), o); };
    strand(A, C0 + 0.5); strand(F, C0 + 0.8, { back: COL.rna451, base: COL.rna451Base, pock: COL.rna451G }); strand(M, C0 + 1.1, { pock: COL.baseA, bump: true });
    for (let i = 0; i < NP; i++) b.glow(1.5, 0, zk(i) + 0.6, 1.2, '#7c9dff', 0.8 * tri(T, C0 + 3.35 + i * 0.09, 0.35), { bias: -3 });
    b.glow(2, -0.5, ZP + 0.6, 1.8, '#5d84ff', fadeIO(T, C0 + 4.6, L0 + 1.2, 0.5) * (0.55 + 0.35 * Math.sin(T * 6)), { bias: -3 });
    b.glow(M.x + 1.6, M.y - 0.5, ZP + 0.6, 1.8, COL.baseA, fadeIO(T, S0 + 1.8, S0 + 5.2, 0.5) * (0.5 + 0.3 * Math.sin(T * 6)), { bias: -3 });
    b.anchor('mA', 3, 0, zk(9) + 1.2); b.anchor('mF', F.x + 3, F.y, zk(9) + 1.2); b.anchor('G', 2, -0.5, ZP + 0.6); b.anchor('Abase', M.x + 1.3, M.y, ZP + 0.9);
  }

  // SMART-C-Biotin
  const wash = 1 - cl((T - I0 + 0.3) / 0.8);
  const appear = cl((T - L0 + 0.2) / 0.6);
  if (T >= L0 - 0.2) {
    const f1 = { x: -5 + 0.3 * Math.sin(T * 1.3), y: -6, z: ZP + 3.5 + 0.3 * Math.sin(T * 1.7), a: 0.9 };
    let M1;
    if (T < L0 + 3.2) M1 = lerpM(f1, { x: 0.5, y: -3.5, z: ZP, a: 0 }, MOTION.move(T, L0 + 1.6, L0 + 3.2));
    else {
      const s = 3 * (1 - MOTION.enter(T, L0 + 3.2, L0 + 3.9)) + 1.1 * MOTION.move(T, L0 + 4.3, L0 + 4.9) - 1.1 * MOTION.move(T, L0 + 4.9, L0 + 5.5)
        + 0.5 * MOTION.move(T, L0 + 5.8, L0 + 6.1) - 0.5 * MOTION.move(T, L0 + 6.1, L0 + 6.4);
      M1 = { x: 0.5, y: -0.5 - s, z: ZP, a: 0 };
    }
    smartC(b, M1, appear);
    b.anchor('smart', 0.5, -3.5, 1.2, M1);
    b.glow(1, 0, ZP + 0.6, 2.6, '#8fb0ff', tri(T, L0 + 7.2, 0.7), { bias: -8 });
    smartC(b, dockPath(T, { x: -7, y: 4, z: ZP + 3.5, a: 0.5 }, F, L0 + 1.2, L0 + 3.0, L0 + 3.8), appear);

    // f2 tries the related strand on M and is rejected
    const drift2 = t => ({ x: 5 + 0.6 * Math.sin(t * 0.9), y: -4 + 0.5 * Math.cos(t * 0.7), z: ZP + 1.5 + 0.5 * Math.sin(t * 1.1), a: 0.6 + 0.25 * t });
    const aT = 2 * Math.PI * Math.round(drift2(S0 + 3.0).a / (2 * Math.PI));
    const preM = { x: M.x + 0.5, y: M.y - 3.5, z: ZP, a: aT }, away = { x: M.x + 3, y: M.y - 4, z: ZP + 5, a: aT + 1.5 };
    let M2;
    if (T < S0 + 3.0) M2 = lerpM(drift2(T), preM, MOTION.move(T, S0 + 0.6, S0 + 3.0));
    else {
      const s = 3 - 1.5 * MOTION.enter(T, S0 + 3.0, S0 + 3.6) + 0.4 * MOTION.move(T, S0 + 3.7, S0 + 3.95) - 0.4 * MOTION.move(T, S0 + 3.95, S0 + 4.2)
        + 0.4 * MOTION.move(T, S0 + 4.35, S0 + 4.6) - 0.4 * MOTION.move(T, S0 + 4.6, S0 + 4.85);
      M2 = lerpM({ x: M.x + 0.5, y: M.y - 0.5 - s, z: ZP, a: aT }, away, MOTION.move(T, S0 + 5.2, S0 + 7.0));
      const w = cl((T - S0 - 7.0) / 2);
      M2.z += 0.4 * Math.sin((T - S0 - 7.0) * 1.1) * w; M2.a += 0.2 * (T - S0 - 7.0) * w;
    }
    smartC(b, M2, appear * wash);
    b.anchor('reject', 0.5, 0.5, 1.2, M2);
    const M3 = { x: -5 + 0.5 * Math.sin(T * 0.8), y: 3 + 0.6 * Math.cos(T * 0.6), z: ZP + 6 + 0.4 * Math.sin(T * 1.3), a: -0.4 - 0.2 * T };
    smartC(b, M3, appear * wash);
  }
  b.anchor('Mtop', M.x, M.y, zk(9) + 1.4); b.anchor('Ntop', N.x, N.y, zk(7) + 1.4);

  // SA-PE on A and F
  if (T >= I0) {
    const sa = (bd, t0) => {
      const e = MOTION.enter(T, t0, t0 + 1.8);
      const g = MOTION.enter(T, t0 + 1.7, t0 + 3.0) * (0.88 + 0.12 * Math.sin(T * 2.4));
      const Ms = { x: bd.x + 1, y: bd.y - 4, z: ZP + 1.0 + 12 * (1 - e), a: 1.4 * (1 - e) };
      saPE(b, Ms, cl((T - t0 + 0.1) / 0.4), g);
      return Ms;
    };
    b.anchor('sape', 1, 1, 2.4, sa(A, I0 + 0.4));
    b.anchor('peF', 0, 0, 2.4, sa(F, I0 + 0.8));
    b.anchor('peA', 1, -4, ZP + 3.6);
  }
  b.anchor('biotin', 1, -4, ZP + 0.6);

  const calls = [
    { a: b.anchors.bead, dx: -140, dy: -40, text: 'Magnetic bead', sub: 'colour-coded region 122', o: fadeIO(T, B0 + 1.2, B0 + 6.8) },
    { a: b.anchors.probe, dx: -170, dy: -40, text: 'Abasic PNA probe', o: fadeIO(T, B0 + 3.6, C0 + 1.0) },
    { a: b.anchors.blank, dx: -230, dy: 70, text: 'Blank position', o: fadeIO(T, B0 + 4.6, C0 + 1.0) },
    { a: b.anchors.mA, dx: 60, dy: -90, text: 'miR-122', sub: 'region 122', o: fadeIO(T, C0 + 2.6, C0 + 4.6) },
    { a: b.anchors.mF, dx: -60, dy: -90, text: 'miR-451', sub: 'region 451', o: fadeIO(T, C0 + 2.8, C0 + 4.6) },
    { a: b.anchors.G, dx: 200, dy: 70, text: 'G', sub: 'opposite the blank', o: fadeIO(T, C0 + 6.2, L0 + 1.4) },
    { a: b.anchors.smart, dx: -120, dy: -110, text: 'SMART-C-Biotin', o: fadeIO(T, L0 + 0.9, L0 + 4.0) },
    { a: b.anchors.blank, dx: -240, dy: -150, text: 'Reduction', sub: 'NaBH\u2083CN · covalent lock', o: fadeIO(T, L0 + 7.2, L0 + 9.8) },
    { a: b.anchors.Abase, dx: 200, dy: -110, text: 'A', sub: 'not G', o: fadeIO(T, S0 + 2.2, S0 + 5.4) },
    { a: b.anchors.reject, dx: -170, dy: 120, text: 'SMART-C cannot pair', o: fadeIO(T, S0 + 3.8, S0 + 6.6) },
    { a: b.anchors.blank && b.P(null, M.x + 1, M.y - 0.5, ZP + 0.6), dx: 200, dy: 60, text: 'No label', o: fadeIO(T, S0 + 6.4, S0 + 8.6) },
    { a: b.anchors.biotin, dx: -220, dy: 60, text: 'Biotin', o: fadeIO(T, I0 + 0.2, I0 + 2.2) },
    { a: b.anchors.sape, dx: -200, dy: -90, text: 'Streptavidin-phycoerythrin', o: fadeIO(T, I0 + 1.8, I0 + 3.9) },
    { a: b.anchors.peA, dx: -90, dy: -120, text: 'miR-122', o: fadeIO(T, I0 + 4.4, C.Instrument - 0.2) },
    { a: b.anchors.peF, dx: -90, dy: -120, text: 'miR-451', o: fadeIO(T, I0 + 4.5, C.Instrument - 0.2) },
    { a: b.anchors.Mtop, dx: 110, dy: 60, text: 'Mismatch', sub: 'no signal', o: fadeIO(T, I0 + 4.6, C.Instrument - 0.2) },
    { a: b.anchors.Ntop, dx: 90, dy: -80, text: 'No target', sub: 'no signal', o: fadeIO(T, I0 + 4.7, C.Instrument - 0.2) },
  ];
  return <div style={{ position: 'absolute', inset: 0 }}>{b.render()}<Callouts items={calls} on={tw.callouts} /></div>;
}

/* ---------- world 3: flow cell ---------- */
const FLOW = { v: 2.3, gap: 5, xr: -3, xg: 3.5, seq: 'ABAABBABAABABBA' };
const REGION = { A: { band: COL.action, amp: 1, name: 'miR-122', reg: '122' }, B: { band: COL.teal, amp: 0.6, name: 'miR-451', reg: '451' } };
const flowX = (i, t, R0) => -16 + FLOW.v * (t - R0 + 3) - FLOW.gap * i;
const flowType = i => FLOW.seq[i % FLOW.seq.length];

function FlowWorld({ T, C, tw }) {
  if (!(T >= C.Read && T < C.Close)) return null;
  const R0 = C.Read, { xr, xg } = FLOW;
  const keys = [K(R0, -1, 0, 5, 40, 0.5, VW * 0.36), K(R0 + 2.4, -3, 0, 5.6, 78, 0.42, VW * 0.36), K(R0 + 4.4, -2.5, 0, 5.6, 76, 0.44, VW * 0.36),
    K(R0 + 5.6, 3.5, 0, 5.6, 80, 0.5, VW * 0.36), K(R0 + 8.2, 3.5, 0, 5.6, 76, 0.52, VW * 0.36), K(R0 + 10, 0, 0, 5, 42, 0.56, VW * 0.36), K(C.Close, 0, 0, 5, 40, 0.6, VW * 0.36)];
  const k = camAt(T, keys); if (tw.orbit) k.yaw += 0.01 * (T - R0);
  const b = new Bld(makeCam(k), 'f');
  b.floor(-15, -9, 30, 16, COL.floor);
  [-11, 11].forEach(x => b.box(x - 0.5, -0.5, 0, 1, 1, 5.0, '#dfe5f2', { studs: false }));
  const gl = COL.glass;
  b.box(-14, 0.6, 5.0, 28, 0.2, 1.6, gl, { studs: false, op: 0.35 });
  b.box(-14, -0.8, 5.0, 28, 1.6, 0.2, gl, { studs: false, op: 0.4 });
  b.box(-14, -0.8, 6.4, 28, 1.6, 0.2, gl, { studs: false, op: 0.22, bias: -30 });
  b.box(-14, -0.8, 5.0, 28, 0.2, 1.6, gl, { studs: false, op: 0.18, bias: -30 });
  let er0 = 0, eg0 = 0;
  for (let i = 0; i < 16; i++) {
    const x = flowX(i, T, R0); if (x < -14.4 || x > 14.4) continue;
    const rg = REGION[flowType(i)], er = cl(1 - Math.abs(x - xr) / 0.8), eg = cl(1 - Math.abs(x - xg) / 1.1);
    const op = cl((x + 14.4) / 0.8) * cl((14.4 - x) / 0.8);
    bead(b, x, 0, 5.25, 0.55, mixc(rg.band, '#ffffff', er * 0.55), { n: 4, op });
    b.cyl(x, 0, 6.35, 0.22, 0.12, COL.pe, { op });
    b.glow(x, 0, 5.8, 1.3, COL.red, er * 0.75, { bias: -40 });
    b.glow(x, 0, 5.8, 1.6 + 1.8 * rg.amp, COL.pe, eg * (0.4 + 0.6 * rg.amp), { bias: -40 });
    b.glow(x, 0, 5.8, 1.4 * rg.amp, '#ffd27a', eg * rg.amp, { bias: -41 });
    eg0 = Math.max(eg0, eg * rg.amp); er0 = Math.max(er0, er);
    if (i < 2) b.anchor('b' + i, x, 0, 6.6);
  }
  const laser = (x, col) => {
    b.box(x - 1.2, -7, 3.8, 2.4, 2.6, 3, COL.white, { studs: true });
    b.box(x - 0.35, -4.4, 5.45, 0.7, 0.2, 0.7, col, { studs: false });
    b.box(x - 1, 3.6, 4.2, 2, 2.4, 3.2, COL.dark);
    b.box(x - 0.35, 3.4, 5.45, 0.7, 0.2, 0.7, '#3d4a74', { studs: false });
  };
  laser(xr, COL.red); laser(xg, COL.green);
  b.beam([xr, -4.4, 5.8], [xr, 3.4, 5.8], COL.red, cl((T - R0 - 0.3) / 0.4));
  b.beam([xg, -4.4, 5.8], [xg, 3.4, 5.8], COL.green, cl((T - R0 - 0.5) / 0.4));
  b.glow(xr, 3.4, 5.8, 1.6, COL.red, er0 * 0.8, { bias: -50 });
  b.glow(xg, 3.4, 5.8, 2, COL.pe, eg0 * 0.9, { bias: -50 });
  b.anchor('lr', xr, -5.7, 6.8); b.anchor('lg', xg, -5.7, 6.8);
  const calls = [
    { a: b.anchors.lr, dx: -120, dy: 110, text: 'Red laser', sub: '635 nm', o: fadeIO(T, R0 + 0.9, R0 + 4.2) },
    { a: b.anchors.b0, dx: -60, dy: -120, text: 'Region 122', o: fadeIO(T, R0 + 2.4, R0 + 4.2) },
    { a: b.anchors.b1, dx: -60, dy: -120, text: 'Region 451', o: fadeIO(T, R0 + 4.4, R0 + 5.8) },
    { a: b.anchors.lg, dx: 110, dy: 110, text: 'Green laser', sub: '532 nm', o: fadeIO(T, R0 + 5.0, R0 + 8) },
    { a: b.anchors.b0, dx: 60, dy: -120, text: 'PE signal', o: fadeIO(T, R0 + 5.6, R0 + 7.4) },
  ];
  return <div style={{ position: 'absolute', inset: 0 }}>{b.render()}<Callouts items={calls} on={tw.callouts} /></div>;
}

function Readout({ T, C }) {
  const o = fadeIO(T, C.Read + 0.6, C.Close - 0.1, 0.5);
  if (o <= 0) return null;
  const R0 = C.Read, W = 456, H1 = 130, win = 6, t0 = T - win;
  let d = '';
  for (let s = 0; s <= 120; s++) {
    const ts = t0 + (s / 120) * win; let v = 0;
    if (ts >= R0) for (let i = 0; i < 16; i++) v += REGION[flowType(i)].amp * Math.exp(-Math.pow((flowX(i, ts, R0) - FLOW.xg) / 0.45, 2));
    d += (s ? 'L' : 'M') + ((s / 120) * W).toFixed(1) + ',' + (H1 - 8 - v * (H1 - 24)).toFixed(1);
  }
  const ticks = [], cnt = { A: 0, B: 0 };
  for (let i = 0; i < 16; i++) {
    const tp = R0 - 3 + (FLOW.xr + 16 + FLOW.gap * i) / FLOW.v, tg = R0 - 3 + (FLOW.xg + 16 + FLOW.gap * i) / FLOW.v;
    if (tg <= T) cnt[flowType(i)]++;
    if (tp >= Math.max(t0, R0) && tp <= T) ticks.push({ x: ((tp - t0) / win) * W, c: REGION[flowType(i)].band });
  }
  const lab = { font: '700 22px Inter, system-ui, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: COL.blue };
  const row = { display: 'flex', alignItems: 'center', gap: 12, font: '600 24px Inter, system-ui, sans-serif', color: COL.ink };
  const dot = c => ({ width: 14, height: 14, borderRadius: 999, background: c, flex: 'none' });
  return (
    <div style={{ position: 'absolute', right: 80, top: 130, width: W + 64, boxSizing: 'border-box', padding: 32, background: '#ffffff', borderRadius: 24, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 16px 48px rgba(0,57,202,0.14), 0 2px 6px rgba(0,0,0,0.05)', opacity: o, transform: `translateY(${(1 - o) * 16}px)`, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={lab}>Luminex read</div>
        <div style={{ font: '600 34px Inter, system-ui, sans-serif', color: COL.ink, letterSpacing: '-0.01em' }}>One well, two miRNAs</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={row}><span style={dot(COL.red)}></span>Bead code<span style={{ fontWeight: 400, color: COL.muted }}>which miRNA</span></div>
        <svg width={W} height={40} style={{ display: 'block', background: '#f5f7ff', borderRadius: 10 }}>
          {ticks.map((t, k) => <rect key={k} x={t.x - 3} y={6} width={6} height={28} rx={3} fill={t.c} />)}
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={row}><span style={dot(COL.green)}></span>PE reporter<span style={{ fontWeight: 400, color: COL.muted }}>how much</span></div>
        <svg width={W} height={H1} style={{ display: 'block', background: '#f5f7ff', borderRadius: 10 }}>
          <path d={d + `L${W},${H1}L0,${H1}Z`} fill={COL.pe} fillOpacity="0.14" />
          <path d={d} fill="none" stroke={COL.pe} strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 18 }}>
        {['A', 'B'].map(r => (
          <div key={r} style={{ display: 'grid', gridTemplateColumns: '150px minmax(0,1fr) 44px', alignItems: 'center', gap: 16 }}>
            <span style={row}><span style={dot(REGION[r].band)}></span>{REGION[r].name}</span>
            <span style={{ height: 12, borderRadius: 999, background: '#f0f5ff', overflow: 'hidden' }}>
              <span style={{ display: 'block', height: '100%', width: `${Math.min(1, cnt[r] / 2) * REGION[r].amp * 100}%`, background: COL.pe, borderRadius: 999 }}></span>
            </span>
            <span style={{ font: '700 28px Inter, system-ui, sans-serif', color: COL.blue, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{cnt[r]}</span>
          </div>
        ))}
        <span style={{ font: '400 22px Inter, system-ui, sans-serif', color: COL.muted }}>Bar: PE signal · number: beads read</span>
      </div>
    </div>
  );
}

/* ---------- identity + text overlays ---------- */
function Intro({ T, C }) {
  if (T >= C.Title + 0.05) return null;
  const e = MOTION.enter(T, 0.35, 1.6), out = 1 - MOTION.move(T, C.Title - 0.7, C.Title);
  const lab = MOTION.enter(T, 1.3, 2.3);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 44, opacity: out }}>
      <div style={{ clipPath: `inset(0 ${(1 - e) * 100}% 0 0)`, transform: `translateY(${(1 - e) * 18}px) scale(${1 + 0.03 * cl(T / C.Title)})` }}>
        <img src="assets/logotype-secondary-blue.png" alt="Destina Genomics" style={{ height: 220, width: 'auto', display: 'block' }} />
      </div>
      <div style={{ opacity: lab, transform: `translateY(${(1 - lab) * 10}px)`, font: '700 26px Inter, system-ui, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', color: COL.blue }}>Dynamic Chemical Labelling</div>
    </div>
  );
}
function Bug({ T, C }) {
  const o = fadeIO(T, C.Title + 0.8, C.Close + 0.1, 0.5);
  if (o <= 0) return null;
  return <img src="assets/wordmark-secondary-blue.png" alt="Destina Genomics" style={{ position: 'absolute', right: 80, bottom: 84, height: 26, width: 'auto', opacity: o * 0.9 }} />;
}
function TitleCard({ T, C }) {
  const T0 = C.Title;
  const o = MOTION.enter(T, T0 + 0.4, T0 + 1.4) * (1 - MOTION.move(T, C.Sample - 0.7, C.Sample - 0.1));
  if (o <= 0.01) return null;
  return (
    <div style={{ position: 'absolute', left: 120, top: '50%', width: 860, opacity: o, transform: `translateY(calc(-50% + ${(1 - o) * 24}px))`, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ font: '700 24px Inter, system-ui, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: COL.blue }}>How it works</div>
      <div style={{ font: '900 112px/1.0 Inter, system-ui, sans-serif', letterSpacing: '-0.04em', color: COL.ink }}>
        Dynamic Chemical <span style={{ color: COL.blue }}>Labelling</span>
      </div>
      <div style={{ font: '400 36px/1.45 Inter, system-ui, sans-serif', color: COL.muted, maxWidth: 780, textWrap: 'pretty' }}>
        Reading miR-122 and miR-451 directly from serum, with single-base resolution.
      </div>
    </div>
  );
}
function StepChip({ T, C }) {
  const steps = [
    { a: C.Sample, b: C.Bead, n: '', t: 'Sample' }, { a: C.Bead, b: C.Label, n: '1', t: 'Capture' },
    { a: C.Label, b: C.SingleBase, n: '2', t: 'Dynamic Chemical Labelling' }, { a: C.SingleBase, b: C.Illuminate, n: '2', t: 'Single-base resolution' },
    { a: C.Illuminate, b: C.Instrument, n: '3', t: 'Biotin recognition' }, { a: C.Instrument, b: C.Close, n: '4', t: 'Multiplex read' },
  ];
  const s = steps.find(x => T >= x.a && T < x.b); if (!s) return null;
  const o = fadeIO(T, s.a + 0.2, s.b - 0.05, 0.3);
  return (
    <div style={{ position: 'absolute', left: 80, top: 64, display: 'flex', alignItems: 'center', gap: 16, padding: s.n ? '10px 30px 10px 10px' : '14px 30px', background: '#ffffff', borderRadius: 999, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 24px rgba(0,57,202,0.12)', opacity: o }}>
      {s.n && <span style={{ width: 52, height: 52, borderRadius: 999, background: COL.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 26px Inter, system-ui, sans-serif' }}>{s.n}</span>}
      <span style={{ font: '600 28px Inter, system-ui, sans-serif', color: COL.ink, letterSpacing: '-0.01em' }}>{s.t}</span>
    </div>
  );
}
function ScaleNote({ T, C }) {
  const o = Math.max(fadeIO(T, C.Bead + 0.4, C.Instrument - 0.1), fadeIO(T, C.Read + 0.4, C.Close - 0.1));
  if (o <= 0) return null;
  return <div style={{ position: 'absolute', right: 80, top: 80, opacity: o, font: '700 24px Inter, system-ui, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', color: COL.muted }}>Not to scale</div>;
}
function EndCard({ T, C }) {
  const o = MOTION.enter(T, C.Close + 0.4, C.Close + 1.4);
  if (T < C.Close || o <= 0.01) return null;
  const chip = { padding: '10px 22px', borderRadius: 999, background: '#f0f5ff', color: COL.blue, font: '600 24px Inter, system-ui, sans-serif' };
  return (
    <div style={{ position: 'absolute', right: 120, top: '50%', width: 760, boxSizing: 'border-box', padding: 56, background: '#ffffff', borderRadius: 32, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 24px 64px rgba(0,57,202,0.16), 0 2px 6px rgba(0,0,0,0.05)', opacity: o, transform: `translateY(calc(-50% + ${(1 - o) * 28}px))`, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <img src="assets/logotype-secondary-blue.png" alt="Destina Genomics" style={{ height: 88, width: 'auto', alignSelf: 'flex-start' }} />
      <div style={{ font: '700 68px/1.05 Inter, system-ui, sans-serif', letterSpacing: '-0.02em', color: COL.blue }}>Read the miRNA itself.</div>
      <div style={{ font: '400 30px/1.5 Inter, system-ui, sans-serif', color: COL.ink, textWrap: 'pretty' }}>One chemical base, templated by a single target nucleotide, turns each captured miRNA into a fluorescent bead.</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <span style={chip}>No RNA extraction</span><span style={chip}>No PCR</span><span style={chip}>Single-base resolution</span><span style={chip}>Multiplex</span>
      </div>
      <div style={{ font: '400 24px/1.4 Inter, system-ui, sans-serif', color: COL.muted }}>destina-genomics.com</div>
    </div>
  );
}

function Piece({ tw }) {
  const { T, CUES: C, authoredTotal } = useComposition();
  const cuts = [C.Bead, C.Instrument, C.Read, C.Close];
  const flash = Math.max(cl(1 - T / 0.4), cl(1 - (authoredTotal - T) / 0.5), ...cuts.map(c => tri(T, c, 0.35)));
  const capStyle = {
    left: 80, right: 'auto', bottom: 72, maxWidth: 1180, textAlign: 'left', color: COL.ink, textShadow: 'none',
    font: '600 34px/1.35 Inter, system-ui, sans-serif', letterSpacing: '-0.01em', background: 'rgba(255,255,255,0.94)',
    padding: '22px 32px', borderRadius: 20, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 12px 32px rgba(0,57,202,0.12)', textWrap: 'pretty',
  };
  const caps = [
    { at: C.Sample + 0.3, until: C.Bead - 0.3, text: 'Serum goes straight onto a mix of colour-coded beads. No RNA extraction, no PCR.' },
    { at: C.Bead + 0.6, until: C.Capture, text: 'Each bead region carries its own abasic PNA probe, with one blank position.' },
    { at: C.Capture + 0.4, text: 'Each miRNA hybridises to its own bead: miR-122 and miR-451 in the same well.' },
    { at: C.Capture + 5.0, text: 'Opposite the blank position sits a single guanine.' },
    { at: C.Label + 0.4, text: 'SMART-C-Biotin samples the blank position reversibly.' },
    { at: C.Label + 4.4, text: 'It is held only where it can pair with that guanine.' },
    { at: C.Label + 7.0, until: C.SingleBase, text: 'Reduction then locks it covalently onto the probe backbone.' },
    { at: C.SingleBase + 0.4, text: 'A related strand hybridises too, but carries A opposite the blank.' },
    { at: C.SingleBase + 4.6, until: C.Illuminate, text: 'SMART-C pairs only with G, so nothing is incorporated: single-base resolution.' },
    { at: C.Illuminate + 0.4, text: 'Streptavidin-phycoerythrin binds the biotin and makes labelled beads fluorescent.' },
    { at: C.Illuminate + 4.2, until: C.Instrument - 0.2, text: 'Only perfectly templated probes light up. Mismatched and empty beads stay dark.' },
    { at: C.Instrument + 0.4, until: C.Read - 0.2, text: 'The plate is read on a Luminex xMAP instrument.' },
    { at: C.Read + 0.5, text: 'A red laser reads each bead\u2019s colour code: which miRNA.' },
    { at: C.Read + 5.0, text: 'A green laser excites phycoerythrin: how much miRNA.' },
    { at: C.Read + 9.2, until: C.Close - 0.2, text: 'Both miRNAs are measured in the same well, bead by bead.' },
  ];
  return (
    <div data-screen-label={`t=${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(0,57,202,0.07), rgba(0,57,202,0) 70%), linear-gradient(180deg, #e9f0ff 0%, #ffffff 75%)' }}>
      <PlateWorld T={T} C={C} tw={tw} />
      <MolWorld T={T} C={C} tw={tw} />
      <FlowWorld T={T} C={C} tw={tw} />
      <Readout T={T} C={C} />
      <Intro T={T} C={C} />
      <TitleCard T={T} C={C} />
      <StepChip T={T} C={C} />
      <ScaleNote T={T} C={C} />
      <EndCard T={T} C={C} />
      <Bug T={T} C={C} />
      {tw.captions && <Captions items={caps} style={capStyle} />}
      <div style={{ position: 'absolute', inset: 0, background: '#f7f9ff', opacity: flash, pointerEvents: 'none' }}></div>
    </div>
  );
}

function DCLExplainer() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, callouts: true, captions: true, orbit: true });
  return (
    <React.Fragment>
      <CompositionStage width={VW} height={VH} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#f5f7ff">
        <Piece tw={t} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Video" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
        <TweakToggle label="Callouts" value={t.callouts} onChange={v => setTweak('callouts', v)} />
        <TweakToggle label="Captions" value={t.captions} onChange={v => setTweak('captions', v)} />
        <TweakToggle label="Camera drift" value={t.orbit} onChange={v => setTweak('orbit', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.DCLExplainerV2 = DCLExplainer;
