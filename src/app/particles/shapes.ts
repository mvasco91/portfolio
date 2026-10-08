/**
 * Point-cloud generators for the particle field.
 * Every generator returns exactly `count` points (x, y, z) in world units,
 * so the field can morph between any two shapes particle by particle.
 */

export type ShapeName = 'scatter' | 'network' | 'shield' | 'phone' | 'spiral' | 'globe';

export interface Frame {
  /** Visible width and height of the z = 0 plane, in world units. */
  width: number;
  height: number;
  /** Below ~1080px the layout stacks, so shapes are centred behind the text instead of pushed right. */
  narrow: boolean;
  /** Phones. */
  compact: boolean;
}

type Pt = [number, number];

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

/** Spread `count` points along a polyline, proportionally to segment length. */
function alongPath(path: Pt[], count: number, jitter: number, closed = true): Pt[] {
  const segs: { a: Pt; b: Pt; len: number }[] = [];
  const n = closed ? path.length : path.length - 1;
  for (let i = 0; i < n; i++) {
    const a = path[i];
    const b = path[(i + 1) % path.length];
    segs.push({ a, b, len: Math.hypot(b[0] - a[0], b[1] - a[1]) });
  }
  const total = segs.reduce((s, x) => s + x.len, 0);
  const out: Pt[] = [];
  for (let i = 0; i < count; i++) {
    let d = Math.random() * total;
    let s = segs[0];
    for (const seg of segs) {
      if (d <= seg.len) { s = seg; break; }
      d -= seg.len;
    }
    const t = s.len ? d / s.len : 0;
    out.push([s.a[0] + (s.b[0] - s.a[0]) * t + gauss() * jitter, s.a[1] + (s.b[1] - s.a[1]) * t + gauss() * jitter]);
  }
  return out;
}

function toBuffer(points: Pt[], count: number, depth: number, offset: Pt): Float32Array {
  const buf = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const p = points[i % points.length];
    buf[i * 3] = p[0] + offset[0];
    buf[i * 3 + 1] = p[1] + offset[1];
    buf[i * 3 + 2] = gauss() * depth;
  }
  return buf;
}

/** Where secondary shapes sit: to the right of the reading column on wide screens. */
function anchor(frame: Frame): Pt {
  return frame.narrow ? [0, frame.height * 0.02] : [frame.width * 0.27, 0];
}

function shapeSize(frame: Frame): number {
  return frame.narrow ? Math.min(frame.width * 0.78, frame.height * 0.42) : Math.min(frame.width * 0.3, frame.height * 0.62);
}

/* -- Scatter: a loose cloud in depth, invisible on the hero ----------------- */

function scatterBuffer(count: number, frame: Frame): Float32Array {
  const buf = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    buf[i * 3] = rand(-0.8, 0.8) * frame.width;
    buf[i * 3 + 1] = rand(-0.9, 0.9) * frame.height;
    buf[i * 3 + 2] = rand(-14, 4);
  }
  return buf;
}

/* -- Network: nodes and edges, like a component or signal graph ------------- */

function networkShape(count: number, frame: Frame): Pt[] {
  const r = shapeSize(frame) / 2;
  const nodes: Pt[] = [[0, 0]];
  const ring1 = 6;
  const ring2 = 9;
  for (let i = 0; i < ring1; i++) {
    const a = (i / ring1) * Math.PI * 2 + 0.3;
    nodes.push([Math.cos(a) * r * 0.5, Math.sin(a) * r * 0.5]);
  }
  for (let i = 0; i < ring2; i++) {
    const a = (i / ring2) * Math.PI * 2;
    nodes.push([Math.cos(a) * r, Math.sin(a) * r * 0.92]);
  }
  const edges: [number, number][] = [];
  for (let i = 1; i <= ring1; i++) {
    edges.push([0, i]);
    edges.push([i, (i % ring1) + 1]);
  }
  for (let j = 0; j < ring2; j++) {
    const outer = 1 + ring1 + j;
    const inner = 1 + Math.round((j / ring2) * ring1) % ring1;
    edges.push([inner, outer]);
    if (j % 2 === 0) edges.push([outer, 1 + ring1 + ((j + 1) % ring2)]);
  }
  const pts: Pt[] = [];
  const nodeShare = Math.floor(count * 0.42);
  for (let i = 0; i < nodeShare; i++) {
    const n = nodes[i % nodes.length];
    const big = i % nodes.length === 0 ? 1.6 : 1;
    pts.push([n[0] + gauss() * r * 0.05 * big, n[1] + gauss() * r * 0.05 * big]);
  }
  for (let i = nodeShare; i < count; i++) {
    const [a, b] = edges[Math.floor(Math.random() * edges.length)];
    const t = Math.random();
    const A = nodes[a];
    const B = nodes[b];
    pts.push([A[0] + (B[0] - A[0]) * t + gauss() * r * 0.008, A[1] + (B[1] - A[1]) * t + gauss() * r * 0.008]);
  }
  return pts;
}

