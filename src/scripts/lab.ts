import { results, stateAt, fmt, rad, type Params } from '../lib/projectile';
import { announce } from '../lib/store';

export function initLab(root: HTMLElement): void {
  const q = <T extends Element>(s: string) => root.querySelector<T>(s)!;
  const canvas = q<HTMLCanvasElement>('[data-canvas]');
  const ctx = canvas.getContext('2d')!;
  const v0In = q<HTMLInputElement>('[data-v0]');
  const angIn = q<HTMLInputElement>('[data-ang]');
  const gGroup = q<HTMLElement>('[data-g]');
  const playBtn = q<HTMLButtonElement>('[data-play]');
  const playLabel = q<HTMLElement>('[data-play-label]');
  const showVec = q<HTMLInputElement>('[data-vectors]');
  const keepGhost = q<HTMLInputElement>('[data-ghost]');

  const p: Params = { v0: Number(v0In.value), angleDeg: Number(angIn.value), g: 9.81 };
  let t = 0;
  let playing = false;
  let last = 0;
  let raf = 0;
  let ghost: Params | null = null;
  let W = 0, Hc = 0, dpr = 1;

  const css = getComputedStyle(document.documentElement);
  const col = { signal: css.getPropertyValue('--signal').trim() || '#f7c51e', chalk: '#ede6da', dim: 'rgba(237,230,218,.5)', grid: 'rgba(237,230,218,.08)', vx: '#7fc8ff', vy: '#ff9a8a', bord: '#c0405a' };

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(280, r.width); Hc = Math.max(200, r.height);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(Hc * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  const pad = () => ({ l: 44, r: 20, t: 34, b: 34 });
  function view() {
    const { R, H } = results(p);
    const pd = pad();
    const spanX = Math.max(R, 8) * 1.06;
    const spanY = Math.max(H, 2) * 1.18;
    const s = Math.min((W - pd.l - pd.r) / spanX, (Hc - pd.t - pd.b) / spanY);
    return { s, ox: pd.l, oy: Hc - pd.b, spanX: (W - pd.l - pd.r) / s, spanY: (Hc - pd.t - pd.b) / s };
  }
  function niceStep(span: number) {
    const raw = span / 6; const pow = 10 ** Math.floor(Math.log10(raw)); const n = raw / pow;
    return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * pow;
  }

  function arrow(x1: number, y1: number, x2: number, y2: number, color: string, label?: string) {
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 2) return;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - h * Math.cos(a - 0.4), y2 - h * Math.sin(a - 0.4)); ctx.lineTo(x2 - h * Math.cos(a + 0.4), y2 - h * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill();
    if (label) { ctx.font = '600 12px "JetBrains Mono Variable", monospace'; ctx.fillText(label, x2 + 6 * Math.cos(a) + 4, y2 + 6 * Math.sin(a) + 4); }
  }

  function path(pp: Params, tEnd: number, v: ReturnType<typeof view>) {
    const n = 90; ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const st = stateAt(pp, (tEnd * i) / n);
      const X = v.ox + st.x * v.s, Y = v.oy - Math.max(0, st.y) * v.s;
      i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
    }
  }

  function draw() {
    if (!W) return;
    const v = view();
    const { T, H, R } = results(p);
    ctx.clearRect(0, 0, W, Hc);
    // grid
    const step = niceStep(Math.max(v.spanX, v.spanY));
    ctx.strokeStyle = col.grid; ctx.lineWidth = 1; ctx.fillStyle = col.dim; ctx.font = '11px "JetBrains Mono Variable", monospace';
    for (let x = 0; x <= v.spanX; x += step) { const X = v.ox + x * v.s; ctx.beginPath(); ctx.moveTo(X, v.oy); ctx.lineTo(X, 8); ctx.stroke(); ctx.fillText(fmt(x, step < 1 ? 1 : 0), X - 6, v.oy + 18); }
    for (let y = step; y <= v.spanY; y += step) { const Y = v.oy - y * v.s; ctx.beginPath(); ctx.moveTo(v.ox, Y); ctx.lineTo(W - 8, Y); ctx.stroke(); ctx.fillText(fmt(y, step < 1 ? 1 : 0), 6, Y + 4); }
    ctx.fillText('x (m)', W - 52, v.oy - 8); ctx.fillText('y (m)', 6, 18);
    // ground
    ctx.strokeStyle = col.chalk; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(v.ox - 10, v.oy); ctx.lineTo(W - 8, v.oy); ctx.stroke();
    // ghost
    if (ghost && keepGhost.checked) { ctx.setLineDash([2, 6]); ctx.strokeStyle = col.bord; ctx.lineWidth = 2; path(ghost, results(ghost).T, v); ctx.stroke(); ctx.setLineDash([]); }
    // predicted
    ctx.setLineDash([5, 7]); ctx.strokeStyle = col.dim; ctx.lineWidth = 1.2; path(p, T, v); ctx.stroke(); ctx.setLineDash([]);
    // apex + range markers
    const apexX = v.ox + (R / 2) * v.s, apexY = v.oy - H * v.s;
    ctx.strokeStyle = 'rgba(247,197,30,.35)'; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(apexX, apexY); ctx.lineTo(apexX, v.oy); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = col.signal; ctx.font = '600 12px "JetBrains Mono Variable", monospace';
    ctx.fillText(`H = ${fmt(H)} m`, Math.min(apexX + 8, W - 110), Math.max(apexY - 8, 14));
    ctx.fillText(`R = ${fmt(R)} m`, Math.min(v.ox + R * v.s - 40, W - 110), v.oy - 8);
    // travelled path
    const tt = Math.min(t, T);
    if (tt > 0) { ctx.strokeStyle = col.signal; ctx.lineWidth = 3; path(p, tt, v); ctx.stroke(); }
    // launch vector when idle
    const st = stateAt(p, tt);
    const bx = v.ox + st.x * v.s, by = v.oy - Math.max(0, st.y) * v.s;
    const k = (Math.min(W, Hc) * 0.4) / 40; // px per (m/s)
    if (showVec.checked) {
      arrow(bx, by, bx + st.vx * k, by, col.vx, 'vₓ');
      arrow(bx, by, bx, by - st.vy * k, col.vy, 'v_y');
      arrow(bx, by, bx + st.vx * k, by - st.vy * k, col.signal, 'v');
    }
    // ball
    ctx.fillStyle = col.chalk; ctx.beginPath(); ctx.arc(bx, by, 7, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = col.signal; ctx.lineWidth = 2; ctx.stroke();
    // angle arc at origin when at start
    if (tt === 0) { ctx.strokeStyle = col.dim; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(v.ox, v.oy, 30, -rad(p.angleDeg), 0); ctx.stroke(); ctx.fillStyle = col.dim; ctx.fillText(`α = ${p.angleDeg}°`, v.ox + 34, v.oy - 10); }
    updateReadouts(st, tt);
  }

  function updateReadouts(st: ReturnType<typeof stateAt>, tt: number) {
    q('[data-hud-t]').textContent = fmt(tt); q('[data-hud-x]').textContent = fmt(st.x); q('[data-hud-y]').textContent = fmt(Math.max(0, st.y));
    q('[data-vx]').textContent = `${fmt(st.vx)} m/s`; q('[data-vy]').textContent = `${fmt(st.vy)} m/s`; q('[data-v]').textContent = `${fmt(st.v)} m/s`;
    root.dataset.t = tt.toFixed(3);
  }

  function updateResults() {
    const { T, H, R } = results(p);
    q('[data-res-T]').textContent = `${fmt(T)} s`;
    q('[data-res-H]').textContent = `${fmt(H)} m`;
    q('[data-res-R]').textContent = `${fmt(R)} m`;
    q('[data-out-v0]').textContent = `${p.v0} m/s`;
    q('[data-out-ang]').textContent = `${p.angleDeg}°`;
    v0In.style.setProperty('--p', `${((p.v0 - 5) / 35) * 100}%`);
    angIn.style.setProperty('--p', `${((p.angleDeg - 5) / 80) * 100}%`);
    canvas.setAttribute('aria-label', `Trajectoire parabolique : v0 ${p.v0} m/s, angle ${p.angleDeg}°, g ${fmt(p.g)} m/s². Temps de vol ${fmt(T)} s, hauteur maximale ${fmt(H)} m, portée ${fmt(R)} m.`);
  }

  function setPlaying(on: boolean) {
    playing = on;
    playBtn.setAttribute('aria-pressed', String(on));
    const { T } = results(p);
    playLabel.textContent = on ? '❚❚ Pause' : t > 0 && t < T ? '▶ Reprendre' : '▶ Lancer';
    if (on) { last = performance.now(); raf = requestAnimationFrame(tick); } else cancelAnimationFrame(raf);
  }
  function tick(now: number) {
    const { T } = results(p);
    const rate = Math.max(1, T / 5); // long Moon flights are accelerated so they stay watchable
    t += ((now - last) / 1000) * rate; last = now;
    if (t >= T) { t = T; draw(); setPlaying(false); playLabel.textContent = '▶ Relancer'; announce(`Impact au sol après ${fmt(T)} s, à ${fmt(results(p).R)} m.`); return; }
    draw();
    raf = requestAnimationFrame(tick);
  }

  let prev: Params = { ...p };
  let ghostLocked = false;
  function onInput() {
    if (!ghostLocked) { ghost = { ...prev }; ghostLocked = true; }
    p.v0 = Number(v0In.value); p.angleDeg = Number(angIn.value);
    t = 0; setPlaying(false); updateResults(); draw();
  }
  const unlock = () => { ghostLocked = false; prev = { ...p }; };
  v0In.addEventListener('input', onInput); angIn.addEventListener('input', onInput);
  v0In.addEventListener('change', unlock); angIn.addEventListener('change', unlock);
  gGroup.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest('button'); if (!b) return;
    ghost = { ...p };
    p.g = Number(b.dataset.value);
    gGroup.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    prev = { ...p };
    t = 0; setPlaying(false); updateResults(); draw();
    announce(p.g < 5 ? 'Gravité lunaire sélectionnée.' : 'Gravité terrestre sélectionnée.');
  });
  playBtn.addEventListener('click', () => {
    const { T } = results(p);
    if (!playing && t >= T) t = 0;
    setPlaying(!playing);
  });
  q('[data-reset]').addEventListener('click', () => {
    setPlaying(false);
    v0In.value = '20'; angIn.value = '45'; p.v0 = 20; p.angleDeg = 45; p.g = 9.81; t = 0; ghost = null; prev = { ...p };
    gGroup.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.value === '9.81')));
    updateResults(); draw(); playLabel.textContent = '▶ Lancer';
    announce('Simulation réinitialisée.');
  });
  showVec.addEventListener('change', draw); keepGhost.addEventListener('change', draw);

  // Touch / mouse aiming: drag on the canvas to set the launch vector (when not playing).
  let aiming = false;
  const aimFrom = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect(); const pd = pad();
    const dx = e.clientX - r.left - pd.l, dy = r.top + (Hc - pd.b) - e.clientY;
    if (dx <= 0 || dy <= 0) return;
    const ang = Math.round(Math.min(85, Math.max(5, (Math.atan2(dy, dx) * 180) / Math.PI)));
    const v0 = Math.round(Math.min(40, Math.max(5, (Math.hypot(dx, dy) / (Math.min(W, Hc) * 0.7)) * 40)));
    angIn.value = String(ang); v0In.value = String(v0); onInput();
  };
  canvas.addEventListener('pointerdown', (e) => { if (playing) return; aiming = true; canvas.setPointerCapture(e.pointerId); aimFrom(e); });
  canvas.addEventListener('pointermove', (e) => { if (aiming) aimFrom(e); });
  canvas.addEventListener('pointerup', () => { aiming = false; unlock(); });
  canvas.addEventListener('pointercancel', () => { aiming = false; unlock(); });

  updateResults();
  new ResizeObserver(resize).observe(canvas);
  document.fonts?.ready.then(draw);
}
