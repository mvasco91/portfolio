import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import { Frame, ShapeName, buildShape } from './shapes';

export interface FieldPalette {
  colors: [number, number, number][];
  additive: boolean;
  size: number;
  opacity: number;
}

const FOV = 50;
const DISTANCE = 10;

const vertexShader = /* glsl */ `
  attribute vec3 color;
  attribute float seed;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uTime;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vColor = color;
    vTwinkle = 0.65 + 0.35 * sin(uTime * 1.7 + seed * 40.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.6 + seed * 0.8) * (${DISTANCE.toFixed(1)} / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * uOpacity * vTwinkle);
  }
`;

/**
 * Framework-free particle engine. The Angular component owns its lifecycle and
 * tells it which shape to show; everything per-frame stays outside change detection.
 */
export class ParticleField {
  private readonly renderer: WebGLRenderer;
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
  private readonly geometry = new BufferGeometry();
  private readonly material: ShaderMaterial;
  private readonly points: Points;

  private count = 0;
  private frame: Frame = { width: 1, height: 1, narrow: false, compact: false };
  private current = new Float32Array(0);
  private target: Float32Array = new Float32Array(0);
  private push = new Float32Array(0);
  private display = new Float32Array(0);
  private speed = new Float32Array(0);
  private shape: ShapeName = 'scatter';
  private opacity = 0;
  private opacityTarget = 0;
  private shapes = new Map<ShapeName, Float32Array>();