/* -- Shield with a check mark: security in banking and insurance ------------ */

function shieldShape(count: number, frame: Frame): Pt[] {
  const h = shapeSize(frame);
  const w = h * 0.8;
  const outline: Pt[] = [];
  const top = h * 0.5;
  outline.push([-w / 2, top * 0.82]);
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    outline.push([-w / 2 + w * t, top * 0.82 + Math.sin(t * Math.PI) * top * 0.18]);
  }
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const y = top * 0.82 - t * (top * 0.82 + h * 0.5);
    const x = (w / 2) * Math.cos(t * Math.PI * 0.5) ** 0.9;
    outline.push([x, y]);
  }
  for (let i = 20; i >= 0; i--) {
    const t = i / 20;
    const y = top * 0.82 - t * (top * 0.82 + h * 0.5);
    const x = -(w / 2) * Math.cos(t * Math.PI * 0.5) ** 0.9;
    outline.push([x, y]);
  }
  const inner = outline.map(([x, y]) => [x * 0.82, y * 0.82 - h * 0.02] as Pt);
  const check: Pt[] = [[-w * 0.2, 0], [-w * 0.04, -h * 0.15], [w * 0.24, h * 0.16]];
  return [
    ...alongPath(outline, Math.floor(count * 0.45), h * 0.006),
    ...alongPath(inner, Math.floor(count * 0.2), h * 0.004),
    ...alongPath(check, count - Math.floor(count * 0.45) - Math.floor(count * 0.2), h * 0.01, false),
  ];
}

/* -- Phone: web and mobile apps -------------------------------------------- */

function roundedRect(w: number, h: number, r: number): Pt[] {
  const pts: Pt[] = [];
  const corners: [number, number, number][] = [
    [w / 2 - r, h / 2 - r, 0],
    [-w / 2 + r, h / 2 - r, Math.PI / 2],
    [-w / 2 + r, -h / 2 + r, Math.PI],
    [w / 2 - r, -h / 2 + r, Math.PI * 1.5],
  ];
  for (const [cx, cy, start] of corners) {
    for (let i = 0; i <= 8; i++) {
      const a = start + (i / 8) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
  }
  return pts;
}

function phoneShape(count: number, frame: Frame): Pt[] {
  const h = shapeSize(frame);
  const w = h * 0.5;
  const body = roundedRect(w, h, w * 0.16);
  const screen = roundedRect(w * 0.86, h * 0.9, w * 0.1);
  const pts: Pt[] = [
    ...alongPath(body, Math.floor(count * 0.36), h * 0.004),
    ...alongPath(screen, Math.floor(count * 0.18), h * 0.003),
  ];
  // UI rows inside the screen: a header bar, cards and a tab bar.
  const rows: [number, number, number][] = [
    [h * 0.33, w * 0.6, 3],
    [h * 0.18, w * 0.62, 2],
    [h * 0.06, w * 0.62, 2],
    [-h * 0.06, w * 0.62, 2],
    [-h * 0.18, w * 0.42, 2],
    [-h * 0.36, w * 0.6, 1],
  ];
  const left = count - pts.length;
  for (let i = 0; i < left; i++) {
    const [y, len, thick] = rows[i % rows.length];
    pts.push([rand(-len / 2, len / 2), y + gauss() * h * 0.006 * thick]);
  }
  return pts;
}

/* -- Globe (built inline below): open to remote work and relocation ------- */

/* -- Spiral: phyllotaxis, the growth pattern of a sunflower ---------------- */

function spiralShape(count: number, frame: Frame): Pt[] {
  const r = shapeSize(frame) / 2;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts: Pt[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const rad = Math.sqrt(t) * r;
    const th = i * golden;
    pts.push([Math.cos(th) * rad, Math.sin(th) * rad]);
  }
  return pts;
}

export function buildShape(name: ShapeName, count: number, frame: Frame): Float32Array {
  switch (name) {
    case 'scatter':
      return scatterBuffer(count, frame);
    case 'network':
      return toBuffer(networkShape(count, frame), count, shapeSize(frame) * 0.06, anchor(frame));
    case 'shield':
      return toBuffer(shieldShape(count, frame), count, shapeSize(frame) * 0.03, anchor(frame));
    case 'spiral':
      return toBuffer(spiralShape(count, frame), count, shapeSize(frame) * 0.015, anchor(frame));
    case 'phone':
      return toBuffer(phoneShape(count, frame), count, shapeSize(frame) * 0.02, anchor(frame));
    case 'globe': {
      const r = shapeSize(frame) / 2;
      const [ax, ay] = anchor(frame);
      const buf = new Float32Array(count * 3);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const th = golden * i;
        buf[i * 3] = Math.cos(th) * rad * r + ax;
        buf[i * 3 + 1] = y * r + ay;
        buf[i * 3 + 2] = Math.sin(th) * rad * r;
      }
      return buf;
    }
  }
}