  private mouse = { x: 9999, y: 9999, active: false };
  private tilt = { x: 0, y: 0 };
  private raf = 0;
  private start = performance.now();
  private last = performance.now();
  private running = false;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private animate: boolean,
  ) {
    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.set(0, 0, DISTANCE);
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uSize: { value: 3 },
        uPixelRatio: { value: 1 },
        uTime: { value: 0 },
        uOpacity: { value: 1 },
      },
    });
    this.points = new Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  /** Recomputes sizes and every shape. Call on start and on resize. */
  resize(width: number, height: number): void {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.material.uniforms['uPixelRatio'].value = ratio;

    const visibleH = 2 * Math.tan((FOV * Math.PI) / 360) * DISTANCE;
    const narrow = width < 1080;
    const compact = width < 700;
    this.frame = { width: visibleH * (width / height), height: visibleH, narrow, compact };

    // Fewer particles on small or low-power screens keeps it smooth on phones.
    const area = width * height;
    const nextCount = compact ? Math.min(4200, Math.round(area / 78)) : Math.min(7000, Math.round(area / 190));
    if (nextCount !== this.count) this.allocate(nextCount);

    this.shapes.clear();
    for (const name of ['scatter', 'network', 'shield', 'phone', 'spiral', 'globe'] as ShapeName[]) {
      this.shapes.set(name, buildShape(name, this.count, this.frame));
    }
    this.target = this.shapes.get(this.shape)!;
    if (!this.animate) this.snap();
    this.render();
  }

  setShape(name: ShapeName): void {
    this.shape = name;
    const next = this.shapes.get(name);
    if (next) this.target = next;
    if (!this.animate) {
      this.snap();
      this.render();
    }
  }

  setPalette(p: FieldPalette): void {
    const colors = new Float32Array(this.count * 3);
    for (let i = 0; i < this.count; i++) {
      // Mostly brand greens, with roughly 1 in 14 particles in the warm "signal" colour.
      const c = i % 14 === 0 ? p.colors[p.colors.length - 1] : p.colors[i % (p.colors.length - 1)];
      colors.set(c, i * 3);
    }
    this.geometry.setAttribute('color', new BufferAttribute(colors, 3));
    this.material.blending = p.additive ? AdditiveBlending : NormalBlending;
    this.material.uniforms['uSize'].value = p.size;
    this.applyOpacity();
    this.material.needsUpdate = true;
    this.palette = p;
    this.render();
  }
  private palette?: FieldPalette;

  /** Fades the whole field; eased per frame so sections cross-fade smoothly. */
  setOpacity(value: number): void {
    this.opacityTarget = value;
    if (!this.animate) {
      this.opacity = value;
      this.applyOpacity();
      this.render();
    }
  }

  private applyOpacity(): void {
    this.material.uniforms['uOpacity'].value = this.opacity * (this.palette?.opacity ?? 1);
  }

  setAnimate(animate: boolean): void {
    this.animate = animate;
    if (animate) this.play();
    else {
      this.pause();
      this.snap();
      this.render();
    }
  }

  /** Pointer position in CSS pixels relative to the viewport. */
  pointer(x: number, y: number, width: number, height: number): void {
    const nx = (x / width) * 2 - 1;
    const ny = -((y / height) * 2 - 1);
    this.mouse.x = (nx * this.frame.width) / 2;
    this.mouse.y = (ny * this.frame.height) / 2;
    this.mouse.active = true;
    this.tilt.x = ny * 0.08;
    this.tilt.y = nx * 0.12;
  }

  pointerLeave(): void {
    this.mouse.active = false;
    this.tilt.x = 0;
    this.tilt.y = 0;
  }

  play(): void {
    if (this.running || !this.animate) return;
    this.running = true;
    this.last = performance.now();
    const loop = () => {
      if (!this.running) return;
      this.step();
      this.render();
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  pause(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  dispose(): void {
    this.pause();
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }

  private allocate(count: number): void {
    const previous = this.current;
    this.count = count;
    this.current = new Float32Array(count * 3);
    this.push = new Float32Array(count * 3);
    this.display = new Float32Array(count * 3);
    this.speed = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // First paint: particles start scattered in depth and gather into the name.
      if (previous.length >= (i + 1) * 3) {
        this.current[i * 3] = previous[i * 3];
        this.current[i * 3 + 1] = previous[i * 3 + 1];
        this.current[i * 3 + 2] = previous[i * 3 + 2];
      } else {
        this.current[i * 3] = (Math.random() - 0.5) * 30;
        this.current[i * 3 + 1] = (Math.random() - 0.5) * 18;
        this.current[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      this.speed[i] = 0.025 + Math.random() * 0.05;
      seeds[i] = Math.random();
    }
    this.display.set(this.current);
    this.geometry.setAttribute('position', new BufferAttribute(this.display, 3));
    this.geometry.setAttribute('seed', new BufferAttribute(seeds, 1));
    if (this.palette) this.setPalette(this.palette);
  }

  private step(): void {
    const now = performance.now();
    const t = (now - this.start) / 1000;
    // Frame-rate independent easing: same feel at 30, 60 or 120 fps.
    const frames = Math.min(4, (now - this.last) / (1000 / 60));
    this.last = now;
    const pushEase = 1 - Math.pow(0.82, frames);
    this.material.uniforms['uTime'].value = t;
    const cur = this.current;
    const tgt = this.target;
    const push = this.push;
    const radius = this.frame.compact ? 1.1 : 1.5;
    const r2 = radius * radius;
    const spin = this.shape === 'globe' ? t * 0.25 : 0;
    const swirl = this.shape === 'spiral' ? t * 0.12 : 0;
    const cosW = Math.cos(swirl);
    const sinW = Math.sin(swirl);
    const ay = this.frame.narrow ? this.frame.height * 0.02 : 0;
    const ax = this.frame.narrow ? 0 : this.frame.width * 0.27;
    const cosS = Math.cos(spin);
    const sinS = Math.sin(spin);

    for (let i = 0; i < this.count; i++) {
      const k = i * 3;
      let tx = tgt[k];
      let ty = tgt[k + 1];
      let tz = tgt[k + 2];
      if (swirl) {
        const dx = tx - ax;
        const dy = ty - ay;
        tx = ax + dx * cosW - dy * sinW;
        ty = ay + dx * sinW + dy * cosW;
      }
      if (spin) {
        const dx = tx - ax;
        tx = ax + dx * cosS - tz * sinS;
        tz = dx * sinS + tz * cosS;
      }
      // A slow breathing drift keeps the shape alive at rest.
      const wobble = 0.03 * Math.sin(t * 0.8 + i * 0.37);
      const s = 1 - Math.pow(1 - this.speed[i], frames);
      cur[k] += (tx + wobble - cur[k]) * s;
      cur[k + 1] += (ty + wobble - cur[k + 1]) * s;
      cur[k + 2] += (tz - cur[k + 2]) * s;

      // Cursor repulsion: ease toward a bounded offset, so particles part around the
      // cursor and spring back when it leaves, without long trails.
      let ox = 0;
      let oy = 0;
      if (this.mouse.active) {
        const dx = cur[k] - this.mouse.x;
        const dy = cur[k + 1] - this.mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 0.0001;
          const f = (1 - d / radius) * radius * 0.55;
          ox = (dx / d) * f;
          oy = (dy / d) * f;
        }
      }
      const px = push[k] + (ox - push[k]) * pushEase;
      const py = push[k + 1] + (oy - push[k + 1]) * pushEase;
      push[k] = px;
      push[k + 1] = py;
    }

    // Displayed position = eased position + cursor push. One buffer, no allocations per frame.
    const shown = this.display;
    for (let i = 0; i < shown.length; i++) shown[i] = cur[i] + push[i];
    (this.geometry.getAttribute('position') as BufferAttribute).needsUpdate = true;

    this.opacity += (this.opacityTarget - this.opacity) * (1 - Math.pow(0.93, frames));
    this.applyOpacity();

    const ease = 1 - Math.pow(0.95, frames);
    this.points.rotation.x += (this.tilt.x - this.points.rotation.x) * ease;
    this.points.rotation.y += (this.tilt.y - this.points.rotation.y) * ease;
  }

  /** Jump straight to the target shape (reduced motion). */
  private snap(): void {
    this.current.set(this.target);
    this.push.fill(0);
    this.display.set(this.current);
    (this.geometry.getAttribute('position') as BufferAttribute | undefined) && ((this.geometry.getAttribute('position') as BufferAttribute).needsUpdate = true);
  }

  private render(): void {
    this.renderer.render(this.scene, this.camera);
  }
}
